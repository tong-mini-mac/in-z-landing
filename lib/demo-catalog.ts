import { DEMO_HUB_PRODUCT_IDS, PRODUCTS, type ProductId } from "@/lib/products";
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
  /** Shown when the trial app still has a login screen (sandbox-only). */
  sandboxLogin?: Record<AuthLang, string>;
};

const PRODUCT_HREF = Object.fromEntries(
  PRODUCTS.map((p) => [p.id, p.href]),
) as Record<ProductId, string>;

/** Public free-trial hub entries. */
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
  {
    id: "prism",
    name: "PRISM",
    href: PRODUCT_HREF.prism,
    requiresSignup: true,
    external: true,
    trialTitle: {
      en: "Live admin web — Prism-Demo",
      th: "แอดมินเว็บจริง — Prism-Demo",
    },
    trialSummary: {
      en: "Open Prism-Demo (IN Z trial fork): SRAG intent matching, lead segments, and SubsetGuard. Separate from the licensed prism product repo.",
      th: "เปิด Prism-Demo (fork ทดลองบน IN Z): จับคู่เจตนาด้วย SRAG แบ่งลีด และ SubsetGuard — แยกจาก repo product ที่ขาย license",
    },
    ctaLabel: {
      en: "Open Prism-Demo",
      th: "เปิด Prism-Demo",
    },
  },
  {
    id: "erp-demo",
    name: "ERP-Demo",
    href: PRODUCT_HREF["erp-demo"],
    requiresSignup: false,
    external: true,
    trialTitle: {
      en: "Sandbox from tong-mini-mac/ERP",
      th: "Sandbox จาก repo ERP",
    },
    trialSummary: {
      en: "Universal ERP demo with simulated data — separate from company ATLAS (admin.inz.lol).",
      th: "Universal ERP พร้อมข้อมูลจำลอง — แยกจาก ATLAS บริษัท (admin.inz.lol)",
    },
    sandboxLogin: {
      en: "Demo login: demo@erp.demo / demo-erp-2026",
      th: "รหัส Demo: demo@erp.demo / demo-erp-2026",
    },
    ctaLabel: {
      en: "Open ERP-Demo",
      th: "เปิด ERP-Demo",
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
    menuTab: string;
    menuLabel: string;
    closeMenu: string;
    trials: string;
    backToDemos: string;
    openExternal: string;
  }
> = {
  en: {
    label: "Demo",
    lead: "Try each product free before you subscribe — pick a trial and open the live app.",
    metaSignup: "May require account signup in the product app",
    metaNoSignup: "No signup required to start",
    menuTab: "Menu",
    menuLabel: "Demo menu",
    closeMenu: "Close menu",
    trials: "Trials",
    backToDemos: "Back to demos",
    openExternal: "Open in new tab",
  },
  th: {
    label: "Demo",
    lead: "ทดลองใช้แต่ละผลิตภัณฑ์ฟรีก่อนสมัครแพ็กเกจ — เลือกแล้วเปิดแอปจริงได้เลย",
    metaSignup: "อาจต้องสมัครบัญชีในแอปของผลิตภัณฑ์",
    metaNoSignup: "เริ่มได้โดยไม่ต้องสมัคร",
    menuTab: "เมนู",
    menuLabel: "เมนูทดลองใช้",
    closeMenu: "ปิดเมนู",
    trials: "รายการทดลอง",
    backToDemos: "กลับหน้ารายการ Demo",
    openExternal: "เปิดแท็บใหม่",
  },
};

export function demoOffersForCommercial(): DemoOffer[] {
  const allowed = new Set(DEMO_HUB_PRODUCT_IDS);
  return DEMO_OFFERS.filter((offer) => allowed.has(offer.id));
}
