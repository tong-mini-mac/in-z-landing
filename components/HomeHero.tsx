"use client";

import Image from "next/image";
import { SITE_COPY } from "@/lib/site-i18n";
import { useSiteLang } from "@/lib/use-site-lang";

export function HomeHero() {
  const lang = useSiteLang();
  const t = SITE_COPY[lang].home;

  return (
    <section className="hero" aria-label="Brand">
      <Image
        className="logo-mark"
        src="/logo-transparent.png"
        alt="IN Z"
        width={400}
        height={400}
        priority
        unoptimized
      />
      <div className="hero-copy">
        <p className="brand">
          <span className="hero-copy-line">{t.brand}</span>
        </p>
        <h1 className="tagline">
          <span className="hero-copy-line">{t.tagline}</span>
        </h1>
      </div>
    </section>
  );
}
