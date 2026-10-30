// Sliding-window rate limiter to protect the contact Server Action from spam.
const windowMs = 60 * 1000;
const maxRequests = 3;
const ipHits = new Map<string, number[]>();

export function checkRateLimit(identifier: string): { allowed: boolean } {
  const now = Date.now();
  const timestamps = ipHits.get(identifier) ?? [];
  const recent = timestamps.filter((t) => now - t < windowMs);

  if (recent.length >= maxRequests) {
    ipHits.set(identifier, recent);
    return { allowed: false };
  }

  recent.push(now);
  ipHits.set(identifier, recent);
  return { allowed: true };
}
