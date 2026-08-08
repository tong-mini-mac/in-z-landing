"use client";

import Image from "next/image";
import { SiteFooter, SiteNav } from "@/components/SiteChrome";
import type { ProductModel } from "@/lib/product-models";
import { SITE_COPY } from "@/lib/site-i18n";
import { useSiteLang } from "@/lib/use-site-lang";

const MODELS: ProductModel[] = ["white-label", "license", "saas"];

export function ProductsHubView() {
  const lang = useSiteLang();
  const t = SITE_COPY[lang].products;

  return (
    <main className="page page-products page-scroll" id="products">
      <div className="bg bg-soft" aria-hidden="true" />
      <SiteNav />

      <article className="products-body">
        <header className="products-hero">
          <Image
            className="logo-mark logo-mark-products"
            src="/logo-transparent.png"
            alt="IN Z"
            width={400}
            height={400}
            priority
            unoptimized
          />
          <p className="brand">IN Z</p>
          <p className="products-model-label">{t.label}</p>
          <p className="products-model-lead">{t.lead}</p>
        </header>

        <div className="products-model-grid">
          {MODELS.map((model) => {
            const config = t.models[model];
            return (
              <a
                key={model}
                className="products-model-card"
                href={`/products/${model}`}
              >
                <strong>{config.label}</strong>
                <span>{config.lead}</span>
              </a>
            );
          })}
        </div>
      </article>

      <SiteFooter />
    </main>
  );
}
