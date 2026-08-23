"use client";

import Image from "next/image";
import Link from "next/link";
import { SiteFooter, SiteNav } from "@/components/SiteChrome";
import { useSiteLang } from "@/lib/use-site-lang";

const NETR_CHAT = "https://netr-web-production-ea49.up.railway.app/chat";

const COPY = {
  th: {
    eyebrow: "IN Z · SaaS",
    lead: "เนตร — Oracle ที่รู้จักคุณดีกว่าใคร · โหราศาสตร์ปฏิวัติกรรมจากตำราไทยโบราณ ผสาน AI ที่จำคุณได้",
    trialTitle: "ทดลองใช้ฟรี",
    trialBody:
      "เริ่มฟรี 5 นาทีต่อวันบนหน้า /chat — ไม่ต้องใส่บัตร แล้วค่อยเติม Prepaid หรือสมัคร Plus",
    openChat: "เปิดเนตร /chat",
    startTitle: "เริ่มต้น",
    startSteps:
      "1. สมัครและยืนยันตัวตนที่ inz.lol\n2. เปิด NetR จากบัญชี IN Z (SSO)\n3. จารึกชะตาครั้งเดียวที่ /register — ไม่ OTP ซ้ำ\n4. ดูดวงที่ /chart (เจ้าของบัญชีเท่านั้น) · คุยที่ /chat",
    meanwhileTitle: "แพ็กเกจ",
    meanwhileBody: "ดูแคตตาล็อก SaaS หรือกลับไปแพ็กเกจของคุณบนบัญชี IN Z",
    catalog: "ดูในแคตตาล็อก SaaS",
    account: "แพ็กเกจของคุณ",
  },
  en: {
    eyebrow: "IN Z · SaaS",
    lead: "netr — Oracle of Karmic Stars · Thai karmic astrology from ancient texts plus AI that remembers you.",
    trialTitle: "Free trial",
    trialBody:
      "Start free with 5 minutes per day on /chat — no card required. Add Prepaid minutes or Plus when you need more.",
    openChat: "Open netr /chat",
    startTitle: "Getting started",
    startSteps:
      "1. Sign up and verify on inz.lol\n2. Open NetR from your IN Z account (SSO)\n3. Record your birth chart once at /register — no duplicate OTP\n4. View chart at /chart (owner only) · chat at /chat",
    meanwhileTitle: "Plans",
    meanwhileBody: "Review the SaaS catalog, or return to Your package on your IN Z account.",
    catalog: "View on SaaS catalog",
    account: "Your package",
  },
} as const;

export function NetRView() {
  const lang = useSiteLang();
  const t = COPY[lang === "en" ? "en" : "th"];

  return (
    <main className="page page-scroll" id="netr">
      <div className="bg bg-soft" aria-hidden="true" />
      <SiteNav />

      <article className="about contact-page">
        <header className="about-hero">
          <Image
            className="logo-mark logo-mark-demo"
            src="/logo-transparent.png"
            alt="IN Z"
            width={280}
            height={280}
            priority
            unoptimized
          />
          <p className="about-eyebrow">{t.eyebrow}</p>
          <h1>NetR</h1>
          <p className="about-lead">{t.lead}</p>
        </header>

        <section className="about-section">
          <h2>{t.startTitle}</h2>
          <p style={{ whiteSpace: "pre-line" }}>{t.startSteps}</p>
        </section>

        <section className="about-section">
          <h2>{t.trialTitle}</h2>
          <p>{t.trialBody}</p>
          <p style={{ marginTop: "1rem" }}>
            <a className="demo-cta" href={NETR_CHAT} target="_blank" rel="noreferrer">
              {t.openChat}
            </a>
          </p>
        </section>

        <section className="about-section">
          <h2>{t.meanwhileTitle}</h2>
          <p>{t.meanwhileBody}</p>
          <p style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginTop: "1rem" }}>
            <Link className="demo-cta" href="/products/saas#netr">
              {t.catalog}
            </Link>
            <Link className="contact-secondary" href="/account">
              {t.account}
            </Link>
          </p>
        </section>
      </article>

      <SiteFooter />
    </main>
  );
}
