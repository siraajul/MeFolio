/**
 * Shared in-memory OTP store used by both send-otp and verify-otp routes.
 * Uses a Map with email as key and { otp, expiresAt } as value.
 *
 * Note: This works in development and single-instance deployments.
 * For multi-instance (e.g. Vercel serverless), consider using
 * Vercel KV, Upstash Redis, or similar.
 */

interface OTPEntry {
    otp: string;
    expiresAt: number;
    attempts: number;
}

// Global store to persist across hot reloads in dev
const globalForOTP = globalThis as unknown as { otpStore: Map<string, OTPEntry> };

export const otpStore: Map<string, OTPEntry> =
    globalForOTP.otpStore || new Map<string, OTPEntry>();

globalForOTP.otpStore = otpStore;

/**
 * Generate a 6-digit OTP
 */
export function generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Cleanup expired OTPs
 */
export function cleanupExpiredOTPs(): void {
    const now = Date.now();
    for (const [email, data] of otpStore.entries()) {
        if (now > data.expiresAt) {
            otpStore.delete(email);
        }
    }
}
