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
                        {
                            name: "slug",
                            title: "Slug",
                            type: "slug",
                            options: { source: (doc: any, options: any) => options.parent?.title, maxLength: 96 },
                            validation: (Rule) => Rule.required()
                        },
                        { name: "image", title: "Main Image", type: "image", options: { hotspot: true } },
                        { name: "link", title: "Live Link", type: "url" },
                        { name: "githubLink", title: "GitHub Repo", type: "url" },
                        {
                            name: "techStack",
                            title: "Tech Stack",
                            type: "array",
                            of: [{ type: "string" }]
                        },
                        {
                            name: "gallery",
                            title: "Image Gallery",
                            type: "array",
                            of: [{ type: "image", options: { hotspot: true } }]
                        },
                        {
                            name: "description",
                            title: "Short Description",
                            type: "text",
                            rows: 3
                        },
                        {
                            name: "content",
                            title: "Case Study Content (Problem, Solution, Results)",
                            type: "array",
                            of: [
                                { type: "block" },
                                {
                                    type: "image",
                                    fields: [
                                        {
                                            name: 'caption',
                                            type: 'string',
                                            title: 'Caption',
                                        },
                                        {
                                            name: 'alt',
                                            type: 'string',
                                            title: 'Alternative text',
                                        }
                                    ]
                                }
                            ]
                        }
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
