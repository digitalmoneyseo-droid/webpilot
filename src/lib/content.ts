import { getCollection, type CollectionEntry } from "astro:content";
import type { Locale } from "@/lib/i18n";
import { contentCollectionNames } from "@/domain/catalog";

type CollectionName = (typeof contentCollectionNames)[number];

async function localizedCollection<TName extends CollectionName>(name: TName, locale: Locale) {
  const entries = await getCollection(name, ({ data }) => data.locale === locale);
  return entries.sort((a, b) => a.data.order - b.data.order);
}

export const getProjects = (locale: Locale) => localizedCollection("projects", locale);
export const getServices = (locale: Locale) => localizedCollection("services", locale);
export const getTeam = (locale: Locale) => localizedCollection("team", locale);
export const getTestimonials = (locale: Locale) => localizedCollection("testimonials", locale);
export const getFaqs = (locale: Locale) => localizedCollection("faqs", locale);

export async function getProject(locale: Locale, slug: string) {
  return (await getProjects(locale)).find((entry) => entry.data.slug === slug);
}

export async function getService(locale: Locale, slug: string) {
  return (await getServices(locale)).find((entry) => entry.data.slug === slug);
}

export type ProjectEntry = CollectionEntry<"projects">;
export type ServiceEntry = CollectionEntry<"services">;
