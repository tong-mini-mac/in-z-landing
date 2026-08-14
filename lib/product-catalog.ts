import type { ProductModel } from "@/lib/product-models";
import type { AuthLang } from "@/lib/auth-i18n";

export type LocalizedText = Record<AuthLang, string>;

export type PricingTier = {
  name: LocalizedText | string;
  price: LocalizedText | string;
  detail: LocalizedText | string;
  highlight?: boolean;
};

export function pickLang(
  value: LocalizedText | string | undefined,
  lang: AuthLang,
  fallback = "",
): string {
  if (!value) return fallback;
  if (typeof value === "string") return value;
  return value[lang] || value.en || value.th || fallback;
}

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
  title: LocalizedText;
  description: LocalizedText;
  earlyBirdPrice: LocalizedText | string;
  regularPrice: LocalizedText | string;
  models: ProductModel[];
  /** Optional Scope of Work shown via product card button (TH/EN). */
  scopeOfWork?: LocalizedScopeOfWork;
  /** Per-model pricing; falls back to earlyBird/regular when absent. */
  pricingByModel?: Partial<
    Record<
      ProductModel,
      {
        ctaLabel?: LocalizedText | string;
        ctaHref?: string;
        note?: LocalizedText | string;
        tiers: PricingTier[];
      }
    >
  >;
};

const SYNTHCOMM_DESCRIPTION: LocalizedText = {
  en: "SynthComm is an AI-powered platform that generates high-fidelity Thai conversational datasets for businesses training chatbots, customer service systems, and language models. Start free with 100 conversations per month — try before you buy — then scale to Starter, Growth, Business, or Enterprise. Using advanced multi-agent orchestration, it produces authentic Thai dialogue across diverse contexts including e-commerce, social media, food delivery, banking, and healthcare. The system combines web research with specialized AI writers to create natural conversations that reflect real Thai communication patterns, including proper use of polite particles, regional dialects, slang, and gender-diverse voices. Each conversation undergoes dual-layer quality control to ensure linguistic accuracy, cultural appropriateness, and contextual relevance. Designed for B2B clients with full PDPA compliance and data privacy protection.",
  th: "SynthComm เป็นแพลตฟอร์ม AI ที่สร้างชุดข้อมูลบทสนทนาภาษาไทยคุณภาพสูง สำหรับธุรกิจที่ฝึกแชทบอท ระบบบริการลูกค้า และโมเดลภาษา เริ่มฟรี 100 บทสนทนาต่อเดือน — ทดลองก่อนซื้อ — แล้วขยายเป็น Starter, Growth, Business หรือ Enterprise ระบบใช้การทำงานร่วมกันของเอเจนต์หลายตัว เพื่อสร้างบทสนทนาไทยที่สมจริงในบริบทหลากหลาย เช่น อีคอมเมิร์ซ โซเชียลมีเดีย ส่งอาหาร ธนาคาร และสาธารณสุข รวมงานวิจัยบนเว็บกับนักเขียน AI เฉพาะทาง เพื่อสะท้อนการใช้ภาษาไทยจริง ทั้งคำลงท้าย สำเนียงท้องถิ่น สแลง และเสียงที่หลากหลายตามเพศ ทุกบทสนทนาผ่านการควบคุมคุณภาพสองชั้น เพื่อความถูกต้องทางภาษา ความเหมาะสมทางวัฒนธรรม และความเกี่ยวข้องตามบริบท ออกแบบสำหรับลูกค้า B2B พร้อมปฏิบัติตาม PDPA และปกป้องข้อมูลส่วนบุคคล",
};

const UNIVERSAL_SIMULATOR_DESCRIPTION: LocalizedText = {
  en: "QA LAB is an IN Z platform for QA and product teams to simulate user behavior and test deployed web/API systems — including mobile app backends and Appium native E2E (License/local or BrowserStack BYOK). Available as Cloud SaaS (monthly), BYOK License with Early Bird 2026 pricing (annual), or White Label. Try free with a readiness audit — no signup required.",
  th: "QA LAB เป็นแพลตฟอร์มของ IN Z สำหรับทีม QA และผลิตภัณฑ์ เพื่อจำลองพฤติกรรมผู้ใช้และทดสอบระบบเว็บ/API ที่ติดตั้งแล้ว — รวม API/แบ็กเอนด์ของแอปมือถือ และทดสอบ E2E บนแอป native ผ่าน Appium (License/เครื่องตัวเอง หรือ BrowserStack BYOK) มีทั้ง Cloud SaaS รายเดือน, License แบบนำคีย์มาเองในราคา Early Bird 2026 รายปี หรือ White Label ทดลองฟรีด้วยการตรวจความพร้อมของระบบ — ไม่ต้องสมัคร",
};

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

const MUSIC_DEMO_DESCRIPTION: LocalizedText = {
  en: "Music Demo is an AI music creation studio for makers, creators, and small labels. Users generate song drafts from prompts, preview takes, then confirm and export — lyrics, chords, MIDI, MusicXML, and optional AI vocal preview. Pricing is pay-as-you-go credits (top up from ฿30 = 100 credits): create a song costs 50 credits, regenerate costs 25. Signup includes free credits. Built for fast creative loops without a monthly plan lock-in.",
  th: "Music Demo เป็นสตูดิโอสร้างเพลงด้วย AI สำหรับผู้สร้างสรรค์และค่ายเล็ก สร้างเดโมจากพรอมต์ ฟังตัวอย่าง แล้วยืนยันและส่งออก — เนื้อเพลง คอร์ด MIDI MusicXML และตัวอย่างเสียงร้อง AI ตามต้องการ คิดเงินแบบเครดิตเติมได้ (เริ่ม ฿30 = 100 เครดิต): สร้างเพลง 50 เครดิต สร้างใหม่ 25 เครดิต สมัครแล้วได้เครดิตฟรี ออกแบบให้วนลูปสร้างสรรค์ได้เร็ว โดยไม่ล็อกแพ็กเกจรายเดือน",
};

const CONTENT_CREATOR_DESCRIPTION: LocalizedText = {
  en: "Content Creator is IN Z’s Thai + SEA content platform: podcast pipelines (upload → AI transcription → show notes → clips → RSS) plus AI Video (idea chat → script → media match → TTS → render MP4 → multi-platform publish). It supports Thai dialects (Isan, Northern, Southern), Thai central, English, Vietnamese, and Indonesian. Billing is a 14-day free trial, then Starter ฿599, Creator ฿1,499, and Pro ฿2,999 per month — with real episode, render, storage, and feature quotas.",
  th: "Content Creator คือแพลตฟอร์มคอนเทนต์ไทยและเอเชียตะวันออกเฉียงใต้ของ IN Z: ไปป์ไลน์พอดแคสต์ (อัปโหลด → ถอดเสียงด้วย AI → บันทึกตอน → คลิป → RSS) และวิดีโอ AI (แชทไอเดีย → สคริปต์ → จับคู่สื่อ → แปลงข้อความเป็นเสียง → เรนเดอร์ MP4 → เผยแพร่หลายแพลตฟอร์ม) รองรับภาษาถิ่นไทย (อีสาน เหนือ ใต้) ไทยกลาง อังกฤษ เวียดนาม และอินโดนีเซีย เริ่มทดลองฟรี 14 วัน แล้วเป็น Starter ฿599, Creator ฿1,499 และ Pro ฿2,999 ต่อเดือน พร้อมโควต้าตอน เรนเดอร์ ที่เก็บข้อมูล และฟีเจอร์จริง",
};

const NETR_DESCRIPTION: LocalizedText = {
  en: "NetR is an IN Z network and relationship product for mapping partners, channels, and operating links across the business. It helps teams keep counterparties, referral paths, and collaboration status visible in one place so growth and operations stay aligned. Designed as a commercial IN Z product alongside SynthComm, QA LAB, Music Demo, and Content Creator — with Early Bird and standard plans for teams that need structured network visibility without building a custom CRM from scratch.",
  th: "NetR เป็นผลิตภัณฑ์เครือข่ายและความสัมพันธ์ของ IN Z สำหรับแมปพาร์ทเนอร์ ช่องทาง และลิงก์การดำเนินงานของธุรกิจ ช่วยให้ทีมเห็นคู่ค้า เส้นทางแนะนำ และสถานะความร่วมมือในที่เดียว เพื่อให้การเติบโตและการดำเนินงานไปด้วยกัน ออกแบบเป็นผลิตภัณฑ์เชิงพาณิชย์ของ IN Z คู่กับ SynthComm, QA LAB, Music Demo และ Content Creator — มี Early Bird และแพ็กเกจมาตรฐาน สำหรับทีมที่ต้องการมองเห็นเครือข่ายอย่างเป็นระบบ โดยไม่ต้องสร้างระบบลูกค้าสัมพันธ์ขึ้นมาเอง",
};

const SYNTHCOMM_SAAS_TIERS: PricingTier[] = [
  {
    name: { en: "Free", th: "ฟรี" },
    price: "฿0",
    detail: {
      en: "100 conversations / month",
      th: "100 บทสนทนา / เดือน",
    },
    highlight: true,
  },
  {
    name: { en: "Starter", th: "Starter" },
    price: "฿2,900 / month",
    detail: {
      en: "1,000 conversations / month",
      th: "1,000 บทสนทนา / เดือน",
    },
  },
  {
    name: { en: "Growth", th: "Growth" },
    price: "฿12,900 / month",
    detail: {
      en: "5,000 conversations / month",
      th: "5,000 บทสนทนา / เดือน",
    },
  },
  {
    name: { en: "Business", th: "Business" },
    price: "฿39,000 / month",
    detail: {
      en: "20,000 conversations / month",
      th: "20,000 บทสนทนา / เดือน",
    },
  },
  {
    name: { en: "Enterprise", th: "Enterprise" },
    price: { en: "Custom", th: "ตามตกลง" },
    detail: {
      en: "Unlimited · white-label · custom SLA",
      th: "ไม่จำกัด · white-label · SLA ตามตกลง",
    },
  },
];

const SYNTHCOMM_LICENSE_TIERS: PricingTier[] = [
  {
    name: { en: "Startup License", th: "Startup License" },
    price: "฿480,000",
    detail: {
      en: "Binary · 1 domain · up to 50K/mo · co-branded · 6 months support",
      th: "ไบนารี · 1 โดเมน · สูงสุด 50,000/เดือน · ร่วมแบรนด์ · ซัพพอร์ต 6 เดือน",
    },
    highlight: true,
  },
];

const SYNTHCOMM_WHITE_LABEL_TIERS: PricingTier[] = [
  {
    name: { en: "Agency White Label", th: "Agency White Label" },
    price: "฿980,000",
    detail: {
      en: "100% rebrand · no badge · unlimited scale · SaaS resell rights",
      th: "รีแบรนด์ 100% · ไม่มีป้าย · สเกลไม่จำกัด · สิทธิ์ขายต่อแบบ SaaS",
    },
    highlight: true,
  },
  {
    name: { en: "Enterprise IP Package", th: "Enterprise IP Package" },
    price: "฿2,800,000",
    detail: {
      en: "Full source · IP transfer · 2 years support · modify & own",
      th: "ซอร์สเต็ม · โอนสิทธิ์ · ซัพพอร์ต 2 ปี · แก้ไขและเป็นเจ้าของได้",
    },
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
    name: { en: "Team", th: "Team" },
    price: "฿120,000 / year",
    detail: {
      en: "Early Bird · then ฿156,000 Year 2+ · Unlimited users (concurrent ≤ 10) · BYOK · Dedicated · Email 24h · Onboarding 1 session",
      th: "Early Bird · ปีที่ 2 เป็นต้นไป ฿156,000 · ผู้ใช้ไม่จำกัด (พร้อมกันไม่เกิน 10) · นำคีย์มาเอง · Dedicated · อีเมล 24 ชม. · อบรม 1 ครั้ง",
    },
  },
  {
    name: { en: "Enterprise", th: "Enterprise" },
    price: "฿200,000 / year",
    detail: {
      en: "Early Bird · then ฿260,000 Year 2+ · Unlimited users (concurrent ≤ 30) · BYOK · Dedicated + Auto-scale · Line + Email 4h · SLA 99.5% · Onboarding 2 sessions",
      th: "Early Bird · ปีที่ 2 เป็นต้นไป ฿260,000 · ผู้ใช้ไม่จำกัด (พร้อมกันไม่เกิน 30) · นำคีย์มาเอง · Dedicated + Auto-scale · Line + อีเมล 4 ชม. · SLA 99.5% · อบรม 2 ครั้ง",
    },
    highlight: true,
  },
  {
    name: { en: "Government", th: "ภาครัฐ" },
    price: "฿300,000 / year",
    detail: {
      en: "Early Bird · then ฿390,000 Year 2+ · Unlimited users (concurrent ≤ 50) · BYOK · Dedicated + Auto-scale · Line + Email + On-site · SLA 99.9% · Official docs · Onboarding 3 sessions",
      th: "Early Bird · ปีที่ 2 เป็นต้นไป ฿390,000 · ผู้ใช้ไม่จำกัด (พร้อมกันไม่เกิน 50) · นำคีย์มาเอง · Dedicated + Auto-scale · Line + อีเมล + On-site · SLA 99.9% · เอกสารราชการ · อบรม 3 ครั้ง",
    },
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
    name: { en: "Top-up 100", th: "เติม 100" },
    price: "฿30",
    detail: {
      en: "100 credits · ~2 songs or 1 song + 2 regenerates",
      th: "100 เครดิต · ประมาณ 2 เพลง หรือ 1 เพลง + สร้างใหม่ 2 ครั้ง",
    },
    highlight: true,
  },
  {
    name: { en: "Top-up 300", th: "เติม 300" },
    price: "฿90",
    detail: {
      en: "300 credits · ~6 songs (no regenerates)",
      th: "300 เครดิต · ประมาณ 6 เพลง (ไม่รวมสร้างใหม่)",
    },
  },
  {
    name: { en: "Top-up 1,000", th: "เติม 1,000" },
    price: "฿270",
    detail: {
      en: "1,000 credits · for frequent creators",
      th: "1,000 เครดิต · สำหรับผู้สร้างที่ใช้บ่อย",
    },
  },
  {
    name: { en: "Usage", th: "การใช้งาน" },
    price: "50 / 25",
    detail: {
      en: "Create song 50 credits · Regenerate 25 credits",
      th: "สร้างเพลง 50 เครดิต · สร้างใหม่ 25 เครดิต",
    },
  },
  {
    name: { en: "Signup bonus", th: "โบนัสสมัคร" },
    price: { en: "100–300 free", th: "ฟรี 100–300" },
    detail: {
      en: "100 credits on signup · 300 for the first 30 users",
      th: "100 เครดิตเมื่อสมัคร · 300 สำหรับผู้ใช้ 30 คนแรก",
    },
  },
];

const CONTENT_CREATOR_SAAS_TIERS: PricingTier[] = [
  {
    name: { en: "Free Trial", th: "ทดลองฟรี" },
    price: { en: "฿0 · 14 days", th: "฿0 · 14 วัน" },
    detail: {
      en: "5 episodes total · 3 video renders (watermark) · 5 GB storage",
      th: "5 ตอน · เรนเดอร์วิดีโอ 3 ครั้ง (มีลายน้ำ) · ที่เก็บ 5 GB",
    },
  },
  {
    name: { en: "Starter", th: "Starter" },
    price: "฿599 / month",
    detail: {
      en: "10 episodes · 20 renders · 20 GB · RSS + 3 platforms",
      th: "10 ตอน · เรนเดอร์ 20 ครั้ง · 20 GB · RSS + 3 แพลตฟอร์ม",
    },
  },
  {
    name: { en: "Creator", th: "Creator" },
    price: "฿1,499 / month",
    detail: {
      en: "50 episodes · 150 renders · 100 GB · AI clips · scheduler · guests · analytics · team",
      th: "50 ตอน · เรนเดอร์ 150 ครั้ง · 100 GB · คลิป AI · ตั้งเวลา · แขกรับเชิญ · วิเคราะห์ · ทีม",
    },
    highlight: true,
  },
  {
    name: { en: "Pro", th: "Pro" },
    price: "฿2,999 / month",
    detail: {
      en: "200 episodes · 600 renders · 500 GB · monetization · API · white-label",
      th: "200 ตอน · เรนเดอร์ 600 ครั้ง · 500 GB · สร้างรายได้ · API · white-label",
    },
  },
];

const CONTACT_SALES: LocalizedText = {
  en: "Contact sales",
  th: "ติดต่อฝ่ายขาย",
};

export const PRODUCT_CATALOG: CatalogProduct[] = [
  {
    name: "SynthComm",
    title: {
      en: "SynthComm — Industrial Thai Synthetic Data Factory",
      th: "SynthComm — โรงงานข้อมูลสังเคราะห์ภาษาไทยระดับอุตสาหกรรม",
    },
    description: SYNTHCOMM_DESCRIPTION,
    earlyBirdPrice: { en: "Contact for quote", th: "ติดต่อขอใบเสนอราคา" },
    regularPrice: { en: "Custom packaging", th: "แพ็กเกจตามความต้องการ" },
    models: ["white-label", "license", "saas"],
    pricingByModel: {
      saas: {
        ctaLabel: {
          en: "Try free — 100 conversations",
          th: "ทดลองฟรี — 100 บทสนทนา",
        },
        ctaHref: "/demo",
        note: {
          en: "Annual plans save about 20%.",
          th: "แพ็กเกจรายปีประหยัดประมาณ 20%",
        },
        tiers: SYNTHCOMM_SAAS_TIERS,
      },
      license: {
        ctaLabel: CONTACT_SALES,
        ctaHref: "/contact?channel=customer-service",
        note: {
          en: "Co-branded license with Powered by SynthComm badge. Upgrade to White Label for full rebrand.",
          th: "ไลเซนส์ร่วมแบรนด์พร้อมป้าย Powered by SynthComm อัปเกรดเป็น White Label หากต้องการรีแบรนด์เต็มรูปแบบ",
        },
        tiers: SYNTHCOMM_LICENSE_TIERS,
      },
      "white-label": {
        ctaLabel: CONTACT_SALES,
        ctaHref: "/contact?channel=customer-service",
        note: {
          en: "Pay in full and save 10%. Installment available on Agency White Label and Enterprise IP.",
          th: "ชำระเต็มจำนวนลด 10% ผ่อนได้สำหรับ Agency White Label และ Enterprise IP",
        },
        tiers: SYNTHCOMM_WHITE_LABEL_TIERS,
      },
    },
  },
  {
    name: "QA LAB",
    title: {
      en: "QA LAB — User Behavior Simulation for QA Teams",
      th: "QA LAB — จำลองพฤติกรรมผู้ใช้สำหรับทีม QA",
    },
    description: UNIVERSAL_SIMULATOR_DESCRIPTION,
    earlyBirdPrice: {
      en: "SaaS from ฿490 / month · License Early Bird from ฿120,000 / year",
      th: "SaaS เริ่ม ฿490 / เดือน · License Early Bird เริ่ม ฿120,000 / ปี",
    },
    regularPrice: {
      en: "License Year 2+ from ฿156,000 · White Label ฿3,000,000+",
      th: "License ปีที่ 2 เป็นต้นไป เริ่ม ฿156,000 · White Label ฿3,000,000+",
    },
    models: ["saas", "license", "white-label"],
    scopeOfWork: UNIVERSAL_SIMULATOR_SCOPE,
    pricingByModel: {
      saas: {
        ctaLabel: {
          en: "Try free readiness audit",
          th: "ทดลองตรวจความพร้อมฟรี",
        },
        ctaHref: "/demo",
        note: {
          en: "Cloud SaaS · monthly. Free readiness audit — no signup. Prices exclude VAT 7%.",
          th: "Cloud SaaS รายเดือน ตรวจความพร้อมฟรี — ไม่ต้องสมัคร ราคาไม่รวม VAT 7%",
        },
        tiers: UNIVERSAL_SIMULATOR_SAAS_TIERS,
      },
      license: {
        ctaLabel: CONTACT_SALES,
        ctaHref: "/contact?channel=customer-service",
        note: {
          en: "Early Bird 2026 · BYOK (Bring Your Own API Key) · Unlimited users with fair-use concurrent caps. Year 2+ list price applies after Early Bird.",
          th: "Early Bird 2026 · นำคีย์ API มาเอง · ผู้ใช้ไม่จำกัดตามเพดานการใช้งานพร้อมกัน ปีที่ 2 เป็นต้นไปคิดราคาปกติหลัง Early Bird",
        },
        tiers: UNIVERSAL_SIMULATOR_LICENSE_TIERS,
      },
      "white-label": {
        ctaLabel: CONTACT_SALES,
        ctaHref: "/contact?channel=customer-service",
        note: {
          en: "One-time from ฿3,000,000+ · source + full ownership · no royalty · BYOK.",
          th: "ซื้อขาดเริ่ม ฿3,000,000+ · ซอร์สและกรรมสิทธิ์เต็ม · ไม่มีค่าสิทธิ์ · นำคีย์มาเอง",
        },
        tiers: UNIVERSAL_SIMULATOR_WHITE_LABEL_TIERS,
      },
    },
  },
  {
    name: "Music Demo",
    title: {
      en: "Music Demo — AI Music Creation Studio",
      th: "Music Demo — สตูดิโอสร้างเพลงด้วย AI",
    },
    description: MUSIC_DEMO_DESCRIPTION,
    earlyBirdPrice: {
      en: "Signup bonus 100–300 credits · top-up from ฿30",
      th: "โบนัสสมัคร 100–300 เครดิต · เติมเริ่ม ฿30",
    },
    regularPrice: {
      en: "฿30 = 100 credits · create 50 · regen 25",
      th: "฿30 = 100 เครดิต · สร้าง 50 · สร้างใหม่ 25",
    },
    models: ["saas"],
    pricingByModel: {
      saas: {
        ctaLabel: { en: "Open Music Demo", th: "เปิด Music Demo" },
        ctaHref: "/demo",
        note: {
          en: "Credits pay-as-you-go — no monthly plan. Artist Blueprint (lyrics / chords / MIDI / MusicXML). AI Vocal Preview add-on from ฿49. Prices exclude VAT 7%.",
          th: "เครดิตจ่ายตามใช้ — ไม่มีแพ็กเกจรายเดือน Artist Blueprint (เนื้อเพลง / คอร์ด / MIDI / MusicXML) ส่วนเสริมตัวอย่างเสียงร้อง AI เริ่ม ฿49 ราคาไม่รวม VAT 7%",
        },
        tiers: MUSIC_DEMO_SAAS_TIERS,
      },
    },
  },
  {
    name: "Content Creator",
    title: {
      en: "Content Creator — Podcast + AI Video for Thai & SEA",
      th: "Content Creator — พอดแคสต์และวิดีโอ AI สำหรับไทยและเอเชียตะวันออกเฉียงใต้",
    },
    description: CONTENT_CREATOR_DESCRIPTION,
    earlyBirdPrice: { en: "14-day free trial", th: "ทดลองฟรี 14 วัน" },
    regularPrice: { en: "฿599 – ฿2,999 / month", th: "฿599 – ฿2,999 / เดือน" },
    models: ["saas"],
    pricingByModel: {
      saas: {
        ctaLabel: { en: "Open Content Creator", th: "เปิด Content Creator" },
        ctaHref: "/demo",
        note: {
          en: "Source of truth: Content Creator plans.ts — Free Trial then Starter / Creator / Pro. Annual ~17% off. Quotas enforced (episodes, renders, storage, features).",
          th: "อ้างอิงแพ็กเกจ Content Creator — ทดลองฟรี แล้วเป็น Starter / Creator / Pro รายปีลดประมาณ 17% มีโควต้าตอน เรนเดอร์ ที่เก็บข้อมูล และฟีเจอร์",
        },
        tiers: CONTENT_CREATOR_SAAS_TIERS,
      },
    },
  },
  {
    name: "NetR",
    title: {
      en: "NetR — Network & Relationship Hub",
      th: "NetR — ศูนย์เครือข่ายและความสัมพันธ์",
    },
    description: NETR_DESCRIPTION,
    earlyBirdPrice: { en: "Contact for Early Bird", th: "ติดต่อสำหรับ Early Bird" },
    regularPrice: { en: "Subscription tiers", th: "แพ็กเกจรายเดือน" },
    models: ["saas"],
  },
];

export function productSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-");
}

export function findCatalogProduct(slug: string): CatalogProduct | undefined {
  return PRODUCT_CATALOG.find((product) => productSlug(product.name) === slug);
}

export function productManualHref(name: string, lang: AuthLang = "en"): string {
  return `/manuals/${productSlug(name)}.${lang}.md`;
}

export function localizeTiers(
  tiers: PricingTier[] | undefined,
  lang: AuthLang,
): Array<{ name: string; price: string; detail: string; highlight?: boolean }> {
  return (tiers || []).map((tier) => ({
    name: pickLang(tier.name, lang),
    price: pickLang(tier.price, lang),
    detail: pickLang(tier.detail, lang),
    highlight: tier.highlight,
  }));
}

export function pricingForProduct(
  product: CatalogProduct,
  model: ProductModel,
  lang: AuthLang = "en",
): {
  ctaLabel: string;
  ctaHref?: string;
  note?: string;
  tiers: Array<{ name: string; price: string; detail: string; highlight?: boolean }>;
} | null {
  const byModel = product.pricingByModel?.[model];
  if (byModel) {
    return {
      ctaLabel: pickLang(
        byModel.ctaLabel,
        lang,
        lang === "th" ? "เข้าสู่ระบบ / สมัคร" : "Sign In / Sign Up",
      ),
      ctaHref: byModel.ctaHref,
      note: pickLang(byModel.note, lang) || undefined,
      tiers: localizeTiers(byModel.tiers, lang),
    };
  }
  return null;
}
