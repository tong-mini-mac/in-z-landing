"use client";

import { ContactForm } from "@/components/ContactForm";
import { SiteFooter, SiteNav } from "@/components/SiteChrome";
import type { ContactChannel } from "@/lib/contact";
import { SITE_COPY } from "@/lib/site-i18n";
import { useSiteLang } from "@/lib/use-site-lang";

export function ContactPageView({ channel }: { channel: ContactChannel }) {
  const lang = useSiteLang();
  const t = SITE_COPY[lang].contact;

  return (
    <main className="page page-scroll">
      <div className="bg bg-soft" aria-hidden="true" />
      <SiteNav />

      <article className="about contact-page">
        <header className="about-hero">
          <p className="about-eyebrow">{t.eyebrow}</p>
          <h1>{t.channels[channel]}</h1>
          <p className="about-lead">{t.lead}</p>
        </header>

        <ContactForm channel={channel} />
      </article>

      <SiteFooter />
    </main>
  );
}
