"use client";

import { useEffect, useState } from "react";
import {
  AUTH_LANG_CHANGE_EVENT,
  getStoredAuthLang,
  type AuthLang,
} from "@/lib/auth-i18n";

/** Shared TH/EN preference across every Landing surface. */
export function useSiteLang(): AuthLang {
  const [lang, setLang] = useState<AuthLang>("th");

  useEffect(() => {
    const stored = getStoredAuthLang();
    setLang(stored);
    document.documentElement.lang = stored;

    function onLangChange(event: Event) {
      const detail = (event as CustomEvent<{ lang?: AuthLang }>).detail;
      const next = detail?.lang || getStoredAuthLang();
      setLang(next);
      document.documentElement.lang = next;
    }

    window.addEventListener(AUTH_LANG_CHANGE_EVENT, onLangChange);
    return () => window.removeEventListener(AUTH_LANG_CHANGE_EVENT, onLangChange);
  }, []);

  return lang;
}
