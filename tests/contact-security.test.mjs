import test from "node:test";
import assert from "node:assert/strict";
import {
  CONTACT_LIMIT_MAX_REQUESTS,
  CONTACT_MAX_BODY_BYTES,
  consumeContactRateLimit,
  isTrustedRequestOrigin,
  readLimitedJson,
  validateContactPayload,
} from "../src/lib/contact-security.mjs";

const reasons = ["Communications opportunity", "Other"];

function validPayload(overrides = {}) {
  return {
    name: "Sai Visitor",
    email: "Visitor@Example.com",
    organization: "Example Org",
    reason: "Other",
    message: "Hello from the portfolio.",
    elapsedMs: 2500,
    ...overrides,
  };
}

test("validates and normalizes a legitimate contact payload", () => {
  const result = validateContactPayload(validPayload({ name: "Sai\nVisitor" }), reasons);
  assert.equal(result.ok, true);
  assert.equal(result.value.name, "Sai Visitor");
  assert.equal(result.value.email, "visitor@example.com");
});

test("rejects reason injection and oversized messages", () => {
  assert.equal(
    validateContactPayload(validPayload({ reason: "Other\nBcc: attacker@example.com" }), reasons).ok,
    false,
  );
  assert.equal(validateContactPayload(validPayload({ message: "x".repeat(5001) }), reasons).status, 400);
});

test("rejects cross-site browser requests but permits same-origin requests", () => {
  const sameOrigin = new Request("https://portfolio.example/api/contact", {
    headers: { origin: "https://portfolio.example", "sec-fetch-site": "same-origin" },
  });
  const crossSite = new Request("https://portfolio.example/api/contact", {
    headers: { origin: "https://evil.example", "sec-fetch-site": "cross-site" },
  });
  assert.equal(isTrustedRequestOrigin(sameOrigin), true);
  assert.equal(isTrustedRequestOrigin(crossSite), false);
});

test("rejects bodies above the byte limit and non-json content", async () => {
  const tooLarge = new Request("https://portfolio.example/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ message: "x".repeat(CONTACT_MAX_BODY_BYTES) }),
  });
  const tooLargeResult = await readLimitedJson(tooLarge);
  assert.equal(tooLargeResult.status, 413);

  const wrongType = new Request("https://portfolio.example/api/contact", {
    method: "POST",
    headers: { "content-type": "text/plain" },
    body: "{}",
  });
  const wrongTypeResult = await readLimitedJson(wrongType);
  assert.equal(wrongTypeResult.status, 415);
});

test("temporarily blocks abusive bursts after the allowed contact budget", () => {
  const store = new Map();
  const now = 1_700_000_000_000;
  for (let index = 0; index < CONTACT_LIMIT_MAX_REQUESTS; index += 1) {
    assert.equal(consumeContactRateLimit(store, "client", now + index).allowed, true);
  }
  const blocked = consumeContactRateLimit(store, "client", now + 20);
  assert.equal(blocked.allowed, false);
  assert.ok(blocked.retryAfterSeconds > 0);
});
