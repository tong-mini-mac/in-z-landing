import { NextResponse } from "next/server";
import { createResetToken } from "@/lib/auth-activation";
import {
  activationFromAddress,
  buildResetPasswordEmail,
} from "@/lib/auth-email";
import { atlasCustomerLookup } from "@/lib/atlas-customer-auth";
import { MAILBOX } from "@/lib/mail-addresses";
import { getSiteUrl, sendMail } from "@/lib/mail";
import { isValidEmail } from "@/lib/auth-session";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      email?: string;
      lang?: string;
    };
    const email = String(body.email || "").trim().toLowerCase();
    const lang = body.lang === "en" ? "en" : "th";

    // Always OK — do not reveal whether the email exists.
    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ ok: true });
    }

    const lookup = await atlasCustomerLookup(email);
    if (lookup.ok && lookup.data.exists) {
      const token = createResetToken(email);
      const siteUrl = getSiteUrl(request);
      const resetUrl = `${siteUrl}/auth/reset?token=${encodeURIComponent(token)}`;
      const content = buildResetPasswordEmail({ resetUrl, lang });
      await sendMail({
        to: email,
        from: activationFromAddress(),
        subject: content.subject,
        text: content.text,
        html: content.html,
        replyTo: MAILBOX.info,
      });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: true });
  }
}
