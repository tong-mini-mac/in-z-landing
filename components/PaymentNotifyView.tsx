"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  AUTH_SESSION_CHANGE_EVENT,
  getSession,
} from "@/lib/auth-session";
import { SLIP_MAX_BYTES, SLIP_TYPES } from "@/lib/bank-account";
import {
  findCheckoutSku,
  formatBaht,
  payableCheckoutProducts,
  payableModelsForProduct,
  payableSkusForProductModel,
  skuDetail,
  skuLabel,
  withVat,
} from "@/lib/checkout-skus";
import { parseProductModel, type ProductModel } from "@/lib/product-models";
import { SITE_COPY } from "@/lib/site-i18n";
import { useSiteLang } from "@/lib/use-site-lang";

type BankAccount = {
  bankName: string;
  accountName: string;
  accountNumber: string;
  branch: string;
};

export function PaymentNotifyView() {
  const searchParams = useSearchParams();
  const lang = useSiteLang();
  const t = SITE_COPY[lang].payNotify;
  const pay = SITE_COPY[lang].pay;
  const products = useMemo(payableCheckoutProducts, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [productId, setProductId] = useState(products[0]?.id || "");
  const [model, setModel] = useState<ProductModel>("saas");
  const [skuId, setSkuId] = useState("");
  const [slip, setSlip] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [error, setError] = useState("");
  const [mailReady, setMailReady] = useState(false);
  const [bank, setBank] = useState<BankAccount | null>(null);
  const [qrUrl, setQrUrl] = useState("/pay/promptpay-qr.png");
  const [copied, setCopied] = useState(false);

  const availableModels = useMemo(
    () => payableModelsForProduct(productId),
    [productId],
  );
  const skus = useMemo(
    () => payableSkusForProductModel(productId, model),
    [productId, model],
  );
  const selected = findCheckoutSku(skuId) || skus[0];
  const money =
    selected && !selected.quoteOnly ? withVat(selected.amountBaht) : null;
  const canSend = Boolean(
    name.trim() &&
      email.includes("@") &&
      selected &&
      !selected.quoteOnly &&
      slip &&
      mailReady &&
      !submitting,
  );

  useEffect(() => {
    function refresh() {
      const session = getSession();
      if (!session) return;
      setEmail((current) => current || session.user.email);
      setName((current) => current || session.user.fullName || "");
    }
    refresh();
    window.addEventListener(AUTH_SESSION_CHANGE_EVENT, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(AUTH_SESSION_CHANGE_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  useEffect(() => {
    const fromQuery = searchParams.get("product") || "";
    const skuFromQuery = searchParams.get("sku") || "";
    const modelFromQuery = parseProductModel(searchParams.get("model"));
    const skuMatch = findCheckoutSku(skuFromQuery);
    if (skuMatch && !skuMatch.quoteOnly) {
      setProductId(skuMatch.productId);
      setModel(skuMatch.model);
      setSkuId(skuMatch.id);
      return;
    }
    const productMatch = products.find((item) => item.id === fromQuery);
    if (productMatch) {
      setProductId(productMatch.id);
      const models = payableModelsForProduct(productMatch.id);
      setModel(
        modelFromQuery && models.includes(modelFromQuery)
          ? modelFromQuery
          : models[0] || "saas",
      );
    }
  }, [searchParams, products]);

  useEffect(() => {
    if (!availableModels.includes(model) && availableModels[0]) {
      setModel(availableModels[0]);
      return;
    }
    if (!skus.some((sku) => sku.id === skuId)) {
      setSkuId(skus[0]?.id || "");
    }
  }, [availableModels, model, skus, skuId]);

  useEffect(() => {
    fetch("/api/pay/checkout")
      .then((response) => response.json())
      .then((data: { mail?: boolean; bank?: BankAccount | null; qrUrl?: string }) => {
        setMailReady(Boolean(data.mail));
        setBank(data.bank || null);
        if (data.qrUrl) setQrUrl(data.qrUrl);
      })
      .catch(() => setMailReady(false));
  }, []);

  async function copyAccount() {
    if (!bank?.accountNumber) return;
    try {
      await navigator.clipboard.writeText(bank.accountNumber.replace(/\s+/g, ""));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  function onSlipChange(file: File | null) {
    setSlip(null);
    if (!file) return;
    if (file.size > SLIP_MAX_BYTES) {
      setError(pay.slipTooBig);
      return;
    }
    if (file.type && !SLIP_TYPES.has(file.type)) {
      setError(pay.slipType);
      return;
    }
    setError("");
    setSlip(file);
  }

  async function submit() {
    if (!name.trim()) {
      setError(t.errName);
      return;
    }
    if (!email.includes("@")) {
      setError(t.errEmail);
      return;
    }
    if (!selected || !slip) {
      setError(t.errSlip);
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const body = new FormData();
      body.set("skuId", selected.id);
      body.set("email", email.trim().toLowerCase());
      body.set("displayName", name.trim());
      body.set("slip", slip);
      const response = await fetch("/api/pay/transfer", {
        method: "POST",
        body,
      });
      const data = (await response.json()) as { error?: string; message?: string };
      if (!response.ok) {
        if (data.error === "slip_required") setError(t.errSlip);
        else if (data.error === "slip_too_big") setError(pay.slipTooBig);
        else if (data.error === "slip_type") setError(pay.slipType);
        else if (data.error === "mail_not_configured") setError(t.mailNotConfigured);
        else setError(data.message || t.errGeneric);
        return;
      }
      setWaiting(true);
    } catch {
      setError(t.errGeneric);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="auth-shell checkout-shell">
      <header className="about-hero">
        <p className="about-eyebrow">{t.eyebrow}</p>
        <h1>{t.title}</h1>
        <p className="about-lead">{t.lead}</p>
      </header>

      {waiting ? (
        <div className="contact-success">
          <p>{t.waitingTitle}</p>
          <p className="product-pricing-note">{t.waitingLead}</p>
        </div>
      ) : (
        <>
          <div className="checkout-card">
            <label>
              {t.name}
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                autoComplete="name"
              />
            </label>
            <label>
              {t.email}
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
                inputMode="email"
              />
            </label>
          </div>

          <fieldset className="checkout-fieldset">
            <legend>{t.product}</legend>
            <div className="checkout-chips">
              {products.map((product) => (
                <button
                  key={product.id}
                  type="button"
                  className={product.id === productId ? "is-active" : undefined}
                  onClick={() => setProductId(product.id)}
                >
                  {product.name}
                </button>
              ))}
            </div>
          </fieldset>

          {availableModels.length > 1 ? (
            <fieldset className="checkout-fieldset">
              <legend>{t.model}</legend>
              <div className="checkout-chips">
                {availableModels.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className={item === model ? "is-active" : undefined}
                    onClick={() => setModel(item)}
                  >
                    {SITE_COPY[lang].products.models[item].label}
                  </button>
                ))}
              </div>
            </fieldset>
          ) : null}

          <fieldset className="checkout-fieldset">
            <legend>{t.package}</legend>
            <ul className="checkout-skus">
              {skus.map((sku) => (
                <li key={sku.id}>
                  <button
                    type="button"
                    className={sku.id === selected?.id ? "is-active" : undefined}
                    onClick={() => setSkuId(sku.id)}
                  >
                    <strong>{skuLabel(sku, lang)}</strong>
                    <span>{formatBaht(sku.amountBaht, lang)}</span>
                    <em>{skuDetail(sku, lang)}</em>
                  </button>
                </li>
              ))}
            </ul>
          </fieldset>

          {money ? (
            <p className="checkout-total">
              <span>{t.total}</span>
              <strong>{formatBaht(money.total, lang)}</strong>
            </p>
          ) : null}

          {qrUrl ? (
            <div className="checkout-pay-qr">
              <p>{t.scanQr}</p>
              {/* Static PromptPay QR hosted on this site */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={qrUrl} alt={t.scanQr} width={280} height={360} />
            </div>
          ) : null}

          {bank ? (
            <dl className="checkout-bank">
              <div>
                <dt>{t.bankName}</dt>
                <dd>{bank.bankName}</dd>
              </div>
              <div>
                <dt>{t.accountName}</dt>
                <dd>{bank.accountName}</dd>
              </div>
              <div>
                <dt>{t.accountNumber}</dt>
                <dd>
                  <span>{bank.accountNumber}</span>
                  <button type="button" onClick={() => void copyAccount()}>
                    {copied ? t.copied : t.copyAccount}
                  </button>
                </dd>
              </div>
            </dl>
          ) : (
            <p className="account-admin-note">{t.bankMissing}</p>
          )}

          <label className="checkout-slip">
            {t.uploadSlip}
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif,application/pdf"
              onChange={(event) => onSlipChange(event.target.files?.[0] || null)}
            />
          </label>

          {!mailReady ? (
            <p className="account-admin-note">{t.mailNotConfigured}</p>
          ) : null}
          {error ? <p className="account-admin-note">{error}</p> : null}

          <button
            type="button"
            className="contact-submit"
            onClick={() => void submit()}
            disabled={!canSend}
          >
            {submitting ? t.sending : t.send}
          </button>
        </>
      )}
    </div>
  );
}
