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

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function isValidPhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 9 && digits.length <= 15;
}

export function isValidTaxId(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return digits.length === 13;
}
