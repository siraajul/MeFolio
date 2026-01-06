// Certification Schema
import { defineType, defineField } from "sanity";

export default defineType({
    name: "certification",
    title: "Certification",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Certification Title",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "providerImage",
            title: "Provider Logo",
            type: "image",
            options: { hotspot: true },
        }),
        defineField({
            name: "providerName",
            title: "Provider Name",
            type: "string",
            description: "e.g., Udemy, Coursera, AWS",
        }),
        defineField({
            name: "skills",
            title: "Skills Acquired",
            type: "array",
            of: [{ type: "string" }],
        }),
        defineField({
            name: "level",
            title: "Level/Type",
            type: "string",
            description: "e.g., Foundation Level (CTFL)",
        }),
        defineField({
            name: "year",
            title: "Year Obtained",
            type: "string",
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "text",
        }),
        defineField({
            name: "order",
            title: "Display Order",
            type: "number",
        }),
    ],
    orderings: [
        {
            title: "Year (Newest First)",
            name: "yearDesc",
            by: [{ field: "year", direction: "desc" }],
        },
    ],
});
