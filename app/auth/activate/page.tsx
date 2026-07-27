import type { Metadata } from "next";
import { Suspense } from "react";
import { ActivateAccount } from "@/components/ActivateAccount";
import { SiteFooter, SiteNav } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: "Activate account — IN Z",
  description: "Activate your IN Z account.",
};

export default function ActivatePage() {
  return (
    <main className="page page-scroll">
      <div className="bg bg-soft" aria-hidden="true" />
      <SiteNav />

      <article className="about contact-page auth-page">
        <header className="about-hero">
          <p className="about-eyebrow">IN Z Account</p>
          <h1>Activate</h1>
          <p className="about-lead">Confirming your account…</p>
        </header>

        <Suspense fallback={<p className="auth-loading">Loading…</p>}>
          <ActivateAccount />
        </Suspense>
      </article>

      <SiteFooter />
    </main>
  );
}
