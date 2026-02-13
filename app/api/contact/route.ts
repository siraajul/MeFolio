import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, company } = body;

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
            _type: "lead",
            name,
            email,
            company,
            downloadedAt: new Date().toISOString(),
        });

        return NextResponse.json(
            { message: "Form submitted and lead saved" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error submitting form:", error);
        return NextResponse.json(
            { message: "Error submitting form" },
            { status: 500 }
        );
    }
}
