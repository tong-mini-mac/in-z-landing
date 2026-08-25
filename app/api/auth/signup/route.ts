import { NextResponse } from "next/server";
import {
  buildActivationEmail,
  activationFromAddress,
} from "@/lib/auth-email";
import { createActivationToken } from "@/lib/auth-activation";
import { MAILBOX } from "@/lib/mail-addresses";
import { getSiteUrl, sendMail } from "@/lib/mail";
import { hashPassword } from "@/lib/password-hash";
import {
  isValidEmail,
  normalizePhoneNumber,
  isValidPhone,
  isValidTaxId,
  type VatProfile,
} from "@/lib/auth-session";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      fullName?: string;
      email?: string;
      phone?: string;
      password?: string;
      vat?: VatProfile | null;
      lang?: string;
    };

    const fullName = String(body.fullName || "").trim();
    const email = String(body.email || "").trim().toLowerCase();
    const phone = normalizePhoneNumber(String(body.phone || "").trim());
    const password = String(body.password || "");
    const vat = body.vat ?? null;
    const lang = body.lang === "en" ? "en" : "th";

    if (!fullName || !isValidEmail(email) || !phone || !isValidPhone(phone)) {
      return NextResponse.json({ error: "invalid" }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: "password" }, { status: 400 });
    }

    if (vat?.taxId && !isValidTaxId(vat.taxId)) {
      return NextResponse.json({ error: "taxId" }, { status: 400 });
    }

    if (
      process.env.NODE_ENV === "production" &&
      !process.env.AUTH_ACTIVATION_SECRET &&
      !process.env.AUTH_SECRET
    ) {
      return NextResponse.json(
        { error: "misconfigured", message: "AUTH_ACTIVATION_SECRET is required" },
        { status: 500 },
      );
    }

    const createdAt = new Date().toISOString();
    const password_hash = hashPassword(password);
    const token = createActivationToken({
      fullName,
      email,
      phone,
      vat,
      createdAt,
      password_hash,
    });

    const siteUrl = getSiteUrl(request);
    const activateUrl = `${siteUrl}/auth/activate?token=${encodeURIComponent(token)}`;
    const content = buildActivationEmail({ fullName, activateUrl, lang });

    const sent = await sendMail({
      to: email,
      from: activationFromAddress(),
      subject: content.subject,
      text: content.text,
      html: content.html,
      replyTo: MAILBOX.info,
    });

    if (!sent.ok) {
      return NextResponse.json(
        { error: "email", message: sent.error },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "server" }, { status: 500 });
  }
}
