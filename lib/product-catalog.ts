import type { ProductModel } from "@/lib/product-models";
import type { AuthLang } from "@/lib/auth-i18n";

export type PricingTier = {
  name: string;
  price: string;
  detail: string;
  highlight?: boolean;
};

export type ScopeItem = {
  area: string;
  detail: string;
};

export type ScopeOfWork = {
  summary: string;
  inScope: ScopeItem[];
  outOfScope: ScopeItem[];
  bands?: ScopeItem[];
};

export type LocalizedScopeOfWork = Record<AuthLang, ScopeOfWork>;

export type CatalogProduct = {
  name: string;
  title: string;
  description: string;
  earlyBirdPrice: string;
  regularPrice: string;
  models: ProductModel[];
  /** Optional Scope of Work shown via product card button (TH/EN). */
  scopeOfWork?: LocalizedScopeOfWork;
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
  "QA LAB is an IN Z platform for QA and product teams to simulate user behavior and test deployed web/API systems — including mobile app backends and Appium native E2E (License/local or BrowserStack BYOK). Available as Cloud SaaS (monthly), BYOK License with Early Bird 2026 pricing (annual), or White Label. Try free with a readiness audit — no signup required.";

const UNIVERSAL_SIMULATOR_SCOPE_EN: ScopeOfWork = {
  summary:
    "User-behavior simulation and web/API testing for deployed systems with a public URL. Includes mobile app backends/APIs and Appium native E2E (License/local or BrowserStack BYOK). Not AI-only. Not a Git-repo tester.",
  inScope: [
    {
      area: "Test targets",
      detail:
        "Web apps, APIs/backends, SaaS, portals, and ERP systems that are already deployed and reachable over public HTTP(S).",
    },
    {
      area: "Mobile — API / backend",
      detail:
        "Scan APIs used by iOS/Android apps via the mobile_api readiness profile (version/config, auth, deep-link well-known, latency) plus API/load tests.",
    },
    {
      area: "Mobile — WebView / PWA / responsive web",
      detail:
        "Public web or hybrid surfaces that open in a browser or WebView.",
    },
    {
      area: "Mobile — native E2E (Appium)",
      detail:
        "Tap native iOS/Android UI through Appium step scripts — License/local Appium or Cloud + BrowserStack BYOK.",
    },
    {
      area: "Deployed Git projects",
      detail:
        "Yes — point at the running system URL (Railway / Vercel / VPS). Not the Git repository link itself.",
    },
    {
      area: "Readiness scan",
      detail: "Live URL checks: health, docs, OpenAPI, auth, latency, 5xx.",
    },
    {
      area: "Web simulation & load",
      detail:
        "Persona journeys, click-path simulation, and auto-scaled load tests (including mobile API traffic).",
    },
    {
      area: "ML / AI analysis (optional)",
      detail:
        "Anomaly, clustering, and Markov on simulation results. Free Readiness does not use LLM.",
    },
    {
      area: "SaaS Portal",
      detail:
        "Sign-up/login, quotas, Web full-test flow, Mobile readiness + Appium E2E, dashboard, PDPA tools.",
    },
  ],
  outOfScope: [
    {
      area: "Cloud SaaS device farm",
      detail:
        "No hosted emulators/physical devices on Cloud — use License/local Appium or BrowserStack BYOK.",
    },
    {
      area: "Git-only (not deployed)",
      detail:
        "Does not clone/build/run from GitHub or GitLab — a running system URL is required first.",
    },
    {
      area: "LAN / NAS-only from Cloud",
      detail:
        "Private IPs are blocked (SSRF). Expose a public URL, or run License/White Label inside the customer LAN.",
    },
    {
      area: "Desktop / non-HTTP automation",
      detail:
        "Focused on web + API (+ Appium for mobile) — not general desktop automation.",
    },
    {
      area: "LLM / model evaluation",
      detail: "Not an LLM eval or model benchmark product.",
    },
    {
      area: "Customer VPN from Cloud",
      detail:
        "Cannot traverse customer VPN/Zero Trust from Cloud — use public URL or on-prem License.",
    },
  ],
  bands: [
    {
      area: "Free Readiness",
      detail: "Public URL scan (web / mobile_api) — no Appium, up to 5 findings.",
    },
    {
      area: "SaaS Cloud",
      detail:
        "Public web/API + monthly quotas · Appium only via BrowserStack BYOK · Starter 50 / Pro 300 / Business 500 sims per month.",
    },
    {
      area: "License / White Label",
      detail: "Internal systems / NAS / Appium in LAN / compliance (BYOK).",
    },
  ],
};

const UNIVERSAL_SIMULATOR_SCOPE_TH: ScopeOfWork = {
  summary:
    "จำลองพฤติกรรมผู้ใช้และทดสอบเว็บ/API ของระบบที่ deploy แล้วมี URL สาธารณะ รวม API/backend ของแอปมือถือ และ E2E native ผ่าน Appium (License/local หรือ BrowserStack BYOK) — ไม่จำกัดแค่ระบบแนว AI และไม่ใช่การทดสอบ repo บน Git",
  inScope: [
    {
      area: "เป้าทดสอบ",
      detail:
        "เว็บแอป, API/Backend, SaaS, พอร์ทัล, ERP ที่ deploy แล้วเข้าถึงด้วย HTTP(S) สาธารณะ",
    },
    {
      area: "แอปมือถือ — ชั้น API / Backend",
      detail:
        "ทดสอบ API ที่แอป iOS/Android เรียกผ่านโปรไฟล์ readiness mobile_api (version/config, auth, deep-link well-known, latency) รวม API test / load",
    },
    {
      area: "แอปมือถือ — WebView / PWA / responsive web",
      detail: "หน้าเว็บหรือ hybrid ที่เปิดในเบราว์เซอร์/WebView ได้ผ่าน URL สาธารณะ",
    },
    {
      area: "แอปมือถือ — E2E native (Appium)",
      detail:
        "แตะ UI บน iOS/Android ผ่าน Appium step script — License/local หรือ Cloud + BrowserStack BYOK",
    },
    {
      area: "โปรเจกต์บน Git ที่ deploy แล้ว",
      detail:
        "ได้ — ชี้ URL ของระบบที่รันอยู่ (เช่น Railway / Vercel / VPS) ไม่ใช่ลิงก์ repo",
    },
    {
      area: "Readiness scan",
      detail: "สแกน URL จริง — health, docs, OpenAPI, auth, latency, 5xx",
    },
    {
      area: "Web simulation & load",
      detail:
        "จำลอง user journey / พฤติกรรมคลิกบนเว็บ และ auto-scaled load test (รวมยิง API ของแอปมือถือ)",
    },
    {
      area: "ML / AI วิเคราะห์ผล (ทางเลือก)",
      detail:
        "Anomaly, clustering, Markov จากข้อมูล simulation — Free Readiness ไม่ใช้ LLM",
    },
    {
      area: "SaaS Portal",
      detail:
        "สมัคร/login, โควต้า, แท็บเว็บ (full-test), แท็บมือถือ (readiness + Appium E2E), แดชบอร์ด, PDPA",
    },
  ],
  outOfScope: [
    {
      area: "Device farm ในตัวบน SaaS Cloud",
      detail:
        "ไม่โฮสต์ emulator/เครื่องจริงบน Cloud — ใช้ License/local Appium หรือ BrowserStack BYOK",
    },
    {
      area: "มีแค่โค้ดบน Git ยังไม่ deploy",
      detail:
        "ไม่ clone / build / รันจาก GitHub·GitLab — ต้องมี URL ระบบที่รันอยู่ก่อน",
    },
    {
      area: "ระบบใน LAN/NAS อย่างเดียว จาก Cloud",
      detail:
        "บล็อก private IP (SSRF) — ต้องมี public URL หรือ License ใน LAN",
    },
    {
      area: "Desktop / non-HTTP",
      detail:
        "เน้นเว็บ + API (+ Appium สำหรับมือถือ) — ไม่ใช่ desktop automation ทั่วไป",
    },
    {
      area: "ทดสอบคุณภาพโมเดล AI เอง",
      detail: "ไม่ใช่ LLM eval / model benchmark",
    },
    {
      area: "เจาะ VPN ของลูกค้าจาก Cloud",
      detail:
        "ต้อง public URL หรือ deploy Simulator ในเครือข่ายลูกค้า",
    },
  ],
  bands: [
    {
      area: "Free Readiness",
      detail: "สแกน URL สาธารณะ (web / mobile_api) — ไม่มี Appium · สูงสุด 5 ข้อ",
    },
    {
      area: "SaaS Cloud",
      detail:
        "เว็บ/API บน internet + โควต้า · Appium เฉพาะ BrowserStack BYOK · Starter 50 / Pro 300 / Business 500 sims ต่อเดือน",
    },
    {
      area: "License / White Label",
      detail: "ระบบภายใน / NAS / Appium ใน LAN / compliance (BYOK)",
    },
  ],
};

const UNIVERSAL_SIMULATOR_SCOPE: LocalizedScopeOfWork = {
  en: UNIVERSAL_SIMULATOR_SCOPE_EN,
  th: UNIVERSAL_SIMULATOR_SCOPE_TH,
};

export const SCOPE_OF_WORK_COPY: Record<
  AuthLang,
  {
    button: string;
    title: string;
    inScope: string;
    outOfScope: string;
    bands: string;
  }
> = {
  en: {
    button: "Scope of Work",
    title: "Scope of Work",
    inScope: "In scope",
    outOfScope: "Out of scope",
    bands: "Deployment bands",
  },
  th: {
    button: "ขอบเขตงาน",
    title: "ขอบเขตงาน",
    inScope: "อยู่ในขอบเขต",
    outOfScope: "นอกขอบเขต",
    bands: "โหมดการติดตั้ง",
  },
};

const MUSIC_DEMO_DESCRIPTION =
  "Music Demo is an AI music creation studio for makers, creators, and small labels. Users generate song drafts from prompts, preview takes, then confirm and export — lyrics, chords, MIDI, MusicXML, and optional AI vocal preview. Pricing is pay-as-you-go credits (top up from ฿30 = 100 credits): create a song costs 50 credits, regenerate costs 25. Signup includes free credits. Built for fast creative loops without a monthly plan lock-in.";

const CONTENT_CREATOR_DESCRIPTION =
  "Content Creator is IN Z’s Thai + SEA content platform: podcast pipelines (upload → AI transcription → show notes → clips → RSS) plus AI Video (idea chat → script → media match → TTS → render MP4 → multi-platform publish). It supports Thai dialects (Isan, Northern, Southern), Thai central, English, Vietnamese, and Indonesian. Billing is a 14-day free trial, then Starter ฿599, Creator ฿1,499, and Pro ฿2,999 per month — with real episode, render, storage, and feature quotas.";

const NETR_DESCRIPTION =
  "NetR is an IN Z network and relationship product for mapping partners, channels, and operating links across the business. It helps teams keep counterparties, referral paths, and collaboration status visible in one place so growth and operations stay aligned. Designed as a commercial IN Z product alongside SynthComm, QA LAB, Music Demo, and Content Creator — with Early Bird and standard plans for teams that need structured network visibility without building a custom CRM from scratch.";

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

const MUSIC_DEMO_SAAS_TIERS: PricingTier[] = [
  {
    name: "Top-up 100",
    price: "฿30",
    detail: "100 credits · ~2 songs or 1 song + 2 regenerates",
    highlight: true,
  },
  {
    name: "Top-up 300",
    price: "฿90",
    detail: "300 credits · ~6 songs (no regenerates)",
  },
  {
    name: "Top-up 1,000",
    price: "฿270",
    detail: "1,000 credits · for frequent creators",
  },
  {
    name: "Usage",
    price: "50 / 25",
    detail: "Create song 50 credits · Regenerate 25 credits",
  },
  {
    name: "Signup bonus",
    price: "100–300 free",
    detail: "100 credits on signup · 300 for the first 30 users",
  },
];

const CONTENT_CREATOR_SAAS_TIERS: PricingTier[] = [
  {
    name: "Free Trial",
    price: "฿0 · 14 days",
    detail: "5 episodes total · 3 video renders (watermark) · 5 GB storage",
  },
  {
    name: "Starter",
    price: "฿599 / month",
    detail: "10 episodes · 20 renders · 20 GB · RSS + 3 platforms",
  },
  {
    name: "Creator",
    price: "฿1,499 / month",
    detail:
      "50 episodes · 150 renders · 100 GB · AI clips · scheduler · guests · analytics · team",
    highlight: true,
  },
  {
    name: "Pro",
    price: "฿2,999 / month",
    detail:
      "200 episodes · 600 renders · 500 GB · monetization · API · white-label",
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
        ctaHref: "/demo",
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
    name: "QA LAB",
    title: "QA LAB — User Behavior Simulation for QA Teams",
    description: UNIVERSAL_SIMULATOR_DESCRIPTION,
    earlyBirdPrice: "SaaS from ฿490 / month · License Early Bird from ฿120,000 / year",
    regularPrice: "License Year 2+ from ฿156,000 · White Label ฿3,000,000+",
    models: ["saas", "license", "white-label"],
    scopeOfWork: UNIVERSAL_SIMULATOR_SCOPE,
    pricingByModel: {
      saas: {
        ctaLabel: "Try free readiness audit",
        ctaHref: "/demo",
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
    earlyBirdPrice: "Signup bonus 100–300 credits · top-up from ฿30",
    regularPrice: "฿30 = 100 credits · create 50 · regen 25",
    models: ["saas"],
    pricingByModel: {
      saas: {
        ctaLabel: "Open Music Demo",
        ctaHref: "/demo",
        note:
          "Credits pay-as-you-go — no monthly plan. Artist Blueprint (lyrics / chords / MIDI / MusicXML). AI Vocal Preview add-on from ฿49. Prices exclude VAT 7%.",
        tiers: MUSIC_DEMO_SAAS_TIERS,
      },
    },
  },
  {
    name: "Content Creator",
    title: "Content Creator — Podcast + AI Video for Thai & SEA",
    description: CONTENT_CREATOR_DESCRIPTION,
    earlyBirdPrice: "14-day free trial",
    regularPrice: "฿599 – ฿2,999 / month",
    models: ["saas"],
    pricingByModel: {
      saas: {
        ctaLabel: "Open Content Creator",
        ctaHref: "/demo",
        note:
          "Source of truth: Content Creator plans.ts — Free Trial then Starter / Creator / Pro. Annual ~17% off. Quotas enforced (episodes, renders, storage, features).",
        tiers: CONTENT_CREATOR_SAAS_TIERS,
      },
    },
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
