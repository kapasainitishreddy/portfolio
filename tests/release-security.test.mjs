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

test("portfolio assistant is deterministic-only at release", () => {
  const config = JSON.parse(read("public/assistant/site.json"));
  assert.equal(config.ai.chrome, false);
  assert.equal(config.ai.puter, false);
  assert.equal(config.ai.deterministicFallback, true);
  assert.equal(config.voice.input, false);
  assert.ok(config.maxContextEntries <= 5);
});

test("privacy disclosure matches contact and assistant behavior", () => {
  const privacy = read("src/app/privacy/page.tsx");
  assert.match(privacy, /fails closed/);
  assert.match(privacy, /disables Chrome and Puter AI providers/);
  assert.match(privacy, /without intentionally logging the message body or email address/);
});
