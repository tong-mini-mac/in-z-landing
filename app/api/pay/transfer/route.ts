import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { recordAtlasPurchase, recordAtlasSlip } from "@/lib/atlas-commerce";
import { getBankAccount, SLIP_MAX_BYTES, SLIP_TYPES } from "@/lib/bank-account";
import { findCheckoutSku, withVat } from "@/lib/checkout-skus";
import { formatFromAddress, MAILBOX } from "@/lib/mail-addresses";
import { getMailStatus, sendMail } from "@/lib/mail";
import { notifySecretarySlip } from "@/lib/notify-secretary";
import { transferDecideUrls } from "@/lib/transfer-approval";

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const sku = findCheckoutSku(String(form.get("skuId") || "").trim());
    const email = String(form.get("email") || "")
      .trim()
      .toLowerCase();
    const displayName = String(form.get("displayName") || "").trim();
    const taxId = String(form.get("taxId") || "").trim();
    const slip = form.get("slip");

    if (!sku || sku.quoteOnly) {
      return NextResponse.json({ error: "unknown_sku" }, { status: 400 });
    }
    if (!email.includes("@")) {
      return NextResponse.json({ error: "email" }, { status: 400 });
    }
    if (!(slip instanceof File) || slip.size < 1) {
      return NextResponse.json({ error: "slip_required" }, { status: 400 });
    }
    if (slip.size > SLIP_MAX_BYTES) {
      return NextResponse.json({ error: "slip_too_big" }, { status: 400 });
    }
    const contentType = slip.type || "application/octet-stream";
    if (!SLIP_TYPES.has(contentType)) {
      return NextResponse.json({ error: "slip_type" }, { status: 400 });
    }

    const money = withVat(sku.amountBaht);
    const transferId = `xfer_${randomUUID().replace(/-/g, "").slice(0, 16)}`;
    const bank = getBankAccount();
    const bytes = Buffer.from(await slip.arrayBuffer());
    const filename = safeFilename(slip.name, contentType);

    const atlas = await recordAtlasPurchase({
      email,
      display_name: displayName,
      tax_id: taxId,
      product_id: sku.productId,
      plan_id: sku.planId,
      sku_id: sku.id,
      omise_charge_id: transferId,
      amount: money.amount,
      vat_amount: money.vat,
      total_amount: money.total,
      currency: "THB",
      interval: sku.interval,
      credits: sku.credits,
      minutes: sku.minutes,
      status: "pending_slip",
      metadata: {
        model: sku.model,
        method: "bank_transfer",
        slip_name: filename,
      },
    });

    try {
      await recordAtlasSlip({
        email,
        transfer_id: transferId,
        filename,
        content_type: contentType,
        content_base64: bytes.toString("base64"),
        product_id: sku.productId,
        plan_id: sku.planId,
        invoice_id: atlas.invoice_id,
      });
    } catch (error) {
      console.error("[pay transfer] atlas slip archive failed", transferId, error);
      return NextResponse.json(
        {
          error: "slip_archive_failed",
          message: error instanceof Error ? error.message : "Could not store slip in Atlas",
        },
        { status: 502 },
      );
    }

    const mock = process.env.DEMO_BILLING_MOCK === "1";
    if (!mock && !getMailStatus().configured) {
      return NextResponse.json({ error: "mail_not_configured" }, { status: 503 });
    }

    if (!mock) {
      const sent = await sendMail({
        to: MAILBOX.info,
        from: formatFromAddress(MAILBOX.noReply),
        replyTo: email,
        subject: `Bank transfer slip — ${sku.productName} ${sku.planId}`,
        text: [
          `Transfer ID: ${transferId}`,
          `Invoice: ${atlas.invoice_id || "-"}`,
          `Buyer: ${displayName || email} <${email}>`,
          `Product: ${sku.productName} (${sku.productId})`,
          `Model: ${sku.model}`,
          `Plan: ${sku.planId} / ${sku.id}`,
          `Amount excl. VAT: ฿${money.amount}`,
          `VAT 7%: ฿${money.vat}`,
          `Total: ฿${money.total}`,
          bank
            ? `Paid to: ${bank.bankName} ${bank.accountNumber} (${bank.accountName})`
            : "Bank account env is not set on the server",
          "",
          "Status: pending_slip — คุณสมร will request approval on Telegram.",
        ].join("\n"),
        html: `<p>Bank transfer slip awaiting secretary approval on Telegram.</p>
<p><strong>${escapeHtml(sku.productName)}</strong> · ${escapeHtml(sku.planId)} · ฿${money.total}</p>
<p>Buyer: ${escapeHtml(displayName || email)} &lt;${escapeHtml(email)}&gt;</p>
<p>Transfer ${escapeHtml(transferId)} · Invoice ${escapeHtml(atlas.invoice_id || "-")}</p>`,
        attachments: [
          {
            filename,
            content: bytes,
            contentType,
          },
        ],
      });
      if (!sent.ok) {
        return NextResponse.json(
          { error: "email", message: sent.error },
          { status: 502 },
        );
      }
    }

    if (!mock) {
      const urls = transferDecideUrls(transferId, request);
      const secretary = process.env.SECRETARY_NAME?.trim() || "คุณสมร";
      const notified = await notifySecretarySlip({
        title: "สลิปโอนรออนุมัติ",
        text: [
          `${secretary} — มีสลิปโอนรออนุมัติ`,
          "",
          `ลูกค้า: ${displayName || email} <${email}>`,
          `ผลิตภัณฑ์: ${sku.productName} (${sku.model})`,
          `แพ็กเกจ: ${sku.planId} / ${sku.id}`,
          `ยอดรวม: ฿${money.total} (ก่อน VAT ฿${money.amount} + VAT ฿${money.vat})`,
          bank
            ? `โอนเข้า: ${bank.bankName} ${bank.accountNumber} (${bank.accountName})`
            : "ยังไม่ได้ตั้งเลขบัญชีบนเซิร์ฟเวอร์",
          `Transfer: ${transferId}`,
          `Invoice: ${atlas.invoice_id || "-"}`,
          "",
          "ตรวจสลิปให้ตรงยอด แล้วกดอนุมัติเพื่อเปิดสิทธิ์ใน Atlas",
        ].join("\n"),
        approveUrl: urls.approveUrl,
        rejectUrl: urls.rejectUrl,
        filename,
        contentType,
        bytes,
      });
      if (!notified) {
        console.error("[pay transfer] secretary telegram notify failed", transferId);
      }
    }

    return NextResponse.json({
      ok: true,
      pending: true,
      transferId,
      invoiceId: atlas.invoice_id,
      skuId: sku.id,
      amount: money,
    });
  } catch (error) {
    console.error("[pay transfer]", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "transfer_failed" },
      { status: 502 },
    );
  }
}

function safeFilename(name: string, contentType: string): string {
  const base = name.replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/^-+|-+$/g, "");
  if (base) return base.slice(0, 80);
  const ext =
    contentType === "application/pdf"
      ? "pdf"
      : contentType === "image/png"
        ? "png"
        : contentType === "image/webp"
          ? "webp"
          : "jpg";
  return `slip.${ext}`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
