"use client";

import { useEffect, useState } from "react";
import { AuthLangToggle } from "@/components/AuthLangToggle";
import {
  AUTH_COPY,
  getStoredAuthLang,
  type AuthLang,
} from "@/lib/auth-i18n";

const AUTH_HREF = "/auth";

export function NavAuth() {
  const [lang, setLang] = useState<AuthLang>("th");

  useEffect(() => {
    const stored = getStoredAuthLang();
    setLang(stored);
    document.documentElement.lang = stored;
  }, []);

  function onLangChange(next: AuthLang) {
    setLang(next);
    document.documentElement.lang = next;
  }

  const label = lang === "th" ? "Sign In / Sign Up" : AUTH_COPY.en.tabSignIn + " / " + AUTH_COPY.en.tabSignUp;

  return (
    <div className="nav-auth-wrap">
      <a className="nav-auth" href={`${AUTH_HREF}?lang=${lang}`}>
        {label}
      </a>
      <AuthLangToggle lang={lang} onChange={onLangChange} />
    </div>
  );
}
