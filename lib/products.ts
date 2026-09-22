export type ProductId =
  | "admin-portal"
  | "synthcomm"
  | "universal-simulator"
  | "ai-marketing"
  | "music-demo"
  | "content-creator"
  | "netr"
  | "score-board"
  | "prism"
  | "prism-api"
  | "erp"
  | "erp-demo";

export type ProductEntry = {
  id: ProductId;
  name: string;
  description: { th: string; en: string };
  href: string;
  available: boolean;
};

/** Product catalog. Account launcher shows commercial ids only. */
export const PRODUCTS: ProductEntry[] = [
  {
    id: "admin-portal",
    name: "Admin Portal",
    description: {
      th: "ศูนย์ Admin แผนก CFO / บัญชี / การตลาด / HR",
      en: "Department admin for CFO, Accounting, Marketing, HR",
    },
    href: "https://www.inz.lol/admin",
    available: true,
  },
  {
    id: "synthcomm",
    name: "SynthComm",
    description: {
      th: "บทสนทนา CS และเอกสาร JSON สังเคราะห์ (ไทย · อังกฤษ · อินโด · เวียด)",
      en: "Synthetic CS dialogues + document JSON (TH · EN · ID · VI)",
    },
    href: "https://synthcomm-production.up.railway.app",
    available: true,
  },
  {
    id: "universal-simulator",
    name: "QA LAB",
    description: {
      th: "จำลอง + ตรวจสอบเว็บ/API/มือถือ",
      en: "Simulation & verification for web, API, and mobile",
    },
    href: "https://qa-lab-production.up.railway.app",
    available: true,
  },
  {
    id: "music-demo",
    name: "Music Demo",
    description: {
      th: "เครื่องมือ DEMO / blueprint — เราช่วยให้คุณสมบูรณ์",
      en: "DEMO / blueprint tool — we help you complete",
    },
    href: "https://myclaw-music-demo-production.up.railway.app",
    available: true,
  },
  {
    id: "content-creator",
    name: "Content Creator",
    description: {
      th: "พอดแคสต์ + AI Video สำหรับถิ่นไทยและ SEA",
      en: "Podcast + AI video for Thai dialects and SEA",
    },
    href: "https://podcast-web-production-41ac.up.railway.app",
    available: true,
  },
  {
    id: "netr",
    name: "NetR",
    description: {
      th: "โหราศาสตร์กรรมไทย + AI ที่จำคุณได้",
      en: "Thai karmic astrology + AI that remembers you",
    },
    href: "https://netr-web-production-ea49.up.railway.app",
    available: true,
  },
  {
    id: "score-board",
    name: "Score Board Live",
    description: {
      th: "สกอร์บอร์ด overlay สำหรับสโมสร — OBS / Streamlabs / Larix",
      en: "Live scoreboard overlay for clubs — OBS / Streamlabs / Larix",
    },
    href: "https://score-board-production-a501.up.railway.app",
    available: true,
  },
  {
    id: "ai-marketing",
    name: "AI-Marketing",
    description: {
      th: "เครื่องมือวิเคราะห์เทรนด์ภายใน (ไม่ใช่ product ขาย)",
      en: "Internal trend analysis tool (not a sellable product)",
    },
    href: "https://ai-marketing-production-d0d4.up.railway.app",
    available: true,
  },
  {
    id: "prism",
    name: "PRISM",
    description: {
      th: "AI ดูแลลีดอสังหา — SRAG จับคู่เจตนากับโครงการ",
      en: "Real-estate AI lead engine — SRAG intent-to-project matching",
    },
    href: "https://prism-web-production-e0c6.up.railway.app",
    available: true,
  },
  {
    id: "prism-api",
    name: "PRISM API",
    description: {
      th: "API ของ PRISM — สุขภาพระบบและ endpoint สำหรับเชื่อมต่อ",
      en: "PRISM API — health check and integration endpoints",
    },
    href: "https://prism-api-production-b232.up.railway.app/health",
    available: true,
  },
  {
    id: "erp",
    name: "Universal ERP",
    description: {
      th: "ERP แบบโมดูลสำหรับ SME — Finance / HR / Stock / Procurement / Marketing",
      en: "Modular ERP for SME — Finance, HR, Stock, Procurement, Marketing",
    },
    href: "https://erp-atlas-production.up.railway.app/admin",
    available: true,
  },
  {
    id: "erp-demo",
    name: "ERP-Demo",
    description: {
      th: "Sandbox Universal ERP จาก repo ERP — ข้อมูลจำลอง ไม่ใช่ ATLAS บริษัท",
      en: "Universal ERP sandbox from ERP repo — simulated data, not company ATLAS",
    },
    href: "https://erp-demo-production-9ab8.up.railway.app",
    available: true,
  },
];

/** Commercial products only — Landing / ERP / AI-Marketing are not sellable products. */
export const COMMERCIAL_PRODUCT_IDS: ProductId[] = [
  "synthcomm",
  "universal-simulator",
  "music-demo",
  "content-creator",
  "netr",
  "score-board",
];

/** Shown on /demo — commercial trials plus selected platform demos. */
export const DEMO_HUB_PRODUCT_IDS: ProductId[] = [
  ...COMMERCIAL_PRODUCT_IDS,
  "prism",
  "erp-demo",
];

export const CHECKOUT_PRODUCT_IDS: ProductId[] = [
  ...COMMERCIAL_PRODUCT_IDS,
  "prism",
];

/**
 * Account launcher for admin@inz.lol / unlimited — every product needed to
 * check systems (commercial trials + demos + internal tools).
 * Company ATLAS (`erp`) is included for admin ops only; customer trials use erp-demo.
 */
export const ADMIN_LAUNCHER_PRODUCT_IDS: ProductId[] = [
  ...COMMERCIAL_PRODUCT_IDS,
  "prism",
  "erp-demo",
  "ai-marketing",
  "admin-portal",
  "prism-api",
  "erp",
];

/** SSO handoff-capable product ids (must match productBaseUrl keys). */
export const HANDOFF_PRODUCT_IDS: ProductId[] = [
  ...COMMERCIAL_PRODUCT_IDS,
  "prism",
  "prism-api",
  "erp",
  "erp-demo",
];

/** Normalize legacy product ids from older ERP / trial grants. */
export function normalizeProductId(id: string): string {
  if (id === "podcast") return "content-creator";
  if (id === "scoreboard" || id === "score-board-live") return "score-board";
  return id;
}

export function productsForAccess(
  isAdmin: boolean,
  allowedProducts?: string[] | null,
): ProductEntry[] {
  const commercial = PRODUCTS.filter((product) =>
    COMMERCIAL_PRODUCT_IDS.includes(product.id),
  );
  const adminPool = PRODUCTS.filter((product) =>
    ADMIN_LAUNCHER_PRODUCT_IDS.includes(product.id),
  );

  if (allowedProducts && allowedProducts.length > 0) {
    const allowed = new Set(allowedProducts.map(normalizeProductId));
    const pool = isAdmin ? adminPool : commercial;
    return pool
      .filter((product) => allowed.has(product.id))
      .map((product) => ({ ...product, available: true }));
  }

  // Demo admin / unlimited: unlock every launcher product for system checks.
  if (isAdmin) {
    return adminPool.map((product) => ({ ...product, available: true }));
  }

  return commercial;
}
