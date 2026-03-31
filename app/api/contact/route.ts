import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import { z } from "zod";
import { checkRateLimit, rateLimits } from "@/lib/rate-limit";

const ContactSchema = z.object({
    name: z.string().min(1, "Name is required").max(100).trim(),
    email: z.string().email("Invalid email address").max(254).trim().toLowerCase(),
    company: z.string().max(100).trim().optional(),
    projectType: z.string().max(100).optional(),
    platform: z.string().max(100).optional(),
    testingTypes: z.array(z.string()).optional(),
    automationFramework: z.array(z.string()).optional(),
    ciCdTools: z.array(z.string()).optional(),
    timeline: z.string().max(50).optional(),
    budget: z.string().max(50).optional(),
    additionalInfo: z.string().max(2000).trim().optional(),
});

export async function POST(req: Request) {
    try {
        // Get IP address with proper header handling
        const forwardedFor = req.headers.get("x-forwarded-for");
        const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "unknown-ip";

        // Apply daily rate limit per IP
        const rateLimitResult = await checkRateLimit(ip, {
            ...rateLimits.daily,
            keyPrefix: "contact",
        });

        if (!rateLimitResult.success) {
            return NextResponse.json(
                { message: "Too many requests. Please try again tomorrow." },
                {
                    status: 429,
                    headers: {
                        "X-RateLimit-Limit": rateLimitResult.limit.toString(),
                        "X-RateLimit-Remaining": "0",
                        "X-RateLimit-Reset": Math.ceil(rateLimitResult.resetAt / 1000).toString(),
                    },
                }
            );
        }

        const body = await req.json();
        const parsed = ContactSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                { message: "Invalid input data", errors: parsed.error.format() },
                { status: 400 }
            );
        }

        const {
            name,
            email,
            company,
            projectType,
            platform,
            testingTypes,
            automationFramework,
            ciCdTools,
            timeline,
            budget,
            additionalInfo,
        } = parsed.data;

        const token = process.env.SANITY_API_TOKEN;

        if (!token) {
            console.warn("Missing SANITY_API_TOKEN. Skipping Sanity write.");
            return NextResponse.json(
                { message: "Form submitted successfully (simulation)" },
                { status: 200 }
            );
        }

        // Use the token for write operations
        const writeClient = client.withConfig({ token });

        await writeClient.create({
            _type: "contactRequest",
            name,
            email,
            company,
            projectType,
            platform,
            testingTypes,
            automationFramework,
            ciCdTools,
            timeline,
            budget,
            additionalInfo,
        });

        return NextResponse.json(
            { message: "QA Consultation requested successfully" },
            {
                status: 200,
                headers: {
                    "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
                },
            }
        );
    } catch (error) {
        console.error("Error submitting QA request:", error);
        return NextResponse.json(
            { message: "Error submitting QA request" },
            { status: 500 }
        );
    }
}
