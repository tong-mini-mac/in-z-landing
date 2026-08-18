import { NextResponse } from "next/server";
import {
  confirmAtlasPurchase,
  rejectAtlasPurchase,
} from "@/lib/atlas-commerce";
import { findCheckoutSku } from "@/lib/checkout-skus";
import {
  entitlementPayloadFromSku,
  notifyProductEntitlement,
} from "@/lib/product-notify";
import { verifyTransferDecision } from "@/lib/transfer-approval";

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token") || "";
  const parsed = verifyTransferDecision(token);
  if (!parsed) {
    return html(400, "ลิงก์หมดอายุหรือไม่ถูกต้อง", "Ask คุณสมร to resend the slip alert.");
  }

  try {
    if (parsed.action === "reject") {
      const rejected = await rejectAtlasPurchase(parsed.transferId, "secretary_telegram");
      return html(
        200,
        "ปฏิเสธสลิปแล้ว",
        `${rejected.email} · ${rejected.sku_id} · ${parsed.transferId}`,
      );
    }

    const confirmed = await confirmAtlasPurchase(parsed.transferId);
    const sku = findCheckoutSku(confirmed.sku_id);
    if (sku && confirmed.status === "paid" && !confirmed.duplicate) {
      await notifyProductEntitlement(
        sku,
        entitlementPayloadFromSku({
          sku,
          email: confirmed.email,
          displayName: confirmed.display_name,
          chargeId: confirmed.omise_charge_id,
          invoiceId: confirmed.invoice_id,
          paidAt: confirmed.paid_at,
        }),
      );
    }
    return html(
      200,
      confirmed.duplicate ? "อนุมัติไว้แล้ว" : "อนุมัติแล้ว — เปิดสิทธิ์ใน Atlas",
      `${confirmed.email} · ${confirmed.sku_id} · ${parsed.transferId}`,
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "decide_failed";
    return html(502, "อนุมัติไม่สำเร็จ", message);
  }
}

function html(status: number, title: string, detail: string) {
  const body = `<!doctype html>
<html lang="th">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(title)}</title>
    <style>
      body { font-family: ui-sans-serif, system-ui, sans-serif; margin: 0; background: #f4f1ea; color: #0a0a0a; }
      main { max-width: 32rem; margin: 12vh auto; padding: 2rem; }
      h1 { font-size: 1.4rem; margin: 0 0 0.6rem; }
      p { color: #555; margin: 0; line-height: 1.5; word-break: break-word; }
    </style>
  </head>
  <body>
    <main>
      <h1>${escapeHtml(title)}</h1>
      <p>${escapeHtml(detail)}</p>
    </main>
  </body>
</html>`;
  return new NextResponse(body, {
    status,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
