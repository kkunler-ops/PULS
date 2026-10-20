import twilio from "twilio";

const SERVICE_NAME = "PULS Alarms";
const E164_RE = /^\+[1-9]\d{6,14}$/;
const TRIAL_BODIES = ["sms_account_alerts", "sms_appointment_reminders"] as const;

let cachedServiceSid: string | null = null;

export function isTwilioConfigured() {
  return Boolean(
    process.env.TWILIO_ACCOUNT_SID &&
      process.env.TWILIO_AUTH_TOKEN &&
      (process.env.TWILIO_MESSAGING_SERVICE_SID || process.env.TWILIO_FROM_NUMBER),
  );
}

export function normalizePhone(raw: unknown): { phone: string | null; invalid: boolean } {
  if (typeof raw !== "string") return { phone: null, invalid: false };
  const compact = raw.trim().replace(/[\s\-()]/g, "");
  if (!compact) return { phone: null, invalid: false };
  if (!E164_RE.test(compact)) return { phone: null, invalid: true };
  return { phone: compact, invalid: false };
}

export function twilioErrorMessage(error: unknown): string {
  if (error && typeof error === "object") {
    const item = error as { message?: string; code?: number; moreInfo?: string };
    return [item.code, item.message, item.moreInfo].filter(Boolean).join(" — ");
  }
  return "twilio_failed";
}

function client() {
  return twilio(process.env.TWILIO_ACCOUNT_SID as string, process.env.TWILIO_AUTH_TOKEN as string);
}

function digits(value: string) {
  return value.replace(/\D/g, "");
}

async function findFromNumber() {
  const from = process.env.TWILIO_FROM_NUMBER;
  if (!from) return null;

  const numbers = await client().incomingPhoneNumbers.list({ limit: 50 });
  return numbers.find((item) => digits(item.phoneNumber) === digits(from)) ?? null;
}

async function listServiceSenders(serviceSid: string) {
  return client().messaging.v1.services(serviceSid).phoneNumbers.list({ limit: 20 });
}

async function serviceHasSender(serviceSid: string, phoneNumberSid: string) {
  const pool = await listServiceSenders(serviceSid);
  return pool.some((item) => item.sid === phoneNumberSid);
}

async function addSenderToService(serviceSid: string, phoneNumberSid: string) {
  try {
    await client().messaging.v1.services(serviceSid).phoneNumbers.create({
      phoneNumberSid,
    });
  } catch (error) {
    if (await serviceHasSender(serviceSid, phoneNumberSid)) return;
    throw error;
  }
}

async function resolveMessagingServiceSid(fromNumberSid: string | null) {
  if (process.env.TWILIO_MESSAGING_SERVICE_SID) {
    const sid = process.env.TWILIO_MESSAGING_SERVICE_SID;
    if (fromNumberSid) await addSenderToService(sid, fromNumberSid);
    cachedServiceSid = sid;
    return sid;
  }

  if (cachedServiceSid) return cachedServiceSid;

  const from = process.env.TWILIO_FROM_NUMBER;
  const services = await client().messaging.v1.services.list({ limit: 50 });
  const pools = await Promise.all(
    services.map(async (service) => ({
      sid: service.sid,
      name: service.friendlyName,
      senders: await listServiceSenders(service.sid),
    })),
  );

  const matchingFrom = from
    ? pools.find((pool) =>
        pool.senders.some((sender) => digits(sender.phoneNumber) === digits(from)),
      )
    : null;
  if (matchingFrom) {
    cachedServiceSid = matchingFrom.sid;
    return matchingFrom.sid;
  }

  if (fromNumberSid) {
    const existing = pools.find((pool) =>
      pool.senders.some((sender) => sender.sid === fromNumberSid),
    );
    if (existing) {
      cachedServiceSid = existing.sid;
      return existing.sid;
    }
  }

  const withAnySender = pools.find((pool) => pool.senders.length > 0);
  if (withAnySender && !fromNumberSid) {
    cachedServiceSid = withAnySender.sid;
    return withAnySender.sid;
  }

  let service = services.find((item) => item.friendlyName === SERVICE_NAME);
  if (!service) {
    service = await client().messaging.v1.services.create({
      friendlyName: SERVICE_NAME,
    });
  }
  if (fromNumberSid) {
    await addSenderToService(service.sid, fromNumberSid);
  }

  cachedServiceSid = service.sid;
  return service.sid;
}

export async function cancelScheduledSms(messageSid: string) {
  if (!isTwilioConfigured()) return;
  try {
    await client().messages(messageSid).update({ status: "canceled" });
  } catch {
    // Already sent, already canceled, or unknown SID.
  }
}

async function createScheduledMessage(input: {
  to: string;
  body: string;
  sendAt: Date;
  messagingServiceSid: string;
  from?: string;
}) {
  return client().messages.create({
    to: input.to,
    body: input.body,
    messagingServiceSid: input.messagingServiceSid,
    ...(input.from ? { from: input.from } : {}),
    scheduleType: "fixed",
    sendAt: input.sendAt,
  });
}

export async function scheduleAlarmSms(input: {
  to: string;
  body: string;
  sendAt: Date;
}): Promise<string> {
  if (!isTwilioConfigured()) {
    throw new Error("twilio_not_configured");
  }

  const from = process.env.TWILIO_FROM_NUMBER;
  const ownedNumber = await findFromNumber();
  const messagingServiceSid = await resolveMessagingServiceSid(ownedNumber?.sid ?? null);
  const bodies = [input.body, ...TRIAL_BODIES];
  let lastError: unknown;

  for (const body of bodies) {
    const attempts = from
      ? [
          { body, from },
          { body },
        ]
      : [{ body }];

    for (const attempt of attempts) {
      try {
        const message = await createScheduledMessage({
          to: input.to,
          sendAt: input.sendAt,
          messagingServiceSid,
          ...attempt,
        });
        if (!message.sid) throw new Error("Twilio returned no message SID");
        return message.sid;
      } catch (error) {
        lastError = error;
      }
    }
  }

  throw lastError instanceof Error ? lastError : new Error(twilioErrorMessage(lastError));
}
