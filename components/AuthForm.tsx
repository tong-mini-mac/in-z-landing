"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { AuthLangToggle } from "@/components/AuthLangToggle";
import {
  AUTH_COPY,
  normalizeAuthLang,
  setStoredAuthLang,
} from "@/lib/auth-i18n";
import { useSiteLang } from "@/lib/use-site-lang";
import {
  isDemoAdminEmail,
  isValidDemoAdmin,
} from "@/lib/demo-access";
import {
  clearRememberedCredentials,
  combinePhoneNumber,
  getRememberedCredentials,
  getSession,
  isValidEmail,
  isValidPhone,
  isValidTaxId,
  purgeLegacyRememberStores,
  saveRememberedCredentials,
  saveSession,
  signOutLocal,
  type AuthSession,
  type AuthUser,
  type VatProfile,
} from "@/lib/auth-session";

type AuthMode = "signin" | "signup";

const PHONE_COUNTRIES = [
  { code: "TH", dialCode: "+66", label: { th: "Thailand", en: "Thailand" } },
  {
    code: "US",
    dialCode: "+1",
    label: { th: "United States", en: "United States" },
  },
  { code: "GB", dialCode: "+44", label: { th: "United Kingdom", en: "United Kingdom" } },
  { code: "VN", dialCode: "+84", label: { th: "Vietnam", en: "Vietnam" } },
  { code: "ID", dialCode: "+62", label: { th: "Indonesia", en: "Indonesia" } },
  { code: "MY", dialCode: "+60", label: { th: "Malaysia", en: "Malaysia" } },
  { code: "CN", dialCode: "+86", label: { th: "China", en: "China" } },
  { code: "KR", dialCode: "+82", label: { th: "South Korea", en: "South Korea" } },
  { code: "JP", dialCode: "+81", label: { th: "Japan", en: "Japan" } },
  { code: "SG", dialCode: "+65", label: { th: "Singapore", en: "Singapore" } },
] as const;

export function AuthForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialMode: AuthMode =
    searchParams.get("mode") === "signup" ? "signup" : "signin";

  const [mode, setMode] = useState<AuthMode>(initialMode);
  const lang = useSiteLang();
  const [phoneCountry, setPhoneCountry] = useState<(typeof PHONE_COUNTRIES)[number]["code"]>("TH");
  const [needVat, setNeedVat] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptPdpa, setAcceptPdpa] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [pendingEmail, setPendingEmail] = useState("");
  const [existingSession, setExistingSession] = useState<AuthSession | null>(
    null,
  );

  const [fieldsReady, setFieldsReady] = useState(false);
  const [autofillLock, setAutofillLock] = useState(true);

  const t = AUTH_COPY[lang];

  useEffect(() => {
    purgeLegacyRememberStores();
    const remembered = getRememberedCredentials();
    setEmail(remembered?.email || "");
    setPassword("");
    setRememberMe(Boolean(remembered));
    setExistingSession(getSession());
    setFieldsReady(true);

    // Beat Chrome/Safari password autofill that re-injects after first paint.
    const timers = [50, 150, 400, 800].map((ms) =>
      window.setTimeout(() => {
        setPassword("");
        if (!getRememberedCredentials()) {
          setEmail("");
          setRememberMe(false);
        }
        setAutofillLock(false);
      }, ms),
    );
    return () => {
      for (const id of timers) window.clearTimeout(id);
    };
  }, []);

  useEffect(() => {
    const fromUrl = searchParams.get("lang") || searchParams.get("ui_lang");
    if (fromUrl) {
      setStoredAuthLang(normalizeAuthLang(fromUrl));
    }
  }, [searchParams]);

  useEffect(() => {
    setMode(searchParams.get("mode") === "signup" ? "signup" : "signin");
    setPendingEmail("");
    setError("");
  }, [searchParams]);

  function persistRememberChoice(nextEmail: string) {
    if (rememberMe) {
      saveRememberedCredentials(nextEmail);
    } else {
      clearRememberedCredentials();
    }
  }

  function onRememberChange(checked: boolean) {
    setRememberMe(checked);
    if (!checked) {
      clearRememberedCredentials();
    }
  }

  function switchMode(next: AuthMode) {
    setError("");
    setPendingEmail("");
    setMode(next);
    const params = new URLSearchParams();
    if (next === "signup") params.set("mode", "signup");
    else params.set("mode", "signin");
    params.set("lang", lang);
    router.replace(`/auth?${params.toString()}`, { scroll: false });
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    const form = event.currentTarget;
    const data = new FormData(form);
    const nextEmail = email.trim().toLowerCase();
    const nextPassword = password;

    if (!nextEmail || !isValidEmail(nextEmail)) {
      setError(t.errEmail);
      setSubmitting(false);
      return;
    }

    if (nextPassword.length < 8) {
      setError(t.errPassword);
      setSubmitting(false);
      return;
    }

    if (mode === "signin") {
      if (isDemoAdminEmail(nextEmail) && !isValidDemoAdmin(nextEmail, nextPassword)) {
        setError(t.errAdminPassword);
        setSubmitting(false);
        return;
      }

      if (isValidDemoAdmin(nextEmail, nextPassword)) {
        const user: AuthUser = {
          fullName: "IN Z Admin",
          email: nextEmail,
          phone: "",
          createdAt: new Date().toISOString(),
          role: "admin",
          unlimited: true,
        };
        persistRememberChoice(nextEmail);
        saveSession(user);
        router.push("/account");
        return;
      }

      try {
        const response = await fetch("/api/auth/special-signin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: nextEmail, password: nextPassword }),
        });
        const data = (await response.json()) as {
          ok?: boolean;
          error?: string;
          email?: string;
          username?: string;
          allowedProducts?: string[];
          expiresAt?: string;
          role?: "trial";
          kind?: string;
        };

        if (response.ok && data.ok) {
          const user: AuthUser = {
            fullName: (data.username || nextEmail).split("@")[0],
            email: data.email || data.username || nextEmail,
            phone: "",
            createdAt: new Date().toISOString(),
            role: "trial",
            unlimited: false,
            allowedProducts: data.allowedProducts || [],
            expiresAt: data.expiresAt,
            revenue: false,
            kind: data.kind || "complimentary",
          };
          persistRememberChoice(nextEmail);
          saveSession(user);
          router.push("/account");
          return;
        }

        const err = String(data.error || "");
        if (err.toLowerCase().includes("expired") || err.includes("ถูกลบ")) {
          setError("บัญชีทดลองหมดอายุแล้ว และถูกลบแล้ว — ใช้ username นี้ซ้ำไม่ได้");
          setSubmitting(false);
          return;
        }
        if (err && err !== "not_a_special_user") {
          setError("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
          setSubmitting(false);
          return;
        }
      } catch {
        /* fall through to generic local session for non-trial emails */
      }

      const user: AuthUser = {
        fullName: nextEmail.split("@")[0],
        email: nextEmail,
        phone: "",
        createdAt: new Date().toISOString(),
        role: "user",
        unlimited: false,
      };
      persistRememberChoice(nextEmail);
      saveSession(user);
      router.push("/account");
      return;
    }

    if (isDemoAdminEmail(nextEmail)) {
      setError(t.errAdminSignup);
      setSubmitting(false);
      return;
    }

    const fullName = String(data.get("fullName") || "").trim();
    const phoneLocal = String(data.get("phoneLocal") || "").trim();
    const confirm = String(data.get("confirmPassword") || "");
    const selectedCountry =
      PHONE_COUNTRIES.find((country) => country.code === phoneCountry) ??
      PHONE_COUNTRIES[0];
    const phone = combinePhoneNumber(selectedCountry.dialCode, phoneLocal);

    if (!fullName) {
      setError(t.errGeneric);
      setSubmitting(false);
      return;
    }

    if (!phone || !isValidPhone(phone)) {
      setError(t.errPhone);
      setSubmitting(false);
      return;
    }

    if (nextPassword !== confirm) {
      setError(t.errConfirm);
      setSubmitting(false);
      return;
    }

    if (!acceptTerms) {
      setError(t.errTerms);
      setSubmitting(false);
      return;
    }

    if (!acceptPdpa) {
      setError(t.errPdpa);
      setSubmitting(false);
      return;
    }

    let vat: VatProfile | null = null;
    if (needVat) {
      const companyName = String(data.get("companyName") || "").trim();
      const taxId = String(data.get("taxId") || "").trim();
      const billingAddress = String(data.get("billingAddress") || "").trim();
      const branch = String(data.get("branch") || "").trim();

      if (taxId && !isValidTaxId(taxId)) {
        setError(t.errTaxId);
        setSubmitting(false);
        return;
      }

      vat = {
        companyName,
        taxId: taxId.replace(/\D/g, ""),
        billingAddress,
        branch,
      };
    }

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email: nextEmail,
          phone,
          vat,
          lang,
        }),
      });
      const result = (await response.json()) as {
        ok?: boolean;
        error?: string;
        message?: string;
      };

      if (!response.ok || !result.ok) {
        setError(
          result.error === "email" ? t.errEmailSend : t.errGeneric,
        );
        setSubmitting(false);
        return;
      }

      setPendingEmail(nextEmail);
      setEmail("");
      setPassword("");
      form.reset();
      setPhoneCountry("TH");
      setNeedVat(false);
      setAcceptTerms(false);
      setAcceptPdpa(false);
      setSubmitting(false);
    } catch {
      setError(t.errEmailSend);
      setSubmitting(false);
    }
  }

  const canSubmitSignup = acceptTerms && acceptPdpa;

  if (pendingEmail) {
    return (
      <div className="auth-shell">
        <AuthLangToggle lang={lang} onChange={() => {}} />
        <div className="contact-success">
          <p>
            <strong>{t.checkEmailTitle}</strong>
          </p>
          <p>
            {t.checkEmailBody}
            <br />
            <strong>{pendingEmail}</strong>
          </p>
          <button
            type="button"
            className="contact-secondary"
            onClick={() => switchMode("signin")}
          >
            {t.switchToSignIn}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-shell">
      {existingSession ? (
        <div className="contact-success" style={{ marginBottom: "1.25rem" }}>
          <p>
            {t.signedInAs}{" "}
            <strong>
              {existingSession.user.fullName || existingSession.user.email}
            </strong>
          </p>
          <p className="muted">{t.alreadySignedInNote}</p>
          <div className="auth-phone-row" style={{ gap: "0.75rem", flexWrap: "wrap" }}>
            <button
              type="button"
              className="contact-submit"
              onClick={() => router.push("/account")}
            >
              {t.continueToAccount}
            </button>
            <button
              type="button"
              className="contact-secondary"
              onClick={() => {
                signOutLocal();
                setExistingSession(null);
                setEmail("");
                setPassword("");
                setRememberMe(false);
              }}
            >
              {t.signOut}
            </button>
          </div>
        </div>
      ) : null}

      <div className="auth-tabs" role="tablist" aria-label="Auth mode">
        <button
          type="button"
          role="tab"
          className={`auth-tab${mode === "signin" ? " is-active" : ""}`}
          aria-selected={mode === "signin"}
          onClick={() => switchMode("signin")}
        >
          {t.tabSignIn}
        </button>
        <button
          type="button"
          role="tab"
          className={`auth-tab${mode === "signup" ? " is-active" : ""}`}
          aria-selected={mode === "signup"}
          onClick={() => switchMode("signup")}
        >
          {t.tabSignUp}
        </button>
      </div>

      <form
        className="contact-form auth-form"
        onSubmit={onSubmit}
        noValidate
        autoComplete="off"
      >
        {/* Honey-pot / decoy fields — browsers often autofill the first email+password pair. */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "-10000px",
            top: "auto",
            width: 1,
            height: 1,
            overflow: "hidden",
          }}
        >
          <input type="text" name="username" tabIndex={-1} autoComplete="username" />
          <input
            type="password"
            name="password"
            tabIndex={-1}
            autoComplete="current-password"
          />
        </div>

        {mode === "signup" ? (
          <label className="contact-field">
            <span>{t.fullName}</span>
            <input
              type="text"
              name="fullName"
              required
              autoComplete="name"
              disabled={submitting}
            />
          </label>
        ) : null}

        <label className="contact-field">
          <span>{t.email}</span>
          {fieldsReady ? (
            <input
              type="text"
              name="inz_account_id"
              inputMode="email"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              required
              autoComplete="off"
              data-1p-ignore="true"
              data-lpignore="true"
              data-form-type="other"
              disabled={submitting}
              readOnly={autofillLock}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setAutofillLock(false)}
            />
          ) : (
            <input type="text" disabled value="" readOnly />
          )}
        </label>

        {mode === "signup" ? (
          <div className="contact-field">
            <span>{t.phone}</span>
            <div className="auth-phone-row">
              <label className="contact-field auth-phone-country">
                <span>{t.country}</span>
                <select
                  name="phoneCountry"
                  value={phoneCountry}
                  onChange={(e) =>
                    setPhoneCountry(
                      e.target.value as (typeof PHONE_COUNTRIES)[number]["code"],
                    )
                  }
                  disabled={submitting}
                >
                  {PHONE_COUNTRIES.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.label[lang]} ({country.dialCode})
                    </option>
                  ))}
                </select>
              </label>
              <label className="contact-field auth-phone-number">
                <span>{t.phoneNumber}</span>
                <input
                  type="tel"
                  name="phoneLocal"
                  required
                  autoComplete="tel-national"
                  placeholder={phoneCountry === "TH" ? "812345678" : "4155552671"}
                  disabled={submitting}
                />
              </label>
            </div>
          </div>
        ) : null}

        <div className="contact-field">
          <span>{t.password}</span>
          <div className="auth-password-row">
            {fieldsReady ? (
              <input
                type={showPassword ? "text" : "password"}
                name="inz_account_secret"
                required
                minLength={8}
                autoComplete="new-password"
                data-1p-ignore="true"
                data-lpignore="true"
                data-form-type="other"
                disabled={submitting}
                readOnly={autofillLock}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setAutofillLock(false)}
              />
            ) : (
              <input type="password" disabled value="" readOnly />
            )}
            <label className="auth-show-password">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={(e) => setShowPassword(e.target.checked)}
                disabled={submitting}
              />
              <span>{t.showPassword}</span>
            </label>
          </div>
        </div>

        {mode === "signin" ? (
          <label className="auth-check">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => onRememberChange(e.target.checked)}
              disabled={submitting}
            />
            <span>{t.rememberCredentials}</span>
          </label>
        ) : null}

        {mode === "signup" ? (
          <div className="contact-field">
            <span>{t.confirmPassword}</span>
            <div className="auth-password-row">
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                required
                minLength={8}
                autoComplete="new-password"
                disabled={submitting}
              />
              <label className="auth-show-password">
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={(e) => setShowPassword(e.target.checked)}
                  disabled={submitting}
                />
                <span>{t.showPassword}</span>
              </label>
            </div>
          </div>
        ) : null}

        {mode === "signup" ? (
          <>
            <label className="auth-check auth-check-disabled">
              <input
                type="checkbox"
                checked={false}
                disabled
                aria-disabled="true"
              />
              <span>
                {t.needVat}
                <small className="auth-check-note">{t.vatUnavailable}</small>
              </span>
            </label>

            {needVat ? (
              <div className="auth-vat-block">
                <label className="contact-field">
                  <span>{t.companyName}</span>
                  <input
                    type="text"
                    name="companyName"
                    autoComplete="organization"
                    disabled={submitting}
                  />
                </label>
                <label className="contact-field">
                  <span>{t.taxId}</span>
                  <input
                    type="text"
                    name="taxId"
                    inputMode="numeric"
                    maxLength={13}
                    disabled={submitting}
                  />
                </label>
                <label className="contact-field">
                  <span>{t.billingAddress}</span>
                  <textarea
                    name="billingAddress"
                    rows={3}
                    disabled={submitting}
                  />
                </label>
                <label className="contact-field">
                  <span>{t.branch}</span>
                  <input
                    type="text"
                    name="branch"
                    placeholder={t.branchHq}
                    disabled={submitting}
                  />
                </label>
              </div>
            ) : null}

            <label className="auth-check">
              <input
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                disabled={submitting}
              />
              <span>
                {t.acceptTerms}{" "}
                <Link className="auth-inline-link" href="/terms" target="_blank">
                  {t.termsLink}
                </Link>
              </span>
            </label>

            <label className="auth-check">
              <input
                type="checkbox"
                checked={acceptPdpa}
                onChange={(e) => setAcceptPdpa(e.target.checked)}
                disabled={submitting}
              />
              <span>
                {t.acceptPdpa}{" "}
                <Link className="auth-inline-link" href="/privacy" target="_blank">
                  {t.pdpaLink}
                </Link>
              </span>
            </label>
          </>
        ) : null}

        {error ? (
          <p className="contact-error" role="alert">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          className="contact-submit"
          disabled={submitting || (mode === "signup" && !canSubmitSignup)}
        >
          {submitting
            ? t.submitting
            : mode === "signin"
              ? t.submitSignIn
              : t.submitSignUp}
        </button>

        <p className="auth-switch">
          {mode === "signin" ? (
            <button type="button" onClick={() => switchMode("signup")}>
              {t.switchToSignUp}
            </button>
          ) : (
            <button type="button" onClick={() => switchMode("signin")}>
              {t.switchToSignIn}
            </button>
          )}
        </p>

        <div className="auth-lang-under-cta">
          <AuthLangToggle lang={lang} onChange={() => {}} />
        </div>

        <p className="auth-demo-note">{t.demoNote}</p>
      </form>
    </div>
  );
}
