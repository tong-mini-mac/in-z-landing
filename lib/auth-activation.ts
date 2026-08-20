import { createHmac, timingSafeEqual } from "crypto";
import type { VatProfile } from "@/lib/auth-session";

export type ActivationPayload = {
  fullName: string;
  email: string;
  phone: string;
  vat?: VatProfile | null;
  createdAt: string;
  exp: number;
};

const TOKEN_TTL_MS = 1000 * 60 * 60 * 48; // 48 hours

function getSecret(): string {
  const secret =
    process.env.AUTH_ACTIVATION_SECRET || process.env.AUTH_SECRET || "";

  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("AUTH_ACTIVATION_SECRET is required in production");
    }
    return "inz-demo-activation-secret";
  }

  return secret;
}

function toBase64Url(value: string): string {
  return Buffer.from(value, "utf8")
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function fromBase64Url(value: string): string {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/");
  const pad = padded.length % 4 === 0 ? "" : "=".repeat(4 - (padded.length % 4));
  return Buffer.from(padded + pad, "base64").toString("utf8");
}

function sign(body: string): string {
  return createHmac("sha256", getSecret()).update(body).digest("base64url");
}

export function createActivationToken(
  user: Omit<ActivationPayload, "exp">,
): string {
  const payload: ActivationPayload = {
    ...user,
    exp: Date.now() + TOKEN_TTL_MS,
  };
  const body = toBase64Url(JSON.stringify(payload));
  return `${body}.${sign(body)}`;
}

export function verifyActivationToken(token: string): ActivationPayload | null {
  const cleaned = String(token || "")
    .trim()
    // Outlook / mail clients sometimes insert zero-width or soft hyphens into long URLs.
    .replace(/[\u200B-\u200D\uFEFF\u00AD]/g, "")
    .replace(/\s+/g, "");
  const [body, signature] = cleaned.split(".");
  if (!body || !signature) return null;

  const expected = sign(body);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

  try {
    const payload = JSON.parse(fromBase64Url(body)) as ActivationPayload;
    if (!payload.email || !payload.fullName || !payload.exp) return null;
    if (Date.now() > payload.exp) return null;
    return payload;
  } catch {
    return null;
  }
}
