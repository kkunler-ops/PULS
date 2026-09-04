import { detectLocale, isLocale, type Locale } from "./i18n";
import { getTimeZone } from "./time";

const STORAGE_KEY = "puls.v1";

export type PulsState = {
  name: string;
  email: string;
  locale: Locale;
  lastCheckInAt: string | null;
  scheduledEmailId: string | null;
  scheduledAt: string | null;
  timezone: string;
};

export function defaultState(): PulsState {
  return {
    name: "",
    email: "",
    locale: detectLocale(),
    lastCheckInAt: null,
    scheduledEmailId: null,
    scheduledAt: null,
    timezone: getTimeZone(),
  };
}

export function loadState(): PulsState {
  const fallback = defaultState();
  if (typeof window === "undefined") return fallback;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as Partial<PulsState>;
    return {
      ...fallback,
      name: typeof parsed.name === "string" ? parsed.name : "",
      email: typeof parsed.email === "string" ? parsed.email : "",
      locale: isLocale(parsed.locale) ? parsed.locale : fallback.locale,
      lastCheckInAt:
        typeof parsed.lastCheckInAt === "string" ? parsed.lastCheckInAt : null,
      scheduledEmailId:
        typeof parsed.scheduledEmailId === "string"
          ? parsed.scheduledEmailId
          : null,
      scheduledAt:
        typeof parsed.scheduledAt === "string" ? parsed.scheduledAt : null,
      timezone:
        typeof parsed.timezone === "string" && parsed.timezone
          ? parsed.timezone
          : fallback.timezone,
    };
  } catch {
    return fallback;
  }
}

export function saveState(state: PulsState) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}
