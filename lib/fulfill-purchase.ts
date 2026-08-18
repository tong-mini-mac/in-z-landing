import { recordAtlasPurchase } from "@/lib/atlas-commerce";
import {
  belowOmiseMinimum,
  findCheckoutSku,
  totalSatang,
  withVat,
  type CheckoutSku,
} from "@/lib/checkout-skus";
import {
  entitlementPayloadFromSku,
  notifyProductEntitlement,
} from "@/lib/product-notify";
import type { OmiseCharge } from "@/lib/omise";

export type FulfillResult = {
  ok: boolean;
  sku: CheckoutSku;
  email: string;
  chargeId: string;
  invoiceId?: string;
  entitlementId?: string;
  duplicate?: boolean;
  productNotified: boolean;
  productSkipped?: boolean;
  productError?: string;
};

export async function fulfillPaidCharge(opts: {
  skuId: string;
  email: string;
  displayName?: string;
  taxId?: string;
  chargeId: string;
  charge?: OmiseCharge;
}): Promise<FulfillResult> {
  const sku = findCheckoutSku(opts.skuId);
  if (!sku) {
    throw new Error("unknown_sku");
  }

  const email = opts.email.trim().toLowerCase();
  if (!email.includes("@")) {
    throw new Error("invalid_email");
  }

  if (opts.charge) {
    const expected = totalSatang(sku.amountBaht);
    if (opts.charge.amount !== expected) {
      throw new Error("amount_mismatch");
    }
    if (!opts.charge.paid) {
      throw new Error("not_paid");
    }
  }

  if (belowOmiseMinimum(sku.amountBaht) && !opts.chargeId.startsWith("mock-")) {
    throw new Error("below_omise_minimum");
  }

  const money = withVat(sku.amountBaht);
  const atlas = await recordAtlasPurchase({
    email,
    display_name: opts.displayName,
    tax_id: opts.taxId,
    product_id: sku.productId,
    plan_id: sku.planId,
    sku_id: sku.id,
    omise_charge_id: opts.chargeId,
    amount: money.amount,
    vat_amount: money.vat,
    total_amount: money.total,
    currency: "THB",
    interval: sku.interval,
    credits: sku.credits,
    minutes: sku.minutes,
    metadata: {
      display_name: opts.displayName || "",
      model: sku.model,
    },
  });

  const notify = await notifyProductEntitlement(
    sku,
    entitlementPayloadFromSku({
      sku,
      email,
      displayName: opts.displayName,
      chargeId: opts.chargeId,
      invoiceId: atlas.invoice_id,
      paidAt: atlas.paid_at,
    }),
  );

  return {
    ok: true,
    sku,
    email,
    chargeId: opts.chargeId,
    invoiceId: atlas.invoice_id,
    entitlementId: atlas.entitlement_id,
    duplicate: atlas.duplicate,
    productNotified: notify.ok && !notify.skipped,
    productSkipped: notify.skipped,
    productError: notify.error,
  };
}
