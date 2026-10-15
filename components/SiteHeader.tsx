"use client";

import Link from "next/link";
import { LanguageMenu } from "@/components/LanguageMenu";
import { siteLanguageOptions, useSiteLocale } from "@/components/SiteLocale";
import { toSiteLocale } from "@/lib/site-i18n";

export function SiteHeader() {
  const { locale, copy, setLocale } = useSiteLocale();

  return (
    <header className="px-6 pt-7 sm:px-10 sm:pt-9 lg:px-16 lg:pt-12">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
        <Link
          href="/"
          className="text-sm font-medium tracking-[0.22em] text-[#006039]"
        >
          PULS
        </Link>
        <nav className="flex items-center gap-4 text-sm text-stone-600 sm:gap-6">
          <Link href="/blog" className="transition hover:text-stone-900">
            {copy.blog}
          </Link>
          <Link href="/app" className="transition hover:text-stone-900">
            {copy.openTheApp}
          </Link>
          <LanguageMenu
            locale={locale}
            label={copy.language}
            locales={siteLanguageOptions}
            onChange={(code) => setLocale(toSiteLocale(code))}
          />
        </nav>
      </div>
    </header>
  );
}
