import type { Metadata } from "next";
import { PayReturnView } from "@/components/PayReturnView";
import { SiteFooter, SiteNav } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: "Payment return — IN Z",
  description: "Confirming your IN Z payment.",
};

export default function PayReturnPage() {
  return (
    <main className="page page-scroll">
      <div className="bg bg-soft" aria-hidden="true" />
      <SiteNav />
      <article className="about contact-page account-page">
        <header className="about-hero">
          <p className="about-eyebrow">IN Z Checkout</p>
          <h1>Payment</h1>
        </header>
        <PayReturnView />
      </article>
      <SiteFooter />
    </main>
  );
}
