"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AUTH_SESSION_CHANGE_EVENT, getSession } from "@/lib/auth-session";
import {
  needsCookieConsent,
  writeCookieConsent,
  type CookiePreferences,
} from "@/lib/cookie-consent";
import { SITE_COPY } from "@/lib/site-i18n";
import { useSiteLang } from "@/lib/use-site-lang";

type Step = "main" | "customize";

export function CookieConsent() {
  const lang = useSiteLang();
  const t = SITE_COPY[lang].cookies;
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState<Step>("main");
  const [email, setEmail] = useState<string | null>(null);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const sessionEmail = getSession()?.user.email ?? null;
    setEmail(sessionEmail);
    setVisible(needsCookieConsent(sessionEmail));
    setStep("main");
  }, []);

  useEffect(() => {
    function onStorage() {
      const sessionEmail = getSession()?.user.email ?? null;
      setEmail(sessionEmail);
      setVisible(needsCookieConsent(sessionEmail));
    }
    window.addEventListener("storage", onStorage);
    window.addEventListener(AUTH_SESSION_CHANGE_EVENT, onStorage);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(AUTH_SESSION_CHANGE_EVENT, onStorage);
    };
  }, []);

  function finish(
    choice: "accepted" | "rejected" | "custom",
    preferences?: Partial<CookiePreferences>,
  ) {
    writeCookieConsent(choice, preferences, email);
    setVisible(false);
    setStep("main");
  }

  if (!visible) return null;

  return (
    <div className="cookie-modal" role="presentation">
      <div className="cookie-modal-backdrop" aria-hidden="true" />
      <div
        className="cookie-modal-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-modal-title"
      >
        {step === "main" ? (
          <>
            <p id="cookie-modal-title" className="cookie-modal-title">
              {t.title}
            </p>
            <p className="cookie-modal-body">
              {t.body}{" "}
              <Link href="/privacy" className="cookie-consent-link">
                {t.privacyLink}
              </Link>
            </p>
            <div className="cookie-modal-actions">
              <button
                type="button"
                className="cookie-consent-btn is-primary"
                onClick={() => finish("accepted")}
              >
                {t.accept}
              </button>
              <button
                type="button"
                className="cookie-consent-btn is-secondary"
                onClick={() => finish("rejected")}
              >
                {t.reject}
              </button>
              <button
                type="button"
                className="cookie-consent-btn is-secondary"
                onClick={() => {
                  setAnalytics(false);
                  setMarketing(false);
                  setStep("customize");
                }}
              >
                {t.essential}
              </button>
            </div>
          </>
        ) : (
          <>
            <p id="cookie-modal-title" className="cookie-modal-title">
              {t.customizeTitle}
            </p>
            <p className="cookie-modal-body">{t.customizeBody}</p>

            <ul className="cookie-pref-list">
              <li className="cookie-pref-item">
                <div>
                  <strong>{t.prefEssential}</strong>
                  <p>{t.prefEssentialDesc}</p>
                </div>
                <span className="cookie-pref-lock">{t.alwaysOn}</span>
              </li>
              <li className="cookie-pref-item">
                <div>
                  <strong>{t.prefAnalytics}</strong>
                  <p>{t.prefAnalyticsDesc}</p>
                </div>
                <label className="cookie-pref-toggle">
                  <input
                    type="checkbox"
                    checked={analytics}
                    onChange={(e) => setAnalytics(e.target.checked)}
                  />
                  <span className="sr-only">{t.prefAnalytics}</span>
                </label>
              </li>
              <li className="cookie-pref-item">
                <div>
                  <strong>{t.prefMarketing}</strong>
                  <p>{t.prefMarketingDesc}</p>
                </div>
                <label className="cookie-pref-toggle">
                  <input
                    type="checkbox"
                    checked={marketing}
                    onChange={(e) => setMarketing(e.target.checked)}
                  />
                  <span className="sr-only">{t.prefMarketing}</span>
                </label>
              </li>
            </ul>

            <div className="cookie-modal-actions">
              <button
                type="button"
                className="cookie-consent-btn is-secondary"
                onClick={() => setStep("main")}
              >
                {t.back}
              </button>
              <button
                type="button"
                className="cookie-consent-btn is-primary"
                onClick={() =>
                  finish("custom", { analytics, marketing })
                }
              >
                {t.save}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
