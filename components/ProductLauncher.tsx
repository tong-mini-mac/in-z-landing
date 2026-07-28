"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { AuthLangToggle } from "@/components/AuthLangToggle";
import { AUTH_COPY, getStoredAuthLang, type AuthLang } from "@/lib/auth-i18n";
import { clearSession, getSession, type AuthSession } from "@/lib/auth-session";
import { isDemoAdminEmail } from "@/lib/demo-access";
import { productsForAccess } from "@/lib/products";

export function ProductLauncher() {
  const router = useRouter();
  const [lang, setLang] = useState<AuthLang>("th");
  const [session, setSession] = useState<AuthSession | null>(null);

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

  const products = useMemo(() => productsForAccess(isAdmin), [isAdmin]);

  function signOut() {
    clearSession();
    router.push("/auth?mode=signin");
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
      </p>

      {isAdmin ? <p className="account-admin-note">{t.adminUnlimitedNote}</p> : null}

      <h2 className="account-products-heading">{t.yourProducts}</h2>

      <ul className="product-launcher">
        {products.map((product) => (
          <li key={product.id}>
            <a
              className="product-launcher-link"
              href={product.href}
              target="_blank"
              rel="noreferrer"
            >
              <span className="product-launcher-icon" aria-hidden="true">
                {product.name.charAt(0)}
              </span>
              <span className="product-launcher-copy">
                <strong>{product.name}</strong>
                <span>{product.description[lang]}</span>
              </span>
              <span className="product-launcher-cta">
                {product.available ? t.openProduct : t.subscribeProduct}
              </span>
            </a>
          </li>
        ))}
      </ul>

      <button type="button" className="contact-secondary" onClick={signOut}>
        {t.signOut}
      </button>

      <p className="auth-demo-note">{t.demoNote}</p>
    </div>
  );
}
