import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailView } from "@/components/ProductDetailView";
import {
  PRODUCT_CATALOG,
  findCatalogProduct,
  productSlug,
} from "@/lib/product-catalog";
import { parseProductModel } from "@/lib/product-models";

type ProductDetailPageProps = {
  params: Promise<{ model: string; slug: string }>;
};

export async function generateStaticParams() {
  return PRODUCT_CATALOG.flatMap((product) =>
    product.models.map((model) => ({
      model,
      slug: productSlug(product.name),
    })),
  );
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { model: rawModel, slug } = await params;
  const model = parseProductModel(rawModel);
  const product = findCatalogProduct(slug);
  if (!model || !product || !product.models.includes(model)) {
    return { title: "Products — IN Z" };
  }
  return {
    title: `${product.name} — ${model} — IN Z`,
    description: product.title,
  };
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { model: rawModel, slug } = await params;
  const model = parseProductModel(rawModel);
  const product = findCatalogProduct(slug);
  if (!model || !product || !product.models.includes(model)) {
    notFound();
  }

  return <ProductDetailView product={product} model={model} />;
}
