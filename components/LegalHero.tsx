"use client";

import { SITE_COPY } from "@/lib/site-i18n";
import { useSiteLang } from "@/lib/use-site-lang";

type LegalHeroProps = {
  kind: "terms" | "privacy";
  lead?: string;
  motto?: string;
};

export function LegalHero({ kind, lead, motto }: LegalHeroProps) {
  const lang = useSiteLang();
  const t = SITE_COPY[lang].legal;

  return (
    <header className="about-hero">
      <p className="about-eyebrow">
        {kind === "terms" ? t.termsEyebrow : t.privacyEyebrow}
      </p>
      <h1>{kind === "terms" ? t.termsTitle : t.privacyTitle}</h1>
      {lead ? <p className="about-lead">{lead}</p> : null}
      {motto ? <p className="about-motto">{motto}</p> : null}
      {lang === "th" ? <p className="about-lead">{t.originalNote}</p> : null}
    </header>
  );
}
