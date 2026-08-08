"use client";

import Image from "next/image";
import Link from "next/link";
import { SiteFooter, SiteNav } from "@/components/SiteChrome";
import { useSiteLang } from "@/lib/use-site-lang";

const COPY = {
  th: {
    eyebrow: "IN Z · SaaS",
    lead: "ศูนย์เครือข่ายและความสัมพันธ์ — แมปพาร์ทเนอร์ ช่องทาง และลิงก์การทำงานไว้ที่เดียว",
    statusTitle: "สถานะ",
    statusBody:
      "NetR อยู่ในรายการ Your products สำหรับ Early Bird / แผนเชิงพาณิชย์ แต่แอปยังไม่เปิดใช้งาน — หน้านี้เป็นหน้าสถานะ ไม่ใช่หน้า Products ที่ซ้อนกัน",
    nextBody:
      "เมื่อ SaaS พร้อม จะเข้า workspace แบบเดียวกับ Music Demo และ Content Creator",
    meanwhileTitle: "ระหว่างนี้",
    meanwhileBody: "ดูรายละเอียดในแคตตาล็อก SaaS หรือกลับไป Your products",
    catalog: "ดูในแคตตาล็อก SaaS",
    account: "Your products",
  },
  en: {
    eyebrow: "IN Z · SaaS",
    lead: "Network & Relationship Hub — map partners, channels, and operating links in one place.",
    statusTitle: "Status",
    statusBody:
      "NetR is listed in Your products for Early Bird / commercial planning, but the product app is not live yet. This is the NetR status page.",
    nextBody:
      "When SaaS launches, account open will hand off into the NetR workspace the same way Music Demo and Content Creator do.",
    meanwhileTitle: "Meanwhile",
    meanwhileBody: "Review the SaaS catalog, or return to Your products.",
    catalog: "View on SaaS catalog",
    account: "Your products",
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
