"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AuthLangToggle } from "@/components/AuthLangToggle";
import {
  DEMO_COPY,
  demoOffersForCommercial,
  type DemoOffer,
} from "@/lib/demo-catalog";
import {
  AUTH_SESSION_CHANGE_EVENT,
  getSession,
  type AuthSession,
} from "@/lib/auth-session";
import { isDemoAdminEmail } from "@/lib/demo-access";
import {
  pathPartsFromHref,
  requestProductHandoffUrl,
} from "@/lib/product-handoff-client";
import { createDemoUsageTracker } from "@/lib/product-usage";
import { SITE_COPY } from "@/lib/site-i18n";
import { useSiteLang } from "@/lib/use-site-lang";

function isFrameable(offer: DemoOffer): boolean {
  return offer.frameable !== false;
}

export function DemoHub() {
  const lang = useSiteLang();
  const offers = demoOffersForCommercial();
  const copy = DEMO_COPY[lang];
  const nav = SITE_COPY[lang].nav;
  const [session, setSession] = useState<AuthSession | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [stageUrl, setStageUrl] = useState("");
  const [loadingStage, setLoadingStage] = useState(false);
  const [usedSso, setUsedSso] = useState(false);
  const usageRef = useRef(createDemoUsageTracker());
  const activeUsageRef = useRef<{
    productId: string;
    viaHandoff: boolean;
  } | null>(null);

  const active = offers.find((offer) => offer.id === activeId) ?? null;

  useEffect(() => {
    function syncSession() {
      setSession(getSession());
    }
    syncSession();
    window.addEventListener(AUTH_SESSION_CHANGE_EVENT, syncSession);
    window.addEventListener("storage", syncSession);
    return () => {
      window.removeEventListener(AUTH_SESSION_CHANGE_EVENT, syncSession);
      window.removeEventListener("storage", syncSession);
    };
  }, []);

  useEffect(() => {
    const page = document.querySelector(".page-demo");
    if (!page) return;
    page.classList.add("is-demo-hub");
    page.classList.toggle("is-demo-stage", Boolean(active));
    return () => {
      page.classList.remove("is-demo-hub", "is-demo-stage");
    };
  }, [active]);

  useEffect(() => {
    const usage = usageRef.current;

    function onVisibility() {
      if (document.visibilityState === "hidden") {
        usage.stop("hidden");
        return;
      }
      const pending = activeUsageRef.current;
      if (pending) {
        usage.start(pending.productId, getSession(), {
          openedViaHandoff: true,
        });
      }
    }

    function onPageHide() {
      usage.stop("pagehide");
    }

    window.addEventListener("pagehide", onPageHide);
    document.addEventListener("visibilitychange", onVisibility);

    const heartbeat = window.setInterval(() => {
      usage.heartbeat();
    }, 60_000);

    return () => {
      window.clearInterval(heartbeat);
      window.removeEventListener("pagehide", onPageHide);
      document.removeEventListener("visibilitychange", onVisibility);
      usage.stop("unmount");
    };
  }, []);

  async function resolveOfferUrl(offer: DemoOffer): Promise<{
    url: string;
    sso: boolean;
  }> {
    const current = getSession();
    setSession(current);
    if (!current?.user?.email) {
      return { url: offer.href, sso: false };
    }

    const { path, hash } = pathPartsFromHref(offer.href);
    const unlimited = Boolean(
      current.user.unlimited ||
        current.user.role === "admin" ||
        isDemoAdminEmail(current.user.email),
    );
    const result = await requestProductHandoffUrl({
      session: current,
      productId: offer.id,
      unlimited,
      path,
      hash,
      source: "demo",
    });

    if (result.url) {
      return { url: result.url, sso: true };
    }

    // 501 / network / etc. — still open the live app URL (no blank stage).
    return { url: offer.href, sso: false };
  }

  async function openOffer(offer: DemoOffer) {
    setActiveId(offer.id);
    setMenuOpen(false);
    setLoadingStage(true);
    setStageUrl("");
    setUsedSso(false);

    try {
      const resolved = await resolveOfferUrl(offer);
      setStageUrl(resolved.url);
      setUsedSso(resolved.sso);
      activeUsageRef.current = {
        productId: offer.id,
        viaHandoff: resolved.sso,
      };
      usageRef.current.start(offer.id, getSession(), {
        openedViaHandoff: resolved.sso,
      });
    } catch {
      setStageUrl(offer.href);
      setUsedSso(false);
      activeUsageRef.current = {
        productId: offer.id,
        viaHandoff: false,
      };
      usageRef.current.start(offer.id, getSession(), {
        openedViaHandoff: false,
      });
    } finally {
      setLoadingStage(false);
    }
  }

  function closeStage() {
    activeUsageRef.current = null;
    usageRef.current.stop("back");
    setActiveId(null);
    setMenuOpen(false);
    setStageUrl("");
    setLoadingStage(false);
    setUsedSso(false);
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
        <div className="demo-side-top">
          <p className="demo-side-brand">IN Z</p>
          <AuthLangToggle lang={lang} onChange={() => {}} />
        </div>
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
                onClick={() => void openOffer(offer)}
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
              href={stageUrl || active.href}
              target="_blank"
              rel="noreferrer"
            >
              {copy.openExternal}
            </a>
          </header>

          {session && usedSso ? (
            <p className="demo-stage-sso">{copy.signedInNote}</p>
          ) : null}

          {loadingStage ? (
            <div className="demo-launch" role="status">
              <p className="demo-launch-title">{copy.opening}</p>
            </div>
          ) : !isFrameable(active) ? (
            <div className="demo-launch">
              <p className="demo-launch-kicker">{active.name}</p>
              <h2 className="demo-launch-title">{copy.externalOnlyTitle}</h2>
              <p className="demo-launch-body">{copy.externalOnlyBody}</p>
              {active.sandboxLogin ? (
                <p className="demo-sandbox-login">{active.sandboxLogin[lang]}</p>
              ) : null}
              <a
                className="demo-cta demo-launch-cta"
                href={stageUrl || active.href}
                target="_blank"
                rel="noreferrer"
              >
                {copy.openApp}
              </a>
            </div>
          ) : (
            <iframe
              key={`${active.id}:${stageUrl}`}
              className="demo-frame"
              src={stageUrl || active.href}
              title={active.name}
              allow="clipboard-read; clipboard-write; fullscreen"
              referrerPolicy="no-referrer-when-downgrade"
            />
          )}
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
            {session?.user?.email ? (
              <p className="demo-signed-in">{copy.signedInNote}</p>
            ) : null}
          </header>

          <ul className="demo-list">
            {offers.map((offer) => (
              <li key={offer.id} className="demo-item">
                <div className="demo-item-copy">
                  <h2 className="demo-product-name">{offer.name}</h2>
                  <p className="demo-trial-title">{offer.trialTitle[lang]}</p>
                  <p className="demo-trial-summary">{offer.trialSummary[lang]}</p>
                  {offer.sandboxLogin ? (
                    <p className="demo-sandbox-login">{offer.sandboxLogin[lang]}</p>
                  ) : null}
                  <p className="demo-meta">
                    {offer.requiresSignup
                      ? session
                        ? copy.metaSignedIn
                        : copy.metaSignup
                      : copy.metaNoSignup}
                  </p>
                </div>
                <button
                  type="button"
                  className="demo-cta"
                  onClick={() => void openOffer(offer)}
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
