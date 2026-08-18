import { NextResponse } from "next/server";
import { findCheckoutSku } from "@/lib/checkout-skus";
import { fulfillPaidCharge } from "@/lib/fulfill-purchase";
import { retrieveCharge } from "@/lib/omise";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const chargeId = String(url.searchParams.get("chargeId") || "").trim();
  if (!chargeId) {
    return NextResponse.json({ error: "chargeId" }, { status: 400 });
  }

  try {
    const charge = await retrieveCharge(chargeId);
    if (!charge.paid) {
      return NextResponse.json({
        paid: false,
        status: charge.status,
        chargeId: charge.id,
        failure: charge.failure_message || charge.failure_code || null,
      });
    }

    const skuId = String(charge.metadata?.sku_id || "").trim();
    const email = String(charge.metadata?.email || "")
      .trim()
      .toLowerCase();
    if (!findCheckoutSku(skuId) || !email.includes("@")) {
      return NextResponse.json(
        { error: "missing_metadata", paid: true, chargeId: charge.id },
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
      paid: true,
      chargeId: charge.id,
      skuId,
      productId: fulfilled.sku.productId,
      planId: fulfilled.sku.planId,
      invoiceId: fulfilled.invoiceId,
      entitlementId: fulfilled.entitlementId,
    });
  } catch (error) {
    console.error("[pay status]", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "status_failed" },
      { status: 502 },
    );
  }
}
