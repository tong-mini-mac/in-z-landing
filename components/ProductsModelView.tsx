"use client";

import Image from "next/image";
import { ProductCard } from "@/components/ProductCard";
import { SiteFooter, SiteNav } from "@/components/SiteChrome";
import {
  PRODUCT_CATALOG,
  pricingForProduct,
  productSlug,
} from "@/lib/product-catalog";
import type { ProductModel } from "@/lib/product-models";
import { SITE_COPY } from "@/lib/site-i18n";
import { useSiteLang } from "@/lib/use-site-lang";

const AUTH_SIGNUP = "/auth?mode=signup";

function productAnchor(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-");
}

export function ProductsModelView({ model }: { model: ProductModel }) {
  const lang = useSiteLang();
  const config = SITE_COPY[lang].products.models[model];
  const catalog = PRODUCT_CATALOG.filter((product) =>
    product.models.includes(model),
  );

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
          <p className="products-model-label">{config.title}</p>
          <p className="products-model-lead">{config.lead}</p>
        </header>

        <div className="products-panel">
          {catalog.map((product) => {
            const pricing = pricingForProduct(product, model);
            return (
              <div
                key={product.name}
                id={productAnchor(product.name)}
                className="product-card-wrap"
              >
                <ProductCard
                  name={product.name}
                  title={product.title}
                  description={product.description}
                  detailHref={`/products/${model}/${productSlug(product.name)}`}
                  subscribeHref={
                    pricing?.ctaHref ||
                    `${AUTH_SIGNUP}&model=${model}&product=${encodeURIComponent(product.name.toLowerCase())}`
                  }
                  earlyBirdPrice={product.earlyBirdPrice}
                  regularPrice={product.regularPrice}
                  pricingTiers={pricing?.tiers}
                  subscribeCtaLabel={pricing?.ctaLabel}
                  pricingNote={pricing?.note}
                  scopeOfWork={product.scopeOfWork}
                />
              </div>
            );
          })}
        </div>
      </article>

      <SiteFooter />
    </main>
  );
}
