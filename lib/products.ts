export type ProductId = "synthcomm" | "ai-commerce" | "restochain";

export type ProductEntry = {
  id: ProductId;
  name: string;
  description: { th: string; en: string };
  href: string;
  available: boolean;
};

export const PRODUCTS: ProductEntry[] = [
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
];
