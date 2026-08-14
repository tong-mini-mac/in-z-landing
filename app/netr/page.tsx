import type { Metadata } from "next";
import { NetRView } from "@/components/NetRView";

export const metadata: Metadata = {
  title: "NetR — IN Z",
  description:
    "netr (เนตร) — Oracle of Karmic Stars. Thai karmic astrology from ancient texts plus AI that remembers you. Start free.",
};

export default function NetRPage() {
  return <NetRView />;
}
