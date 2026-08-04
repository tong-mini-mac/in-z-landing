"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  AUTH_LANG_CHANGE_EVENT,
  getStoredAuthLang,
  type AuthLang,
} from "@/lib/auth-i18n";
import {
  DEMO_COPY,
  demoOffersForCommercial,
} from "@/lib/demo-catalog";

export function DemoHub() {
  const [lang, setLang] = useState<AuthLang>("th");
  const offers = demoOffersForCommercial();
  const copy = DEMO_COPY[lang];

  useEffect(() => {
    const stored = getStoredAuthLang();
    setLang(stored);
    document.documentElement.lang = stored;

    function onLangChange(event: Event) {
      const detail = (event as CustomEvent<{ lang?: AuthLang }>).detail;
      const next = detail?.lang || getStoredAuthLang();
      setLang(next);
      document.documentElement.lang = next;
    }

    window.addEventListener(AUTH_LANG_CHANGE_EVENT, onLangChange);
    return () => window.removeEventListener(AUTH_LANG_CHANGE_EVENT, onLangChange);
  }, []);

  return (
    <article className="demo-body">
      <header className="demo-hero">
        <Image
          className="logo-mark logo-mark-demo"
          src="/logo-transparent.png"
          alt="IN Z"
          width={400}
          height={400}
          priority
          unoptimized
        />
        <p className="brand">IN Z</p>
        <p className="demo-label">{copy.label}</p>
        <p className="demo-lead">{copy.lead}</p>
      </header>

      <ul className="demo-list">
        {offers.map((offer) => {
          const isExternal = offer.external;
          return (
            <li key={offer.id} className="demo-item">
              <div className="demo-item-copy">
                <h2>{offer.name}</h2>
                <p className="demo-trial-title">{offer.trialTitle[lang]}</p>
                <p className="demo-trial-summary">{offer.trialSummary[lang]}</p>
                <p className="demo-meta">
                  {offer.requiresSignup ? copy.metaSignup : copy.metaNoSignup}
                </p>
              </div>
              <a
                className="demo-cta"
                href={offer.href}
                {...(isExternal
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {offer.ctaLabel[lang]}
              </a>
            </li>
          );
        })}
      </ul>
    </article>
  );
}
