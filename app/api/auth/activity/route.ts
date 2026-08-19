import { NextResponse } from "next/server";
import { safeRecordAtlasActivity } from "@/lib/atlas-commerce";

const ACTIONS = new Set([
  "login",
  "logout",
  "signup_activate",
  "product_open",
  "token_usage",
  "save_work",
]);

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      email?: string;
      action?: string;
      product_id?: string;
      plan_id?: string;
      quantity?: number;
      unit?: string;
      storage_uri?: string;
    };
    const email = String(body.email || "")
      .trim()
      .toLowerCase();
    const action = String(body.action || "").trim().toLowerCase();
    if (!email.includes("@") || !ACTIONS.has(action)) {
      return NextResponse.json({ error: "invalid" }, { status: 400 });
    }
    const forwarded = request.headers.get("x-forwarded-for") || "";
    const ip = forwarded.split(",")[0]?.trim() || "";
    await safeRecordAtlasActivity({
      email,
      action: action as "login" | "logout" | "signup_activate" | "product_open" | "token_usage" | "save_work",
      source: "landing",
      product_id: body.product_id,
      plan_id: body.plan_id,
      quantity: body.quantity,
      unit: body.unit,
      storage_uri: body.storage_uri,
      ip,
      user_agent: request.headers.get("user-agent") || "",
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: true });
  }
}
