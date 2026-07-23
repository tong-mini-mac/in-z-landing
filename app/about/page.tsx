import type { Metadata } from "next";
import { SiteFooter, SiteNav } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: "About Us — IN Z",
  description:
    "IN Z is an AI-powered platform that helps you restore balance to your life. One drop, infinite impact.",
};

const pillars = [
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
];

export default function AboutPage() {
  return (
    <main className="page page-scroll">
      <div className="bg bg-soft" aria-hidden="true" />
      <SiteNav />

      <article className="about">
        <header className="about-hero">
          <p className="about-eyebrow">About IN Z</p>
          <h1>From a drop to waves of change</h1>
          <p className="about-lead">
            IN Z is an AI-powered platform that helps you restore balance to your life.
            We believe small changes can create massive impact—like a drop of water
            creating ripples across a pond.
          </p>
          <p className="about-motto">Manage Your Mind · Control Your Time · Unlock Your Potential</p>
        </header>

        <section className="about-block">
          <h2>Who we are</h2>
          <p>
            In a world overflowing with information, constant rush, and imbalance, IN Z
            was born from a simple question:
          </p>
          <blockquote>
            If AI can make our lives easier, why does it feel more complicated?
          </blockquote>
          <p>
            We believe that good technology shouldn&apos;t add burden—it should restore
            balance to your life.
          </p>
        </section>

        <section className="about-block">
          <h2>Our story</h2>
          <p>
            We had countless AI tools, but life didn&apos;t get easier. More apps, but
            less time. More data, but harder decisions.
          </p>
          <p>We asked ourselves: AI should make life better, not more complex—right?</p>
          <p>That&apos;s how IN Z was born.</p>
          <p>We built a platform that:</p>
          <ul>
            <li>Doesn&apos;t tell you to do everything, but helps you choose what matters</li>
            <li>Doesn&apos;t add work, but reduces burden</li>
            <li>Isn&apos;t complicated, but simple yet powerful</li>
          </ul>
        </section>

        <section className="about-block">
          <h2>The ripple effect</h2>
          <p>
            Like a drop of water falling onto a still surface, creating expanding
            ripples—IN Z believes that small changes in daily life can create massive
            impact.
          </p>
          <ul className="about-pillars about-pillars-inline">
            <li>
              <strong>The Drop</strong>
              <span>Small decisions you make today</span>
            </li>
            <li>
              <strong>The Ripples</strong>
              <span>Results that expand across every dimension of life</span>
            </li>
            <li>
              <strong>Balance</strong>
              <span>The ultimate goal we help you achieve</span>
            </li>
          </ul>
        </section>

        <section className="about-block">
          <h2>Mission</h2>
          <p>We develop AI-powered tools that help you balance your life.</p>
          <ul className="about-pillars">
            {pillars.map((pillar) => (
              <li key={pillar.title}>
                <strong>{pillar.title}</strong>
                <ul>
                  {pillar.lines.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>

        <section className="about-block">
          <h2>Why IN Z</h2>
          <ul>
            <li>
              <strong>Not just AI tools</strong> — we&apos;re your balance partner who
              understands that life is more than work.
            </li>
            <li>
              <strong>Not complicated</strong> — every feature is designed for
              simplicity and real-world usability.
            </li>
            <li>
              <strong>We grow with you</strong> — our AI learns from you to provide
              increasingly personalized recommendations.
            </li>
          </ul>
        </section>

        <section className="about-block">
          <h2>Vision</h2>
          <p>We dream of a world where:</p>
          <ul>
            <li>Everyone can access AI easily, no matter where they are</li>
            <li>Technology creates balance, not destroys it</li>
            <li>Small changes lead to big results</li>
          </ul>
        </section>

        <section className="about-block about-close" id="contact">
          <h2>One drop, infinite impact</h2>
          <p>
            IN Z isn&apos;t just a product—it&apos;s a movement. Start today. Create
            your own ripple.
          </p>
          <p className="about-signoff">IN Z — Balance Your Life with AI</p>
          <p>
            <a
              className="about-mail"
              href="https://personal-secretary-production-3d5f.up.railway.app/contact/"
              target="_blank"
              rel="noreferrer"
            >
              Contact us
            </a>
          </p>
        </section>
      </article>

      <div className="about-footer-wrap">
        <SiteFooter />
      </div>
    </main>
  );
}
