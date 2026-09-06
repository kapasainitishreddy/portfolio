import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

test("production header manifest includes the applicable static-site protections", () => {
  const config = read("next.config.mjs");
  assert.match(config, /Strict-Transport-Security/);
  assert.match(config, /max-age=31536000/);
  assert.match(config, /X-Content-Type-Options/);
  assert.match(config, /X-Frame-Options/);
  assert.match(config, /DENY/);
  assert.match(config, /Permissions-Policy/);
  assert.match(config, /camera=\(\), microphone=\(\), geolocation=\(\), payment=\(\), usb=\(\)/);
});

test("contact endpoint fails closed without delivery configuration and does not log visitor payloads", () => {
  const route = read("src/app/api/contact/route.ts");
  assert.match(route, /provider_unconfigured/);
  assert.match(route, /503/);
  assert.match(route, /readLimitedJson/);
  assert.match(route, /consumeContactRateLimit/);
  assert.match(route, /isTrustedRequestOrigin/);
  assert.doesNotMatch(route, /Contact submission \(no email provider configured\)/);
  assert.doesNotMatch(route, /console\.(info|log)\([^\n]*\{\s*name,\s*email/);
});

test("contact form exposes privacy, recovery, accessibility, and message-length UX", () => {
  const form = read("src/components/contact/ContactForm.tsx");
  assert.match(form, /used only to respond to this inquiry/);
  assert.match(form, /not added to a marketing list or sold/);
  assert.match(form, /href="\/privacy"/);
  assert.match(form, /aria-busy=/);
  assert.match(form, /message-counter/);
  assert.match(form, /MESSAGE_LIMIT = 5000/);
  assert.match(form, /form\.checkValidity\(\)/);
  assert.match(form, /form\.reportValidity\(\)/);
  assert.match(form, /You can also email/);
});

test("mobile navigation has explicit dialog, focus, escape, and touch-target behavior", () => {
  const navigation = read("src/components/layout/Navigation.tsx");
  assert.match(navigation, /aria-controls="mobile-primary-menu"/);
  assert.match(navigation, /aria-haspopup="dialog"/);
  assert.match(navigation, /aria-modal="true"/);
  assert.match(navigation, /event\.key !== "Escape"/);
  assert.match(navigation, /firstMenuLinkRef\.current\?\.focus\(\)/);
  assert.match(navigation, /menuButtonRef\.current\?\.focus\(\)/);
  assert.match(navigation, /h-11 w-11/);
  assert.match(navigation, /min-h-14/);
});

test("portfolio assistant is deterministic-only at release", () => {
  const config = JSON.parse(read("public/assistant/site.json"));
  assert.equal(config.ai.chrome, false);
  assert.equal(config.ai.puter, false);
  assert.equal(config.ai.deterministicFallback, true);
  assert.equal(config.voice.input, false);
  assert.ok(config.maxContextEntries <= 5);
});

test("privacy disclosure matches contact, storage, assistant, and international-rights behavior", () => {
  const privacy = read("src/app/privacy/page.tsx");
  assert.match(privacy, /local storage/);
  assert.match(privacy, /not sold/);
  assert.match(privacy, /targeted advertising/);
  assert.match(privacy, /disables Chrome and Puter AI providers/);
  assert.match(privacy, /without intentionally logging your message body or email address/);
  assert.match(privacy, /international processing/);
  assert.match(privacy, /Retention and deletion/);
  assert.match(privacy, /Your privacy rights around the world/);
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
