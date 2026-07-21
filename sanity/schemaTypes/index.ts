import { defineArrayMember, defineField, defineType } from "sanity";

const locale = defineField({
  name: "locale",
  title: "Language",
  type: "string",
  options: { list: [{ title: "German", value: "de" }, { title: "English", value: "en" }], layout: "radio" },
  validation: (rule) => rule.required(),
});
const translationKey = defineField({
  name: "translationKey",
  title: "Translation key",
  type: "string",
  description: "Use the same key for the German and English versions.",
  validation: (rule) => rule.required(),
});
const order = defineField({ name: "order", title: "Display order", type: "number", validation: (rule) => rule.required().integer().positive() });
const slug = defineField({
  name: "slug",
  title: "Slug",
  type: "slug",
  options: { source: "title", maxLength: 96 },
  validation: (rule) => rule.required(),
});
const stringList = (name: string, title: string) => defineField({
  name,
  title,
  type: "array",
  of: [defineArrayMember({ type: "string" })],
  validation: (rule) => rule.required().min(1),
});

const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    locale, translationKey, order,
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    slug,
    defineField({ name: "shortTitle", title: "Short title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "summary", title: "Summary", type: "text", rows: 3, validation: (rule) => rule.required() }),
    stringList("categories", "Categories"),
    defineField({ name: "year", title: "Year", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "metric", title: "Result metric", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "metricLabel", title: "Metric label", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "challenge", title: "Challenge", type: "text", rows: 5, validation: (rule) => rule.required() }),
    defineField({ name: "strategy", title: "Strategy", type: "text", rows: 5, validation: (rule) => rule.required() }),
    defineField({ name: "execution", title: "Execution", type: "text", rows: 5, validation: (rule) => rule.required() }),
    defineField({ name: "timeline", title: "Timeline", type: "string", validation: (rule) => rule.required() }),
    stringList("tools", "Tools"),
    defineField({
      name: "palette", title: "Artwork palette", type: "string",
      options: { list: ["violet", "orange", "blue", "green", "ink", "yellow", "coral", "ice"] },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "visual", title: "Artwork type", type: "string",
      options: { list: ["dashboard", "commerce", "assistant", "search", "content", "crm", "brand", "campaign"] },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: { select: { title: "title", subtitle: "locale" } },
});

const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    locale, translationKey, order,
    defineField({
      name: "pillar", title: "Pillar", type: "string",
      options: { list: ["build", "grow", "automate"], layout: "radio" },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    slug,
    defineField({ name: "summary", title: "Summary", type: "text", rows: 4, validation: (rule) => rule.required() }),
    stringList("problems", "Problems"),
    stringList("deliverables", "Deliverables"),
    stringList("outcomes", "Outcomes"),
    stringList("tools", "Tools"),
  ],
  preview: { select: { title: "title", subtitle: "locale" } },
});

const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    locale, translationKey, order,
    defineField({ name: "brand", title: "Brand", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "brand" }, validation: (rule) => rule.required() }),
    defineField({ name: "quote", title: "Quote", type: "text", rows: 5, validation: (rule) => rule.required() }),
    defineField({ name: "attribution", title: "Attribution", type: "string", validation: (rule) => rule.required() }),
  ],
  preview: { select: { title: "brand", subtitle: "attribution" } },
});

const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    locale, translationKey, order,
    defineField({ name: "question", title: "Question", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "question" }, validation: (rule) => rule.required() }),
    defineField({ name: "answer", title: "Answer", type: "text", rows: 5, validation: (rule) => rule.required() }),
  ],
  preview: { select: { title: "question", subtitle: "locale" } },
});

export const schemaTypes = [project, service, testimonial, faq];
