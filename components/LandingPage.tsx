"use client";

import { HowItWorks } from "@/components/HowItWorks";
import { useSiteLocale } from "@/components/SiteLocale";
import { APP_STORE_URL } from "@/lib/app-store";

const ctaClassName =
  "inline-flex h-14 w-full items-center justify-center rounded-full bg-[#006039] px-8 text-base font-medium text-white shadow-[0_16px_40px_rgba(0,96,57,0.28)] transition hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#006039]/25 sm:w-auto";

export function LandingPage() {
  const { copy, locale } = useSiteLocale();

  return (
    <main className="mx-auto max-w-5xl px-6 pb-20 sm:px-10 sm:pb-24 lg:px-16 lg:pb-32">
      <section className="pt-12 sm:pt-16 lg:pt-24">
        <p className="text-xs font-medium tracking-[0.18em] text-[#006039] uppercase">
          {copy.problem}
        </p>
        <h1 className="mt-4 max-w-3xl text-[2rem] font-medium leading-[1.15] tracking-[-0.04em] text-stone-800 sm:text-5xl sm:leading-[1.12] lg:text-[3.5rem]">
          {copy.headline}
        </h1>

        <div className="mt-10 grid gap-8 sm:mt-14 sm:grid-cols-2 sm:gap-12 lg:gap-20">
          <p className="flex flex-col gap-2">
            <span className="text-5xl font-medium tracking-[-0.05em] text-[#006039] sm:text-6xl lg:text-7xl">
              {copy.europeCount}
            </span>
            <span className="max-w-xs text-base leading-relaxed text-stone-600 sm:text-lg">
              {copy.europeStat}
            </span>
          </p>
          <p className="flex flex-col gap-2">
            <span className="text-5xl font-medium tracking-[-0.05em] text-[#006039] sm:text-6xl lg:text-7xl">
              {copy.usCount}
            </span>
            <span className="max-w-xs text-base leading-relaxed text-stone-600 sm:text-lg">
              {copy.usStat}
            </span>
          </p>
        </div>

        <p className="mt-10 max-w-2xl text-lg leading-relaxed text-stone-600 sm:mt-14 sm:text-xl">
          {copy.problemBody}
        </p>
        <p className="mt-6 text-xs leading-relaxed text-stone-400 sm:text-sm">
          {copy.sources}
        </p>
      </section>

      <section className="mt-20 border-t border-stone-300/70 pt-16 sm:mt-28 sm:pt-20 lg:mt-32">
        <p className="text-xs font-medium tracking-[0.18em] text-[#006039] uppercase">
          {copy.solution}
        </p>
        <h2 className="mt-4 max-w-3xl text-[1.85rem] font-medium leading-[1.15] tracking-[-0.04em] text-stone-800 sm:text-4xl lg:text-5xl">
          {copy.solutionHeadline}
        </h2>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-stone-600 sm:text-xl">
          {copy.solutionBody}
        </p>

        <HowItWorks copy={copy} locale={locale} />
      </section>

      <section className="mt-20 border-t border-stone-300/70 pt-16 text-center sm:mt-28 sm:pt-20 lg:mt-32">
        <h2 className="text-[1.85rem] font-medium leading-[1.15] tracking-[-0.04em] text-stone-800 sm:text-4xl">
          {copy.ctaHeadline}
        </h2>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-stone-600 sm:text-lg">
          {copy.ctaBody}
        </p>
        <div className="mt-8 flex justify-center sm:mt-10">
          <a href={APP_STORE_URL} className={ctaClassName}>
            {copy.ctaButton}
          </a>
        </div>
      </section>
    </main>
  );
}
