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
    <div className="mt-16 sm:mt-20">
      <h2 className="text-[1.85rem] font-medium leading-[1.15] tracking-[-0.04em] text-stone-800 sm:text-4xl">
        {copy.howItWorks}
      </h2>
      <ol className="mt-12 grid gap-14 sm:mt-16 sm:grid-cols-3 sm:gap-8 lg:gap-10">
        {steps.map((step, index) => (
          <li key={step.screen} className="flex flex-col items-center text-center">
            <p className="text-sm font-medium tracking-[0.16em] text-[#006039]">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-3 text-xl font-medium tracking-[-0.03em] text-stone-800">
              {step.title}
            </h3>
            <p className="mt-2 max-w-xs text-[15px] leading-relaxed text-stone-600 sm:text-base">
              {step.body}
            </p>
            <div className="mt-8">
              {step.screen === "setup" ? (
                <PhoneFrame>
                  <AppChrome
                    locale={locale}
                    name=""
                    email=""
                    buttonLabel={t(locale, "checkIn")}
                    buttonReady={false}
                    nameHint={copy.hintName}
                    emailHint={copy.hintEmail}
                  />
                </PhoneFrame>
              ) : null}
              {step.screen === "checkin" ? (
                <PhoneFrame>
                  <AppChrome
                    locale={locale}
                    name={DEMO_NAME}
                    email={DEMO_EMAIL}
                    buttonLabel={t(locale, "checkIn")}
                    buttonReady={true}
                    buttonHint={copy.hintButton}
                  />
                </PhoneFrame>
              ) : null}
              {step.screen === "alert" ? (
                <PhoneFrame>
                  <AlertScreen locale={locale} />
                </PhoneFrame>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Hint({
  label,
  arrow,
}: {
  label: string;
  arrow: "up" | "down";
}) {
  return (
    <div className="flex max-w-[9.5rem] flex-col items-center px-1 text-[#006039]">
      {arrow === "down" ? (
        <>
          <p className="text-[9px] font-medium leading-snug tracking-[-0.02em]">{label}</p>
          <ArrowDown />
        </>
      ) : (
        <>
          <ArrowUp />
          <p className="text-[9px] font-medium leading-snug tracking-[-0.02em]">{label}</p>
        </>
      )}
    </div>
  );
}

function ArrowDown() {
  return (
    <svg width="14" height="18" viewBox="0 0 14 18" fill="none" aria-hidden="true" className="mt-0.5">
      <path
        d="M7 1.5v12M3 9.5 7 13.5 11 9.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowUp() {
  return (
    <svg width="14" height="18" viewBox="0 0 14 18" fill="none" aria-hidden="true" className="mb-0.5">
      <path
        d="M7 16.5v-12M3 8.5 7 4.5 11 8.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
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
  buttonReady,
  nameHint,
  emailHint,
  buttonHint,
}: {
  locale: Locale;
  name: string;
  email: string;
  buttonLabel: string;
  buttonReady: boolean;
  nameHint?: string;
  emailHint?: string;
  buttonHint?: string;
}) {
  return (
    <div className="flex h-full flex-col px-3 pb-7 pt-9">
      <div className="flex flex-col items-center">
        <p
          className={`truncate text-[11px] tracking-[-0.02em] ${
            name ? "text-stone-800" : "text-stone-400"
          }`}
        >
          {name || t(locale, "namePlaceholder")}
        </p>
        {nameHint ? <Hint label={nameHint} arrow="up" /> : null}
      </div>
      <div className="flex flex-1 flex-col items-center justify-center">
        <div
          className={`relative flex h-[6.6rem] w-[6.6rem] items-center justify-center rounded-full text-[12px] font-medium tracking-[-0.03em] ${
            buttonReady
              ? "bg-[#006039] text-white shadow-[0_12px_28px_rgba(0,96,57,0.32)]"
              : "bg-[#006039]/35 text-white"
          }`}
        >
          {buttonReady ? (
            <span className="pointer-events-none absolute inset-[-10px] rounded-full border border-[#006039]/30 pulse-ring" />
          ) : null}
          <span className="relative z-10 px-3 text-center leading-tight">{buttonLabel}</span>
        </div>
        {buttonHint ? (
          <div className="mt-2">
            <Hint label={buttonHint} arrow="up" />
          </div>
        ) : null}
      </div>
      <div className="flex flex-col items-center">
        {emailHint ? <Hint label={emailHint} arrow="down" /> : null}
        <p
          className={`truncate text-center text-[10px] tracking-[-0.02em] ${
            email ? "text-stone-800" : "text-stone-400"
          }`}
        >
          {email || t(locale, "emailPlaceholder")}
        </p>
      </div>
    </div>
  );
}
