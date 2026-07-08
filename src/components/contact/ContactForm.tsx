"use client";

import { useRef, useState } from "react";
import { contact, site } from "@/data/site";

type Status = "idle" | "submitting" | "success" | "error";

// The GitHub Pages build is fully static and has no /api/contact route to
// post to, so it falls back to opening the visitor's email client instead.
const IS_STATIC_EXPORT = process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");
  const startedAt = useRef<number>(Date.now());

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    const form = e.currentTarget;
    const data = new FormData(form);

    // honeypot: bots fill hidden fields; humans don't
    if ((data.get("company_website") as string)?.length) {
      setStatus("success"); // silently accept, drop
      form.reset();
      return;
    }

    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      organization: String(data.get("organization") ?? ""),
      reason: String(data.get("reason") ?? ""),
      message: String(data.get("message") ?? ""),
      elapsedMs: Date.now() - startedAt.current,
    };

    if (IS_STATIC_EXPORT) {
      const subject = encodeURIComponent(`Portfolio contact: ${payload.reason || "message"}`);
      const body = encodeURIComponent(
        `Name: ${payload.name}\nEmail: ${payload.email}\nOrganization: ${payload.organization || "—"}\nReason: ${payload.reason}\n\n${payload.message}`
      );
      window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
      setStatus("success");
      form.reset();
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Something went wrong. Please try again.");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div
        className="surface flex flex-col items-start gap-3 p-8"
        role="status"
        aria-live="polite"
      >
        <span className="font-serif text-2xl text-rice">
          {IS_STATIC_EXPORT ? "Opening your email client…" : "Message received."}
        </span>
        <p className="text-silver">
          {IS_STATIC_EXPORT
            ? "Your message was pre-filled in a new email — just hit send. If nothing opened, email me directly."
            : "Thank you for reaching out. I read every message and will reply to you by email soon."}
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="link-quiet mt-2 text-sm text-silver"
        >
          Send another message
        </button>
      </div>
    );
  }

  const fieldClass =
    "w-full rounded-lg border bg-transparent px-4 py-3 text-rice placeholder:text-[color-mix(in_srgb,var(--color-silver)_60%,transparent)] focus:border-[var(--color-silver)] focus:outline-none";
  const fieldStyle = { borderColor: "color-mix(in srgb, var(--color-silver) 22%, transparent)" } as const;

  return (
    <form onSubmit={onSubmit} className="surface space-y-5 p-6 md:p-8" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="font-mono-label mb-2 block">
            Name
          </label>
          <input id="name" name="name" type="text" required autoComplete="name" className={fieldClass} style={fieldStyle} />
        </div>
        <div>
          <label htmlFor="email" className="font-mono-label mb-2 block">
            Email
          </label>
          <input id="email" name="email" type="email" required autoComplete="email" className={fieldClass} style={fieldStyle} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="organization" className="font-mono-label mb-2 block">
            Organization <span style={{ textTransform: "none" }}>(optional)</span>
          </label>
          <input id="organization" name="organization" type="text" autoComplete="organization" className={fieldClass} style={fieldStyle} />
        </div>
        <div>
          <label htmlFor="reason" className="font-mono-label mb-2 block">
            Reason for contacting
          </label>
          <select id="reason" name="reason" required className={fieldClass} style={fieldStyle} defaultValue="">
            <option value="" disabled>
              Select a reason
            </option>
            {contact.reasons.map((r) => (
              <option key={r} value={r} style={{ color: "var(--color-ink)" }}>
                {r}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="font-mono-label mb-2 block">
          Message
        </label>
        <textarea id="message" name="message" required rows={5} className={fieldClass} style={fieldStyle} />
      </div>

      {/* honeypot, visually hidden from humans */}
      <div aria-hidden className="absolute h-0 w-0 overflow-hidden opacity-0" style={{ position: "absolute", left: "-9999px" }}>
        <label htmlFor="company_website">Leave this field empty</label>
        <input id="company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {status === "error" && (
        <p className="text-sm" style={{ color: "var(--color-copper)" }} role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-medium text-ink transition-opacity disabled:opacity-60"
        style={{ background: "var(--color-soft)" }}
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
