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

export function buildResetPasswordEmail(params: {
  resetUrl: string;
  lang: "th" | "en";
}): { subject: string; text: string; html: string } {
  if (params.lang === "en") {
    const subject = "Reset your IN Z password";
    const text = [
      "Hello,",
      "",
      "We received a request to reset your IN Z account password.",
      "Click the link below to choose a new password:",
      "",
      params.resetUrl,
      "",
      "This link expires in 1 hour.",
      "",
      "If you did not request this, you can ignore this email.",
      "",
      "— IN Z",
      AUTH_FROM_EMAIL,
    ].join("\n");

    const html = `
      <p>Hello,</p>
      <p>We received a request to reset your IN Z account password.</p>
      <p><a href="${escapeAttr(params.resetUrl)}">Reset your password</a></p>
      <p>Or copy this link:<br/><code>${escapeHtml(params.resetUrl)}</code></p>
      <p>This link expires in 1 hour.</p>
      <p>If you did not request this, you can ignore this email.</p>
      <p>— IN Z<br/>${AUTH_FROM_EMAIL}</p>
    `;

    return { subject, text, html };
  }

  const subject = "รีเซ็ตรหัสผ่านบัญชี IN Z";
  const text = [
    "สวัสดี",
    "",
    "เราได้รับคำขอรีเซ็ตรหัสผ่านบัญชี IN Z ของคุณ",
    "กรุณาคลิกลิงก์ด้านล่างเพื่อตั้งรหัสผ่านใหม่:",
    "",
    params.resetUrl,
    "",
    "ลิงก์นี้หมดอายุใน 1 ชั่วโมง",
    "",
    "หากคุณไม่ได้ร้องขอ สามารถเพิกเฉยอีเมลนี้ได้",
    "",
    "— IN Z",
    AUTH_FROM_EMAIL,
  ].join("\n");

  const html = `
    <p>สวัสดี</p>
    <p>เราได้รับคำขอรีเซ็ตรหัสผ่านบัญชี IN Z ของคุณ</p>
    <p><a href="${escapeAttr(params.resetUrl)}">ตั้งรหัสผ่านใหม่</a></p>
    <p>หรือคัดลอกลิงก์นี้:<br/><code>${escapeHtml(params.resetUrl)}</code></p>
    <p>ลิงก์นี้หมดอายุใน 1 ชั่วโมง</p>
    <p>หากคุณไม่ได้ร้องขอ สามารถเพิกเฉยอีเมลนี้ได้</p>
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
