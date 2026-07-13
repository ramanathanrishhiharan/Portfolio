"use client";
import React, { useState } from "react";
import {
  CalendarSyncIcon,
  MailOpenIcon,
  MapPinnedIcon,
  ArrowRightIcon,
} from "lucide-react";

type InfoItem = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

const CARD_SHADOW = {
  boxShadow: "-2px 12px 22.3px 2px rgba(0,0,0,0.25)",
};

const INFO: InfoItem[] = [
  {
    icon: <CalendarSyncIcon className="h-5 w-5" strokeWidth={1.75} />,
    label: "Call Today",
    value: "+94 771 165 514",
  },
  {
    icon: <MailOpenIcon className="h-5 w-5" strokeWidth={1.75} />,
    label: "Email me",
    value: "ramanathanrishiharan2003@gmail.com",
  },
  {
    icon: <MapPinnedIcon className="h-5 w-5" strokeWidth={1.75} />,
    label: "Location",
    value: "Sri Lanka",
  },
];

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/ramanathanrishi74/",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ramanathanrishiharan74/",
  },
  {
    label: "GitHub",
    href: "https://github.com/ramanathanrishhiharan",
  },
];

const MOUNTAIN_IMG =
  "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=2000&q=80";

export function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    company: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    // Bots tend to fill every field instantly — if the honeypot has a value,
    // silently "succeed" without sending anything.
    if (form.company) {
      setSubmitted(true);
      setForm({ name: "", email: "", message: "", company: "" });
      setTimeout(() => setSubmitted(false), 4000);
      return;
    }

    if (!form.name || !form.email || !form.message) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setSubmitted(true);
      setForm({ name: "", email: "", message: "", company: "" });
      setTimeout(() => setSubmitted(false), 4000);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative w-full overflow-hidden bg-[#f7f7f5]"
      style={{ fontFamily: "var(--font-primary)" }}
    >
      {/* Misty mountain backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-[0.18]"
        style={{ backgroundImage: `url(${MOUNTAIN_IMG})` }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-linear-to-b from-[#f7f7f5] via-[#f7f7f5]/40 to-[#f7f7f5]"
      />

      <div className="relative mx-auto max-w-300 px-6 md:px-16 xl:px-20 pt-20 pb-10">
        {/* Heading */}
        <h2
          id="contact-heading"
          className="text-center text-6xl font-extrabold leading-[0.95] tracking-tight text-neutral-900 sm:text-7xl lg:text-8xl"
          style={{ fontFamily: "var(--font-primary)" }}
        >
          Let&rsquo;s Work <span className="text-neutral-400">Together</span>
        </h2>

        {/* Form */}
        <div className="mx-auto mt-14 max-w-2xl text-center">
          <p
            className="text-lg font-medium text-[#0a0a0a]"
            style={{ fontFamily: "var(--font-primary)" }}
          >
            Send a message
          </p>

          <div className="mx-auto mt-6 space-y-4 text-left">
            {/* Honeypot field — hidden from real users, bots tend to fill it */}
            <input
              type="text"
              name="company"
              value={form.company}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute left-[-9999px] h-0 w-0 opacity-0"
            />

            {/* Name full width, email full width below */}
            <input
              id="name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              className="h-14 w-full rounded-full border border-neutral-200 bg-white px-6 text-[#0a0a0a] placeholder-neutral-400 outline-none transition focus:border-[#B5E64D] focus:ring-2 focus:ring-[#B5E64D]/30"
              style={{ ...CARD_SHADOW, fontFamily: "var(--font-primary)" }}
            />
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="h-14 w-full rounded-full border border-neutral-200 bg-white px-6 text-[#0a0a0a] placeholder-neutral-400 outline-none transition focus:border-[#B5E64D] focus:ring-2 focus:ring-[#B5E64D]/30"
              style={{ ...CARD_SHADOW, fontFamily: "var(--font-primary)" }}
            />

            <textarea
              id="message"
              name="message"
              required
              rows={4}
              value={form.message}
              onChange={handleChange}
              placeholder="Tell me about your project..."
              className="w-full resize-none rounded-3xl border border-neutral-200 bg-white px-6 py-4 text-[#0a0a0a] placeholder-neutral-400 outline-none transition focus:border-[#B5E64D] focus:ring-2 focus:ring-[#B5E64D]/30"
              style={{ ...CARD_SHADOW, fontFamily: "var(--font-primary)" }}
            />

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="group flex h-14 w-full items-center justify-center gap-2 rounded-full bg-[#B5E64D] px-8 text-base font-semibold text-[#0a0a0a] transition-all duration-200 hover:scale-[1.01] hover:bg-[#0a0a0a] hover:text-white active:scale-100 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100 disabled:hover:bg-[#B5E64D] disabled:hover:text-[#0a0a0a]"
              style={{ fontFamily: "var(--font-primary)" }}
            >
              {loading ? "Sending..." : "Send"}
              <ArrowRightIcon className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
            </button>

            {submitted && (
              <p
                role="status"
                className="text-center text-sm font-medium text-[#0a0a0a]"
                style={{ fontFamily: "var(--font-primary)" }}
              >
                Thanks! Your message has been sent.
              </p>
            )}

            {error && (
              <p
                role="alert"
                className="text-center text-sm font-medium text-red-500"
                style={{ fontFamily: "var(--font-primary)" }}
              >
                {error}
              </p>
            )}
          </div>
        </div>

        {/* Contact info trio — no links, plain divs */}
        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6">
          {INFO.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-center gap-4 sm:justify-start"
            >
              <span
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#B5E64D] text-[#0a0a0a]"
                style={CARD_SHADOW}
              >
                {item.icon}
              </span>
              <span className="flex min-w-0 flex-col">
                <span
                  className="text-lg font-bold text-[#0a0a0a]"
                  style={{ fontFamily: "var(--font-primary)" }}
                >
                  {item.label}
                </span>
                <span
                  className="break-all text-sm text-[#5b5959]"
                  style={{ fontFamily: "var(--font-primary)" }}
                >
                  {item.value}
                </span>
              </span>
            </div>
          ))}
        </div>

        {/* Social pills */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-neutral-300 px-6 py-2.5 text-base text-[#0a0a0a] transition-all duration-200 hover:border-[#B5E64D] hover:bg-[#B5E64D]"
              style={{ fontFamily: "var(--font-primary)" }}
            >
              {s.label}
            </a>
          ))}
        </div>

        {/* Footer */}
        <div
          className="mt-16 border-t border-neutral-200 pt-8 text-center text-sm text-[#5b5959]"
          style={{ fontFamily: "var(--font-primary)" }}
        >
          © {new Date().getFullYear()} Ramanathan Rishiharan. All rights
          reserved.
        </div>
      </div>
    </section>
  );
}
