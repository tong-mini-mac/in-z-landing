import type { ProductModel } from "@/lib/product-models";

export type PricingTier = {
  name: string;
  price: string;
  detail: string;
  highlight?: boolean;
};

export type CatalogProduct = {
  name: string;
  title: string;
  description: string;
  earlyBirdPrice: string;
  regularPrice: string;
  models: ProductModel[];
  /** Per-model pricing; falls back to earlyBird/regular when absent. */
  pricingByModel?: Partial<
    Record<
      ProductModel,
      {
        ctaLabel?: string;
        ctaHref?: string;
        note?: string;
        tiers: PricingTier[];
      }
    >
  >;
};

const SYNTHCOMM_DESCRIPTION =
  "SynthComm is an AI-powered platform that generates high-fidelity Thai conversational datasets for businesses training chatbots, customer service systems, and language models. Start free with 100 conversations per month — try before you buy — then scale to Starter, Growth, Business, or Enterprise. Using advanced multi-agent orchestration, it produces authentic Thai dialogue across diverse contexts including e-commerce, social media, food delivery, banking, and healthcare. The system combines web research with specialized AI writers to create natural conversations that reflect real Thai communication patterns, including proper use of polite particles, regional dialects, slang, and gender-diverse voices. Each conversation undergoes dual-layer quality control to ensure linguistic accuracy, cultural appropriateness, and contextual relevance. Designed for B2B clients with full PDPA compliance and data privacy protection.";

const UNIVERSAL_SIMULATOR_DESCRIPTION =
  "Universal Simulator is an IN Z platform for QA and product teams to generate personas, simulate web user behavior, run auto-scaled load tests, and analyze results with ML/AI. Available as Cloud SaaS (monthly), BYOK License with Early Bird 2026 pricing (annual), or White Label. Try free with a readiness audit — no signup required.";

const MUSIC_DEMO_DESCRIPTION =
  "Music Demo is an AI music creation studio for makers, creators, and small labels. Users generate song drafts from prompts, preview multiple takes, then confirm and export in formats that fit their workflow — from MP3 and WAV to lyrics, chords, MIDI, MusicXML, and stems on higher plans. Plans scale from Starter through Studio with monthly song quotas, optional re-edit on confirmed tracks, AI voice options, and busker-friendly modes. Built for fast creative loops with clear export rights per plan, so teams can move from idea to usable audio without a full production stack.";

const PODCAST_DESCRIPTION =
  "Podcast is a full-cycle Thai podcast platform for upload, AI transcription, show notes, clips, subtitles, RSS publishing, and monetization. It supports Thai and English plus regional dialect workflows for Isan, Northern, and Southern Thai through dialect-aware prompts. Creators get episode pipelines with calendar, analytics, social scheduling, guest CRM, and sponsor-ready ad slots. Billing starts with a 14-day free trial, then Starter, Creator, and Pro monthly plans so indie podcasters and content studios can produce and distribute without stitching separate tools together.";

const NETR_DESCRIPTION =
  "NetR is an IN Z network and relationship product for mapping partners, channels, and operating links across the business. It helps teams keep counterparties, referral paths, and collaboration status visible in one place so growth and operations stay aligned. Designed as a commercial IN Z product alongside SynthComm, Universal Simulator, Music Demo, and Podcast — with Early Bird and standard plans for teams that need structured network visibility without building a custom CRM from scratch.";

const SYNTHCOMM_SAAS_TIERS: PricingTier[] = [
  {
    name: "Free",
    price: "฿0",
    detail: "100 conversations / month",
    highlight: true,
  },
  {
    name: "Starter",
    price: "฿2,900 / month",
    detail: "1,000 conversations / month",
  },
  {
    name: "Growth",
    price: "฿12,900 / month",
    detail: "5,000 conversations / month",
  },
  {
    name: "Business",
    price: "฿39,000 / month",
    detail: "20,000 conversations / month",
  },
  {
    name: "Enterprise",
    price: "Custom",
    detail: "Unlimited · white-label · custom SLA",
  },
];

const SYNTHCOMM_LICENSE_TIERS: PricingTier[] = [
  {
    name: "Startup License",
    price: "฿480,000",
    detail: "Binary · 1 domain · up to 50K/mo · co-branded · 6 months support",
    highlight: true,
  },
];

const SYNTHCOMM_WHITE_LABEL_TIERS: PricingTier[] = [
  {
    name: "Agency White Label",
    price: "฿980,000",
    detail: "100% rebrand · no badge · unlimited scale · SaaS resell rights",
    highlight: true,
  },
  {
    name: "Enterprise IP Package",
    price: "฿2,800,000",
    detail: "Full source · IP transfer · 2 years support · modify & own",
  },
];

const UNIVERSAL_SIMULATOR_SAAS_TIERS: PricingTier[] = [
  {
    name: "Starter",
    price: "฿490 / month",
    detail:
      "ผู้ใช้งานเดี่ยว · 1 user · 50 simulations/mo · DeepSeek · History 30 วัน · Storage 1 GB · API ❌ · Community · Shared hosting",
  },
  {
    name: "Pro",
    price: "฿3,490 / month",
    detail:
      "ทีมขนาดเล็ก · 3 users · 300 simulations/mo · DeepSeek + GPT-4o mini · History 90 วัน · Storage 10 GB · API 1,000 calls · Email 24h · Dedicated",
    highlight: true,
  },
  {
    name: "Business",
    price: "฿5,990 / month",
    detail:
      "ทีมมืออาชีพ · 5 users · 500 simulations/mo · + Custom Model · History 1 ปี · Storage 50 GB · API Unlimited · Line + Email 4h · Dedicated + Auto-scale",
  },
];

const UNIVERSAL_SIMULATOR_LICENSE_TIERS: PricingTier[] = [
  {
    name: "Team",
    price: "฿120,000 / year",
    detail:
      "Early Bird · then ฿156,000 Year 2+ · Unlimited users (concurrent ≤ 10) · BYOK · Dedicated · Email 24h · Onboarding 1 session",
  },
  {
    name: "Enterprise",
    price: "฿200,000 / year",
    detail:
      "Early Bird · then ฿260,000 Year 2+ · Unlimited users (concurrent ≤ 30) · BYOK · Dedicated + Auto-scale · Line + Email 4h · SLA 99.5% · Onboarding 2 sessions",
    highlight: true,
  },
  {
    name: "Government",
    price: "฿300,000 / year",
    detail:
      "Early Bird · then ฿390,000 Year 2+ · Unlimited users (concurrent ≤ 50) · BYOK · Dedicated + Auto-scale · Line + Email + On-site · SLA 99.9% · เอกสารราชการ · Onboarding 3 sessions",
  },
];

const UNIVERSAL_SIMULATOR_WHITE_LABEL_TIERS: PricingTier[] = [
  {
    name: "White Label",
    price: "฿3,000,000+",
    detail:
      "ซื้อขาด · Source + Full Ownership · Rebrand / Resell · ไม่มี Royalty · BYOK · Setup + Training 5 วัน · Support 1 ปี รวมในราคา",
    highlight: true,
  },
];

export const PRODUCT_CATALOG: CatalogProduct[] = [
  {
    name: "SynthComm",
    title: "SynthComm — Industrial Thai Synthetic Data Factory",
    description: SYNTHCOMM_DESCRIPTION,
    earlyBirdPrice: "Contact for quote",
    regularPrice: "Custom packaging",
    models: ["white-label", "license", "saas"],
    pricingByModel: {
      saas: {
        ctaLabel: "Try free — 100 conversations",
        note: "Annual plans save about 20%.",
        tiers: SYNTHCOMM_SAAS_TIERS,
      },
      license: {
        ctaLabel: "Contact sales",
        ctaHref: "/contact?channel=customer-service",
        note: "Co-branded license with Powered by SynthComm badge. Upgrade to White Label for full rebrand.",
        tiers: SYNTHCOMM_LICENSE_TIERS,
      },
      "white-label": {
        ctaLabel: "Contact sales",
        ctaHref: "/contact?channel=customer-service",
        note: "Pay in full and save 10%. Installment available on Agency White Label and Enterprise IP.",
        tiers: SYNTHCOMM_WHITE_LABEL_TIERS,
      },
    },
  },
  {
    name: "Universal Simulator",
    title: "Universal Simulator — User Behavior Simulation for QA",
    description: UNIVERSAL_SIMULATOR_DESCRIPTION,
    earlyBirdPrice: "SaaS from ฿490 / month · License Early Bird from ฿120,000 / year",
    regularPrice: "License Year 2+ from ฿156,000 · White Label ฿3,000,000+",
    models: ["saas", "license", "white-label"],
    pricingByModel: {
      saas: {
        ctaLabel: "Try free readiness audit",
        note:
          "Cloud SaaS · monthly. Free readiness audit — no signup. Prices exclude VAT 7%.",
        tiers: UNIVERSAL_SIMULATOR_SAAS_TIERS,
      },
      license: {
        ctaLabel: "Contact sales",
        ctaHref: "/contact?channel=customer-service",
        note:
          "Early Bird 2026 · BYOK (Bring Your Own API Key) · Unlimited users with fair-use concurrent caps. Year 2+ list price applies after Early Bird.",
        tiers: UNIVERSAL_SIMULATOR_LICENSE_TIERS,
      },
      "white-label": {
        ctaLabel: "Contact sales",
        ctaHref: "/contact?channel=customer-service",
        note: "One-time from ฿3,000,000+ · source + full ownership · no royalty · BYOK.",
        tiers: UNIVERSAL_SIMULATOR_WHITE_LABEL_TIERS,
      },
    },
  },
  {
    name: "Music Demo",
    title: "Music Demo — AI Music Creation Studio",
    description: MUSIC_DEMO_DESCRIPTION,
    earlyBirdPrice: "Starter ฿99 / month",
    regularPrice: "฿99 – ฿1,599 / month",
    models: ["saas"],
  },
  {
    name: "Podcast",
    title: "Podcast — AI Podcast Studio for Thai Creators",
    description: PODCAST_DESCRIPTION,
    earlyBirdPrice: "14-day free trial",
    regularPrice: "฿599 – ฿2,999 / month",
    models: ["saas"],
  },
  {
    name: "NetR",
    title: "NetR — Network & Relationship Hub",
    description: NETR_DESCRIPTION,
    earlyBirdPrice: "Contact for Early Bird",
    regularPrice: "Subscription tiers",
    models: ["saas"],
  },
];

export function pricingForProduct(
  product: CatalogProduct,
  model: ProductModel,
): {
  ctaLabel: string;
  ctaHref?: string;
  note?: string;
  tiers: PricingTier[];
} | null {
  const byModel = product.pricingByModel?.[model];
  if (byModel) {
    return {
      ctaLabel: byModel.ctaLabel || "Sign In / Sign Up",
      ctaHref: byModel.ctaHref,
      note: byModel.note,
      tiers: byModel.tiers,
    };
  }
  return null;
}
