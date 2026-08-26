"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AUTH_SESSION_CHANGE_EVENT, getSession } from "@/lib/auth-session";
import {
  COOKIE_SETTINGS_OPEN_EVENT,
  needsCookieConsent,
  readCookieConsentForEmail,
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

  function syncEmail() {
    return getSession()?.user.email ?? null;
  }

  function openForEdit(startStep: Step = "main") {
    const sessionEmail = syncEmail();
    setEmail(sessionEmail);
    const existing = readCookieConsentForEmail(sessionEmail);
    setAnalytics(Boolean(existing?.preferences.analytics));
    setMarketing(Boolean(existing?.preferences.marketing));
    setStep(startStep);
    setVisible(true);
  }

  useEffect(() => {
    const sessionEmail = syncEmail();
    setEmail(sessionEmail);
    if (needsCookieConsent(sessionEmail)) {
      setVisible(true);
      setStep("main");
    }
  }, []);

  useEffect(() => {
    function onAuthChange() {
      const sessionEmail = syncEmail();
      setEmail(sessionEmail);
      if (needsCookieConsent(sessionEmail)) {
        setVisible(true);
        setStep("main");
      }
    }

    function onOpenSettings() {
      openForEdit("customize");
    }

    window.addEventListener("storage", onAuthChange);
    window.addEventListener(AUTH_SESSION_CHANGE_EVENT, onAuthChange);
    window.addEventListener(COOKIE_SETTINGS_OPEN_EVENT, onOpenSettings);
    return () => {
      window.removeEventListener("storage", onAuthChange);
      window.removeEventListener(AUTH_SESSION_CHANGE_EVENT, onAuthChange);
      window.removeEventListener(COOKIE_SETTINGS_OPEN_EVENT, onOpenSettings);
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
      <div
        className="cookie-modal-backdrop"
        aria-hidden="true"
        onClick={() => {
          /* keep required first-visit blocking; allow dismiss only when editing existing */
          if (!needsCookieConsent(email)) setVisible(false);
        }}
      />
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
                onClick={() => setStep("customize")}
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
                onClick={() => {
                  if (needsCookieConsent(email)) setStep("main");
                  else setVisible(false);
                }}
              >
                {needsCookieConsent(email) ? t.back : t.close}
              </button>
              <button
                type="button"
                className="cookie-consent-btn is-primary"
                onClick={() => finish("custom", { analytics, marketing })}
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
