import type { Metadata } from "next";
import { Suspense } from "react";
import { ResetPasswordForm } from "@/components/ResetPasswordForm";
import { SiteFooter, SiteNav } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: "Reset password — IN Z",
  description: "Choose a new password for your IN Z account.",
};

export default function ResetPasswordPage() {
  return (
    <main className="page page-scroll">
      <div className="bg bg-soft" aria-hidden="true" />
      <SiteNav />

      <article className="about contact-page auth-page">
        <header className="about-hero">
          <p className="about-eyebrow">IN Z Account</p>
          <h1>Reset password</h1>
          <p className="about-lead">Set a new password for your account.</p>
        </header>

        <Suspense fallback={<p className="auth-loading">Loading…</p>}>
          <ResetPasswordForm />
        </Suspense>
      </article>

      <SiteFooter />
    </main>
  );
}
