import type { AuthSession } from "@/lib/auth-session";
import type { ProductId } from "@/lib/products";

export type HandoffRequestResult = {
  url: string | null;
  status: number;
  error?: string;
};

/** Parse path + hash from a product demo href for SSO handoff. */
export function pathPartsFromHref(href: string): { path: string; hash: string } {
  try {
    const url = new URL(href);
    return {
      path: url.pathname || "/",
      hash: url.hash.replace(/^#/, ""),
    };
  } catch {
    return { path: "/", hash: "" };
  }
}

export async function requestProductHandoffUrl(args: {
  session: AuthSession;
  productId: ProductId | string;
  unlimited?: boolean;
  path?: string;
  hash?: string;
  source?: "demo" | "account";
}): Promise<HandoffRequestResult> {
  const { session, productId, unlimited, path, hash, source } = args;
  const email = session.user.email;
  if (!email) return { url: null, status: 401, error: "email" };

  try {
    const response = await fetch("/api/auth/product-handoff", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        productId,
        role: session.user.role || "user",
        unlimited: Boolean(session.user.unlimited || unlimited),
        allowedProducts: session.user.allowedProducts || [],
        kind: session.user.kind,
        expiresAt: session.user.expiresAt,
        path,
        hash,
        source: source || "account",
      }),
    });
    const data = (await response.json()) as {
      ok?: boolean;
      url?: string;
      error?: string;
      message?: string;
    };

    if (response.ok && data.url) {
      return { url: data.url, status: response.status };
    }

    return {
      url: null,
      status: response.status,
      error: data.message || data.error,
    };
  } catch {
    return { url: null, status: 0, error: "network" };
  }
}
