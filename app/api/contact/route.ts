import { NextResponse } from "next/server";
import {
  CONTACT_CHANNELS,
  parseContactChannel,
  type ContactChannel,
} from "@/lib/contact";
import { formatFromAddress, MAILBOX } from "@/lib/mail-addresses";
import { sendMail } from "@/lib/mail";
import { isValidEmail } from "@/lib/auth-session";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      channel?: string;
      email?: string;
      name?: string;
      message?: string;
      company?: string;
    };

    // Honeypot
    if (String(body.company || "").trim()) {
      return NextResponse.json({ ok: true });
    }

    const channel = parseContactChannel(body.channel) as ContactChannel;
    const config = CONTACT_CHANNELS[channel];
    const email = String(body.email || "").trim().toLowerCase();
    const name = String(body.name || "").trim() || "Website visitor";
    const message = String(body.message || "").trim();

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "email" }, { status: 400 });
    }

    if (!message) {
      return NextResponse.json({ error: "message" }, { status: 400 });
    }

    const text = [
      `Channel: ${config.label} (${config.to})`,
      `From: ${name} <${email}>`,
      "",
      message,
    ].join("\n");

    const html = `
      <p><strong>Channel:</strong> ${config.label} (${config.to})</p>
      <p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
      <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
    `;

    const sent = await sendMail({
      to: config.to,
      from: formatFromAddress(MAILBOX.noReply),
      replyTo: email,
      subject: config.subject,
      text,
      html,
    });

    if (!sent.ok) {
      return NextResponse.json(
        { error: "email", message: sent.error },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, to: config.to });
  } catch {
    return NextResponse.json({ error: "server" }, { status: 500 });
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
