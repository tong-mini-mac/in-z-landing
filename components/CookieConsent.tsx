"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  readCookieConsent,
  writeCookieConsent,
  type CookieConsentChoice,
} from "@/lib/cookie-consent";
import { SITE_COPY } from "@/lib/site-i18n";
import { useSiteLang } from "@/lib/use-site-lang";

export function CookieConsent() {
  const lang = useSiteLang();
  const t = SITE_COPY[lang].cookies;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(readCookieConsent() === null);
  }, []);

  function choose(choice: CookieConsentChoice) {
    writeCookieConsent(choice);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="cookie-consent" role="dialog" aria-live="polite" aria-label={t.title}>
      <div className="cookie-consent-inner">
        <div className="cookie-consent-copy">
          <p className="cookie-consent-title">{t.title}</p>
          <p className="cookie-consent-body">
            {t.body}{" "}
            <Link href="/privacy" className="cookie-consent-link">
              {t.privacyLink}
            </Link>
          </p>
        </div>
        <div className="cookie-consent-actions">
          <button
            type="button"
            className="cookie-consent-btn is-secondary"
            onClick={() => choose("essential")}
          >
            {t.essential}
          </button>
          <button
            type="button"
            className="cookie-consent-btn is-primary"
            onClick={() => choose("accepted")}
          >
            {t.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
