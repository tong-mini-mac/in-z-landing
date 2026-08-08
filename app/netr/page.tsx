import type { Metadata } from "next";
import { NetRView } from "@/components/NetRView";

export const metadata: Metadata = {
  title: "NetR — IN Z",
  description:
    "NetR — Network & Relationship Hub from IN Z. Coming soon as a commercial SaaS product.",
};

export default function NetRPage() {
  return <NetRView />;
}
