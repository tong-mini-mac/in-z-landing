import { NextResponse } from "next/server";

const ERP_BASE =
  process.env.ERP_SPECIAL_LOGIN_URL?.replace(/\/$/, "") ||
  process.env.ERP_BASE_URL?.replace(/\/$/, "") ||
  "https://erp-atlas-production.up.railway.app";

const SPECIAL_KEY =
  process.env.ERP_SPECIAL_LOGIN_KEY ||
  process.env.ERP_SERVICE_KEY ||
  process.env.FINANCE_AUTH_SECRET ||
  "dev-secret";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      username?: string;
      email?: string;
      password?: string;
    };
    const username = String(body.username || body.email || "")
      .trim()
      .toLowerCase();
    const password = String(body.password || "");

    if (!username || !password) {
      return NextResponse.json({ error: "invalid" }, { status: 400 });
    }

    const response = await fetch(`${ERP_BASE}/api/access/special-login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Special-Login-Key": SPECIAL_KEY,
      },
      body: JSON.stringify({
        username,
        password,
        service_key: SPECIAL_KEY,
      }),
      cache: "no-store",
    });

    const data = (await response.json().catch(() => ({}))) as {
      ok?: boolean;
      error?: string;
      username?: string;
      email?: string;
      product_id?: string;
      allowed_products?: string[];
      expires_at?: string;
      revenue?: boolean;
      role?: string;
      kind?: string;
    };

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error || "login_failed" },
        { status: response.status === 403 ? 403 : 401 },
      );
    }

    const sessionEmail = data.email || data.username || username;
    const { safeRecordAtlasActivity } = await import("@/lib/atlas-commerce");
    await safeRecordAtlasActivity({
      email: sessionEmail,
      action: "login",
      source: "landing",
      product_id: data.product_id,
      metadata: { kind: data.kind || "complimentary" },
    });

    return NextResponse.json({
      ok: true,
      username: data.username || username,
      email: sessionEmail,
      product_id: data.product_id,
      allowedProducts: data.allowed_products || (data.product_id ? [data.product_id] : []),
      expiresAt: data.expires_at,
      revenue: false,
      role: "trial",
      kind: data.kind || "complimentary",
    });
  } catch {
    return NextResponse.json({ error: "unavailable" }, { status: 502 });
  }
}
