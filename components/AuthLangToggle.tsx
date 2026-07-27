"use client";

import { type AuthLang, setStoredAuthLang } from "@/lib/auth-i18n";

type AuthLangToggleProps = {
  lang: AuthLang;
  onChange: (lang: AuthLang) => void;
};

export function AuthLangToggle({ lang, onChange }: AuthLangToggleProps) {
  function select(next: AuthLang) {
    setStoredAuthLang(next);
    onChange(next);
    document.documentElement.lang = next;
  }

  return (
    <div className="auth-lang" role="group" aria-label="Language">
      <button
        type="button"
        className={`auth-lang-btn${lang === "th" ? " is-active" : ""}`}
        aria-pressed={lang === "th"}
        onClick={() => select("th")}
      >
        TH
      </button>
      <span className="auth-lang-sep" aria-hidden="true">
        /
      </span>
      <button
        type="button"
        className={`auth-lang-btn${lang === "en" ? " is-active" : ""}`}
        aria-pressed={lang === "en"}
        onClick={() => select("en")}
      >
        EN
      </button>
    </div>
  );
}
