// lib/cal.ts
// Server-only helper for the Cal.com v2 API.
// Never import this file from a "use client" component — it reads process.env.CAL_API_KEY.

const CAL_API_BASE = "https://api.cal.com/v2";

function getApiKey() {
  const key = process.env.CAL_API_KEY;
  if (!key) {
    throw new Error(
      "CAL_API_KEY is not set. Add it to .env.local (server-side only, no NEXT_PUBLIC_ prefix)."
    );
  }
  return key;
}

type SlotsResponse = {
  status: string;
  data: Record<string, { start: string }[]>;
};

export async function getAvailableSlots(params: {
  eventTypeId: string | number;
  start: string; // ISO date, e.g. "2026-07-15"
  end: string; // ISO date
  timeZone: string;
}) {
  const url = new URL(`${CAL_API_BASE}/slots`);
  url.searchParams.set("eventTypeId", String(params.eventTypeId));
  url.searchParams.set("start", params.start);
  url.searchParams.set("end", params.end);
  url.searchParams.set("timeZone", params.timeZone);

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${getApiKey()}`,
      "cal-api-version": "2024-09-04",
    },
    // Slots change constantly — never cache this route.
    cache: "no-store",
  });

  const json = (await res.json()) as SlotsResponse | { status: string; error?: unknown };

  if (!res.ok) {
    throw new Error(
      `Cal.com slots request failed (${res.status}): ${JSON.stringify(json)}`
    );
  }

  return json as SlotsResponse;
}

export async function createBooking(params: {
  eventTypeId: string | number;
  start: string; // ISO datetime of the chosen slot
  name: string;
  email: string;
  timeZone: string;
  notes?: string;
}) {
  const res = await fetch(`${CAL_API_BASE}/bookings`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getApiKey()}`,
      "Content-Type": "application/json",
      "cal-api-version": "2024-08-13",
    },
    body: JSON.stringify({
      start: params.start,
      eventTypeId: Number(params.eventTypeId),
      attendee: {
        name: params.name,
        email: params.email,
        timeZone: params.timeZone,
      },
      ...(params.notes ? { metadata: { notes: params.notes } } : {}),
    }),
    cache: "no-store",
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(
      `Cal.com booking request failed (${res.status}): ${JSON.stringify(json)}`
    );
  }

  return json;
}