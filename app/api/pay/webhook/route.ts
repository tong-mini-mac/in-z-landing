import { NextResponse } from "next/server";
import { findCheckoutSku, totalSatang } from "@/lib/checkout-skus";
import { fulfillPaidCharge } from "@/lib/fulfill-purchase";
import { retrieveCharge } from "@/lib/omise";

export async function POST(request: Request) {
  const expected = String(process.env.OMISE_WEBHOOK_SECRET || "").trim();
  if (expected) {
    const got = request.headers.get("x-omise-webhook-secret") || "";
    if (got !== expected) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }
  }

  const json = (await request.json().catch(() => null)) as {
    data?: { id?: string };
    key?: string;
  } | null;

  const chargeId = String(json?.data?.id || "").trim();
  if (!chargeId) {
    return NextResponse.json({ error: "invalid_payload" }, { status: 400 });
  }

  try {
    const charge = await retrieveCharge(chargeId);
    if (!charge.paid) {
      return NextResponse.json({
        received: true,
        paid: false,
        status: charge.status,
      });
    }

    const skuId = String(charge.metadata?.sku_id || "").trim();
    const email = String(charge.metadata?.email || "")
      .trim()
      .toLowerCase();
    const sku = findCheckoutSku(skuId);
    if (!sku || !email.includes("@")) {
      return NextResponse.json(
        { error: "missing_metadata", received: true },
        { status: 400 },
      );
    }

    if (charge.amount !== totalSatang(sku.amountBaht)) {
      return NextResponse.json(
        { error: "amount_mismatch", received: true },
        { status: 400 },
      );
    }

    const fulfilled = await fulfillPaidCharge({
      skuId,
      email,
      displayName: charge.metadata?.display_name,
      taxId: charge.metadata?.tax_id,
      chargeId: charge.id,
      charge,
    });

    return NextResponse.json({
      received: true,
      paid: true,
      entitlementId: fulfilled.entitlementId,
      invoiceId: fulfilled.invoiceId,
      productNotified: fulfilled.productNotified,
    });
  } catch (error) {
    console.error("[pay webhook]", error);
    return NextResponse.json(
      { error: "webhook_failed" },
      { status: 500 },
    );
  }
}
