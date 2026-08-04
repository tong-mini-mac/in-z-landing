import type { Metadata } from "next";
import Image from "next/image";
import { SiteFooter, SiteNav } from "@/components/SiteChrome";
import { demoOffersForCommercial } from "@/lib/demo-catalog";

export const metadata: Metadata = {
  title: "Demo — IN Z",
  description:
    "Try IN Z products free — SynthComm, Universal Simulator, Music Demo, Podcast, and NetR.",
};

export default function DemoPage() {
  const offers = demoOffersForCommercial();

  return (
    <main className="page page-demo" id="demo">
      <div className="bg bg-soft" aria-hidden="true" />
      <SiteNav />

      <article className="demo-body">
        <header className="demo-hero">
          <Image
            className="logo-mark logo-mark-demo"
            src="/logo-transparent.png"
            alt="IN Z"
            width={400}
            height={400}
            priority
            unoptimized
          />
          <p className="brand">IN Z</p>
          <p className="demo-label">Demo</p>
          <p className="demo-lead">
            Try each product free before you subscribe — pick a trial and open the
            live app.
          </p>
        </header>

        <ul className="demo-list">
          {offers.map((offer) => {
            const isExternal = offer.external;
            return (
              <li key={offer.id} className="demo-item">
                <div className="demo-item-copy">
                  <h2>{offer.name}</h2>
                  <p className="demo-trial-title">{offer.trialTitle}</p>
                  <p className="demo-trial-summary">{offer.trialSummary}</p>
                  <p className="demo-meta">
                    {offer.requiresSignup
                      ? "May require account signup in the product app"
                      : "No signup required to start"}
                  </p>
                </div>
                <a
                  className="demo-cta"
                  href={offer.href}
                  {...(isExternal
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {offer.ctaLabel}
                </a>
              </li>
            );
          })}
        </ul>
      </article>

      <SiteFooter />
    </main>
  );
}
