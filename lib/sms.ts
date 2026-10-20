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
  if (!from) {
    throw new Error("TWILIO_FROM_NUMBER is missing");
  }

  const numbers = await client().incomingPhoneNumbers.list({ limit: 50 });
  const match = numbers.find((item) => digits(item.phoneNumber) === digits(from));
  if (!match) {
    throw new Error(`Twilio sender ${from} was not found on this account`);
  }
  return match;
}

async function serviceHasSender(serviceSid: string, phoneNumberSid: string) {
  const pool = await client().messaging.v1.services(serviceSid).phoneNumbers.list({
    limit: 20,
  });
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

async function findServiceWithSender(phoneNumberSid: string) {
  const services = await client().messaging.v1.services.list({ limit: 50 });
  for (const service of services) {
    if (await serviceHasSender(service.sid, phoneNumberSid)) {
      return service.sid;
    }
  }
  return null;
}

async function resolveMessagingServiceSid() {
  if (process.env.TWILIO_MESSAGING_SERVICE_SID) {
    const sid = process.env.TWILIO_MESSAGING_SERVICE_SID;
    cachedServiceSid = sid;
    const sender = await findFromNumber();
    await addSenderToService(sid, sender.sid);
    return sid;
  }

  if (cachedServiceSid) return cachedServiceSid;

  const sender = await findFromNumber();
  const existing = await findServiceWithSender(sender.sid);
  if (existing) {
    cachedServiceSid = existing;
    return existing;
  }

  const twilioClient = client();
  const services = await twilioClient.messaging.v1.services.list({ limit: 50 });
  let service = services.find((item) => item.friendlyName === SERVICE_NAME);
  if (!service) {
    service = await twilioClient.messaging.v1.services.create({
      friendlyName: SERVICE_NAME,
    });
  }

  await addSenderToService(service.sid, sender.sid);
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
}) {
  return client().messages.create({
    to: input.to,
    body: input.body,
    messagingServiceSid: input.messagingServiceSid,
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

  const messagingServiceSid = await resolveMessagingServiceSid();
  const bodies = [input.body, ...TRIAL_BODIES];
  let lastError: unknown;

  for (const body of bodies) {
    try {
      const message = await createScheduledMessage({
        to: input.to,
        body,
        sendAt: input.sendAt,
        messagingServiceSid,
      });
      if (!message.sid) throw new Error("Twilio returned no message SID");
      return message.sid;
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError instanceof Error ? lastError : new Error(twilioErrorMessage(lastError));
}
