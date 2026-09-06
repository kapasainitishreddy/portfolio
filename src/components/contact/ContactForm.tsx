"use client";

import { useRef, useState } from "react";
import { contact, site } from "@/data/site";

type Status = "idle" | "submitting" | "success" | "error";

const MESSAGE_LIMIT = 5000;
const IS_STATIC_EXPORT = process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [messageLength, setMessageLength] = useState(0);
  const startedAt = useRef(Date.now());

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setStatus("submitting");
    setError("");

    const data = new FormData(form);
    const companyWebsite = String(data.get("company_website") ?? "");
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      organization: String(data.get("organization") ?? ""),
      reason: String(data.get("reason") ?? ""),
      message: String(data.get("message") ?? ""),
      companyWebsite,
      elapsedMs: Date.now() - startedAt.current,
    };

    if (IS_STATIC_EXPORT) {
      if (companyWebsite) {
        setStatus("success");
        form.reset();
        setMessageLength(0);
        return;
      }
      const subject = encodeURIComponent(`Portfolio contact: ${payload.reason || "message"}`);
      const body = encodeURIComponent(
        `Name: ${payload.name}\nEmail: ${payload.email}\nOrganization: ${payload.organization || "n/a"}\nReason: ${payload.reason}\n\n${payload.message}`,
      );
      window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
      setStatus("success");
      form.reset();
      setMessageLength(0);
      startedAt.current = Date.now();
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.error ?? "Something went wrong. Please try again.");
      }
      setStatus("success");
      form.reset();
      setMessageLength(0);
      startedAt.current = Date.now();
    } catch (caught) {
      setStatus("error");
      setError(caught instanceof Error ? caught.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="surface flex flex-col items-start gap-3 p-6 md:p-8" role="status" aria-live="polite">
        <span className="font-serif text-2xl text-rice">
          {IS_STATIC_EXPORT ? "Opening your email client…" : "Message delivered."}
        </span>
        <p className="max-w-xl text-silver">
          {IS_STATIC_EXPORT
            ? "Your message is pre-filled in a new email. Nothing is sent by this website until you choose Send in your email app."
            : "Your message was accepted by the configured email provider."}
        </p>
        <p className="text-sm leading-relaxed text-silver">
          If nothing opened or you do not hear back, email{" "}
          <a href={`mailto:${site.email}`} className="link-quiet text-rice">
            {site.email}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            startedAt.current = Date.now();
          }}
          className="link-quiet mt-2 min-h-11 text-sm text-silver"
        >
          Send another message
        </button>
      </div>
    );
  }

  const fieldClass =
    "min-h-12 w-full rounded-lg border bg-transparent px-4 py-3 text-rice placeholder:text-[color-mix(in_srgb,var(--color-silver)_60%,transparent)] transition-colors focus:border-[var(--color-silver)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--color-soft)_55%,transparent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-ink)]";
  const fieldStyle = { borderColor: "color-mix(in srgb, var(--color-silver) 22%, transparent)" } as const;
  const isSubmitting = status === "submitting";

  return (
    <form
      onSubmit={onSubmit}
      className="surface space-y-5 p-6 md:p-8"
      aria-busy={isSubmitting}
      aria-describedby="contact-privacy-note"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="font-mono-label mb-2 block">
            Name <span aria-hidden="true">*</span>
          </label>
          <input id="name" name="name" required maxLength={120} autoComplete="name" disabled={isSubmitting} className={fieldClass} style={fieldStyle} />
        </div>
        <div>
          <label htmlFor="email" className="font-mono-label mb-2 block">
            Email <span aria-hidden="true">*</span>
          </label>
          <input id="email" name="email" type="email" required maxLength={254} autoComplete="email" inputMode="email" spellCheck={false} disabled={isSubmitting} className={fieldClass} style={fieldStyle} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="organization" className="font-mono-label mb-2 block">
            Organization <span className="normal-case tracking-normal">(optional)</span>
          </label>
          <input id="organization" name="organization" maxLength={160} autoComplete="organization" disabled={isSubmitting} className={fieldClass} style={fieldStyle} />
        </div>
        <div>
          <label htmlFor="reason" className="font-mono-label mb-2 block">
            Reason for contacting <span aria-hidden="true">*</span>
          </label>
          <select id="reason" name="reason" required disabled={isSubmitting} className={fieldClass} style={fieldStyle} defaultValue="">
            <option value="" disabled>Select a reason</option>
            {contact.reasons.map((reason) => <option key={reason} value={reason} style={{ color: "var(--color-ink)" }}>{reason}</option>)}
          </select>
        </div>
      </div>

      <div>
        <div className="mb-2 flex items-end justify-between gap-4">
          <label htmlFor="message" className="font-mono-label block">
            Message <span aria-hidden="true">*</span>
          </label>
          <span id="message-counter" className="text-xs tabular-nums text-silver" aria-live="polite">
            {messageLength.toLocaleString()} / {MESSAGE_LIMIT.toLocaleString()}
          </span>
        </div>
        <textarea
          id="message"
          name="message"
          required
          maxLength={MESSAGE_LIMIT}
          rows={6}
          disabled={isSubmitting}
          aria-describedby="message-counter contact-privacy-note"
          onChange={(event) => setMessageLength(event.currentTarget.value.length)}
          className={`${fieldClass} min-h-40 resize-y`}
          style={fieldStyle}
        />
      </div>

      <div aria-hidden className="absolute h-0 w-0 overflow-hidden opacity-0" style={{ left: "-9999px" }}>
        <label htmlFor="company_website">Leave empty</label>
        <input id="company_website" name="company_website" tabIndex={-1} autoComplete="off" />
      </div>

      <p id="contact-privacy-note" className="text-sm leading-relaxed text-silver">
        {IS_STATIC_EXPORT
          ? "This static version opens your own email app; the website does not transmit the form itself. "
          : "Your contact details and message are used only to respond to this inquiry and are not added to a marketing list or sold. "}
        <a href="/privacy" className="link-quiet text-rice">Privacy details</a>.
      </p>

      {status === "error" && (
        <div className="rounded-lg border p-4 text-sm" style={{ borderColor: "color-mix(in srgb, var(--color-copper) 42%, transparent)", color: "var(--color-copper)" }} role="alert">
          <p>{error}</p>
          <p className="mt-2 text-silver">You can also email <a href={`mailto:${site.email}`} className="link-quiet text-rice">{site.email}</a>.</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-medium text-ink transition-[opacity,transform] hover:-translate-y-0.5 disabled:translate-y-0 disabled:cursor-wait disabled:opacity-60 sm:w-auto"
        style={{ background: "var(--color-soft)" }}
      >
        {isSubmitting ? (IS_STATIC_EXPORT ? "Preparing email…" : "Sending securely…") : (IS_STATIC_EXPORT ? "Open email draft" : "Send message")}
      </button>
    </form>
  );
}
