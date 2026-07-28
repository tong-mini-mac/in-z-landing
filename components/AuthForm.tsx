"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { AuthLangToggle } from "@/components/AuthLangToggle";
import {
  AUTH_COPY,
  getStoredAuthLang,
  type AuthLang,
} from "@/lib/auth-i18n";
import {
  DEMO_ADMIN_EMAIL,
  DEMO_ADMIN_PASSWORD,
  isDemoAdminEmail,
  isValidDemoAdmin,
} from "@/lib/demo-access";
import {
  combinePhoneNumber,
  getSession,
  isValidEmail,
  isValidPhone,
  isValidTaxId,
  saveSession,
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
  const [lang, setLang] = useState<AuthLang>("th");
  const [phoneCountry, setPhoneCountry] = useState<(typeof PHONE_COUNTRIES)[number]["code"]>("TH");
  const [needVat, setNeedVat] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptPdpa, setAcceptPdpa] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [pendingEmail, setPendingEmail] = useState("");

  const t = AUTH_COPY[lang];

  useEffect(() => {
    const stored = getStoredAuthLang();
    setLang(stored);
    document.documentElement.lang = stored;
    if (getSession()) {
      router.replace("/account");
    }
  }, [router]);

  useEffect(() => {
    setMode(searchParams.get("mode") === "signup" ? "signup" : "signin");
    setPendingEmail("");
    setError("");
  }, [searchParams]);

  function switchMode(next: AuthMode) {
    setError("");
    setPendingEmail("");
    setMode(next);
    const url = next === "signup" ? "/auth?mode=signup" : "/auth?mode=signin";
    router.replace(url, { scroll: false });
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    const form = event.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") || "").trim().toLowerCase();
    const password = String(data.get("password") || "");

    if (!email || !isValidEmail(email)) {
      setError(t.errEmail);
      setSubmitting(false);
      return;
    }

    if (password.length < 8) {
      setError(t.errPassword);
      setSubmitting(false);
      return;
    }

    if (mode === "signin") {
      if (isDemoAdminEmail(email) && !isValidDemoAdmin(email, password)) {
        setError(t.errAdminPassword);
        setSubmitting(false);
        return;
      }

      if (isValidDemoAdmin(email, password)) {
        const user: AuthUser = {
          fullName: "IN Z Admin",
          email,
          phone: "",
          createdAt: new Date().toISOString(),
          role: "admin",
          unlimited: true,
        };
        saveSession(user);
        router.push("/account");
        return;
      }

      try {
        const response = await fetch("/api/auth/special-signin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: email, password }),
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
            fullName: (data.username || email).split("@")[0],
            email: data.email || data.username || email,
            phone: "",
            createdAt: new Date().toISOString(),
            role: "trial",
            unlimited: false,
            allowedProducts: data.allowedProducts || [],
            expiresAt: data.expiresAt,
            revenue: false,
            kind: data.kind || "complimentary",
          };
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
        fullName: email.split("@")[0],
        email,
        phone: "",
        createdAt: new Date().toISOString(),
        role: "user",
        unlimited: false,
      };
      saveSession(user);
      router.push("/account");
      return;
    }

    if (isDemoAdminEmail(email)) {
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

    if (password !== confirm) {
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
        body: JSON.stringify({ fullName, email, phone, vat, lang }),
      });
      const data = (await response.json()) as {
        ok?: boolean;
        error?: string;
        message?: string;
      };

      if (!response.ok || !data.ok) {
        setError(
          data.error === "email" ? t.errEmailSend : t.errGeneric,
        );
        setSubmitting(false);
        return;
      }

      setPendingEmail(email);
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
        <AuthLangToggle lang={lang} onChange={setLang} />
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
      <AuthLangToggle lang={lang} onChange={setLang} />

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

      <form className="contact-form auth-form" onSubmit={onSubmit} noValidate>
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
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            disabled={submitting}
            defaultValue={mode === "signin" ? DEMO_ADMIN_EMAIL : ""}
            key={`email-${mode}`}
          />
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
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              minLength={8}
              autoComplete={
                mode === "signup" ? "new-password" : "current-password"
              }
              disabled={submitting}
              defaultValue={mode === "signin" ? DEMO_ADMIN_PASSWORD : ""}
              key={`password-${mode}`}
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

        <p className="auth-demo-note">{t.demoNote}</p>
      </form>
    </div>
  );
}
