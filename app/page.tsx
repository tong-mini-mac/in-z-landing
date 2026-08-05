import { HomeHero } from "@/components/HomeHero";
import { SiteFooter, SiteNav } from "@/components/SiteChrome";

export default function HomePage() {
  return (
    <main className="page" id="home">
      <div className="bg" aria-hidden="true" />
      <SiteNav />
      <HomeHero />
      <SiteFooter />
    </main>
  );
}
