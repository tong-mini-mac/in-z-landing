import { formatFromAddress, MAILBOX } from "@/lib/mail-addresses";

export const AUTH_FROM_EMAIL = MAILBOX.noReply;

export function buildActivationEmail(params: {
  fullName: string;
  activateUrl: string;
  lang: "th" | "en";
}): { subject: string; text: string; html: string } {
  if (params.lang === "en") {
    const subject = "Activate your IN Z account";
    const text = [
      `Hello ${params.fullName},`,
      "",
      "Thank you for signing up for an IN Z account.",
      "Please click the link below to activate your account:",
      "",
      params.activateUrl,
      "",
      "This link expires in 48 hours.",
      "",
      "If you did not sign up, you can ignore this email.",
      "",
      "— IN Z",
      AUTH_FROM_EMAIL,
    ].join("\n");

    const html = `
      <p>Hello ${escapeHtml(params.fullName)},</p>
      <p>Thank you for signing up for an IN Z account.</p>
      <p><a href="${escapeAttr(params.activateUrl)}">Activate your account</a></p>
      <p>Or copy this link:<br/><code>${escapeHtml(params.activateUrl)}</code></p>
      <p>This link expires in 48 hours.</p>
      <p>If you did not sign up, you can ignore this email.</p>
      <p>— IN Z<br/>${AUTH_FROM_EMAIL}</p>
    `;

    return { subject, text, html };
  }

  const subject = "Activate บัญชี IN Z ของคุณ";
  const text = [
    `สวัสดีคุณ ${params.fullName}`,
    "",
    "ขอบคุณที่สมัครบัญชี IN Z",
    "กรุณาคลิกลิงก์ด้านล่างเพื่อ Activate บัญชีของคุณ:",
    "",
    params.activateUrl,
    "",
    "ลิงก์นี้หมดอายุใน 48 ชั่วโมง",
    "",
    "หากคุณไม่ได้สมัคร สามารถเพิกเฉยอีเมลนี้ได้",
    "",
    "— IN Z",
    AUTH_FROM_EMAIL,
  ].join("\n");

  const html = `
    <p>สวัสดีคุณ ${escapeHtml(params.fullName)}</p>
    <p>ขอบคุณที่สมัครบัญชี IN Z</p>
    <p><a href="${escapeAttr(params.activateUrl)}">Activate บัญชี</a></p>
    <p>หรือคัดลอกลิงก์นี้:<br/><code>${escapeHtml(params.activateUrl)}</code></p>
    <p>ลิงก์นี้หมดอายุใน 48 ชั่วโมง</p>
    <p>หากคุณไม่ได้สมัคร สามารถเพิกเฉยอีเมลนี้ได้</p>
    <p>— IN Z<br/>${AUTH_FROM_EMAIL}</p>
  `;

  return { subject, text, html };
}

export function activationFromAddress(): string {
  return formatFromAddress(MAILBOX.noReply);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeAttr(value: string): string {
  return escapeHtml(value).replace(/'/g, "&#39;");
}
