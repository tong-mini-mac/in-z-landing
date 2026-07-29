"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState, type MouseEvent } from "react";
import { AuthLangToggle } from "@/components/AuthLangToggle";
import { AUTH_COPY, getStoredAuthLang, type AuthLang } from "@/lib/auth-i18n";
import { clearSession, getSession, type AuthSession } from "@/lib/auth-session";
import { isDemoAdminEmail } from "@/lib/demo-access";
import { productsForAccess, type ProductEntry } from "@/lib/products";

export function ProductLauncher() {
  const router = useRouter();
  const [lang, setLang] = useState<AuthLang>("th");
  const [session, setSession] = useState<AuthSession | null>(null);
  const [openingId, setOpeningId] = useState<string | null>(null);
  const [openError, setOpenError] = useState("");

  const t = AUTH_COPY[lang];

  useEffect(() => {
    const stored = getStoredAuthLang();
    setLang(stored);
    document.documentElement.lang = stored;

    const current = getSession();
    if (!current) {
      router.replace("/auth?mode=signin");
      return;
    }
    setSession(current);
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

  function signOut() {
    clearSession();
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

      setOpenError(data.message || data.error || "เปิด product ไม่สำเร็จ");
    } catch {
      setOpenError("เปิด product ไม่สำเร็จ");
    } finally {
      setOpeningId(null);
    }
  }

  if (!session) {
    return null;
  }

  return (
    <div className="auth-shell">
      <AuthLangToggle lang={lang} onChange={setLang} />

      <p className="account-user">
        {t.signedInAs}{" "}
        <strong>{session.user.fullName || session.user.email}</strong>
        <br />
        <span className="account-email">{session.user.email}</span>
        {isAdmin ? <span className="account-admin-badge">{t.adminBadge}</span> : null}
        {isTrial ? (
          <span className="account-admin-badge">
            Trial · ไม่มีรายได้
            {session.user.expiresAt
              ? ` · ถึง ${String(session.user.expiresAt).slice(0, 10)}`
              : ""}
          </span>
        ) : null}
      </p>

      {isAdmin ? <p className="account-admin-note">{t.adminUnlimitedNote}</p> : null}
      {isTrial ? (
        <p className="account-admin-note">
          บัญชีทดลองใช้ฟรี — เปิดได้เฉพาะ product ที่ได้รับสิทธิ์ และไม่ก่อให้เกิดรายได้
        </p>
      ) : null}

      <h2 className="account-products-heading">{t.yourProducts}</h2>
      <p className="account-admin-note">
        Sign in ที่ IN Z ครั้งเดียว — เปิด product แล้วระบบพาเข้าพร้อมสิทธิ์อัตโนมัติ
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
                <span>{product.description[lang]}</span>
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
