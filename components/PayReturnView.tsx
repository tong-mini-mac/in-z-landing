"use client";

import { useEffect, useState } from "react";
import { SITE_COPY } from "@/lib/site-i18n";
import { useSiteLang } from "@/lib/use-site-lang";

const CHARGE_KEY = "inz_pending_pay";

export function PayReturnView() {
  const lang = useSiteLang();
  const t = SITE_COPY[lang].pay;
  const [message, setMessage] = useState(t.waiting);
  const [paid, setPaid] = useState(false);

  useEffect(() => {
    let raw = "";
    try {
      raw = sessionStorage.getItem(CHARGE_KEY) || "";
    } catch {
      raw = "";
    }
    const parsed = raw
      ? (JSON.parse(raw) as { chargeId?: string })
      : { chargeId: "" };
    const chargeId = String(parsed.chargeId || "").trim();
    if (!chargeId) {
      setMessage(t.errGeneric);
      return;
    }

    let cancelled = false;
    async function poll() {
      try {
        const response = await fetch(
          `/api/pay/status?chargeId=${encodeURIComponent(chargeId)}`,
        );
        const data = (await response.json()) as { paid?: boolean };
        if (cancelled) return;
        if (data.paid) {
          setPaid(true);
          setMessage(t.success);
          sessionStorage.removeItem(CHARGE_KEY);
          return;
        }
        window.setTimeout(poll, 2500);
      } catch {
        if (!cancelled) window.setTimeout(poll, 4000);
      }
    }
    void poll();
    return () => {
      cancelled = true;
    };
  }, [t.errGeneric, t.success, t.waiting]);

  return (
    <div className="auth-shell">
      <p className="account-admin-note">{message}</p>
      {paid ? (
        <a className="product-detail-cta is-primary" href="/account">
          {t.openAccount}
        </a>
      ) : null}
    </div>
  );
}
