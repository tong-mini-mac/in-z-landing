export type StudioLang = "en" | "th";
export type LocalizedText = Record<StudioLang, string>;
export type LocalizedPart = { text: string; strong?: boolean };
export type LocalizedParts = Record<StudioLang, LocalizedPart[]>;

export type StudioIndustry =
  | "ai"
  | "logistics"
  | "healthcare"
  | "enterprise"
  | "creative";

export type StudioWorkBadge = "deployed" | "live" | "saas" | "industry";

export type StudioStackTag = {
  label: LocalizedText;
  highlight?: boolean;
};

export type StudioStackGroup = {
  id: string;
  label: LocalizedText;
  variant?: "default" | "now";
  tags: StudioStackTag[];
};

export type StudioTimelineItem = {
  title: LocalizedText;
  sub: LocalizedText;
};

export type StudioWork = {
  id: string;
  number: string;
  industry: StudioIndustry;
  icon: string;
  badges: StudioWorkBadge[];
  name: LocalizedText;
  tagline: LocalizedText;
  industryLabel: LocalizedText;
  problem: LocalizedParts;
  tags: string[];
};

export type StudioContactExpectation =
  | { text: LocalizedText }
  | { parts: LocalizedParts };

export const STUDIO_TIMELINE: StudioTimelineItem[] = [
  {
    title: {
      en: "B.Sc. General Science",
      th: "B.Sc. General Science",
    },
    sub: {
      en: "Chulalongkorn University",
      th: "Chulalongkorn University",
    },
  },
  {
    title: {
      en: "M.Sc. Renewable Energy",
      th: "M.Sc. Renewable Energy",
    },
    sub: {
      en: "Naresuan University",
      th: "Naresuan University",
    },
  },
  {
    title: {
      en: "22 Years — Operations & Supply Chain",
      th: "22 ปี — Operations & Supply Chain",
    },
    sub: {
      en: "Procurement · Logistics · Strategic Sourcing · Contract Management",
      th: "จัดซื้อจัดจ้าง · โลจิสติกส์ · Strategic Sourcing · บริหารสัญญา",
    },
  },
  {
    title: {
      en: "AI & Systems — Self-Taught",
      th: "AI & Systems — เรียนรู้ด้วยตนเอง",
    },
    sub: {
      en: "LLM · AI Agents · Solution Architecture · 11 Production Systems",
      th: "LLM · AI Agents · Solution Architecture · 11 ระบบที่ใช้งานจริง",
    },
  },
];

export const STUDIO_STACKS: StudioStackGroup[] = [
  {
    id: "ai",
    label: {
      en: "AI & Intelligence",
      th: "AI และระบบอัจฉริยะ",
    },
    tags: [
      { label: { en: "Large Language Models", th: "Large Language Models" }, highlight: true },
      { label: { en: "AI Agents", th: "AI Agents" }, highlight: true },
      { label: { en: "Agent Orchestration", th: "Agent Orchestration" }, highlight: true },
      { label: { en: "Prompt Engineering", th: "Prompt Engineering" } },
      { label: { en: "MLflow", th: "MLflow" } },
      { label: { en: "HITL Governance", th: "HITL Governance" } },
      { label: { en: "AI Operations", th: "AI Operations" } },
    ],
  },
  {
    id: "systems",
    label: {
      en: "Systems & Architecture",
      th: "ระบบและสถาปัตยกรรม",
    },
    tags: [
      { label: { en: "Solution Architecture", th: "Solution Architecture" }, highlight: true },
      { label: { en: "Systems Design", th: "Systems Design" }, highlight: true },
      { label: { en: "Digital Transformation", th: "Digital Transformation" } },
      { label: { en: "Business Process Automation", th: "Business Process Automation" } },
      { label: { en: "Autonomous Workflows", th: "Autonomous Workflows" } },
      { label: { en: "Game Theory", th: "Game Theory" } },
    ],
  },
  {
    id: "domain",
    label: {
      en: "Domain Expertise — 22 Years",
      th: "ความเชี่ยวชาญโดเมน — 22 ปี",
    },
    tags: [
      { label: { en: "Strategic Procurement", th: "จัดซื้อเชิงกลยุทธ์" } },
      { label: { en: "Supply Chain Optimization", th: "เพิ่มประสิทธิภาพซัพพลายเชน" } },
      { label: { en: "Contract Management", th: "บริหารสัญญา" } },
      { label: { en: "Global Sourcing", th: "จัดหาทั่วโลก" } },
      { label: { en: "Logistics Management", th: "บริหารโลจิสติกส์" } },
      { label: { en: "Cost Engineering", th: "วิศวกรรมต้นทุน" } },
      { label: { en: "Inventory Planning", th: "วางแผนสินค้าคงคลัง" } },
      { label: { en: "3PL", th: "3PL" } },
    ],
  },
  {
    id: "now",
    label: {
      en: "Now Building",
      th: "กำลังสร้างตอนนี้",
    },
    variant: "now",
    tags: [
      { label: { en: "Medical-Grade AIoT", th: "Medical-Grade AIoT" } },
      { label: { en: "3-in-1 Wearable Ecosystem", th: "ระบบสวมใส่ 3-in-1" } },
      { label: { en: "Medical Internet", th: "Medical Internet" } },
    ],
  },
];

export const STUDIO_COPY = {
  en: {
    brand: "IN Z Studio",
    navHome: "Home",
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
    aboutBio3Mid:
      "across healthcare, enterprise automation, and beyond. The next frontier:",
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
    contactBtnPrimaryHref: "https://www.inz.lol/contact?channel=customer-service",
    contactBtnSecondary: "LinkedIn",
    contactChannelsLabel: "Reach me directly",
    contactChannelEmail: "Email",
    contactChannelLinkedIn: "LinkedIn",
    contactChannelWeb: "Website",
    contactResponseLabel: "What to expect",
    contactResponseTitle: "I read every message personally",
    contactHintTitle: "Not sure what to say?",
    contactHintBefore:
      "Start with the problem you're trying to solve. One paragraph is enough.",
    contactHintStrong: "The rest we figure out together.",
    contactFooterName: "Vittaya Lertbuasin",
    contactFooterSub: "Domain Architect · AI Systems · inz.lol",
    contactFooterCopy: "© 2026 Vittaya Lertbuasin",
    contactEmail: "info@inz.lol",
    contactEmailHref: "mailto:info@inz.lol",
    contactLinkedIn: "linkedin.com/in/vittaya-lertbuiasin-13b258149",
    contactLinkedInHref:
      "https://www.linkedin.com/in/vittaya-lertbuiasin-13b258149/",
    contactWeb: "inz.lol",
    contactWebHref: "https://www.inz.lol",
  },
  th: {
    brand: "IN Z Studio",
    navHome: "หน้าแรก",
    navAbout: "เกี่ยวกับ",
    navWork: "ผลงาน",
    navVision: "วิสัยทัศน์",
    navTalk: "ติดต่อ",
    heroTag: "พร้อมร่วมงานที่ใช่",
    heroLine1: "ฉันไม่ได้แค่เขียนโค้ด",
    heroLine2: "ฉันสร้างโครงสร้างพื้นฐาน",
    heroSubBefore: "สถาปนิกระบบฟูลสแตกที่สร้าง",
    heroSubStrong1: "ระบบองค์กรพร้อมใช้งานจริง",
    heroSubMid: "ครอบคลุมสุขภาพ โลจิสติกส์ และการทำงานอัตโนมัติ",
    heroSubNow: "ตอนนี้ออกแบบ",
    heroSubStrong2: "ระบบนิเวศ AIoT เกรดการแพทย์",
    heroSubAfter:
      "— โครงสร้างพื้นฐานสุขภาพแบบสวมใส่ สำหรับการดูแลผู้ป่วยยุคถัดไป",
    proofSystems: "ระบบที่สร้างแล้ว",
    proofReady: "พร้อมใช้งานจริง",
    proofIndustries: "อุตสาหกรรม",
    proofVision: "วิสัยทัศน์",
    heroCtaWork: "ดูผลงาน",
    heroCtaVision: "วิสัยทัศน์",
    scrollHint: "เลื่อน",
    aboutLabel: "เกี่ยวกับ",
    aboutName: "Vittaya Lertbuasin",
    aboutRole: "สถาปนิกโดเมน",
    aboutQuoteBefore: "คนส่วนใหญ่เห็นปัญหาแล้วหาเครื่องมือ",
    aboutQuoteMid: "ฉันเห็นปัญหาแล้วสร้าง",
    aboutQuoteStrong: "โครงสร้างพื้นฐาน",
    aboutQuoteAfter: "ที่ทำให้เครื่องมือนั้นไม่จำเป็นอีกต่อไป",
    aboutBio1Before: "ด้วย",
    aboutBio1Strong: "ประสบการณ์ปฏิบัติการ 22 ปี",
    aboutBio1After:
      "ในซัพพลายเชน จัดซื้อจัดจ้าง และโลจิสติกส์ — ฉันเคยอยู่ในระบบที่พังซึ่งคนส่วนใหญ่แค่ได้อ่าน",
    aboutBio2Before:
      "ประสบการณ์นั้นกลายเป็นรากฐาน เมื่อ AI กลายเป็นเครื่องมือวิศวกรรมจริง ฉันไม่ได้แค่หยิบใช้ — ฉัน",
    aboutBio2Strong: "สร้างเวิร์กโฟลว์ใหม่ทั้งหมดจากศูนย์",
    aboutBio3Before: "วันนี้ฉันออกแบบและสร้าง",
    aboutBio3Strong1: "ระบบ AI พร้อมใช้งานจริง",
    aboutBio3Mid:
      "ครอบคลุมสุขภาพ ระบบอัตโนมัติขององค์กร และอื่นๆ ขอบเขตถัดไปคือ",
    aboutBio3Strong2: "โครงสร้างพื้นฐาน AIoT เกรดการแพทย์",
    aboutBio3After: "สำหรับการดูแลผู้ป่วยยุคถัดไป",
    aboutSelfTaught:
      "AI และวิศวกรรม — เรียนรู้ด้วยความอยากรู้ ไม่ใช่หลักสูตร",
    workLabel: "ผลงาน",
    workTitleLine: "11 ระบบ",
    workTitleAccent: "พร้อมใช้งานจริง",
    workFilterAll: "ทั้งหมด (11)",
    workFilterAi: "AI และการทำงานอัตโนมัติ",
    workFilterLogistics: "โลจิสติกส์",
    workFilterHealthcare: "สุขภาพ",
    workFilterEnterprise: "องค์กร",
    workFilterCreative: "ครีเอทีฟ",
    visionLabel: "วิสัยทัศน์",
    visionManifestoLine1: "ระบบสุขภาพพัง",
    visionManifestoLine2Before: "ที่ระดับ",
    visionManifestoGrad: "โครงสร้างพื้นฐาน",
    visionManifestoP1Before: "ข้อมูลสุขภาพของผู้ป่วยกระจัดกระจายอยู่บน",
    visionManifestoP1Strong:
      "หลายอุปกรณ์ หลายแอป หลายสัญญาณ Bluetooth",
    visionManifestoP1Mid:
      "— โดยไม่มีระบบกลางที่รวบรวม วิเคราะห์ และส่งมอบแบบเรียลไทม์ นี่ไม่ใช่ปัญหาซอฟต์แวร์ แต่เป็น",
    visionManifestoP1Strong2: "ปัญหาโครงสร้างพื้นฐาน",
    visionSolutionTitle: "ระบบนิเวศอุปกรณ์สวมใส่ทางการแพทย์ 3-in-1",
    visionSolutionSub:
      "หนึ่งอุปกรณ์ หนึ่งสัญญาณ Bluetooth ข้อมูลสรีรวิทยาครบชุด",
    visionDivider: "ทางออก",
    visionQuoteLine1: "เป้าหมายไม่ใช่อุปกรณ์สวมใส่ที่ดีขึ้น",
    visionQuoteLine2: "เป้าหมายคือการสร้าง",
    visionQuoteGrad: "Medical Internet",
    visionQuoteBody:
      "โครงสร้างพื้นฐานที่เชื่อมข้อมูลสุขภาพของทุกคน — แบบเดียวกับที่อินเทอร์เน็ตเชื่อมข้อมูลของโลก นั่นคือมรดกที่กำลังถูกสร้าง",
    visionAlignLabel: "มาจูนให้ตรงกัน",
    visionAlignHeadingBefore: "ฉันได้แสดงแล้วว่า",
    visionAlignHeadingGrad: "กำลังสร้างอะไรอยู่",
    visionAlignHeadingAfter: "วิสัยทัศน์ของคุณคืออะไร?",
    visionAlignP1Before: "11 ระบบที่ใช้งานจริงคือหลักฐาน ไม่ใช่สไลด์พิตช์ —",
    visionAlignP1Strong: "โครงสร้างพื้นฐานจริง ที่สร้างและส่งมอบแล้ว",
    visionAlignP2Before:
      "ฉันไม่ได้มองหาคนที่ตรงกับคำบรรยายงาน ฉันมองหาคนที่มี",
    visionAlignP2Strong: "วิสัยทัศน์ของตัวเอง",
    visionAlignP2After: "— เพื่อที่เราจะจูนจนเข้ากันได้",
    visionAlignP3Before:
      "ไม่ว่าคุณจะเป็นผู้สร้าง นักลงทุน ผู้เชี่ยวชาญโดเมน หรือเพียงแค่",
    visionAlignP3Strong: "คนที่เห็นปัญหาเดียวกัน",
    visionAlignP3After: "— มาคุยกัน",
    visionCta: "เริ่มบทสนทนา",
    visionCtaHref: "mailto:vittaya@inz.lol",
    contactLabel: "ติดต่อ",
    contactAvail: "พร้อมสำหรับบทสนทนาที่ใช่",
    contactHeroLine1: "มาสร้าง",
    contactHeroGrad: "สิ่งที่จับต้องได้",
    contactHeroDim: "ไม่ใช่สักวันหนึ่ง",
    contactHeroPBefore:
      "ถ้าคุณอ่านมาถึงตรงนี้ คุณคงไม่ได้มาโดยบังเอิญ คุณมีปัญหา มีวิสัยทัศน์ หรือมีคำถาม",
    contactHeroPStrong: "นั่นคือคุณสมบัติเดียวที่ต้องการ",
    contactBtnPrimary: "ส่งข้อความ",
    contactBtnPrimaryHref: "https://www.inz.lol/contact?channel=customer-service",
    contactBtnSecondary: "LinkedIn",
    contactChannelsLabel: "ติดต่อโดยตรง",
    contactChannelEmail: "อีเมล",
    contactChannelLinkedIn: "LinkedIn",
    contactChannelWeb: "เว็บไซต์",
    contactResponseLabel: "สิ่งที่คาดหวังได้",
    contactResponseTitle: "ฉันอ่านทุกข้อความด้วยตัวเอง",
    contactHintTitle: "ไม่แน่ใจว่าจะพูดอะไร?",
    contactHintBefore:
      "เริ่มจากปัญหาที่คุณกำลังพยายามแก้ แค่ย่อหน้าเดียวก็พอ",
    contactHintStrong: "ที่เหลือเราคิดด้วยกัน",
    contactFooterName: "Vittaya Lertbuasin",
    contactFooterSub: "สถาปนิกโดเมน · ระบบ AI · inz.lol",
    contactFooterCopy: "© 2026 Vittaya Lertbuasin",
    contactEmail: "info@inz.lol",
    contactEmailHref: "mailto:info@inz.lol",
    contactLinkedIn: "linkedin.com/in/vittaya-lertbuiasin-13b258149",
    contactLinkedInHref:
      "https://www.linkedin.com/in/vittaya-lertbuiasin-13b258149/",
    contactWeb: "inz.lol",
    contactWebHref: "https://www.inz.lol",
  },
};

export const STUDIO_WORKS: StudioWork[] = [
  {
    id: "procurement",
    number: "01",
    industry: "enterprise",
    icon: "📋",
    badges: ["deployed", "industry"],
    name: {
      en: "Procurement System",
      th: "Procurement System",
    },
    tagline: {
      en: "Public Procurement Act B.E. 2560 Compliance Engine",
      th: "พ.ร.บ. จัดซื้อจัดจ้าง 2560 Compliance Engine",
    },
    industryLabel: { en: "Enterprise", th: "องค์กร" },
    problem: {
      en: [
        {
          text: "Government paperwork that depends on repetitive copy-paste creates frequent errors. This system ",
        },
        { text: "reads PDFs automatically with OCR", strong: true },
        {
          text: " and fills every form correctly under Thailand's Public Procurement Act B.E. 2560.",
        },
      ],
      th: [
        {
          text: "เอกสารราชการที่ต้อง copy-paste ซ้ำๆ ทำให้เกิดข้อผิดพลาดบ่อยครั้ง ระบบนี้ ",
        },
        { text: "อ่าน PDF อัตโนมัติ ด้วย OCR", strong: true },
        {
          text: " แล้วเติมแบบฟอร์มทั้งหมดให้ถูกต้องตาม พ.ร.บ. จัดซื้อจัดจ้าง 2560",
        },
      ],
    },
    tags: ["FastAPI", "OCR", "AI Chat", "Word Template"],
  },
  {
    id: "logistic-risk",
    number: "02",
    industry: "logistics",
    icon: "🗺️",
    badges: ["saas", "industry"],
    name: {
      en: "Logistic Strategic Engine",
      th: "Logistic Strategic Engine",
    },
    tagline: {
      en: "Real-time Route Risk Intelligence",
      th: "วิเคราะห์ความเสี่ยงเส้นทางแบบเรียลไทม์",
    },
    industryLabel: { en: "Logistics", th: "โลจิสติกส์" },
    problem: {
      en: [
        {
          text: "Route intelligence is scattered, forcing teams to judge safety by hand. This system combines ",
        },
        { text: "weather, geopolitics, and natural-disaster signals", strong: true },
        {
          text: " and scores each route's risk in real time.",
        },
      ],
      th: [
        {
          text: "ข้อมูลเส้นทางกระจัดกระจาย ต้องวิเคราะห์เองว่าเส้นทางไหนปลอดภัย ระบบนี้รวม ",
        },
        { text: "สภาพอากาศ ข่าวภูมิรัฐศาสตร์ ภัยธรรมชาติ", strong: true },
        {
          text: " แล้วให้คะแนนความเสี่ยงแต่ละเส้นทางแบบ real-time",
        },
      ],
    },
    tags: ["Risk Scoring", "Geopolitics", "AIR/SEA/TRUCK", "Compliance"],
  },
  {
    id: "greencargo",
    number: "03",
    industry: "logistics",
    icon: "🌿",
    badges: ["saas", "industry"],
    name: {
      en: "GreenCargo",
      th: "GreenCargo",
    },
    tagline: {
      en: "Carbon Credit for Transport",
      th: "Carbon Credit สำหรับการขนส่ง",
    },
    industryLabel: { en: "Logistics", th: "โลจิสติกส์" },
    problem: {
      en: [
        {
          text: "EU exporters lack carbon reports that meet TGO standards. This system ",
        },
        { text: "calculates CO₂ automatically", strong: true },
        {
          text: ", generates GHG reports, and alerts when vehicles need service to cut fuel waste.",
        },
      ],
      th: [
        {
          text: "ผู้ส่งออกไป EU ขาด Carbon Report ที่ได้มาตรฐาน TGO ระบบนี้ ",
        },
        { text: "คำนวณ CO₂ อัตโนมัติ", strong: true },
        {
          text: " ออก GHG Report และแจ้งเตือนเมื่อรถควรเข้าซ่อมเพื่อลดการสิ้นเปลืองน้ำมัน",
        },
      ],
    },
    tags: ["Carbon Credit", "TGO", "EU Export", "Fleet Management"],
  },
  {
    id: "prism",
    number: "04",
    industry: "ai",
    icon: "🏢",
    badges: ["saas", "industry"],
    name: {
      en: "PRISM by SRAG",
      th: "PRISM by SRAG",
    },
    tagline: {
      en: "Real Estate AI Lead Engine",
      th: "AI Lead Engine สำหรับอสังหาริมทรัพย์",
    },
    industryLabel: { en: "AI", th: "AI" },
    problem: {
      en: [
        {
          text: "Buyers walk away when they cannot find the right project. PRISM uses an ",
        },
        { text: "SRAG engine to match customer intent", strong: true },
        {
          text: " to the right developments and nurtures not-yet-ready leads into future buyers.",
        },
      ],
      th: [
        {
          text: "ลูกค้าเดินออกจากโครงการเพราะไม่เจอสิ่งที่ใช่ PRISM ใช้ ",
        },
        { text: "SRAG Engine จับคู่ Intent ลูกค้า", strong: true },
        {
          text: " กับโครงการที่เหมาะสม และดูแล Lead ที่ยังไม่พร้อมซื้อให้กลายเป็น Buyer ในอนาคต",
        },
      ],
    },
    tags: ["SRAG", "Intent Classification", "Lead Nurturing", "Vector Search"],
  },
  {
    id: "erp",
    number: "05",
    industry: "enterprise",
    icon: "⚙️",
    badges: ["saas", "industry"],
    name: {
      en: "Universal ERP",
      th: "Universal ERP",
    },
    tagline: {
      en: "Modular ERP for SME",
      th: "ERP แบบโมดูลสำหรับ SME",
    },
    industryLabel: { en: "Enterprise", th: "องค์กร" },
    problem: {
      en: [
        {
          text: "SMEs cannot afford enterprise ERP stacks. This platform delivers ",
        },
        {
          text: "Finance, HR, Stock, Procurement, and Marketing",
          strong: true,
        },
        {
          text: " in one place — pick the modules you need, with industry templates for restaurants, clinics, and beauty.",
        },
      ],
      th: [
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
    },
    tags: ["FastAPI", "Multi-Industry", "DIY Modules", "AI CFO"],
  },
  {
    id: "qa-lab",
    number: "06",
    industry: "ai",
    icon: "🔬",
    badges: ["saas", "industry"],
    name: {
      en: "QA LAB",
      th: "QA LAB",
    },
    tagline: {
      en: "AI-Powered Product Readiness",
      th: "ความพร้อมผลิตภัณฑ์ด้วย AI",
    },
    industryLabel: { en: "AI", th: "AI" },
    problem: {
      en: [
        {
          text: "QA teams lack readiness tools before launch. QA LAB ",
        },
        { text: "simulates user personas and load scenarios", strong: true },
        {
          text: ", analyzes with ML, and reports weak points before production fails.",
        },
      ],
      th: [
        {
          text: "ทีม QA ขาดเครื่องมือทดสอบความพร้อมก่อน Launch QA LAB ",
        },
        { text: "จำลอง User Persona และ Load Scenarios", strong: true },
        {
          text: " วิเคราะห์ด้วย ML แล้วรายงานจุดอ่อนก่อนระบบล่มจริง",
        },
      ],
    },
    tags: ["Load Simulation", "Persona Testing", "ML Anomaly", "Appium"],
  },
  {
    id: "synthcomm",
    number: "07",
    industry: "ai",
    icon: "🧬",
    badges: ["saas", "industry"],
    name: {
      en: "SynthComm",
      th: "SynthComm",
    },
    tagline: {
      en: "Thai Synthetic Data Factory",
      th: "โรงงานข้อมูลสังเคราะห์ภาษาไทย",
    },
    industryLabel: { en: "AI", th: "AI" },
    problem: {
      en: [
        {
          text: "Training AI needs volume, but real conversation data collides with PDPA. SynthComm ",
        },
        { text: "generates high-fidelity Thai synthetic data", strong: true },
        {
          text: " through a multi-agent factory with automated monthly ML retraining.",
        },
      ],
      th: [
        {
          text: "การ Train AI ต้องการข้อมูลจำนวนมาก แต่ข้อมูลจริงติดปัญหา PDPA SynthComm ",
        },
        { text: "สร้าง Synthetic Data ภาษาไทยคุณภาพสูง", strong: true },
        {
          text: " ด้วย Multi-Agent Factory พร้อม Monthly ML Retraining อัตโนมัติ",
        },
      ],
    },
    tags: ["Multi-Agent", "Thai NLP", "PDPA Safe", "Auto-Scale"],
  },
  {
    id: "content-creator",
    number: "08",
    industry: "creative",
    icon: "🎬",
    badges: ["saas", "industry"],
    name: {
      en: "Content Creator",
      th: "Content Creator",
    },
    tagline: {
      en: "One-Stop Short Video & Podcast",
      th: "วิดีโอสั้นและพอดแคสต์ครบในที่เดียว",
    },
    industryLabel: { en: "Creative", th: "ครีเอทีฟ" },
    problem: {
      en: [
        {
          text: "Creators juggle multiple apps to ship content. This platform finishes in one place: ",
        },
        { text: "Script → TTS → MP4 (9:16)", strong: true },
        {
          text: " — for TikTok / IG / X, plus podcasts in Northern, Isaan, and Southern Thai dialects, Vietnamese, and Indonesian.",
        },
      ],
      th: [
        {
          text: "Creator ต้องใช้หลายแอปในการผลิต Content ระบบนี้จบในที่เดียว: ",
        },
        { text: "Script → TTS → MP4 (9:16)", strong: true },
        {
          text: " รองรับ TikTok/IG/X และ Podcast ภาษาถิ่น เหนือ อีสาน ใต้ รวมถึงเวียดนามและอินโดนีเซีย",
        },
      ],
    },
    tags: ["Video AI", "TTS", "Podcast", "SEA Languages"],
  },
  {
    id: "drama",
    number: "09",
    industry: "creative",
    icon: "🎭",
    badges: ["industry"],
    name: {
      en: "Drama Studio",
      th: "Drama Studio",
    },
    tagline: {
      en: "AI Series Production Pipeline",
      th: "ไปป์ไลน์ผลิตซีรีส์ด้วย AI",
    },
    industryLabel: { en: "Creative", th: "ครีเอทีฟ" },
    problem: {
      en: [
        {
          text: "Series animation production forces data hops across many tools. Drama Studio unifies ",
        },
        { text: "Script → Brief → Draft → Production", strong: true },
        {
          text: " in one pipeline — cutting production time and cost significantly.",
        },
      ],
      th: [
        {
          text: "การผลิต Series Animation ต้องโยกย้ายข้อมูลระหว่างหลายแอป Drama Studio รวม ",
        },
        { text: "Script → Brief → Draft → Production", strong: true },
        {
          text: " ไว้ในที่เดียว ลดเวลาและต้นทุนการผลิตอย่างมีนัยสำคัญ",
        },
      ],
    },
    tags: ["FastAPI", "Script AI", "Animation", "Web UI"],
  },
  {
    id: "music",
    number: "10",
    industry: "creative",
    icon: "🎵",
    badges: ["industry"],
    name: {
      en: "MyClaw Music",
      th: "MyClaw Music",
    },
    tagline: {
      en: "Human-Soul Music Demo Tool",
      th: "เครื่องมือเดโมเพลงที่มีจิตวิญญาณ",
    },
    industryLabel: { en: "Creative", th: "ครีเอทีฟ" },
    problem: {
      en: [
        {
          text: "Songwriters lose time coordinating lyricists and composers. MyClaw helps ",
        },
        {
          text: "draft demos that keep the author's voice",
          strong: true,
        },
        { text: " — not fast, soulless AI tracks." },
      ],
      th: [
        {
          text: "นักแต่งเพลงต้องประสานงานระหว่างคนคิดคำร้องและทำนอง ใช้เวลานาน MyClaw ช่วย ",
        },
        {
          text: "ร่างเพลง Demo ที่มีจิตวิญญาณของผู้แต่ง",
          strong: true,
        },
        { text: " ไม่ใช่เพลง AI ที่เร็วแต่ไร้ตัวตน" },
      ],
    },
    tags: ["Next.js", "Music AI", "Gen Z", "HITL"],
  },
  {
    id: "netr",
    number: "11",
    industry: "healthcare",
    icon: "🌟",
    badges: ["live", "industry"],
    name: {
      en: "NETR",
      th: "NETR (เนตร)",
    },
    tagline: {
      en: "Mental Health Behind the Stars",
      th: "สุขภาพจิตที่ซ่อนอยู่เบื้องหลังดวงดาว",
    },
    industryLabel: { en: "Healthcare", th: "สุขภาพ" },
    problem: {
      en: [
        {
          text: "People under life stress often seek relief through astrology. NETR is an ",
        },
        {
          text: "astrology AI with mental-health counseling behind the scenes",
          strong: true,
        },
        {
          text: ' — supporting depression, aging, and youth without making users feel like they are "asking for help."',
        },
      ],
      th: [
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
    },
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

export function studioBadgeLabel(
  badge: StudioWorkBadge,
  industryLabel: string,
  lang: StudioLang,
): string {
  if (badge === "deployed") return lang === "th" ? "ใช้งานจริง" : "Deployed";
  if (badge === "live") return lang === "th" ? "เปิดใช้แล้ว" : "Live";
  if (badge === "saas") return "SaaS";
  return industryLabel;
}

export const STUDIO_VISION_PROBLEMS: Array<{
  icon: string;
  title: LocalizedText;
  desc: LocalizedText;
}> = [
  {
    icon: "📡",
    title: {
      en: "Bluetooth Collision",
      th: "สัญญาณ Bluetooth ชนกัน",
    },
    desc: {
      en: "One patient wearing 3–5 devices means 3–5 competing Bluetooth signals. In a ward of 100 patients, signals collide — data gets lost before it reaches the doctor.",
      th: "ผู้ป่วยหนึ่งคนสวม 3–5 อุปกรณ์ หมายถึง 3–5 สัญญาณ Bluetooth ที่แย่งกัน ในวอร์ด 100 คน สัญญาณชนกัน — ข้อมูลหายก่อนถึงมือแพทย์",
    },
  },
  {
    icon: "🗂️",
    title: {
      en: "Fragmented Data",
      th: "ข้อมูลกระจัดกระจาย",
    },
    desc: {
      en: "Glucose in App A. Heart rate in App B. Brain activity in App C. Physicians must context-switch across multiple platforms just to understand one patient.",
      th: "น้ำตาลในแอป A ชีพจรในแอป B คลื่นสมองในแอป C แพทย์ต้องสลับหลายแพลตฟอร์มแค่เพื่อเข้าใจผู้ป่วยหนึ่งคน",
    },
  },
  {
    icon: "🔋",
    title: {
      en: "UX Complexity",
      th: "UX ที่ซับซ้อน",
    },
    desc: {
      en: "Elderly patients must re-pair devices every time a sensor is replaced. That friction kills compliance — and breaks the continuity of data that clinical decisions depend on.",
      th: "ผู้ป่วยสูงอายุต้องจับคู่เครื่องมือใหม่ทุกครั้งที่เปลี่ยนเซ็นเซอร์ ความฝืดนั้นทำลายการใช้งานต่อเนื่อง — และขาดตอนของข้อมูลที่การตัดสินใจทางคลินิกต้องพึ่ง",
    },
  },
];

export const STUDIO_VISION_DEVICES: Array<{
  id: string;
  icon: string;
  label: LocalizedText;
  tone: "cyan" | "purple";
  sub: Record<StudioLang, [string, string]>;
}> = [
  {
    id: "cgm",
    icon: "💉",
    label: { en: "CGM", th: "CGM" },
    tone: "cyan",
    sub: {
      en: ["Glucose Monitor", "Disposable Pad"],
      th: ["เครื่องวัดน้ำตาล", "แผ่นใช้แล้วทิ้ง"],
    },
  },
  {
    id: "core",
    icon: "❤️",
    label: { en: "Core Unit", th: "Core Unit" },
    tone: "purple",
    sub: {
      en: ["ECG + SpO2", "Activity · BT Hub"],
      th: ["ECG + SpO2", "กิจกรรม · BT Hub"],
    },
  },
  {
    id: "eeg",
    icon: "🧠",
    label: { en: "EEG", th: "EEG" },
    tone: "cyan",
    sub: {
      en: ["In-ear Brainwave", "Seizure · Sleep"],
      th: ["คลื่นสมองในหู", "ชัก · นอนหลับ"],
    },
  },
];

export const STUDIO_VISION_FEATURES: Array<{
  num: LocalizedText;
  title: LocalizedText;
  parts: LocalizedParts;
}> = [
  {
    num: { en: "BREAKTHROUGH 01", th: "ความก้าวหน้า 01" },
    title: {
      en: "Magnetic Pogo Pin Connection",
      th: "การเชื่อมต่อ Magnetic Pogo Pin",
    },
    parts: {
      en: [
        { text: "The CGM Disposable Pad connects to the Core Unit via " },
        { text: "Magnetic Pogo Pin", strong: true },
        {
          text: ". Replace the pad without re-pairing. Seamless reconnection — zero friction for the patient.",
        },
      ],
      th: [
        { text: "แผ่น CGM ใช้แล้วทิ้งเชื่อมกับ Core Unit ผ่าน " },
        { text: "Magnetic Pogo Pin", strong: true },
        {
          text: " เปลี่ยนแผ่นโดยไม่ต้องจับคู่ใหม่ เชื่อมต่อต่อเนื่อง — ไม่มีแรงเสียดทานสำหรับผู้ป่วย",
        },
      ],
    },
  },
  {
    num: { en: "BREAKTHROUGH 02", th: "ความก้าวหน้า 02" },
    title: {
      en: "Single Bluetooth Source",
      th: "แหล่ง Bluetooth เดียว",
    },
    parts: {
      en: [
        { text: "One patient = " },
        { text: "one Bluetooth signal", strong: true },
        {
          text: " from the Core Unit only. Eliminates signal collision in clinical environments and prevents misidentification via Unique Device ID.",
        },
      ],
      th: [
        { text: "ผู้ป่วยหนึ่งคน = " },
        { text: "หนึ่งสัญญาณ Bluetooth", strong: true },
        {
          text: " จาก Core Unit เท่านั้น กำจัดสัญญาณชนกันในสภาพแวดล้อมทางคลินิก และป้องกันการระบุตัวผิดด้วย Unique Device ID",
        },
      ],
    },
  },
  {
    num: { en: "BREAKTHROUGH 03", th: "ความก้าวหน้า 03" },
    title: {
      en: "Medical Internet Architecture",
      th: "สถาปัตยกรรม Medical Internet",
    },
    parts: {
      en: [
        { text: "All sensor data converges in a " },
        { text: "unified platform", strong: true },
        {
          text: ". Physicians get a real-time full picture of every patient — laying the foundation for a true ",
        },
        { text: "Medical Internet.", strong: true },
      ],
      th: [
        { text: "ข้อมูลเซ็นเซอร์ทั้งหมดรวมที่ " },
        { text: "แพลตฟอร์มเดียว", strong: true },
        {
          text: " แพทย์เห็นภาพรวมผู้ป่วยแบบเรียลไทม์ — เป็นรากฐานของ ",
        },
        { text: "Medical Internet", strong: true },
        { text: " อย่างแท้จริง" },
      ],
    },
  },
];

export const STUDIO_VISION_MIRRORS: Array<{
  icon: string;
  title: LocalizedText;
  before: LocalizedText;
  em: LocalizedText;
}> = [
  {
    icon: "🔭",
    title: {
      en: "You see a problem others overlook",
      th: "คุณเห็นปัญหาที่คนอื่นมองข้าม",
    },
    before: {
      en: "There's a pain point in your industry that nobody has truly solved yet.",
      th: "มีจุดเจ็บปวดในอุตสาหกรรมของคุณที่ยังไม่มีใครแก้ได้จริง",
    },
    em: {
      en: "Tell me about it — we might build it together.",
      th: "เล่ามา — เราอาจสร้างมันด้วยกัน",
    },
  },
  {
    icon: "⚡",
    title: {
      en: "You have the domain. You need the technology.",
      th: "คุณมีโดเมน คุณต้องการเทคโนโลยี",
    },
    before: {
      en: "Deep expertise in your field, but no clear path to building the system around it.",
      th: "เชี่ยวชาญลึกในสายของคุณ แต่ยังไม่มีทางชัดว่าจะสร้างระบบรอบมันอย่างไร",
    },
    em: {
      en: "That's exactly where I come in.",
      th: "นั่นคือจุดที่ฉันเข้ามา",
    },
  },
  {
    icon: "🧩",
    title: {
      en: "You have the vision. You're missing a piece.",
      th: "คุณมีวิสัยทัศน์ แต่ยังขาดชิ้นส่วน",
    },
    before: {
      en: "The big picture is clear — but you haven't found someone who speaks both business and technology fluently.",
      th: "ภาพใหญ่ชัดแล้ว — แต่ยังหาคนที่พูดทั้งธุรกิจและเทคโนโลยีได้อย่างคล่องไม่ได้",
    },
    em: {
      en: "Let's tune until it fits.",
      th: "มาจูนจนเข้ากัน",
    },
  },
  {
    icon: "🌏",
    title: {
      en: "You simply see the same thing.",
      th: "คุณแค่เห็นสิ่งเดียวกัน",
    },
    before: {
      en: "No agenda required. You just believe that infrastructure changes the world more than any single feature ever will.",
      th: "ไม่ต้องมีวาระ คุณแค่เชื่อว่าโครงสร้างพื้นฐานเปลี่ยนโลกได้มากกว่าฟีเจอร์ใดๆ",
    },
    em: {
      en: "That's enough.",
      th: "แค่นั้นก็พอ",
    },
  },
];

export const STUDIO_CONTACT_EXPECTATIONS: StudioContactExpectation[] = [
  {
    text: {
      en: "No auto-replies. No assistants. Just me.",
      th: "ไม่มีตอบอัตโนมัติ ไม่มีผู้ช่วย มีแค่ฉัน",
    },
  },
  {
    parts: {
      en: [
        { text: "I respond within " },
        { text: "24–48 hours", strong: true },
        { text: " to every serious inquiry." },
      ],
      th: [
        { text: "ฉันตอบภายใน " },
        { text: "24–48 ชั่วโมง", strong: true },
        { text: " สำหรับทุกคำถามที่จริงจัง" },
      ],
    },
  },
  {
    text: {
      en: "If your message is vague, I'll ask a question — not ignore it.",
      th: "ถ้าข้อความคลุมเครือ ฉันจะถามต่อ — ไม่เพิกเฉย",
    },
  },
  {
    text: {
      en: "The best conversations start with a single honest sentence.",
      th: "บทสนทนาที่ดีที่สุดเริ่มจากประโยคจริงใจแค่ประโยคเดียว",
    },
  },
];
