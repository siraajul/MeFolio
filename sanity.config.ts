import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { codeInput } from "@sanity/code-input";
import { schemaTypes } from "./sanity/schemaTypes/index";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

export default defineConfig({
    name: "mefolio",
    title: "MeFolio CMS",

    projectId,
    dataset,
    basePath: "/studio",

    plugins: [structureTool(), visionTool(), codeInput()],

    schema: {
        types: schemaTypes,
    },
});
