import { createHash, createHmac, timingSafeEqual } from "crypto";

export type HandoffClaims = {
  email: string;
  product_id: string;
  role: string;
  unlimited: boolean;
  package: "unlimited" | "complimentary" | "standard";
  allowed_products: string[];
  plan_id?: string;
  sku_id?: string;
  paid?: boolean;
  exp: number;
  iat: number;
};

export function ssoSecret(): string {
  const raw =
    process.env.INZ_SSO_SECRET ||
    process.env.ERP_SPECIAL_LOGIN_KEY ||
    process.env.ERP_SERVICE_KEY ||
    "dev-secret";
  return String(raw).trim();
}

/** Which env var is actively used for SSO HMAC (for ops debugging). */
export function ssoSecretSource():
  | "INZ_SSO_SECRET"
  | "ERP_SPECIAL_LOGIN_KEY"
  | "ERP_SERVICE_KEY"
  | "dev-secret" {
  if (String(process.env.INZ_SSO_SECRET || "").trim()) return "INZ_SSO_SECRET";
  if (String(process.env.ERP_SPECIAL_LOGIN_KEY || "").trim()) return "ERP_SPECIAL_LOGIN_KEY";
  if (String(process.env.ERP_SERVICE_KEY || "").trim()) return "ERP_SERVICE_KEY";
  return "dev-secret";
}

/** Short fingerprint so Landing vs product can confirm the same secret without revealing it. */
export function ssoSecretFingerprint(): string {
  return createHash("sha256").update(ssoSecret()).digest("hex").slice(0, 8);
}

function b64url(input: Buffer | string): string {
  const buf = Buffer.isBuffer(input) ? input : Buffer.from(input, "utf8");
  return buf
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function fromB64url(input: string): Buffer {
  const padded = input.replace(/-/g, "+").replace(/_/g, "/");
  const pad = padded.length % 4 === 0 ? "" : "=".repeat(4 - (padded.length % 4));
  return Buffer.from(padded + pad, "base64");
}

export function signHandoffToken(claims: Omit<HandoffClaims, "exp" | "iat">, ttlSec = 120): string {
  const now = Math.floor(Date.now() / 1000);
  const full: HandoffClaims = {
    ...claims,
    iat: now,
    exp: now + ttlSec,
  };
  const body = b64url(JSON.stringify(full));
  const sig = createHmac("sha256", ssoSecret()).update(body).digest();
  return `${body}.${b64url(sig)}`;
}

export function verifyHandoffToken(token: string): HandoffClaims {
  const [body, sig] = token.split(".");
  if (!body || !sig) throw new Error("invalid_token");
  const expected = createHmac("sha256", ssoSecret()).update(body).digest();
  const given = fromB64url(sig);
  if (given.length !== expected.length || !timingSafeEqual(given, expected)) {
    throw new Error("bad_signature");
  }
  const claims = JSON.parse(fromB64url(body).toString("utf8")) as HandoffClaims;
  if (!claims.email || !claims.product_id) throw new Error("invalid_claims");
  if (Math.floor(Date.now() / 1000) > Number(claims.exp || 0)) {
    throw new Error("expired");
  }
  return claims;
}

export function productBaseUrl(productId: string): string | null {
  const map: Record<string, string> = {
    synthcomm:
      process.env.SYNTHCOMM_URL ||
      "https://synthcomm-production.up.railway.app",
    "universal-simulator":
      process.env.UNIVERSAL_SIMULATOR_URL ||
      "https://qa-lab-production.up.railway.app",
    "music-demo":
      process.env.MUSIC_DEMO_URL ||
      "https://myclaw-music-demo-production.up.railway.app",
    "content-creator":
      process.env.CONTENT_CREATOR_URL ||
      "https://podcast-web-production-41ac.up.railway.app",
    netr:
      process.env.NETR_URL ||
      "https://netr-web-production-ea49.up.railway.app",
    prism:
      process.env.PRISM_URL ||
      "https://prism-web-production.up.railway.app",
  };
  return map[productId] || null;
}
