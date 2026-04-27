// Metric/Stats Block Schema - for showcasing key numbers
import { defineType, defineField } from "sanity";

export default defineType({
    name: "metricBlock",
    title: "Metrics / Stats",
    type: "object",
    icon: () => "📈",
    fields: [
        defineField({
            name: "metrics",
            title: "Metrics",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        {
                            name: "value",
                            title: "Value",
                            type: "string",
                            description: "e.g., 95%, 200+, 3x",
                            validation: (Rule: any) => Rule.required(),
                        },
                        {
                            name: "label",
                            title: "Label",
                            type: "string",
                            description: "e.g., Test Coverage, Test Cases, Faster",
                            validation: (Rule: any) => Rule.required(),
                        },
                    ],
                    preview: {
                        select: { value: "value", label: "label" },
                        prepare(selection) {
                            return { title: `${selection.value} — ${selection.label}` };
                        },
                    },
                },
            ],
            validation: (Rule) => Rule.min(1).max(4),
        }),
    ],
    preview: {
        select: { metrics: "metrics" },
        prepare({ metrics }) {
            const count = metrics?.length || 0;
            return {
                title: `📈 ${count} Metric${count !== 1 ? "s" : ""}`,
                subtitle: metrics?.map((m: any) => `${m.value} ${m.label}`).join(" • ") || "",
            };
        },
    },
});
