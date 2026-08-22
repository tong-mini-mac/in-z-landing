import { NextResponse } from "next/server";
import { isDemoAdminEmail } from "@/lib/demo-access";
import { listAtlasEntitlements } from "@/lib/atlas-commerce";
import {
  CHECKOUT_PRODUCT_IDS,
  COMMERCIAL_PRODUCT_IDS,
  normalizeProductId,
  type ProductId,
} from "@/lib/products";
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
    const productId = normalizeProductId(
      String(body.productId || "").trim(),
    ) as ProductId;
    const role = String(body.role || "user");
    const unlimited = Boolean(
      body.unlimited || role === "admin" || isDemoAdminEmail(email),
    );
    const allowedProducts = Array.isArray(body.allowedProducts)
      ? body.allowedProducts.map((id) => normalizeProductId(String(id)))
      : [];

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "email" }, { status: 400 });
    }
    if (!CHECKOUT_PRODUCT_IDS.includes(productId)) {
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
        {
          error: "sso_not_ready",
          message: "SSO for this product is not ready yet",
        },
        { status: 501 },
      );
    }

    let pkg: "unlimited" | "complimentary" | "standard" = "standard";
    if (unlimited || role === "admin") pkg = "unlimited";
    else if (role === "trial" || body.kind === "complimentary") {
      pkg = "complimentary";
    }

    let planId: string | undefined;
    let skuId: string | undefined;
    let entitlementId: string | undefined;
    let omiseChargeId: string | undefined;
    let paid = false;
    let entitledProducts = allowedProducts;
    try {
      const listed = await listAtlasEntitlements(email);
      entitledProducts = [
        ...new Set([
          ...allowedProducts,
          ...listed.allowed_products.map((id) => normalizeProductId(id)),
        ]),
      ];
      const latest = listed.items.find(
        (item) =>
          normalizeProductId(item.product_id) === productId &&
          item.status === "paid",
      );
      if (latest) {
        planId = latest.plan_id;
        skuId = latest.sku_id;
        entitlementId = latest.entitlement_id;
        omiseChargeId = latest.omise_charge_id;
        paid = true;
      }
    } catch {
      /* Atlas down — still hand off the session package */
    }

    const token = signHandoffToken({
      email,
      product_id: productId,
      role,
      unlimited,
      package: pkg,
      allowed_products: unlimited
        ? [...COMMERCIAL_PRODUCT_IDS]
        : entitledProducts,
      plan_id: planId,
      sku_id: skuId,
      entitlement_id: entitlementId,
      omise_charge_id: omiseChargeId,
      paid,
    });

    const url = `${base.replace(/\/$/, "")}/?inz_sso=${encodeURIComponent(token)}`;
    const { safeRecordAtlasActivity } = await import("@/lib/atlas-commerce");
    await safeRecordAtlasActivity({
      email,
      action: "product_open",
      source: "landing",
      product_id: productId,
      plan_id: planId,
      metadata: { package: pkg, paid, sku_id: skuId || "" },
    });
    return NextResponse.json({
      ok: true,
      url,
      productId,
      package: pkg,
      planId,
      skuId,
      paid,
      expires_in: 600,
    });
  } catch {
    return NextResponse.json({ error: "handoff_failed" }, { status: 500 });
  }
}
