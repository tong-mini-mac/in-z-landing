export const AUTH_SESSION_KEY = "inz_auth_session";

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
  return session;
}

export function clearSession(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(AUTH_SESSION_KEY);
}

/** Optional “remember email + password” for Sign In (device-local only). */
export const AUTH_REMEMBER_KEY = "inz_auth_remember";

export type RememberedCredentials = {
  email: string;
  password: string;
};

export function getRememberedCredentials(): RememberedCredentials | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(AUTH_REMEMBER_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<RememberedCredentials>;
    const email = String(parsed.email || "").trim();
    const password = String(parsed.password || "");
    if (!email || !password) return null;
    return { email, password };
  } catch {
    return null;
  }
}

export function saveRememberedCredentials(
  email: string,
  password: string,
): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(
    AUTH_REMEMBER_KEY,
    JSON.stringify({
      email: email.trim().toLowerCase(),
      password,
    } satisfies RememberedCredentials),
  );
}

export function clearRememberedCredentials(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(AUTH_REMEMBER_KEY);
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
