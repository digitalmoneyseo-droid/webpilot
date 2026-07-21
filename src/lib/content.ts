import { createClient } from "@sanity/client";
import { z } from "astro/zod";
import { locales, servicePillarIds } from "@/domain/catalog";
import type { Locale } from "@/lib/i18n";

const localizedFields = {
  translationKey: z.string().min(1),
  locale: z.enum(locales),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  order: z.number().int().positive(),
};

const projectSchema = z.object({
  ...localizedFields,
  title: z.string(), shortTitle: z.string(), summary: z.string(), categories: z.array(z.string()).min(1),
  year: z.string(), metric: z.string(), metricLabel: z.string(), challenge: z.string(), strategy: z.string(), execution: z.string(),
  timeline: z.string(), tools: z.array(z.string()).min(1),
  palette: z.enum(["violet", "orange", "blue", "green", "ink", "yellow", "coral", "ice"]),
  visual: z.enum(["dashboard", "commerce", "assistant", "search", "content", "crm", "brand", "campaign"]),
});
const serviceSchema = z.object({
  ...localizedFields,
  pillar: z.enum(servicePillarIds), title: z.string(), summary: z.string(),
  problems: z.array(z.string()).min(1), deliverables: z.array(z.string()).min(1), outcomes: z.array(z.string()).min(1), tools: z.array(z.string()).min(1),
});
const testimonialSchema = z.object({ ...localizedFields, brand: z.string(), quote: z.string(), attribution: z.string() });
const faqSchema = z.object({ ...localizedFields, question: z.string(), answer: z.string() });

export type Project = z.infer<typeof projectSchema>;
export type Service = z.infer<typeof serviceSchema>;
export type Testimonial = z.infer<typeof testimonialSchema>;
export type Faq = z.infer<typeof faqSchema>;
export interface ContentEntry<T> { id: string; data: T; }
export type ProjectEntry = ContentEntry<Project>;
export type ServiceEntry = ContentEntry<Service>;

const schemas = { projects: projectSchema, services: serviceSchema, testimonials: testimonialSchema, faqs: faqSchema } as const;
type CollectionName = keyof typeof schemas;
type CollectionData<TName extends CollectionName> = z.infer<(typeof schemas)[TName]>;

const fallbackModules = import.meta.glob<unknown>([
  "../content/projects/**/*.json",
  "../content/services/**/*.json",
  "../content/testimonials/**/*.json",
  "../content/faqs/**/*.json",
], { eager: true, import: "default" });

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID?.trim();
const dataset = import.meta.env.PUBLIC_SANITY_DATASET?.trim();
const token = import.meta.env.SANITY_READ_TOKEN?.trim();
if (Boolean(projectId) !== Boolean(dataset)) throw new Error("PUBLIC_SANITY_PROJECT_ID and PUBLIC_SANITY_DATASET must be configured together.");

const sanity = projectId && dataset ? createClient({
  projectId,
  dataset,
  apiVersion: import.meta.env.SANITY_API_VERSION || "2026-07-01",
  perspective: "published",
  useCdn: !token,
  ...(token ? { token } : {}),
}) : null;

function fallbackCollection<TName extends CollectionName>(name: TName, locale: Locale): ContentEntry<CollectionData<TName>>[] {
  return Object.entries(fallbackModules)
    .filter(([path]) => path.includes(`/content/${name}/${locale}/`))
    .map(([path, value]) => {
      const data = schemas[name].parse(value) as CollectionData<TName>;
      return { id: path.split("/").at(-1)?.replace(/\.json$/, "") ?? data.slug, data };
    })
    .sort((a, b) => a.data.order - b.data.order);
}

function validateCollection<TName extends CollectionName>(name: TName, locale: Locale, entries: ContentEntry<CollectionData<TName>>[]) {
  if (!entries.length) throw new Error(`No published ${name} found for locale ${locale}.`);
  for (const field of ["slug", "order", "translationKey"] as const) {
    const values = entries.map(({ data }) => data[field]);
    if (new Set(values).size !== values.length) throw new Error(`Duplicate ${field} in ${name} for locale ${locale}.`);
  }
  return entries;
}

async function localizedCollection<TName extends CollectionName>(name: TName, locale: Locale): Promise<ContentEntry<CollectionData<TName>>[]> {
  if (!sanity) return validateCollection(name, locale, fallbackCollection(name, locale));
  const documents = await sanity.fetch<Array<Record<string, unknown>>>(
    `*[_type == $type && locale == $locale] | order(order asc) {..., "slug": slug.current}`,
    { type: name.slice(0, -1), locale },
  );
  const entries = documents.map((document) => ({
    id: String(document._id),
    data: schemas[name].parse(document) as CollectionData<TName>,
  }));
  return validateCollection(name, locale, entries);
}

export const getProjects = (locale: Locale) => localizedCollection("projects", locale);
export const getServices = (locale: Locale) => localizedCollection("services", locale);
export const getTestimonials = (locale: Locale) => localizedCollection("testimonials", locale);
export const getFaqs = (locale: Locale) => localizedCollection("faqs", locale);

export async function getProject(locale: Locale, slug: string) {
  return (await getProjects(locale)).find((entry) => entry.data.slug === slug);
}

export async function getService(locale: Locale, slug: string) {
  return (await getServices(locale)).find((entry) => entry.data.slug === slug);
}
