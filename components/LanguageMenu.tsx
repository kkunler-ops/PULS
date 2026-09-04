"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { LOCALES, LOCALE_LABELS, type Locale } from "@/lib/i18n";

type Props = {
  locale: Locale;
  label: string;
  onChange: (locale: Locale) => void;
};

export function LanguageMenu({ locale, label, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<{ top: number; right: number } | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open || !rootRef.current) return;

    function place() {
      const rect = rootRef.current?.getBoundingClientRect();
      if (!rect) return;
      setPos({
        top: rect.bottom + 8,
        right: window.innerWidth - rect.right,
      });
    }

    place();
    window.addEventListener("resize", place);
    window.addEventListener("scroll", place, true);
    return () => {
      window.removeEventListener("resize", place);
      window.removeEventListener("scroll", place, true);
    };
  }, [open]);

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      const target = event.target as Node;
      if (rootRef.current?.contains(target) || menuRef.current?.contains(target)) {
        return;
      }
      setOpen(false);
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-label={label}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="flex h-11 w-11 items-center justify-center rounded-full text-stone-600 transition hover:bg-stone-200/80 hover:text-stone-900"
      >
        <GlobeIcon />
      </button>
      {open && pos && typeof document !== "undefined"
        ? createPortal(
            <div
              ref={menuRef}
              className="fixed z-[200] max-h-[min(28rem,calc(100dvh-5.5rem))] w-48 overflow-y-auto rounded-2xl border border-stone-200/80 bg-[#fbf8f4] py-2 shadow-[0_16px_40px_rgba(28,25,23,0.18)]"
              style={{ top: pos.top, right: pos.right }}
            >
              {LOCALES.map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => {
                    onChange(code);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center px-4 py-2 text-left text-sm ${
                    code === locale
                      ? "bg-stone-100 font-medium text-stone-900"
                      : "text-stone-600 hover:bg-stone-50"
                  }`}
                >
                  {LOCALE_LABELS[code]}
                </button>
              ))}
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}

function GlobeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8.25" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M3.8 12h16.4M12 3.8c2.4 2.4 3.6 5.1 3.6 8.2s-1.2 5.8-3.6 8.2c-2.4-2.4-3.6-5.1-3.6-8.2s1.2-5.8 3.6-8.2Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}
