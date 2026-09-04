import type { Metadata } from "next";
import { StudioPortfolio } from "@/components/StudioPortfolio";

export const metadata: Metadata = {
  title: "INZ — Architect",
  description:
    "Full-stack systems architect building production-ready enterprise systems. Medical-grade AIoT ecosystem in progress.",
  alternates: {
    canonical: "https://studio.inz.lol",
  },
};

export default function StudioPage() {
  return <StudioPortfolio />;
}
