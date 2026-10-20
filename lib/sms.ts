import twilio from "twilio";

const SERVICE_NAME = "PULS Alarms";
const E164_RE = /^\+[1-9]\d{6,14}$/;

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

function client() {
  return twilio(process.env.TWILIO_ACCOUNT_SID as string, process.env.TWILIO_AUTH_TOKEN as string);
}

async function resolveMessagingServiceSid() {
  if (process.env.TWILIO_MESSAGING_SERVICE_SID) {
    return process.env.TWILIO_MESSAGING_SERVICE_SID;
  }
  if (cachedServiceSid) return cachedServiceSid;

  const twilioClient = client();
  const from = process.env.TWILIO_FROM_NUMBER;
  const services = await twilioClient.messaging.v1.services.list({ limit: 50 });
  let service = services.find((item) => item.friendlyName === SERVICE_NAME);
  if (!service) {
    service = await twilioClient.messaging.v1.services.create({
      friendlyName: SERVICE_NAME,
    });
  }

  if (from) {
    const numbers = await twilioClient.incomingPhoneNumbers.list({
      phoneNumber: from,
      limit: 1,
    });
    const phoneSid = numbers[0]?.sid;
    if (phoneSid) {
      try {
        await twilioClient.messaging.v1.services(service.sid).phoneNumbers.create({
          phoneNumberSid: phoneSid,
        });
      } catch {
        // Number is already in the sender pool.
      }
    }
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

export async function scheduleAlarmSms(input: {
  to: string;
  body: string;
  sendAt: Date;
}): Promise<string | null> {
  if (!isTwilioConfigured()) return null;

  const messagingServiceSid = await resolveMessagingServiceSid();
  const from = process.env.TWILIO_FROM_NUMBER;
  const payload = {
    to: input.to,
    body: input.body,
    messagingServiceSid,
    scheduleType: "fixed" as const,
    sendAt: input.sendAt,
  };

  try {
    const message = await client().messages.create({
      ...payload,
      ...(from ? { from } : {}),
    });
    return message.sid ?? null;
  } catch {
    const message = await client().messages.create(payload);
    return message.sid ?? null;
  }
}
