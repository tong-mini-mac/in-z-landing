import type { AuthLang } from "@/lib/auth-i18n";
import type { ContactChannel } from "@/lib/contact";
import type { ProductModel } from "@/lib/product-models";

export type SiteCopy = {
  nav: {
    home: string;
    about: string;
    products: string;
    demo: string;
    contact: string;
    signIn: string;
    account: string;
  };
  productsMenu: {
    whiteLabel: string;
    license: string;
    saas: string;
  };
  contactMenu: {
    chat: string;
    customerService: string;
    support: string;
  };
  footer: {
    terms: string;
    privacy: string;
  };
  home: {
    brand: string;
    tagline: string;
  };
  about: {
    eyebrow: string;
    title: string;
    lead: string;
    motto: string;
    whoTitle: string;
    whoP1: string;
    whoQuote: string;
    whoP2: string;
    storyTitle: string;
    storyP1: string;
    storyP2: string;
    storyP3: string;
    storyP4: string;
    storyBullets: string[];
    rippleTitle: string;
    rippleLead: string;
    rippleItems: { title: string; body: string }[];
    missionTitle: string;
    missionLead: string;
    pillars: { title: string; lines: string[] }[];
    whyTitle: string;
    whyItems: { title: string; body: string }[];
    visionTitle: string;
    visionLead: string;
    visionItems: string[];
    closeTitle: string;
    closeLead: string;
    signoff: string;
    contactCta: string;
  };
  contact: {
    eyebrow: string;
    lead: string;
    channels: Record<ContactChannel, string>;
    sendingTo: string;
    email: string;
    name: string;
    namePlaceholder: string;
    message: string;
    messagePlaceholder: string;
    send: string;
    sending: string;
    success: string;
    sendAnother: string;
    errEmail: string;
    errMessage: string;
    errGeneric: string;
  };
  products: {
    label: string;
    lead: string;
    models: Record<ProductModel, { label: string; title: string; lead: string }>;
  };
  productCard: {
    description: string;
    subscribe: string;
    earlyBird: string;
    regular: string;
  };
  legal: {
    termsEyebrow: string;
    termsTitle: string;
    privacyEyebrow: string;
    privacyTitle: string;
    originalNote: string;
  };
  account: {
    trialBadge: string;
    trialNote: string;
    ssoNote: string;
    openFail: string;
  };
};

export const SITE_COPY: Record<AuthLang, SiteCopy> = {
  th: {
    nav: {
      home: "หน้าแรก",
      about: "เกี่ยวกับเรา",
      products: "ผลิตภัณฑ์",
      demo: "ทดลองใช้",
      contact: "ติดต่อ",
      signIn: "เข้าสู่ระบบ / สมัคร",
      account: "บัญชีของฉัน",
    },
    productsMenu: {
      whiteLabel: "White Label",
      license: "License",
      saas: "SaaS",
    },
    contactMenu: {
      chat: "แชท",
      customerService: "ลูกค้าสัมพันธ์",
      support: "ซัพพอร์ต",
    },
    footer: {
      terms: "ข้อกำหนดและการสนับสนุน",
      privacy: "ความเป็นส่วนตัวและนโยบาย",
    },
    home: {
      brand: "IN Z",
      tagline: "AI Transform and SaaS",
    },
    about: {
      eyebrow: "เกี่ยวกับ IN Z",
      title: "จากหยดน้ำสู่คลื่นแห่งการเปลี่ยนแปลง",
      lead:
        "IN Z เป็นแพลตฟอร์มที่ขับเคลื่อนด้วย AI เพื่อช่วยให้คุณคืนสมดุลให้ชีวิต เราเชื่อว่าการเปลี่ยนแปลงเล็กๆ สามารถสร้างผลกระทบใหญ่ได้ — เหมือนหยดน้ำที่ทำให้เกิดระลอกบนผิวน้ำ",
      motto: "จัดการความคิด · ควบคุมเวลา · ปลดล็อกศักยภาพ",
      whoTitle: "เราคือใคร",
      whoP1:
        "ในโลกที่ข้อมูลล้น ความเร่งรีบ และความไม่สมดุล IN Z เกิดจากคำถามง่ายๆ:",
      whoQuote: "ถ้า AI ทำให้ชีวิตง่ายขึ้นได้ ทำไมมันถึงรู้สึกซับซ้อนขึ้น?",
      whoP2:
        "เราเชื่อว่าเทคโนโลยีที่ดีไม่ควรเพิ่มภาระ — แต่ควรช่วยคืนสมดุลให้ชีวิตคุณ",
      storyTitle: "เรื่องราวของเรา",
      storyP1:
        "เรามีเครื่องมือ AI มากมาย แต่ชีวิตไม่ได้ง่ายขึ้น แอปมากขึ้น แต่เวลาน้อยลง ข้อมูลมากขึ้น แต่ตัดสินใจยากขึ้น",
      storyP2: "เราถามตัวเอง: AI ควรทำให้ชีวิตดีขึ้น ไม่ใช่ซับซ้อนขึ้น — ใช่ไหม?",
      storyP3: "นั่นคือจุดเริ่มต้นของ IN Z",
      storyP4: "เราสร้างแพลตฟอร์มที่:",
      storyBullets: [
        "ไม่ได้บอกให้คุณทำทุกอย่าง แต่ช่วยให้เลือกสิ่งที่สำคัญ",
        "ไม่ได้เพิ่มงาน แต่ลดภาระ",
        "ไม่ได้ซับซ้อน แต่เรียบง่ายและทรงพลัง",
      ],
      rippleTitle: "เอฟเฟกต์ระลอกคลื่น",
      rippleLead:
        "เหมือนหยดน้ำตกลงบนผิวน้ำนิ่ง แล้วเกิดระลอกขยายออกไป — IN Z เชื่อว่าการเปลี่ยนแปลงเล็กๆ ในชีวิตประจำวันสามารถสร้างผลกระทบใหญ่ได้",
      rippleItems: [
        { title: "หยดน้ำ", body: "การตัดสินใจเล็กๆ ที่คุณทำวันนี้" },
        { title: "ระลอกคลื่น", body: "ผลลัพธ์ที่แผ่ขยายไปทุกมิติของชีวิต" },
        { title: "สมดุล", body: "เป้าหมายสูงสุดที่เราช่วยคุณไปถึง" },
      ],
      missionTitle: "พันธกิจ",
      missionLead: "เราพัฒนาเครื่องมือ AI ที่ช่วยให้คุณสร้างสมดุลในชีวิต",
      pillars: [
        {
          title: "จัดการความคิด",
          lines: [
            "ดึงข้อมูลสำคัญจากข้อมูลที่ซับซ้อน",
            "เปลี่ยนไอเดียเป็นแผนที่ลงมือได้",
            "ตัดสินใจได้เร็วและแม่นยำขึ้น",
          ],
        },
        {
          title: "ควบคุมเวลา",
          lines: [
            "ลดงานซ้ำที่ไม่จำเป็น",
            "โฟกัสสิ่งที่สำคัญจริงๆ",
            "สร้างพื้นที่ให้สิ่งที่คุณรัก",
          ],
        },
        {
          title: "ปลดล็อกศักยภาพ",
          lines: [
            "เรียนรู้และพัฒนาอย่างต่อเนื่อง",
            "ค้นมุมมองใหม่ผ่าน AI",
            "เติบโตไปพร้อมเทคโนโลยี",
          ],
        },
      ],
      whyTitle: "ทำไมต้อง IN Z",
      whyItems: [
        {
          title: "ไม่ใช่แค่เครื่องมือ AI",
          body: "เราเป็นพาร์ทเนอร์ด้านสมดุล ที่เข้าใจว่าชีวิตมีมากกว่างาน",
        },
        {
          title: "ไม่ซับซ้อน",
          body: "ทุกฟีเจอร์ออกแบบให้ง่าย และใช้ได้จริงในชีวิตประจำวัน",
        },
        {
          title: "เติบโตไปกับคุณ",
          body: "AI ของเราเรียนรู้จากคุณ เพื่อแนะนำที่ตรงตัวมากขึ้นเรื่อยๆ",
        },
      ],
      visionTitle: "วิสัยทัศน์",
      visionLead: "เราฝันถึงโลกที่:",
      visionItems: [
        "ทุกคนเข้าถึง AI ได้ง่าย ไม่ว่าจะอยู่ที่ไหน",
        "เทคโนโลยีสร้างสมดุล ไม่ทำลายสมดุล",
        "การเปลี่ยนแปลงเล็กๆ นำไปสู่ผลลัพธ์ใหญ่",
      ],
      closeTitle: "หนึ่งหยด ผลกระทบไร้ขอบเขต",
      closeLead:
        "IN Z ไม่ใช่แค่ผลิตภัณฑ์ — แต่เป็นขบวนการ เริ่มวันนี้ สร้างระลอกของคุณเอง",
      signoff: "IN Z — Balance Your Life with AI",
      contactCta: "ติดต่อเรา",
    },
    contact: {
      eyebrow: "ติดต่อ",
      lead: "ฝากอีเมลและข้อความไว้ เราจะติดต่อกลับที่อีเมลที่คุณให้ไว้",
      channels: {
        "customer-service": "ลูกค้าสัมพันธ์",
        support: "ซัพพอร์ต",
      },
      sendingTo: "ส่งถึง",
      email: "อีเมลของคุณ",
      name: "ชื่อของคุณ",
      namePlaceholder: "ไม่บังคับ",
      message: "ข้อความ",
      messagePlaceholder: "ต้องการให้ช่วยเรื่องอะไร?",
      send: "ส่งอีเมล",
      sending: "กำลังส่ง…",
      success: "ส่งข้อความแล้ว เราจะตอบกลับทางอีเมลโดยเร็ว",
      sendAnother: "ส่งข้อความอีกครั้ง",
      errEmail: "กรุณากรอกอีเมลที่ถูกต้อง",
      errMessage: "กรุณากรอกข้อความ",
      errGeneric: "ส่งอีเมลไม่สำเร็จ กรุณาลองใหม่ภายหลัง",
    },
    products: {
      label: "ผลิตภัณฑ์",
      lead: "เลือกวิธีทำงานกับ IN Z — White Label, License หรือ SaaS",
      models: {
        "white-label": {
          label: "White Label",
          title: "White Label",
          lead:
            "รีแบรนด์เต็มรูปแบบภายใต้แบรนด์ของคุณ — Agency White Label หรือ Enterprise IP Package พร้อมซอร์สและกรรมสิทธิ์",
        },
        license: {
          label: "License",
          title: "License",
          lead:
            "Startup License สำหรับใช้งานหลัก — ติดตั้งแบบ binary, ร่วมแบรนด์, เงื่อนไขเชิงพาณิชย์ชัดเจน โดยยังไม่ใช่สิทธิ์ white-label เต็มรูปแบบ",
        },
        saas: {
          label: "SaaS",
          title: "SaaS",
          lead:
            "สมัครใช้ผลิตภัณฑ์คลาวด์ของ IN Z — เริ่มจาก tier ฟรีเมื่อมี แล้วขยายเป็นรายเดือนหรือรายปี พร้อมโฮสต์และการอัปเดตต่อเนื่อง",
        },
      },
    },
    productCard: {
      description: "รายละเอียด",
      subscribe: "สมัครใช้งาน",
      earlyBird: "Early Bird",
      regular: "ราคาปกติ",
    },
    legal: {
      termsEyebrow: "กฎหมาย",
      termsTitle: "ข้อกำหนดและการสนับสนุน",
      privacyEyebrow: "กฎหมาย",
      privacyTitle: "ความเป็นส่วนตัวและนโยบาย",
      originalNote:
        "เอกสารฉบับภาษาอังกฤษเป็นต้นฉบับทางกฎหมาย — เนื้อหาด้านล่างแสดงเป็นภาษาอังกฤษ",
    },
    account: {
      trialBadge: "ทดลอง · ไม่มีรายได้",
      trialNote:
        "บัญชีทดลองใช้ฟรี — เปิดได้เฉพาะ product ที่ได้รับสิทธิ์ และไม่ก่อให้เกิดรายได้",
      ssoNote:
        "Sign in ที่ IN Z ครั้งเดียว — เปิด product แล้วระบบพาเข้าพร้อมสิทธิ์อัตโนมัติ",
      openFail: "เปิด product ไม่สำเร็จ",
    },
  },
  en: {
    nav: {
      home: "Home",
      about: "About Us",
      products: "Products",
      demo: "Demo",
      contact: "Contact",
      signIn: "Sign In / Sign Up",
      account: "My account",
    },
    productsMenu: {
      whiteLabel: "White Label",
      license: "License",
      saas: "SaaS",
    },
    contactMenu: {
      chat: "Chat",
      customerService: "Customer Service",
      support: "Support",
    },
    footer: {
      terms: "Term and Support",
      privacy: "Privacy and Policy",
    },
    home: {
      brand: "IN Z",
      tagline: "AI Transform and SaaS",
    },
    about: {
      eyebrow: "About IN Z",
      title: "From a drop to waves of change",
      lead:
        "IN Z is an AI-powered platform that helps you restore balance to your life. We believe small changes can create massive impact—like a drop of water creating ripples across a pond.",
      motto: "Manage Your Mind · Control Your Time · Unlock Your Potential",
      whoTitle: "Who we are",
      whoP1:
        "In a world overflowing with information, constant rush, and imbalance, IN Z was born from a simple question:",
      whoQuote: "If AI can make our lives easier, why does it feel more complicated?",
      whoP2:
        "We believe that good technology shouldn't add burden—it should restore balance to your life.",
      storyTitle: "Our story",
      storyP1:
        "We had countless AI tools, but life didn't get easier. More apps, but less time. More data, but harder decisions.",
      storyP2: "We asked ourselves: AI should make life better, not more complex—right?",
      storyP3: "That's how IN Z was born.",
      storyP4: "We built a platform that:",
      storyBullets: [
        "Doesn't tell you to do everything, but helps you choose what matters",
        "Doesn't add work, but reduces burden",
        "Isn't complicated, but simple yet powerful",
      ],
      rippleTitle: "The ripple effect",
      rippleLead:
        "Like a drop of water falling onto a still surface, creating expanding ripples—IN Z believes that small changes in daily life can create massive impact.",
      rippleItems: [
        { title: "The Drop", body: "Small decisions you make today" },
        {
          title: "The Ripples",
          body: "Results that expand across every dimension of life",
        },
        { title: "Balance", body: "The ultimate goal we help you achieve" },
      ],
      missionTitle: "Mission",
      missionLead: "We develop AI-powered tools that help you balance your life.",
      pillars: [
        {
          title: "Manage Your Mind",
          lines: [
            "Extract key insights from complex information",
            "Transform ideas into actionable plans",
            "Make faster and more accurate decisions",
          ],
        },
        {
          title: "Control Your Time",
          lines: [
            "Reduce unnecessary repetitive tasks",
            "Focus on what truly matters",
            "Create space for what you love",
          ],
        },
        {
          title: "Unlock Your Potential",
          lines: [
            "Learn and develop continuously",
            "Discover new perspectives through AI",
            "Grow alongside technology",
          ],
        },
      ],
      whyTitle: "Why IN Z",
      whyItems: [
        {
          title: "Not just AI tools",
          body: "we're your balance partner who understands that life is more than work.",
        },
        {
          title: "Not complicated",
          body: "every feature is designed for simplicity and real-world usability.",
        },
        {
          title: "We grow with you",
          body: "our AI learns from you to provide increasingly personalized recommendations.",
        },
      ],
      visionTitle: "Vision",
      visionLead: "We dream of a world where:",
      visionItems: [
        "Everyone can access AI easily, no matter where they are",
        "Technology creates balance, not destroys it",
        "Small changes lead to big results",
      ],
      closeTitle: "One drop, infinite impact",
      closeLead:
        "IN Z isn't just a product—it's a movement. Start today. Create your own ripple.",
      signoff: "IN Z — Balance Your Life with AI",
      contactCta: "Contact us",
    },
    contact: {
      eyebrow: "Contact",
      lead: "Leave your email and message. We'll get back to you at the address you provide.",
      channels: {
        "customer-service": "Customer Service",
        support: "Support",
      },
      sendingTo: "Sending to",
      email: "Your email",
      name: "Your name",
      namePlaceholder: "Optional",
      message: "Message",
      messagePlaceholder: "How can we help?",
      send: "Send email",
      sending: "Sending…",
      success: "Message sent. We'll reply to your email soon.",
      sendAnother: "Send another message",
      errEmail: "Please enter a valid email address.",
      errMessage: "Please enter a message.",
      errGeneric: "Could not send email. Please try again later.",
    },
    products: {
      label: "Products",
      lead: "Choose how you want to work with IN Z — White Label, License, or SaaS.",
      models: {
        "white-label": {
          label: "White Label",
          title: "White Label",
          lead:
            "Full rebrand under your brand — Agency White Label or Enterprise IP Package with source and ownership.",
        },
        license: {
          label: "License",
          title: "License",
          lead:
            "Startup License for core use — binary deployment, co-branded, fixed commercial terms without full white-label rights.",
        },
        saas: {
          label: "SaaS",
          title: "SaaS",
          lead:
            "Subscribe to IN Z cloud products — start with free tiers where available, then scale on monthly or annual plans with hosted access and ongoing updates.",
        },
      },
    },
    productCard: {
      description: "Description",
      subscribe: "Subscribe",
      earlyBird: "Early Bird",
      regular: "Regular",
    },
    legal: {
      termsEyebrow: "Legal",
      termsTitle: "Term and Support",
      privacyEyebrow: "Legal",
      privacyTitle: "Privacy and Policy",
      originalNote: "The English text below is the governing legal version.",
    },
    account: {
      trialBadge: "Trial · non-revenue",
      trialNote:
        "Complimentary trial — only entitled products open, and usage does not generate revenue.",
      ssoNote:
        "Sign in once at IN Z — opening a product hands off your access automatically.",
      openFail: "Could not open product",
    },
  },
};
