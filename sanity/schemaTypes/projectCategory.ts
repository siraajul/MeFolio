// Project Category Schema (for 3D folder component)
import { defineType, defineField, defineArrayMember } from "sanity";

export default defineType({
    name: "projectCategory",
    title: "Project Category",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Category Title",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "gradient",
            title: "Gradient CSS",
            type: "string",
            description: "e.g., linear-gradient(135deg, #C3E41D, #9BC53D)",
        }),
        defineField({
            name: "order",
            title: "Display Order",
            type: "number",
        }),
        defineField({
            name: "projects",
            title: "Projects",
            type: "array",
            of: [
                defineArrayMember({
                    type: "object",
                    fields: [
                        { name: "title", title: "Project Title", type: "string" },
                        { name: "image", title: "Project Image", type: "image", options: { hotspot: true } },
                        { name: "link", title: "Project Link", type: "url" },
                        { name: "description", title: "Description", type: "text" },
                    ],
                }),
            ],
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
