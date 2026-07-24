import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { SiteFooter, SiteNav } from "@/components/SiteChrome";
import {
  CONTACT_CHANNELS,
  parseContactChannel,
} from "@/lib/contact";

type ContactPageProps = {
  searchParams: Promise<{ channel?: string }>;
};

export async function generateMetadata({
  searchParams,
}: ContactPageProps): Promise<Metadata> {
  const params = await searchParams;
  const channel = parseContactChannel(params.channel);
  const label = CONTACT_CHANNELS[channel].label;

  return {
    title: `${label} — IN Z`,
    description: `Contact IN Z ${label.toLowerCase()}.`,
  };
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = await searchParams;
  const channel = parseContactChannel(params.channel);
  const config = CONTACT_CHANNELS[channel];

  return (
    <main className="page page-scroll">
      <div className="bg bg-soft" aria-hidden="true" />
      <SiteNav />

      <article className="about contact-page">
        <header className="about-hero">
          <p className="about-eyebrow">Contact</p>
          <h1>{config.label}</h1>
          <p className="about-lead">
            Leave your email and message. We&apos;ll get back to you at the
            address you provide.
          </p>
        </header>

        <ContactForm channel={channel} />
      </article>

      <SiteFooter />
    </main>
  );
}
