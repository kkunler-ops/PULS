import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { buildAlarmEmail, isLocale } from "@/lib/i18n";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000;
  const recent = (hits.get(ip) ?? []).filter((time) => now - time < windowMs);
  if (recent.length >= 20) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function textToHtml(text: string) {
  return text
    .split("\n")
    .map((line) =>
      line
        ? `<p style="margin:0 0 12px;font-size:16px;line-height:1.5;color:#1c1917;">${escapeHtml(line)}</p>`
        : `<p style="margin:0 0 12px;height:8px;"></p>`,
    )
    .join("");
}

type Body = {
  action?: "schedule" | "cancel";
  name?: string;
  email?: string;
  locale?: string;
  scheduledAt?: string;
  previousEmailId?: string | null;
};

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const resend = new Resend(apiKey);
  const previousEmailId =
    typeof body.previousEmailId === "string" && body.previousEmailId
      ? body.previousEmailId
      : null;

  if (previousEmailId) {
    await resend.emails.cancel(previousEmailId);
  }

  if (body.action === "cancel") {
    return NextResponse.json({ ok: true, id: null });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const locale = body.locale;
  const scheduledAt = body.scheduledAt;

  if (!name || name.length > 80) {
    return NextResponse.json({ error: "invalid_name" }, { status: 400 });
  }
  if (!EMAIL_RE.test(email) || email.length > 120) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }
  if (!isLocale(locale)) {
    return NextResponse.json({ error: "invalid_locale" }, { status: 400 });
  }
  if (!scheduledAt) {
    return NextResponse.json({ error: "invalid_schedule" }, { status: 400 });
  }

  const sendAt = new Date(scheduledAt);
  if (Number.isNaN(sendAt.getTime())) {
    return NextResponse.json({ error: "invalid_schedule" }, { status: 400 });
  }

  const now = Date.now();
  const min = now + 36 * 60 * 60 * 1000;
  const max = now + 6 * 24 * 60 * 60 * 1000;
  if (sendAt.getTime() < min || sendAt.getTime() > max) {
    return NextResponse.json({ error: "invalid_schedule" }, { status: 400 });
  }

  const copy = buildAlarmEmail(locale, name);
  const from = process.env.RESEND_FROM_EMAIL || "PULS <onboarding@resend.dev>";

  const { data, error } = await resend.emails.send({
    from,
    to: email,
    subject: copy.subject,
    text: copy.text,
    html: `<div style="font-family:Georgia,serif;max-width:560px;padding:8px 0;">${textToHtml(copy.text)}</div>`,
    scheduledAt: sendAt.toISOString(),
  });

  if (error || !data?.id) {
    return NextResponse.json(
      { error: error?.message || "send_failed" },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, id: data.id, scheduledAt: sendAt.toISOString() });
}
