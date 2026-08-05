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
    <main className="page page-products" id="products">
      <div className="bg" aria-hidden="true" />
      <SiteNav />

      <section className="hero hero-products" aria-label="Brand">
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
      </section>

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

      <SiteFooter />
    </main>
  );
}
