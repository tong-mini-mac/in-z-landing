import type { Metadata } from "next";
import { ForgotPasswordForm } from "@/components/ForgotPasswordForm";
import { SiteFooter, SiteNav } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: "Forgot password — IN Z",
  description: "Reset your IN Z account password by email.",
};

export default function ForgotPasswordPage() {
  return (
    <main className="page page-scroll">
      <div className="bg bg-soft" aria-hidden="true" />
      <SiteNav />

      <article className="about contact-page auth-page">
        <header className="about-hero">
          <p className="about-eyebrow">IN Z Account</p>
          <h1>Forgot password</h1>
          <p className="about-lead">
            We will email you a link to set a new password.
          </p>
        </header>

        <ForgotPasswordForm />
      </article>

      <SiteFooter />
    </main>
  );
}
