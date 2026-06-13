import { NextResponse } from "next/server";
import { site } from "@/data/site";

export const runtime = "nodejs";

interface ContactPayload {
  name?: string;
  email?: string;
  organization?: string;
  reason?: string;
  message?: string;
  elapsedMs?: number;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const message = body.message?.trim() ?? "";
  const organization = body.organization?.trim() ?? "";
  const reason = body.reason?.trim() ?? "";

  // basic validation
  if (!name || !email || !message || !reason) {
    return NextResponse.json({ error: "Please complete all required fields." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  if (message.length > 5000) {
    return NextResponse.json({ error: "Message is too long." }, { status: 400 });
  }
  // timing-based spam check: real users take more than ~1.5s
  if (typeof body.elapsedMs === "number" && body.elapsedMs < 1500) {
    return NextResponse.json({ ok: true }); // silently drop likely bot
  }

  const toEmail = process.env.CONTACT_TO_EMAIL || site.email;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;
  const resendKey = process.env.RESEND_API_KEY;

  // If Resend is configured, deliver by email. Otherwise log on the server.
  if (resendKey && fromEmail) {
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
      });
      if (!res.ok) {
        const detail = await res.text();
        console.error("Resend error:", detail);
        return NextResponse.json({ error: "Could not send message right now." }, { status: 502 });
      }
    } catch (err) {
      console.error("Contact delivery failed:", err);
      return NextResponse.json({ error: "Could not send message right now." }, { status: 502 });
    }
  } else {
    // No email provider configured: log so the submission is not lost in dev.
    console.info("Contact submission (no email provider configured):", {
      name,
      email,
      organization,
      reason,
      message,
    });
  }

  return NextResponse.json({ ok: true });
}
