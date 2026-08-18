import { createHmac, timingSafeEqual } from "crypto";
import { getSiteUrl } from "@/lib/mail";

export type TransferDecision = "approve" | "reject";

const TOKEN_TTL_SECONDS = 7 * 24 * 60 * 60;

function secret() {
  return (
    process.env.TRANSFER_APPROVE_SECRET ||
    process.env.AUTH_ACTIVATION_SECRET ||
    process.env.INZ_SSO_SECRET ||
    "dev-secret"
  );
}

export function signTransferDecision(
  transferId: string,
  action: TransferDecision,
  now = Math.floor(Date.now() / 1000),
) {
  const exp = now + TOKEN_TTL_SECONDS;
  const payload = `${transferId}.${action}.${exp}`;
  const sig = createHmac("sha256", secret()).update(payload).digest("base64url");
  return `${payload}.${sig}`;
}

export function verifyTransferDecision(token: string): {
  transferId: string;
  action: TransferDecision;
} | null {
  const parts = token.split(".");
  if (parts.length !== 4) return null;
  const [transferId, action, expRaw, sig] = parts;
  if (action !== "approve" && action !== "reject") return null;
  const exp = Number(expRaw);
  if (!transferId || !Number.isFinite(exp) || exp * 1000 < Date.now()) return null;
  const payload = `${transferId}.${action}.${exp}`;
  const expected = createHmac("sha256", secret()).update(payload).digest("base64url");
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  return { transferId, action };
}

export function transferDecideUrls(transferId: string, request?: Request) {
  const base = getSiteUrl(request);
  const approve = signTransferDecision(transferId, "approve");
  const reject = signTransferDecision(transferId, "reject");
  return {
    approveUrl: `${base}/api/pay/transfer/decide?token=${encodeURIComponent(approve)}`,
    rejectUrl: `${base}/api/pay/transfer/decide?token=${encodeURIComponent(reject)}`,
  };
}
