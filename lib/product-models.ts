export type ProductModel = "white-label" | "license" | "saas";

export const PRODUCT_MODELS: Record<
  ProductModel,
  { label: string; title: string; lead: string }
> = {
  "white-label": {
    label: "White Label",
    title: "White Label",
    lead: "Your brand on a dedicated tenant. Agency White Label does not include the factory source. Enterprise IP is the source-and-ownership transfer.",
  },
  license: {
    label: "License",
    title: "License",
    lead: "Like Shopify: your domain, software on IN Z cloud. Dedicated tenant, quota enforced by us, BYOK for LLM. Not a downloadable factory. Full rebrand is White Label.",
  },
  saas: {
    label: "SaaS",
    title: "SaaS",
    lead: "Subscribe to IN Z cloud products — start with free tiers where available, then scale on monthly or annual plans with hosted access and ongoing updates.",
  },
};

export function parseProductModel(
  value: string | null | undefined,
): ProductModel | null {
  if (value === "white-label" || value === "license" || value === "saas") {
    return value;
  }
  return null;
}
