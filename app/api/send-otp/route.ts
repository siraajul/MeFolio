import { NextResponse } from "next/server";
import { promises as dns } from "dns";
import { isDisposableEmail } from "@/lib/disposable-domains";
import { otpStore, generateOTP, cleanupExpiredOTPs } from "@/lib/otp-store";
import { Resend } from "resend";
import { z } from "zod";

// Check if domain has valid MX records
async function hasMXRecords(domain: string): Promise<boolean> {
    try {
        const records = await dns.resolveMx(domain);
        return records && records.length > 0;
    } catch {
        return false;
    }
}

const SendOtpSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const parsed = SendOtpSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                { message: parsed.error.issues[0]?.message || "Invalid input data" },
                { status: 400 }
            );
        }

        const normalizedEmail = parsed.data.email.trim().toLowerCase();

        // Check disposable email
        if (isDisposableEmail(normalizedEmail)) {
            return NextResponse.json(
                {
                    message:
                        "Disposable email addresses are not allowed. Please use your real email.",
                },
                { status: 400 }
            );
        }

        // Check MX records
        const domain = normalizedEmail.split("@")[1];
        const hasMX = await hasMXRecords(domain);
        if (!hasMX) {
            return NextResponse.json(
                {
                    message:
                        "This email domain doesn't appear to be valid. Please check your email address.",
                },
                { status: 400 }
            );
        }

        // Rate limit: max 1 OTP per email per 60 seconds
        const existing = otpStore.get(normalizedEmail);
        if (existing && Date.now() < existing.expiresAt - 4 * 60 * 1000) {
            return NextResponse.json(
                {
                    message:
                        "An OTP was recently sent. Please wait a minute before requesting a new one.",
                },
                { status: 429 }
            );
        }

        // Generate and store OTP (5-minute expiry)
        const otp = generateOTP();
        otpStore.set(normalizedEmail, {
            otp,
            expiresAt: Date.now() + 5 * 60 * 1000,
        });

        // Cleanup expired entries
        cleanupExpiredOTPs();

        // Send OTP email via Resend
        const resendApiKey = process.env.RESEND_API_KEY;
        if (!resendApiKey) {
            console.warn("Missing RESEND_API_KEY. Using simulation mode.");
            console.log(`[DEV] OTP for ${normalizedEmail}: ${otp}`);
            return NextResponse.json(
                { message: "OTP sent successfully (simulation mode)", dev_otp: process.env.NODE_ENV === "development" ? otp : undefined },
                { status: 200 }
            );
        }

        const resend = new Resend(resendApiKey);

        await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
            to: normalizedEmail,
            subject: "Your Resume Download OTP",
            html: `
                <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; background: #fafafa; border-radius: 12px;">
                    <h2 style="color: #171717; margin-bottom: 8px; font-size: 22px;">Resume Download Verification</h2>
                    <p style="color: #525252; font-size: 15px; line-height: 1.6;">
                        Use the code below to verify your email and download the resume.
                    </p>
                    <div style="background: #171717; color: #ffffff; font-size: 32px; font-weight: bold; letter-spacing: 8px; text-align: center; padding: 20px; border-radius: 8px; margin: 24px 0;">
                        ${otp}
                    </div>
                    <p style="color: #a3a3a3; font-size: 13px; text-align: center;">
                        This code expires in 5 minutes. If you didn't request this, you can safely ignore this email.
                    </p>
                </div>
            `,
        });

        return NextResponse.json(
            { message: "OTP sent successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error sending OTP:", error);
        return NextResponse.json(
            { message: "Failed to send OTP. Please try again." },
            { status: 500 }
        );
    }
}
