import { NextResponse } from "next/server";
import { listAtlasEntitlements } from "@/lib/atlas-commerce";

export async function GET(request: Request) {
  const email = new URL(request.url).searchParams.get("email") || "";
  if (!email.includes("@")) {
    return NextResponse.json({ error: "email" }, { status: 400 });
  }

  try {
    const data = await listAtlasEntitlements(email);
    return NextResponse.json(data);
  } catch (error) {
    console.error("[pay entitlements]", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "atlas_unavailable",
        items: [],
        allowed_products: [],
      },
      { status: 502 },
    );
  }
}
