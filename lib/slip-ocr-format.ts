/** Format Atlas bank-slip OCR result for Telegram / email. */

export type SlipOcrResult = {
  status?: string;
  reason?: string;
  fields?: {
    payer_name?: string | null;
    amount?: number | null;
    transferred_at?: string | null;
    ref?: string | null;
  };
  name?: { status?: string; reason?: string; score?: number };
  amount?: { status?: string; reason?: string };
};

function statusTh(status?: string, reason?: string): string {
  if (reason === "no_expected_name") return "ไม่มีชื่อลูกค้าให้เทียบ";
  if (reason === "no_payer_name") return "ไม่ชัด (อ่านชื่อผู้โอนไม่ได้)";
  switch (status) {
    case "match":
      return "ตรง";
    case "mismatch":
      return "ไม่ตรง";
    case "unclear":
      return "ไม่ชัด";
    case "skipped":
      return "ข้าม";
    default:
      return status || "—";
  }
}

function reasonTh(reason?: string): string {
  switch (reason) {
    case "pdf_not_supported":
      return "ยังไม่อ่าน PDF";
    case "unsupported_content_type":
      return "ชนิดไฟล์ไม่รองรับ";
    case "ocr_not_configured":
      return "ยังไม่ได้ตั้งค่า Vision";
    case "ocr_error":
      return "OCR ล้มเหลว";
    default:
      return reason || "skipped";
  }
}

export function formatSlipOcrLines(ocr?: SlipOcrResult | null): string[] {
  if (!ocr) return ["OCR: ไม่มีผล"];
  const fields = ocr.fields || {};
  const payer = fields.payer_name || "—";
  const amountText =
    typeof fields.amount === "number" ? `฿${fields.amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "—";
  const ref = fields.ref || "—";
  const when = fields.transferred_at || "—";
  const lines = [
    `OCR: ผู้โอน «${payer}» · ยอด ${amountText} · เวลา ${when} · อ้างอิง ${ref}`,
  ];
  if (ocr.status === "skipped") {
    const reason = reasonTh(ocr.reason);
    lines.push(`ชื่อ: ข้าม (${reason})`);
    lines.push(`ยอด: ข้าม (${reason})`);
    return lines;
  }
  const name = ocr.name || {};
  const amount = ocr.amount || {};
  const scoreBit =
    typeof name.score === "number" ? ` (score ${name.score})` : "";
  lines.push(`ชื่อ: ${statusTh(name.status, name.reason)}${scoreBit}`);
  lines.push(`ยอด: ${statusTh(amount.status, amount.reason)}`);
  return lines;
}
