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
                            options: { source: (_doc: unknown, options?: { parent?: { title?: string } }) => options?.parent?.title || '', maxLength: 96 },
                            validation: (Rule) => Rule.required()
                        },
                        {
                            name: "image",
                            title: "Main Image",
                            type: "image",
                            options: { hotspot: true },
                            fields: [
                                { name: "alt", title: "Alt text", type: "string", description: "For SEO & screen readers. Falls back to the project title if empty." },
                            ],
                        },
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
                            of: [{
                                type: "image",
                                options: { hotspot: true },
                                fields: [
                                    { name: "alt", title: "Alt text", type: "string", description: "For SEO & screen readers." },
                                ],
                            }]
                        },
                        {
                            name: "description",
                            title: "Short Description",
                            type: "text",
                            rows: 3,
                            description: "Used as the meta description in search/social results. Aim for 120–160 characters.",
                            validation: (Rule) => Rule.required().max(200),
                        },
                        {
                            name: "isImpactDriven",
                            title: "Use Impact-Driven Layout?",
                            type: "boolean",
                            description: "Toggle this on to render the Problem -> Strategy -> Impact case study layout.",
                            initialValue: false,
                        },
                        {
                            name: "problem",
                            title: "The Problem",
                            type: "text",
                            rows: 3,
                            hidden: ({ parent }) => !parent?.isImpactDriven
                        },
                        {
                            name: "strategy",
                            title: "The Strategy",
                            type: "array",
                            of: [{ type: "string" }],
                            description: "List of strategic steps taken (e.g., 'Architected a POM framework')",
                            hidden: ({ parent }) => !parent?.isImpactDriven
                        },
                        {
                            name: "impact",
                            title: "The Impact",
                            type: "text",
                            rows: 3,
                            hidden: ({ parent }) => !parent?.isImpactDriven
                        },
                        {
                            name: "metrics",
                            title: "Impact Metrics",
                            type: "array",
                            hidden: ({ parent }) => !parent?.isImpactDriven,
                            of: [{
                                type: "object",
                                fields: [
                                    { name: "label", type: "string", title: "Metric Label (e.g. Test Time)" },
                                    { name: "value", type: "string", title: "Metric Value (e.g. 72hrs → 15m)" },
                                    { name: "icon", type: "string", title: "Icon Name", options: { list: ["TrendingDown", "BugOff", "Zap", "ShieldCheck", "Clock"] } }
                                ]
                            }]
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
                                },
                                {
                                    type: "code",
                                },
                                { type: "callout" },
                                { type: "youtubeEmbed" },
                                { type: "metricBlock" },
                                { type: "dividerBlock" },
                                { type: "ctaButton" },
                                { type: "fileDownload" },
                                { type: "tableBlock" },
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
