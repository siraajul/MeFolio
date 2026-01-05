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
    ],
});
