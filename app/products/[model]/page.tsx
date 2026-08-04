import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { SiteFooter, SiteNav } from "@/components/SiteChrome";
import {
  PRODUCT_MODELS,
  parseProductModel,
  type ProductModel,
} from "@/lib/product-models";
import { PRODUCT_CATALOG, pricingForProduct } from "@/lib/product-catalog";

const AUTH_SIGNUP = "/auth?mode=signup";

type ProductsModelPageProps = {
  params: Promise<{ model: string }>;
};

export async function generateStaticParams() {
  return [
    { model: "white-label" },
    { model: "license" },
    { model: "saas" },
  ];
}

export async function generateMetadata({
  params,
}: ProductsModelPageProps): Promise<Metadata> {
  const { model: raw } = await params;
  const model = parseProductModel(raw);
  if (!model) return { title: "Products — IN Z" };

  const config = PRODUCT_MODELS[model];
  return {
    title: `${config.label} — Products — IN Z`,
    description: config.lead,
  };
}

export default async function ProductsModelPage({
  params,
}: ProductsModelPageProps) {
  const { model: raw } = await params;
  const model = parseProductModel(raw);
  if (!model) notFound();

  return <ProductsModelView model={model} />;
}

function ProductsModelView({ model }: { model: ProductModel }) {
  const config = PRODUCT_MODELS[model];
  const catalog = PRODUCT_CATALOG.filter((product) =>
    product.models.includes(model),
  );

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
        <p className="products-model-label">{config.title}</p>
        <p className="products-model-lead">{config.lead}</p>

        <div className="products-panel">
          {catalog.map((product) => {
            const pricing = pricingForProduct(product, model);
            return (
              <ProductCard
                key={product.name}
                name={product.name}
                title={product.title}
                description={product.description}
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
            );
          })}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
