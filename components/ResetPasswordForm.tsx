"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { AUTH_COPY } from "@/lib/auth-i18n";
import { useSiteLang } from "@/lib/use-site-lang";

export function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const lang = useSiteLang();
  const t = AUTH_COPY[lang];
  const token = searchParams.get("token") || "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!token) {
      setError(t.errResetToken);
      return;
    }
    if (password.length < 8) {
      setError(t.errPassword);
      return;
    }
    if (password !== confirm) {
      setError(t.errConfirm);
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !data.ok) {
        setError(
          data.error === "invalid" || data.error === "missing"
            ? t.errResetToken
            : data.error === "password"
              ? t.errPassword
              : t.errGeneric,
        );
        setSubmitting(false);
        return;
      }
      setDone(true);
      window.setTimeout(() => {
        router.replace("/auth");
      }, 1400);
    } catch {
      setError(t.errGeneric);
      setSubmitting(false);
    }
  }

  if (!token) {
    return (
      <div className="auth-shell">
        <p className="contact-error" role="alert">
          {t.errResetToken}
        </p>
        <p className="auth-switch">
          <Link className="auth-inline-link" href="/auth/forgot">
            {t.forgotPassword}
          </Link>
        </p>
      </div>
    );
  }

  if (done) {
    return (
      <div className="auth-shell">
        <div className="contact-success">
          <p>
            <strong>{t.resetSuccess}</strong>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-shell">
      <form className="contact-form auth-form" onSubmit={onSubmit}>
        <label className="contact-field">
          <span>{t.password}</span>
          <div className="auth-password-row">
            <input
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={submitting}
              minLength={8}
              required
            />
            <label className="auth-show-password">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={(e) => setShowPassword(e.target.checked)}
              />
              {t.showPassword}
            </label>
          </div>
        </label>

        <label className="contact-field">
          <span>{t.confirmPassword}</span>
          <input
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            disabled={submitting}
            minLength={8}
            required
          />
        </label>

        {error ? (
          <p className="contact-error" role="alert">
            {error}
          </p>
        ) : null}

        <button type="submit" className="contact-submit" disabled={submitting}>
          {submitting ? t.submitting : t.resetSubmit}
        </button>

        <p className="auth-switch">
          <Link className="auth-inline-link" href="/auth">
            {t.backToSignIn}
          </Link>
        </p>
      </form>
    </div>
  );
}
