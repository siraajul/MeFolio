// Education Schema
import { defineType, defineField } from "sanity";

export default defineType({
    name: "education",
    title: "Education",
    type: "document",
    fields: [
        defineField({
            name: "universityName",
            title: "University Name",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "degree",
            title: "Degree",
            type: "string",
        }),
        defineField({
            name: "period",
            title: "Period",
            type: "string",
            description: "e.g., 2019 - 2023",
        }),
        defineField({
            name: "location",
            title: "Location",
            type: "string",
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "text",
        }),
        defineField({
            name: "logo",
            title: "University Logo",
            type: "image",
            options: { hotspot: true },
        }),
        defineField({
            name: "order",
            title: "Display Order",
            type: "number",
        }),
    ],
});
