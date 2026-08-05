"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  SCOPE_OF_WORK_COPY,
  type LocalizedScopeOfWork,
  type PricingTier,
} from "@/lib/product-catalog";
import { SITE_COPY } from "@/lib/site-i18n";
import { useSiteLang } from "@/lib/use-site-lang";

type ProductCardProps = {
  name: string;
  title: string;
  description: string;
  subscribeHref: string;
  earlyBirdPrice?: string;
  regularPrice?: string;
  pricingTiers?: PricingTier[];
  subscribeCtaLabel?: string;
  pricingNote?: string;
  scopeOfWork?: LocalizedScopeOfWork;
  className?: string;
};

type Panel = "description" | "subscribe" | "scope" | null;

const CLOSE_DELAY_MS = 2000;

export function ProductCard({
  name,
  title,
  description,
  subscribeHref,
  earlyBirdPrice = "3 baht / conversation",
  regularPrice = "6 baht / conversation",
  pricingTiers,
  subscribeCtaLabel = "Sign In / Sign Up",
  pricingNote,
  scopeOfWork,
  className = "",
}: ProductCardProps) {
  const [openPanel, setOpenPanel] = useState<Panel>(null);
  const lang = useSiteLang();
  const ui = SITE_COPY[lang].productCard;
  const rootRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const descriptionId = useId();
  const subscribeId = useId();
  const scopeId = useId();
  const hasTier = Boolean(pricingTiers && pricingTiers.length > 0);
  const hasScope = Boolean(scopeOfWork);
  const scope = scopeOfWork?.[lang] || scopeOfWork?.th || scopeOfWork?.en;
  const scopeCopy = SCOPE_OF_WORK_COPY[lang];

  function clearCloseTimer() {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }

  function showPanel(panel: Panel) {
    clearCloseTimer();
    setOpenPanel(panel);
  }

  function scheduleClose() {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => {
      setOpenPanel(null);
      closeTimerRef.current = null;
    }, CLOSE_DELAY_MS);
  }

  useEffect(() => {
    return () => clearCloseTimer();
  }, []);

  useEffect(() => {
    if (!openPanel) return;

    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        clearCloseTimer();
        setOpenPanel(null);
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        clearCloseTimer();
        setOpenPanel(null);
      }
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [openPanel]);

  return (
    <div
      className={`product-card${openPanel ? " is-active" : ""}${className ? ` ${className}` : ""}`}
      ref={rootRef}
    >
      <h2 className="product-name">{name}</h2>

      <div
        className={`product-hover${openPanel === "description" ? " is-open" : ""}`}
        onMouseEnter={() => showPanel("description")}
        onMouseLeave={scheduleClose}
      >
        <button
          type="button"
          className="product-link"
          aria-expanded={openPanel === "description"}
          aria-controls={descriptionId}
          onClick={() => {
            clearCloseTimer();
            setOpenPanel((current) =>
              current === "description" ? null : "description",
            );
          }}
        >
          {ui.description}
        </button>

        <div
          id={descriptionId}
          className="product-popover"
          role="region"
          aria-label={`${name} description`}
          hidden={openPanel !== "description"}
        >
          <p className="product-popover-title">{title}</p>
          <p className="product-popover-body">{description}</p>
        </div>
      </div>

      <div
        className={`product-hover${openPanel === "subscribe" ? " is-open" : ""}`}
        onMouseEnter={() => showPanel("subscribe")}
        onMouseLeave={scheduleClose}
      >
        <button
          type="button"
          className="product-link"
          aria-expanded={openPanel === "subscribe"}
          aria-controls={subscribeId}
          onClick={() => {
            clearCloseTimer();
            setOpenPanel((current) =>
              current === "subscribe" ? null : "subscribe",
            );
          }}
        >
          {ui.subscribe}
        </button>

        <div
          id={subscribeId}
          className={`product-popover product-popover-subscribe${hasTier ? " is-tiers" : ""}`}
          role="region"
          aria-label={`${name} subscribe options`}
          hidden={openPanel !== "subscribe"}
        >
          <a className="product-subscribe-auth" href={subscribeHref}>
            {subscribeCtaLabel}
          </a>

          {hasTier ? (
            <>
              <ul className="product-pricing product-pricing-tiers">
                {pricingTiers!.map((tier) => (
                  <li
                    key={tier.name}
                    className={tier.highlight ? "is-highlight" : undefined}
                  >
                    <span>{tier.name}</span>
                    <strong>{tier.price}</strong>
                    <em>{tier.detail}</em>
                  </li>
                ))}
              </ul>
              {pricingNote ? (
                <p className="product-pricing-note">{pricingNote}</p>
              ) : null}
            </>
          ) : (
            <ul className="product-pricing">
              <li>
                <span>{ui.earlyBird}</span>
                <strong>{earlyBirdPrice}</strong>
              </li>
              <li>
                <span>{ui.regular}</span>
                <strong>{regularPrice}</strong>
              </li>
            </ul>
          )}
        </div>
      </div>

      {hasScope && scope ? (
        <div
          className={`product-hover${openPanel === "scope" ? " is-open" : ""}`}
          onMouseEnter={() => showPanel("scope")}
          onMouseLeave={scheduleClose}
        >
          <button
            type="button"
            className="product-link product-link-scope"
            aria-expanded={openPanel === "scope"}
            aria-controls={scopeId}
            onClick={() => {
              clearCloseTimer();
              setOpenPanel((current) => (current === "scope" ? null : "scope"));
            }}
          >
            {scopeCopy.button}
          </button>

          <div
            id={scopeId}
            className="product-popover product-popover-scope"
            role="region"
            aria-label={`${name} ${scopeCopy.title}`}
            hidden={openPanel !== "scope"}
          >
            <p className="product-popover-title">{scopeCopy.title}</p>
            <p className="product-popover-body">{scope.summary}</p>

            <p className="product-scope-heading">{scopeCopy.inScope}</p>
            <ul className="product-scope-list">
              {scope.inScope.map((item) => (
                <li key={item.area}>
                  <strong>{item.area}</strong>
                  <span>{item.detail}</span>
                </li>
              ))}
            </ul>

            <p className="product-scope-heading">{scopeCopy.outOfScope}</p>
            <ul className="product-scope-list">
              {scope.outOfScope.map((item) => (
                <li key={item.area}>
                  <strong>{item.area}</strong>
                  <span>{item.detail}</span>
                </li>
              ))}
            </ul>

            {scope.bands && scope.bands.length > 0 ? (
              <>
                <p className="product-scope-heading">{scopeCopy.bands}</p>
                <ul className="product-scope-list">
                  {scope.bands.map((item) => (
                    <li key={item.area}>
                      <strong>{item.area}</strong>
                      <span>{item.detail}</span>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
