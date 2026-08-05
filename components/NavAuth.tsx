"use client";

import { useEffect, useState } from "react";
import { AuthLangToggle } from "@/components/AuthLangToggle";
import {
  AUTH_SESSION_CHANGE_EVENT,
  getSession,
} from "@/lib/auth-session";
import { SITE_COPY } from "@/lib/site-i18n";
import { useSiteLang } from "@/lib/use-site-lang";

export function NavAuth() {
  const lang = useSiteLang();
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    function refresh() {
      setSignedIn(Boolean(getSession()));
    }
    refresh();
    window.addEventListener(AUTH_SESSION_CHANGE_EVENT, refresh);
    window.addEventListener("storage", refresh);
    window.addEventListener("focus", refresh);
    return () => {
      window.removeEventListener(AUTH_SESSION_CHANGE_EVENT, refresh);
      window.removeEventListener("storage", refresh);
      window.removeEventListener("focus", refresh);
    };
  }, []);

  const label = signedIn
    ? SITE_COPY[lang].nav.account
    : SITE_COPY[lang].nav.signIn;
  const href = signedIn
    ? `/account?lang=${lang}`
    : `/auth?mode=signin&lang=${lang}`;

  return (
    <div className="nav-auth-wrap">
      <a className="nav-auth" href={href}>
        {label}
      </a>
      <AuthLangToggle lang={lang} onChange={() => {}} />
    </div>
  );
}
