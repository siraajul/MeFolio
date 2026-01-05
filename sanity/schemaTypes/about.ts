// About Content Schema
import { defineType, defineField } from "sanity";

export default defineType({
    name: "about",
    title: "About Content",
    type: "document",
    fields: [
        defineField({
            name: "content",
            title: "About Content",
            type: "array",
            of: [{ type: "block" }],
            description: "Rich text content for the About section",
        }),
    ],
});
