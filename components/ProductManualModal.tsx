"use client";

import { useEffect, useId, useRef, useState } from "react";
import { productManualHref, type CatalogProduct } from "@/lib/product-catalog";
import { simpleMarkdownToHtml } from "@/lib/simple-markdown";
import type { AuthLang } from "@/lib/auth-i18n";
import { SITE_COPY } from "@/lib/site-i18n";

type ProductManualModalProps = {
  open: boolean;
  onClose: () => void;
  product: CatalogProduct;
  lang: AuthLang;
};

export function ProductManualModal({
  open,
  onClose,
  product,
  lang,
}: ProductManualModalProps) {
  const t = SITE_COPY[lang].productDetail;
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">(
    "idle",
  );
  const [html, setHtml] = useState("");

  useEffect(() => {
    if (!open) return;

    let cancelled = false;
    setStatus("loading");
    setHtml("");

    const href = productManualHref(product.name, lang);
    fetch(href)
      .then(async (res) => {
        if (!res.ok) throw new Error(`manual_${res.status}`);
        return res.text();
      })
      .then((text) => {
        if (cancelled) return;
        setHtml(simpleMarkdownToHtml(text));
        setStatus("ready");
      })
      .catch(() => {
        if (cancelled) return;
        const usage =
          product.usageGuide?.[lang] ||
          product.usageGuide?.th ||
          product.usageGuide?.en;
        if (usage) {
          const fallback = [
            `# ${usage.title}`,
            usage.intro,
            ...usage.steps.map(
              (step, index) => `## ${index + 1}. ${step.title}\n\n${step.detail}`,
            ),
            ...(usage.tips?.length
              ? ["## Tips", ...usage.tips.map((tip) => `- ${tip}`)]
              : []),
          ].join("\n\n");
          setHtml(simpleMarkdownToHtml(fallback));
          setStatus("ready");
          return;
        }
        setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, [open, product, lang]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="product-manual-modal" role="presentation">
      <button
        type="button"
        className="product-manual-modal-backdrop"
        aria-label={t.closeManual}
        onClick={onClose}
      />
      <div
        className="product-manual-modal-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <header className="product-manual-modal-header">
          <h2 id={titleId}>{t.manualTitle.replace("{name}", product.name)}</h2>
          <button
            ref={closeRef}
            type="button"
            className="product-manual-modal-close"
            onClick={onClose}
          >
            {t.closeManual}
          </button>
        </header>

        <div className="product-manual-modal-body">
          {status === "loading" ? <p className="auth-loading">{t.manualLoading}</p> : null}
          {status === "error" ? <p className="product-detail-body">{t.manualMissing}</p> : null}
          {status === "ready" ? (
            <div
              className="product-manual-content"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
