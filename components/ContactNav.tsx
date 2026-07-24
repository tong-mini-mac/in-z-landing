"use client";

import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

const CHAT_HREF =
  "https://personal-secretary-production-3d5f.up.railway.app/contact/";

const CLOSE_DELAY_MS = 2000;

const contactOptions = [
  {
    label: "Chat",
    kind: "external" as const,
    href: CHAT_HREF,
  },
  {
    label: "Customer Service",
    kind: "page" as const,
    href: "/contact?channel=customer-service",
  },
  {
    label: "Support",
    kind: "page" as const,
    href: "/contact?channel=support",
  },
];

export function ContactNav() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const menuId = useId();

  function clearCloseTimer() {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }

  function openMenu() {
    clearCloseTimer();
    setOpen(true);
  }

  function scheduleClose() {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => {
      setOpen(false);
      closeTimerRef.current = null;
    }, CLOSE_DELAY_MS);
  }

  function closeMenu() {
    clearCloseTimer();
    setOpen(false);
  }

  useEffect(() => {
    return () => clearCloseTimer();
  }, []);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        closeMenu();
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeMenu();
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div
      className={`nav-contact${open ? " is-open" : ""}`}
      ref={rootRef}
      onMouseEnter={openMenu}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        className="nav-contact-trigger"
        aria-expanded={open}
        aria-controls={menuId}
        aria-haspopup="menu"
        onClick={() => {
          clearCloseTimer();
          setOpen((current) => !current);
        }}
      >
        Contact
      </button>

      <div
        id={menuId}
        className="nav-contact-menu"
        role="menu"
        aria-label="Contact options"
        hidden={!open}
      >
        {contactOptions.map((option) =>
          option.kind === "external" ? (
            <a
              key={option.label}
              className="nav-contact-item"
              href={option.href}
              role="menuitem"
              target="_blank"
              rel="noreferrer"
              onClick={closeMenu}
            >
              {option.label}
            </a>
          ) : (
            <button
              key={option.label}
              type="button"
              className="nav-contact-item"
              role="menuitem"
              onClick={() => {
                closeMenu();
                router.push(option.href);
              }}
            >
              {option.label}
            </button>
          ),
        )}
      </div>
    </div>
  );
}
