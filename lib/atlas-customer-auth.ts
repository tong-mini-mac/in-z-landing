const ERP_BASE =
  process.env.ERP_SPECIAL_LOGIN_URL?.replace(/\/$/, "") ||
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

async function atlasAccess<T>(
  path: string,
  body: Record<string, unknown>,
): Promise<{ ok: true; data: T } | { ok: false; status: number; error: string }> {
  try {
    const response = await fetch(`${ERP_BASE}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Special-Login-Key": serviceKey(),
      },
      body: JSON.stringify({ ...body, service_key: serviceKey() }),
      cache: "no-store",
    });
    const data = (await response.json().catch(() => ({}))) as T & {
      error?: string;
    };
    if (!response.ok) {
      return {
        ok: false,
        status: response.status,
        error: String(data.error || "request_failed"),
      };
    }
    return { ok: true, data };
  } catch {
    return { ok: false, status: 502, error: "unavailable" };
  }
}

export type CustomerProfile = {
  email: string;
  full_name?: string;
  phone?: string;
  role?: string;
  kind?: string;
};

export async function atlasCustomerRegister(input: {
  email: string;
  password_hash: string;
  full_name?: string;
  phone?: string;
}) {
  return atlasAccess<{ ok: boolean; email: string; full_name?: string; phone?: string }>(
    "/api/access/customer-register",
    input,
  );
}

export async function atlasCustomerLogin(input: {
  email: string;
  password: string;
}) {
  return atlasAccess<CustomerProfile & { ok: boolean }>(
    "/api/access/customer-login",
    input,
  );
}

export async function atlasCustomerLookup(email: string) {
  return atlasAccess<{ exists: boolean; kind?: string }>(
    "/api/access/customer-lookup",
    { email },
  );
}

export async function atlasCustomerSetPassword(input: {
  email: string;
  password?: string;
  password_hash?: string;
}) {
  return atlasAccess<{ ok: boolean; email: string; kind?: string }>(
    "/api/access/customer-set-password",
    input,
  );
}
