import type { Metadata } from "next";
import { Suspense } from "react";
import { CheckoutView } from "@/components/CheckoutView";
import { SiteFooter, SiteNav } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: "Pay — IN Z",
  description: "Pay for IN Z products from one checkout.",
};

export default function PayPage() {
  return (
    <main className="page page-scroll">
      <div className="bg bg-soft" aria-hidden="true" />
      <SiteNav />

      <article className="about contact-page account-page">
        <header className="about-hero">
          <p className="about-eyebrow">IN Z Checkout</p>
          <h1>Pay</h1>
          <p className="about-lead">
            One payment page for every product. Atlas records the invoice; the product receives the package against your IN Z email.
          </p>
        </header>

        <Suspense fallback={<p className="auth-loading">Loading…</p>}>
          <CheckoutView />
        </Suspense>
      </article>

      <SiteFooter />
    </main>
  );
}
