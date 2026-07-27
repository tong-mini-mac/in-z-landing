import type { Metadata } from "next";
import { ProductLauncher } from "@/components/ProductLauncher";
import { SiteFooter, SiteNav } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: "Your Products — IN Z",
  description: "Open your IN Z products.",
};

export default function AccountPage() {
  return (
    <main className="page page-scroll">
      <div className="bg bg-soft" aria-hidden="true" />
      <SiteNav />

      <article className="about contact-page account-page">
        <header className="about-hero">
          <p className="about-eyebrow">Your account</p>
          <h1>Your products</h1>
          <p className="about-lead">Choose a product to continue.</p>
        </header>

        <ProductLauncher />
      </article>

      <SiteFooter />
    </main>
  );
}
