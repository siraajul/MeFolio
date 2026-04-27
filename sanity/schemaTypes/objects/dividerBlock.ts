// Divider Block Schema - for visual section breaks
import { defineType, defineField } from "sanity";

export default defineType({
    name: "dividerBlock",
    title: "Divider",
    type: "object",
    icon: () => "➗",
    fields: [
        defineField({
            name: "style",
            title: "Style",
            type: "string",
            options: {
                list: [
                    { title: "Simple Line", value: "line" },
                    { title: "Dots", value: "dots" },
                    { title: "Space", value: "space" },
                ],
                layout: "radio",
            },
            initialValue: "line",
        }),
    ],
    preview: {
        select: { style: "style" },
        prepare({ style }) {
            return {
                title: `➗ Divider (${style || "line"})`,
            };
        },
    },
});
