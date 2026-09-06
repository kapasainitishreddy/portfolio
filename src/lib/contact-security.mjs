export const CONTACT_MAX_BODY_BYTES = 16 * 1024;
export const CONTACT_LIMIT_WINDOW_MS = 10 * 60 * 1000;
export const CONTACT_LIMIT_MAX_REQUESTS = 5;
export const CONTACT_BLOCK_MS = 30 * 60 * 1000;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function responseError(status, error) {
  return { ok: false, status, error };
}

export function normalizeSingleLine(value, maxLength) {
  return String(value ?? "")
    .replace(/[\r\n\t]+/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim()
    .slice(0, maxLength);
}

export async function readLimitedJson(request, maxBytes = CONTACT_MAX_BODY_BYTES) {
  const contentType = (request.headers.get("content-type") || "")
    .split(";", 1)[0]
    .trim()
    .toLowerCase();
  if (contentType !== "application/json") {
    return responseError(415, "Use application/json for contact requests.");
  }

  const declaredLength = Number(request.headers.get("content-length") || "0");
  if (Number.isFinite(declaredLength) && declaredLength > maxBytes) {
    return responseError(413, "Request is too large.");
  }

  if (!request.body) return responseError(400, "Invalid request.");
  const reader = request.body.getReader();
  const chunks = [];
  let total = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > maxBytes) {
        await reader.cancel("contact body limit exceeded");
        return responseError(413, "Request is too large.");
      }
      chunks.push(value);
    }
  } catch {
    return responseError(400, "Invalid request.");
  }

  const bytes = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }

  try {
    const parsed = JSON.parse(new TextDecoder().decode(bytes));
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return responseError(400, "Invalid request.");
    }
    return { ok: true, value: parsed };
  } catch {
    return responseError(400, "Invalid request.");
  }
}

export function validateContactPayload(body, allowedReasons) {
  const name = normalizeSingleLine(body?.name, 120);
  const email = normalizeSingleLine(body?.email, 254).toLowerCase();
  const organization = normalizeSingleLine(body?.organization, 160);
  const reason = normalizeSingleLine(body?.reason, 120);
  const message = String(body?.message ?? "").replace(/\r\n/g, "\n").trim();
  const elapsedMs = body?.elapsedMs;

  if (!name || !email || !message || !reason) {
    return responseError(400, "Please complete all required fields.");
  }
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return responseError(400, "Please enter a valid email address.");
  }
  if (!allowedReasons.includes(reason)) {
    return responseError(400, "Please choose a valid reason for contacting.");
  }
  if (message.length > 5000) {
    return responseError(400, "Message is too long.");
  }
  if (organization.length > 160 || name.length > 120) {
    return responseError(400, "One or more fields are too long.");
  }
  if (elapsedMs !== undefined && (!Number.isFinite(elapsedMs) || elapsedMs < 0 || elapsedMs > 24 * 60 * 60 * 1000)) {
    return responseError(400, "Invalid request timing.");
  }

  return {
    ok: true,
    value: { name, email, organization, reason, message, elapsedMs },
  };
}

export function isTrustedRequestOrigin(request) {
  const origin = request.headers.get("origin");
  const fetchSite = request.headers.get("sec-fetch-site");
  if (fetchSite === "cross-site") return false;
  if (!origin) return true;
  try {
    return new URL(origin).origin === new URL(request.url).origin;
  } catch {
    return false;
  }
}

export function consumeContactRateLimit(store, key, now = Date.now()) {
  const current = store.get(key);
  if (current?.blockedUntil && current.blockedUntil > now) {
    return { allowed: false, retryAfterSeconds: Math.ceil((current.blockedUntil - now) / 1000) };
  }

  let next = current;
  if (!next || now - next.windowStartedAt >= CONTACT_LIMIT_WINDOW_MS) {
    next = { windowStartedAt: now, count: 0, blockedUntil: 0 };
  }

  next.count += 1;
  if (next.count > CONTACT_LIMIT_MAX_REQUESTS) {
    next.blockedUntil = now + CONTACT_BLOCK_MS;
    store.set(key, next);
    return { allowed: false, retryAfterSeconds: Math.ceil(CONTACT_BLOCK_MS / 1000) };
  }

  store.set(key, next);
  return { allowed: true, retryAfterSeconds: 0 };
}
