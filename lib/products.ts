export type ProductId =
  | "admin-portal"
  | "synthcomm"
  | "universal-simulator"
  | "ai-marketing"
  | "music-demo"
  | "content-creator"
  | "netr"
  | "prism";

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
      th: "โรงงานข้อมูลบทสนทนาสังเคราะห์ (ไทย · อังกฤษ · อินโด · เวียด)",
      en: "Industrial synthetic CS data factory (TH · EN · ID · VI)",
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
    id: "ai-marketing",
    name: "AI-Marketing",
    description: {
      th: "เครื่องมือวิเคราะห์เทรนด์ภายใน (ไม่ใช่ product ขาย)",
      en: "Internal trend analysis tool (not a sellable product)",
    },
    href: "https://ai-marketing-production-d0d4.up.railway.app",
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
];

export const CHECKOUT_PRODUCT_IDS: ProductId[] = [
  ...COMMERCIAL_PRODUCT_IDS,
  "prism",
];

/** Normalize legacy product ids from older ERP / trial grants. */
export function normalizeProductId(id: string): string {
  if (id === "podcast") return "content-creator";
  return id;
}

export function productsForAccess(
  isAdmin: boolean,
  allowedProducts?: string[] | null,
): ProductEntry[] {
  const commercial = PRODUCTS.filter((product) =>
    COMMERCIAL_PRODUCT_IDS.includes(product.id),
  );

  if (allowedProducts && allowedProducts.length > 0) {
    const allowed = new Set(allowedProducts.map(normalizeProductId));
    return commercial
      .filter((product) => allowed.has(product.id))
      .map((product) => ({ ...product, available: true }));
  }

  // Admin trial unlocks every commercial product — still excludes internal tools.
  if (isAdmin) {
    return commercial.map((product) => ({ ...product, available: true }));
  }

  return commercial;
}
