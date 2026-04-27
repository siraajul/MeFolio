// File Download Block Schema - for sharing reports, PDFs, collections
import { defineType, defineField } from "sanity";

export default defineType({
    name: "fileDownload",
    title: "File Download",
    type: "object",
    icon: () => "📁",
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "description",
            title: "Description (optional)",
            type: "string",
        }),
        defineField({
            name: "file",
            title: "File",
            type: "file",
            validation: (Rule) => Rule.required(),
        }),
    ],
    preview: {
        select: { title: "title", description: "description" },
        prepare({ title, description }) {
            return {
                title: `📁 ${title}`,
                subtitle: description || "Downloadable file",
            };
        },
    },
});
