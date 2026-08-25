"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { AUTH_COPY } from "@/lib/auth-i18n";
import { isValidEmail } from "@/lib/auth-session";
import { useSiteLang } from "@/lib/use-site-lang";

export function ForgotPasswordForm() {
  const lang = useSiteLang();
  const t = AUTH_COPY[lang];
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const nextEmail = email.trim().toLowerCase();
    if (!nextEmail || !isValidEmail(nextEmail)) {
      setError(t.errEmail);
      return;
    }
    setSubmitting(true);
    try {
      await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: nextEmail, lang }),
      });
      setSent(true);
    } catch {
      setError(t.errEmailSend);
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) {
    return (
      <div className="auth-shell">
        <div className="contact-success">
          <p>
            <strong>{t.forgotSentTitle}</strong>
          </p>
          <p>{t.forgotSentBody}</p>
          <p className="auth-switch">
            <Link className="auth-inline-link" href="/auth">
              {t.backToSignIn}
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-shell">
      <form className="contact-form auth-form" onSubmit={onSubmit}>
        <label className="contact-field">
          <span>{t.email}</span>
          <input
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={submitting}
            required
          />
        </label>

        {error ? (
          <p className="contact-error" role="alert">
            {error}
          </p>
        ) : null}

        <button type="submit" className="contact-submit" disabled={submitting}>
          {submitting ? t.submitting : t.forgotSubmit}
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
