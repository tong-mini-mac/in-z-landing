import type { Metadata } from "next";
import Image from "next/image";
import { ProductCard } from "@/components/ProductCard";
import { SiteFooter, SiteNav } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: "Products — IN Z",
  description:
    "IN Z products — SynthComm, Universal Simulator, Music Demo, Podcast, and NetR.",
};

const AUTH_SIGNUP = "/auth?mode=signup";

const SYNTHCOMM_DESCRIPTION =
  "SynthComm is an AI-powered platform that generates high-fidelity Thai conversational datasets for businesses training chatbots, customer service systems, and language models. Using advanced multi-agent orchestration, it produces authentic Thai dialogue across diverse contexts including e-commerce, social media, food delivery, banking, and healthcare. The system combines web research with specialized AI writers to create natural conversations that reflect real Thai communication patterns, including proper use of polite particles, regional dialects, slang, and gender-diverse voices. Each conversation undergoes dual-layer quality control to ensure linguistic accuracy, cultural appropriateness, and contextual relevance. The platform automatically retrains its models monthly using live data from Thai social platforms to stay current with evolving language trends. Designed for B2B clients, SynthComm handles everything from small pilot projects to enterprise-scale datasets of 10,000+ conversations through automated parallel processing, delivering production-ready training data in JSON, CSV, or bundled formats with full PDPA compliance and data privacy protection.";

const UNIVERSAL_SIMULATOR_DESCRIPTION =
  "Universal Simulator is an IN Z SaaS platform for QA and product teams to generate personas, simulate web user behavior, run auto-scaled load tests, and analyze results with ML/AI. Plans start from $500 per test with Professional and Enterprise tiers, plus annual bundles. Public catalog, user manual, and PDPA pages ship with the portal so buyers can review pricing and privacy before signup.";

const MUSIC_DEMO_DESCRIPTION =
  "Music Demo is an AI music creation studio for makers, creators, and small labels. Users generate song drafts from prompts, preview multiple takes, then confirm and export in formats that fit their workflow — from MP3 and WAV to lyrics, chords, MIDI, MusicXML, and stems on higher plans. Plans scale from Starter through Studio with monthly song quotas, optional re-edit on confirmed tracks, AI voice options, and busker-friendly modes. Built for fast creative loops with clear export rights per plan, so teams can move from idea to usable audio without a full production stack.";

const PODCAST_DESCRIPTION =
  "Podcast is a full-cycle Thai podcast platform for upload, AI transcription, show notes, clips, subtitles, RSS publishing, and monetization. It supports Thai and English plus regional dialect workflows for Isan, Northern, and Southern Thai through dialect-aware prompts. Creators get episode pipelines with calendar, analytics, social scheduling, guest CRM, and sponsor-ready ad slots. Billing starts with a 14-day free trial, then Starter, Creator, and Pro monthly plans so indie podcasters and content studios can produce and distribute without stitching separate tools together.";

const NETR_DESCRIPTION =
  "NetR is an IN Z network and relationship product for mapping partners, channels, and operating links across the business. It helps teams keep counterparties, referral paths, and collaboration status visible in one place so growth and operations stay aligned. Designed as a commercial IN Z product alongside SynthComm, Universal Simulator, Music Demo, and Podcast — with Early Bird and standard plans for teams that need structured network visibility without building a custom CRM from scratch.";

const CATALOG = [
  {
    name: "SynthComm",
    title: "SynthComm — Industrial Thai Synthetic Data Factory",
    description: SYNTHCOMM_DESCRIPTION,
    earlyBirdPrice: "฿3 / conversation",
    regularPrice: "฿5 / conversation",
  },
  {
    name: "Universal Simulator",
    title: "Universal Simulator — User Behavior Simulation for QA",
    description: UNIVERSAL_SIMULATOR_DESCRIPTION,
    earlyBirdPrice: "Starter $500 / test",
    regularPrice: "$500 – $2,500 / test · annual bundles",
  },
  {
    name: "Music Demo",
    title: "Music Demo — AI Music Creation Studio",
    description: MUSIC_DEMO_DESCRIPTION,
    earlyBirdPrice: "Starter ฿99 / month",
    regularPrice: "฿99 – ฿1,599 / month",
  },
  {
    name: "Podcast",
    title: "Podcast — AI Podcast Studio for Thai Creators",
    description: PODCAST_DESCRIPTION,
    earlyBirdPrice: "14-day free trial",
    regularPrice: "฿599 – ฿2,999 / month",
  },
  {
    name: "NetR",
    title: "NetR — Network & Relationship Hub",
    description: NETR_DESCRIPTION,
    earlyBirdPrice: "Contact for Early Bird",
    regularPrice: "Subscription tiers",
  },
] as const;

export default function ProductsPage() {
  return (
    <main className="page page-products" id="products">
      <div className="bg" aria-hidden="true" />
      <SiteNav />

      <section className="hero hero-products" aria-label="Brand">
        <Image
          className="logo-mark logo-mark-products"
          src="/logo-transparent.png"
          alt="IN Z"
          width={400}
          height={400}
          priority
          unoptimized
        />
        <p className="brand">IN Z</p>
      </section>

      <div className="products-panel">
        {CATALOG.map((product) => (
          <ProductCard
            key={product.name}
            name={product.name}
            title={product.title}
            description={product.description}
            subscribeHref={AUTH_SIGNUP}
            earlyBirdPrice={product.earlyBirdPrice}
            regularPrice={product.regularPrice}
          />
        ))}
      </div>

      <SiteFooter />
    </main>
  );
}
