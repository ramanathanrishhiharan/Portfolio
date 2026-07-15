// components/booking/Widget.tsx
"use client";
import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlotButton } from "./Button";

type SlotsByDate = Record<string, { start: string }[]>;

const DAYS_AHEAD = 14;

function toISODate(d: Date) {
  return d.toISOString().slice(0, 10);
}

function formatDayLabel(dateStr: string) {
  const d = new Date(`${dateStr}T00:00:00`);
  return d.toLocaleDateString(undefined, { weekday: "short", day: "numeric" });
}

function formatTimeLabel(iso: string, timeZone: string) {
  return new Date(iso).toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
    timeZone,
  });
}

function formatRangeLabel(start: Date, end: Date) {
  const opts: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };
  return `${start.toLocaleDateString(undefined, opts)} – ${end.toLocaleDateString(
    undefined,
    opts
  )}`;
}

type Step = "pick-time" | "details" | "confirming" | "done" | "error";

export function BookingWidget() {
  const timeZone = useMemo(
    () => Intl.DateTimeFormat().resolvedOptions().timeZone,
    []
  );

  // loading/error start in their "in flight" state already, so the effect
  // never has to set them synchronously — it only ever reports the outcome
  // once the fetch settles, inside the .then/.catch callback.
  const [slots, setSlots] = useState<SlotsByDate | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  // How many DAYS_AHEAD-sized windows forward from today we're viewing.
  // 0 = today..+13 days, 1 = +14..+27 days, and so on. Never goes negative,
  // so users can page forward into next month but not before today.
  const [windowOffset, setWindowOffset] = useState(0);

  const { rangeStart, rangeEnd } = useMemo(() => {
    const start = new Date();
    start.setDate(start.getDate() + windowOffset * DAYS_AHEAD);
    const end = new Date(start);
    end.setDate(end.getDate() + DAYS_AHEAD - 1);
    return { rangeStart: start, rangeEnd: end };
  }, [windowOffset]);

  const [step, setStep] = useState<Step>("pick-time");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    // These two setState calls are unavoidable here: this effect refetches
    // whenever the user pages to a different date window, so it must flip
    // the UI back to "loading" for that new request rather than reusing
    // stale success/error state from the previous window.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoadError(null);

    const start = toISODate(rangeStart);
    const end = toISODate(rangeEnd);

    fetch(
      `/api/cal/slots?start=${start}&end=${end}&timeZone=${encodeURIComponent(
        timeZone
      )}`
    )
      .then(async (res) => {
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || "Failed to load slots");
        return json;
      })
      .then((json) => {
        if (cancelled) return;
        const data: SlotsByDate = json.data ?? {};
        const firstDateWithSlots = Object.keys(data).find(
          (date) => (data[date] ?? []).length > 0
        );
        setSlots(data);
        setSelectedDate(firstDateWithSlots ?? null);
        setSelectedSlot(null);
        setLoading(false);
      })
      .catch((err) => {
        if (cancelled) return;
        setLoadError(err instanceof Error ? err.message : "Failed to load slots");
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [rangeStart, rangeEnd, timeZone]);

  const availableDates = useMemo(
    () =>
      Object.keys(slots ?? {}).filter(
        (date) => (slots![date] ?? []).length > 0
      ),
    [slots]
  );

  const timesForSelectedDate = selectedDate ? slots?.[selectedDate] ?? [] : [];

  async function handleConfirm() {
    if (!selectedSlot) return;
    setStep("confirming");
    setSubmitError(null);
    try {
      const res = await fetch("/api/cal/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          start: selectedSlot,
          name,
          email,
          timeZone,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Booking failed");
      setStep("done");
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong");
      setStep("error");
    }
  }

  if (loading) {
    return (
      <div className="flex h-full min-h-75 items-center justify-center text-slate-400">
        Loading availability…
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="flex h-full min-h-75 flex-col items-center justify-center gap-2 text-center text-slate-500">
        <p className="font-semibold text-[#0a0a0a]">Couldn&apos;t load availability</p>
        <p className="text-sm">{loadError}</p>
      </div>
    );
  }

  if (step === "done") {
    return (
      <div className="flex h-full min-h-75 flex-col items-center justify-center gap-3 text-center">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#B5E64D] text-lg font-extrabold text-[#0a0a0a]">
          ✓
        </span>
        <p className="text-xl font-semibold text-[#0a0a0a]">You&apos;re booked</p>
        <p className="max-w-xs text-sm text-slate-500">
          A confirmation is on its way to {email}.
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col gap-6">
      {/* Day picker */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
            Pick a day · {formatRangeLabel(rangeStart, rangeEnd)}
          </p>
          <div className="flex gap-1.5">
            <button
              type="button"
              aria-label="Previous days"
              disabled={windowOffset === 0}
              onClick={() => setWindowOffset((o) => Math.max(0, o - 1))}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-[#e6ebf2] text-slate-500 outline-none transition-transform active:translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-30"
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Next days"
              onClick={() => setWindowOffset((o) => o + 1)}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-[#e6ebf2] text-slate-500 outline-none transition-transform active:translate-y-0.5"
            >
              ›
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {availableDates.length === 0 && (
            <p className="text-sm text-slate-400">
              No openings in this window — try “›” for later dates.
            </p>
          )}
          {availableDates.map((date) => (
            <SlotButton
              key={date}
              label={formatDayLabel(date)}
              selected={date === selectedDate}
              size="compact"
              onClick={() => {
                setSelectedDate(date);
                setSelectedSlot(null);
              }}
            />
          ))}
        </div>
      </div>

      {/* Time picker */}
      {selectedDate && (
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-400">
            Pick a time · {timeZone}
          </p>
          <div className="flex flex-wrap gap-3">
            {timesForSelectedDate.map((slot) => (
              <SlotButton
                key={slot.start}
                label={formatTimeLabel(slot.start, timeZone)}
                selected={slot.start === selectedSlot}
                onClick={() => {
                  setSelectedSlot(slot.start);
                  setStep("pick-time");
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Details + confirm */}
      <AnimatePresence>
        {selectedSlot && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="mt-auto flex flex-col gap-3 rounded-3xl bg-[#e9eef4] p-5"
            style={{
              boxShadow:
                "inset 3px 3px 8px rgba(163,177,198,0.35), inset -3px -3px 8px rgba(255,255,255,0.9)",
            }}
          >
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-full border border-transparent bg-[#e6ebf2] px-5 py-3 text-[15px] font-medium text-[#0a0a0a] outline-none placeholder:text-slate-400 focus:border-[#0a0a0a]/20"
            />
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-full border border-transparent bg-[#e6ebf2] px-5 py-3 text-[15px] font-medium text-[#0a0a0a] outline-none placeholder:text-slate-400 focus:border-[#0a0a0a]/20"
            />

            {step === "error" && submitError && (
              <p className="px-2 text-sm font-medium text-red-500">{submitError}</p>
            )}

            <motion.button
              type="button"
              disabled={!name || !email || step === "confirming"}
              onClick={handleConfirm}
              whileTap={{ scale: 0.98, y: 1 }}
              className="group relative mt-1 inline-flex w-full items-center justify-between rounded-full bg-[#e6ebf2] py-2 pl-6 pr-2 text-left text-[16px] font-bold text-[#0a0a0a] outline-none transition-transform duration-150 ease-out disabled:cursor-not-allowed disabled:opacity-40"
              style={{
                boxShadow:
                  "0 0 30px 4px rgba(181,230,77,0.35), -8px -8px 18px rgba(255,255,255,0.95), 10px 10px 22px rgba(163,177,198,0.55)",
              }}
            >
              <span className="relative">
                {step === "confirming" ? "Booking…" : "Confirm booking"}
              </span>
              <span className="relative ml-4 inline-flex h-9 min-w-9 items-center justify-center rounded-full bg-[#B5E64D] px-2 text-[14px] font-extrabold text-[#0a0a0a] transition-transform duration-200 group-hover:translate-x-0.5">
                GO
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}