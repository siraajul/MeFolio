/**
 * Rate limiting with in-memory store
 *
 * For production with multiple instances (e.g., Vercel), you should use Redis.
 * Install @upstash/redis and uncomment the Redis sections below.
 *
 * npm install @upstash/redis
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const memoryStore = new Map<string, RateLimitEntry>();

// Cleanup expired entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of memoryStore.entries()) {
    if (now > entry.resetAt) {
      memoryStore.delete(key);
    }
  }
}, 60 * 1000); // Cleanup every minute

export interface RateLimitConfig {
  windowMs: number;      // Time window in milliseconds
  maxRequests: number;   // Maximum requests per window
  keyPrefix?: string;    // Optional prefix for the key
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  resetAt: number;
}

/**
 * Check if a request should be rate limited
 * @param identifier - Unique identifier (IP address, user ID, etc.)
 * @param config - Rate limit configuration
 */
export async function checkRateLimit(
  identifier: string,
  config: RateLimitConfig
): Promise<RateLimitResult> {
  const { windowMs, maxRequests, keyPrefix = "" } = config;
  const key = `${keyPrefix}:${identifier}`;
  const now = Date.now();

  // TODO: For production with multiple instances, implement Redis:
  // Example with Upstash Redis:
  // import { Redis } from "@upstash/redis";
  // const redis = new Redis({ url: process.env.UPSTASH_REDIS_REST_URL, token: process.env.UPSTASH_REDIS_REST_TOKEN });
  // const [count, ttl] = await redis.pipeline().get(key).ttl(key).exec<number, number>();

  // In-memory rate limiting (works for single-instance deployments)
  const entry = memoryStore.get(key);

  if (!entry || now > entry.resetAt) {
    // First request or expired
    memoryStore.set(key, {
      count: 1,
      resetAt: now + windowMs,
    });
    return {
      success: true,
      limit: maxRequests,
      remaining: maxRequests - 1,
      resetAt: now + windowMs,
    };
  }

  if (entry.count >= maxRequests) {
    return {
      success: false,
      limit: maxRequests,
      remaining: 0,
      resetAt: entry.resetAt,
    };
  }

  entry.count++;
  return {
    success: true,
    limit: maxRequests,
    remaining: maxRequests - entry.count,
    resetAt: entry.resetAt,
  };
}

/**
 * Reset rate limit for an identifier
 * @param identifier - Unique identifier
 * @param keyPrefix - Optional prefix
 */
export async function resetRateLimit(
  identifier: string,
  keyPrefix: string = ""
): Promise<void> {
  const key = `${keyPrefix}:${identifier}`;
  memoryStore.delete(key);
}

// Pre-configured rate limits for common use cases
export const rateLimits = {
  // Strict: For sensitive operations like OTP
  strict: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 3,
  },
  // Standard: For form submissions
  standard: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 10,
  },
  // Relaxed: For general API usage
  relaxed: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 30,
  },
  // Daily limit: For contact forms
  daily: {
    windowMs: 24 * 60 * 60 * 1000, // 24 hours
    maxRequests: 3,
  },
};
