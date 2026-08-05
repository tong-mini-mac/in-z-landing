"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AUTH_COPY } from "@/lib/auth-i18n";
import { saveSession, type AuthUser } from "@/lib/auth-session";
import { useSiteLang } from "@/lib/use-site-lang";

type Status = "loading" | "success" | "error";

export function ActivateAccount() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const lang = useSiteLang();
  const [status, setStatus] = useState<Status>("loading");
  const [error, setError] = useState("");

  const t = AUTH_COPY[lang];

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
          ok?: boolean;
          error?: string;
          user?: AuthUser;
        };

        if (cancelled) return;

        if (!response.ok || !data.ok || !data.user) {
          setStatus("error");
          setError(t.errActivate);
          return;
        }

        saveSession(data.user);
        setStatus("success");
        window.setTimeout(() => {
          router.replace("/account");
        }, 1200);
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
      <div className="contact-success">
        {status === "loading" ? <p>{t.activating}</p> : null}
        {status === "success" ? (
          <p>
            <strong>{t.activateSuccess}</strong>
          </p>
        ) : null}
        {status === "error" ? (
          <p className="contact-error" role="alert">
            {error || t.errActivate}
          </p>
        ) : null}
      </div>
    </div>
  );
}
