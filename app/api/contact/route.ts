import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import { z } from "zod";

const ContactSchema = z.object({
    name: z.string().min(1, "Name is required").max(100),
    email: z.string().email("Invalid email address"),
    company: z.string().max(100).optional(),
    projectType: z.string().max(100).optional(),
    platform: z.string().max(100).optional(),
    testingTypes: z.array(z.string()).optional(),
    automationFramework: z.array(z.string()).optional(),
    ciCdTools: z.array(z.string()).optional(),
    timeline: z.string().max(50).optional(),
    budget: z.string().max(50).optional(),
    additionalInfo: z.string().max(2000).optional(),
});

export async function POST(req: Request) {
    try {
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
            { status: 200 }
        );
    } catch (error) {
        console.error("Error submitting QA request:", error);
        return NextResponse.json(
            { message: "Error submitting QA request" },
            { status: 500 }
        );
    }
}
