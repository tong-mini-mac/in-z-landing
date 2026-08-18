import type { Metadata } from "next";
import { Suspense } from "react";
import { PaymentNotifyView } from "@/components/PaymentNotifyView";
import { SiteFooter, SiteNav } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: "แจ้งการชำระเงิน — IN Z",
  description: "Notify IN Z of a bank transfer and upload the payment slip.",
};

export default function PayNotifyPage() {
  return (
    <main className="page page-scroll">
      <div className="bg bg-soft" aria-hidden="true" />
      <SiteNav />

      <article className="about contact-page account-page">
        <Suspense fallback={<p className="auth-loading">Loading…</p>}>
          <PaymentNotifyView />
        </Suspense>
      </article>

      <SiteFooter />
    </main>
  );
}
