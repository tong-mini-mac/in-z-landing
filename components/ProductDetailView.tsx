"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { SiteFooter, SiteNav } from "@/components/SiteChrome";
import {
  SCOPE_OF_WORK_COPY,
  pricingForProduct,
  productManualHref,
  type CatalogProduct,
} from "@/lib/product-catalog";
import {
  AUTH_SESSION_CHANGE_EVENT,
  getSession,
} from "@/lib/auth-session";
import type { ProductModel } from "@/lib/product-models";
import { SITE_COPY } from "@/lib/site-i18n";
import { useSiteLang } from "@/lib/use-site-lang";

type ProductDetailViewProps = {
  product: CatalogProduct;
  model: ProductModel;
};

export function ProductDetailView({ product, model }: ProductDetailViewProps) {
  const lang = useSiteLang();
  const t = SITE_COPY[lang].productDetail;
  const modelCopy = SITE_COPY[lang].products.models[model];
  const scopeCopy = SCOPE_OF_WORK_COPY[lang];
  const pricing = pricingForProduct(product, model);
  const scope = product.scopeOfWork?.[lang] || product.scopeOfWork?.th || product.scopeOfWork?.en;
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    function refresh() {
      setSignedIn(Boolean(getSession()));
    }
    refresh();
    window.addEventListener(AUTH_SESSION_CHANGE_EVENT, refresh);
    window.addEventListener("storage", refresh);
    window.addEventListener("focus", refresh);
    return () => {
      window.removeEventListener(AUTH_SESSION_CHANGE_EVENT, refresh);
      window.removeEventListener("storage", refresh);
      window.removeEventListener("focus", refresh);
    };
  }, []);

  const packageHref = signedIn
    ? `/account?lang=${lang}`
    : `/auth?mode=signin&lang=${lang}&model=${model}&product=${encodeURIComponent(product.name.toLowerCase())}`;
  const packageLabel = signedIn ? t.yourPackage : t.signInSignUp;

  return (
    <main className="page page-products page-scroll" id="product-detail">
      <div className="bg bg-soft" aria-hidden="true" />
      <SiteNav />

      <article className="product-detail">
        <header className="product-detail-hero">
          <Image
            className="logo-mark logo-mark-products"
            src="/logo-transparent.png"
            alt="IN Z"
            width={280}
            height={280}
            priority
            unoptimized
          />
          <a className="product-detail-back" href={`/products/${model}`}>
            {t.back}
          </a>
          <p className="products-model-label">{modelCopy.label}</p>
          <h1 className="product-detail-name">{product.name}</h1>
          <p className="product-detail-title">{product.title}</p>
        </header>

        <section className="product-detail-section" aria-labelledby="product-catalog-heading">
          <h2 id="product-catalog-heading">{t.catalog}</h2>
          <p className="product-detail-body">{product.description}</p>

          {pricing?.tiers?.length ? (
            <ul className="product-pricing product-pricing-tiers product-detail-tiers">
              {pricing.tiers.map((tier) => (
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
          ) : (
            <ul className="product-pricing product-detail-tiers">
              <li>
                <span>{SITE_COPY[lang].productCard.earlyBird}</span>
                <strong>{product.earlyBirdPrice}</strong>
              </li>
              <li>
                <span>{SITE_COPY[lang].productCard.regular}</span>
                <strong>{product.regularPrice}</strong>
              </li>
            </ul>
          )}
          {pricing?.note ? (
            <p className="product-pricing-note">{pricing.note}</p>
          ) : null}
        </section>

        {scope ? (
          <section className="product-detail-section" aria-labelledby="product-scope-heading">
            <h2 id="product-scope-heading">{scopeCopy.title}</h2>
            <p className="product-detail-body">{scope.summary}</p>

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
          </section>
        ) : null}

        <div className="product-detail-actions">
          <a
            className="product-detail-cta"
            href={productManualHref(product.name)}
            download
          >
            {t.manual}
          </a>
          <a className="product-detail-cta is-primary" href={packageHref}>
            {packageLabel}
          </a>
        </div>
      </article>

      <SiteFooter />
    </main>
  );
}
