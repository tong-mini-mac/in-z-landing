import { NextResponse } from "next/server";
import { verifyResetToken } from "@/lib/auth-activation";
import { atlasCustomerSetPassword } from "@/lib/atlas-customer-auth";
import { hashPassword } from "@/lib/password-hash";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      token?: string;
      password?: string;
    };
    const token = String(body.token || "").trim();
    const password = String(body.password || "");

    if (!token) {
      return NextResponse.json({ error: "missing" }, { status: 400 });
    }
    if (password.length < 8) {
      return NextResponse.json({ error: "password" }, { status: 400 });
    }

    const payload = verifyResetToken(token);
    if (!payload) {
      return NextResponse.json({ error: "invalid" }, { status: 400 });
    }

    const password_hash = hashPassword(password);
    const result = await atlasCustomerSetPassword({
      email: payload.email,
      password_hash,
    });

    if (!result.ok) {
      return NextResponse.json(
        { error: result.error || "set_failed" },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, email: payload.email });
  } catch {
    return NextResponse.json({ error: "server" }, { status: 500 });
  }
}
