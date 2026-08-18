import { NextResponse } from "next/server";
import {
  abovePromptPayMax,
  belowOmiseMinimum,
  findCheckoutSku,
  totalSatang,
  withVat,
} from "@/lib/checkout-skus";
import { fulfillPaidCharge } from "@/lib/fulfill-purchase";
import { getSiteUrl } from "@/lib/mail";
import {
  createCardCharge,
  createPromptPayCharge,
  getOmisePublicKey,
  isOmiseConfigured,
} from "@/lib/omise";

export async function GET() {
  const mock = process.env.DEMO_BILLING_MOCK === "1";
  return NextResponse.json({
    configured: isOmiseConfigured() || mock,
    publicKey: getOmisePublicKey(),
    mock,
  });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      skuId?: string;
      email?: string;
      displayName?: string;
      taxId?: string;
      method?: string;
      cardToken?: string;
    };

    const sku = findCheckoutSku(String(body.skuId || "").trim());
    const email = String(body.email || "")
      .trim()
      .toLowerCase();
    const method = body.method === "card" ? "card" : "promptpay";
    const displayName = String(body.displayName || "").trim();
    const taxId = String(body.taxId || "").trim();

    if (!sku) {
      return NextResponse.json({ error: "unknown_sku" }, { status: 400 });
    }
    if (sku.quoteOnly) {
      return NextResponse.json(
        {
          error: "quote_only",
          message: "This package is quoted by sales — it cannot be charged on the public checkout.",
        },
        { status: 400 },
      );
    }
    if (!email.includes("@")) {
      return NextResponse.json({ error: "email" }, { status: 400 });
    }
    if (method === "promptpay" && abovePromptPayMax(sku.amountBaht)) {
      return NextResponse.json(
        {
          error: "promptpay_max",
          message: "PromptPay cannot take this amount. Pay by card or contact sales for a bank transfer.",
        },
        { status: 400 },
      );
    }
    if (belowOmiseMinimum(sku.amountBaht) && process.env.DEMO_BILLING_MOCK !== "1") {
      return NextResponse.json(
        {
          error: "below_omise_minimum",
          message: "This package is below Omise’s ฿20 minimum. Contact support or pick another plan.",
        },
        { status: 400 },
      );
    }

    const money = withVat(sku.amountBaht);
    const origin = getSiteUrl(request);
    const returnUri = `${origin}/pay/return?sku=${encodeURIComponent(sku.id)}`;
    const metadata = {
      email,
      sku_id: sku.id,
      product_id: sku.productId,
      plan_id: sku.planId,
      display_name: displayName,
      tax_id: taxId,
      hub: "inz-landing",
    };

    if (!isOmiseConfigured()) {
      if (process.env.DEMO_BILLING_MOCK === "1") {
        const chargeId = `mock-${sku.id}-${Date.now()}`;
        const fulfilled = await fulfillPaidCharge({
          skuId: sku.id,
          email,
          displayName,
          taxId,
          chargeId,
        });
        return NextResponse.json({
          paid: true,
          mock: true,
          chargeId,
          skuId: sku.id,
          productId: sku.productId,
          planId: sku.planId,
          amount: money,
          invoiceId: fulfilled.invoiceId,
          entitlementId: fulfilled.entitlementId,
        });
      }
      return NextResponse.json(
        {
          error: "omise_not_configured",
          publicKey: getOmisePublicKey(),
        },
        { status: 503 },
      );
    }

    if (method === "card" && !body.cardToken) {
      return NextResponse.json({ error: "card_token" }, { status: 400 });
    }

    const description = `IN Z ${sku.productName} ${sku.planId}`;
    const amountSatang = totalSatang(sku.amountBaht);
    const charge =
      method === "promptpay"
        ? await createPromptPayCharge({
            amountSatang,
            description,
            metadata,
            returnUri,
          })
        : await createCardCharge({
            amountSatang,
            description,
            cardToken: String(body.cardToken),
            metadata,
            returnUri,
          });

    if (charge.paid) {
      const fulfilled = await fulfillPaidCharge({
        skuId: sku.id,
        email,
        displayName,
        taxId,
        chargeId: charge.id,
        charge,
      });
      return NextResponse.json({
        paid: true,
        chargeId: charge.id,
        skuId: sku.id,
        productId: sku.productId,
        planId: sku.planId,
        amount: money,
        invoiceId: fulfilled.invoiceId,
        entitlementId: fulfilled.entitlementId,
      });
    }

    return NextResponse.json({
      paid: false,
      chargeId: charge.id,
      status: charge.status,
      skuId: sku.id,
      productId: sku.productId,
      planId: sku.planId,
      amount: money,
      qrImage: charge.source?.scannable_code?.image?.download_uri ?? null,
      authorizeUri: charge.authorize_uri ?? null,
      publicKey: getOmisePublicKey(),
      pollUrl: `/api/pay/status?chargeId=${encodeURIComponent(charge.id)}`,
    });
  } catch (error) {
    console.error("[pay checkout]", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "checkout_failed",
      },
      { status: 502 },
    );
  }
}
