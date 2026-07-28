import fs from "node:fs";
import path from "node:path";
import type { Locale } from "@/lib/i18n";

export interface Project {
  translationKey: string;
  locale: Locale;
  slug: string;
  order: number;
  title: string;
  shortTitle: string;
  summary: string;
  categories: string[];
  year: string;
  metric: string;
  metricLabel: string;
  challenge: string;
  strategy: string;
  execution: string;
  timeline: string;
  tools: string[];
  palette: "violet" | "orange" | "blue" | "green" | "ink" | "yellow" | "coral" | "ice";
  visual: "dashboard" | "commerce" | "assistant" | "search" | "content" | "crm" | "brand" | "campaign";
}

export interface Faq {
  translationKey: string;
  locale: Locale;
  slug: string;
  order: number;
  question: string;
  answer: string;
}

export interface ContentEntry<T> {
  id: string;
  data: T;
}

export type ProjectEntry = ContentEntry<Project>;

function readCollection<T>(collection: "projects" | "faqs", locale: Locale): ContentEntry<T>[] {
  const directory = path.resolve(process.cwd(), "..", "src", "content", collection, locale);
  return fs.readdirSync(directory)
    .filter((file) => file.endsWith(".json"))
    .map((file) => ({
      id: file.replace(/\.json$/, ""),
      data: JSON.parse(fs.readFileSync(path.join(directory, file), "utf8")) as T,
    }))
    .sort((a, b) => ((a.data as { order: number }).order - (b.data as { order: number }).order));
}

export function getProjects(locale: Locale): ProjectEntry[] {
  return readCollection<Project>("projects", locale);
}

export function getFaqs(locale: Locale): ContentEntry<Faq>[] {
  return readCollection<Faq>("faqs", locale);
}
