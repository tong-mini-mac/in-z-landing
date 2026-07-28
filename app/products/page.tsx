import type { Metadata } from "next";
import Image from "next/image";
import { ProductCard } from "@/components/ProductCard";
import { SiteFooter, SiteNav } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: "Products — IN Z",
  description:
    "IN Z products — SynthComm, AI-Commerce, RestoChain, Music Demo, Podcast, and NetR.",
};

const AUTH_SIGNUP = "/auth?mode=signup";

const SYNTHCOMM_DESCRIPTION =
  "SynthComm is an AI-powered platform that generates high-fidelity Thai conversational datasets for businesses training chatbots, customer service systems, and language models. Using advanced multi-agent orchestration, it produces authentic Thai dialogue across diverse contexts including e-commerce, social media, food delivery, banking, and healthcare. The system combines web research with specialized AI writers to create natural conversations that reflect real Thai communication patterns, including proper use of polite particles, regional dialects, slang, and gender-diverse voices. Each conversation undergoes dual-layer quality control to ensure linguistic accuracy, cultural appropriateness, and contextual relevance. The platform automatically retrains its models monthly using live data from Thai social platforms to stay current with evolving language trends. Designed for B2B clients, SynthComm handles everything from small pilot projects to enterprise-scale datasets of 10,000+ conversations through automated parallel processing, delivering production-ready training data in JSON, CSV, or bundled formats with full PDPA compliance and data privacy protection.";

const AICOMMERCE_DESCRIPTION =
  "AI-Commerce is a Python-based procurement orchestration system designed for Southeast Asian online sellers operating across Shopee, Lazada, TikTok Shop, and Facebook Marketplace. It automates supplier communication workflows through three specialized agents handling sourcing and quotation analysis, purchase order management with vendor tracking, and delivery coordination with automated claim generation. The system routes incoming messages across four business domains: sourcing and negotiation, invoicing and quotations, delivery and claims, and inventory management. Built with human-in-the-loop approval gates at critical decision points, it assists buyers with RFQ distribution, quote comparison, PO generation, and supplier follow-ups while keeping final approval authority with staff. The platform includes optional LLM-enhanced intent classification, multi-tenant support via tenant IDs, and integrates with a separate Stock Core API for real-time inventory visibility across procurement and fulfillment operations.";

const RESTOCHAIN_DESCRIPTION =
  "RestoChain is a comprehensive restaurant management platform that combines inventory control, food costing, POS, and kitchen display systems with intelligent yield tracking. The system calculates true food costs by accounting for ingredient waste during preparation, automatically adjusting stock deductions based on calibrated yield percentages for each ingredient. It features smart receipt scanning with OCR for automated goods receiving, real-time kitchen order management, waste analytics, demand forecasting, and stocktake workflows. Built with FastAPI backend and React 19 frontend, it supports multi-branch operations with role-based access, integrates with Universal ERP for accounting and procurement workflows, and includes LINE OA notifications for low-stock alerts and daily summaries. The platform offers tiered subscription plans from Starter to Growth with optional add-ons for Smart Receive and Cost Intelligence analytics.";

const MUSIC_DEMO_DESCRIPTION =
  "Music Demo is an AI music creation studio for makers, creators, and small labels. Users generate song drafts from prompts, preview multiple takes, then confirm and export in formats that fit their workflow — from MP3 and WAV to lyrics, chords, MIDI, MusicXML, and stems on higher plans. Plans scale from Starter through Studio with monthly song quotas, optional re-edit on confirmed tracks, AI voice options, and busker-friendly modes. Built for fast creative loops with clear export rights per plan, so teams can move from idea to usable audio without a full production stack.";

const PODCAST_DESCRIPTION =
  "Podcast is a full-cycle Thai podcast platform for upload, AI transcription, show notes, clips, subtitles, RSS publishing, and monetization. It supports Thai and English plus regional dialect workflows for Isan, Northern, and Southern Thai through dialect-aware prompts. Creators get episode pipelines with calendar, analytics, social scheduling, guest CRM, and sponsor-ready ad slots. Billing starts with a 14-day free trial, then Starter, Creator, and Pro monthly plans so indie podcasters and content studios can produce and distribute without stitching separate tools together.";

const NETR_DESCRIPTION =
  "NetR is an IN Z network and relationship product for mapping partners, channels, and operating links across the business. It helps teams keep counterparties, referral paths, and collaboration status visible in one place so growth and operations stay aligned. Designed as a commercial IN Z product alongside SynthComm, AI-Commerce, RestoChain, Music Demo, and Podcast — with Early Bird and standard plans for teams that need structured network visibility without building a custom CRM from scratch.";

const CATALOG = [
  {
    name: "SynthComm",
    title: "SynthComm — Industrial Thai Synthetic Data Factory",
    description: SYNTHCOMM_DESCRIPTION,
    earlyBirdPrice: "฿3 / conversation",
    regularPrice: "฿5 / conversation",
  },
  {
    name: "AI-Commerce",
    title: "AI-Commerce — Multi-Agent Procurement Assistant for Online Sellers",
    description: AICOMMERCE_DESCRIPTION,
    earlyBirdPrice: "Contact for Early Bird",
    regularPrice: "Subscription tiers",
  },
  {
    name: "RestoChain",
    title: "RestoChain — Yield-Aware Restaurant Inventory & Food Costing",
    description: RESTOCHAIN_DESCRIPTION,
    earlyBirdPrice: "Starter Early Bird",
    regularPrice: "Starter → Growth",
  },
  {
    name: "Music Demo",
    title: "Music Demo — AI Music Creation Studio",
    description: MUSIC_DEMO_DESCRIPTION,
    earlyBirdPrice: "Starter ฿99 / month",
    regularPrice: "฿99 – ฿1,599 / month",
  },
  {
    name: "Podcast",
    title: "Podcast — AI Podcast Studio for Thai Creators",
    description: PODCAST_DESCRIPTION,
    earlyBirdPrice: "14-day free trial",
    regularPrice: "฿599 – ฿2,999 / month",
  },
  {
    name: "NetR",
    title: "NetR — Network & Relationship Hub",
    description: NETR_DESCRIPTION,
    earlyBirdPrice: "Contact for Early Bird",
    regularPrice: "Subscription tiers",
  },
] as const;

export default function ProductsPage() {
  return (
    <main className="page page-products" id="products">
      <div className="bg" aria-hidden="true" />
      <SiteNav />

      <section className="hero hero-products" aria-label="Brand">
        <Image
          className="logo-mark logo-mark-products"
          src="/logo-transparent.png"
          alt="IN Z"
          width={400}
          height={400}
          priority
          unoptimized
        />
        <p className="brand">IN Z</p>
      </section>

      <div className="products-panel">
        {CATALOG.map((product) => (
          <ProductCard
            key={product.name}
            name={product.name}
            title={product.title}
            description={product.description}
            subscribeHref={AUTH_SIGNUP}
            earlyBirdPrice={product.earlyBirdPrice}
            regularPrice={product.regularPrice}
          />
        ))}
      </div>

      <SiteFooter />
    </main>
  );
}
