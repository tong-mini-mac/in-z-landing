import nodemailer from "nodemailer";
import {
  formatFromAddress,
  MAILBOX,
} from "@/lib/mail-addresses";

export type SendMailInput = {
  to: string | string[];
  subject: string;
  text: string;
  html?: string;
  /** Defaults to no-reply@inz.lol */
  from?: string;
  replyTo?: string;
  attachments?: MailAttachment[];
};

export type MailAttachment = {
  filename: string;
  content: Buffer;
  contentType: string;
};

export type SendMailResult =
  | { ok: true; provider: "resend" | "smtp" }
  | { ok: false; error: string };

function isMailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY || process.env.SMTP_HOST);
}

export function getMailStatus(): {
  configured: boolean;
  provider: "resend" | "smtp" | null;
} {
  if (process.env.RESEND_API_KEY) {
    return { configured: true, provider: "resend" };
  }
  if (process.env.SMTP_HOST) {
    return { configured: true, provider: "smtp" };
  }
  return { configured: false, provider: null };
}

function defaultFrom(): string {
  return (
    process.env.SMTP_FROM ||
    process.env.MAIL_FROM ||
    formatFromAddress(MAILBOX.noReply)
  );
}

async function sendWithResend(input: SendMailInput): Promise<SendMailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { ok: false, error: "RESEND_API_KEY is not set" };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: input.from || defaultFrom(),
      to: Array.isArray(input.to) ? input.to : [input.to],
      subject: input.subject,
      text: input.text,
      html: input.html,
      reply_to: input.replyTo,
      attachments: input.attachments?.map((file) => ({
        filename: file.filename,
        content: file.content.toString("base64"),
        content_type: file.contentType,
      })),
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    return {
      ok: false,
      error: `Resend error ${response.status}: ${detail.slice(0, 300)}`,
    };
  }

  return { ok: true, provider: "resend" };
}

async function sendWithSmtp(input: SendMailInput): Promise<SendMailResult> {
  const host = process.env.SMTP_HOST;
  if (!host) {
    return { ok: false, error: "SMTP_HOST is not set" };
  }

  const port = Number(process.env.SMTP_PORT || 465);
  const secure =
    process.env.SMTP_SECURE === "true" ||
    process.env.SMTP_SECURE === "1" ||
    port === 465;

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth:
      process.env.SMTP_USER && process.env.SMTP_PASS
        ? {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          }
        : undefined,
  });

  await transporter.sendMail({
    from: input.from || defaultFrom(),
    to: input.to,
    subject: input.subject,
    text: input.text,
    html: input.html,
    replyTo: input.replyTo,
    attachments: input.attachments?.map((file) => ({
      filename: file.filename,
      content: file.content,
      contentType: file.contentType,
    })),
  });

  return { ok: true, provider: "smtp" };
}

/** Send email via Resend (preferred) or SMTP. */
export async function sendMail(input: SendMailInput): Promise<SendMailResult> {
  if (!isMailConfigured()) {
    return {
      ok: false,
      error:
        "Mail is not configured. Set RESEND_API_KEY or SMTP_HOST (and SMTP credentials).",
    };
  }

  try {
    if (process.env.RESEND_API_KEY) {
      return await sendWithResend(input);
    }
    return await sendWithSmtp(input);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown mail error";
    return { ok: false, error: message };
  }
}

export function getSiteUrl(request?: Request): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;

  if (request) {
    const origin = request.headers.get("origin");
    if (origin) return origin.replace(/\/$/, "");
    const host = request.headers.get("x-forwarded-host") || request.headers.get("host");
    const proto = request.headers.get("x-forwarded-proto") || "https";
    if (host) return `${proto}://${host}`.replace(/\/$/, "");
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`.replace(/\/$/, "");
  }

  return "http://localhost:3000";
}
