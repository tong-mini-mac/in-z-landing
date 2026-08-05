import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductsModelView } from "@/components/ProductsModelView";
import {
  PRODUCT_MODELS,
  parseProductModel,
  type ProductModel,
} from "@/lib/product-models";

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

  return <ProductsModelView model={model as ProductModel} />;
}
