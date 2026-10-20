export async function syncAlarm(input: {
  action: "schedule" | "cancel";
  name: string;
  email: string;
  locale: string;
  phone?: string | null;
  scheduledAt?: string;
  previousEmailId?: string | null;
  previousSmsId?: string | null;
}): Promise<{
  id: string | null;
  smsId: string | null;
  smsError?: string | null;
  error?: "not_configured" | "failed";
}> {
  const response = await fetch("/api/alarm", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (response.status === 503) {
    return { id: null, smsId: null, smsError: null, error: "not_configured" };
  }

  if (!response.ok) {
    return { id: null, smsId: null, smsError: null, error: "failed" };
  }

  const data = (await response.json()) as {
    id?: string | null;
    smsId?: string | null;
    smsError?: string | null;
  };
  return {
    id: data.id ?? null,
    smsId: data.smsId ?? null,
    smsError: data.smsError ?? null,
  };
}
