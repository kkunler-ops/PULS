import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "PULS",
  description:
    "Millions of people live alone. If something happens, others may notice too late — or not at all. PULS is a daily check-in that alerts your emergency contact if you go silent.",
};

const ctaClassName =
  "inline-flex h-14 w-full items-center justify-center rounded-full bg-[#006039] px-8 text-base font-medium text-white shadow-[0_16px_40px_rgba(0,96,57,0.28)] transition hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#006039]/25 sm:w-auto";

export default function LandingPage() {
  return (
    <div className="min-h-dvh">
      <header className="px-6 pt-7 sm:px-10 sm:pt-9 lg:px-16 lg:pt-12">
        <p className="mx-auto max-w-5xl text-sm font-medium tracking-[0.22em] text-[#006039]">
          PULS
        </p>
      </header>

      <main className="mx-auto max-w-5xl px-6 pb-20 sm:px-10 sm:pb-24 lg:px-16 lg:pb-32">
        <section className="flex min-h-[70dvh] flex-col justify-center pt-16 sm:min-h-[75dvh] sm:pt-20 lg:min-h-[80dvh] lg:pt-24">
          <h1 className="max-w-4xl text-[2.35rem] font-medium leading-[1.12] tracking-[-0.04em] text-stone-800 sm:text-6xl sm:leading-[1.08] lg:text-7xl">
            Do you care about your loved ones?
          </h1>
        </section>

        <section className="border-t border-stone-300/70 pt-16 sm:pt-20 lg:pt-24">
          <p className="text-xs font-medium tracking-[0.18em] text-[#006039] uppercase">
            The problem
          </p>
          <h2 className="mt-4 max-w-3xl text-[2rem] font-medium leading-[1.15] tracking-[-0.04em] text-stone-800 sm:text-5xl sm:leading-[1.12] lg:text-[3.5rem]">
            Millions of people live alone. If something happens, nobody may notice in time.
          </h2>

          <div className="mt-10 grid gap-8 sm:mt-14 sm:grid-cols-2 sm:gap-12 lg:gap-20">
            <p className="flex flex-col gap-2">
              <span className="text-5xl font-medium tracking-[-0.05em] text-[#006039] sm:text-6xl lg:text-7xl">
                76 million
              </span>
              <span className="max-w-xs text-base leading-relaxed text-stone-600 sm:text-lg">
                people in Europe live alone
              </span>
            </p>
            <p className="flex flex-col gap-2">
              <span className="text-5xl font-medium tracking-[-0.05em] text-[#006039] sm:text-6xl lg:text-7xl">
                38 million
              </span>
              <span className="max-w-xs text-base leading-relaxed text-stone-600 sm:text-lg">
                people in the United States live alone
              </span>
            </p>
          </div>

          <p className="mt-10 max-w-2xl text-lg leading-relaxed text-stone-600 sm:mt-14 sm:text-xl">
            When someone living alone has an accident, falls ill, or cannot call for help,
            it can take days before anyone notices — or nobody notices at all.
          </p>
          <p className="mt-6 text-xs leading-relaxed text-stone-400 sm:text-sm">
            Sources: Eurostat 2025 (EU single-adult households), U.S. Census Bureau 2024
            (one-person households).
          </p>
        </section>

        <section className="mt-20 border-t border-stone-300/70 pt-16 sm:mt-28 sm:pt-20 lg:mt-32">
          <p className="text-xs font-medium tracking-[0.18em] text-[#006039] uppercase">
            The solution
          </p>
          <h2 className="mt-4 max-w-3xl text-[1.85rem] font-medium leading-[1.15] tracking-[-0.04em] text-stone-800 sm:text-4xl lg:text-5xl">
            One check-in a day, so someone knows you are okay.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-stone-600 sm:text-xl">
            You add an emergency contact and tap the check-in button once a day. That
            signals you are alive and well. If the button is not pressed two days in a
            row, PULS notifies your emergency contact automatically.
          </p>

          <ol className="mt-12 grid gap-8 sm:mt-16 sm:grid-cols-3 sm:gap-10">
            <li>
              <p className="text-sm font-medium tracking-[0.16em] text-[#006039]">01</p>
              <h3 className="mt-3 text-xl font-medium tracking-[-0.03em] text-stone-800">
                Add a contact
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-stone-600 sm:text-base">
                Save the email of someone who should know if you go silent.
              </p>
            </li>
            <li>
              <p className="text-sm font-medium tracking-[0.16em] text-[#006039]">02</p>
              <h3 className="mt-3 text-xl font-medium tracking-[-0.03em] text-stone-800">
                Check in daily
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-stone-600 sm:text-base">
                Tap the button once a day to show that you are okay.
              </p>
            </li>
            <li>
              <p className="text-sm font-medium tracking-[0.16em] text-[#006039]">03</p>
              <h3 className="mt-3 text-xl font-medium tracking-[-0.03em] text-stone-800">
                They get notified
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-stone-600 sm:text-base">
                Miss two days in a row, and your emergency contact is informed
                automatically.
              </p>
            </li>
          </ol>
        </section>

        <section className="mt-20 border-t border-stone-300/70 pt-16 text-center sm:mt-28 sm:pt-20 lg:mt-32">
          <h2 className="text-[1.85rem] font-medium leading-[1.15] tracking-[-0.04em] text-stone-800 sm:text-4xl">
            Start your daily check-in.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-stone-600 sm:text-lg">
            No account. Everything stays on your device.
          </p>
          <div className="mt-8 flex justify-center sm:mt-10">
            <Link href="/app" className={ctaClassName}>
              Open the app
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
