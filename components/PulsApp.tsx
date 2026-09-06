"use client";

import { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { CheckInButton } from "@/components/CheckInButton";
import { EditableField } from "@/components/EditableField";
import { LanguageMenu } from "@/components/LanguageMenu";
import { trackAppOpen, trackCheckIn } from "@/lib/analytics";
import { syncAlarm } from "@/lib/alarm";
import { pulseHaptic } from "@/lib/haptics";
import { t, type Locale } from "@/lib/i18n";
import { loadState, saveState, type PulsState } from "@/lib/storage";
import { getAlarmSendAt, getTimeZone, hasCheckedInToday } from "@/lib/time";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidProfile(state: PulsState) {
  return Boolean(state.name.trim()) && EMAIL_RE.test(state.email.trim());
}

function hasFutureAlarm(state: PulsState) {
  return Boolean(
    state.scheduledEmailId &&
      state.scheduledAt &&
      new Date(state.scheduledAt).getTime() > Date.now(),
  );
}

const EMPTY_STATE: PulsState = {
  name: "",
  email: "",
  locale: "de",
  lastCheckInAt: null,
  scheduledEmailId: null,
  scheduledAt: null,
  timezone: "UTC",
};

export function PulsApp() {
  const hydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const [state, setState] = useState<PulsState>(EMPTY_STATE);
  const [didLoad, setDidLoad] = useState(false);
  const [busy, setBusy] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  if (hydrated && !didLoad) {
    setState(loadState());
    setDidLoad(true);
  }

  useEffect(() => {
    document.documentElement.lang = state.locale;
    if (didLoad) saveState(state);
  }, [state, didLoad]);

  useEffect(() => {
    if (didLoad) trackAppOpen();
  }, [didLoad]);

  const ready = useMemo(() => Boolean(state && isValidProfile(state)), [state]);

  const checkedInToday = Boolean(
    state && hasCheckedInToday(state.lastCheckInAt, state.timezone),
  );

  const cancelAlarm = useCallback(async (next: PulsState) => {
    if (next.scheduledEmailId) {
      await syncAlarm({
        action: "cancel",
        name: next.name,
        email: next.email,
        locale: next.locale,
        previousEmailId: next.scheduledEmailId,
      });
    }
    setState({ ...next, scheduledEmailId: null, scheduledAt: null });
  }, []);

  const scheduleAlarm = useCallback(
    async (next: PulsState, scheduledAt: string) => {
      const result = await syncAlarm({
        action: "schedule",
        name: next.name.trim(),
        email: next.email.trim(),
        locale: next.locale,
        scheduledAt,
        previousEmailId: next.scheduledEmailId,
      });

      if (result.error === "not_configured") {
        setState({ ...next, scheduledEmailId: null, scheduledAt: null });
        return;
      }

      if (result.error || !result.id) {
        setState({ ...next, scheduledEmailId: null, scheduledAt: null });
        return;
      }

      setState({ ...next, scheduledEmailId: result.id, scheduledAt });
    },
    [],
  );

  const armAlarm = useCallback(
    async (next: PulsState) => {
      if (!isValidProfile(next) || !next.lastCheckInAt) {
        await cancelAlarm(next);
        return;
      }

      const scheduledAt = getAlarmSendAt(
        new Date(next.lastCheckInAt),
        next.timezone,
      ).toISOString();

      await scheduleAlarm(next, scheduledAt);
    },
    [cancelAlarm, scheduleAlarm],
  );

  const refreshPendingAlarm = useCallback(
    async (next: PulsState) => {
      if (!hasFutureAlarm(next)) return;
      if (!isValidProfile(next)) {
        await cancelAlarm(next);
        return;
      }
      await scheduleAlarm(next, next.scheduledAt as string);
    },
    [cancelAlarm, scheduleAlarm],
  );

  async function handleCheckIn() {
    if (busy || checkedInToday || !ready) return;
    pulseHaptic();
    trackCheckIn();
    setBusy(true);
    const next: PulsState = {
      ...state,
      lastCheckInAt: new Date().toISOString(),
      timezone: getTimeZone(),
    };
    setState(next);
    await armAlarm(next);
    setBusy(false);
  }

  function saveName(name: string) {
    const next = { ...state, name };
    setState(next);
    void refreshPendingAlarm(next);
  }

  function saveEmail(email: string) {
    if (email && !EMAIL_RE.test(email)) {
      setEmailError(t(state.locale, "invalidEmail"));
      return;
    }
    setEmailError(null);
    const next = { ...state, email };
    setState(next);
    void refreshPendingAlarm(next);
  }

  function saveLocale(locale: Locale) {
    const next = { ...state, locale };
    setState(next);
    void refreshPendingAlarm(next);
  }

  const copy = (key: Parameters<typeof t>[1]) => t(state.locale, key);

  return (
    <div className="relative mx-auto flex min-h-dvh w-full max-w-lg flex-col px-6 py-6 sm:py-8">
      <header className="relative z-50 flex items-center justify-center pr-12">
        <EditableField
          value={state.name}
          placeholder={copy("namePlaceholder")}
          editLabel={copy("editName")}
          saveLabel={copy("save")}
          onSave={saveName}
        />
        <div className="absolute right-0 top-1/2 z-50 -translate-y-1/2">
          <LanguageMenu
            locale={state.locale}
            label={copy("language")}
            onChange={saveLocale}
          />
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center">
        <CheckInButton
          label={checkedInToday ? copy("checkedIn") : copy("checkIn")}
          done={checkedInToday}
          disabled={!ready}
          busy={busy}
          onCheckIn={handleCheckIn}
        />
      </main>

      <footer className="flex justify-center pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        <EditableField
          value={state.email}
          placeholder={copy("emailPlaceholder")}
          editLabel={copy("editEmail")}
          saveLabel={copy("save")}
          type="email"
          error={emailError}
          onSave={saveEmail}
        />
      </footer>
    </div>
  );
}
