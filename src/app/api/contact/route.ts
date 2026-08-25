import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { contact, site } from "@/data/site";
import {
  consumeContactRateLimit,
  isTrustedRequestOrigin,
  readLimitedJson,
  validateContactPayload,
  type ContactRateBucket,
} from "@/lib/contact-security.mjs";

export const runtime = "nodejs";

const globalRateLimitState = globalThis as typeof globalThis & {
  __portfolioContactRateLimits?: Map<string, ContactRateBucket>;
};
const contactRateLimits =
  globalRateLimitState.__portfolioContactRateLimits ?? new Map<string, ContactRateBucket>();
globalRateLimitState.__portfolioContactRateLimits = contactRateLimits;

function response(body: Record<string, unknown>, status = 200, headers: HeadersInit = {}) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      ...headers,
    },
  });
}

function clientKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",", 1)[0]?.trim();
  const realIp = request.headers.get("x-real-ip")?.trim();
  const userAgent = request.headers.get("user-agent")?.slice(0, 160) ?? "unknown-agent";
  return `${forwarded || realIp || "unknown-ip"}|${userAgent}`;
}

function requestFingerprint(value: string) {
  return createHash("sha256").update(value).digest("hex").slice(0, 12);
}

export async function POST(request: Request) {
  const requestId = requestFingerprint(clientKey(request));

  if (!isTrustedRequestOrigin(request)) {
    console.warn("portfolio_contact_security", { event: "cross_site_rejected", requestId });
    return response({ error: "Invalid request origin." }, 403);
  }

  const rate = consumeContactRateLimit(contactRateLimits, clientKey(request));
  if (!rate.allowed) {
    console.warn("portfolio_contact_security", { event: "rate_limited", requestId });
    return response(
      { error: "Too many contact attempts. Please try again later." },
      429,
      { "Retry-After": String(rate.retryAfterSeconds) },
    );
  }

  const parsed = await readLimitedJson(request);
  if (!parsed.ok) return response({ error: parsed.error }, parsed.status);

  const companyWebsite = String(parsed.value.companyWebsite ?? "").trim();
  if (companyWebsite) {
    console.info("portfolio_contact_security", { event: "honeypot_dropped", requestId });
    return response({ ok: true });
  }

  const validated = validateContactPayload(parsed.value, contact.reasons);
  if (!validated.ok) return response({ error: validated.error }, validated.status);

  const { name, email, message, organization, reason, elapsedMs } = validated.value;

  // A real form interaction takes time. Silently accept and drop implausibly fast submissions.
  if (typeof elapsedMs === "number" && elapsedMs < 1500) {
    console.info("portfolio_contact_security", { event: "timing_dropped", requestId });
    return response({ ok: true });
  }

  const toEmail = process.env.CONTACT_TO_EMAIL || site.email;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;
  const resendKey = process.env.RESEND_API_KEY;

  // Fail closed in production instead of claiming a message was delivered when no
  // delivery provider is configured. Do not log visitor message contents.
  if (!resendKey || !fromEmail) {
    console.error("portfolio_contact_delivery", { event: "provider_unconfigured", requestId });
    return response(
      { error: `Contact delivery is temporarily unavailable. Please email ${site.email} directly.` },
      503,
    );
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: email,
        subject: `Portfolio contact: ${reason} · ${name}`,
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          `Organization: ${organization || "n/a"}`,
          `Reason: ${reason}`,
          "",
          message,
        ].join("\n"),
      }),
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) {
      console.error("portfolio_contact_delivery", {
        event: "provider_rejected",
        requestId,
        status: res.status,
      });
      return response({ error: "Could not send message right now. Please try again later." }, 502);
    }
  } catch (error) {
    console.error("portfolio_contact_delivery", {
      event: "provider_failed",
      requestId,
      error: error instanceof Error ? error.name : "unknown_error",
    });
    return response({ error: "Could not send message right now. Please try again later." }, 502);
  }

  console.info("portfolio_contact_delivery", { event: "delivered", requestId });
  return response({ ok: true });
}
