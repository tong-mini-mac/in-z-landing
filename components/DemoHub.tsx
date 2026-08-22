"use client";

import { LogoMark } from "@/components/LogoMark";
import {
  DEMO_COPY,
  demoOffersForCommercial,
} from "@/lib/demo-catalog";
import { useSiteLang } from "@/lib/use-site-lang";

export function DemoHub() {
  const lang = useSiteLang();
  const offers = demoOffersForCommercial();
  const copy = DEMO_COPY[lang];

  return (
    <article className="demo-body">
      <header className="demo-hero">
        <LogoMark className="logo-mark logo-mark-demo" priority />
        <p className="brand">IN Z</p>
        <p className="demo-label">{copy.label}</p>
        <p className="demo-lead">{copy.lead}</p>
      </header>

      <ul className="demo-list">
        {offers.map((offer) => (
          <li key={offer.id} className="demo-item">
            <div className="demo-item-copy">
              <h2 className="demo-product-name">{offer.name}</h2>
              <p className="demo-trial-title">{offer.trialTitle[lang]}</p>
              <p className="demo-trial-summary">{offer.trialSummary[lang]}</p>
              <p className="demo-meta">
                {offer.requiresSignup ? copy.metaSignup : copy.metaNoSignup}
              </p>
            </div>
            <a
              className="demo-cta"
              href={offer.href}
              target={offer.external ? "_blank" : undefined}
              rel={offer.external ? "noreferrer" : undefined}
            >
              {offer.ctaLabel[lang]}
            </a>
          </li>
        ))}
      </ul>
    </article>
  );
}
