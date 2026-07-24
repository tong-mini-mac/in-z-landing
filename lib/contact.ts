export type ContactChannel = "customer-service" | "support";

export const CONTACT_CHANNELS: Record<
  ContactChannel,
  { label: string; to: string; subject: string }
> = {
  "customer-service": {
    label: "Customer Service",
    to: "info@inz.lol",
    subject: "Customer Service inquiry — inz.lol",
  },
  support: {
    label: "Support",
    to: "help@inz.lol",
    subject: "Support request — inz.lol",
  },
};

export function parseContactChannel(value: string | null | undefined): ContactChannel {
  if (value === "support") return "support";
  return "customer-service";
}
