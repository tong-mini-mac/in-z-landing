import type { Metadata } from "next";
import Image from "next/image";
import { ProductCard } from "@/components/ProductCard";
import { SiteFooter, SiteNav } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: "Products — IN Z",
  description:
    "IN Z products — SynthComm, AI-Commerce, and RestoChain. Synthetic data, procurement, and restaurant inventory platforms.",
};

const CONTACT =
  "https://personal-secretary-production-3d5f.up.railway.app/contact/";

const SYNTHCOMM_DESCRIPTION =
  "SynthComm is an AI-powered platform that generates high-fidelity Thai conversational datasets for businesses training chatbots, customer service systems, and language models. Using advanced multi-agent orchestration, it produces authentic Thai dialogue across diverse contexts including e-commerce, social media, food delivery, banking, and healthcare. The system combines web research with specialized AI writers to create natural conversations that reflect real Thai communication patterns, including proper use of polite particles, regional dialects, slang, and gender-diverse voices. Each conversation undergoes dual-layer quality control to ensure linguistic accuracy, cultural appropriateness, and contextual relevance. The platform automatically retrains its models monthly using live data from Thai social platforms to stay current with evolving language trends. Designed for B2B clients, SynthComm handles everything from small pilot projects to enterprise-scale datasets of 10,000+ conversations through automated parallel processing, delivering production-ready training data in JSON, CSV, or bundled formats with full PDPA compliance and data privacy protection.";

const AICOMMERCE_DESCRIPTION =
  "AI-Commerce is a Python-based procurement orchestration system designed for Southeast Asian online sellers operating across Shopee, Lazada, TikTok Shop, and Facebook Marketplace. It automates supplier communication workflows through three specialized agents handling sourcing and quotation analysis, purchase order management with vendor tracking, and delivery coordination with automated claim generation. The system routes incoming messages across four business domains: sourcing and negotiation, invoicing and quotations, delivery and claims, and inventory management. Built with human-in-the-loop approval gates at critical decision points, it assists buyers with RFQ distribution, quote comparison, PO generation, and supplier follow-ups while keeping final approval authority with staff. The platform includes optional LLM-enhanced intent classification, multi-tenant support via tenant IDs, and integrates with a separate Stock Core API for real-time inventory visibility across procurement and fulfillment operations.";

const RESTOCHAIN_DESCRIPTION =
  "RestoChain is a comprehensive restaurant management platform that combines inventory control, food costing, POS, and kitchen display systems with intelligent yield tracking. The system calculates true food costs by accounting for ingredient waste during preparation, automatically adjusting stock deductions based on calibrated yield percentages for each ingredient. It features smart receipt scanning with OCR for automated goods receiving, real-time kitchen order management, waste analytics, demand forecasting, and stocktake workflows. Built with FastAPI backend and React 19 frontend, it supports multi-branch operations with role-based access, integrates with Universal ERP for accounting and procurement workflows, and includes LINE OA notifications for low-stock alerts and daily summaries. The platform offers tiered subscription plans from Starter to Growth with optional add-ons for Smart Receive and Cost Intelligence analytics.";

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
        <ProductCard
          name="SynthComm"
          title="SynthComm — Industrial Thai Synthetic Data Factory"
          description={SYNTHCOMM_DESCRIPTION}
          subscribeHref={CONTACT}
        />
        <ProductCard
          name="AI-Commerce"
          title="AI-Commerce — Multi-Agent Procurement Assistant for Online Sellers"
          description={AICOMMERCE_DESCRIPTION}
          subscribeHref={CONTACT}
        />
        <ProductCard
          name="RestoChain"
          title="RestoChain — Yield-Aware Restaurant Inventory & Food Costing"
          description={RESTOCHAIN_DESCRIPTION}
          subscribeHref={CONTACT}
        />
      </div>

      <SiteFooter />
    </main>
  );
}
