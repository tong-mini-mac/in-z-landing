"use client";

import Script from "next/script";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  AUTH_SESSION_CHANGE_EVENT,
  getSession,
  saveSession,
} from "@/lib/auth-session";
import {
  CHECKOUT_SKUS,
  abovePromptPayMax,
  belowOmiseMinimum,
  findCheckoutSku,
  formatBaht,
  modelsForProduct,
  skuDetail,
  skuLabel,
  skusForProductModel,
  withVat,
} from "@/lib/checkout-skus";
import { parseProductModel, type ProductModel } from "@/lib/product-models";
import { SITE_COPY } from "@/lib/site-i18n";
import { useSiteLang } from "@/lib/use-site-lang";

const CHARGE_KEY = "inz_pending_pay";

type CheckoutResponse = {
  paid?: boolean;
  mock?: boolean;
  chargeId?: string;
  qrImage?: string | null;
  authorizeUri?: string | null;
  pollUrl?: string;
  error?: string;
  message?: string;
  invoiceId?: string;
  entitlementId?: string;
  productId?: string;
  planId?: string;
};

declare global {
  interface Window {
    Omise?: {
      setPublicKey: (key: string) => void;
      createToken: (
        type: string,
        data: Record<string, string>,
        cb: (statusCode: number, response: { id?: string; message?: string }) => void,
      ) => void;
    };
  }
}

function uniqueProducts() {
  const seen = new Map<string, string>();
  for (const sku of CHECKOUT_SKUS) {
    if (!seen.has(sku.productId)) seen.set(sku.productId, sku.productName);
  }
  return [...seen.entries()].map(([id, name]) => ({ id, name }));
}

function rememberCharge(chargeId: string, skuId: string) {
  sessionStorage.setItem(CHARGE_KEY, JSON.stringify({ chargeId, skuId }));
}

export function CheckoutView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const lang = useSiteLang();
  const t = SITE_COPY[lang].pay;
  const products = useMemo(uniqueProducts, []);

  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [taxId, setTaxId] = useState("");
  const [productId, setProductId] = useState(products[0]?.id || "");
  const [model, setModel] = useState<ProductModel>("saas");
  const [skuId, setSkuId] = useState("");
  const [method, setMethod] = useState<"promptpay" | "card">("promptpay");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [qrImage, setQrImage] = useState<string | null>(null);
  const [pollUrl, setPollUrl] = useState("");
  const [paid, setPaid] = useState(false);
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [configured, setConfigured] = useState<boolean | null>(null);
  const [mockBilling, setMockBilling] = useState(false);
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");

  const availableModels = useMemo(
    () => modelsForProduct(productId),
    [productId],
  );
  const skus = useMemo(
    () => skusForProductModel(productId, model),
    [productId, model],
  );
  const selected = findCheckoutSku(skuId) || skus[0];
  const money =
    selected && !selected.quoteOnly ? withVat(selected.amountBaht) : null;
  const tooSmall = selected
    ? !selected.quoteOnly && belowOmiseMinimum(selected.amountBaht)
    : false;
  const promptpayBlocked = selected
    ? !selected.quoteOnly && abovePromptPayMax(selected.amountBaht)
    : false;

  useEffect(() => {
    function refresh() {
      const session = getSession();
      if (!session) {
        setEmail("");
        return;
      }
      setEmail(session.user.email);
      setDisplayName(session.user.fullName || "");
      setTaxId(session.user.vat?.taxId || "");
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
    if (skuMatch) {
      setProductId(skuMatch.productId);
      setModel(skuMatch.model);
      setSkuId(skuMatch.id);
      return;
    }
    if (fromQuery && products.some((item) => item.id === fromQuery)) {
      setProductId(fromQuery);
      const models = modelsForProduct(fromQuery);
      setModel(
        modelFromQuery && models.includes(modelFromQuery)
          ? modelFromQuery
          : models[0] || "saas",
      );
    } else if (modelFromQuery) {
      setModel(modelFromQuery);
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
    if (promptpayBlocked && method === "promptpay") {
      setMethod("card");
    }
  }, [promptpayBlocked, method]);

  useEffect(() => {
    fetch("/api/pay/checkout")
      .then((response) => response.json())
      .then((data: { configured?: boolean; publicKey?: string | null; mock?: boolean }) => {
        setConfigured(Boolean(data.configured));
        setPublicKey(data.publicKey || null);
        setMockBilling(Boolean(data.mock));
      })
      .catch(() => setConfigured(false));
  }, []);

  useEffect(() => {
    if (!pollUrl || paid) return;
    const timer = window.setInterval(async () => {
      try {
        const response = await fetch(pollUrl);
        const data = (await response.json()) as CheckoutResponse;
        if (data.paid) {
          markPaid(data);
        }
      } catch {
        /* keep polling */
      }
    }, 3000);
    return () => window.clearInterval(timer);
  }, [pollUrl, paid]);

  function markPaid(data: CheckoutResponse) {
    setPaid(true);
    setQrImage(null);
    setError("");
    const session = getSession();
    const product = data.productId || selected?.productId;
    if (session && product) {
      const allowed = new Set(session.user.allowedProducts || []);
      allowed.add(product);
      saveSession({
        ...session.user,
        allowedProducts: [...allowed],
        revenue: true,
      });
    }
    sessionStorage.removeItem(CHARGE_KEY);
  }

  async function tokenizeCard(): Promise<string> {
    const started = Date.now();
    while (!window.Omise) {
      if (Date.now() - started > 8000) throw new Error("omise_js");
      await new Promise((resolve) => window.setTimeout(resolve, 50));
    }
    if (!publicKey) {
      throw new Error("omise_js");
    }
    const [month, year] = cardExpiry.split("/").map((part) => part.trim());
    window.Omise.setPublicKey(publicKey);
    return new Promise((resolve, reject) => {
      window.Omise!.createToken(
        "card",
        {
          name: cardName,
          number: cardNumber.replace(/\s+/g, ""),
          expiration_month: month,
          expiration_year: year?.length === 2 ? `20${year}` : year,
          security_code: cardCvc,
        },
        (statusCode, response) => {
          if (statusCode === 200 && response.id) resolve(response.id);
          else reject(new Error(response.message || "card_token"));
        },
      );
    });
  }

  async function pay() {
    if (!email) {
      const next = `/pay?${new URLSearchParams({
        product: productId,
        sku: selected?.id || "",
        lang,
      }).toString()}`;
      router.push(`/auth?mode=signin&next=${encodeURIComponent(next)}`);
      return;
    }
    if (!selected) return;
    if (selected.quoteOnly) {
      router.push("/contact?channel=customer-service");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      let cardToken: string | undefined;
      if (method === "card" && !mockBilling) {
        cardToken = await tokenizeCard();
      }
      const response = await fetch("/api/pay/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          skuId: selected.id,
          email,
          displayName,
          taxId,
          method,
          cardToken,
        }),
      });
      const data = (await response.json()) as CheckoutResponse;
      if (!response.ok) {
        setError(data.message || data.error || t.errGeneric);
        return;
      }
      if (data.paid) {
        markPaid(data);
        return;
      }
      if (data.authorizeUri) {
        if (data.chargeId) rememberCharge(data.chargeId, selected.id);
        window.location.href = data.authorizeUri;
        return;
      }
      setQrImage(data.qrImage || null);
      setPollUrl(data.pollUrl || "");
      if (data.chargeId) rememberCharge(data.chargeId, selected.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : t.errGeneric);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="auth-shell checkout-shell">
      <Script src="https://cdn.omise.co/omise.js" strategy="afterInteractive" />

      {!email ? (
        <p className="account-admin-note">
          {t.signInFirst}{" "}
          <a
            href={`/auth?mode=signin&next=${encodeURIComponent(`/pay?product=${productId}&model=${model}&sku=${selected?.id || ""}`)}`}
          >
            {SITE_COPY[lang].nav.signIn}
          </a>
        </p>
      ) : (
        <p className="account-user">
          {email}
          {displayName ? <span className="account-email"> · {displayName}</span> : null}
        </p>
      )}

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
                <span>
                  {sku.quoteOnly
                    ? t.quoteOnly
                    : formatBaht(sku.amountBaht, lang)}
                </span>
                <em>{skuDetail(sku, lang)}</em>
              </button>
            </li>
          ))}
        </ul>
      </fieldset>

      {money && selected ? (
        <div className="checkout-totals">
          <p>
            <span>{t.subtotal}</span>
            <strong>{formatBaht(money.amount, lang)}</strong>
          </p>
          <p>
            <span>{t.vat}</span>
            <strong>{formatBaht(money.vat, lang)}</strong>
          </p>
          <p className="checkout-total">
            <span>{t.total}</span>
            <strong>{formatBaht(money.total, lang)}</strong>
          </p>
          <p className="product-pricing-note">{t.vatNote}</p>
          {selected.interval === "month" ? (
            <p className="product-pricing-note">{t.monthlyNote}</p>
          ) : null}
          {selected.interval === "year" ? (
            <p className="product-pricing-note">{t.yearNote}</p>
          ) : null}
          {selected.interval === "one_time" && selected.model === "white-label" ? (
            <p className="product-pricing-note">{t.oneTimeNote}</p>
          ) : null}
        </div>
      ) : null}

      {selected?.quoteOnly ? (
        <div className="checkout-quote">
          <p className="account-admin-note">{t.quoteNote}</p>
          <a className="product-detail-cta is-primary" href="/contact?channel=customer-service">
            {t.contactSales}
          </a>
        </div>
      ) : (
        <>
      <fieldset className="checkout-fieldset">
        <legend>{t.method}</legend>
        <div className="checkout-chips" role="group" aria-label={t.method}>
          {promptpayBlocked ? null : (
            <button
              type="button"
              className={method === "promptpay" ? "is-active" : undefined}
              aria-pressed={method === "promptpay"}
              onClick={() => setMethod("promptpay")}
            >
              {t.promptpay}
            </button>
          )}
          <button
            type="button"
            className={method === "card" ? "is-active" : undefined}
            aria-pressed={method === "card"}
            onClick={() => setMethod("card")}
          >
            {t.card}
          </button>
        </div>
      </fieldset>
      {promptpayBlocked ? (
        <p className="account-admin-note">{t.promptpayMax}</p>
      ) : null}

      {method === "card" ? (
        <div className="checkout-card">
          <label>
            {t.cardName}
            <input value={cardName} onChange={(event) => setCardName(event.target.value)} autoComplete="cc-name" />
          </label>
          <label>
            {t.cardNumber}
            <input
              value={cardNumber}
              onChange={(event) => setCardNumber(event.target.value)}
              autoComplete="cc-number"
              inputMode="numeric"
            />
          </label>
          <div className="checkout-card-row">
            <label>
              {t.cardExpiry}
              <input
                value={cardExpiry}
                onChange={(event) => setCardExpiry(event.target.value)}
                placeholder="MM/YY"
                autoComplete="cc-exp"
              />
            </label>
            <label>
              {t.cardCvc}
              <input
                value={cardCvc}
                onChange={(event) => setCardCvc(event.target.value)}
                autoComplete="cc-csc"
                inputMode="numeric"
              />
            </label>
          </div>
        </div>
      ) : null}

      {tooSmall ? <p className="account-admin-note">{t.belowMin}</p> : null}
      {configured === false ? <p className="account-admin-note">{t.notConfigured}</p> : null}
      {error ? <p className="account-admin-note">{error}</p> : null}

      {qrImage ? (
        <div className="checkout-qr">
          <p>{t.scanQr}</p>
          {/* Omise hosts the QR image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={qrImage} alt="PromptPay QR" width={220} height={220} />
          <p>{t.waiting}</p>
        </div>
      ) : null}

      {paid ? (
        <div className="contact-success">
          <p>{t.success}</p>
          <a className="product-detail-cta is-primary" href="/account">
            {t.openAccount}
          </a>
        </div>
      ) : (
        <button
          type="button"
          className="contact-submit"
          onClick={() => void pay()}
          disabled={
            submitting ||
            tooSmall ||
            !selected ||
            !configured
          }
        >
          {submitting ? t.paying : t.payNow}
        </button>
      )}
        </>
      )}
    </div>
  );
}
