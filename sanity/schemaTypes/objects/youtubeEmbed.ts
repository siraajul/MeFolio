// YouTube Embed Schema
import { defineType, defineField } from "sanity";

export default defineType({
    name: "youtubeEmbed",
    title: "YouTube Video",
    type: "object",
    icon: () => "🎬",
    fields: [
        defineField({
            name: "url",
            title: "YouTube URL",
            type: "url",
            description: "Paste the full YouTube video URL (e.g., https://www.youtube.com/watch?v=...)",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "caption",
            title: "Caption (optional)",
            type: "string",
        }),
    ],
    preview: {
        select: { url: "url", caption: "caption" },
        prepare({ url, caption }) {
            return {
                title: `🎬 ${caption || "YouTube Video"}`,
                subtitle: url,
            };
        },
    },
});
