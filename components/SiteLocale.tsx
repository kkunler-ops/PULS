"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import type { Locale } from "@/lib/i18n";
import {
  isSiteLocale,
  siteCopy,
  type SiteCopy,
  type SiteLocale,
} from "@/lib/site-i18n";

const SITE_LOCALE_KEY = "puls.site.locale";

type SiteLocaleContextValue = {
  locale: SiteLocale;
  copy: SiteCopy;
  setLocale: (locale: SiteLocale) => void;
};

const SiteLocaleContext = createContext<SiteLocaleContextValue | null>(null);

function useHydrated() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

function loadSiteLocale(): SiteLocale {
  if (typeof window === "undefined") return "en";
  try {
    const stored = window.localStorage.getItem(SITE_LOCALE_KEY);
    if (isSiteLocale(stored)) return stored;
  } catch {
    // Ignore blocked storage and keep English.
  }
  return "en";
}

function persistSiteLocale(locale: SiteLocale) {
  try {
    window.localStorage.setItem(SITE_LOCALE_KEY, locale);
  } catch {
    // Ignore blocked storage.
  }
}

export function SiteLocaleProvider({ children }: { children: React.ReactNode }) {
  const hydrated = useHydrated();
  const [locale, setLocaleState] = useState<SiteLocale>("en");
  const [didLoad, setDidLoad] = useState(false);

  if (hydrated && !didLoad) {
    setLocaleState(loadSiteLocale());
    setDidLoad(true);
  }

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((next: SiteLocale) => {
    setLocaleState(next);
    persistSiteLocale(next);
  }, []);

  const value = useMemo(
    () => ({
      locale,
      copy: siteCopy[locale],
      setLocale,
    }),
    [locale, setLocale],
  );

  return (
    <SiteLocaleContext.Provider value={value}>{children}</SiteLocaleContext.Provider>
  );
}

export function useSiteLocale() {
  const context = useContext(SiteLocaleContext);
  if (!context) {
    throw new Error("useSiteLocale must be used within SiteLocaleProvider");
  }
  return context;
}

export const siteLanguageOptions = ["en", "de", "es"] as const satisfies readonly Locale[];
