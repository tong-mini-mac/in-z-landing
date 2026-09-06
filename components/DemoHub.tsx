"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  DEMO_COPY,
  demoOffersForCommercial,
  type DemoOffer,
} from "@/lib/demo-catalog";
import { SITE_COPY } from "@/lib/site-i18n";
import { useSiteLang } from "@/lib/use-site-lang";

export function DemoHub() {
  const lang = useSiteLang();
  const offers = demoOffersForCommercial();
  const copy = DEMO_COPY[lang];
  const nav = SITE_COPY[lang].nav;
  const [activeId, setActiveId] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const active = offers.find((offer) => offer.id === activeId) ?? null;

  useEffect(() => {
    const page = document.querySelector(".page-demo");
    if (!page) return;
    page.classList.add("is-demo-hub");
    page.classList.toggle("is-demo-stage", Boolean(active));
    return () => {
      page.classList.remove("is-demo-hub", "is-demo-stage");
    };
  }, [active]);

  function openOffer(offer: DemoOffer) {
    setActiveId(offer.id);
    setMenuOpen(false);
  }

  function closeStage() {
    setActiveId(null);
    setMenuOpen(false);
  }

  return (
    <div className={`demo-shell${active ? " has-stage" : ""}`}>
      <button
        type="button"
        className={`demo-menu-tab${menuOpen ? " is-open" : ""}`}
        aria-expanded={menuOpen}
        aria-controls="demo-side-menu"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span className="demo-menu-tab-bars" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <span className="demo-menu-tab-label">{copy.menuTab}</span>
      </button>

      {menuOpen ? (
        <button
          type="button"
          className="demo-menu-backdrop"
          aria-label={copy.closeMenu}
          onClick={() => setMenuOpen(false)}
        />
      ) : null}

      <aside
        id="demo-side-menu"
        className={`demo-side${menuOpen ? " is-open" : ""}`}
        aria-label={copy.menuLabel}
      >
        <p className="demo-side-brand">IN Z</p>
        <nav className="demo-side-nav">
          <a href="/">{nav.home}</a>
          <a href="/about">{nav.about}</a>
          <a href="/products">{nav.products}</a>
          <button
            type="button"
            className={!active ? "demo-side-current" : undefined}
            onClick={closeStage}
          >
            {nav.demo}
          </button>
          <a href="/contact">{nav.contact}</a>
        </nav>

        <p className="demo-side-section">{copy.trials}</p>
        <ul className="demo-side-products">
          {offers.map((offer) => (
            <li key={offer.id}>
              <button
                type="button"
                className={
                  offer.id === active?.id
                    ? "demo-side-product is-active"
                    : "demo-side-product"
                }
                onClick={() => openOffer(offer)}
              >
                {offer.name}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {active ? (
        <section className="demo-stage" aria-label={active.name}>
          <header className="demo-stage-bar">
            <button type="button" className="demo-stage-back" onClick={closeStage}>
              {copy.backToDemos}
            </button>
            <p className="demo-stage-title">{active.name}</p>
            <a
              className="demo-stage-external"
              href={active.href}
              target="_blank"
              rel="noreferrer"
            >
              {copy.openExternal}
            </a>
          </header>
          <iframe
            key={active.id}
            className="demo-frame"
            src={active.href}
            title={active.name}
            allow="clipboard-read; clipboard-write; fullscreen"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </section>
      ) : (
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
                <button
                  type="button"
                  className="demo-cta"
                  onClick={() => openOffer(offer)}
                >
                  {offer.ctaLabel[lang]}
                </button>
              </li>
            ))}
          </ul>
        </article>
      )}
    </div>
  );
}
