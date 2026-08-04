import { COMMERCIAL_PRODUCT_IDS, PRODUCTS, type ProductId } from "@/lib/products";

export type DemoOffer = {
  id: ProductId;
  name: string;
  trialTitle: string;
  trialSummary: string;
  ctaLabel: string;
  href: string;
  requiresSignup: boolean;
  external: boolean;
};

const PRODUCT_HREF = Object.fromEntries(
  PRODUCTS.map((p) => [p.id, p.href]),
) as Record<ProductId, string>;

/** Public free-trial hub entries — commercial products only. */
export const DEMO_OFFERS: DemoOffer[] = [
  {
    id: "synthcomm",
    name: "SynthComm",
    trialTitle: "Free — 100 conversations / month",
    trialSummary:
      "ลองสร้างชุดสนทนาภาษาไทยฟรี 100 ครั้งต่อเดือน ก่อนอัปเกรดแพ็กเกจ",
    ctaLabel: "Try SynthComm free",
    href: PRODUCT_HREF.synthcomm,
    requiresSignup: true,
    external: true,
  },
  {
    id: "universal-simulator",
    name: "Universal Simulator",
    trialTitle: "Free Readiness Audit",
    trialSummary:
      "สแกน URL ระบบจริง ได้คะแนน + สูงสุด 5 ข้อค้นพบ — ไม่ต้องสมัคร ไม่ต้องใส่บัตร",
    ctaLabel: "Run free readiness check",
    href: `${PRODUCT_HREF["universal-simulator"]}/#readiness-section`,
    requiresSignup: false,
    external: true,
  },
  {
    id: "music-demo",
    name: "Music Demo",
    trialTitle: "Try AI music creation",
    trialSummary: "เปิดสตูดิโอสร้างเพลงด้วย AI แล้วลองสร้างดราฟต์จาก prompt",
    ctaLabel: "Open Music Demo",
    href: PRODUCT_HREF["music-demo"],
    requiresSignup: true,
    external: true,
  },
  {
    id: "podcast",
    name: "Podcast",
    trialTitle: "14-day free trial",
    trialSummary:
      "ทดลองสตูดิโอพอดแคสต์ AI สำหรับครีเอเตอร์ไทย 14 วันก่อนเลือกแพ็กเกจ",
    ctaLabel: "Start Podcast trial",
    href: PRODUCT_HREF.podcast,
    requiresSignup: true,
    external: true,
  },
  {
    id: "netr",
    name: "NetR",
    trialTitle: "Early Bird / request a trial",
    trialSummary:
      "ยังไม่มี self-serve trial — ติดต่อทีมเพื่อขอทดลองใช้ Network & Relationship Hub",
    ctaLabel: "Contact for trial",
    href: "/contact?channel=customer-service",
    requiresSignup: false,
    external: false,
  },
];

export function demoOffersForCommercial(): DemoOffer[] {
  const allowed = new Set(COMMERCIAL_PRODUCT_IDS);
  return DEMO_OFFERS.filter((offer) => allowed.has(offer.id));
}
