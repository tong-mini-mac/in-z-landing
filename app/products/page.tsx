import type { Metadata } from "next";
import Image from "next/image";
import { SiteFooter, SiteNav } from "@/components/SiteChrome";
import { PRODUCT_MODELS, type ProductModel } from "@/lib/product-models";

export const metadata: Metadata = {
  title: "Products — IN Z",
  description:
    "IN Z products — White Label, License, and SaaS for SynthComm, QA LAB, Music Demo, Podcast, and NetR.",
};

const MODELS: ProductModel[] = ["white-label", "license", "saas"];

export default function ProductsPage() {
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
        <p className="products-model-label">Products</p>
        <p className="products-model-lead">
          Choose how you want to work with IN Z — White Label, License, or SaaS.
        </p>
      </section>

      <div className="products-model-grid">
        {MODELS.map((model) => {
          const config = PRODUCT_MODELS[model];
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
