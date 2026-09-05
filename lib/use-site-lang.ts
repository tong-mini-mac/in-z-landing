"use client";

import { useEffect, useState } from "react";
import {
  AUTH_LANG_CHANGE_EVENT,
  getStoredAuthLang,
  normalizeAuthLang,
  type AuthLang,
} from "@/lib/auth-i18n";

const STUDIO_LANG_KEY = "inz_studio_lang";

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

function getStoredStudioLang(): AuthLang | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(STUDIO_LANG_KEY);
  if (!raw) return null;
  return normalizeAuthLang(raw);
}

/**
 * Studio defaults to English on first visit.
 * Remembers TH/EN separately from www.inz.lol.
 */
export function useStudioLang(): [AuthLang, (lang: AuthLang) => void] {
  const [lang, setLang] = useState<AuthLang>("en");

  useEffect(() => {
    const stored = getStoredStudioLang();
    const next = stored ?? "en";
    setLang(next);
    document.documentElement.lang = next;
  }, []);

  function changeLang(next: AuthLang) {
    if (typeof window !== "undefined") {
      localStorage.setItem(STUDIO_LANG_KEY, next);
    }
    setLang(next);
    document.documentElement.lang = next;
  }

  return [lang, changeLang];
}
