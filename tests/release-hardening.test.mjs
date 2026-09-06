import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

test("server build carries defense-in-depth response headers", () => {
  const config = read("next.config.mjs");
  assert.match(config, /Content-Security-Policy/);
  assert.match(config, /default-src 'self'/);
  assert.match(config, /frame-ancestors 'none'/);
  assert.match(config, /object-src 'none'/);
  assert.match(config, /Strict-Transport-Security/);
  assert.match(config, /X-Frame-Options/);
  assert.match(config, /DENY/);
  assert.match(config, /Permissions-Policy/);
  assert.match(config, /camera=\(\), microphone=\(\), geolocation=\(\), payment=\(\), usb=\(\)/);
});

test("static export exposes an honest client contact mode", () => {
  const config = read("next.config.mjs");
  const form = read("src/components/contact/ContactForm.tsx");
  assert.match(config, /NEXT_PUBLIC_STATIC_EXPORT: isStaticExport \? "true" : "false"/);
  assert.match(form, /IS_STATIC_EXPORT/);
  assert.match(form, /window\.location\.href = `mailto:/);
  assert.match(form, /Nothing is sent by this website until you choose Send/);
});

test("hosted contact route is bounded, origin checked, rate limited, and fail closed", () => {
  const route = read("src/app/api/contact/route.ts");
  assert.match(route, /readLimitedJson/);
  assert.match(route, /isTrustedRequestOrigin/);
  assert.match(route, /consumeContactRateLimit/);
  assert.match(route, /provider_unconfigured/);
  assert.match(route, /AbortSignal\.timeout\(8000\)/);
  assert.match(route, /Cache-Control/);
  assert.doesNotMatch(route, /Contact submission \(no email provider configured\)/);
  assert.doesNotMatch(route, /console\.(info|log)\([^\n]*\{\s*name,\s*email/);
});

test("contact form includes accessible recovery and privacy UX", () => {
  const form = read("src/components/contact/ContactForm.tsx");
  assert.match(form, /form\.checkValidity\(\)/);
  assert.match(form, /form\.reportValidity\(\)/);
  assert.match(form, /aria-busy=/);
  assert.match(form, /message-counter/);
  assert.match(form, /MESSAGE_LIMIT = 5000/);
  assert.match(form, /Privacy details/);
  assert.match(form, /You can also email/);
  assert.match(form, /min-h-12/);
});

test("privacy page documents minimization, international rights, retention, and provider boundaries", () => {
  const privacy = read("src/app/privacy/page.tsx");
  assert.match(privacy, /Privacy by default/);
  assert.match(privacy, /Static-site contact/);
  assert.match(privacy, /not sold/);
  assert.match(privacy, /targeted advertising/);
  assert.match(privacy, /international processing/);
  assert.match(privacy, /Retention and deletion/);
  assert.match(privacy, /GDPR\/UK GDPR/);
  assert.match(privacy, /CCPA\/CPRA/);
  assert.match(privacy, /PIPEDA/);
  assert.match(privacy, /LGPD/);
  assert.match(privacy, /Digital Personal Data Protection/);
  assert.match(privacy, /Privacy Act/);
  assert.match(privacy, /PDPA/);
  assert.match(privacy, /APPI/);
  assert.match(privacy, /PIPA/);
  assert.match(privacy, /does not claim formal certification/);
});
