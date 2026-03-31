import { NextResponse } from "next/server";
import { otpStore, cleanupExpiredOTPs } from "@/lib/otp-store";
import { checkRateLimit, rateLimits } from "@/lib/rate-limit";
import { client } from "@/sanity/lib/client";
import { z } from "zod";

const VerifyOtpSchema = z.object({
    email: z.string().email("Invalid email format").max(254).trim().toLowerCase(),
    otp: z.string().length(6).regex(/^\d+$/, "OTP must contain only numbers"),
    name: z.string().max(100).trim().optional(),
    company: z.string().max(100).trim().optional(),
});

export async function POST(req: Request) {
    try {
        // Get IP address for rate limiting
        const forwardedFor = req.headers.get("x-forwarded-for");
        const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "unknown-ip";

        // Apply strict rate limit per IP
        const rateLimitResult = await checkRateLimit(ip, {
            ...rateLimits.strict,
            keyPrefix: "verify-otp",
        });

        if (!rateLimitResult.success) {
            return NextResponse.json(
                { message: "Too many verification attempts. Please try again later." },
                {
                    status: 429,
                    headers: {
                        "Retry-After": Math.ceil((rateLimitResult.resetAt - Date.now()) / 1000).toString(),
                    },
                }
            );
        }

        const body = await req.json();
        const parsed = VerifyOtpSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                { message: "Invalid input data", errors: parsed.error.format() },
                { status: 400 }
            );
        }

        const { email, otp, name, company } = parsed.data;

        // Cleanup expired OTPs
        cleanupExpiredOTPs();

        // Check OTP
        const stored = otpStore.get(email);

        if (!stored) {
            return NextResponse.json(
                {
                    message:
                        "No OTP found for this email. Please request a new one.",
                },
                { status: 400 }
            );
        }

        if (Date.now() > stored.expiresAt) {
            otpStore.delete(email);
            return NextResponse.json(
                { message: "OTP has expired. Please request a new one." },
                { status: 400 }
            );
        }

        if (stored.attempts >= 3) {
            otpStore.delete(email);
            return NextResponse.json(
                { message: "Too many failed attempts. Please request a new OTP." },
                {
                    status: 429,
                    headers: {
                        "Retry-After": "60",
                    },
                }
            );
        }

        if (stored.otp !== otp) {
            stored.attempts += 1;
            return NextResponse.json(
                { message: "Incorrect OTP. Please try again." },
                { status: 400 }
            );
        }

        // OTP is valid — remove it (single use)
        otpStore.delete(email);

        // Save lead to Sanity
        const token = process.env.SANITY_API_TOKEN;
        if (token) {
            try {
                const writeClient = client.withConfig({ token });
                await writeClient.create({
                    _type: "lead",
                    name: name || "Unknown",
                    email: email,
                    company: company || "",
                    downloadedAt: new Date().toISOString(),
                });
            } catch (sanityError) {
                console.error("Error saving lead to Sanity:", sanityError);
                // Don't block download if Sanity write fails
            }
        }

        return NextResponse.json(
            { message: "OTP verified successfully", verified: true },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error verifying OTP:", error);
        return NextResponse.json(
            { message: "Verification failed. Please try again." },
            { status: 500 }
        );
    }
}
