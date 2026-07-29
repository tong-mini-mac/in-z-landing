export type ProductId =
  | "admin-portal"
  | "synthcomm"
  | "universal-simulator"
  | "ai-marketing"
  | "music-demo"
  | "podcast"
  | "netr";

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
      th: "โรงงานข้อมูลสังเคราะห์ภาษาไทย",
      en: "Thai synthetic data factory",
    },
    href: "https://synthcomm-production.up.railway.app",
    available: true,
  },
  {
    id: "universal-simulator",
    name: "Universal Simulator",
    description: {
      th: "จำลองพฤติกรรมผู้ใช้สำหรับทีม QA",
      en: "User behavior simulation for QA teams",
    },
    href: "https://universal-simulator-production.up.railway.app",
    available: true,
  },
  {
    id: "music-demo",
    name: "Music Demo",
    description: {
      th: "สตูดิโอสร้างเพลงด้วย AI",
      en: "AI music creation studio",
    },
    href: "https://myclaw-music-demo-production.up.railway.app",
    available: true,
  },
  {
    id: "podcast",
    name: "Podcast",
    description: {
      th: "สตูดิโอพอดแคสต์ AI สำหรับครีเอเตอร์ไทย",
      en: "AI podcast studio for Thai creators",
    },
    href: "https://podcast-production-dd89.up.railway.app",
    available: true,
  },
  {
    id: "netr",
    name: "NetR",
    description: {
      th: "ศูนย์เครือข่ายและความสัมพันธ์ทางธุรกิจ",
      en: "Network and relationship hub",
    },
    href: "/products#netr",
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
  "podcast",
  "netr",
];

export function productsForAccess(
  isAdmin: boolean,
  allowedProducts?: string[] | null,
): ProductEntry[] {
  const commercial = PRODUCTS.filter((product) =>
    COMMERCIAL_PRODUCT_IDS.includes(product.id),
  );

  if (allowedProducts && allowedProducts.length > 0) {
    const allowed = new Set(allowedProducts);
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
