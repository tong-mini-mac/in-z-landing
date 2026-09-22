import type { ProductModel } from "@/lib/product-models";
import type { AuthLang } from "@/lib/auth-i18n";

export type LocalizedText = Record<AuthLang, string>;

export type PricingTier = {
  name: LocalizedText | string;
  price: LocalizedText | string;
  detail: LocalizedText | string;
  highlight?: boolean;
};

export type ResolvedPricingTier = {
  name: string;
  price: string;
  detail: string;
  highlight?: boolean;
};

export function pickLang(
  value: LocalizedText | string | undefined,
  lang: AuthLang,
  fallback = "",
): string {
  if (!value) return fallback;
  if (typeof value === "string") return value;
  return value[lang] || value.en || value.th || fallback;
}

export type ScopeItem = {
  area: string;
  detail: string;
};

export type ScopeOfWork = {
  summary: string;
  inScope: ScopeItem[];
  outOfScope: ScopeItem[];
  bands?: ScopeItem[];
};

export type LocalizedScopeOfWork = Record<AuthLang, ScopeOfWork>;

export type UsageStep = {
  title: string;
  detail: string;
};

export type UsageGuide = {
  title: string;
  intro: string;
  steps: UsageStep[];
  tips?: string[];
};

export type LocalizedUsageGuide = Record<AuthLang, UsageGuide>;

export type CatalogStoryItem = {
  title: string;
  detail: string;
};

export type CatalogFaqItem = {
  question: string;
  answer: string;
};

/** Extra catalog copy under the product detail “Catalog” heading (wording only). */
export type CatalogStory = {
  lead: string;
  painHeading?: string;
  pain?: string[];
  howHeading?: string;
  howSteps?: CatalogStoryItem[];
  sportsHeading?: string;
  sports?: string[];
  featuresHeading?: string;
  features?: CatalogStoryItem[];
  faqHeading?: string;
  faq?: CatalogFaqItem[];
  closing?: string;
};

export type LocalizedCatalogStory = Record<AuthLang, CatalogStory>;

export type CatalogProduct = {
  name: string;
  title: LocalizedText;
  description: LocalizedText;
  earlyBirdPrice: LocalizedText | string;
  regularPrice: LocalizedText | string;
  models: ProductModel[];
  /** Optional Scope of Work shown via product card button (TH/EN). */
  scopeOfWork?: LocalizedScopeOfWork;
  /** Customer-facing how-to-use (app workflow only — not full engineering manual). */
  usageGuide?: LocalizedUsageGuide;
  /** Optional narrative blocks inside the Catalog section. */
  catalogStory?: LocalizedCatalogStory;
  /** Per-model pricing; falls back to earlyBird/regular when absent. */
  pricingByModel?: Partial<
    Record<
      ProductModel,
      {
        ctaLabel?: LocalizedText | string;
        ctaHref?: string;
        note?: LocalizedText | string;
        tiers: PricingTier[];
      }
    >
  >;
};

const SYNTHCOMM_DESCRIPTION: LocalizedText = {
  en: "Industrial multi-agent factory for high-fidelity synthetic CS data (Thai · English · Indonesian · Vietnamese) — web-grounded SOP production, locale-locked geo/banks/tracking, multi-dimensional QC, and a B2B web portal. Customer channel is the web portal only (no Telegram or LINE bot). Start free with 100 conversations per month, then Starter, Growth, Business, or Enterprise.",
  th: "โรงงาน multi-agent สำหรับข้อมูลบทสนทนาสังเคราะห์คุณภาพสูง (ไทย · อังกฤษ · อินโดนีเซีย · เวียดนาม) — ผลิต SOP จากเว็บ ล็อก locale (เมือง/ธนาคาร/แทร็กกิง) QC หลายมิติ และพอร์ทัลลูกค้า B2B ช่องทางลูกค้าคือ Web Portal เท่านั้น ไม่มีบอท Telegram หรือ LINE เริ่มฟรี 100 บทสนทนาต่อเดือน แล้วขยายเป็น Starter, Growth, Business หรือ Enterprise",
};

const UNIVERSAL_SIMULATOR_DESCRIPTION: LocalizedText = {
  en: "IN Z QA LAB — simulation and verification for web, API, and mobile. Persona → Simulate → ML/AI → Portal. QA simulation & verification lab · Web · API · Mobile · Bring Your Own API Key. Early Bird 2026: SaaS ฿490–5,990/month · License ฿120K–300K/year · White Label ฿3M+. Free readiness check on a live system URL — no signup.",
  th: "IN Z QA LAB — จำลอง + ตรวจสอบเว็บ/API/มือถือ · Persona → Simulate → ML/AI → Portal ห้องแล็บจำลองและตรวจสอบสำหรับทีม QA · Web · API · Mobile · นำคีย์ API มาเอง Early Bird 2026: SaaS ฿490–5,990/เดือน · License ฿120K–300K/ปี · White Label ฿3M+ ตรวจความพร้อมฟรีจาก URL ระบบที่รันอยู่ — ไม่ต้องสมัคร",
};

const UNIVERSAL_SIMULATOR_SCOPE_EN: ScopeOfWork = {
  summary:
    "User-behavior simulation and web/API testing for deployed systems with a public URL. Includes mobile app backends/APIs and Appium native E2E (License/local or BrowserStack BYOK). Not AI-only. Not a Git-repo tester.",
  inScope: [
    {
      area: "Test targets",
      detail:
        "Web apps, APIs/backends, SaaS, portals, and ERP systems that are already deployed and reachable over public HTTP(S).",
    },
    {
      area: "Mobile — API / backend",
      detail:
        "Scan APIs used by iOS/Android apps via the mobile_api readiness profile (version/config, auth, deep-link well-known, latency) plus API/load tests.",
    },
    {
      area: "Mobile — WebView / PWA / responsive web",
      detail:
        "Public web or hybrid surfaces that open in a browser or WebView.",
    },
    {
      area: "Mobile — native E2E (Appium)",
      detail:
        "Tap native iOS/Android UI through Appium step scripts — License/local Appium or Cloud + BrowserStack BYOK.",
    },
    {
      area: "Deployed Git projects",
      detail:
        "Yes — point at the running system URL (Railway / Vercel / VPS). Not the Git repository link itself.",
    },
    {
      area: "Readiness scan",
      detail: "Live URL checks: health, docs, OpenAPI, auth, latency, 5xx.",
    },
    {
      area: "Web simulation & load",
      detail:
        "Persona journeys, click-path simulation, and auto-scaled load tests (including mobile API traffic).",
    },
    {
      area: "ML / AI analysis (optional)",
      detail:
        "Anomaly, clustering, and Markov on simulation results. Free Readiness does not use LLM.",
    },
    {
      area: "SaaS Portal",
      detail:
        "Sign-up/login, quotas, Web full-test flow, Mobile readiness + Appium E2E, dashboard, PDPA tools.",
    },
  ],
  outOfScope: [
    {
      area: "Cloud SaaS device farm",
      detail:
        "No hosted emulators/physical devices on Cloud — use License/local Appium or BrowserStack BYOK.",
    },
    {
      area: "Git-only (not deployed)",
      detail:
        "Does not clone/build/run from GitHub or GitLab — a running system URL is required first.",
    },
    {
      area: "LAN / NAS-only from Cloud",
      detail:
        "Private IPs are blocked (SSRF). Expose a public URL, or run License/White Label inside the customer LAN.",
    },
    {
      area: "Desktop / non-HTTP automation",
      detail:
        "Focused on web + API (+ Appium for mobile) — not general desktop automation.",
    },
    {
      area: "LLM / model evaluation",
      detail: "Not an LLM eval or model benchmark product.",
    },
    {
      area: "Customer VPN from Cloud",
      detail:
        "Cannot traverse customer VPN/Zero Trust from Cloud — use public URL or on-prem License.",
    },
  ],
  bands: [
    {
      area: "Free Readiness",
      detail: "Public URL scan (web / mobile_api) — no Appium, up to 5 findings.",
    },
    {
      area: "SaaS Cloud",
      detail:
        "Public web/API + monthly quotas · Appium only via BrowserStack BYOK · Starter 50 / Pro 300 / Business 500 sims per month.",
    },
    {
      area: "License / White Label",
      detail: "Internal systems / NAS / Appium in LAN / compliance (BYOK).",
    },
  ],
};

const UNIVERSAL_SIMULATOR_SCOPE_TH: ScopeOfWork = {
  summary:
    "จำลองพฤติกรรมผู้ใช้และทดสอบเว็บ/API ของระบบที่ deploy แล้วมี URL สาธารณะ รวม API/backend ของแอปมือถือ และ E2E native ผ่าน Appium (License/local หรือ BrowserStack BYOK) — ไม่จำกัดแค่ระบบแนว AI และไม่ใช่การทดสอบ repo บน Git",
  inScope: [
    {
      area: "เป้าทดสอบ",
      detail:
        "เว็บแอป, API/Backend, SaaS, พอร์ทัล, ERP ที่ deploy แล้วเข้าถึงด้วย HTTP(S) สาธารณะ",
    },
    {
      area: "แอปมือถือ — ชั้น API / Backend",
      detail:
        "ทดสอบ API ที่แอป iOS/Android เรียกผ่านโปรไฟล์ readiness mobile_api (version/config, auth, deep-link well-known, latency) รวม API test / load",
    },
    {
      area: "แอปมือถือ — WebView / PWA / responsive web",
      detail: "หน้าเว็บหรือ hybrid ที่เปิดในเบราว์เซอร์/WebView ได้ผ่าน URL สาธารณะ",
    },
    {
      area: "แอปมือถือ — E2E native (Appium)",
      detail:
        "แตะ UI บน iOS/Android ผ่าน Appium step script — License/local หรือ Cloud + BrowserStack BYOK",
    },
    {
      area: "โปรเจกต์บน Git ที่ deploy แล้ว",
      detail:
        "ได้ — ชี้ URL ของระบบที่รันอยู่ (เช่น Railway / Vercel / VPS) ไม่ใช่ลิงก์ repo",
    },
    {
      area: "Readiness scan",
      detail: "สแกน URL จริง — health, docs, OpenAPI, auth, latency, 5xx",
    },
    {
      area: "Web simulation & load",
      detail:
        "จำลอง user journey / พฤติกรรมคลิกบนเว็บ และ auto-scaled load test (รวมยิง API ของแอปมือถือ)",
    },
    {
      area: "ML / AI วิเคราะห์ผล (ทางเลือก)",
      detail:
        "Anomaly, clustering, Markov จากข้อมูล simulation — Free Readiness ไม่ใช้ LLM",
    },
    {
      area: "SaaS Portal",
      detail:
        "สมัคร/login, โควต้า, แท็บเว็บ (full-test), แท็บมือถือ (readiness + Appium E2E), แดชบอร์ด, PDPA",
    },
  ],
  outOfScope: [
    {
      area: "Device farm ในตัวบน SaaS Cloud",
      detail:
        "ไม่โฮสต์ emulator/เครื่องจริงบน Cloud — ใช้ License/local Appium หรือ BrowserStack BYOK",
    },
    {
      area: "มีแค่โค้ดบน Git ยังไม่ deploy",
      detail:
        "ไม่ clone / build / รันจาก GitHub·GitLab — ต้องมี URL ระบบที่รันอยู่ก่อน",
    },
    {
      area: "ระบบใน LAN/NAS อย่างเดียว จาก Cloud",
      detail:
        "บล็อก private IP (SSRF) — ต้องมี public URL หรือ License ใน LAN",
    },
    {
      area: "Desktop / non-HTTP",
      detail:
        "เน้นเว็บ + API (+ Appium สำหรับมือถือ) — ไม่ใช่ desktop automation ทั่วไป",
    },
    {
      area: "ทดสอบคุณภาพโมเดล AI เอง",
      detail: "ไม่ใช่ LLM eval / model benchmark",
    },
    {
      area: "เจาะ VPN ของลูกค้าจาก Cloud",
      detail:
        "ต้อง public URL หรือ deploy Simulator ในเครือข่ายลูกค้า",
    },
  ],
  bands: [
    {
      area: "Free Readiness",
      detail: "สแกน URL สาธารณะ (web / mobile_api) — ไม่มี Appium · สูงสุด 5 ข้อ",
    },
    {
      area: "SaaS Cloud",
      detail:
        "เว็บ/API บน internet + โควต้า · Appium เฉพาะ BrowserStack BYOK · Starter 50 / Pro 300 / Business 500 sims ต่อเดือน",
    },
    {
      area: "License / White Label",
      detail: "ระบบภายใน / NAS / Appium ใน LAN / compliance (BYOK)",
    },
  ],
};

const UNIVERSAL_SIMULATOR_SCOPE: LocalizedScopeOfWork = {
  en: UNIVERSAL_SIMULATOR_SCOPE_EN,
  th: UNIVERSAL_SIMULATOR_SCOPE_TH,
};

export const SCOPE_OF_WORK_COPY: Record<
  AuthLang,
  {
    button: string;
    title: string;
    inScope: string;
    outOfScope: string;
    bands: string;
  }
> = {
  en: {
    button: "Scope of Work",
    title: "Scope of Work",
    inScope: "In scope",
    outOfScope: "Out of scope",
    bands: "Deployment bands",
  },
  th: {
    button: "ขอบเขตงาน",
    title: "ขอบเขตงาน",
    inScope: "อยู่ในขอบเขต",
    outOfScope: "นอกขอบเขต",
    bands: "โหมดการติดตั้ง",
  },
};

const MUSIC_DEMO_DESCRIPTION: LocalizedText = {
  en: "Music Demo is a DEMO / blueprint tool — we do not create the finished work; you do. Tagline: we help you complete. Core package is Artist Blueprint (lyrics · chords · MIDI/MusicXML) for playing on real instruments. AI vocal preview is a separate add-on from ฿49, not for commercial release. Credits pay-as-you-go (฿30 = 100 credits): create 50 · regenerate 25 · re-edit 50. Signup bonus 100 credits (300 for the first 30 users). For Gen Z, students, buskers, and small studios — not a commercial-ready song.",
  th: "Music Demo เป็นเครื่องมือสร้าง DEMO / blueprint — เราไม่ได้สร้างสิ่งที่สมบูรณ์ คุณคือคนสร้างสิ่งที่สมบูรณ์ แพ็กหลักคือ Artist Blueprint (คำร้อง · คอร์ด · โน้ต/MIDI/MusicXML) สำหรับเล่นบนเครื่องจริง เสียงร้อง AI เป็นแอดออนแยก เริ่ม ฿49 ไม่ใช่ไฟล์ปล่อยขาย เครดิตจ่ายตามใช้ (฿30 = 100 เครดิต): สร้างเพลง 50 · เจนใหม่ 25 · Re-edit 50 โบนัสสมัคร 100 เครดิต (300 สำหรับ 30 คนแรก) สำหรับ Gen Z นักเรียน Busker และสตูดิโอเล็ก — ไม่ใช่ผลงานสำเร็จรูปพร้อมวางขาย",
};

const CONTENT_CREATOR_DESCRIPTION: LocalizedText = {
  en: "Content Creator is a SaaS for making and managing content in Thai dialects (Northern · Isan · Southern) and SEA (Vietnamese · Indonesian · Central Thai · English). Pipeline: podcast upload → STT → show notes → clips → RSS, plus AI Video (idea chat → script → media match → TTS → render MP4 → multi-platform publish). 14-day free trial, then Starter ฿599 · Creator ฿1,499 · Pro ฿2,999 per month.",
  th: "Content Creator เป็น SaaS สำหรับสร้างและจัดการคอนเทนต์ภาษาถิ่นไทย (เหนือ · อีสาน · ใต้) และ SEA (เวียดนาม · อินโดนีเซีย · ไทยกลาง · อังกฤษ) ไปป์ไลน์พอดแคสต์: อัปโหลด → ถอดเสียง → show notes → clips → RSS และ AI Video: chat แต่งเรื่อง/สคริปต์ → อัปโหลดสื่อ → จับคู่ฉาก → TTS → เรนเดอร์ MP4 → คิว publish ทดลองฟรี 14 วัน แล้วเป็น Starter ฿599 · Creator ฿1,499 · Pro ฿2,999 ต่อเดือน",
};

const NETR_DESCRIPTION: LocalizedText = {
  en: "netr (เนตร) is IN Z’s Thai karmic-astrology oracle: ancient Thai texts plus AI that remembers you. Sign up on inz.lol, open NetR from your account (SSO), then record your birth chart once — no duplicate phone OTP on NetR. Chart view is owner-only. Chat on the web — 5 free minutes/day, then Prepaid or Plus. Not medical or psychiatric advice.",
  th: "เนตร (netr) คือ Oracle โหราศาสตร์ปฏิวัติกรรมจากตำราไทยโบราณ ผสาน AI ที่จำคุณได้ สมัครที่ inz.lol เปิด NetR จากบัญชี (SSO) แล้วจารึกดวงเกิดครั้งเดียว — ไม่ยืนยันเบอร์ซ้ำที่ NetR ดูดวงได้เจ้าของบัญชีเท่านั้น คุยบนเว็บ ฟรี 5 นาที/วัน แล้ว Prepaid หรือ Plus ไม่ใช่คำปรึกษาทางการแพทย์หรือจิตเวช",
};

const SCORE_BOARD_DESCRIPTION: LocalizedText = {
  en: "Club sports live with a pro scoreboard in five minutes. No extra hardware, no technician hire — copy the Overlay URL into OBS and the score shows on Facebook or YouTube. Five-day full-feature trial via your IN Z account, then Monthly or Yearly on shared checkout. Video stays on your encoder — not our servers.",
  th: "ไลฟ์กีฬาสโมสร มีสกอร์บอร์ดระดับมืออาชีพ ใน 5 นาที ไม่ต้องซื้ออุปกรณ์ ไม่ต้องจ้างช่างเทคนิค แค่คัดลอก Overlay URL แล้ววางใน OBS — สกอร์ขึ้นบน Facebook / YouTube ได้เลย ทดลองฟรี 5 วันผ่านบัญชี IN Z จากนั้นเลือกรายเดือนหรือรายปีที่หน้าชำระเงินรวม วิดีโออยู่ที่ encoder ของคุณ ไม่ผ่านเซิร์ฟเวอร์เรา",
};

const SCORE_BOARD_STORY: LocalizedCatalogStory = {
  th: {
    lead: "ไลฟ์กีฬาสโมสร มีสกอร์บอร์ดระดับมืออาชีพ ใน 5 นาที — ไม่ต้องซื้ออุปกรณ์ ไม่ต้องจ้างช่างเทคนิค แค่คัดลอก Overlay URL แล้ววางใน OBS",
    painHeading: "เคยเจอแบบนี้ไหม?",
    pain: [
      "ไลฟ์สนุกเกอร์ แต่ผู้ชมไม่รู้ว่าใครนำอยู่",
      "จ้างช่างทำสกอร์บอร์ดแพงมาก ใช้ครั้งเดียวทิ้ง",
      "ลองทำเองใน OBS แต่ซับซ้อน ไม่รู้จะเริ่มยังไง",
      "ไลฟ์จากมือถือ ใส่สกอร์ไม่ได้เลย",
    ],
    howHeading: "4 ขั้นตอน เริ่มไลฟ์พร้อมสกอร์",
    howSteps: [
      {
        title: "สมัครและตั้งแมตช์",
        detail: "เปิดจากบัญชี IN Z เลือกกีฬา ใส่ชื่อผู้เล่น เลือก Day/Night mode",
      },
      {
        title: "คัดลอก Overlay URL",
        detail: "ได้ URL พิเศษ 1 ลิงก์สำหรับแมตช์นี้ — ใส่เฉพาะในโปรแกรมไลฟ์",
      },
      {
        title: "วางใน OBS",
        detail: "เพิ่ม Browser Source วาง URL — สกอร์โผล่ทับกล้องทันที",
      },
      {
        title: "กดสกอร์จากมือถือ",
        detail: "อีกเครื่องกดคะแนน อัปเดตทันทีบน Facebook / YouTube",
      },
    ],
    sportsHeading: "รองรับ 10 ชนิดกีฬา",
    sports: [
      "สนุกเกอร์",
      "ฟุตบอล",
      "วอลเลย์บอล",
      "แบดมินตัน",
      "เทนนิส",
      "หมากรุก",
      "TCG / การ์ดเกม",
      "ไพ่",
      "ทีม vs ทีม",
      "กีฬาทั่วไป",
    ],
    featuresHeading: "ฟีเจอร์ที่ทำให้ต่างจากทำเอง",
    features: [
      {
        title: "อัปเดตทันที",
        detail: "กดคะแนนบนมือถือ — สกอร์อัปเดตบน OBS ทันที",
      },
      {
        title: "Day / Night Mode",
        detail: "ห้องสว่างใช้ Day ห้องมืดใช้ Night สกอร์บาร์ไม่กลืนกับฉาก",
      },
      {
        title: "ช่องสปอนเซอร์ 6 จุด",
        detail: "ซ้าย 3 ขวา 3 อัปโหลดโลโก้ได้ ช่องว่างโปร่งใสอัตโนมัติ",
      },
      {
        title: "แต้มต่อ (Handicap)",
        detail: "รองรับแมตช์ที่มีแต้มต่อ แสดงบนสกอร์บอร์ดได้เลย",
      },
      {
        title: "วิดีโอไม่ผ่านเซิร์ฟเวอร์เรา",
        detail: "ค่าเน็ตเป็นของลูกค้า ไม่มีค่า bandwidth ซ่อน",
      },
      {
        title: "รองรับมือถือ",
        detail: "Larix / PRISM / Streamlabs Mobile ใส่ Overlay URL ได้",
      },
    ],
    faqHeading: "คำถามที่พบบ่อย",
    faq: [
      {
        question: "ต้องมีคอมไหม?",
        answer:
          "ถ้าจะไลฟ์แบบมีสกอร์ ต้องใช้โปรแกรม encoder เช่น OBS (คอม) หรือ Larix / PRISM (มือถือ) ไลฟ์จากกล้องในแอป Facebook/YouTube โดยตรงใส่สกอร์ไม่ได้",
      },
      {
        question: "วิดีโอผ่านเซิร์ฟเวอร์ IN Z ไหม?",
        answer:
          "ไม่ — วิดีโอส่งตรงจากเครื่องของลูกค้าไป Facebook/YouTube เราแค่ส่งข้อมูลสกอร์ ค่าเน็ตและ bandwidth เป็นของลูกค้าทั้งหมด",
      },
      {
        question: "เพจ Facebook ต้องมีเงื่อนไขอะไรบ้าง?",
        answer:
          "บัญชีอายุ 60 วันขึ้นไป และเพจมีผู้ติดตามอย่างน้อย 100 คน เป็นเงื่อนไขของ Meta ไม่ใช่ของเรา ตรวจสอบที่ Facebook Help ได้",
      },
      {
        question: "ถ้าหมดอายุแล้วไลฟ์อยู่ จะเกิดอะไรขึ้น?",
        answer:
          "Overlay จะโปร่งใส ไม่มีข้อความ ไลฟ์ยังดำเนินต่อได้แต่ไม่มีสกอร์ ต่ออายุที่หน้าชำระเงินของ IN Z ได้",
      },
      {
        question: "ใช้กับ YouTube ได้ไหม?",
        answer:
          "ได้ — ใช้โหมด Streaming Software ใน YouTube Studio คัดลอก Stream Key ไปใส่ใน OBS แล้วเพิ่ม Overlay URL เป็น Browser Source",
      },
    ],
    closing:
      "พร้อมไลฟ์กีฬาแบบมืออาชีพ — ทดลองฟรี 5 วัน ฟีเจอร์ครบ ไม่ต้องใส่บัตรเครดิต เปิดจากบัญชี IN Z ได้เลย",
  },
  en: {
    lead: "Club sports live with a pro scoreboard in five minutes — no extra gear, no technician. Copy the Overlay URL into OBS and the score appears on Facebook or YouTube.",
    painHeading: "Sound familiar?",
    pain: [
      "Live snooker, but viewers can’t tell who’s ahead",
      "Hiring someone for a one-off scoreboard costs too much",
      "Tried DIY in OBS — too complex to start",
      "Phone live — no way to put a score on screen",
    ],
    howHeading: "Four steps to go live with a score",
    howSteps: [
      {
        title: "Sign in and set the match",
        detail: "Open from your IN Z account, pick the sport, names, and Day/Night mode",
      },
      {
        title: "Copy the Overlay URL",
        detail: "One private URL for this match — paste it only into your encoder",
      },
      {
        title: "Drop it into OBS",
        detail: "Add a Browser Source, paste the URL — the score sits on top of the camera",
      },
      {
        title: "Tap scores on a phone",
        detail: "A second device updates the score live on Facebook / YouTube",
      },
    ],
    sportsHeading: "Ten sports supported",
    sports: [
      "Snooker",
      "Football",
      "Volleyball",
      "Badminton",
      "Tennis",
      "Chess",
      "TCG / card games",
      "Cards",
      "Team vs team",
      "Generic sports",
    ],
    featuresHeading: "What you don’t get from DIY",
    features: [
      {
        title: "Instant updates",
        detail: "Tap scores on a phone — OBS updates immediately",
      },
      {
        title: "Day / Night mode",
        detail: "Bright rooms use Day, dark halls use Night so the bar doesn’t vanish",
      },
      {
        title: "Six sponsor slots",
        detail: "Three left, three right — upload logos; empty slots stay transparent",
      },
      {
        title: "Handicap",
        detail: "House handicap shows on the board when you enable it",
      },
      {
        title: "Video stays on your gear",
        detail: "You pay your own bandwidth — no hidden transit through our servers",
      },
      {
        title: "Mobile-ready",
        detail: "Larix / PRISM / Streamlabs Mobile can load the Overlay URL",
      },
    ],
    faqHeading: "FAQ",
    faq: [
      {
        question: "Do I need a computer?",
        answer:
          "For a scored live you need an encoder — OBS on desktop, or Larix / PRISM on mobile. The in-app Facebook/YouTube camera cannot load this overlay.",
      },
      {
        question: "Does video go through IN Z?",
        answer:
          "No — video goes from your machine to Facebook/YouTube. We only send score data. Bandwidth is yours.",
      },
      {
        question: "What about Facebook Page rules?",
        answer:
          "Typically a 60-day-old account and ~100 Page followers — Meta rules, not ours. Check Facebook Help for current requirements.",
      },
      {
        question: "What if the plan expires mid-live?",
        answer:
          "The overlay goes blank (transparent). The live can continue without a score. Renew on the IN Z pay page.",
      },
      {
        question: "Does YouTube work?",
        answer:
          "Yes — YouTube Studio Streaming software mode, paste the stream key into OBS, add the Overlay URL as a Browser Source.",
      },
    ],
    closing:
      "Ready for a pro club live — five free days, full features, no card required. Open from your IN Z account.",
  },
};

const SCORE_BOARD_USAGE: LocalizedUsageGuide = {
  th: {
    title: "วิธีใช้งานแอป",
    intro: "4 ขั้นตอน เริ่มไลฟ์พร้อมสกอร์ — วิดีโอไม่ผ่านเซิร์ฟเวอร์เรา",
    steps: [
      {
        title: "สมัครและตั้งแมตช์",
        detail: "เปิดจากบัญชี IN Z เลือกกีฬา ใส่ชื่อผู้เล่น (2–4) เลือก Day/Night แล้วบันทึกแมตช์",
      },
      {
        title: "คัดลอก Overlay URL",
        detail: "ได้ URL พิเศษ 1 ลิงก์ — ใส่เฉพาะในโปรแกรมไลฟ์ อย่าโพสต์สาธารณะ",
      },
      {
        title: "วางใน OBS / encoder",
        detail:
          "คอม: OBS / Streamlabs / PRISM — Browser Source ขนาดเท่าฉาก พื้นโปร่งใส · มือถือ: Larix / PRISM / Streamlabs Mobile (ต้อง HTTPS)",
      },
      {
        title: "กดสกอร์จากมือถือ แล้วไลฟ์ด้วยสตรีมคีย์",
        detail:
          "อีกเครื่องกดคะแนน · ยิงไป Facebook Live Producer หรือ YouTube Studio — ห้ามไลฟ์จากกล้องในแอป Facebook/YouTube โดยตรง",
      },
    ],
    tips: [
      "Day = บาร์อ่อนตัวเข้ม · Night = บาร์เข้มตัวสว่าง",
      "ช่องสปอนเซอร์ว่างโปร่งใสบน Overlay",
    ],
  },
  en: {
    title: "How to use the app",
    intro: "Four steps to go live with a score — video never goes through our servers.",
    steps: [
      {
        title: "Sign in and set the match",
        detail: "Open from IN Z, pick sport, 2–4 names, Day/Night, then save.",
      },
      {
        title: "Copy the Overlay URL",
        detail: "One private URL — paste only into your encoder, never post it publicly.",
      },
      {
        title: "Add it in OBS / your encoder",
        detail:
          "Desktop: OBS / Streamlabs / PRISM — Browser Source, canvas size, transparent. Mobile: Larix / PRISM / Streamlabs Mobile (HTTPS).",
      },
      {
        title: "Score from a phone and go live with a stream key",
        detail:
          "Tap scores on a second device · stream via Facebook Live Producer or YouTube Studio — not the in-app camera.",
      },
    ],
    tips: [
      "Day = light bar / dark text · Night = dark bar / light text",
      "Empty sponsor slots stay transparent on the overlay",
    ],
  },
};

const SYNTHCOMM_USAGE: LocalizedUsageGuide = {
  th: {
    title: "วิธีใช้งานแอป",
    intro:
      "SynthComm ใช้ผ่าน Web Portal เท่านั้น — เปิดจากบัญชี IN Z แล้วสั่งงาน ดาวน์โหลดได้ทั้งข้อมูลและรายงานสรุปจ๊อบ",
    steps: [
      {
        title: "เปิดจากบัญชี IN Z",
        detail: "ล็อกอินที่ inz.lol แล้วเปิด SynthComm จากแพ็กเกจของคุณ (SSO) ดูโควต้าในแท็บแพ็กเกจ",
      },
      {
        title: "สร้างงาน",
        detail:
          "แท็บสร้างงาน: Topic · ภาษา Thai/English/Vietnamese/Indonesian · จำนวน · Bundle/JSON/CSV/PDF · (ถ้ามี) CSV แล้วกดส่งงาน",
      },
      {
        title: "ติดตามและดาวน์โหลด",
        detail:
          "แท็บสถานะงาน: Job ID → เช็คสถานะจน completed → Download — Bundle รวมรายงาน HTML/PDF รายละเอียดจ๊อบ",
      },
      {
        title: "License — คีย์ LLM และโดเมน",
        detail:
          "ถ้าใช้ License: วางคีย์ BYOK (Research / Writer / QC) และตั้ง CNAME ในแท็บโดเมน",
      },
    ],
    tips: [
      "Thai ไม่ระบุภูมิภาค → ภาคกลาง · English ไม่ระบุประเทศ → สิงคโปร์",
      "รายงานสรุปจ๊อบแยกจากไฟล์ข้อมูลดิบ — โหลดได้เฉพาะผลจ๊อบ ไม่ใช่เอนจิน",
    ],
  },
  en: {
    title: "How to use the app",
    intro:
      "SynthComm is web-portal only — open from your IN Z account, run jobs, and download both data and a job summary report.",
    steps: [
      {
        title: "Open from your IN Z account",
        detail: "Sign in on inz.lol, open SynthComm from Your package (SSO), and check quota on Package.",
      },
      {
        title: "Create a job",
        detail:
          "New job: Topic · Thai/English/Vietnamese/Indonesian · count · Bundle/JSON/CSV/PDF · optional CSV → Submit.",
      },
      {
        title: "Track and download",
        detail:
          "Job status: Job ID → poll until completed → Download. Bundle includes the HTML/PDF job summary report.",
      },
      {
        title: "License — LLM keys and domain",
        detail: "On License: paste BYOK keys (Research / Writer / QC) and set CNAME under Domains.",
      },
    ],
    tips: [
      "Thai with no region defaults to Central · English with no country defaults to Singapore.",
      "The job summary report is separate from raw data — outputs only, not the engine.",
    ],
  },
};

const QA_LAB_USAGE: LocalizedUsageGuide = {
  th: {
    title: "วิธีใช้งานแอป",
    intro: "จำลองและตรวจสอบเว็บ/API/มือถือที่ deploy แล้วมี URL สาธารณะ",
    steps: [
      {
        title: "ตรวจความพร้อมฟรี (ไม่ต้องสมัคร)",
        detail: "เปิด QA LAB Portal ใส่ URL ระบบจริง ได้คะแนน 0–100 และข้อค้นพบสูงสุด 5 ข้อ โดยไม่ใช้ LLM",
      },
      {
        title: "เข้าสู่ระบบจากบัญชี IN Z",
        detail: "ล็อกอินที่ inz.lol แล้วเปิด QA LAB จากแพ็กเกจของคุณ",
      },
      {
        title: "รัน Persona → Simulate",
        detail: "ตั้งเป้าเว็บ/API (และมือถือผ่าน Appium ถ้ามี) แล้วรันซิมในพอร์ทัล",
      },
      {
        title: "ดูผลในแดชบอร์ด",
        detail: "อ่านรายงาน เลือกแพ็ก Starter / Pro / Business หรือ License ตามโควตา",
      },
    ],
    tips: [
      "นำคีย์ API มาเอง (BYOK) ตามแพ็กเกจ",
      "ไม่ใช่การทดสอบ repo บน Git โดยตรง — ต้องมีระบบที่รันอยู่",
    ],
  },
  en: {
    title: "How to use the app",
    intro: "Simulate and verify web / API / mobile systems that already have a public URL.",
    steps: [
      {
        title: "Run a free readiness check (no signup)",
        detail: "Open the QA LAB Portal, paste a live system URL, and get a 0–100 score plus up to 5 findings — no LLM.",
      },
      {
        title: "Sign in from your IN Z account",
        detail: "Sign in on inz.lol, then open QA LAB from Your package.",
      },
      {
        title: "Run Persona → Simulate",
        detail: "Point at web/API targets (and mobile via Appium when available), then run sims in the portal.",
      },
      {
        title: "Review results and pick a plan",
        detail: "Read the dashboard report, then choose Starter / Pro / Business or License by quota.",
      },
    ],
    tips: [
      "Bring your own API keys (BYOK) per plan.",
      "Not a Git-repo tester — the system under test must already be running.",
    ],
  },
};

const MUSIC_DEMO_USAGE: LocalizedUsageGuide = {
  th: {
    title: "วิธีใช้งานแอป",
    intro: "Music Demo สร้าง DEMO / blueprint — คุณคือคนทำให้ผลงานสมบูรณ์",
    steps: [
      {
        title: "เปิดจากบัญชี IN Z",
        detail: "ล็อกอินที่ inz.lol แล้วเปิด Music Demo จากแพ็กเกจของคุณ ได้เครดิตสมัครฟรี",
      },
      {
        title: "สร้าง DEMO พรีวิว",
        detail: "สร้าง Artist Blueprint (คำร้อง · คอร์ด · MIDI/MusicXML) ใช้เครดิตตามเรทที่กำหนด",
      },
      {
        title: "Confirm & Lock",
        detail: "ยืนยันผลแล้วล็อก — แชร์แบบอ่านอย่างเดียวได้ แนะนำ Export ไป DAW / สตูดิโอ",
      },
      {
        title: "เติมเครดิตเมื่อต้องการ",
        detail: "เติมที่ inz.lol/pay หรือในแอป — เสียงร้อง AI เป็นแอดออนแยก เริ่ม ฿49",
      },
    ],
    tips: [
      "Solo Mode: 1 เพลง = 1 เจ้าของ",
      "ไม่ใช่ไฟล์เพลงสำเร็จรูปพร้อมวางขาย",
    ],
  },
  en: {
    title: "How to use the app",
    intro: "Music Demo builds a DEMO / blueprint — you complete the finished work.",
    steps: [
      {
        title: "Open from your IN Z account",
        detail: "Sign in on inz.lol, open Music Demo from Your package, and receive signup credits.",
      },
      {
        title: "Create a DEMO preview",
        detail: "Build an Artist Blueprint (lyrics · chords · MIDI/MusicXML) using the credit rates shown in-app.",
      },
      {
        title: "Confirm & Lock",
        detail: "Confirm to lock the piece — share read-only, then export to a DAW / studio.",
      },
      {
        title: "Top up credits when needed",
        detail: "Pay on inz.lol/pay or in-app. AI vocal preview is a separate add-on from ฿49.",
      },
    ],
    tips: [
      "Solo Mode: one song = one owner.",
      "Not a commercial-ready release file.",
    ],
  },
};

const CONTENT_CREATOR_USAGE: LocalizedUsageGuide = {
  th: {
    title: "วิธีใช้งานแอป",
    intro: "สร้างพอดแคสต์และ AI Video สำหรับภาษาถิ่นไทยและ SEA",
    steps: [
      {
        title: "เปิดจากบัญชี IN Z",
        detail: "ล็อกอินที่ inz.lol แล้วเปิด Content Creator — ได้ทดลองฟรี 14 วัน",
      },
      {
        title: "ทำพอดแคสต์หรือ AI Video",
        detail: "พอดแคสต์: อัปโหลด → ถอดเสียง → show notes → clips → RSS · AI Video: chat สคริปต์ → สื่อ → TTS → เรนเดอร์ MP4",
      },
      {
        title: "ดูโควตาใน Dashboard",
        detail: "ตรวจ episodes / render / storage ที่เหลือ โควตารายเดือนรีเซ็ตวันที่ 1 (เวลาไทย)",
      },
      {
        title: "อัปเกรดแพ็กเกจ",
        detail: "ไป Billing หรือ inz.lol/pay เลือก Starter / Creator / Pro ตามโควตา",
      },
    ],
    tips: [
      "วิดีโอช่วงทดลองติดลายน้ำเสมอ",
      "AI clips / ตารางโพสต์ เริ่มที่ Creator · Sponsor CRM / API เริ่มที่ Pro",
    ],
  },
  en: {
    title: "How to use the app",
    intro: "Create podcasts and AI Video for Thai dialects and SEA languages.",
    steps: [
      {
        title: "Open from your IN Z account",
        detail: "Sign in on inz.lol, open Content Creator — 14-day free trial included.",
      },
      {
        title: "Run a podcast or AI Video job",
        detail: "Podcast: upload → STT → show notes → clips → RSS. AI Video: script chat → media → TTS → render MP4.",
      },
      {
        title: "Check quotas on the Dashboard",
        detail: "Track episodes / renders / storage. Monthly quotas reset on the 1st (Thailand time).",
      },
      {
        title: "Upgrade your plan",
        detail: "Use Billing or inz.lol/pay for Starter / Creator / Pro.",
      },
    ],
    tips: [
      "Trial videos always include a watermark.",
      "AI clips / scheduling start at Creator; Sponsor CRM / API start at Pro.",
    ],
  },
};

const NETR_USAGE: LocalizedUsageGuide = {
  th: {
    title: "วิธีใช้งานแอป",
    intro: "คุยกับเนตรได้บนหน้าเว็บเท่านั้น — ไม่ใช่คำปรึกษาทางการแพทย์หรือจิตเวช",
    steps: [
      {
        title: "ยืนยันตัวตนที่ inz.lol",
        detail: "สมัครและยืนยันเบอร์/อีเมลที่ IN Z ครั้งเดียว",
      },
      {
        title: "เปิด NetR จากบัญชี IN Z",
        detail: "กดเปิดจากแพ็กเกจของคุณ — ระบบ Sign in อัตโนมัติ (SSO) ไม่ต้อง OTP ซ้ำที่ NetR",
      },
      {
        title: "จารึกชะตาครั้งเดียว",
        detail: "ไป /register กรอกวันเวลาและสถานที่เกิด แล้วยืนยัน — ข้อมูลล็อกหลังยืนยัน",
      },
      {
        title: "ดูดวงและคุย",
        detail: "ดูดวงที่ /chart (เจ้าของบัญชีเท่านั้น) แล้วคุยที่ /chat — ฟรี 5 นาที/วัน จากนั้น Prepaid หรือ Plus",
      },
    ],
    tips: [
      "เติมนาที / Plus ที่ inz.lol/pay หรือ /topup",
      "แก้ข้อมูลเกิดหลังล็อก ต้องผ่านทีมเนตร",
    ],
  },
  en: {
    title: "How to use the app",
    intro: "Chat with netr on the web only — not medical or psychiatric advice.",
    steps: [
      {
        title: "Verify on inz.lol",
        detail: "Sign up and verify phone/email once on IN Z.",
      },
      {
        title: "Open NetR from your IN Z account",
        detail: "Launch from Your package — SSO signs you in. No duplicate OTP on NetR.",
      },
      {
        title: "Record your birth chart once",
        detail: "Go to /register, enter birth date/time/place, and confirm — data locks after confirm.",
      },
      {
        title: "View chart and chat",
        detail: "Open /chart (owner only), then chat at /chat — 5 free minutes/day, then Prepaid or Plus.",
      },
    ],
    tips: [
      "Top up minutes / Plus on inz.lol/pay or /topup.",
      "Chart corrections after lock go through the netr team.",
    ],
  },
};

const PRISM_USAGE: LocalizedUsageGuide = {
  th: {
    title: "วิธีใช้งานแอป",
    intro: "แพลตฟอร์มดูแลลีดอสังหาด้วย SRAG — แอดมินเว็บที่เปิดได้คือ UI อ้างอิง",
    steps: [
      {
        title: "เปิดแอดมินเว็บอ้างอิง",
        detail: "เข้า PRISM จากบัญชี IN Z หรือลิงก์แอดมินที่ทีมให้ เพื่อดูลำดับงานจริง",
      },
      {
        title: "ลงทะเบียนและจำแนกเจตนา",
        detail: "รับลูกค้า → SRAG จำแนกเจตนา → แบ่ง High / Medium / Low",
      },
      {
        title: "จับคู่โครงการและนัดหมาย",
        detail: "High/Medium จับคู่โครงการ นัดชม และติดตาม · Low วิเคราะห์ช่องว่างตลาด",
      },
      {
        title: "ดูแลต่อเนื่อง",
        detail: "เช็กอินรายเดือนและใช้แท็กอ้างอิงบุคคลภายใต้ SubsetGuard",
      },
    ],
    tips: [
      "ผู้ใช้ค้นได้เฉพาะชุดข้อมูลที่ได้รับสิทธิ์ (SubsetGuard)",
      "License / White Label ติดต่อฝ่ายขายเรื่องเงื่อนไขและรีแบรนด์",
    ],
  },
  en: {
    title: "How to use the app",
    intro: "Real-estate lead care with SRAG — the live admin web is the reference UI.",
    steps: [
      {
        title: "Open the reference admin web",
        detail: "Launch PRISM from your IN Z account or the admin link your team provides.",
      },
      {
        title: "Register and classify intent",
        detail: "Capture the lead → SRAG intent matching → High / Medium / Low.",
      },
      {
        title: "Match projects and book viewings",
        detail: "High/Medium get project matches and follow-ups; Low feeds gap analysis.",
      },
      {
        title: "Nurture ongoing",
        detail: "Run monthly check-ins and person tags under SubsetGuard.",
      },
    ],
    tips: [
      "Users only search inside their assigned subset (SubsetGuard).",
      "License / White Label terms and rebrand: contact sales.",
    ],
  },
};

const PRISM_DESCRIPTION: LocalizedText = {
  en: "PRISM (Property Retrieval & Intent Subset Matching) is an AI customer-engagement platform for real estate marketing, powered by SRAG (Subset Retrieval Augmented Generation). It classifies intent, segments leads High / Medium / Low, matches projects, and nurtures from registration through closing — with SubsetGuard so each user only searches inside their assigned data subset.",
  th: "PRISM (Property Retrieval & Intent Subset Matching) เป็นแพลตฟอร์มดูแลลูกค้าด้วย AI สำหรับการตลาดอสังหาริมทรัพย์ ขับเคลื่อนด้วย SRAG (Subset Retrieval Augmented Generation) จำแนกเจตนา แบ่งลีด High / Medium / Low จับคู่โครงการ และดูแลตั้งแต่ลงทะเบียนถึงปิดการขาย พร้อม SubsetGuard ให้แต่ละผู้ใช้ค้นได้เฉพาะชุดข้อมูลที่ได้รับสิทธิ์",
};

const SYNTHCOMM_SAAS_TIERS: PricingTier[] = [
  {
    name: { en: "Free", th: "ฟรี" },
    price: "฿0",
    detail: {
      en: "100 conversations / month",
      th: "100 บทสนทนา / เดือน",
    },
    highlight: true,
  },
  {
    name: { en: "Starter", th: "Starter" },
    price: "฿2,900 / month",
    detail: {
      en: "1,000 conversations / month",
      th: "1,000 บทสนทนา / เดือน",
    },
  },
  {
    name: { en: "Growth", th: "Growth" },
    price: "฿12,900 / month",
    detail: {
      en: "5,000 conversations / month",
      th: "5,000 บทสนทนา / เดือน",
    },
  },
  {
    name: { en: "Business", th: "Business" },
    price: "฿39,000 / month",
    detail: {
      en: "20,000 conversations / month",
      th: "20,000 บทสนทนา / เดือน",
    },
  },
  {
    name: { en: "Enterprise", th: "Enterprise" },
    price: { en: "Custom", th: "ตามตกลง" },
    detail: {
      en: "Contact sales — typically License or White Label, not a public unlimited cloud SKU",
      th: "ติดต่อฝ่ายขาย — โดยทั่วไปเป็น License หรือ White Label ไม่ใช่แพ็กคลาวด์ไม่จำกัดบนหน้านี้",
    },
  },
];

const SYNTHCOMM_LICENSE_TIERS: PricingTier[] = [
  {
    name: { en: "Startup License", th: "Startup License" },
    price: "฿480,000 / year",
    detail: {
      en: "Dedicated instance · 1 CNAME · 50,000/mo · BYOK · badge required · 6 months support · engine not downloaded",
      th: "เครื่องแยกที่เราโฮสต์ · 1 โดเมน (CNAME) · 50,000/เดือน · นำคีย์มาเอง · มีป้าย · ซัพพอร์ต 6 เดือน · ไม่ส่งโรงงานให้โหลด",
    },
    highlight: true,
  },
  {
    name: { en: "Professional License", th: "Professional License" },
    price: "฿720,000 / year",
    detail: {
      en: "Dedicated instance · 3 CNAMEs · 150,000/mo · BYOK · badge required · 12 months support · engine not downloaded",
      th: "เครื่องแยกที่เราโฮสต์ · 3 โดเมน (CNAME) · 150,000/เดือน · นำคีย์มาเอง · มีป้าย · ซัพพอร์ต 12 เดือน · ไม่ส่งโรงงานให้โหลด",
    },
  },
];

const SYNTHCOMM_WHITE_LABEL_TIERS: PricingTier[] = [
  {
    name: { en: "Agency White Label", th: "Agency White Label" },
    price: "฿980,000",
    detail: {
      en: "Your brand · no badge · resell SaaS · dedicated tenant · engine stays with IN Z",
      th: "แบรนด์คุณ · ไม่มีป้าย · ขายต่อ SaaS ได้ · เครื่องแยก · เอนจินยังอยู่กับ IN Z",
    },
    highlight: true,
  },
  {
    name: { en: "Enterprise IP Package", th: "Enterprise IP Package" },
    price: "฿2,800,000",
    detail: {
      en: "Full source · IP transfer · 2 years support · modify & own",
      th: "ซอร์สเต็ม · โอนสิทธิ์ · ซัพพอร์ต 2 ปี · แก้ไขและเป็นเจ้าของได้",
    },
  },
];

const UNIVERSAL_SIMULATOR_SAAS_TIERS: PricingTier[] = [
  {
    name: "Starter",
    price: "฿490 / month",
    detail:
      "ผู้ใช้งานเดี่ยว · 1 user · 50 simulations/mo · DeepSeek · History 30 วัน · Storage 1 GB · API ❌ · Community · Shared hosting",
  },
  {
    name: "Pro",
    price: "฿3,490 / month",
    detail:
      "ทีมขนาดเล็ก · 3 users · 300 simulations/mo · DeepSeek + GPT-4o mini · History 90 วัน · Storage 10 GB · API 1,000 calls · Email 24h · Dedicated",
    highlight: true,
  },
  {
    name: "Business",
    price: "฿5,990 / month",
    detail:
      "ทีมมืออาชีพ · 5 users · 500 simulations/mo · + Custom Model · History 1 ปี · Storage 50 GB · API Unlimited · Line + Email 4h · Dedicated + Auto-scale",
  },
];

const UNIVERSAL_SIMULATOR_LICENSE_TIERS: PricingTier[] = [
  {
    name: { en: "Team", th: "Team" },
    price: "฿120,000 / year",
    detail: {
      en: "Early Bird · then ฿156,000 Year 2+ · Unlimited users (concurrent ≤ 10) · BYOK · Dedicated · Email 24h · Onboarding 1 session",
      th: "Early Bird · ปีที่ 2 เป็นต้นไป ฿156,000 · ผู้ใช้ไม่จำกัด (พร้อมกันไม่เกิน 10) · นำคีย์มาเอง · Dedicated · อีเมล 24 ชม. · อบรม 1 ครั้ง",
    },
  },
  {
    name: { en: "Enterprise", th: "Enterprise" },
    price: "฿200,000 / year",
    detail: {
      en: "Early Bird · then ฿260,000 Year 2+ · Unlimited users (concurrent ≤ 30) · BYOK · Dedicated + Auto-scale · Line + Email 4h · SLA 99.5% · Onboarding 2 sessions",
      th: "Early Bird · ปีที่ 2 เป็นต้นไป ฿260,000 · ผู้ใช้ไม่จำกัด (พร้อมกันไม่เกิน 30) · นำคีย์มาเอง · Dedicated + Auto-scale · Line + อีเมล 4 ชม. · SLA 99.5% · อบรม 2 ครั้ง",
    },
    highlight: true,
  },
  {
    name: { en: "Government", th: "ภาครัฐ" },
    price: "฿300,000 / year",
    detail: {
      en: "Early Bird · then ฿390,000 Year 2+ · Unlimited users (concurrent ≤ 50) · BYOK · Dedicated + Auto-scale · Line + Email + On-site · SLA 99.9% · Official docs · Onboarding 3 sessions",
      th: "Early Bird · ปีที่ 2 เป็นต้นไป ฿390,000 · ผู้ใช้ไม่จำกัด (พร้อมกันไม่เกิน 50) · นำคีย์มาเอง · Dedicated + Auto-scale · Line + อีเมล + On-site · SLA 99.9% · เอกสารราชการ · อบรม 3 ครั้ง",
    },
  },
];

const UNIVERSAL_SIMULATOR_WHITE_LABEL_TIERS: PricingTier[] = [
  {
    name: "White Label",
    price: "฿3,000,000+",
    detail:
      "ซื้อขาด · Source + Full Ownership · Rebrand / Resell · ไม่มี Royalty · BYOK · Setup + Training 5 วัน · Support 1 ปี รวมในราคา",
    highlight: true,
  },
];

const MUSIC_DEMO_SAAS_TIERS: PricingTier[] = [
  {
    name: { en: "Top-up 100", th: "เติม 100" },
    price: "฿30",
    detail: {
      en: "100 credits · 2 songs or 1 song + 2 regenerates",
      th: "100 เครดิต · สร้างได้ 2 เพลง หรือ 1 เพลง + เจนใหม่ 2 ครั้ง",
    },
    highlight: true,
  },
  {
    name: { en: "Top-up 300", th: "เติม 300" },
    price: "฿90",
    detail: {
      en: "300 credits · ~6 songs (no regenerates)",
      th: "300 เครดิต · สร้างได้ 6 เพลง (ไม่เจนใหม่)",
    },
  },
  {
    name: { en: "Top-up 1,000", th: "เติม 1,000" },
    price: "฿270",
    detail: {
      en: "1,000 credits · for frequent creators",
      th: "1,000 เครดิต · สำหรับผู้สร้างที่ใช้บ่อย",
    },
  },
  {
    name: { en: "Usage", th: "การใช้งาน" },
    price: "50 / 25 / 50",
    detail: {
      en: "Create 50 · regenerate 25 · re-edit 50 credits",
      th: "สร้างเพลง 50 · เจนใหม่ 25 · Re-edit 50 เครดิต",
    },
  },
  {
    name: { en: "Signup bonus", th: "โบนัสสมัคร" },
    price: { en: "100–300 free", th: "ฟรี 100–300" },
    detail: {
      en: "100 credits on signup · 300 for the first 30 users",
      th: "100 เครดิตเมื่อสมัคร · 300 สำหรับผู้ใช้ 30 คนแรก",
    },
  },
];

const CONTENT_CREATOR_SAAS_TIERS: PricingTier[] = [
  {
    name: { en: "Free Trial", th: "ทดลองฟรี" },
    price: { en: "฿0 · 14 days", th: "฿0 · 14 วัน" },
    detail: {
      en: "5 episodes total · 3 video renders (watermark) · 5 GB storage",
      th: "5 ตอน · เรนเดอร์วิดีโอ 3 ครั้ง (มีลายน้ำ) · ที่เก็บ 5 GB",
    },
  },
  {
    name: { en: "Starter", th: "Starter" },
    price: "฿599 / month",
    detail: {
      en: "10 episodes · 20 renders · 20 GB · RSS + 3 platforms",
      th: "10 ตอน · เรนเดอร์ 20 ครั้ง · 20 GB · RSS + 3 แพลตฟอร์ม",
    },
  },
  {
    name: { en: "Creator", th: "Creator" },
    price: "฿1,499 / month",
    detail: {
      en: "50 episodes · 150 renders · 100 GB · AI clips · scheduler · guests · analytics · team",
      th: "50 ตอน · เรนเดอร์ 150 ครั้ง · 100 GB · คลิป AI · ตั้งเวลา · แขกรับเชิญ · วิเคราะห์ · ทีม",
    },
    highlight: true,
  },
  {
    name: { en: "Pro", th: "Pro" },
    price: "฿2,999 / month",
    detail: {
      en: "200 episodes · 600 renders · 500 GB · monetization · API · white-label",
      th: "200 ตอน · เรนเดอร์ 600 ครั้ง · 500 GB · สร้างรายได้ · API · white-label",
    },
  },
];

const NETR_SAAS_TIERS: PricingTier[] = [
  {
    name: { en: "Free", th: "ฟรี" },
    price: "฿0",
    detail: {
      en: "5 minutes / day · web /chat only · no payment",
      th: "5 นาที/วัน — ไม่ต้องจ่าย คุยได้เฉพาะหน้า /chat",
    },
    highlight: true,
  },
  {
    name: { en: "Prepaid 24 hours", th: "Prepaid 24 ชม." },
    price: "฿30",
    detail: {
      en: "฿30 · 24h (1,440 min) · deducted per minute · stackable · chat at /chat",
      th: "฿30 · 24 ชม. (1,440 นาที) · หักเป็นนาที · สะสมได้ · คุยที่ /chat",
    },
  },
  {
    name: { en: "Plus", th: "Plus" },
    price: { en: "฿99 / month", th: "฿99/เดือน" },
    detail: {
      en: "3 hours / day · chat at /chat",
      th: "฿99/เดือน · 3 ชม./วัน · คุยที่ /chat",
    },
  },
];

const SCORE_BOARD_SAAS_TIERS: PricingTier[] = [
  {
    name: { en: "Trial", th: "ทดลองใช้" },
    price: "฿0",
    detail: {
      en: "5 days · full features · no card required · locks when trial ends",
      th: "5 วัน ฟีเจอร์ครบ · ไม่ต้องใส่บัตรเครดิต · หมดแล้วล็อกอัตโนมัติ",
    },
  },
  {
    name: { en: "Monthly", th: "รายเดือน" },
    price: "฿99 / month",
    detail: {
      en: "Flexible month-to-month · unlimited matches · every sport & feature",
      th: "ยืดหยุ่น จ่ายเดือนต่อเดือน · Overlay ไม่จำกัดแมตช์ · ทุกกีฬา ทุกฟีเจอร์",
    },
  },
  {
    name: { en: "Yearly", th: "รายปี" },
    price: "฿990 / year",
    detail: {
      en: "About 2 months free vs monthly · unlimited matches · every sport & feature",
      th: "ประหยัดกว่า 2 เดือน · Overlay ไม่จำกัดแมตช์ · ทุกกีฬา ทุกฟีเจอร์",
    },
    highlight: true,
  },
];

const PRISM_LICENSE_TIERS: PricingTier[] = [
  {
    name: { en: "Startup License", th: "Startup License" },
    price: { en: "Contact for quote", th: "ติดต่อขอใบเสนอราคา" },
    detail: {
      en: "Binary deploy · co-branded · PRISM engine + admin web · SubsetGuard · no full rebrand rights",
      th: "ติดตั้งแบบไบนารี · ร่วมแบรนด์ · เครื่องยนต์ PRISM + แอดมินเว็บ · SubsetGuard · ยังไม่ใช่สิทธิ์รีแบรนด์เต็ม",
    },
    highlight: true,
  },
];

const PRISM_WHITE_LABEL_TIERS: PricingTier[] = [
  {
    name: { en: "White Label", th: "White Label" },
    price: { en: "Contact for quote", th: "ติดต่อขอใบเสนอราคา" },
    detail: {
      en: "Full rebrand under your brand · PRISM engine + admin web · SRAG search · SubsetGuard",
      th: "รีแบรนด์เต็มภายใต้แบรนด์คุณ · เครื่องยนต์ PRISM + แอดมินเว็บ · ค้นด้วย SRAG · SubsetGuard",
    },
    highlight: true,
  },
  {
    name: { en: "Enterprise IP", th: "Enterprise IP" },
    price: { en: "Contact for quote", th: "ติดต่อขอใบเสนอราคา" },
    detail: {
      en: "Source + ownership · RBAC knowledge base · offer / appointment / follow-up stack",
      th: "ซอร์สและกรรมสิทธิ์ · คลังความรู้ RBAC · ข้อเสนอ นัดชม และระบบติดตาม",
    },
  },
];

const CONTACT_SALES: LocalizedText = {
  en: "Contact sales",
  th: "ติดต่อฝ่ายขาย",
};

export const PRODUCT_CATALOG: CatalogProduct[] = [
  {
    name: "SynthComm",
    title: {
      en: "SynthComm — Industrial synthetic CS data factory",
      th: "SynthComm — โรงงานข้อมูลบทสนทนาสังเคราะห์",
    },
    description: SYNTHCOMM_DESCRIPTION,
    usageGuide: SYNTHCOMM_USAGE,
    earlyBirdPrice: { en: "Contact for quote", th: "ติดต่อขอใบเสนอราคา" },
    regularPrice: { en: "Custom packaging", th: "แพ็กเกจตามความต้องการ" },
    models: ["white-label", "license", "saas"],
    pricingByModel: {
      saas: {
        ctaLabel: {
          en: "Try free — 100 conversations",
          th: "ทดลองฟรี — 100 บทสนทนา",
        },
        ctaHref: "/demo",
        note: {
          en: "Annual plans save about 20%.",
          th: "แพ็กเกจรายปีประหยัดประมาณ 20%",
        },
        tiers: SYNTHCOMM_SAAS_TIERS,
      },
      license: {
        ctaLabel: CONTACT_SALES,
        ctaHref: "/contact?channel=customer-service",
        note: {
          en: "Like Shopify: your domain via CNAME, software on IN Z cloud. Dedicated tenant — engine, workers, quota, expiry stay with us. Job API is ours; LLM APIs are your BYOK. No source, worker image, or on-prem engine (that is Enterprise IP).",
          th: "แบบ Shopify: โดเมนคุณผ่าน CNAME โปรแกรมอยู่บนคลาวด์ IN Z ทั้งก้อน เป็น dedicated tenant เอนจิน เวิร์กเกอร์ โควตา วันหมดอายุอยู่ฝั่งเรา API ส่งจ๊อบเป็นของ IN Z ค่า LLM เป็น BYOK ของลูกค้า ไม่มีซอร์ส ไม่มี worker image ไม่มี on-prem (นั่นคือ Enterprise IP)",
        },
        tiers: SYNTHCOMM_LICENSE_TIERS,
      },
      "white-label": {
        ctaLabel: CONTACT_SALES,
        ctaHref: "/contact?channel=customer-service",
        note: {
          en: "Agency: your brand on a dedicated tenant — the generation engine stays with IN Z. Enterprise IP: source transfer. Pay in full and save 10%. Installment available.",
          th: "Agency: แบรนด์คุณบนเครื่องแยก — เอนจินผลิตยังอยู่กับ IN Z Enterprise IP: โอนซอร์ส ชำระเต็มจำนวนลด 10% ผ่อนได้",
        },
        tiers: SYNTHCOMM_WHITE_LABEL_TIERS,
      },
    },
  },
  {
    name: "QA LAB",
    title: {
      en: "QA LAB — simulation & verification for web, API, and mobile",
      th: "QA LAB — จำลองและตรวจสอบเว็บ API และมือถือ",
    },
    description: UNIVERSAL_SIMULATOR_DESCRIPTION,
    usageGuide: QA_LAB_USAGE,
    earlyBirdPrice: {
      en: "SaaS from ฿490 / month · License Early Bird from ฿120,000 / year",
      th: "SaaS เริ่ม ฿490 / เดือน · License Early Bird เริ่ม ฿120,000 / ปี",
    },
    regularPrice: {
      en: "License Year 2+ from ฿156,000 · White Label ฿3,000,000+",
      th: "License ปีที่ 2 เป็นต้นไป เริ่ม ฿156,000 · White Label ฿3,000,000+",
    },
    models: ["saas", "license", "white-label"],
    scopeOfWork: UNIVERSAL_SIMULATOR_SCOPE,
    pricingByModel: {
      saas: {
        ctaLabel: {
          en: "Try free readiness audit",
          th: "ทดลองตรวจความพร้อมฟรี",
        },
        ctaHref: "/demo",
        note: {
          en: "Cloud SaaS · monthly. Free readiness audit — no signup. Prices exclude VAT 7%.",
          th: "Cloud SaaS รายเดือน ตรวจความพร้อมฟรี — ไม่ต้องสมัคร ราคาไม่รวม VAT 7%",
        },
        tiers: UNIVERSAL_SIMULATOR_SAAS_TIERS,
      },
      license: {
        ctaLabel: CONTACT_SALES,
        ctaHref: "/contact?channel=customer-service",
        note: {
          en: "Early Bird 2026 · BYOK (Bring Your Own API Key) · Unlimited users with fair-use concurrent caps. Year 2+ list price applies after Early Bird.",
          th: "Early Bird 2026 · นำคีย์ API มาเอง · ผู้ใช้ไม่จำกัดตามเพดานการใช้งานพร้อมกัน ปีที่ 2 เป็นต้นไปคิดราคาปกติหลัง Early Bird",
        },
        tiers: UNIVERSAL_SIMULATOR_LICENSE_TIERS,
      },
      "white-label": {
        ctaLabel: CONTACT_SALES,
        ctaHref: "/contact?channel=customer-service",
        note: {
          en: "One-time from ฿3,000,000+ · source + full ownership · no royalty · BYOK.",
          th: "ซื้อขาดเริ่ม ฿3,000,000+ · ซอร์สและกรรมสิทธิ์เต็ม · ไม่มีค่าสิทธิ์ · นำคีย์มาเอง",
        },
        tiers: UNIVERSAL_SIMULATOR_WHITE_LABEL_TIERS,
      },
    },
  },
  {
    name: "Music Demo",
    title: {
      en: "Music Demo — We help you complete",
      th: "Music Demo — เราช่วยให้คุณสมบูรณ์",
    },
    description: MUSIC_DEMO_DESCRIPTION,
    usageGuide: MUSIC_DEMO_USAGE,
    earlyBirdPrice: {
      en: "Signup bonus 100–300 credits · top-up from ฿30",
      th: "โบนัสสมัคร 100–300 เครดิต · เติมเริ่ม ฿30",
    },
    regularPrice: {
      en: "฿30 = 100 credits · create 50 · regen 25",
      th: "฿30 = 100 เครดิต · สร้าง 50 · สร้างใหม่ 25",
    },
    models: ["saas"],
    pricingByModel: {
      saas: {
        ctaLabel: { en: "Open Music Demo", th: "เปิด Music Demo" },
        ctaHref: "/demo",
        note: {
          en: "Credits pay-as-you-go — no monthly plan. Artist Blueprint (lyrics · chords · MIDI/MusicXML). AI Vocal Preview add-on from ฿49, not included in the core package. Prices exclude VAT 7%.",
          th: "เครดิตจ่ายตามใช้ — ไม่ผูกแพ็กเดือน แพ็กหลัก Artist Blueprint (คำร้อง · คอร์ด · MIDI/MusicXML) เสียงร้อง AI เป็นแอดออนเริ่ม ฿49 ไม่รวมในแพ็กหลัก ราคาไม่รวม VAT 7%",
        },
        tiers: MUSIC_DEMO_SAAS_TIERS,
      },
    },
  },
  {
    name: "Content Creator",
    title: {
      en: "Content Creator — Thai dialects + SEA",
      th: "Content Creator — ถิ่นไทย + SEA",
    },
    description: CONTENT_CREATOR_DESCRIPTION,
    usageGuide: CONTENT_CREATOR_USAGE,
    earlyBirdPrice: { en: "14-day free trial", th: "ทดลองฟรี 14 วัน" },
    regularPrice: { en: "฿599 – ฿2,999 / month", th: "฿599 – ฿2,999 / เดือน" },
    models: ["saas"],
    pricingByModel: {
      saas: {
        ctaLabel: { en: "Open Content Creator", th: "เปิด Content Creator" },
        ctaHref: "/demo",
        note: {
          en: "Source of truth: api/src/config/plans.ts — Free Trial then Starter / Creator / Pro. Monthly quotas reset on the 1st (Thailand time). Trial videos always have a watermark.",
          th: "ต้นฉบับราคา: api/src/config/plans.ts — ทดลองฟรี แล้วเป็น Starter / Creator / Pro โควตารายเดือนรีเซ็ตวันที่ 1 ตามเวลาไทย วิดีโอช่วงทดลองติดลายน้ำเสมอ",
        },
        tiers: CONTENT_CREATOR_SAAS_TIERS,
      },
    },
  },
  {
    name: "NetR",
    title: {
      en: "netr — Oracle of Karmic Stars",
      th: "เนตร — Oracle ที่รู้จักคุณดีกว่าใคร",
    },
    description: NETR_DESCRIPTION,
    usageGuide: NETR_USAGE,
    earlyBirdPrice: {
      en: "Free — 5 minutes / day",
      th: "ฟรี — 5 นาที/วัน",
    },
    regularPrice: {
      en: "Prepaid ฿30 · Plus ฿99 / month",
      th: "Prepaid ฿30 · Plus ฿99/เดือน",
    },
    models: ["saas"],
    pricingByModel: {
      saas: {
        ctaLabel: { en: "Open netr", th: "เปิดเนตร" },
        ctaHref: "https://netr-web-production-ea49.up.railway.app/chat",
        note: {
          en: "Verify on inz.lol → open from My Account (SSO) → record birth chart once at /register (no duplicate OTP). /chart is owner-only. Chat at /chat — free 5 min/day, Plus 3 h/day, then Prepaid.",
          th: "ยืนยันตัวตนที่ inz.lol → เปิดจากบัญชี IN Z (SSO) → จารึกดวงครั้งเดียวที่ /register (ไม่ OTP ซ้ำ) /chart เจ้าของบัญชีเท่านั้น คุยที่ /chat — ฟรี 5 นาที/วัน Plus 3 ชม./วัน แล้ว Prepaid",
        },
        tiers: NETR_SAAS_TIERS,
      },
    },
  },
  {
    name: "Score Board Live",
    title: {
      en: "Club sports live — pro scoreboard in 5 minutes",
      th: "ไลฟ์กีฬาสโมสร — สกอร์บอร์ดระดับมืออาชีพใน 5 นาที",
    },
    description: SCORE_BOARD_DESCRIPTION,
    catalogStory: SCORE_BOARD_STORY,
    usageGuide: SCORE_BOARD_USAGE,
    earlyBirdPrice: {
      en: "5-day free trial",
      th: "ทดลองฟรี 5 วัน",
    },
    regularPrice: {
      en: "฿99 / month · ฿990 / year",
      th: "฿99 / เดือน · ฿990 / ปี",
    },
    models: ["saas"],
    pricingByModel: {
      saas: {
        ctaLabel: { en: "Open Score Board Live", th: "เปิด Score Board Live" },
        ctaHref: "/demo",
        note: {
          en: "No setup fee, no lock-in contract — cancel anytime. Open from your IN Z account for a 5-day trial, then Monthly or Yearly on shared checkout. Prices exclude VAT 7%.",
          th: "ไม่มีค่าติดตั้ง ไม่มีสัญญาผูกมัด ยกเลิกได้ตลอด เปิดจากบัญชี IN Z ได้ทดลองฟรี 5 วัน จากนั้นเลือกรายเดือนหรือรายปีที่หน้าชำระเงินรวม ราคาไม่รวม VAT 7%",
        },
        tiers: SCORE_BOARD_SAAS_TIERS,
      },
    },
  },
  {
    name: "PRISM",
    title: {
      en: "PRISM — Property Retrieval & Intent Subset Matching",
      th: "PRISM — ค้นโครงการและจับคู่เจตนาด้วย SRAG",
    },
    description: PRISM_DESCRIPTION,
    usageGuide: PRISM_USAGE,
    earlyBirdPrice: {
      en: "Contact for License / White Label quote",
      th: "ติดต่อขอใบเสนอราคา License / White Label",
    },
    regularPrice: {
      en: "Co-branded license or source + full rebrand",
      th: "ไลเซนส์ร่วมแบรนด์ หรือซอร์ส + รีแบรนด์เต็ม",
    },
    models: ["white-label", "license"],
    pricingByModel: {
      license: {
        ctaLabel: { en: "Open PRISM", th: "เปิด PRISM" },
        ctaHref: "https://prism-web-production-e0c6.up.railway.app",
        note: {
          en: "Co-branded license for real-estate teams. Live admin web is the reference UI — contact sales for commercial terms. Upgrade to White Label for full rebrand.",
          th: "ไลเซนส์ร่วมแบรนด์สำหรับทีมอสังหา แอดมินเว็บที่เปิดได้คือ UI อ้างอิง — ติดต่อฝ่ายขายเรื่องเงื่อนไข อัปเกรดเป็น White Label หากต้องการรีแบรนด์เต็ม",
        },
        tiers: PRISM_LICENSE_TIERS,
      },
      "white-label": {
        ctaLabel: { en: "Open PRISM", th: "เปิด PRISM" },
        ctaHref: "https://prism-web-production-e0c6.up.railway.app",
        note: {
          en: "White Label for real-estate brands. Live admin web is the reference UI — contact sales for source, rebrand, and ownership.",
          th: "White Label สำหรับแบรนด์อสังหา แอดมินเว็บที่เปิดได้คือ UI อ้างอิง — ติดต่อฝ่ายขายสำหรับซอร์ส รีแบรนด์ และกรรมสิทธิ์",
        },
        tiers: PRISM_WHITE_LABEL_TIERS,
      },
    },
  },
];

export function productSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-");
}

export function findCatalogProduct(slug: string): CatalogProduct | undefined {
  return PRODUCT_CATALOG.find((product) => productSlug(product.name) === slug);
}

export function productManualHref(name: string, lang: AuthLang = "en"): string {
  return `/manuals/${productSlug(name)}.${lang}.md`;
}

export function localizeTiers(
  tiers: PricingTier[] | undefined,
  lang: AuthLang,
): ResolvedPricingTier[] {
  return (tiers || []).map((tier) => ({
    name: pickLang(tier.name, lang),
    price: pickLang(tier.price, lang),
    detail: pickLang(tier.detail, lang),
    highlight: tier.highlight,
  }));
}

export function pricingForProduct(
  product: CatalogProduct,
  model: ProductModel,
  lang: AuthLang = "en",
): {
  ctaLabel: string;
  ctaHref?: string;
  note?: string;
  tiers: ResolvedPricingTier[];
} | null {
  const byModel = product.pricingByModel?.[model];
  if (byModel) {
    return {
      ctaLabel: pickLang(
        byModel.ctaLabel,
        lang,
        lang === "th" ? "เข้าสู่ระบบ / สมัคร" : "Sign In / Sign Up",
      ),
      ctaHref: byModel.ctaHref,
      note: pickLang(byModel.note, lang) || undefined,
      tiers: localizeTiers(byModel.tiers, lang),
    };
  }
  return null;
}
