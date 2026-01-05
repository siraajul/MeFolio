// Experience Schema
import { defineType, defineField, defineArrayMember } from "sanity";

export default defineType({
    name: "experience",
    title: "Work Experience",
    type: "document",
    fields: [
        defineField({
            name: "companyName",
            title: "Company Name",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "companyLogo",
            title: "Company Logo",
            type: "image",
            options: { hotspot: true },
        }),
        defineField({
            name: "isCurrentEmployer",
            title: "Current Employer?",
            type: "boolean",
            initialValue: false,
        }),
        defineField({
            name: "order",
            title: "Display Order",
            type: "number",
            description: "Lower numbers appear first",
        }),
        defineField({
            name: "positions",
            title: "Positions",
            type: "array",
            of: [
                defineArrayMember({
                    type: "object",
                    fields: [
                        { name: "title", title: "Job Title", type: "string" },
                        { name: "employmentPeriod", title: "Employment Period", type: "string" },
                        { name: "employmentType", title: "Employment Type", type: "string" },
                        { name: "description", title: "Description", type: "text" },
                        {
                            name: "skills",
                            title: "Skills Used",
                            type: "array",
                            of: [{ type: "string" }],
                        },
                        { name: "isExpanded", title: "Expanded by Default", type: "boolean" },
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
