"use client";

import { SITE_COPY } from "@/lib/site-i18n";
import { useSiteLang } from "@/lib/use-site-lang";

export function AboutContent() {
  const lang = useSiteLang();
  const t = SITE_COPY[lang].about;

  return (
    <article className="about">
      <header className="about-hero">
        <p className="about-eyebrow">{t.eyebrow}</p>
        <h1>{t.title}</h1>
        <p className="about-lead">{t.lead}</p>
        <p className="about-motto">{t.motto}</p>
      </header>

      <section className="about-block">
        <h2>{t.whoTitle}</h2>
        <p>{t.whoP1}</p>
        <blockquote>{t.whoQuote}</blockquote>
        <p>{t.whoP2}</p>
      </section>

      <section className="about-block">
        <h2>{t.storyTitle}</h2>
        <p>{t.storyP1}</p>
        <p>{t.storyP2}</p>
        <p>{t.storyP3}</p>
        <p>{t.storyP4}</p>
        <ul>
          {t.storyBullets.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </section>

      <section className="about-block">
        <h2>{t.rippleTitle}</h2>
        <p>{t.rippleLead}</p>
        <ul className="about-pillars about-pillars-inline">
          {t.rippleItems.map((item) => (
            <li key={item.title}>
              <strong>{item.title}</strong>
              <span>{item.body}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="about-block">
        <h2>{t.missionTitle}</h2>
        <p>{t.missionLead}</p>
        <ul className="about-pillars">
          {t.pillars.map((pillar) => (
            <li key={pillar.title}>
              <strong>{pillar.title}</strong>
              <ul>
                {pillar.lines.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      <section className="about-block">
        <h2>{t.whyTitle}</h2>
        <ul>
          {t.whyItems.map((item) => (
            <li key={item.title}>
              <strong>{item.title}</strong> — {item.body}
            </li>
          ))}
        </ul>
      </section>

      <section className="about-block">
        <h2>{t.visionTitle}</h2>
        <p>{t.visionLead}</p>
        <ul>
          {t.visionItems.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </section>

      <section className="about-block about-close" id="contact">
        <h2>{t.closeTitle}</h2>
        <p>{t.closeLead}</p>
        <p className="about-signoff">{t.signoff}</p>
        <p>
          <a
            className="about-mail"
            href="https://personal-secretary-production-3d5f.up.railway.app/contact/"
            target="_blank"
            rel="noreferrer"
          >
            {t.contactCta}
          </a>
        </p>
      </section>
    </article>
  );
}
