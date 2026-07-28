export type ProductId =
  | "admin-portal"
  | "synthcomm"
  | "ai-commerce"
  | "restochain"
  | "ai-marketing"
  | "music-demo";

export type ProductEntry = {
  id: ProductId;
  name: string;
  description: { th: string; en: string };
  href: string;
  available: boolean;
};

/** Full catalog shown to Admin trial accounts (no subscription gate). */
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
    id: "ai-commerce",
    name: "AI-Commerce",
    description: {
      th: "ผู้ช่วยจัดซื้อสำหรับร้านออนไลน์",
      en: "Procurement assistant for online sellers",
    },
    href: "https://ai-commerce-production.up.railway.app",
    available: true,
  },
  {
    id: "restochain",
    name: "RestoChain",
    description: {
      th: "สต็อกและต้นทุนอาหารร้านอาหาร",
      en: "Restaurant inventory and food costing",
    },
    href: "https://restochain-production.up.railway.app",
    available: true,
  },
  {
    id: "ai-marketing",
    name: "AI-Marketing",
    description: {
      th: "Emotional Marketing + วิเคราะห์เทรนด์ตลาด",
      en: "Emotional marketing and market trend analysis",
    },
    href: "https://ai-marketing-production-d0d4.up.railway.app",
    available: true,
  },
  {
    id: "music-demo",
    name: "Music Demo",
    description: {
      th: "เดโมสร้างเพลงด้วย AI",
      en: "AI music generation demo",
    },
    href: "https://myclaw-music-demo-production.up.railway.app",
    available: true,
  },
];

export function productsForAccess(isAdmin: boolean): ProductEntry[] {
  if (isAdmin) {
    return PRODUCTS.map((product) => ({ ...product, available: true }));
  }
  // Non-admin: only currently subscribed / launched products
  return PRODUCTS.filter((product) =>
    ["synthcomm", "ai-commerce", "restochain"].includes(product.id),
  );
}
