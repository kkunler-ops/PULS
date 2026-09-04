export function getTimeZone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
}

export function localDateISO(date: Date, timeZone: string): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const get = (type: string) => parts.find((part) => part.type === type)?.value;
  return `${get("year")}-${get("month")}-${get("day")}`;
}

export function addCalendarDays(isoDate: string, days: number): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day + days)).toISOString().slice(0, 10);
}

function zonedPartsAsUtcMs(instant: Date, timeZone: string): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(instant);
  const get = (type: string) =>
    Number(parts.find((part) => part.type === type)?.value);
  return Date.UTC(
    get("year"),
    get("month") - 1,
    get("day"),
    get("hour"),
    get("minute"),
    get("second"),
  );
}

export function zonedCivilToUtc(
  isoDate: string,
  hour: number,
  minute: number,
  timeZone: string,
): Date {
  const [year, month, day] = isoDate.split("-").map(Number);
  const desiredAsUtc = Date.UTC(year, month - 1, day, hour, minute, 0);
  let instant = desiredAsUtc;

  for (let i = 0; i < 4; i += 1) {
    const offset = zonedPartsAsUtcMs(new Date(instant), timeZone) - instant;
    instant = desiredAsUtc - offset;
  }

  return new Date(instant);
}

/** Mail goes out at 09:00 local time on the 3rd calendar day after the check-in day. */
export function getAlarmSendAt(lastCheckIn: Date, timeZone: string): Date {
  const checkInDay = localDateISO(lastCheckIn, timeZone);
  const alarmDay = addCalendarDays(checkInDay, 3);
  return zonedCivilToUtc(alarmDay, 9, 0, timeZone);
}

export function hasCheckedInToday(
  lastCheckInAt: string | null,
  timeZone: string,
): boolean {
  if (!lastCheckInAt) return false;
  return (
    localDateISO(new Date(lastCheckInAt), timeZone) ===
    localDateISO(new Date(), timeZone)
  );
}
