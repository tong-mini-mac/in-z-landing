import Image from "next/image";
import { SiteFooter, SiteNav } from "@/components/SiteChrome";

export default function HomePage() {
  return (
    <main className="page" id="home">
      <div className="bg" aria-hidden="true" />
      <SiteNav />

      <section className="hero" aria-label="Brand">
        <Image
          className="logo-mark"
          src="/logo-transparent.png"
          alt="IN Z"
          width={400}
          height={400}
          priority
          unoptimized
        />
        <div className="hero-copy">
          <p className="brand">
            <span className="hero-copy-line">IN Z</span>
          </p>
          <h1 className="tagline">
            <span className="hero-copy-line">AI Transform and SaaS</span>
          </h1>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
