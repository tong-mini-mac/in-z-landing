const ERP_BASE =
  process.env.ERP_BASE_URL?.replace(/\/$/, "") ||
  process.env.INZ_ERP_ORIGIN?.replace(/\/$/, "") ||
  "https://erp-atlas-production.up.railway.app";

function serviceKey() {
  return (
    process.env.ERP_SPECIAL_LOGIN_KEY ||
    process.env.ERP_SERVICE_KEY ||
    process.env.FINANCE_AUTH_SECRET ||
    "dev-secret"
  );
}

export type AtlasEntitlement = {
  entitlement_id: string;
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
  credits?: number | null;
  minutes?: number | null;
  status: string;
  paid_at: string;
};

export type AtlasPurchaseInput = {
  email: string;
  display_name?: string;
  tax_id?: string;
  product_id: string;
  plan_id: string;
  sku_id: string;
  omise_charge_id: string;
  amount: number;
  vat_amount: number;
  total_amount: number;
  currency?: string;
  interval: string;
  credits?: number;
  minutes?: number;
  metadata?: Record<string, string | number | boolean | null>;
};

async function atlasFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${ERP_BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      "X-Special-Login-Key": serviceKey(),
      ...(init?.headers as Record<string, string> | undefined),
    },
  });
  const data = (await response.json().catch(() => ({}))) as T & {
    error?: string;
  };
  if (!response.ok) {
    throw new Error(data.error || `Atlas error ${response.status}`);
  }
  return data;
}

export async function recordAtlasPurchase(input: AtlasPurchaseInput) {
  return atlasFetch<AtlasEntitlement & { ok: boolean; duplicate?: boolean }>(
    "/api/commerce/purchase",
    {
      method: "POST",
      body: JSON.stringify(input),
    },
  );
}

export async function listAtlasEntitlements(email: string) {
  const encoded = encodeURIComponent(email.trim().toLowerCase());
  return atlasFetch<{
    ok: boolean;
    email: string;
    items: AtlasEntitlement[];
    allowed_products: string[];
  }>(`/api/commerce/entitlements?email=${encoded}`);
}
