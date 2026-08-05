import type { Metadata } from "next";
import { AboutContent } from "@/components/AboutContent";
import { SiteFooter, SiteNav } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: "About Us — IN Z",
  description:
    "IN Z is an AI-powered platform that helps you restore balance to your life. One drop, infinite impact.",
};

export default function AboutPage() {
  return (
    <main className="page page-scroll">
      <div className="bg bg-soft" aria-hidden="true" />
      <SiteNav />
      <AboutContent />
      <div className="about-footer-wrap">
        <SiteFooter />
      </div>
    </main>
  );
}
