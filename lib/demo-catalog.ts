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
      en: "Generate Thai conversations free — 100 per month — before upgrading.",
      th: "ลองสร้างชุดสนทนาภาษาไทยฟรี 100 ครั้งต่อเดือน ก่อนอัปเกรดแพ็กเกจ",
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
      en: "Open the AI music studio and draft songs from a prompt.",
      th: "เปิดสตูดิโอสร้างเพลงด้วย AI แล้วลองสร้างดราฟต์จาก prompt",
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
      en: "Try podcast + AI video for Thai dialects and SEA — 5 episodes and 3 renders on trial.",
      th: "ทดลองพอดแคสต์ + AI Video สำหรับภาษาถิ่นไทยและ SEA — 5 episodes และเรนเดอร์ 3 ครั้งในช่วงทดลอง",
    },
    ctaLabel: {
      en: "Start Content Creator trial",
      th: "เริ่มทดลอง Content Creator",
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
