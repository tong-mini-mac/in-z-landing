import { NextResponse } from "next/server";
import { isDemoAdminEmail } from "@/lib/demo-access";
import { isValidDemoAdmin } from "@/lib/demo-admin-server";

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

    if (isDemoAdminEmail(username)) {
      if (!isValidDemoAdmin(username, password)) {
        return NextResponse.json({ error: "admin_password" }, { status: 401 });
      }
      const { safeRecordAtlasActivity } = await import("@/lib/atlas-commerce");
      await safeRecordAtlasActivity({
        email: username,
        action: "login",
        source: "landing",
        metadata: { kind: "demo_admin" },
      });
      return NextResponse.json({
        ok: true,
        username,
        email: username,
        product_id: undefined,
        allowedProducts: [],
        expiresAt: undefined,
        revenue: false,
        role: "admin",
        unlimited: true,
        kind: "demo_admin",
      });
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
      const raw = String(data.error || "login_failed");
      // Atlas service-key mismatch / gateway issues — not a user password failure.
      const systemErr =
        /special-login credentials|unauthorized|forbidden|unavailable/i.test(raw) ||
        response.status === 502 ||
        response.status === 503;
      return NextResponse.json(
        { error: systemErr ? "special_login_unavailable" : raw },
        { status: systemErr ? 503 : response.status === 403 ? 403 : 401 },
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
      unlimited: false,
      kind: data.kind || "complimentary",
    });
  } catch {
    return NextResponse.json({ error: "unavailable" }, { status: 502 });
  }
}
