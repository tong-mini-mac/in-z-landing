import { createHmac } from "crypto";
import { productBaseUrl, ssoSecret } from "@/lib/sso-handoff";
import type { CheckoutSku } from "@/lib/checkout-skus";
import { withVat } from "@/lib/checkout-skus";

export type EntitlementNotifyPayload = {
  email: string;
  display_name?: string;
  product_id: string;
  plan_id: string;
  sku_id: string;
  omise_charge_id: string;
  invoice_id?: string;
  amount: number;
  vat_amount: number;
  total_amount: number;
  currency: string;
  interval: string;
  credits?: number;
  minutes?: number;
  paid_at: string;
};

export function signEntitlementBody(body: string): string {
  return createHmac("sha256", ssoSecret()).update(body).digest("hex");
}

export async function notifyProductEntitlement(
  sku: CheckoutSku,
  payload: EntitlementNotifyPayload,
): Promise<{ ok: boolean; skipped?: boolean; status?: number; error?: string }> {
  const base = productBaseUrl(sku.productId);
  if (!base) {
    return { ok: true, skipped: true };
  }

  const url = `${base.replace(/\/$/, "")}/api/inz/entitlement`;
  const body = JSON.stringify(payload);
  const signature = signEntitlementBody(body);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-INZ-Signature": signature,
      },
      body,
    });
    if (response.status === 404) {
      return { ok: true, skipped: true, status: 404 };
    }
    if (!response.ok) {
      const text = await response.text().catch(() => "");
      return {
        ok: false,
        status: response.status,
        error: text.slice(0, 300) || `product ${response.status}`,
      };
    }
    return { ok: true, status: response.status };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "notify_failed",
    };
  }
}

export function entitlementPayloadFromSku(opts: {
  sku: CheckoutSku;
  email: string;
  displayName?: string;
  chargeId: string;
  invoiceId?: string;
  paidAt?: string;
}): EntitlementNotifyPayload {
  const money = withVat(opts.sku.amountBaht);
  return {
    email: opts.email,
    display_name: opts.displayName,
    product_id: opts.sku.productId,
    plan_id: opts.sku.planId,
    sku_id: opts.sku.id,
    omise_charge_id: opts.chargeId,
    invoice_id: opts.invoiceId,
    amount: money.amount,
    vat_amount: money.vat,
    total_amount: money.total,
    currency: "THB",
    interval: opts.sku.interval,
    credits: opts.sku.credits,
    minutes: opts.sku.minutes,
    paid_at: opts.paidAt || new Date().toISOString(),
  };
}
