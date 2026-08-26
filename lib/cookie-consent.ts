/** Device-local cookie preference (not a server session). */

export const COOKIE_CONSENT_KEY = "inz_cookie_consent";
export const COOKIE_CONSENT_VERSION = 1;

export type CookieConsentChoice = "accepted" | "essential";

export type CookieConsentRecord = {
  choice: CookieConsentChoice;
  version: number;
  at: string;
};

export function readCookieConsent(): CookieConsentRecord | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CookieConsentRecord;
    if (
      !parsed ||
      (parsed.choice !== "accepted" && parsed.choice !== "essential") ||
      parsed.version !== COOKIE_CONSENT_VERSION
    ) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function writeCookieConsent(choice: CookieConsentChoice): void {
  if (typeof window === "undefined") return;
  const record: CookieConsentRecord = {
    choice,
    version: COOKIE_CONSENT_VERSION,
    at: new Date().toISOString(),
  };
  localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(record));
  window.dispatchEvent(
    new CustomEvent("inz-cookie-consent", { detail: record }),
  );
}
