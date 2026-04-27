// CTA Button Block Schema - for call-to-action links
import { defineType, defineField } from "sanity";

export default defineType({
    name: "ctaButton",
    title: "Button / CTA",
    type: "object",
    icon: () => "🔗",
    fields: [
        defineField({
            name: "text",
            title: "Button Text",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "url",
            title: "URL",
            type: "url",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "style",
            title: "Style",
            type: "string",
            options: {
                list: [
                    { title: "🟠 Primary (Brand)", value: "primary" },
                    { title: "⚫ Secondary (Dark)", value: "secondary" },
                    { title: "⬜ Outline", value: "outline" },
                ],
                layout: "radio",
            },
            initialValue: "primary",
        }),
    ],
    preview: {
        select: { text: "text", url: "url", style: "style" },
        prepare({ text, url, style }) {
            const icons: Record<string, string> = { primary: "🟠", secondary: "⚫", outline: "⬜" };
            return {
                title: `${icons[style] || "🔗"} ${text}`,
                subtitle: url,
            };
        },
    },
});
