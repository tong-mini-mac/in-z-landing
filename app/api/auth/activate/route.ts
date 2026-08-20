import { NextResponse } from "next/server";
import { verifyActivationToken } from "@/lib/auth-activation";

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
      },
    });
  } catch {
    return NextResponse.json({ error: "server" }, { status: 500 });
  }
}
