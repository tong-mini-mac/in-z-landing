"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AuthLangToggle } from "@/components/AuthLangToggle";
import { AUTH_COPY, getStoredAuthLang, type AuthLang } from "@/lib/auth-i18n";
import { saveSession, type AuthUser } from "@/lib/auth-session";

type Status = "loading" | "success" | "error";

export function ActivateAccount() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [lang, setLang] = useState<AuthLang>("th");
  const [status, setStatus] = useState<Status>("loading");
  const [error, setError] = useState("");

  const t = AUTH_COPY[lang];

  useEffect(() => {
    const stored = getStoredAuthLang();
    setLang(stored);
    document.documentElement.lang = stored;
  }, []);

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setStatus("error");
      setError(t.errActivate);
      return;
    }

    let cancelled = false;

    async function activate() {
      try {
        const response = await fetch("/api/auth/activate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });
        const data = (await response.json()) as {
          user?: AuthUser;
          error?: string;
        };

        if (!response.ok || !data.user) {
          if (!cancelled) {
            setStatus("error");
            setError(t.errActivate);
          }
          return;
        }

        saveSession(data.user);
        if (!cancelled) {
          setStatus("success");
          window.setTimeout(() => router.replace("/account"), 1200);
        }
      } catch {
        if (!cancelled) {
          setStatus("error");
          setError(t.errActivate);
        }
      }
    }

    void activate();
    return () => {
      cancelled = true;
    };
  }, [router, searchParams, t.errActivate]);

  return (
    <div className="auth-shell">
      <AuthLangToggle lang={lang} onChange={setLang} />

      {status === "loading" ? (
        <p className="auth-loading">{t.activating}</p>
      ) : null}

      {status === "success" ? (
        <div className="contact-success">
          <p>{t.activateSuccess}</p>
        </div>
      ) : null}

      {status === "error" ? (
        <div className="contact-success">
          <p className="contact-error" role="alert">
            {error || t.errActivate}
          </p>
          <a className="contact-secondary" href="/auth?mode=signup">
            {t.switchToSignUp}
          </a>
        </div>
      ) : null}
    </div>
  );
}
