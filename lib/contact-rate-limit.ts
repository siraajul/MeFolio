/**
 * Shared in-memory rate limiter for the contact form.
 * Uses a Map with IP or email as key and { count, resetAt } as value.
 *
 * Note: This works in development and single-instance deployments.
 * For multi-instance (e.g. Vercel serverless), consider using Edge rate limiting,
 * Vercel KV, Upstash Redis, or similar.
 */

interface RateLimitEntry {
    count: number;
    resetAt: number;
}

// Global store to persist across hot reloads in dev
const globalForLimiter = globalThis as unknown as { contactLimiter: Map<string, RateLimitEntry> };

export const contactLimiter: Map<string, RateLimitEntry> =
    globalForLimiter.contactLimiter || new Map<string, RateLimitEntry>();

globalForLimiter.contactLimiter = contactLimiter;

/**
 * Cleanup expired rate limits
 */
export function cleanupExpiredLimits(): void {
    const now = Date.now();
    for (const [key, data] of contactLimiter.entries()) {
        if (now > data.resetAt) {
            contactLimiter.delete(key);
        }
    }
}
