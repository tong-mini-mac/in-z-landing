"use client";

import Image from "next/image";
import Link from "next/link";
import { SiteFooter, SiteNav } from "@/components/SiteChrome";
import { useSiteLang } from "@/lib/use-site-lang";

const COPY = {
  th: {
    eyebrow: "IN Z · SaaS",
    lead: "เนตร — Oracle ที่รู้จักคุณดีกว่าใคร · โหราศาสตร์ปฏิวัติกรรมจากตำราไทยโบราณ ผสาน AI ที่จำคุณได้",
    statusTitle: "สถานะ",
    statusBody:
      "เนตรอยู่ในรายการผลิตภัณฑ์ของคุณ แต่แอปยังเชื่อม SSO จาก IN Z ไม่ครบ — หน้านี้เป็นหน้าสถานะ ไม่ใช่หน้าดูดวง",
    nextBody:
      "เมื่อพร้อม จะเปิดหน้าแชทเนตรแบบเดียวกับผลิตภัณฑ์อื่นในบัญชี IN Z",
    meanwhileTitle: "ระหว่างนี้",
    meanwhileBody: "ดูแคตตาล็อก SaaS หรือกลับไปแพ็กเกจของคุณ — คุยดวงได้เฉพาะหน้า /chat ของเนตร",
    catalog: "ดูในแคตตาล็อก SaaS",
    account: "แพ็กเกจของคุณ",
  },
  en: {
    eyebrow: "IN Z · SaaS",
    lead: "netr — Oracle of Karmic Stars · Thai karmic astrology from ancient texts plus AI that remembers you.",
    statusTitle: "Status",
    statusBody:
      "netr is listed in Your products, but IN Z SSO handoff is not live yet. This is the status page, not the chat oracle.",
    nextBody:
      "When ready, account open will take you into the netr web chat the same way other IN Z products do.",
    meanwhileTitle: "Meanwhile",
    meanwhileBody: "Review the SaaS catalog, or return to Your package. Chart chat is only on netr’s /chat page.",
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
          <h2>{t.statusTitle}</h2>
          <p>{t.statusBody}</p>
          <p>{t.nextBody}</p>
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
