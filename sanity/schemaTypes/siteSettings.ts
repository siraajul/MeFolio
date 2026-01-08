// Site Settings Schema - Singleton for global site info
import { defineType, defineField } from "sanity";

export default defineType({
    name: "siteSettings",
    title: "Site Settings",
    type: "document",
    fields: [
        defineField({
            name: "firstName",
            title: "First Name",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "lastName",
            title: "Last Name",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "profileImage",
            title: "Profile Image",
            type: "image",
            options: { hotspot: true },
        }),
        defineField({
            name: "tagline",
            title: "Tagline",
            type: "string",
            description: "Short description shown in the Hero section",
        }),
        defineField({
            name: "brandDescription",
            title: "Brand Description",
            type: "text",
            description: "Used in the footer",
        }),
        defineField({
            name: "socialLinks",
            title: "Social Links",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        { name: "platform", title: "Platform", type: "string" },
                        { name: "url", title: "URL", type: "url" },
                    ],
                },
            ],
        }),
        defineField({
            name: "resumeFile",
            title: "Resume PDF",
            type: "file",
        }),
        defineField({
            name: "ogImage",
            title: "Open Graph Image (Social Share)",
            type: "image",
            description: "Recommended size: 1200x630px. Shown when sharing link on social media.",
            options: { hotspot: true },
        }),
        defineField({
            name: "cvVideo",
            title: "Video CV URL",
            type: "url",
            description: "Direct link to your video CV (mp4, webm, or hosted link)",
        }),
        defineField({
            name: "phoneNumber",
            title: "Phone Number",
            type: "string",
            description: "Your contact phone number (e.g., +1 555-0123)",
        }),
        defineField({
            name: "email",
            title: "Email Address",
            type: "string",
            description: "Your contact email address",
            validation: (Rule) => Rule.email(),
        }),
    ],
});
