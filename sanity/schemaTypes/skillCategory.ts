// Skill Category Schema
import { defineType, defineField } from "sanity";

export default defineType({
    name: "skillCategory",
    title: "Skill Category",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Category Title",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "order",
            title: "Display Order",
            type: "number",
        }),
        defineField({
            name: "skills",
            title: "Skills",
            type: "array",
            of: [{ type: "string" }],
        }),
    ],
    orderings: [
        {
            title: "Display Order",
            name: "orderAsc",
            by: [{ field: "order", direction: "asc" }],
        },
    ],
});
