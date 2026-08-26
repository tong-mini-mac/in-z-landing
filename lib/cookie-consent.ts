/** Device + per-account cookie preference (client-local). */

export const COOKIE_CONSENT_KEY = "inz_cookie_consent";
export const COOKIE_CONSENT_ACCOUNTS_KEY = "inz_cookie_consent_accounts";
export const COOKIE_CONSENT_VERSION = 2;

export type CookieConsentChoice = "accepted" | "rejected" | "custom";

export type CookiePreferences = {
  essential: true;
  analytics: boolean;
  marketing: boolean;
};

export type CookieConsentRecord = {
  choice: CookieConsentChoice;
  preferences: CookiePreferences;
  version: number;
  at: string;
  email?: string;
};

function prefsForChoice(choice: CookieConsentChoice): CookiePreferences {
  if (choice === "accepted") {
    return { essential: true, analytics: true, marketing: true };
  }
  if (choice === "rejected") {
    return { essential: true, analytics: false, marketing: false };
  }
  return { essential: true, analytics: false, marketing: false };
}

function isValidRecord(value: unknown): value is CookieConsentRecord {
  if (!value || typeof value !== "object") return false;
  const parsed = value as CookieConsentRecord;
  if (parsed.version !== COOKIE_CONSENT_VERSION) return false;
  if (
    parsed.choice !== "accepted" &&
    parsed.choice !== "rejected" &&
    parsed.choice !== "custom"
  ) {
    return false;
  }
  const prefs = parsed.preferences;
  if (!prefs || prefs.essential !== true) return false;
  if (typeof prefs.analytics !== "boolean" || typeof prefs.marketing !== "boolean") {
    return false;
  }
  return true;
}

export function readCookieConsent(): CookieConsentRecord | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;
    return isValidRecord(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function readAccountMap(): Record<string, CookieConsentRecord> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(COOKIE_CONSENT_ACCOUNTS_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, CookieConsentRecord>;
    if (!parsed || typeof parsed !== "object") return {};
    const out: Record<string, CookieConsentRecord> = {};
    for (const [email, record] of Object.entries(parsed)) {
      if (isValidRecord(record)) out[email.toLowerCase()] = record;
    }
    return out;
  } catch {
    return {};
  }
}

export function readCookieConsentForEmail(
  email: string | null | undefined,
): CookieConsentRecord | null {
  if (!email) return readCookieConsent();
  const key = email.trim().toLowerCase();
  if (!key) return readCookieConsent();
  const fromAccount = readAccountMap()[key];
  if (fromAccount) return fromAccount;
  return readCookieConsent();
}

/** Show modal when device has no consent, or signed-in account has none. */
export function needsCookieConsent(email?: string | null): boolean {
  if (typeof window === "undefined") return false;
  const device = readCookieConsent();
  if (!device) return true;
  if (!email) return false;
  const key = email.trim().toLowerCase();
  if (!key) return false;
  return !readAccountMap()[key];
}

export function writeCookieConsent(
  choice: CookieConsentChoice,
  preferences?: Partial<CookiePreferences>,
  email?: string | null,
): CookieConsentRecord {
  const base = prefsForChoice(choice);
  const record: CookieConsentRecord = {
    choice,
    preferences: {
      essential: true,
      analytics:
        choice === "custom"
          ? Boolean(preferences?.analytics)
          : base.analytics,
      marketing:
        choice === "custom"
          ? Boolean(preferences?.marketing)
          : base.marketing,
    },
    version: COOKIE_CONSENT_VERSION,
    at: new Date().toISOString(),
    email: email?.trim().toLowerCase() || undefined,
  };

  localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(record));

  if (record.email) {
    const map = readAccountMap();
    map[record.email] = record;
    localStorage.setItem(COOKIE_CONSENT_ACCOUNTS_KEY, JSON.stringify(map));
  }

  window.dispatchEvent(
    new CustomEvent("inz-cookie-consent", { detail: record }),
  );
  return record;
}
