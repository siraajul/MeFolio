// Callout/Alert Block Schema - for tips, warnings, notes, caution boxes
import { defineType, defineField } from "sanity";

export default defineType({
    name: "callout",
    title: "Callout / Alert",
    type: "object",
    icon: () => "📢",
    fields: [
        defineField({
            name: "style",
            title: "Style",
            type: "string",
            options: {
                list: [
                    { title: "💡 Tip", value: "tip" },
                    { title: "📝 Note", value: "note" },
                    { title: "⚠️ Warning", value: "warning" },
                    { title: "🚨 Caution", value: "caution" },
                    { title: "✅ Success", value: "success" },
                ],
                layout: "radio",
            },
            initialValue: "note",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "title",
            title: "Title (optional)",
            type: "string",
        }),
        defineField({
            name: "body",
            title: "Content",
            type: "text",
            rows: 3,
            validation: (Rule) => Rule.required(),
        }),
    ],
    preview: {
        select: { style: "style", title: "title", body: "body" },
        prepare({ style, title, body }) {
            const icons: Record<string, string> = { tip: "💡", note: "📝", warning: "⚠️", caution: "🚨", success: "✅" };
            return {
                title: `${icons[style] || "📢"} ${title || style?.charAt(0).toUpperCase() + style?.slice(1) || "Callout"}`,
                subtitle: body?.slice(0, 60) + (body?.length > 60 ? "..." : ""),
            };
        },
    },
});
