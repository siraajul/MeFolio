// Blog Post Schema
import { defineType, defineField } from "sanity";

export default defineType({
    name: "post",
    title: "Blog Post",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: { source: "title", maxLength: 96 },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "summary",
            title: "Summary",
            type: "text",
            rows: 3,
        }),
        defineField({
            name: "image",
            title: "Featured Image",
            type: "image",
            options: { hotspot: true },
        }),
        defineField({
            name: "externalLink",
            title: "External Link",
            type: "url",
            description: "If the post is hosted externally (e.g., Medium)",
        }),
        defineField({
            name: "content",
            title: "Content",
            type: "array",
            of: [
                { type: "block" },
                {
                    type: "image",
                    options: { hotspot: true },
                },
                {
                    type: "code",
                },
            ],
        }),
        defineField({
            name: "publishedAt",
            title: "Published At",
            type: "datetime",
        }),
    ],
    orderings: [
        {
            title: "Published Date (Newest First)",
            name: "publishedAtDesc",
            by: [{ field: "publishedAt", direction: "desc" }],
        },
    ],
    preview: {
        select: {
            title: "title",
            media: "image",
            date: "publishedAt",
        },
        prepare({ title, media, date }) {
            return {
                title,
                media,
                subtitle: date ? new Date(date).toLocaleDateString() : "Draft",
            };
        },
    },
});
