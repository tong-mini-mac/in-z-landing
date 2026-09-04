export type StudioLang = "en" | "th";

export type StudioStackTag = {
  label: string;
  highlight?: boolean;
};

export type StudioStackGroup = {
  id: string;
  label: string;
  variant?: "default" | "now";
  tags: StudioStackTag[];
};

export type StudioTimelineItem = {
  title: string;
  sub: string;
};

export const STUDIO_TIMELINE: StudioTimelineItem[] = [
  {
    title: "B.Sc. General Science",
    sub: "Chulalongkorn University",
  },
  {
    title: "M.Sc. Renewable Energy",
    sub: "Naresuan University",
  },
  {
    title: "22 Years — Operations & Supply Chain",
    sub: "Procurement · Logistics · Strategic Sourcing · Contract Management",
  },
  {
    title: "AI & Systems — Self-Taught",
    sub: "LLM · AI Agents · Solution Architecture · 11 Production Systems",
  },
];

export const STUDIO_STACKS: StudioStackGroup[] = [
  {
    id: "ai",
    label: "AI & Intelligence",
    tags: [
      { label: "Large Language Models", highlight: true },
      { label: "AI Agents", highlight: true },
      { label: "Agent Orchestration", highlight: true },
      { label: "Prompt Engineering" },
      { label: "MLflow" },
      { label: "HITL Governance" },
      { label: "AI Operations" },
    ],
  },
  {
    id: "systems",
    label: "Systems & Architecture",
    tags: [
      { label: "Solution Architecture", highlight: true },
      { label: "Systems Design", highlight: true },
      { label: "Digital Transformation" },
      { label: "Business Process Automation" },
      { label: "Autonomous Workflows" },
      { label: "Game Theory" },
    ],
  },
  {
    id: "domain",
    label: "Domain Expertise — 22 Years",
    tags: [
      { label: "Strategic Procurement" },
      { label: "Supply Chain Optimization" },
      { label: "Contract Management" },
      { label: "Global Sourcing" },
      { label: "Logistics Management" },
      { label: "Cost Engineering" },
      { label: "Inventory Planning" },
      { label: "3PL" },
    ],
  },
  {
    id: "now",
    label: "Now Building",
    variant: "now",
    tags: [
      { label: "Medical-Grade AIoT" },
      { label: "3-in-1 Wearable Ecosystem" },
      { label: "Medical Internet" },
    ],
  },
];

export const STUDIO_COPY = {
  en: {
    brand: "IN Z Studio",
    navAbout: "About",
    navWork: "Work",
    navVision: "Vision",
    navTalk: "Talk",
    heroTag: "Available for collaboration",
    heroLine1: "I don't write code.",
    heroLine2: "I build infrastructure.",
    heroSubBefore: "Full-stack systems architect building",
    heroSubStrong1: "production-ready enterprise systems",
    heroSubMid: "across healthcare, logistics, and automation.",
    heroSubNow: "Now designing a",
    heroSubStrong2: "medical-grade AIoT ecosystem",
    heroSubAfter:
      "— wearable health infrastructure for the next generation of patient care.",
    proofSystems: "Systems Built",
    proofReady: "Production-Ready",
    proofIndustries: "Industries",
    proofVision: "Vision",
    heroCtaWork: "See the Work",
    heroCtaVision: "The Vision",
    scrollHint: "Scroll",
    aboutLabel: "About",
    aboutName: "Vittaya Lertbuasin",
    aboutRole: "Domain Architect.",
    aboutQuoteBefore: "Most people see a problem and find a tool.",
    aboutQuoteMid: "I see a problem and build the",
    aboutQuoteStrong: "infrastructure",
    aboutQuoteAfter: "that makes the tool unnecessary.",
    aboutBio1Before: "With",
    aboutBio1Strong: "22 years of operational experience",
    aboutBio1After:
      "across supply chain, procurement, and logistics — I've lived inside the broken systems most people only read about.",
    aboutBio2Before:
      "That experience became the foundation. When AI emerged as a real engineering tool, I didn't just adopt it — I",
    aboutBio2Strong: "rebuilt entire workflows from the ground up.",
    aboutBio3Before: "Today I design and build",
    aboutBio3Strong1: "production-ready AI systems",
    aboutBio3Mid: "across healthcare, enterprise automation, and beyond. The next frontier:",
    aboutBio3Strong2: "medical-grade AIoT infrastructure",
    aboutBio3After: "for the next generation of patient care.",
    aboutSelfTaught: "AI & Engineering — Self-taught via curiosity, not curriculum",
    workLabel: "Portfolio",
    workTitleLine: "11 Systems.",
    workTitleAccent: "Production-Ready.",
    workFilterAll: "All (11)",
    workFilterAi: "AI & Automation",
    workFilterLogistics: "Logistics",
    workFilterHealthcare: "Healthcare",
    workFilterEnterprise: "Enterprise",
    workFilterCreative: "Creative",
    visionLabel: "The Vision",
    visionManifestoLine1: "Healthcare is broken",
    visionManifestoLine2Before: "at the",
    visionManifestoGrad: "infrastructure level.",
    visionManifestoP1Before: "A patient's health data is scattered across",
    visionManifestoP1Strong:
      "multiple devices, multiple apps, multiple Bluetooth signals",
    visionManifestoP1Mid:
      "— with no central system that aggregates, analyzes, and delivers it in real-time. This isn't a software problem. It's an",
    visionManifestoP1Strong2: "infrastructure problem.",
    visionSolutionTitle: "3-in-1 Medical Wearable Ecosystem",
    visionSolutionSub: "One device. One Bluetooth signal. Complete physiological data.",
    visionDivider: "The Solution",
    visionQuoteLine1: "The goal is not a better wearable.",
    visionQuoteLine2: "The goal is to build the",
    visionQuoteGrad: "Medical Internet.",
    visionQuoteBody:
      "An infrastructure that connects every human's health data — the same way the Internet connected the world's information. That is the legacy being built.",
    visionAlignLabel: "Let's Align",
    visionAlignHeadingBefore: "I've shown you",
    visionAlignHeadingGrad: "what I'm building.",
    visionAlignHeadingAfter: "What's your vision?",
    visionAlignP1Before: "11 production systems is the proof. Not a pitch deck —",
    visionAlignP1Strong: "actual infrastructure, built and shipped.",
    visionAlignP2Before:
      "I'm not looking for someone who fits a job description. I'm looking for someone with",
    visionAlignP2Strong: "a vision of their own",
    visionAlignP2After: "— so we can tune until it aligns.",
    visionAlignP3Before:
      "Whether you're a builder, an investor, a domain expert, or simply",
    visionAlignP3Strong: "someone who sees the same problem",
    visionAlignP3After: "— let's talk.",
    visionCta: "Start the conversation",
    visionCtaHref: "mailto:vittaya@inz.lol",
    contactLabel: "Contact",
    contactAvail: "Available for the right conversation",
    contactHeroLine1: "Let's build",
    contactHeroGrad: "something real.",
    contactHeroDim: "Not someday.",
    contactHeroPBefore:
      "If you've read this far, you're probably not here by accident. You have a problem, a vision, or a question.",
    contactHeroPStrong: "That's the only qualification needed.",
    contactBtnPrimary: "Send a message",
    contactBtnSecondary: "LinkedIn",
    contactChannelsLabel: "Reach me directly",
    contactResponseLabel: "What to expect",
    contactResponseTitle: "I read every message personally",
    contactHintTitle: "Not sure what to say?",
    contactHintBefore: "Start with the problem you're trying to solve. One paragraph is enough.",
    contactHintStrong: "The rest we figure out together.",
    contactFooterName: "Vittaya Lertbuasin",
    contactFooterSub: "Domain Architect · AI Systems · inz.lol",
    contactFooterCopy: "© 2026 Vittaya Lertbuasin",
    contactEmail: "vittaya@inz.lol",
    contactEmailHref: "mailto:vittaya@inz.lol",
    contactLinkedIn: "linkedin.com/in/vittaya",
    contactLinkedInHref: "https://linkedin.com/in/vittaya",
    contactWeb: "inz.lol",
    contactWebHref: "https://www.inz.lol",
  },
  th: {
    brand: "IN Z Studio",
    navAbout: "About",
    navWork: "ผลงาน",
    navVision: "วิสัยทัศน์",
    navTalk: "คุยกัน",
    heroTag: "Available for collaboration",
    heroLine1: "I don't write code.",
    heroLine2: "I build infrastructure.",
    heroSubBefore: "Full-stack systems architect building",
    heroSubStrong1: "production-ready enterprise systems",
    heroSubMid: "across healthcare, logistics, and automation.",
    heroSubNow: "Now designing a",
    heroSubStrong2: "medical-grade AIoT ecosystem",
    heroSubAfter:
      "— wearable health infrastructure for the next generation of patient care.",
    proofSystems: "Systems Built",
    proofReady: "Production-Ready",
    proofIndustries: "Industries",
    proofVision: "Vision",
    heroCtaWork: "See the Work",
    heroCtaVision: "The Vision",
    scrollHint: "Scroll",
    aboutLabel: "About",
    aboutName: "Vittaya Lertbuasin",
    aboutRole: "Domain Architect.",
    aboutQuoteBefore: "Most people see a problem and find a tool.",
    aboutQuoteMid: "I see a problem and build the",
    aboutQuoteStrong: "infrastructure",
    aboutQuoteAfter: "that makes the tool unnecessary.",
    aboutBio1Before: "With",
    aboutBio1Strong: "22 years of operational experience",
    aboutBio1After:
      "across supply chain, procurement, and logistics — I've lived inside the broken systems most people only read about.",
    aboutBio2Before:
      "That experience became the foundation. When AI emerged as a real engineering tool, I didn't just adopt it — I",
    aboutBio2Strong: "rebuilt entire workflows from the ground up.",
    aboutBio3Before: "Today I design and build",
    aboutBio3Strong1: "production-ready AI systems",
    aboutBio3Mid: "across healthcare, enterprise automation, and beyond. The next frontier:",
    aboutBio3Strong2: "medical-grade AIoT infrastructure",
    aboutBio3After: "for the next generation of patient care.",
    aboutSelfTaught: "AI & Engineering — Self-taught via curiosity, not curriculum",
    workLabel: "Portfolio",
    workTitleLine: "11 Systems.",
    workTitleAccent: "Production-Ready.",
    workFilterAll: "All (11)",
    workFilterAi: "AI & Automation",
    workFilterLogistics: "Logistics",
    workFilterHealthcare: "Healthcare",
    workFilterEnterprise: "Enterprise",
    workFilterCreative: "Creative",
    visionLabel: "The Vision",
    visionManifestoLine1: "Healthcare is broken",
    visionManifestoLine2Before: "at the",
    visionManifestoGrad: "infrastructure level.",
    visionManifestoP1Before: "A patient's health data is scattered across",
    visionManifestoP1Strong:
      "multiple devices, multiple apps, multiple Bluetooth signals",
    visionManifestoP1Mid:
      "— with no central system that aggregates, analyzes, and delivers it in real-time. This isn't a software problem. It's an",
    visionManifestoP1Strong2: "infrastructure problem.",
    visionSolutionTitle: "3-in-1 Medical Wearable Ecosystem",
    visionSolutionSub: "One device. One Bluetooth signal. Complete physiological data.",
    visionDivider: "The Solution",
    visionQuoteLine1: "The goal is not a better wearable.",
    visionQuoteLine2: "The goal is to build the",
    visionQuoteGrad: "Medical Internet.",
    visionQuoteBody:
      "An infrastructure that connects every human's health data — the same way the Internet connected the world's information. That is the legacy being built.",
    visionAlignLabel: "Let's Align",
    visionAlignHeadingBefore: "I've shown you",
    visionAlignHeadingGrad: "what I'm building.",
    visionAlignHeadingAfter: "What's your vision?",
    visionAlignP1Before: "11 production systems is the proof. Not a pitch deck —",
    visionAlignP1Strong: "actual infrastructure, built and shipped.",
    visionAlignP2Before:
      "I'm not looking for someone who fits a job description. I'm looking for someone with",
    visionAlignP2Strong: "a vision of their own",
    visionAlignP2After: "— so we can tune until it aligns.",
    visionAlignP3Before:
      "Whether you're a builder, an investor, a domain expert, or simply",
    visionAlignP3Strong: "someone who sees the same problem",
    visionAlignP3After: "— let's talk.",
    visionCta: "Start the conversation",
    visionCtaHref: "mailto:vittaya@inz.lol",
    contactLabel: "Contact",
    contactAvail: "Available for the right conversation",
    contactHeroLine1: "Let's build",
    contactHeroGrad: "something real.",
    contactHeroDim: "Not someday.",
    contactHeroPBefore:
      "If you've read this far, you're probably not here by accident. You have a problem, a vision, or a question.",
    contactHeroPStrong: "That's the only qualification needed.",
    contactBtnPrimary: "Send a message",
    contactBtnSecondary: "LinkedIn",
    contactChannelsLabel: "Reach me directly",
    contactResponseLabel: "What to expect",
    contactResponseTitle: "I read every message personally",
    contactHintTitle: "Not sure what to say?",
    contactHintBefore: "Start with the problem you're trying to solve. One paragraph is enough.",
    contactHintStrong: "The rest we figure out together.",
    contactFooterName: "Vittaya Lertbuasin",
    contactFooterSub: "Domain Architect · AI Systems · inz.lol",
    contactFooterCopy: "© 2026 Vittaya Lertbuasin",
    contactEmail: "vittaya@inz.lol",
    contactEmailHref: "mailto:vittaya@inz.lol",
    contactLinkedIn: "linkedin.com/in/vittaya",
    contactLinkedInHref: "https://linkedin.com/in/vittaya",
    contactWeb: "inz.lol",
    contactWebHref: "https://www.inz.lol",
  },
} as const;

export type StudioIndustry =
  | "ai"
  | "logistics"
  | "healthcare"
  | "enterprise"
  | "creative";

export type StudioWorkBadge = "deployed" | "live" | "saas" | "industry";

export type StudioWork = {
  id: string;
  number: string;
  industry: StudioIndustry;
  icon: string;
  name: string;
  tagline: string;
  badges: StudioWorkBadge[];
  industryLabel: string;
  problem: Array<{ text: string; strong?: boolean }>;
  tags: string[];
};

export const STUDIO_WORKS: StudioWork[] = [
  {
    id: "procurement",
    number: "01",
    industry: "enterprise",
    icon: "📋",
    name: "Procurement System",
    tagline: "พ.ร.บ. 2560 Compliance Engine",
    badges: ["deployed", "industry"],
    industryLabel: "Enterprise",
    problem: [
      {
        text: "เอกสารราชการที่ต้อง copy-paste ซ้ำๆ ทำให้เกิดข้อผิดพลาดบ่อยครั้ง ระบบนี้ ",
      },
      { text: "อ่าน PDF อัตโนมัติ ด้วย OCR", strong: true },
      {
        text: " แล้วเติมแบบฟอร์มทั้งหมดให้ถูกต้องตาม พ.ร.บ. จัดซื้อจัดจ้าง 2560",
      },
    ],
    tags: ["FastAPI", "OCR", "AI Chat", "Word Template"],
  },
  {
    id: "logistic-risk",
    number: "02",
    industry: "logistics",
    icon: "🗺️",
    name: "Logistic Strategic Engine",
    tagline: "Real-time Route Risk Intelligence",
    badges: ["saas", "industry"],
    industryLabel: "Logistics",
    problem: [
      {
        text: "ข้อมูลเส้นทางกระจัดกระจาย ต้องวิเคราะห์เองว่าเส้นทางไหนปลอดภัย ระบบนี้รวม ",
      },
      { text: "สภาพอากาศ ข่าวภูมิรัฐศาสตร์ ภัยธรรมชาติ", strong: true },
      {
        text: " แล้วให้คะแนนความเสี่ยงแต่ละเส้นทางแบบ real-time",
      },
    ],
    tags: ["Risk Scoring", "Geopolitics", "AIR/SEA/TRUCK", "Compliance"],
  },
  {
    id: "greencargo",
    number: "03",
    industry: "logistics",
    icon: "🌿",
    name: "GreenCargo",
    tagline: "Carbon Credit for Transport",
    badges: ["saas", "industry"],
    industryLabel: "Logistics",
    problem: [
      {
        text: "ผู้ส่งออกไป EU ขาด Carbon Report ที่ได้มาตรฐาน TGO ระบบนี้ ",
      },
      { text: "คำนวณ CO₂ อัตโนมัติ", strong: true },
      {
        text: " ออก GHG Report และแจ้งเตือนเมื่อรถควรเข้าซ่อมเพื่อลดการสิ้นเปลืองน้ำมัน",
      },
    ],
    tags: ["Carbon Credit", "TGO", "EU Export", "Fleet Management"],
  },
  {
    id: "prism",
    number: "04",
    industry: "ai",
    icon: "🏢",
    name: "PRISM by SRAG",
    tagline: "Real Estate AI Lead Engine",
    badges: ["saas", "industry"],
    industryLabel: "AI",
    problem: [
      {
        text: "ลูกค้าเดินออกจากโครงการเพราะไม่เจอสิ่งที่ใช่ PRISM ใช้ ",
      },
      { text: "SRAG Engine จับคู่ Intent ลูกค้า", strong: true },
      {
        text: " กับโครงการที่เหมาะสม และดูแล Lead ที่ยังไม่พร้อมซื้อให้กลายเป็น Buyer ในอนาคต",
      },
    ],
    tags: ["SRAG", "Intent Classification", "Lead Nurturing", "Vector Search"],
  },
  {
    id: "erp",
    number: "05",
    industry: "enterprise",
    icon: "⚙️",
    name: "Universal ERP",
    tagline: "Modular ERP for SME",
    badges: ["saas", "industry"],
    industryLabel: "Enterprise",
    problem: [
      {
        text: "SME ไม่มีงบซื้อ ERP ระดับองค์กร ระบบนี้ให้ ",
      },
      {
        text: "Finance, HR, Stock, Procurement, Marketing",
        strong: true,
      },
      {
        text: " ในแพลตฟอร์มเดียว เลือก Module ได้ตามต้องการ พร้อม Industry Template เช่น ร้านอาหาร คลินิก Beauty",
      },
    ],
    tags: ["FastAPI", "Multi-Industry", "DIY Modules", "AI CFO"],
  },
  {
    id: "qa-lab",
    number: "06",
    industry: "ai",
    icon: "🔬",
    name: "QA LAB",
    tagline: "AI-Powered Product Readiness",
    badges: ["saas", "industry"],
    industryLabel: "AI",
    problem: [
      {
        text: "ทีม QA ขาดเครื่องมือทดสอบความพร้อมก่อน Launch QA LAB ",
      },
      { text: "จำลอง User Persona และ Load Scenarios", strong: true },
      {
        text: " วิเคราะห์ด้วย ML แล้วรายงานจุดอ่อนก่อนระบบล่มจริง",
      },
    ],
    tags: ["Load Simulation", "Persona Testing", "ML Anomaly", "Appium"],
  },
  {
    id: "synthcomm",
    number: "07",
    industry: "ai",
    icon: "🧬",
    name: "SynthComm",
    tagline: "Thai Synthetic Data Factory",
    badges: ["saas", "industry"],
    industryLabel: "AI",
    problem: [
      {
        text: "การ Train AI ต้องการข้อมูลจำนวนมาก แต่ข้อมูลจริงติดปัญหา PDPA SynthComm ",
      },
      { text: "สร้าง Synthetic Data ภาษาไทยคุณภาพสูง", strong: true },
      {
        text: " ด้วย Multi-Agent Factory พร้อม Monthly ML Retraining อัตโนมัติ",
      },
    ],
    tags: ["Multi-Agent", "Thai NLP", "PDPA Safe", "Auto-Scale"],
  },
  {
    id: "content-creator",
    number: "08",
    industry: "creative",
    icon: "🎬",
    name: "Content Creator",
    tagline: "One-Stop Short Video & Podcast",
    badges: ["saas", "industry"],
    industryLabel: "Creative",
    problem: [
      {
        text: "Creator ต้องใช้หลายแอปในการผลิต Content ระบบนี้จบในที่เดียว: ",
      },
      { text: "Script → TTS → MP4 (9:16)", strong: true },
      {
        text: " รองรับ TikTok/IG/X และ Podcast ภาษาถิ่น เหนือ อีสาน ใต้ รวมถึงเวียดนามและอินโดนีเซีย",
      },
    ],
    tags: ["Video AI", "TTS", "Podcast", "SEA Languages"],
  },
  {
    id: "drama",
    number: "09",
    industry: "creative",
    icon: "🎭",
    name: "Drama Studio",
    tagline: "AI Series Production Pipeline",
    badges: ["industry"],
    industryLabel: "Creative",
    problem: [
      {
        text: "การผลิต Series Animation ต้องโยกย้ายข้อมูลระหว่างหลายแอป Drama Studio รวม ",
      },
      { text: "Script → Brief → Draft → Production", strong: true },
      {
        text: " ไว้ในที่เดียว ลดเวลาและต้นทุนการผลิตอย่างมีนัยสำคัญ",
      },
    ],
    tags: ["FastAPI", "Script AI", "Animation", "Thai UI"],
  },
  {
    id: "music",
    number: "10",
    industry: "creative",
    icon: "🎵",
    name: "MyClaw Music",
    tagline: "Human-Soul Music Demo Tool",
    badges: ["industry"],
    industryLabel: "Creative",
    problem: [
      {
        text: "นักแต่งเพลงต้องประสานงานระหว่างคนคิดคำร้องและทำนอง ใช้เวลานาน MyClaw ช่วย ",
      },
      {
        text: "ร่างเพลง Demo ที่มีจิตวิญญาณของผู้แต่ง",
        strong: true,
      },
      { text: " ไม่ใช่เพลง AI ที่เร็วแต่ไร้ตัวตน" },
    ],
    tags: ["Next.js", "Music AI", "Gen Z", "HITL"],
  },
  {
    id: "netr",
    number: "11",
    industry: "healthcare",
    icon: "🌟",
    name: "NETR (เนตร)",
    tagline: "Mental Health Behind the Stars",
    badges: ["live", "industry"],
    industryLabel: "Healthcare",
    problem: [
      {
        text: "คนที่มีปัญหาชีวิตมักหาทางระบายผ่านการดูดวง NETR เป็น ",
      },
      {
        text: "AI โหราศาสตร์ที่ซ่อนระบบให้คำปรึกษาสุขภาพจิต",
        strong: true,
      },
      {
        text: ' ไว้เบื้องหลัง รองรับภาวะซึมเศร้า วัยชรา และวัยรุ่น โดยไม่ทำให้ผู้ใช้รู้สึกว่ากำลัง "ขอความช่วยเหลือ"',
      },
    ],
    tags: ["Mental Health", "RAG Counseling", "LINE OA", "Thai Astrology"],
  },
];

export const STUDIO_WORK_FILTERS: Array<{
  id: "all" | StudioIndustry;
  labelKey:
    | "workFilterAll"
    | "workFilterAi"
    | "workFilterLogistics"
    | "workFilterHealthcare"
    | "workFilterEnterprise"
    | "workFilterCreative";
}> = [
  { id: "all", labelKey: "workFilterAll" },
  { id: "ai", labelKey: "workFilterAi" },
  { id: "logistics", labelKey: "workFilterLogistics" },
  { id: "healthcare", labelKey: "workFilterHealthcare" },
  { id: "enterprise", labelKey: "workFilterEnterprise" },
  { id: "creative", labelKey: "workFilterCreative" },
];

export function studioBadgeClass(badge: StudioWorkBadge): string {
  if (badge === "deployed") return "studio-work-badge studio-work-badge-real";
  if (badge === "live") return "studio-work-badge studio-work-badge-live";
  if (badge === "saas") return "studio-work-badge studio-work-badge-saas";
  return "studio-work-badge studio-work-badge-industry";
}

export function studioBadgeLabel(badge: StudioWorkBadge, industryLabel: string): string {
  if (badge === "deployed") return "Deployed";
  if (badge === "live") return "Live";
  if (badge === "saas") return "SaaS";
  return industryLabel;
}

export const STUDIO_VISION_PROBLEMS = [
  {
    icon: "📡",
    title: "Bluetooth Collision",
    desc: "One patient wearing 3–5 devices means 3–5 competing Bluetooth signals. In a ward of 100 patients, signals collide — data gets lost before it reaches the doctor.",
  },
  {
    icon: "🗂️",
    title: "Fragmented Data",
    desc: "Glucose in App A. Heart rate in App B. Brain activity in App C. Physicians must context-switch across multiple platforms just to understand one patient.",
  },
  {
    icon: "🔋",
    title: "UX Complexity",
    desc: "Elderly patients must re-pair devices every time a sensor is replaced. That friction kills compliance — and breaks the continuity of data that clinical decisions depend on.",
  },
] as const;

export const STUDIO_VISION_DEVICES = [
  {
    id: "cgm",
    icon: "💉",
    label: "CGM",
    tone: "cyan" as const,
    sub: ["Glucose Monitor", "Disposable Pad"],
  },
  {
    id: "core",
    icon: "❤️",
    label: "Core Unit",
    tone: "purple" as const,
    sub: ["ECG + SpO2", "Activity · BT Hub"],
  },
  {
    id: "eeg",
    icon: "🧠",
    label: "EEG",
    tone: "cyan" as const,
    sub: ["In-ear Brainwave", "Seizure · Sleep"],
  },
] as const;

export const STUDIO_VISION_FEATURES = [
  {
    num: "BREAKTHROUGH 01",
    title: "Magnetic Pogo Pin Connection",
    parts: [
      { text: "The CGM Disposable Pad connects to the Core Unit via " },
      { text: "Magnetic Pogo Pin", strong: true },
      {
        text: ". Replace the pad without re-pairing. Seamless reconnection — zero friction for the patient.",
      },
    ],
  },
  {
    num: "BREAKTHROUGH 02",
    title: "Single Bluetooth Source",
    parts: [
      { text: "One patient = " },
      { text: "one Bluetooth signal", strong: true },
      {
        text: " from the Core Unit only. Eliminates signal collision in clinical environments and prevents misidentification via Unique Device ID.",
      },
    ],
  },
  {
    num: "BREAKTHROUGH 03",
    title: "Medical Internet Architecture",
    parts: [
      { text: "All sensor data converges in a " },
      { text: "unified platform", strong: true },
      {
        text: ". Physicians get a real-time full picture of every patient — laying the foundation for a true ",
      },
      { text: "Medical Internet.", strong: true },
    ],
  },
] as const;

export const STUDIO_VISION_MIRRORS = [
  {
    icon: "🔭",
    title: "You see a problem others overlook",
    before: "There's a pain point in your industry that nobody has truly solved yet.",
    em: "Tell me about it — we might build it together.",
  },
  {
    icon: "⚡",
    title: "You have the domain. You need the technology.",
    before:
      "Deep expertise in your field, but no clear path to building the system around it.",
    em: "That's exactly where I come in.",
  },
  {
    icon: "🧩",
    title: "You have the vision. You're missing a piece.",
    before:
      "The big picture is clear — but you haven't found someone who speaks both business and technology fluently.",
    em: "Let's tune until it fits.",
  },
  {
    icon: "🌏",
    title: "You simply see the same thing.",
    before:
      "No agenda required. You just believe that infrastructure changes the world more than any single feature ever will.",
    em: "That's enough.",
  },
] as const;

export const STUDIO_CONTACT_EXPECTATIONS = [
  { text: "No auto-replies. No assistants. Just me." },
  {
    parts: [
      { text: "I respond within " },
      { text: "24–48 hours", strong: true },
      { text: " to every serious inquiry." },
    ],
  },
  { text: "If your message is vague, I'll ask a question — not ignore it." },
  { text: "The best conversations start with a single honest sentence." },
] as const;
