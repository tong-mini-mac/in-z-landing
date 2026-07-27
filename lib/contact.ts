import { MAILBOX } from "@/lib/mail-addresses";

export type ContactChannel = "customer-service" | "support";

export const CONTACT_CHANNELS: Record<
  ContactChannel,
  { label: string; to: string; subject: string }
> = {
  "customer-service": {
    label: "Customer Service",
    to: MAILBOX.info,
    subject: "Customer Service inquiry — inz.lol",
  },
  support: {
    label: "Support",
    to: MAILBOX.help,
    subject: "Support request — inz.lol",
  },
};

export function parseContactChannel(value: string | null | undefined): ContactChannel {
  if (value === "support") return "support";
  return "customer-service";
}
