import { NextResponse } from "next/server";
import { isDemoAdminEmail } from "@/lib/demo-access";
import { COMMERCIAL_PRODUCT_IDS, type ProductId } from "@/lib/products";
import { productBaseUrl, signHandoffToken } from "@/lib/sso-handoff";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      email?: string;
      productId?: string;
      role?: string;
      unlimited?: boolean;
      allowedProducts?: string[];
      kind?: string;
      expiresAt?: string;
    };

    const email = String(body.email || "")
      .trim()
      .toLowerCase();
    const productId = String(body.productId || "").trim() as ProductId;
    const role = String(body.role || "user");
    const unlimited = Boolean(body.unlimited || role === "admin" || isDemoAdminEmail(email));
    const allowedProducts = Array.isArray(body.allowedProducts)
      ? body.allowedProducts.map(String)
      : [];

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "email" }, { status: 400 });
    }
    if (!COMMERCIAL_PRODUCT_IDS.includes(productId)) {
      return NextResponse.json({ error: "product" }, { status: 400 });
    }

    // Gate: only open products the Landing session is allowed to see.
    if (!unlimited && role === "trial" && allowedProducts.length > 0) {
      if (!allowedProducts.includes(productId)) {
        return NextResponse.json({ error: "not_entitled" }, { status: 403 });
      }
    }

    const base = productBaseUrl(productId);
    if (!base) {
      return NextResponse.json(
        { error: "sso_not_ready", message: "SSO for this product is not ready yet" },
        { status: 501 },
      );
    }

    let pkg: "unlimited" | "complimentary" | "standard" = "standard";
    if (unlimited || role === "admin") pkg = "unlimited";
    else if (role === "trial" || body.kind === "complimentary") pkg = "complimentary";

    const token = signHandoffToken({
      email,
      product_id: productId,
      role,
      unlimited,
      package: pkg,
      allowed_products: unlimited ? [...COMMERCIAL_PRODUCT_IDS] : allowedProducts,
    });

    const url = `${base.replace(/\/$/, "")}/?inz_sso=${encodeURIComponent(token)}`;
    return NextResponse.json({
      ok: true,
      url,
      productId,
      package: pkg,
      expires_in: 120,
    });
  } catch {
    return NextResponse.json({ error: "handoff_failed" }, { status: 500 });
  }
}
