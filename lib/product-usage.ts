import type { AuthSession } from "@/lib/auth-session";

export type ActivityAction =
  | "login"
  | "logout"
  | "signup_activate"
  | "product_open"
  | "token_usage"
  | "save_work";

export type ProductActivityPayload = {
  email: string;
  action: ActivityAction;
  product_id?: string;
  plan_id?: string;
  quantity?: number;
  unit?: string;
  storage_uri?: string;
  metadata?: Record<string, string | number | boolean | null>;
};

/** Fire-and-forget activity to Atlas via Landing API (keyed by account email). */
export function reportProductActivity(payload: ProductActivityPayload): void {
  if (typeof window === "undefined") return;
  const email = String(payload.email || "")
    .trim()
    .toLowerCase();
  if (!email.includes("@")) return;

  void fetch("/api/auth/activity", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      action: payload.action,
      product_id: payload.product_id,
      plan_id: payload.plan_id,
      quantity: payload.quantity,
      unit: payload.unit,
      storage_uri: payload.storage_uri,
      metadata: payload.metadata,
    }),
    keepalive: true,
  }).catch(() => undefined);
}

type DemoUsageSession = {
  productId: string;
  email: string;
  startedAt: number;
  opened: boolean;
};

/**
 * Tracks per-account demo product sessions: product_open + duration chunks
 * (token_usage, unit=seconds) so Atlas can sum time by email + product_id.
 */
export function createDemoUsageTracker() {
  let current: DemoUsageSession | null = null;

  function flush(reason: string) {
    if (!current) return;
    const endedAt = Date.now();
    const seconds = Math.max(1, Math.round((endedAt - current.startedAt) / 1000));
    const { email, productId, startedAt, opened } = current;
    current = null;

    if (!opened) {
      reportProductActivity({
        email,
        action: "product_open",
        product_id: productId,
        metadata: {
          surface: "demo",
          reason,
        },
      });
    }

    reportProductActivity({
      email,
      action: "token_usage",
      product_id: productId,
      quantity: seconds,
      unit: "seconds",
      metadata: {
        surface: "demo",
        kind: "session_duration",
        reason,
        started_at: new Date(startedAt).toISOString(),
        ended_at: new Date(endedAt).toISOString(),
      },
    });
  }

  function start(productId: string, session: AuthSession | null, opts?: {
    /** true when server handoff already logged product_open */
    openedViaHandoff?: boolean;
  }) {
    flush("switch");
    const email = session?.user?.email?.trim().toLowerCase();
    if (!email || !productId) return;

    current = {
      productId,
      email,
      startedAt: Date.now(),
      opened: Boolean(opts?.openedViaHandoff),
    };

    if (!opts?.openedViaHandoff) {
      reportProductActivity({
        email,
        action: "product_open",
        product_id: productId,
        metadata: { surface: "demo", reason: "open" },
      });
      current.opened = true;
    }
  }

  function stop(reason = "close") {
    flush(reason);
  }

  /** Periodic flush so long sessions are not lost if the tab crashes. */
  function heartbeat() {
    if (!current) return;
    const { productId, email, opened } = current;
    flush("heartbeat");
    current = {
      productId,
      email,
      startedAt: Date.now(),
      opened: true,
    };
    void opened;
  }

  function activeProductId() {
    return current?.productId ?? null;
  }

  return { start, stop, heartbeat, activeProductId };
}
