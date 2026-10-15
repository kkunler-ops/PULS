import type { Locale } from "@/lib/i18n";

export const SITE_LOCALES = ["en", "de", "es"] as const;
export type SiteLocale = (typeof SITE_LOCALES)[number];

export type SiteCopy = {
  language: string;
  blog: string;
  openTheApp: string;
  problem: string;
  headline: string;
  europeCount: string;
  europeStat: string;
  usCount: string;
  usStat: string;
  problemBody: string;
  sources: string;
  solution: string;
  solutionHeadline: string;
  solutionBody: string;
  step1Title: string;
  step1Body: string;
  step2Title: string;
  step2Body: string;
  step3Title: string;
  step3Body: string;
  ctaHeadline: string;
  ctaBody: string;
};

export const siteCopy: Record<SiteLocale, SiteCopy> = {
  en: {
    language: "Language",
    blog: "Blog",
    openTheApp: "Open the app",
    problem: "The problem",
    headline:
      "Millions of people live alone. If something happens, nobody may notice in time.",
    europeCount: "76 million",
    europeStat: "people in Europe live alone",
    usCount: "38 million",
    usStat: "people in the United States live alone",
    problemBody:
      "When someone living alone has an accident, falls ill, or cannot call for help, it can take days before anyone notices — or nobody notices at all.",
    sources:
      "Sources: Eurostat 2025 (EU single-adult households), U.S. Census Bureau 2024 (one-person households).",
    solution: "The solution",
    solutionHeadline: "One check-in a day, so someone knows you are okay.",
    solutionBody:
      "You add an emergency contact and tap the check-in button once a day. That signals you are alive and well. If the button is not pressed two days in a row, PULS notifies your emergency contact automatically.",
    step1Title: "Add a contact",
    step1Body: "Save the email of someone who should know if you go silent.",
    step2Title: "Check in daily",
    step2Body: "Tap the button once a day to show that you are okay.",
    step3Title: "They get notified",
    step3Body:
      "Miss two days in a row, and your emergency contact is informed automatically.",
    ctaHeadline: "Start your daily check-in.",
    ctaBody: "No account. Everything stays on your device.",
  },
  de: {
    language: "Sprache",
    blog: "Blog",
    openTheApp: "App öffnen",
    problem: "Das Problem",
    headline:
      "Millionen Menschen leben allein. Wenn etwas passiert, merkt es vielleicht niemand rechtzeitig.",
    europeCount: "76 Millionen",
    europeStat: "Menschen in Europa leben allein",
    usCount: "38 Millionen",
    usStat: "Menschen in den USA leben allein",
    problemBody:
      "Wenn jemand, der allein lebt, einen Unfall hat, erkrankt oder nicht um Hilfe rufen kann, dauert es oft Tage, bis es jemand merkt — oder es merkt niemand.",
    sources:
      "Quellen: Eurostat 2025 (Einpersonenhaushalte in der EU), U.S. Census Bureau 2024 (Einpersonenhaushalte).",
    solution: "Die Lösung",
    solutionHeadline:
      "Ein Check-in am Tag, damit jemand weiß, dass es dir gut geht.",
    solutionBody:
      "Du hinterlegst einen Notfallkontakt und tippst einmal am Tag auf den Check-in-Button. Das zeigt: du lebst und es geht dir gut. Wird der Button zwei Tage hintereinander nicht gedrückt, benachrichtigt PULS automatisch deinen Notfallkontakt.",
    step1Title: "Kontakt hinterlegen",
    step1Body:
      "Speichere die E-Mail von jemandem, der wissen soll, wenn du still wirst.",
    step2Title: "Täglich einchecken",
    step2Body: "Tippe einmal am Tag auf den Button, um zu zeigen, dass es dir gut geht.",
    step3Title: "Sie werden benachrichtigt",
    step3Body:
      "Zwei Tage ohne Check-in, und dein Notfallkontakt wird automatisch informiert.",
    ctaHeadline: "Starte deinen täglichen Check-in.",
    ctaBody: "Kein Konto. Alles bleibt auf deinem Gerät.",
  },
  es: {
    language: "Idioma",
    blog: "Blog",
    openTheApp: "Abrir la app",
    problem: "El problema",
    headline:
      "Millones de personas viven solas. Si pasa algo, puede que nadie se dé cuenta a tiempo.",
    europeCount: "76 millones",
    europeStat: "de personas en Europa viven solas",
    usCount: "38 millones",
    usStat: "de personas en Estados Unidos viven solas",
    problemBody:
      "Cuando alguien que vive solo tiene un accidente, se pone enfermo o no puede pedir ayuda, pueden pasar días hasta que alguien se dé cuenta — o no se da cuenta nadie.",
    sources:
      "Fuentes: Eurostat 2025 (hogares unipersonales en la UE), U.S. Census Bureau 2024 (hogares unipersonales).",
    solution: "La solución",
    solutionHeadline:
      "Un check-in al día, para que alguien sepa que estás bien.",
    solutionBody:
      "Añades un contacto de emergencia y pulsas el botón de check-in una vez al día. Eso indica que estás bien. Si el botón no se pulsa dos días seguidos, PULS avisa automáticamente a tu contacto de emergencia.",
    step1Title: "Añade un contacto",
    step1Body:
      "Guarda el correo de alguien que deba saber si dejas de dar señales.",
    step2Title: "Haz check-in cada día",
    step2Body: "Pulsa el botón una vez al día para mostrar que estás bien.",
    step3Title: "Reciben aviso",
    step3Body:
      "Si faltas dos días seguidos, tu contacto de emergencia recibe aviso automáticamente.",
    ctaHeadline: "Empieza tu check-in diario.",
    ctaBody: "Sin cuenta. Todo se queda en tu dispositivo.",
  },
};

export function isSiteLocale(value: unknown): value is SiteLocale {
  return typeof value === "string" && (SITE_LOCALES as readonly string[]).includes(value);
}

export function toSiteLocale(locale: Locale): SiteLocale {
  return isSiteLocale(locale) ? locale : "en";
}
