/** Canonical IN Z mailboxes for production. */
export const MAILBOX = {
  noReply: "no-reply@inz.lol",
  info: "info@inz.lol",
  help: "help@inz.lol",
} as const;

export type MailboxKey = keyof typeof MAILBOX;

export const MAIL_FROM_NAME = "IN Z";

export function formatFromAddress(email: string, name = MAIL_FROM_NAME): string {
  return `${name} <${email}>`;
}
