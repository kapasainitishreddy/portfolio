export const CONTACT_MAX_BODY_BYTES: number;
export const CONTACT_LIMIT_WINDOW_MS: number;
export const CONTACT_LIMIT_MAX_REQUESTS: number;
export const CONTACT_BLOCK_MS: number;

export type ContactSecurityError = { ok: false; status: number; error: string };
export type ContactMessage = {
  name: string;
  email: string;
  organization: string;
  reason: string;
  message: string;
  elapsedMs?: number;
};
export type ContactRateBucket = { windowStartedAt: number; count: number; blockedUntil: number };

export function normalizeSingleLine(value: unknown, maxLength: number): string;
export function readLimitedJson(request: Request, maxBytes?: number): Promise<ContactSecurityError | { ok: true; value: Record<string, unknown> }>;
export function validateContactPayload(body: Record<string, unknown>, allowedReasons: readonly string[]): ContactSecurityError | { ok: true; value: ContactMessage };
export function isTrustedRequestOrigin(request: Request): boolean;
export function consumeContactRateLimit(
  store: Map<string, ContactRateBucket>,
  key: string,
  now?: number,
): { allowed: boolean; retryAfterSeconds: number };
