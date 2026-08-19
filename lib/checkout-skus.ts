import type { AuthLang } from "@/lib/auth-i18n";
import type { ProductModel } from "@/lib/product-models";
import type { ProductId } from "@/lib/products";
import { pickLang, type LocalizedText } from "@/lib/product-catalog";

export const VAT_RATE = 0.07;
/** Omise PromptPay / card charges typically need at least ฿20. */
export const OMISE_MIN_BAHT = 20;
/** Thai PromptPay bank cap is typically ฿2,000,000 per transfer. */
export const OMISE_PROMPTPAY_MAX_BAHT = 2_000_000;

export type BillingInterval = "one_time" | "month" | "year";

export type CheckoutSku = {
  id: string;
  productId: ProductId;
  productName: string;
  planId: string;
  model: ProductModel;
  label: LocalizedText;
  detail: LocalizedText;
  amountBaht: number;
  interval: BillingInterval;
  credits?: number;
  minutes?: number;
  highlight?: boolean;
  /** No listed price — checkout sends the buyer to sales. */
  quoteOnly?: boolean;
};

export type MoneyBreakdown = {
  amount: number;
  vat: number;
  total: number;
};

export function roundBaht(value: number): number {
  return Math.round(value * 100) / 100;
}

export function withVat(amountBaht: number): MoneyBreakdown {
  const amount = roundBaht(amountBaht);
  const vat = roundBaht(amount * VAT_RATE);
  const total = roundBaht(amount + vat);
  return { amount, vat, total };
}

export function totalSatang(amountBaht: number): number {
  return Math.round(withVat(amountBaht).total * 100);
}

export const CHECKOUT_SKUS: CheckoutSku[] = [
  {
    id: "synthcomm-starter-monthly",
    productId: "synthcomm",
    productName: "SynthComm",
    planId: "starter",
    label: { en: "Starter", th: "Starter" },
    detail: { en: "1,000 conversations / month", th: "1,000 บทสนทนา / เดือน" },
    amountBaht: 2900,
    interval: "month",
    model: "saas",
  },
  {
    id: "synthcomm-growth-monthly",
    productId: "synthcomm",
    productName: "SynthComm",
    planId: "growth",
    label: { en: "Growth", th: "Growth" },
    detail: { en: "5,000 conversations / month", th: "5,000 บทสนทนา / เดือน" },
    amountBaht: 12900,
    interval: "month",
    model: "saas",
  },
  {
    id: "synthcomm-business-monthly",
    productId: "synthcomm",
    productName: "SynthComm",
    planId: "business",
    label: { en: "Business", th: "Business" },
    detail: { en: "20,000 conversations / month", th: "20,000 บทสนทนา / เดือน" },
    amountBaht: 39000,
    interval: "month",
    model: "saas",
  },
  {
    id: "qa-lab-starter-monthly",
    productId: "universal-simulator",
    productName: "QA LAB",
    planId: "starter",
    label: { en: "Starter", th: "Starter" },
    detail: {
      en: "1 user · 50 simulations / month",
      th: "1 ผู้ใช้ · 50 จำลอง / เดือน",
    },
    amountBaht: 490,
    interval: "month",
    model: "saas",
  },
  {
    id: "qa-lab-pro-monthly",
    productId: "universal-simulator",
    productName: "QA LAB",
    planId: "pro",
    label: { en: "Pro", th: "Pro" },
    detail: {
      en: "3 users · 300 simulations / month",
      th: "3 ผู้ใช้ · 300 จำลอง / เดือน",
    },
    amountBaht: 3490,
    interval: "month",
    model: "saas",
    highlight: true,
  },
  {
    id: "qa-lab-business-monthly",
    productId: "universal-simulator",
    productName: "QA LAB",
    planId: "business",
    label: { en: "Business", th: "Business" },
    detail: {
      en: "5 users · 500 simulations / month",
      th: "5 ผู้ใช้ · 500 จำลอง / เดือน",
    },
    amountBaht: 5990,
    interval: "month",
    model: "saas",
  },
  {
    id: "music-demo-credits-100",
    productId: "music-demo",
    productName: "Music Demo",
    planId: "credits-100",
    label: { en: "Top-up 100", th: "เติม 100" },
    detail: { en: "100 credits", th: "100 เครดิต" },
    amountBaht: 30,
    interval: "one_time",
    model: "saas",
    credits: 100,
    highlight: true,
  },
  {
    id: "music-demo-credits-300",
    productId: "music-demo",
    productName: "Music Demo",
    planId: "credits-300",
    label: { en: "Top-up 300", th: "เติม 300" },
    detail: { en: "300 credits", th: "300 เครดิต" },
    amountBaht: 90,
    interval: "one_time",
    model: "saas",
    credits: 300,
  },
  {
    id: "music-demo-credits-1000",
    productId: "music-demo",
    productName: "Music Demo",
    planId: "credits-1000",
    label: { en: "Top-up 1,000", th: "เติม 1,000" },
    detail: { en: "1,000 credits", th: "1,000 เครดิต" },
    amountBaht: 270,
    interval: "one_time",
    model: "saas",
    credits: 1000,
  },
  {
    id: "content-creator-starter-monthly",
    productId: "content-creator",
    productName: "Content Creator",
    planId: "starter",
    label: { en: "Starter", th: "Starter" },
    detail: { en: "10 episodes · 20 renders", th: "10 ตอน · เรนเดอร์ 20 ครั้ง" },
    amountBaht: 599,
    interval: "month",
    model: "saas",
  },
  {
    id: "content-creator-creator-monthly",
    productId: "content-creator",
    productName: "Content Creator",
    planId: "creator",
    label: { en: "Creator", th: "Creator" },
    detail: { en: "50 episodes · 150 renders", th: "50 ตอน · เรนเดอร์ 150 ครั้ง" },
    amountBaht: 1499,
    interval: "month",
    model: "saas",
    highlight: true,
  },
  {
    id: "content-creator-pro-monthly",
    productId: "content-creator",
    productName: "Content Creator",
    planId: "pro",
    label: { en: "Pro", th: "Pro" },
    detail: { en: "200 episodes · 600 renders", th: "200 ตอน · เรนเดอร์ 600 ครั้ง" },
    amountBaht: 2999,
    interval: "month",
    model: "saas",
  },
  {
    id: "netr-prepaid-15",
    productId: "netr",
    productName: "NetR",
    planId: "prepaid_15m",
    label: { en: "Prepaid 15 minutes", th: "Prepaid 15 นาที" },
    detail: { en: "Stackable chat minutes", th: "นาทีคุยดวงสะสมได้" },
    amountBaht: 20,
    interval: "one_time",
    model: "saas",
    minutes: 15,
  },
  {
    id: "netr-plus-monthly",
    productId: "netr",
    productName: "NetR",
    planId: "plus",
    label: { en: "Plus", th: "Plus" },
    detail: { en: "150 minutes / month", th: "150 นาที / เดือน" },
    amountBaht: 59,
    interval: "month",
    model: "saas",
    minutes: 150,
  },
  {
    id: "synthcomm-startup-license",
    productId: "synthcomm",
    productName: "SynthComm",
    planId: "startup-license",
    model: "license",
    label: { en: "Startup License", th: "Startup License" },
    detail: {
      en: "Dedicated instance · 1 CNAME · 50,000/mo · BYOK · badge required · 6 months support · engine not downloaded",
      th: "เครื่องแยกที่เราโฮสต์ · 1 โดเมน (CNAME) · 50,000/เดือน · นำคีย์มาเอง · มีป้าย · ซัพพอร์ต 6 เดือน · ไม่ส่งโรงงานให้โหลด",
    },
    amountBaht: 480_000,
    interval: "year",
    highlight: true,
  },
  {
    id: "synthcomm-professional-license",
    productId: "synthcomm",
    productName: "SynthComm",
    planId: "professional-license",
    model: "license",
    label: { en: "Professional License", th: "Professional License" },
    detail: {
      en: "Dedicated instance · 3 CNAMEs · 150,000/mo · BYOK · badge required · 12 months support · engine not downloaded",
      th: "เครื่องแยกที่เราโฮสต์ · 3 โดเมน (CNAME) · 150,000/เดือน · นำคีย์มาเอง · มีป้าย · ซัพพอร์ต 12 เดือน · ไม่ส่งโรงงานให้โหลด",
    },
    amountBaht: 720_000,
    interval: "year",
  },
  {
    id: "synthcomm-agency-white-label",
    productId: "synthcomm",
    productName: "SynthComm",
    planId: "agency-white-label",
    model: "white-label",
    label: { en: "Agency White Label", th: "Agency White Label" },
    detail: {
      en: "Your brand · no badge · resell SaaS · dedicated tenant · engine stays with IN Z",
      th: "แบรนด์คุณ · ไม่มีป้าย · ขายต่อ SaaS ได้ · เครื่องแยก · เอนจินยังอยู่กับ IN Z",
    },
    amountBaht: 980_000,
    interval: "one_time",
    highlight: true,
  },
  {
    id: "synthcomm-enterprise-ip",
    productId: "synthcomm",
    productName: "SynthComm",
    planId: "enterprise-ip",
    model: "white-label",
    label: { en: "Enterprise IP Package", th: "Enterprise IP Package" },
    detail: {
      en: "Full source · IP transfer · 2 years support · modify & own",
      th: "ซอร์สเต็ม · โอนสิทธิ์ · ซัพพอร์ต 2 ปี · แก้ไขและเป็นเจ้าของได้",
    },
    amountBaht: 2_800_000,
    interval: "one_time",
  },
  {
    id: "qa-lab-team-license",
    productId: "universal-simulator",
    productName: "QA LAB",
    planId: "team-license",
    model: "license",
    label: { en: "Team", th: "Team" },
    detail: {
      en: "Early Bird · Year 2+ ฿156,000 · concurrent ≤ 10 · BYOK",
      th: "Early Bird · ปีที่ 2 เป็นต้นไป ฿156,000 · พร้อมกันไม่เกิน 10 · นำคีย์มาเอง",
    },
    amountBaht: 120_000,
    interval: "year",
  },
  {
    id: "qa-lab-enterprise-license",
    productId: "universal-simulator",
    productName: "QA LAB",
    planId: "enterprise-license",
    model: "license",
    label: { en: "Enterprise", th: "Enterprise" },
    detail: {
      en: "Early Bird · Year 2+ ฿260,000 · concurrent ≤ 30 · BYOK",
      th: "Early Bird · ปีที่ 2 เป็นต้นไป ฿260,000 · พร้อมกันไม่เกิน 30 · นำคีย์มาเอง",
    },
    amountBaht: 200_000,
    interval: "year",
    highlight: true,
  },
  {
    id: "qa-lab-government-license",
    productId: "universal-simulator",
    productName: "QA LAB",
    planId: "government-license",
    model: "license",
    label: { en: "Government", th: "ภาครัฐ" },
    detail: {
      en: "Early Bird · Year 2+ ฿390,000 · concurrent ≤ 50 · official docs",
      th: "Early Bird · ปีที่ 2 เป็นต้นไป ฿390,000 · พร้อมกันไม่เกิน 50 · เอกสารราชการ",
    },
    amountBaht: 300_000,
    interval: "year",
  },
  {
    id: "qa-lab-white-label",
    productId: "universal-simulator",
    productName: "QA LAB",
    planId: "white-label",
    model: "white-label",
    label: { en: "White Label", th: "White Label" },
    detail: {
      en: "Source + full ownership · no royalty · BYOK · listed floor price",
      th: "ซอร์สและกรรมสิทธิ์เต็ม · ไม่มีค่าสิทธิ์ · นำคีย์มาเอง · ราคาตั้งต้นตามแคตตาล็อก",
    },
    amountBaht: 3_000_000,
    interval: "one_time",
    highlight: true,
  },
  {
    id: "prism-startup-license",
    productId: "prism",
    productName: "PRISM",
    planId: "startup-license",
    model: "license",
    label: { en: "Startup License", th: "Startup License" },
    detail: {
      en: "Co-branded binary · PRISM engine + admin web · contact for commercial terms",
      th: "ไบนารีร่วมแบรนด์ · เครื่องยนต์ PRISM + แอดมินเว็บ · ติดต่อเรื่องเงื่อนไข",
    },
    amountBaht: 0,
    interval: "year",
    highlight: true,
    quoteOnly: true,
  },
  {
    id: "prism-white-label",
    productId: "prism",
    productName: "PRISM",
    planId: "white-label",
    model: "white-label",
    label: { en: "White Label", th: "White Label" },
    detail: {
      en: "Full rebrand · PRISM engine + admin web · contact for source and ownership",
      th: "รีแบรนด์เต็ม · เครื่องยนต์ PRISM + แอดมินเว็บ · ติดต่อสำหรับซอร์สและกรรมสิทธิ์",
    },
    amountBaht: 0,
    interval: "one_time",
    highlight: true,
    quoteOnly: true,
  },
  {
    id: "prism-enterprise-ip",
    productId: "prism",
    productName: "PRISM",
    planId: "enterprise-ip",
    model: "white-label",
    label: { en: "Enterprise IP", th: "Enterprise IP" },
    detail: {
      en: "Source + ownership · RBAC knowledge base · contact for quote",
      th: "ซอร์สและกรรมสิทธิ์ · คลังความรู้ RBAC · ติดต่อขอใบเสนอราคา",
    },
    amountBaht: 0,
    interval: "one_time",
    quoteOnly: true,
  },
];

export function findCheckoutSku(id: string): CheckoutSku | undefined {
  return CHECKOUT_SKUS.find((sku) => sku.id === id);
}

export function skusForProduct(productId: string): CheckoutSku[] {
  return CHECKOUT_SKUS.filter((sku) => sku.productId === productId);
}

export function skusForProductModel(
  productId: string,
  model: ProductModel,
): CheckoutSku[] {
  return CHECKOUT_SKUS.filter(
    (sku) => sku.productId === productId && sku.model === model,
  );
}

export function modelsForProduct(productId: string): ProductModel[] {
  const seen = new Set<ProductModel>();
  for (const sku of skusForProduct(productId)) seen.add(sku.model);
  return (["saas", "license", "white-label"] as ProductModel[]).filter((model) =>
    seen.has(model),
  );
}

export function payableCheckoutProducts(): { id: ProductId; name: string }[] {
  const seen = new Map<ProductId, string>();
  for (const sku of CHECKOUT_SKUS) {
    if (sku.quoteOnly) continue;
    if (!seen.has(sku.productId)) seen.set(sku.productId, sku.productName);
  }
  return [...seen.entries()].map(([id, name]) => ({ id, name }));
}

export function payableModelsForProduct(productId: string): ProductModel[] {
  return modelsForProduct(productId).filter((model) =>
    skusForProductModel(productId, model).some((sku) => !sku.quoteOnly),
  );
}

export function payableSkusForProductModel(
  productId: string,
  model: ProductModel,
): CheckoutSku[] {
  return skusForProductModel(productId, model).filter((sku) => !sku.quoteOnly);
}

export function catalogNameToProductId(name: string): ProductId | null {
  const key = name.trim().toLowerCase();
  if (key === "synthcomm") return "synthcomm";
  if (key === "qa lab" || key === "qa-lab") return "universal-simulator";
  if (key === "music demo" || key === "music-demo") return "music-demo";
  if (key === "content creator" || key === "content-creator") return "content-creator";
  if (key === "netr" || key === "เนตร") return "netr";
  if (key === "prism") return "prism";
  return null;
}

export function skuLabel(sku: CheckoutSku, lang: AuthLang): string {
  return pickLang(sku.label, lang);
}

export function skuDetail(sku: CheckoutSku, lang: AuthLang): string {
  return pickLang(sku.detail, lang);
}

export function formatBaht(value: number, lang: AuthLang): string {
  const formatted = new Intl.NumberFormat(lang === "th" ? "th-TH" : "en-US", {
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(value);
  return `฿${formatted}`;
}

export function belowOmiseMinimum(amountBaht: number): boolean {
  return withVat(amountBaht).total < OMISE_MIN_BAHT;
}

export function abovePromptPayMax(amountBaht: number): boolean {
  return withVat(amountBaht).total > OMISE_PROMPTPAY_MAX_BAHT;
}
