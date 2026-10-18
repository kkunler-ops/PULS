"use client";

import { buildAlarmEmail, t, type Locale } from "@/lib/i18n";
import type { SiteCopy } from "@/lib/site-i18n";

const DEMO_NAME = "Alex";
const DEMO_EMAIL = "sam@email.com";

type Screen = "setup" | "checkin" | "alert";

export function HowItWorks({ copy, locale }: { copy: SiteCopy; locale: Locale }) {
  const steps: { screen: Screen; title: string; body: string }[] = [
    { screen: "setup", title: copy.step1Title, body: copy.step1Body },
    { screen: "checkin", title: copy.step2Title, body: copy.step2Body },
    { screen: "alert", title: copy.step3Title, body: copy.step3Body },
  ];

  return (
    <ol className="mt-12 grid gap-12 sm:mt-16 sm:grid-cols-3 sm:gap-8 lg:gap-10">
      {steps.map((step, index) => (
        <li key={step.screen} className="flex flex-col items-center text-center">
          <PhoneFrame>
            {step.screen === "setup" ? <SetupScreen locale={locale} /> : null}
            {step.screen === "checkin" ? <CheckInScreen locale={locale} /> : null}
            {step.screen === "alert" ? <AlertScreen locale={locale} /> : null}
          </PhoneFrame>
          <p className="mt-6 text-sm font-medium tracking-[0.16em] text-[#006039]">
            {String(index + 1).padStart(2, "0")}
          </p>
          <h3 className="mt-3 text-xl font-medium tracking-[-0.03em] text-stone-800">
            {step.title}
          </h3>
          <p className="mt-2 max-w-xs text-[15px] leading-relaxed text-stone-600 sm:text-base">
            {step.body}
          </p>
        </li>
      ))}
    </ol>
  );
}

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-[198px] shrink-0 sm:w-[210px]">
      <div className="relative rounded-[2.35rem] bg-[#1c1917] p-[9px] shadow-[0_24px_50px_rgba(28,25,23,0.22)]">
        <div className="absolute left-1/2 top-[11px] z-20 h-[22px] w-[72px] -translate-x-1/2 rounded-full bg-black" />
        <div className="pointer-events-none relative aspect-[9/19.4] overflow-hidden rounded-[1.85rem] bg-[#f3eee7]">
          {children}
          <div className="absolute bottom-2 left-1/2 h-[4px] w-24 -translate-x-1/2 rounded-full bg-stone-800/25" />
        </div>
      </div>
    </div>
  );
}

function SetupScreen({ locale }: { locale: Locale }) {
  return (
    <AppChrome
      locale={locale}
      name=""
      email=""
      buttonLabel={t(locale, "checkIn")}
      buttonDone={false}
      buttonReady={false}
    />
  );
}

function CheckInScreen({ locale }: { locale: Locale }) {
  return (
    <AppChrome
      locale={locale}
      name={DEMO_NAME}
      email={DEMO_EMAIL}
      buttonLabel={t(locale, "checkIn")}
      buttonDone={false}
      buttonReady={true}
    />
  );
}

function AlertScreen({ locale }: { locale: Locale }) {
  const mail = buildAlarmEmail(locale, DEMO_NAME);
  const intro = t(locale, "emailBody", { name: DEMO_NAME }).split("\n")[0];

  return (
    <div className="flex h-full flex-col bg-[#f3eee7] px-3 pb-6 pt-9">
      <p className="text-center text-[9px] font-medium tracking-[0.18em] text-[#006039]">
        PULS
      </p>
      <div className="mt-4 flex-1 rounded-2xl bg-white/80 p-3 shadow-[0_8px_24px_rgba(28,25,23,0.08)] ring-1 ring-stone-200/80">
        <p className="text-[9px] tracking-wide text-stone-400">PULS</p>
        <p className="mt-1 text-[11px] font-medium leading-snug tracking-[-0.02em] text-stone-800">
          {mail.subject}
        </p>
        <p className="mt-3 text-[10px] leading-relaxed text-stone-600">{intro}</p>
      </div>
    </div>
  );
}

function AppChrome({
  locale,
  name,
  email,
  buttonLabel,
  buttonDone,
  buttonReady,
}: {
  locale: Locale;
  name: string;
  email: string;
  buttonLabel: string;
  buttonDone: boolean;
  buttonReady: boolean;
}) {
  return (
    <div className="flex h-full flex-col px-3 pb-6 pt-9">
      <div className="flex items-center justify-center">
        <p
          className={`truncate text-[11px] tracking-[-0.02em] ${
            name ? "text-stone-800" : "text-stone-400"
          }`}
        >
          {name || t(locale, "namePlaceholder")}
        </p>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center">
        <div
          className={`relative flex h-[7.25rem] w-[7.25rem] items-center justify-center rounded-full text-[13px] font-medium tracking-[-0.03em] ${
            buttonDone
              ? "bg-[#d5e3da] text-[#006039]"
              : buttonReady
                ? "bg-[#006039] text-white shadow-[0_12px_28px_rgba(0,96,57,0.32)]"
                : "bg-[#006039]/35 text-white"
          }`}
        >
          {buttonReady ? (
            <span className="pointer-events-none absolute inset-[-10px] rounded-full border border-[#006039]/30 pulse-ring" />
          ) : null}
          <span className="relative z-10 px-3 text-center leading-tight">{buttonLabel}</span>
        </div>
      </div>
      <p
        className={`truncate text-center text-[10px] tracking-[-0.02em] ${
          email ? "text-stone-800" : "text-stone-400"
        }`}
      >
        {email || t(locale, "emailPlaceholder")}
      </p>
    </div>
  );
}
