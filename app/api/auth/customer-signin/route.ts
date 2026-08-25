import { NextResponse } from "next/server";
import { atlasCustomerLogin } from "@/lib/atlas-customer-auth";
import { isValidEmail } from "@/lib/auth-session";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      email?: string;
      username?: string;
      password?: string;
    };
    const email = String(body.email || body.username || "")
      .trim()
      .toLowerCase();
    const password = String(body.password || "");

    if (!email || !isValidEmail(email) || password.length < 8) {
      return NextResponse.json({ error: "invalid" }, { status: 400 });
    }

    const result = await atlasCustomerLogin({ email, password });
    if (!result.ok) {
      return NextResponse.json(
        { error: result.error || "Invalid username or password" },
        { status: result.status === 400 ? 401 : result.status },
      );
    }

    const { safeRecordAtlasActivity } = await import("@/lib/atlas-commerce");
    await safeRecordAtlasActivity({
      email: result.data.email,
      action: "login",
      source: "landing",
      metadata: { kind: "customer" },
    });

    return NextResponse.json({
      ok: true,
      user: {
        fullName: result.data.full_name || email.split("@")[0],
        email: result.data.email,
        phone: result.data.phone || "",
        createdAt: new Date().toISOString(),
        role: "user",
        unlimited: false,
        kind: "customer",
      },
    });
  } catch {
    return NextResponse.json({ error: "unavailable" }, { status: 502 });
  }
}
