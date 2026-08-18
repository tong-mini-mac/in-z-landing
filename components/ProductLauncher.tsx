"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState, type MouseEvent } from "react";
import { AUTH_COPY } from "@/lib/auth-i18n";
import { SITE_COPY } from "@/lib/site-i18n";
import { useSiteLang } from "@/lib/use-site-lang";
import { getSession, signOutLocal, type AuthSession } from "@/lib/auth-session";
import { isDemoAdminEmail } from "@/lib/demo-access";
import { productsForAccess, type ProductEntry } from "@/lib/products";
import type { AtlasEntitlement } from "@/lib/atlas-commerce";

export function ProductLauncher() {
  const router = useRouter();
  const lang = useSiteLang();
  const [session, setSession] = useState<AuthSession | null>(null);
  const [openingId, setOpeningId] = useState<string | null>(null);
  const [openError, setOpenError] = useState("");
  const [entitlements, setEntitlements] = useState<AtlasEntitlement[]>([]);

  const t = AUTH_COPY[lang];
  const accountCopy = SITE_COPY[lang].account;

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    const current = getSession();
    if (!current) {
      router.replace("/auth?mode=signin");
      return;
    }
    setSession(current);
    fetch(`/api/pay/entitlements?email=${encodeURIComponent(current.user.email)}`)
      .then((response) => response.json())
      .then((data: { items?: AtlasEntitlement[] }) => {
        setEntitlements(Array.isArray(data.items) ? data.items : []);
      })
      .catch(() => setEntitlements([]));
  }, [router]);

  const isAdmin = Boolean(
    session?.user.unlimited ||
      session?.user.role === "admin" ||
      (session && isDemoAdminEmail(session.user.email)),
  );

  const isTrial = session?.user.role === "trial" || session?.user.kind === "complimentary";

  const products = useMemo(
    () => productsForAccess(isAdmin, session?.user.allowedProducts),
    [isAdmin, session?.user.allowedProducts],
  );

  const latestByProduct = useMemo(() => {
    const map = new Map<string, AtlasEntitlement>();
    for (const item of entitlements) {
      if (item.status !== "paid") continue;
      if (!map.has(item.product_id)) map.set(item.product_id, item);
    }
    return map;
  }, [entitlements]);

  function signOut() {
    signOutLocal();
    router.push("/auth?mode=signin");
  }

  async function openProduct(product: ProductEntry, event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    if (!session?.user?.email) {
      router.replace("/auth?mode=signin");
      return;
    }
    if (!product.available) return;

    setOpenError("");
    setOpeningId(product.id);
    try {
      const response = await fetch("/api/auth/product-handoff", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: session.user.email,
          productId: product.id,
          role: session.user.role || "user",
          unlimited: Boolean(session.user.unlimited || isAdmin),
          allowedProducts: session.user.allowedProducts || [],
          kind: session.user.kind,
          expiresAt: session.user.expiresAt,
        }),
      });
      const data = (await response.json()) as {
        ok?: boolean;
        url?: string;
        error?: string;
        message?: string;
      };

      if (response.ok && data.url) {
        window.location.href = data.url;
        return;
      }

      if (response.status === 501) {
        // SSO not wired for this product yet — open raw product URL.
        window.location.href = product.href;
        return;
      }

      setOpenError(data.message || data.error || accountCopy.openFail);
    } catch {
      setOpenError(accountCopy.openFail);
    } finally {
      setOpeningId(null);
    }
  }

  if (!session) {
    return null;
  }

  return (
    <div className="auth-shell">
      <p className="account-user">
        {t.signedInAs}{" "}
        <strong>{session.user.fullName || session.user.email}</strong>
        <br />
        <span className="account-email">{session.user.email}</span>
        {isAdmin ? <span className="account-admin-badge">{t.adminBadge}</span> : null}
        {isTrial ? (
          <span className="account-admin-badge">
            {accountCopy.trialBadge}
            {session.user.expiresAt
              ? ` · ${String(session.user.expiresAt).slice(0, 10)}`
              : ""}
          </span>
        ) : null}
      </p>

      {isAdmin ? <p className="account-admin-note">{t.adminUnlimitedNote}</p> : null}
      {isTrial ? (
        <p className="account-admin-note">{accountCopy.trialNote}</p>
      ) : null}

      <h2 className="account-products-heading">{t.yourProducts}</h2>
      <p className="account-admin-note">{accountCopy.ssoNote}</p>
      <p>
        <a className="product-detail-cta is-primary" href={`/pay?lang=${lang}`}>
          {accountCopy.buyPackage}
        </a>
      </p>

      <ul className="product-launcher">
        {products.map((product) => (
          <li key={product.id}>
            <a
              className="product-launcher-link"
              href={product.href}
              onClick={(event) => openProduct(product, event)}
            >
              <span className="product-launcher-icon" aria-hidden="true">
                {product.name.charAt(0)}
              </span>
              <span className="product-launcher-copy">
                <strong>{product.name}</strong>
                <span>
                  {product.description[lang]}
                  {latestByProduct.get(product.id) ? (
                    <>
                      {" "}
                      · {accountCopy.paidBadge} {latestByProduct.get(product.id)?.plan_id}
                    </>
                  ) : null}
                </span>
              </span>
              <span className="product-launcher-cta">
                {openingId === product.id
                  ? "…"
                  : product.available
                    ? t.openProduct
                    : t.subscribeProduct}
              </span>
            </a>
          </li>
        ))}
      </ul>

      {openError ? <p className="account-admin-note">{openError}</p> : null}

      <button type="button" className="contact-secondary" onClick={signOut}>
        {t.signOut}
      </button>

      <p className="auth-demo-note">{t.demoNote}</p>
    </div>
  );
}
