import type { Metadata } from "next";
import { ProductsHubView } from "@/components/ProductsHubView";

export const metadata: Metadata = {
  title: "Products — IN Z",
  description:
    "IN Z products — White Label, License, and SaaS for SynthComm, QA LAB, Music Demo, Podcast, and NetR.",
};

export default function ProductsPage() {
  return <ProductsHubView />;
}
