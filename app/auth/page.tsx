import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthForm } from "@/components/AuthForm";
import { SiteFooter, SiteNav } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: "Sign In / Sign Up — IN Z",
  description: "Sign in or create your IN Z account.",
};

type AuthPageProps = {
  searchParams: Promise<{ mode?: string }>;
};

export default async function AuthPage({ searchParams }: AuthPageProps) {
  const params = await searchParams;
  const isSignup = params.mode === "signup";

  return (
    <main className="page page-scroll">
      <div className="bg bg-soft" aria-hidden="true" />
      <SiteNav />

      <article className="about contact-page auth-page">
        <header className="about-hero">
          <p className="about-eyebrow">IN Z Account</p>
          <h1>{isSignup ? "Sign Up" : "Sign In"}</h1>
          <p className="about-lead">
            {isSignup
              ? "Create your IN Z account to access products."
              : "Sign in to open your IN Z products."}
          </p>
        </header>

        <Suspense fallback={<p className="auth-loading">Loading…</p>}>
          <AuthForm />
        </Suspense>
      </article>

      <SiteFooter />
    </main>
  );
}
