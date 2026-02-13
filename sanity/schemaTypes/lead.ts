import { defineField, defineType } from "sanity";

export default defineType({
    name: "lead",
    title: "Lead",
    type: "document",
    fields: [
        defineField({
            name: "name",
            title: "Name",
            type: "string",
        }),
        defineField({
            name: "email",
            title: "Email",
            type: "string",
        }),
        defineField({
            name: "company",
            title: "Company Name",
            type: "string",
        }),
        defineField({
            name: "downloadedAt",
            title: "Downloaded At",
            type: "datetime",
        }),
    ],
    preview: {
        select: {
            title: "name",
            subtitle: "company",
        },
        prepare(selection) {
            const { title, subtitle } = selection;
            return {
                title: title,
                subtitle: subtitle || "No Company",
            };
        },
    },
});
