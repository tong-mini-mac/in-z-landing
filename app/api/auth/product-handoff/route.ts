import { NextResponse } from "next/server";
import { isDemoAdminEmail } from "@/lib/demo-access";
import { listAtlasEntitlements } from "@/lib/atlas-commerce";
import {
  ADMIN_LAUNCHER_PRODUCT_IDS,
  DEMO_HUB_PRODUCT_IDS,
  HANDOFF_PRODUCT_IDS,
  normalizeProductId,
  type ProductId,
} from "@/lib/products";
import { productBaseUrl, signHandoffToken } from "@/lib/sso-handoff";

function sanitizeHandoffPath(raw: unknown): string {
  const value = String(raw || "").trim();
  if (!value || value === "/") return "/";
  if (!value.startsWith("/") || value.startsWith("//") || value.includes("://")) {
    return "/";
  }
  // Keep path only — no query injection.
  const path = value.split("?")[0].split("#")[0];
  if (!path.startsWith("/") || path.includes("..")) return "/";
  return path;
}

function sanitizeHandoffHash(raw: unknown): string {
  const value = String(raw || "")
    .trim()
    .replace(/^#/, "");
  if (!value || /[\s"'<>]/.test(value)) return "";
  return value;
}

function buildHandoffUrl(
  base: string,
  token: string,
  path: string,
  hash: string,
): string {
  const origin = base.replace(/\/$/, "");
  const pathname = path === "/" ? "/" : path;
  const url = new URL(pathname, `${origin}/`);
  url.searchParams.set("inz_sso", token);
  if (hash) url.hash = hash;
  return url.toString();
}

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
      path?: string;
      hash?: string;
      source?: string;
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
    const fromDemo = String(body.source || "") === "demo";
    const handoffPath = sanitizeHandoffPath(body.path);
    const handoffHash = sanitizeHandoffHash(body.hash);

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "email" }, { status: 400 });
    }
    if (!HANDOFF_PRODUCT_IDS.includes(productId)) {
      return NextResponse.json({ error: "product" }, { status: 400 });
    }

    // Account launcher: gate by trial allowlist.
    // Demo hub: any signed-in IN Z user may open a demo product without re-sign-in.
    if (
      !fromDemo &&
      !unlimited &&
      role === "trial" &&
      allowedProducts.length > 0
    ) {
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
    else if (role === "trial" || body.kind === "complimentary" || fromDemo) {
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

    if (fromDemo && entitledProducts.length === 0) {
      entitledProducts = [...DEMO_HUB_PRODUCT_IDS];
    }

    const token = signHandoffToken({
      email,
      product_id: productId,
      role,
      unlimited,
      package: pkg,
      allowed_products: unlimited
        ? [...ADMIN_LAUNCHER_PRODUCT_IDS]
        : entitledProducts,
      plan_id: planId,
      sku_id: skuId,
      entitlement_id: entitlementId,
      omise_charge_id: omiseChargeId,
      paid,
    });

    const url = buildHandoffUrl(base, token, handoffPath, handoffHash);
    const { safeRecordAtlasActivity } = await import("@/lib/atlas-commerce");
    await safeRecordAtlasActivity({
      email,
      action: "product_open",
      source: "landing",
      product_id: productId,
      plan_id: planId,
      metadata: {
        package: pkg,
        paid,
        sku_id: skuId || "",
        via: fromDemo ? "demo" : "account",
        surface: fromDemo ? "demo" : "account",
      },
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
