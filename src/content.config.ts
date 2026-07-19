import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { locales, servicePillarIds } from "./domain/catalog";

const locale = z.enum(locales);
const localized = {
  translationKey: z.string().min(1),
  locale,
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
};

const entryId = ({ entry }: { entry: string }) => entry.replace(/\.(json|mdx)$/, "");

const projects = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/projects", generateId: entryId }),
  schema: z.object({
    ...localized,
    order: z.number().int().positive(),
    title: z.string(),
    shortTitle: z.string(),
    summary: z.string(),
    categories: z.array(z.string()).min(1),
    year: z.string(),
    metric: z.string(),
    metricLabel: z.string(),
    challenge: z.string(),
    strategy: z.string(),
    execution: z.string(),
    timeline: z.string(),
    tools: z.array(z.string()).min(1),
    palette: z.enum(["violet", "orange", "blue", "green", "ink", "yellow", "coral", "ice"]),
    visual: z.enum(["dashboard", "commerce", "assistant", "search", "content", "crm", "brand", "campaign"]),
  }),
});

const services = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/services", generateId: entryId }),
  schema: z.object({
    ...localized,
    order: z.number().int().positive(),
    pillar: z.enum(servicePillarIds),
    title: z.string(),
    eyebrow: z.string(),
    summary: z.string(),
    problems: z.array(z.string()).min(1),
    deliverables: z.array(z.string()).min(1),
    outcomes: z.array(z.string()).min(1),
    tools: z.array(z.string()).min(1),
  }),
});

const team = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/team", generateId: entryId }),
  schema: z.object({
    ...localized,
    order: z.number().int().positive(),
    name: z.string(),
    role: z.string(),
    initials: z.string().min(2).max(3),
  }),
});

const testimonials = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/testimonials", generateId: entryId }),
  schema: z.object({
    ...localized,
    order: z.number().int().positive(),
    brand: z.string(),
    quote: z.string(),
    attribution: z.string(),
  }),
});

const faqs = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/faqs", generateId: entryId }),
  schema: z.object({
    ...localized,
    order: z.number().int().positive(),
    question: z.string(),
    answer: z.string(),
  }),
});

export const collections = { projects, services, team, testimonials, faqs };
