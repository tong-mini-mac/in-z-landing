export const AUTH_SESSION_KEY = "inz_auth_session";
export const AUTH_SESSION_CHANGE_EVENT = "inz-auth-session-change";

function notifySessionChange(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(AUTH_SESSION_CHANGE_EVENT));
}

export type VatProfile = {
  companyName: string;
  taxId: string;
  billingAddress: string;
  branch: string;
};

export type AuthUser = {
  fullName: string;
  email: string;
  phone: string;
  vat?: VatProfile | null;
  createdAt: string;
  role?: "admin" | "user" | "trial";
  unlimited?: boolean;
  /** Locked product ids for complimentary trial users */
  allowedProducts?: string[];
  expiresAt?: string;
  revenue?: boolean;
  kind?: string;
};

export type AuthSession = {
  user: AuthUser;
  signedInAt: string;
};

export function getSession(): AuthSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(AUTH_SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AuthSession;
  } catch {
    return null;
  }
}

export function saveSession(user: AuthUser): AuthSession {
  const session: AuthSession = {
    user,
    signedInAt: new Date().toISOString(),
  };
  localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
  notifySessionChange();
  return session;
}

export function clearSession(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(AUTH_SESSION_KEY);
  notifySessionChange();
}

/** Optional “remember email” for Sign In (device-local only — never store password). */
export const AUTH_REMEMBER_KEY = "inz_auth_remember_email_v2";

export type RememberedCredentials = {
  email: string;
};

/** Drop legacy stores that used to keep passwords. */
export function purgeLegacyRememberStores(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem("inz_auth_remember");
  try {
    const raw = localStorage.getItem(AUTH_REMEMBER_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw) as { password?: string; email?: string };
    if (parsed.password) {
      localStorage.removeItem(AUTH_REMEMBER_KEY);
    }
  } catch {
    localStorage.removeItem(AUTH_REMEMBER_KEY);
  }
}

export function getRememberedCredentials(): RememberedCredentials | null {
  if (typeof window === "undefined") return null;
  try {
    purgeLegacyRememberStores();
    const raw = localStorage.getItem(AUTH_REMEMBER_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<RememberedCredentials> & {
      password?: string;
    };
    if (parsed.password) {
      localStorage.removeItem(AUTH_REMEMBER_KEY);
      return null;
    }
    const email = String(parsed.email || "").trim();
    if (!email) return null;
    return { email };
  } catch {
    return null;
  }
}

export function saveRememberedCredentials(email: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(
    AUTH_REMEMBER_KEY,
    JSON.stringify({
      email: email.trim().toLowerCase(),
    } satisfies RememberedCredentials),
  );
}

export function clearRememberedCredentials(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(AUTH_REMEMBER_KEY);
  localStorage.removeItem("inz_auth_remember");
}

/** Full sign-out: drop session and any remembered login fields. */
export function signOutLocal(): void {
  clearSession();
  clearRememberedCredentials();
  purgeLegacyRememberStores();
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function isValidPhone(value: string): boolean {
  return normalizePhoneNumber(value) !== null;
}

export function normalizePhoneNumber(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return null;

  const hasPlus = trimmed.startsWith("+");
  const digits = trimmed.replace(/\D/g, "");

  if (digits.length < 8 || digits.length > 15) {
    return null;
  }

  return `${hasPlus ? "+" : ""}${digits}`;
}

export function reportAuthActivity(
  email: string,
  action: "login" | "logout",
  extra?: { product_id?: string },
) {
  if (typeof window === "undefined") return;
  const normalized = email.trim().toLowerCase();
  if (!normalized.includes("@")) return;
  void fetch("/api/auth/activity", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: normalized,
      action,
      product_id: extra?.product_id,
    }),
    keepalive: true,
  }).catch(() => undefined);
}

export function combinePhoneNumber(
  countryCode: string,
  localNumber: string,
): string | null {
  const normalizedCountry = countryCode.replace(/[^\d+]/g, "");
  const localDigits = localNumber.replace(/\D/g, "");

  if (!normalizedCountry.startsWith("+") || localDigits.length < 4) {
    return null;
  }

  const normalizedLocal = localDigits.replace(/^0+/, "");
  if (!normalizedLocal) {
    return null;
  }

  return normalizePhoneNumber(`${normalizedCountry}${normalizedLocal}`);
}

export function isValidTaxId(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return digits.length === 13;
}
