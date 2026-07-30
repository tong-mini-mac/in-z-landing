export type ProductModel = "white-label" | "license" | "saas";

export const PRODUCT_MODELS: Record<
  ProductModel,
  { label: string; title: string; lead: string }
> = {
  "white-label": {
    label: "White Label",
    title: "White Label",
    lead: "Full rebrand under your brand — Agency White Label or Enterprise IP Package with source and ownership.",
  },
  license: {
    label: "License",
    title: "License",
    lead: "Startup License for core use — binary deployment, co-branded, fixed commercial terms without full white-label rights.",
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
