import { NextResponse } from "next/server";
import { verifyActivationToken } from "@/lib/auth-activation";
import { atlasCustomerRegister } from "@/lib/atlas-customer-auth";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { token?: string };
    const token = String(body.token || "").trim();
    if (!token) {
      return NextResponse.json({ error: "missing" }, { status: 400 });
    }

    const payload = verifyActivationToken(token);
    if (!payload) {
      return NextResponse.json({ error: "invalid" }, { status: 400 });
    }

    if (payload.password_hash) {
      const registered = await atlasCustomerRegister({
        email: payload.email,
        password_hash: payload.password_hash,
        full_name: payload.fullName,
        phone: payload.phone,
      });
      if (!registered.ok) {
        return NextResponse.json(
          { error: "register_failed", message: registered.error },
          { status: 502 },
        );
      }
    }

    const { safeRecordAtlasActivity } = await import("@/lib/atlas-commerce");
    await safeRecordAtlasActivity({
      email: payload.email,
      action: "signup_activate",
      source: "landing",
    });

    return NextResponse.json({
      ok: true,
      user: {
        fullName: payload.fullName,
        email: payload.email,
        phone: payload.phone,
        vat: payload.vat ?? null,
        createdAt: payload.createdAt,
        role: "user",
        kind: "customer",
      },
    });
  } catch {
    return NextResponse.json({ error: "server" }, { status: 500 });
  }
}
