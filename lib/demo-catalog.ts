import { COMMERCIAL_PRODUCT_IDS, PRODUCTS, type ProductId } from "@/lib/products";
import type { AuthLang } from "@/lib/auth-i18n";

export type DemoOffer = {
  id: ProductId;
  name: string;
  href: string;
  requiresSignup: boolean;
  external: boolean;
  trialTitle: Record<AuthLang, string>;
  trialSummary: Record<AuthLang, string>;
  ctaLabel: Record<AuthLang, string>;
};

const PRODUCT_HREF = Object.fromEntries(
  PRODUCTS.map((p) => [p.id, p.href]),
) as Record<ProductId, string>;

/** Public free-trial hub entries — commercial products only. */
export const DEMO_OFFERS: DemoOffer[] = [
  {
    id: "synthcomm",
    name: "SynthComm",
    href: PRODUCT_HREF.synthcomm,
    requiresSignup: true,
    external: true,
    trialTitle: {
      en: "Free — 100 conversations / month",
      th: "ฟรี — 100 บทสนทนา / เดือน",
    },
    trialSummary: {
      en: "Generate synthetic CS conversations free — 100 per month (TH · EN · ID · VI).",
      th: "สร้างบทสนทนาสังเคราะห์ฟรี 100 ครั้งต่อเดือน (ไทย · อังกฤษ · อินโด · เวียด)",
    },
    ctaLabel: {
      en: "Try SynthComm free",
      th: "ทดลอง SynthComm ฟรี",
    },
  },
  {
    id: "universal-simulator",
    name: "QA LAB",
    href: `${PRODUCT_HREF["universal-simulator"]}/#readiness-section`,
    requiresSignup: false,
    external: true,
    trialTitle: {
      en: "Free Readiness Audit",
      th: "ตรวจความพร้อมฟรี",
    },
    trialSummary: {
      en: "Scan your real system URL for a score plus up to 5 findings — no signup, no card.",
      th: "สแกน URL ระบบจริง ได้คะแนน + สูงสุด 5 ข้อค้นพบ — ไม่ต้องสมัคร ไม่ต้องใส่บัตร",
    },
    ctaLabel: {
      en: "Run free readiness check",
      th: "เริ่มสแกนฟรี",
    },
  },
  {
    id: "music-demo",
    name: "Music Demo",
    href: PRODUCT_HREF["music-demo"],
    requiresSignup: true,
    external: true,
    trialTitle: {
      en: "Try AI music creation",
      th: "ลองสร้างเพลงด้วย AI",
    },
    trialSummary: {
      en: "DEMO / blueprint credits — we help you complete; you finish the song.",
      th: "เครดิต DEMO / blueprint — เราช่วยให้คุณสมบูรณ์ คุณใส่จิตวิญญาณ",
    },
    ctaLabel: {
      en: "Open Music Demo",
      th: "เปิด Music Demo",
    },
  },
  {
    id: "content-creator",
    name: "Content Creator",
    href: PRODUCT_HREF["content-creator"],
    requiresSignup: true,
    external: true,
    trialTitle: {
      en: "14-day free trial",
      th: "ทดลองใช้ฟรี 14 วัน",
    },
    trialSummary: {
      en: "Try podcast + AI video for Thai dialects and SEA — 5 episodes and 3 watermarked renders on trial.",
      th: "ทดลองพอดแคสต์ + AI Video สำหรับถิ่นไทยและ SEA — 5 ตอน และเรนเดอร์ 3 ครั้งติดลายน้ำในช่วงทดลอง",
    },
    ctaLabel: {
      en: "Start Content Creator trial",
      th: "เริ่มทดลอง Content Creator",
    },
  },
  {
    id: "netr",
    name: "NetR",
    href: `${PRODUCT_HREF.netr.replace(/\/$/, "")}/chat`,
    requiresSignup: true,
    external: true,
    trialTitle: {
      en: "Free — 5 minutes / day",
      th: "ฟรี — 5 นาที/วัน",
    },
    trialSummary: {
      en: "Sign up on inz.lol, open NetR (SSO), record your birth chart once — owner-only chart view. Free daily chat minutes, then Prepaid or Plus.",
      th: "สมัคร inz.lol เปิด NetR (SSO) จารึกดวงครั้งเดียว — ดูดวงได้เจ้าของบัญชีเท่านั้น คุยฟรีรายวัน แล้ว Prepaid หรือ Plus",
    },
    ctaLabel: {
      en: "Try netr free",
      th: "ทดลองเนตรฟรี",
    },
  },
];

export const DEMO_COPY: Record<
  AuthLang,
  {
    label: string;
    lead: string;
    metaSignup: string;
    metaNoSignup: string;
  }
> = {
  en: {
    label: "Demo",
    lead: "Try each product free before you subscribe — pick a trial and open the live app.",
    metaSignup: "May require account signup in the product app",
    metaNoSignup: "No signup required to start",
  },
  th: {
    label: "Demo",
    lead: "ทดลองใช้แต่ละผลิตภัณฑ์ฟรีก่อนสมัครแพ็กเกจ — เลือกแล้วเปิดแอปจริงได้เลย",
    metaSignup: "อาจต้องสมัครบัญชีในแอปของผลิตภัณฑ์",
    metaNoSignup: "เริ่มได้โดยไม่ต้องสมัคร",
  },
};

export function demoOffersForCommercial(): DemoOffer[] {
  const allowed = new Set(COMMERCIAL_PRODUCT_IDS);
  return DEMO_OFFERS.filter((offer) => allowed.has(offer.id));
}
