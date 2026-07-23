"use client";

import { useEffect, useId, useRef, useState } from "react";

type ProductCardProps = {
  name: string;
  title: string;
  description: string;
  subscribeHref: string;
  earlyBirdPrice?: string;
  regularPrice?: string;
  className?: string;
};

type Panel = "description" | "subscribe" | null;

const CLOSE_DELAY_MS = 2000;

export function ProductCard({
  name,
  title,
  description,
  subscribeHref,
  earlyBirdPrice = "3 baht / conversation",
  regularPrice = "6 baht / conversation",
  className = "",
}: ProductCardProps) {
  const [openPanel, setOpenPanel] = useState<Panel>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const descriptionId = useId();
  const subscribeId = useId();

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
    <div className={`product-card${className ? ` ${className}` : ""}`} ref={rootRef}>
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
            setOpenPanel((current) => (current === "description" ? null : "description"));
          }}
        >
          Description
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
            setOpenPanel((current) => (current === "subscribe" ? null : "subscribe"));
          }}
        >
          Subscribe
        </button>

        <div
          id={subscribeId}
          className="product-popover product-popover-subscribe"
          role="region"
          aria-label={`${name} subscribe options`}
          hidden={openPanel !== "subscribe"}
        >
          <a
            className="product-subscribe-auth"
            href={subscribeHref}
            target="_blank"
            rel="noreferrer"
          >
            Sign in / Sign up
          </a>
          <ul className="product-pricing">
            <li>
              <span>Early Bird</span>
              <strong>{earlyBirdPrice}</strong>
            </li>
            <li>
              <span>Price</span>
              <strong>{regularPrice}</strong>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
