// Table Block Schema - for test results, comparison data, etc.
import { defineType, defineField } from "sanity";

export default defineType({
    name: "tableBlock",
    title: "Table",
    type: "object",
    icon: () => "📊",
    fields: [
        defineField({
            name: "caption",
            title: "Table Caption (optional)",
            type: "string",
            description: "A title or description for the table",
        }),
        defineField({
            name: "hasHeader",
            title: "First row is header?",
            type: "boolean",
            initialValue: true,
        }),
        defineField({
            name: "rows",
            title: "Rows",
            type: "array",
            of: [
                {
                    type: "object",
                    name: "tableRow",
                    fields: [
                        {
                            name: "cells",
                            title: "Cells",
                            type: "array",
                            of: [{ type: "string" }],
                        },
                    ],
                    preview: {
                        select: { cells: "cells" },
                        prepare(selection) {
                            return {
                                title: selection.cells?.join(" | ") || "Empty row",
                            };
                        },
                    },
                },
            ],
        }),
    ],
    preview: {
        select: { caption: "caption", rows: "rows" },
        prepare({ caption, rows }) {
            const rowCount = rows?.length || 0;
            return {
                title: `📊 ${caption || "Table"}`,
                subtitle: `${rowCount} row${rowCount !== 1 ? "s" : ""}`,
            };
        },
    },
});
