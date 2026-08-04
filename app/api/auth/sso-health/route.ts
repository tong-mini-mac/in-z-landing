import { NextResponse } from "next/server";
import { ssoSecretFingerprint, ssoSecretSource } from "@/lib/sso-handoff";

/** Compare fingerprint with product `/api/auth/inz-sso` GET — must match for SSO. */
export async function GET() {
  return NextResponse.json({
    ok: true,
    product: "landing",
    source: ssoSecretSource(),
    fingerprint: ssoSecretFingerprint(),
  });
}
