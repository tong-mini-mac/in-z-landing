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
  status?: "paid" | "pending_slip";
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

export async function recordAtlasChat(input: {
  email: string;
  product_id?: string;
  channel?: string;
  thread_id?: string;
  source?: "landing" | "product" | "atlas";
  role?: "user" | "assistant" | "agent" | "system" | "visitor";
  body?: string;
  messages?: Array<{
    role: "user" | "assistant" | "agent" | "system" | "visitor";
    body: string;
    occurred_at?: string;
    source_message_id?: string;
  }>;
}) {
  return atlasFetch<{
    ok: boolean;
    thread_id: string;
    stored: number;
    duplicates: number;
  }>("/api/commerce/chat", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function safeRecordAtlasChat(
  input: Parameters<typeof recordAtlasChat>[0],
) {
  try {
    await recordAtlasChat(input);
  } catch {
    /* Atlas down must not block contact or product chat */
  }
}

export async function recordAtlasSlip(input: {
  email: string;
  transfer_id: string;
  filename: string;
  content_type: string;
  content_base64: string;
  product_id?: string;
  plan_id?: string;
  invoice_id?: string;
  expected_name?: string;
  expected_amount?: number;
}) {
  return atlasFetch<{
    ok: boolean;
    slip_id: string;
    sha256: string;
    duplicate?: boolean;
    ocr?: {
      status?: string;
      reason?: string;
      fields?: {
        payer_name?: string | null;
        amount?: number | null;
        transferred_at?: string | null;
        ref?: string | null;
      };
      name?: { status?: string; reason?: string; score?: number };
      amount?: { status?: string; reason?: string };
    };
  }>("/api/commerce/slip", {
    method: "POST",
    body: JSON.stringify(input),
  });
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

export async function confirmAtlasPurchase(transferId: string) {
  return atlasFetch<AtlasEntitlement & { ok: boolean; duplicate?: boolean; revenue?: boolean }>(
    "/api/commerce/confirm",
    {
      method: "POST",
      body: JSON.stringify({ omise_charge_id: transferId }),
    },
  );
}

export async function rejectAtlasPurchase(transferId: string, reason = "") {
  return atlasFetch<AtlasEntitlement & { ok: boolean; duplicate?: boolean; revenue?: boolean }>(
    "/api/commerce/reject",
    {
      method: "POST",
      body: JSON.stringify({ omise_charge_id: transferId, reason }),
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

export type AtlasActivityInput = {
  email: string;
  action:
    | "login"
    | "logout"
    | "signup_activate"
    | "product_open"
    | "token_usage"
    | "save_work"
    | "purchase"
    | "purchase_pending"
    | "purchase_confirm"
    | "purchase_reject"
    | "slip_upload"
    | "chat_message";
  source?: "landing" | "product" | "atlas";
  product_id?: string;
  plan_id?: string;
  quantity?: number;
  unit?: string;
  storage_uri?: string;
  ip?: string;
  user_agent?: string;
  metadata?: Record<string, string | number | boolean | null>;
};

export async function recordAtlasActivity(input: AtlasActivityInput) {
  return atlasFetch<{ ok: boolean; event_id: string }>(
    "/api/commerce/activity",
    {
      method: "POST",
      body: JSON.stringify(input),
    },
  );
}

export async function safeRecordAtlasActivity(input: AtlasActivityInput) {
  try {
    await recordAtlasActivity(input);
  } catch {
    /* Atlas down must not block login or checkout */
  }
}
