/**
 * Alert คุณสมร (Personal Secretary) on Telegram so the owner can approve a bank slip.
 * Tries the secretary service first, then the Telegram Bot API as fallback.
 */

export type SecretarySlipAlert = {
  title: string;
  text: string;
  approveUrl: string;
  rejectUrl: string;
  filename: string;
  contentType: string;
  bytes: Buffer;
};

function secretaryBaseUrl() {
  return (
    process.env.PERSONAL_SECRETARY_URL?.trim() ||
    process.env.SECRETARY_URL?.trim() ||
    "https://personal-secretary-production-3d5f.up.railway.app"
  ).replace(/\/$/, "");
}

function opsKey() {
  return (
    process.env.INZ_OPS_ALERT_KEY ||
    process.env.ERP_SPECIAL_LOGIN_KEY ||
    process.env.ERP_SERVICE_KEY ||
    ""
  ).trim();
}

function telegramChatId() {
  return (
    process.env.TELEGRAM_ALERT_CHAT_ID?.trim() ||
    process.env.TELEGRAM_CHAT_ID?.trim() ||
    ""
  );
}

export function isSecretaryNotifyConfigured() {
  return Boolean(
    opsKey() ||
      (process.env.TELEGRAM_BOT_TOKEN?.trim() && telegramChatId()),
  );
}

async function notifyViaSecretary(alert: SecretarySlipAlert): Promise<boolean> {
  const key = opsKey();
  if (!key) return false;
  const url = `${secretaryBaseUrl()}/api/inz/ops-alert`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-INZ-Ops-Key": key,
      },
      body: JSON.stringify({
        title: alert.title,
        text: alert.text.slice(0, 3500),
        approve_url: alert.approveUrl,
        reject_url: alert.rejectUrl,
        filename: alert.filename,
        content_type: alert.contentType,
        photo_base64: alert.bytes.toString("base64"),
      }),
    });
    if (!response.ok) {
      console.warn("[secretary-alert] ops-alert HTTP", response.status);
      return false;
    }
    return true;
  } catch (error) {
    console.warn("[secretary-alert] ops-alert failed", error);
    return false;
  }
}

async function telegramForm(
  method: "sendPhoto" | "sendDocument" | "sendMessage",
  fields: Record<string, string>,
  file?: { field: string; filename: string; contentType: string; bytes: Buffer },
): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = telegramChatId();
  if (!token || !chatId) return false;

  const body = new FormData();
  body.set("chat_id", chatId);
  for (const [key, value] of Object.entries(fields)) {
    body.set(key, value);
  }
  if (file) {
    body.set(
      file.field,
      new Blob([new Uint8Array(file.bytes)], { type: file.contentType }),
      file.filename,
    );
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
      method: "POST",
      body,
    });
    if (!response.ok) {
      console.warn("[secretary-alert] telegram HTTP", response.status, await response.text().catch(() => ""));
      return false;
    }
    return true;
  } catch (error) {
    console.warn("[secretary-alert] telegram failed", error);
    return false;
  }
}

function keyboard(alert: SecretarySlipAlert) {
  return JSON.stringify({
    inline_keyboard: [
      [
        { text: "✅ อนุมัติ", url: alert.approveUrl },
        { text: "❌ ปฏิเสธ", url: alert.rejectUrl },
      ],
    ],
  });
}

async function notifyViaTelegramBot(alert: SecretarySlipAlert): Promise<boolean> {
  const caption = alert.text.slice(0, 1000);
  const markup = keyboard(alert);
  const isPdf = alert.contentType === "application/pdf";
  const isImage = alert.contentType.startsWith("image/");

  if (isImage) {
    const ok = await telegramForm(
      "sendPhoto",
      { caption, reply_markup: markup },
      {
        field: "photo",
        filename: alert.filename,
        contentType: alert.contentType,
        bytes: alert.bytes,
      },
    );
    if (ok) return true;
  } else if (isPdf) {
    const ok = await telegramForm(
      "sendDocument",
      { caption, reply_markup: markup },
      {
        field: "document",
        filename: alert.filename,
        contentType: alert.contentType,
        bytes: alert.bytes,
      },
    );
    if (ok) return true;
  }

  return telegramForm("sendMessage", {
    text: alert.text.slice(0, 3900),
    disable_web_page_preview: "true",
    reply_markup: markup,
  });
}

export async function notifySecretarySlip(alert: SecretarySlipAlert): Promise<boolean> {
  const viaPs = await notifyViaSecretary(alert);
  if (viaPs) {
    console.info("[secretary-alert]", { viaPs: true, title: alert.title });
    return true;
  }
  const viaBot = await notifyViaTelegramBot(alert);
  console.info("[secretary-alert]", { viaPs: false, viaBot, title: alert.title });
  return viaBot;
}
