import type { LocalizedCatalogStory, LocalizedText } from "@/lib/product-catalog";

/** Plain-language catalog leads (what it is / who it's for) — Score Board style. */

export const SYNTHCOMM_DESCRIPTION: LocalizedText = {
  en: "Need Thai or SEA customer-chat data for AI training or product tests — without using real customer chats? SynthComm builds synthetic conversations for you. Open from your IN Z account, submit a topic and count, then download the data plus a job summary report.",
  th: "อยากได้ข้อมูลบทสนทนาลูกค้าภาษาไทยหรือ SEA ไว้เทรน AI / ทดสอบระบบ แต่ไม่อยากใช้แชทจริงของลูกค้า? SynthComm สร้างบทสนทนาสังเคราะห์ให้ คุณเปิดจากบัญชี IN Z ใส่หัวข้อกับจำนวน แล้วดาวน์โหลดข้อมูลพร้อมรายงานสรุปจ๊อบ",
};

export const QA_LAB_DESCRIPTION: LocalizedText = {
  en: "Want to know if your live website or API is healthy before customers hit it? QA LAB checks a real public URL, simulates user journeys, and shows findings. Free readiness needs no signup; full tests open from your IN Z account.",
  th: "อยากรู้ว่าระบบเว็บหรือ API ที่เปิดอยู่จริงพร้อมรับลูกค้าหรือยัง? QA LAB ตรวจจาก URL สาธารณะ จำลองพฤติกรรมผู้ใช้ แล้วสรุปจุดที่พบ ตรวจความพร้อมฟรีไม่ต้องสมัคร ส่วนเทสเต็มเปิดจากบัญชี IN Z",
};

export const MUSIC_DEMO_DESCRIPTION: LocalizedText = {
  en: "Want a song sketch you can take to a real instrument or studio — not a finished commercial track? Music Demo builds an Artist Blueprint (lyrics, chords, MIDI). Open from IN Z, create with credits, Confirm & Lock, then export. AI vocal is an optional add-on.",
  th: "อยากได้แบบร่างเพลงไปเล่นบนเครื่องจริงหรือส่งสตูดิโอ — ไม่ใช่ไฟล์สำเร็จรูปพร้อมขาย? Music Demo สร้าง Artist Blueprint (คำร้อง · คอร์ด · MIDI) เปิดจากบัญชี IN Z ใช้เครดิตสร้าง แล้ว Confirm & Lock เพื่อ Export เสียงร้อง AI เป็นแอดออนแยก",
};

export const CONTENT_CREATOR_DESCRIPTION: LocalizedText = {
  en: "Make podcasts and short AI videos in Thai dialects and SEA languages without juggling five tools. Open from IN Z, upload or chat a script, render, then publish. Fourteen-day trial, then pick a monthly plan by quota.",
  th: "อยากทำพอดแคสต์และวิดีโอสั้นภาษาถิ่นไทย / SEA โดยไม่ต้องสลับหลายแอป? Content Creator รวมอัปโหลด ถอดเสียง คลิป และเรนเดอร์วิดีโอไว้ที่เดียว เปิดจากบัญชี IN Z ทดลอง 14 วัน แล้วเลือกแพ็กตามโควตา",
};

export const NETR_DESCRIPTION: LocalizedText = {
  en: "Want a Thai karmic-astrology chat that remembers your birth chart — on the web only? Open NetR from your IN Z account, record your chart once, then chat. Five free minutes a day; not medical or psychiatric advice.",
  th: "อยากคุยโหราศาสตร์ไทยที่จำดวงเกิดของคุณได้ — บนเว็บอย่างเดียว? เปิดเนตรจากบัญชี IN Z จารึกดวงครั้งเดียว แล้วคุยได้ ฟรี 5 นาที/วัน ไม่ใช่คำปรึกษาทางการแพทย์หรือจิตเวช",
};

export const PRISM_DESCRIPTION: LocalizedText = {
  en: "Running real-estate leads and need to match intent to the right project — without every agent seeing every listing? PRISM classifies leads, matches projects, and follows up under permission rules. Open the admin from your IN Z account or the link your team gives you.",
  th: "ทีมอสังหาต้องจับคู่ลูกค้ากับโครงการให้ถูก — โดยไม่ให้ทุกคนเห็นข้อมูลทุกชุด? PRISM จำแนกเจตนา จับคู่โครงการ และติดตามภายใต้สิทธิ์ที่กำหนด เปิดแอดมินจากบัญชี IN Z หรือลิงก์ที่ทีมให้",
};

export const SYNTHCOMM_STORY: LocalizedCatalogStory = {
  th: {
    lead: "SynthComm สร้างข้อมูลบทสนทนาลูกค้าแบบสังเคราะห์ ให้ทีม AI / ผลิตภัณฑ์เอาไปเทรนหรือทดสอบ โดยไม่ต้องใช้แชทจริง",
    painHeading: "เคยเจอแบบนี้ไหม?",
    pain: [
      "อยากเทรนบอท แต่ข้อมูลแชทจริงมี PDPA / ความลับ",
      "จ้างคนเขียนบทสนทนาทีละแถวช้าและแพง",
      "ข้อมูลตัวอย่างไม่ครบภาษาไทย / อินโด / เวียด",
      "ได้ไฟล์มาแล้วไม่รู้คุณภาพผ่านเกณฑ์ไหม",
    ],
    howHeading: "ใช้งานยังไง",
    howSteps: [
      {
        title: "เปิดจากบัญชี IN Z",
        detail: "Sign in ที่ inz.lol แล้วเปิด SynthComm จากแพ็กเกจของคุณ",
      },
      {
        title: "ใส่หัวข้อและจำนวน",
        detail: "เลือกภาษา Thai / English / Vietnamese / Indonesian แล้วส่งงาน",
      },
      {
        title: "รอจ๊อบเสร็จแล้วดาวน์โหลด",
        detail: "ได้ไฟล์ข้อมูล + รายงานสรุปจ๊อบ (Bundle มี HTML/PDF)",
      },
      {
        title: "License (ถ้าใช้)",
        detail: "วางคีย์ LLM ของคุณ และตั้งโดเมน CNAME ตามที่พอร์ทัลแสดง",
      },
    ],
    featuresHeading: "ได้อะไรบ้าง",
    features: [
      {
        title: "บทสนทนาหลายภาษา",
        detail: "ไทย อังกฤษ อินโดนีเซีย เวียดนาม พร้อมล็อกเมือง/ธนาคารตามภาษา",
      },
      {
        title: "รายงานสรุปจ๊อบ",
        detail: "นอกจากไฟล์ข้อมูล ยังมี HTML/PDF สรุปคุณภาพและตัวอย่าง",
      },
      {
        title: "ไม่ใช้แชทลูกค้าจริง",
        detail: "เป็นข้อมูลสังเคราะห์ — ลดความเสี่ยง PDPA ตอนทดสอบ",
      },
      {
        title: "Web Portal อย่างเดียว",
        detail: "ไม่มีบอท Telegram / LINE — ทำงานบนเบราว์เซอร์",
      },
    ],
    faqHeading: "คำถามที่พบบ่อย",
    faq: [
      {
        question: "ได้โปรแกรมโรงงานไปรันเองไหม?",
        answer: "ไม่ได้ — โหลดได้เฉพาะผลจ๊อบและคู่มือ โปรแกรมอยู่บนคลาวด์ IN Z",
      },
      {
        question: "ต้องสมัครในพอร์ทัลอีกครั้งไหม?",
        answer: "ไม่ต้อง — เปิดจากบัญชี IN Z (SSO)",
      },
      {
        question: "ภาษาอะไรบ้าง?",
        answer: "Thai · English · Vietnamese · Indonesian",
      },
    ],
    closing: "เริ่มจากบัญชี IN Z — แพ็กฟรีมีโควตาทดลอง แล้วอัปเกรดเมื่องานจริงมากขึ้น",
  },
  en: {
    lead: "SynthComm builds synthetic customer conversations so AI and product teams can train or test without using real chats.",
    painHeading: "Sound familiar?",
    pain: [
      "You need bot training data but real chats are sensitive",
      "Paying people to write rows by hand is slow and costly",
      "Samples don’t cover Thai / Indonesian / Vietnamese well",
      "You get files and still don’t know if quality passed",
    ],
    howHeading: "How to use it",
    howSteps: [
      {
        title: "Open from your IN Z account",
        detail: "Sign in on inz.lol, then open SynthComm from Your package",
      },
      {
        title: "Enter topic and count",
        detail: "Pick Thai / English / Vietnamese / Indonesian and submit",
      },
      {
        title: "Download when the job completes",
        detail: "Get data files plus a job summary report (Bundle includes HTML/PDF)",
      },
      {
        title: "License (if applicable)",
        detail: "Paste your own LLM keys and set a CNAME domain in the portal",
      },
    ],
    featuresHeading: "What you get",
    features: [
      {
        title: "Multi-language dialogues",
        detail: "Thai, English, Indonesian, Vietnamese with locale-locked cities and banks",
      },
      {
        title: "Job summary report",
        detail: "Beyond raw data — HTML/PDF summary of quality and samples",
      },
      {
        title: "No real customer chats",
        detail: "Synthetic data — lower PDPA risk while testing",
      },
      {
        title: "Web portal only",
        detail: "No Telegram / LINE bot — work in the browser",
      },
    ],
    faqHeading: "FAQ",
    faq: [
      {
        question: "Can I download the factory software?",
        answer: "No — you download job outputs and manuals. The engine stays on IN Z cloud.",
      },
      {
        question: "Do I sign up again inside the portal?",
        answer: "No — open from your IN Z account (SSO).",
      },
      {
        question: "Which languages?",
        answer: "Thai · English · Vietnamese · Indonesian",
      },
    ],
    closing: "Start from your IN Z account — free quota to try, then upgrade when production needs grow.",
  },
};

export const QA_LAB_STORY: LocalizedCatalogStory = {
  th: {
    lead: "QA LAB คือห้องแล็บตรวจระบบที่เปิดอยู่จริง — ใส่ URL แล้วดูว่าระบบพร้อมแค่ไหน ก่อนลูกค้าเจอปัญหา",
    painHeading: "เคยเจอแบบนี้ไหม?",
    pain: [
      "ปล่อยเว็บแล้วค่อยรู้ว่า API ล้ม หรือหน้าช้า",
      "ไม่มีทีม QA เต็มเวลา แต่ต้องเช็กก่อนเดโมลูกค้า",
      "อยากลองเส้นทางผู้ใช้จริง ไม่ใช่แค่ยิง API คนเดียว",
      "มือถือ / WebView / API ปนกัน ไม่รู้จะเริ่มตรวจตรงไหน",
    ],
    howHeading: "ใช้งานยังไง",
    howSteps: [
      {
        title: "ตรวจความพร้อมฟรี",
        detail: "ใส่ URL ระบบจริง ได้คะแนนและข้อค้นพบ — ไม่ต้องสมัคร",
      },
      {
        title: "เปิดจากบัญชี IN Z",
        detail: "เมื่อต้องการซิมเต็มและแดชบอร์ด",
      },
      {
        title: "ตั้งเป้าแล้วรัน Simulate",
        detail: "เว็บ / API (และมือถือตามแพ็กเกจ)",
      },
      {
        title: "อ่านรายงาน",
        detail: "ดูจุดผิดปกติ แล้วเลือกว่าจะซ่อมหรืออัปเกรดโควตา",
      },
    ],
    featuresHeading: "ใช้ทำอะไรได้",
    features: [
      {
        title: "ตรวจ URL ที่รันอยู่",
        detail: "ไม่ใช่การไล่ดู repo บน Git — ต้องมีระบบที่เปิดอยู่",
      },
      {
        title: "จำลองผู้ใช้",
        detail: "Persona และเส้นทางคลิก ไม่ใช่แค่สคริปต์ตายตัว",
      },
      {
        title: "มือถือและ API",
        detail: "รองรับ backend แอป และ E2E ตามแพ็กเกจ",
      },
      {
        title: "นำคีย์มาเอง (BYOK)",
        detail: "ตามแพ็ก License / แผนที่รองรับ",
      },
    ],
    faqHeading: "คำถามที่พบบ่อย",
    faq: [
      {
        question: "ใส่ลิงก์ GitHub ได้ไหม?",
        answer: "ไม่ได้ผลแบบที่ต้องการ — ต้องชี้ไปที่ระบบที่ deploy แล้วมี URL เปิดได้",
      },
      {
        question: "ตรวจฟรีใช้ AI ไหม?",
        answer: "การตรวจความพร้อมฟรีไม่ใช้ LLM",
      },
      {
        question: "ใครเหมาะใช้?",
        answer: "ทีมโปรดักต์ / QA / เอเจนซี่ที่ต้องโชว์ความพร้อมของระบบจริง",
      },
    ],
    closing: "เริ่มจากใส่ URL ตรวจฟรี — พร้อมแล้วค่อยเปิดจากบัญชี IN Z เพื่อซิมเต็ม",
  },
  en: {
    lead: "QA LAB is a lab for systems that are already live — paste a public URL and see how ready you are before customers find the bugs.",
    painHeading: "Sound familiar?",
    pain: [
      "You ship, then discover the API is down or the page is slow",
      "No full-time QA, but you need a check before a client demo",
      "You want real user journeys, not a single API ping",
      "Web, mobile, and APIs are mixed — unclear where to start",
    ],
    howHeading: "How to use it",
    howSteps: [
      {
        title: "Free readiness check",
        detail: "Paste a live URL — score and findings, no signup",
      },
      {
        title: "Open from your IN Z account",
        detail: "When you need full simulation and the dashboard",
      },
      {
        title: "Set targets and run Simulate",
        detail: "Web / API (and mobile per plan)",
      },
      {
        title: "Read the report",
        detail: "Fix issues or upgrade quota as needed",
      },
    ],
    featuresHeading: "What it’s for",
    features: [
      {
        title: "Live URL checks",
        detail: "Not a Git-repo browser — the system must already be running",
      },
      {
        title: "User simulation",
        detail: "Personas and click paths, not only static scripts",
      },
      {
        title: "Mobile and APIs",
        detail: "App backends and E2E according to your plan",
      },
      {
        title: "Bring your own keys (BYOK)",
        detail: "Where License / plan supports it",
      },
    ],
    faqHeading: "FAQ",
    faq: [
      {
        question: "Can I paste a GitHub link?",
        answer: "That won’t do what you want — point at a deployed system with a public URL.",
      },
      {
        question: "Does free readiness use AI?",
        answer: "The free readiness check does not use an LLM.",
      },
      {
        question: "Who is it for?",
        answer: "Product, QA, and agencies that need to prove a live system is ready.",
      },
    ],
    closing: "Start with a free URL check — then open from IN Z for full simulation.",
  },
};

export const MUSIC_DEMO_STORY: LocalizedCatalogStory = {
  th: {
    lead: "Music Demo ช่วยสร้างแบบร่างเพลง (คำร้อง · คอร์ด · MIDI) ให้คุณเอาไปเล่นต่อบนเครื่องจริงหรือส่งสตูดิโอ — ไม่ใช่เพลงสำเร็จรูปพร้อมขาย",
    painHeading: "เคยเจอแบบนี้ไหม?",
    pain: [
      "มีไอเดียบรรทัดเดียว แต่ยังไม่มีโครงเพลง",
      "อยากลองคอร์ด / โน้ต ก่อนจ้างนักดนตรี",
      "เครื่องมือ AI เพลงส่วนใหญ่จบที่ไฟล์ฟัง ไม่ใช่ blueprint",
      "กลัวล็อกผลงานผิด แล้วแชร์ต่อไม่ได้",
    ],
    howHeading: "ใช้งานยังไง",
    howSteps: [
      {
        title: "เปิดจากบัญชี IN Z",
        detail: "ได้เครดิตเริ่มต้นอัตโนมัติ",
      },
      {
        title: "สร้าง DEMO",
        detail: "ได้ Artist Blueprint ตามเครดิตที่ใช้",
      },
      {
        title: "Confirm & Lock",
        detail: "ล็อกผล แล้วแชร์แบบอ่านอย่างเดียวหรือ Export",
      },
      {
        title: "เติมเครดิตเมื่อใช้จริง",
        detail: "จ่ายตามใช้ — เสียงร้อง AI เป็นแอดออนแยก",
      },
    ],
    featuresHeading: "ได้อะไรบ้าง",
    features: [
      {
        title: "Artist Blueprint",
        detail: "คำร้อง · คอร์ด · MIDI/MusicXML สำหรับเล่นต่อ",
      },
      {
        title: "Solo Mode",
        detail: "หนึ่งเพลงหนึ่งเจ้าของ — แชร์ได้แบบอ่านอย่างเดียว",
      },
      {
        title: "เครดิตจ่ายตามใช้",
        detail: "ไม่ผูกแพ็กเดือนบังคับ",
      },
      {
        title: "ไม่ใช่ไฟล์ขาย",
        detail: "เป้าหมายคือช่วยให้คุณทำให้สมบูรณ์เอง",
      },
    ],
    faqHeading: "คำถามที่พบบ่อย",
    faq: [
      {
        question: "ได้ไฟล์ปล่อยขายไหม?",
        answer: "ไม่ใช่จุดประสงค์หลัก — ได้ blueprint ไปทำต่อใน DAW / สตูดิโอ",
      },
      {
        question: "เสียงร้อง AI รวมในแพ็กไหม?",
        answer: "ไม่รวม เป็นแอดออนแยก",
      },
      {
        question: "ใครเหมาะใช้?",
        answer: "นักเรียน Busker สตูดิโอเล็ก คนมีไอเดียเพลงที่อยากได้โครงก่อนลงมือ",
      },
    ],
    closing: "เปิดจากบัญชี IN Z แล้วสร้าง DEMO แรกด้วยเครดิตเริ่มต้นได้เลย",
  },
  en: {
    lead: "Music Demo builds a song sketch (lyrics · chords · MIDI) you can take to a real instrument or studio — not a finished track for sale.",
    painHeading: "Sound familiar?",
    pain: [
      "You have one-line idea but no song structure",
      "You want chords / notes before hiring a musician",
      "Most AI music tools end as listen-only files, not blueprints",
      "You’re afraid of locking the wrong version and can’t share",
    ],
    howHeading: "How to use it",
    howSteps: [
      {
        title: "Open from your IN Z account",
        detail: "Starter credits are applied automatically",
      },
      {
        title: "Create a DEMO",
        detail: "Get an Artist Blueprint for the credits you spend",
      },
      {
        title: "Confirm & Lock",
        detail: "Lock the piece, share read-only, or export",
      },
      {
        title: "Top up when you create more",
        detail: "Pay as you go — AI vocal is a separate add-on",
      },
    ],
    featuresHeading: "What you get",
    features: [
      {
        title: "Artist Blueprint",
        detail: "Lyrics · chords · MIDI/MusicXML to play further",
      },
      {
        title: "Solo Mode",
        detail: "One song, one owner — share read-only",
      },
      {
        title: "Credits pay-as-you-go",
        detail: "No forced monthly plan",
      },
      {
        title: "Not a release file",
        detail: "The goal is helping you finish the work yourself",
      },
    ],
    faqHeading: "FAQ",
    faq: [
      {
        question: "Is this a commercial release?",
        answer: "That’s not the main goal — you get a blueprint for DAW / studio work.",
      },
      {
        question: "Is AI vocal included?",
        answer: "No — it’s a separate add-on.",
      },
      {
        question: "Who is it for?",
        answer: "Students, buskers, small studios, and anyone who wants structure before production.",
      },
    ],
    closing: "Open from your IN Z account and build your first DEMO with starter credits.",
  },
};

export const CONTENT_CREATOR_STORY: LocalizedCatalogStory = {
  th: {
    lead: "Content Creator รวมงานพอดแคสต์และวิดีโอสั้นภาษาถิ่นไทย / SEA ไว้ในที่เดียว — จากไฟล์เสียงถึงคลิปพร้อมคิวโพสต์",
    painHeading: "เคยเจอแบบนี้ไหม?",
    pain: [
      "ต้องสลับหลายแอป ถอดเสียง คนละที่ ตัดคลิปคนละที่",
      "อยากได้โทนถิ่นเหนือ / อีสาน / ใต้ หรือภาษา SEA",
      "ทีมเล็ก อยากมีตารางโพสต์และคลิปสั้นโดยไม่จ้างครบแผนก",
      "ทดลองแล้ววิดีโอติดลายน้ำ — อยากรู้แพ็กไหนปลดได้",
    ],
    howHeading: "ใช้งานยังไง",
    howSteps: [
      {
        title: "เปิดจากบัญชี IN Z",
        detail: "ทดลองฟรี 14 วัน",
      },
      {
        title: "เลือกพอดแคสต์หรือ AI Video",
        detail: "อัปโหลด / แต่งสคริปต์ แล้วให้ระบบช่วยถอดเสียง คลิป หรือเรนเดอร์",
      },
      {
        title: "ดูโควตาใน Dashboard",
        detail: "ตอน · เรนเดอร์ · ที่เก็บ — รีเซ็ตวันที่ 1 เวลาไทย",
      },
      {
        title: "อัปเกรดเมื่อใช้จริง",
        detail: "Starter / Creator / Pro ตามโควตาที่หน้าชำระเงินของ IN Z",
      },
    ],
    featuresHeading: "ใช้ทำอะไรได้",
    features: [
      {
        title: "พอดแคสต์ครบวงจร",
        detail: "อัปโหลด → ถอดเสียง → show notes → clips → RSS",
      },
      {
        title: "AI Video",
        detail: "คุยไอเดีย → สคริปต์ → สื่อ → TTS → MP4",
      },
      {
        title: "ภาษาถิ่นและ SEA",
        detail: "เหนือ อีสาน ใต้ และภาษาในภูมิภาค",
      },
      {
        title: "แพ็กตามขนาดทีม",
        detail: "จากทดลองลายน้ำ ถึง Creator/Pro ที่มีคลิป AI และตารางโพสต์",
      },
    ],
    faqHeading: "คำถามที่พบบ่อย",
    faq: [
      {
        question: "ช่วงทดลองวิดีโอมีลายน้ำไหม?",
        answer: "มี — วิดีโอช่วงทดลองติดลายน้ำเสมอ",
      },
      {
        question: "คลิป AI เริ่มแพ็กไหน?",
        answer: "โดยทั่วไปเริ่มที่ Creator ขึ้นไป",
      },
      {
        question: "ต้องติดตั้งโปรแกรมไหม?",
        answer: "ไม่ — ใช้บนเว็บ เปิดจากบัญชี IN Z",
      },
    ],
    closing: "เปิดจากบัญชี IN Z แล้วลองพอดแคสต์หรือวิดีโอแรกในโควตาทดลอง",
  },
  en: {
    lead: "Content Creator keeps podcast and short AI video work for Thai dialects / SEA in one place — from audio upload to clips ready to schedule.",
    painHeading: "Sound familiar?",
    pain: [
      "You’re jumping between apps for STT, notes, and clipping",
      "You need Northern / Isan / Southern tone or SEA languages",
      "A small team wants clips and a schedule without a full department",
      "Trial videos are watermarked — you need the right plan",
    ],
    howHeading: "How to use it",
    howSteps: [
      {
        title: "Open from your IN Z account",
        detail: "Fourteen-day free trial",
      },
      {
        title: "Pick podcast or AI Video",
        detail: "Upload or draft a script, then let the system transcribe, clip, or render",
      },
      {
        title: "Watch quotas on the Dashboard",
        detail: "Episodes · renders · storage — reset on the 1st (Thailand time)",
      },
      {
        title: "Upgrade when you’re in production",
        detail: "Starter / Creator / Pro on IN Z checkout by quota",
      },
    ],
    featuresHeading: "What it’s for",
    features: [
      {
        title: "Full podcast flow",
        detail: "Upload → STT → show notes → clips → RSS",
      },
      {
        title: "AI Video",
        detail: "Idea chat → script → media → TTS → MP4",
      },
      {
        title: "Dialects and SEA",
        detail: "Northern, Isan, Southern, and regional languages",
      },
      {
        title: "Plans by team size",
        detail: "From watermarked trial to Creator/Pro with AI clips and scheduling",
      },
    ],
    faqHeading: "FAQ",
    faq: [
      {
        question: "Are trial videos watermarked?",
        answer: "Yes — trial renders always include a watermark.",
      },
      {
        question: "Which plan unlocks AI clips?",
        answer: "Typically Creator and above.",
      },
      {
        question: "Do I install software?",
        answer: "No — it’s web-based; open from your IN Z account.",
      },
    ],
    closing: "Open from your IN Z account and try your first podcast or video in the trial quota.",
  },
};

export const NETR_STORY: LocalizedCatalogStory = {
  th: {
    lead: "เนตร (netr) คือผู้ช่วยคุยโหราศาสตร์ไทยบนเว็บ ที่จำดวงเกิดของคุณได้หลังจารึกครั้งเดียว",
    painHeading: "เคยเจอแบบนี้ไหม?",
    pain: [
      "อยากคุยดวงแต่ไม่อยากเล่าวันเกิดใหม่ทุกครั้ง",
      "แอปทั่วไปไม่ผูกกับตำราไทย / บริบทท้องถิ่น",
      "ไม่อยากยืนยันเบอร์ซ้ำหลายรอบในแอปย่อย",
      "กลัวข้อมูลดวงถูกแชร์ให้คนอื่นในบัญชีเดียวกัน",
    ],
    howHeading: "ใช้งานยังไง",
    howSteps: [
      {
        title: "ยืนยันตัวที่ IN Z",
        detail: "สมัครหรือ Sign in ที่ inz.lol",
      },
      {
        title: "เปิดเนตรจากแพ็กเกจของคุณ",
        detail: "เข้าอัตโนมัติ (SSO) ไม่ต้อง OTP ซ้ำที่ NetR",
      },
      {
        title: "จารึกดวงครั้งเดียว",
        detail: "กรอกวันเวลาและสถานที่เกิด แล้วยืนยัน",
      },
      {
        title: "คุยบนหน้าแชท",
        detail: "ฟรี 5 นาที/วัน จากนั้นเติม Prepaid หรือสมัคร Plus",
      },
    ],
    featuresHeading: "สิ่งที่ควรรู้",
    features: [
      {
        title: "คุยบนเว็บเท่านั้น",
        detail: "LINE ไม่ใช่ช่องตอบดวง — จะได้ลิงก์กลับมาหน้าเว็บ",
      },
      {
        title: "ดวงเป็นของเจ้าของบัญชี",
        detail: "ดูชาร์ตได้เฉพาะผู้ล็อกอินเจ้าของ",
      },
      {
        title: "จำบริบทหลังจารึก",
        detail: "ไม่ต้องเล่าวันเกิดใหม่ทุกครั้งที่คุย",
      },
      {
        title: "ไม่ใช่คำแนะนำแพทย์",
        detail: "เพื่อการสะท้อนและตัดสินใจ ไม่แทนที่แพทย์หรือจิตแพทย์",
      },
    ],
    faqHeading: "คำถามที่พบบ่อย",
    faq: [
      {
        question: "แก้วันเกิดหลังล็อกได้ไหม?",
        answer: "ต้องผ่านทีมเนตรตามเงื่อนไขในแอป — ไม่ใช่แก้เองหลังยืนยัน",
      },
      {
        question: "นาทีคิดยังไง?",
        answer: "ใช้โควตาฟรี/Plus ก่อน แล้วหัก Prepaid ตามเวลาตอบจริง",
      },
      {
        question: "ต้องมีคอมไหม?",
        answer: "ใช้เบราว์เซอร์บนมือถือหรือคอมได้",
      },
    ],
    closing: "เปิดจากบัญชี IN Z จารึกดวงครั้งเดียว แล้วเริ่มคุยได้ในโควตาฟรีรายวัน",
  },
  en: {
    lead: "netr is a Thai karmic-astrology chat on the web that remembers your birth chart after you record it once.",
    painHeading: "Sound familiar?",
    pain: [
      "You want chart chat without repeating your birth data every time",
      "Generic apps ignore Thai texts and local context",
      "You don’t want another phone OTP inside a side app",
      "You’re worried others on a shared device can open your chart",
    ],
    howHeading: "How to use it",
    howSteps: [
      {
        title: "Verify on IN Z",
        detail: "Sign up or sign in on inz.lol",
      },
      {
        title: "Open netr from Your package",
        detail: "SSO — no duplicate OTP on NetR",
      },
      {
        title: "Record your chart once",
        detail: "Enter birth date, time, and place, then confirm",
      },
      {
        title: "Chat on the web",
        detail: "Five free minutes/day, then Prepaid or Plus",
      },
    ],
    featuresHeading: "What to know",
    features: [
      {
        title: "Web chat only",
        detail: "LINE is not the chart channel — it sends you back to the web",
      },
      {
        title: "Owner-only chart",
        detail: "Only the signed-in account owner can view the chart",
      },
      {
        title: "Remembers after recording",
        detail: "No need to restate birth data every chat",
      },
      {
        title: "Not medical advice",
        detail: "For reflection and decisions — not a doctor or psychiatrist",
      },
    ],
    faqHeading: "FAQ",
    faq: [
      {
        question: "Can I edit birth data after lock?",
        answer: "Corrections go through the netr team per in-app rules — not self-edit after confirm.",
      },
      {
        question: "How are minutes charged?",
        answer: "Free/Plus quota first, then Prepaid by actual answer time.",
      },
      {
        question: "Do I need a computer?",
        answer: "Any modern browser on phone or desktop works.",
      },
    ],
    closing: "Open from your IN Z account, record your chart once, and start within the daily free minutes.",
  },
};

export const PRISM_STORY: LocalizedCatalogStory = {
  th: {
    lead: "PRISM ช่วยทีมอสังหาจัดลีด จำแนกเจตนา และจับคู่โครงการ — โดยจำกัดว่าใครค้นข้อมูลชุดไหนได้",
    painHeading: "เคยเจอแบบนี้ไหม?",
    pain: [
      "ลีดเข้ามาแล้วไม่รู้จะส่งโครงการไหน",
      "เซลล์ทุกคนเห็นข้อมูลเกินสิทธิ์",
      "ติดตามนัดชมและฟอลโลว์ไม่เป็นระบบ",
      "อยากมีแอดมินเว็บอ้างอิงก่อนซื้อ License / White Label",
    ],
    howHeading: "ใช้งานยังไง",
    howSteps: [
      {
        title: "เปิดแอดมินจากบัญชี IN Z",
        detail: "หรือใช้ลิงก์ที่ทีมส่งให้",
      },
      {
        title: "ลงทะเบียนลีด",
        detail: "ระบบช่วยจำแนก High / Medium / Low",
      },
      {
        title: "จับคู่และนัดหมาย",
        detail: "ตามระดับเจตนา — มีโครงการ / รอเปิดตัว / วิเคราะห์ช่องว่าง",
      },
      {
        title: "ติดตามต่อเนื่อง",
        detail: "เช็กอินและรายงานภายใต้สิทธิ์ SubsetGuard",
      },
    ],
    featuresHeading: "ใช้ทำอะไรได้",
    features: [
      {
        title: "จำแนกเจตนา",
        detail: "จัดกลุ่มลีดเพื่อเลือกเส้นทางดูแล",
      },
      {
        title: "จับคู่โครงการ",
        detail: "เชื่อมลูกค้ากับโครงการที่เหมาะ",
      },
      {
        title: "จำกัดสิทธิ์ค้น",
        detail: "แต่ละคนเห็นเฉพาะชุดข้อมูลที่ได้รับอนุญาต",
      },
      {
        title: "แอดมินเว็บอ้างอิง",
        detail: "ดูลำดับงานจริงก่อนคุยเงื่อนไข License / White Label",
      },
    ],
    faqHeading: "คำถามที่พบบ่อย",
    faq: [
      {
        question: "เป็น SaaS สมัครเองได้เลยไหม?",
        answer: "โมเดลหลักเป็น License / White Label — เปิดแอดมินอ้างอิงได้ แล้วติดต่อฝ่ายขายเรื่องเงื่อนไข",
      },
      {
        question: "ต้องติดตั้งอะไรบนเครื่องเซลล์ไหม?",
        answer: "ใช้งานผ่านแอดมินเว็บเป็นหลัก",
      },
      {
        question: "ข้อมูลทุกคนเห็นเหมือนกันไหม?",
        answer: "ไม่ — มีการจำกัดชุดข้อมูลตามสิทธิ์",
      },
    ],
    closing: "เปิดแอดมินจากบัญชี IN Z เพื่อดู workflow จริง แล้วคุยแพ็กเกจกับทีมเมื่อพร้อม",
  },
  en: {
    lead: "PRISM helps real-estate teams organize leads, classify intent, and match projects — with limits on who can search which data.",
    painHeading: "Sound familiar?",
    pain: [
      "Leads arrive and nobody knows which project to send",
      "Every agent can see more data than they should",
      "Viewings and follow-ups aren’t systematic",
      "You want a live admin reference before buying License / White Label",
    ],
    howHeading: "How to use it",
    howSteps: [
      {
        title: "Open admin from your IN Z account",
        detail: "Or use the link your team provides",
      },
      {
        title: "Register a lead",
        detail: "The system helps classify High / Medium / Low",
      },
      {
        title: "Match and schedule",
        detail: "By intent — available projects, upcoming launches, or gap analysis",
      },
      {
        title: "Follow up ongoing",
        detail: "Check-ins and reports under SubsetGuard permissions",
      },
    ],
    featuresHeading: "What it’s for",
    features: [
      {
        title: "Intent classification",
        detail: "Route leads into the right care path",
      },
      {
        title: "Project matching",
        detail: "Connect buyers to suitable projects",
      },
      {
        title: "Search permissions",
        detail: "Each user only sees their allowed data subset",
      },
      {
        title: "Reference admin web",
        detail: "See the real workflow before License / White Label terms",
      },
    ],
    faqHeading: "FAQ",
    faq: [
      {
        question: "Is it self-serve SaaS?",
        answer: "Primary models are License / White Label — open the reference admin, then talk to sales.",
      },
      {
        question: "Do agents install desktop software?",
        answer: "Day-to-day work is through the admin web.",
      },
      {
        question: "Does everyone see the same data?",
        answer: "No — data access is permissioned by subset.",
      },
    ],
    closing: "Open the admin from your IN Z account to see the workflow, then discuss packaging with the team.",
  },
};
