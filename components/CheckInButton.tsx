"use client";

type Props = {
  label: string;
  done: boolean;
  disabled: boolean;
  busy: boolean;
  onCheckIn: () => void;
};

export function CheckInButton({ label, done, disabled, busy, onCheckIn }: Props) {
  return (
    <button
      type="button"
      onClick={onCheckIn}
      disabled={disabled || busy || done}
      aria-label={label}
      className={`checkin-button relative flex h-56 w-56 items-center justify-center rounded-full text-[22px] font-medium tracking-[-0.03em] transition duration-500 ease-out focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#006039]/25 disabled:cursor-default sm:h-64 sm:w-64 sm:text-2xl ${
        done
          ? "bg-[#d5e3da] text-[#006039] ring-1 ring-inset ring-[#006039]/20"
          : disabled
            ? "bg-[#006039] text-white/85"
            : "bg-[#006039] text-white shadow-[0_22px_60px_rgba(0,96,57,0.32)] hover:scale-[1.02] active:scale-[0.98]"
      }`}
    >
      {!done && !disabled ? (
        <span className="pointer-events-none absolute inset-[-18px] rounded-full border border-[#006039]/30 pulse-ring" />
      ) : null}
      <span className="relative z-10 flex flex-col items-center gap-2 px-6 text-center leading-tight">
        {busy ? "…" : null}
        {!busy && done ? <DoneCheck /> : null}
        {!busy ? label : null}
      </span>
    </button>
  );
}

function DoneCheck() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 12.5 9.5 17 19 7.5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
