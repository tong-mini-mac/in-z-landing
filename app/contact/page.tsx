import type { Metadata } from "next";
import { ContactPageView } from "@/components/ContactPageView";
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
  return <ContactPageView channel={channel} />;
}
