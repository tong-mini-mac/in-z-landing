"use client";

import Image from "next/image";
import { useState } from "react";
import { AuthLangToggle } from "@/components/AuthLangToggle";
import {
  STUDIO_CONTACT_EXPECTATIONS,
  STUDIO_COPY,
  STUDIO_STACKS,
  STUDIO_TIMELINE,
  STUDIO_VISION_DEVICES,
  STUDIO_VISION_FEATURES,
  STUDIO_VISION_MIRRORS,
  STUDIO_VISION_PROBLEMS,
  STUDIO_WORKS,
  STUDIO_WORK_FILTERS,
  studioBadgeClass,
  studioBadgeLabel,
  type LocalizedPart,
  type StudioIndustry,
} from "@/lib/studio-portfolio";
import { useStudioLang } from "@/lib/use-site-lang";

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function IconSun() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
    </svg>
  );
}

function IconMonitor() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  );
}

function IconHex() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    </svg>
  );
}

function IconBolt() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}

function IconLayers() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  );
}

function IconLinkedIn() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function ChannelArrow() {
  return (
    <svg
      className="studio-channel-arrow"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function stackIcon(id: string) {
  if (id === "ai") return <IconSun />;
  if (id === "systems") return <IconMonitor />;
  if (id === "domain") return <IconHex />;
  return <IconBolt />;
}

function renderParts(parts: LocalizedPart[]) {
  return parts.map((part, index) =>
    part.strong ? (
      <strong key={index}>{part.text}</strong>
    ) : (
      <span key={index}>{part.text}</span>
    ),
  );
}

export function StudioPortfolio() {
  const [lang, setLang] = useStudioLang();
  const t = STUDIO_COPY[lang];
  const [workFilter, setWorkFilter] = useState<"all" | StudioIndustry>("all");

  const visibleWorks =
    workFilter === "all"
      ? STUDIO_WORKS
      : STUDIO_WORKS.filter((work) => work.industry === workFilter);

  return (
    <main className="studio-page">
      <div className="studio-bg-mesh" aria-hidden="true" />
      <div className="studio-bg-grid" aria-hidden="true" />

      <header className="studio-top">
        <a className="studio-mark" href="https://www.inz.lol" aria-label={t.brand}>
          <Image
            src="/logo-transparent.png"
            alt=""
            width={48}
            height={48}
            priority
            unoptimized
          />
          <span>{t.brand}</span>
        </a>
        <div className="studio-top-right">
          <nav className="studio-nav" aria-label="Studio">
            <a href="https://www.inz.lol">{t.navHome}</a>
            <a href="#who">{t.navAbout}</a>
            <a href="#work">{t.navWork}</a>
            <a href="#vision">{t.navVision}</a>
            <a href="#talk">{t.navTalk}</a>
          </nav>
          <div className="studio-lang">
            <AuthLangToggle lang={lang} onChange={setLang} />
          </div>
        </div>
      </header>

      {/* SECTION 1: Hero */}
      <section className="studio-hero" id="hero" aria-label="Hero">
        <div className="studio-tag">
          <span className="studio-tag-dot" />
          {t.heroTag}
        </div>

        <h1 className="studio-headline">
          <span className="studio-headline-line1">{t.heroLine1}</span>
          <span className="studio-headline-line2">{t.heroLine2}</span>
        </h1>

        <p className="studio-sub">
          {t.heroSubBefore} <strong>{t.heroSubStrong1}</strong> {t.heroSubMid}
          <br />
          {t.heroSubNow} <strong>{t.heroSubStrong2}</strong> {t.heroSubAfter}
        </p>

        <div className="studio-proof-bar">
          <div className="studio-proof-item">
            <div className="studio-proof-num">
              <span>5</span>
            </div>
            <div className="studio-proof-label">{t.proofIndustries}</div>
          </div>
          <div className="studio-proof-item">
            <div className="studio-proof-num">
              <span>✓</span>
            </div>
            <div className="studio-proof-label">{t.proofReady}</div>
          </div>
          <div className="studio-proof-item">
            <div className="studio-proof-num">
              <span>11</span>
            </div>
            <div className="studio-proof-label">{t.proofSystems}</div>
          </div>
          <div className="studio-proof-item">
            <div className="studio-proof-num">
              <span>1</span>
            </div>
            <div className="studio-proof-label">{t.proofVision}</div>
          </div>
        </div>

        <div className="studio-cta-group">
          <a href="#work" className="studio-btn-primary">
            {t.heroCtaWork}
            <ArrowIcon />
          </a>
          <a href="#vision" className="studio-btn-secondary">
            {t.heroCtaVision}
            <ArrowIcon />
          </a>
        </div>

        <div className="studio-scroll-hint">
          <span>{t.scrollHint}</span>
          <div className="studio-scroll-line" />
        </div>
      </section>

      {/* SECTION 2: About */}
      <section className="studio-about" id="who" aria-labelledby="studio-about-title">
        <div className="studio-about-inner">
          <div className="studio-about-left">
            <div className="studio-section-label">{t.aboutLabel}</div>

            <h2 className="studio-about-title" id="studio-about-title">
              {t.aboutName}
              <br />
              <span>{t.aboutRole}</span>
            </h2>

            <blockquote className="studio-philosophy">
              <p>
                &ldquo;{t.aboutQuoteBefore}
                <br />
                {t.aboutQuoteMid} <strong>{t.aboutQuoteStrong}</strong>
                <br />
                {t.aboutQuoteAfter}&rdquo;
              </p>
            </blockquote>

            <div className="studio-bio">
              <p>
                {t.aboutBio1Before} <strong>{t.aboutBio1Strong}</strong>{" "}
                {t.aboutBio1After}
              </p>
              <p>
                {t.aboutBio2Before} <strong>{t.aboutBio2Strong}</strong>
              </p>
              <p>
                {t.aboutBio3Before} <strong>{t.aboutBio3Strong1}</strong>{" "}
                {t.aboutBio3Mid} <strong>{t.aboutBio3Strong2}</strong>{" "}
                {t.aboutBio3After}
              </p>
            </div>

            <div className="studio-timeline">
              {STUDIO_TIMELINE.map((item) => (
                <div className="studio-tl-item" key={item.title.en}>
                  <div className="studio-tl-dot" />
                  <div>
                    <div className="studio-tl-title">{item.title[lang]}</div>
                    <div className="studio-tl-sub">{item.sub[lang]}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="studio-self-taught">
              <IconLayers />
              {t.aboutSelfTaught}
            </div>
          </div>

          <div className="studio-about-right">
            {STUDIO_STACKS.map((group) => (
              <div
                key={group.id}
                className={
                  group.variant === "now"
                    ? "studio-stack-group studio-stack-group-now"
                    : "studio-stack-group"
                }
              >
                <div className="studio-stack-group-label">
                  {stackIcon(group.id)}
                  {group.label[lang]}
                </div>
                <div className="studio-tags">
                  {group.tags.map((tag) => (
                    <span
                      key={tag.label.en}
                      className={
                        group.variant === "now"
                          ? "studio-tag-item studio-tag-item-now"
                          : tag.highlight
                            ? "studio-tag-item studio-tag-item-highlight"
                            : "studio-tag-item"
                      }
                    >
                      {tag.label[lang]}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: Portfolio */}
      <section className="studio-portfolio" id="work" aria-labelledby="studio-work-title">
        <div className="studio-portfolio-header">
          <div>
            <div className="studio-section-label">{t.workLabel}</div>
            <h2 className="studio-portfolio-title" id="studio-work-title">
              {t.workTitleLine}
              <br />
              <span>{t.workTitleAccent}</span>
            </h2>
          </div>
          <div className="studio-filter-tabs" role="tablist" aria-label="Filter portfolio">
            {STUDIO_WORK_FILTERS.map((filter) => (
              <button
                key={filter.id}
                type="button"
                role="tab"
                aria-selected={workFilter === filter.id}
                className={
                  workFilter === filter.id
                    ? "studio-filter-tab studio-filter-tab-active"
                    : "studio-filter-tab"
                }
                onClick={() => setWorkFilter(filter.id)}
              >
                {t[filter.labelKey]}
              </button>
            ))}
          </div>
        </div>

        <div className="studio-work-grid">
          {visibleWorks.map((work) => (
            <article key={work.id} className="studio-work-card" data-industry={work.industry}>
              <div className="studio-work-card-top">
                <div className="studio-work-card-icon" aria-hidden="true">
                  {work.icon}
                </div>
                <div className="studio-work-card-badges">
                  {work.badges.map((badge) => (
                    <span key={badge} className={studioBadgeClass(badge)}>
                      {studioBadgeLabel(badge, work.industryLabel[lang], lang)}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="studio-work-card-name">{work.name[lang]}</h3>
                <p className="studio-work-card-tagline">{work.tagline[lang]}</p>
              </div>
              <p className="studio-work-card-problem">
                {renderParts(work.problem[lang])}
              </p>
              <div className="studio-work-card-tags">
                {work.tags.map((tag) => (
                  <span key={tag} className="studio-work-tag-sm">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="studio-work-card-number" aria-hidden="true">
                {work.number}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* SECTION 4: The Vision */}
      <section className="studio-vision" id="vision" aria-labelledby="studio-vision-title">
        <div className="studio-section-label studio-section-label-purple">{t.visionLabel}</div>

        <div className="studio-vision-manifesto">
          <h2 id="studio-vision-title">
            {t.visionManifestoLine1}
            <br />
            {t.visionManifestoLine2Before}{" "}
            <span className="studio-grad">{t.visionManifestoGrad}</span>
          </h2>
          <p>
            {t.visionManifestoP1Before}{" "}
            <strong>{t.visionManifestoP1Strong}</strong> {t.visionManifestoP1Mid}{" "}
            <strong>{t.visionManifestoP1Strong2}</strong>
          </p>
        </div>

        <div className="studio-problem-row">
          {STUDIO_VISION_PROBLEMS.map((item) => (
            <div className="studio-problem-card" key={item.title.en}>
              <div className="studio-problem-icon" aria-hidden="true">
                {item.icon}
              </div>
              <div className="studio-problem-title">{item.title[lang]}</div>
              <div className="studio-problem-desc">{item.desc[lang]}</div>
            </div>
          ))}
        </div>

        <div className="studio-divider-arrow">
          <div className="studio-divider-line" />
          <div className="studio-arrow-box">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
            {t.visionDivider}
          </div>
          <div className="studio-divider-line" />
        </div>

        <div className="studio-solution-header">
          <h3>{t.visionSolutionTitle}</h3>
          <p>{t.visionSolutionSub}</p>
        </div>

        <div className="studio-device-visual">
          {STUDIO_VISION_DEVICES.map((device, index) => (
            <div key={device.id} className="studio-device-cluster">
              {index > 0 ? <div className="studio-connector" aria-hidden="true" /> : null}
              <div className="studio-device-node">
                <div className={`studio-device-circle studio-device-${device.id}`}>{device.icon}</div>
                <div className={`studio-device-label studio-device-label-${device.tone}`}>
                  {device.label[lang]}
                </div>
                <div className="studio-device-sub">
                  {device.sub[lang][0]}
                  <br />
                  {device.sub[lang][1]}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="studio-feature-grid">
          {STUDIO_VISION_FEATURES.map((feature) => (
            <div className="studio-feature-card" key={feature.num.en}>
              <div className="studio-feature-num">{feature.num[lang]}</div>
              <div className="studio-feature-title">{feature.title[lang]}</div>
              <p className="studio-feature-desc">
                {renderParts(feature.parts[lang])}
              </p>
            </div>
          ))}
        </div>

        <div className="studio-vision-statement">
          <span className="studio-quote-mark" aria-hidden="true">
            &ldquo;
          </span>
          <h3>
            {t.visionQuoteLine1}
            <br />
            {t.visionQuoteLine2}
            <br />
            <span className="studio-grad">{t.visionQuoteGrad}</span>
          </h3>
          <p>{t.visionQuoteBody}</p>
        </div>

        <div className="studio-align-block">
          <div className="studio-align-left">
            <div className="studio-align-label">{t.visionAlignLabel}</div>
            <h3 className="studio-align-heading">
              {t.visionAlignHeadingBefore}
              <br />
              <span>{t.visionAlignHeadingGrad}</span>
              <br />
              {t.visionAlignHeadingAfter}
            </h3>
            <div className="studio-align-body">
              <p className="studio-align-para">
                {t.visionAlignP1Before} <strong>{t.visionAlignP1Strong}</strong>
              </p>
              <p className="studio-align-para">
                {t.visionAlignP2Before} <strong>{t.visionAlignP2Strong}</strong>{" "}
                {t.visionAlignP2After}
              </p>
              <p className="studio-align-para">
                {t.visionAlignP3Before} <strong>{t.visionAlignP3Strong}</strong>{" "}
                {t.visionAlignP3After}
              </p>
            </div>
            <div className="studio-cta-wrap">
              <a className="studio-vision-cta" href={t.visionCtaHref}>
                {t.visionCta}
                <ArrowIcon />
              </a>
            </div>
          </div>

          <div className="studio-align-right">
            {STUDIO_VISION_MIRRORS.map((item) => (
              <div className="studio-mirror-card" key={item.title.en}>
                <div className="studio-mirror-icon" aria-hidden="true">
                  {item.icon}
                </div>
                <div>
                  <div className="studio-mirror-title">{item.title[lang]}</div>
                  <div className="studio-mirror-desc">
                    {item.before[lang]} <em>{item.em[lang]}</em>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: Contact */}
      <section className="studio-contact" id="talk" aria-labelledby="studio-contact-title">
        <div className="studio-section-label">{t.contactLabel}</div>

        <div className="studio-avail-badge">
          <span className="studio-avail-dot" />
          {t.contactAvail}
        </div>

        <div className="studio-contact-hero">
          <h2 id="studio-contact-title">
            <span className="studio-contact-line">{t.contactHeroLine1}</span>
            <span className="studio-grad">{t.contactHeroGrad}</span>
            <span className="studio-contact-dim">{t.contactHeroDim}</span>
          </h2>
          <p>
            {t.contactHeroPBefore} <strong>{t.contactHeroPStrong}</strong>
          </p>
          <div className="studio-contact-buttons">
            <a className="studio-contact-btn-primary" href={t.contactBtnPrimaryHref}>
              {t.contactBtnPrimary}
              <ArrowIcon />
            </a>
            <a
              className="studio-contact-btn-secondary"
              href={t.contactLinkedInHref}
              target="_blank"
              rel="noreferrer"
            >
              <IconLinkedIn />
              {t.contactBtnSecondary}
            </a>
          </div>
        </div>

        <div className="studio-contact-divider" />

        <div className="studio-contact-grid">
          <div>
            <div className="studio-channel-label">{t.contactChannelsLabel}</div>
            <div className="studio-channels">
              <a className="studio-channel-item" href={t.contactEmailHref}>
                <div className="studio-channel-icon" aria-hidden="true">
                  ✉️
                </div>
                <div className="studio-channel-info">
                  <div className="studio-channel-name">{t.contactChannelEmail}</div>
                  <div className="studio-channel-value">{t.contactEmail}</div>
                </div>
                <ChannelArrow />
              </a>
              <a
                className="studio-channel-item"
                href={t.contactLinkedInHref}
                target="_blank"
                rel="noreferrer"
              >
                <div className="studio-channel-icon" aria-hidden="true">
                  💼
                </div>
                <div className="studio-channel-info">
                  <div className="studio-channel-name">{t.contactChannelLinkedIn}</div>
                  <div className="studio-channel-value">{t.contactLinkedIn}</div>
                </div>
                <ChannelArrow />
              </a>
              <a
                className="studio-channel-item"
                href={t.contactWebHref}
                target="_blank"
                rel="noreferrer"
              >
                <div className="studio-channel-icon" aria-hidden="true">
                  🌐
                </div>
                <div className="studio-channel-info">
                  <div className="studio-channel-name">{t.contactChannelWeb}</div>
                  <div className="studio-channel-value">{t.contactWeb}</div>
                </div>
                <ChannelArrow />
              </a>
            </div>
          </div>

          <div className="studio-response-block">
            <div className="studio-response-label">{t.contactResponseLabel}</div>
            <div className="studio-response-card">
              <div className="studio-response-title">
                <span className="studio-response-dot" />
                {t.contactResponseTitle}
              </div>
              <div className="studio-response-items">
                {STUDIO_CONTACT_EXPECTATIONS.map((item, index) => (
                  <div className="studio-response-item" key={index}>
                    {"parts" in item
                      ? renderParts(item.parts[lang])
                      : item.text[lang]}
                  </div>
                ))}
              </div>
            </div>
            <div className="studio-response-card">
              <div className="studio-response-title">
                <span aria-hidden="true">💡</span>
                {t.contactHintTitle}
              </div>
              <p className="studio-response-desc">
                {t.contactHintBefore} <strong>{t.contactHintStrong}</strong>
              </p>
            </div>
          </div>
        </div>

        <div className="studio-footer-strip">
          <div className="studio-footer-left">
            <div className="studio-footer-name">{t.contactFooterName}</div>
            <div className="studio-footer-sub">{t.contactFooterSub}</div>
          </div>
          <div className="studio-footer-right">
            <a className="studio-footer-link" href="https://www.inz.lol">
              {t.navHome}
            </a>
            <a className="studio-footer-link" href="#who">
              {t.navAbout}
            </a>
            <a className="studio-footer-link" href="#work">
              {t.navWork}
            </a>
            <a className="studio-footer-link" href="#vision">
              {t.navVision}
            </a>
            <span className="studio-footer-copy">{t.contactFooterCopy}</span>
          </div>
        </div>
      </section>
    </main>
  );
}
