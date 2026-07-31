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
  "Universal Simulator is an IN Z SaaS platform for QA and product teams to generate personas, simulate web user behavior, run auto-scaled load tests, and analyze results with ML/AI. Starter, Professional, and Business plans launch with an Early Bird promotion for the first five months, then move to regular monthly pricing. Public catalog, user manual, and PDPA pages ship with the portal so buyers can review pricing and privacy before signup.";

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
    price: "$42 / month",
    detail:
      "Early Bird mo 1–5 · then $199/mo · 50 simulations · 500 personas · 20 scrapes · 100 API tests · 10 ML reports · 5 GB · 30-day retention · 1 concurrent job · 2 seats · Email 48h · LLM & Drive not included",
  },
  {
    name: "Professional",
    price: "$192 / month",
    detail:
      "Early Bird mo 1–5 · then $599/mo · 200 simulations · 2,000 personas · 100 scrapes · 500 API tests · 50 ML reports · 25 GB · 90-day retention · 3 concurrent jobs · 5 seats · Email 24h + Chat · DeepSeek 500K tokens · Drive sync · Hybrid pipeline · Webhooks",
    highlight: true,
  },
  {
    name: "Business",
    price: "$746 / month",
    detail:
      "Early Bird mo 1–5 · then $1,299/mo · 1,000 simulations · 5,000 personas · 500 scrapes · 2,500 API tests · Unlimited ML · 100 GB · 180-day retention · 10 concurrent jobs · 15 seats · 24/7 Chat + Phone · DeepSeek 2M tokens · Unlimited Drive · White-label dashboard · ERP · Monthly security audit · Priority queue",
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
    earlyBirdPrice: "Starter $42 / month (Early Bird)",
    regularPrice: "Starter $199 · Professional $599 · Business $1,299 / month",
    models: ["saas"],
    pricingByModel: {
      saas: {
        ctaLabel: "Start Early Bird",
        note:
          "Early Bird covers months 1–5 for new customers through 31 Dec 2026, then regular pricing applies. Prices exclude VAT 7%. Annual prepaid: Early Bird × 12, or regular with 15% off from month 6. When Early Bird ends, loyalty offers (e.g. 10% for 3 months) may apply for continuing customers.",
        tiers: UNIVERSAL_SIMULATOR_SAAS_TIERS,
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
