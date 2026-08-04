import type { Metadata } from "next";
import { DemoHub } from "@/components/DemoHub";
import { SiteFooter, SiteNav } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: "Demo — IN Z",
  description:
    "Try IN Z products free — SynthComm, QA LAB, Music Demo, and Podcast.",
};

export default function DemoPage() {
  return (
    <main className="page page-demo" id="demo">
      <div className="bg bg-soft" aria-hidden="true" />
      <SiteNav />
      <DemoHub />
      <SiteFooter />
    </main>
  );
}
