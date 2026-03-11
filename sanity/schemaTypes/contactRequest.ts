import { defineField, defineType } from "sanity";

export default defineType({
  name: "contactRequest",
  title: "Contact Requests",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "company",
      title: "Company",
      type: "string",
    }),
    defineField({
      name: "projectType",
      title: "Project Type",
      type: "string",
    }),
    defineField({
      name: "platform",
      title: "Platform",
      type: "string",
    }),
    defineField({
      name: "testingTypes",
      title: "Testing Types Required",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "automationFramework",
      title: "Preferred Automation Framework",
      type: "string",
    }),
    defineField({
      name: "ciCdTools",
      title: "CI/CD & Management Tools",
      type: "text",
    }),
    defineField({
      name: "timeline",
      title: "Timeline",
      type: "string",
    }),
    defineField({
      name: "budget",
      title: "Budget Range",
      type: "string",
    }),
    defineField({
      name: "additionalInfo",
      title: "Additional Information",
      type: "text",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "email",
    },
  },
});
