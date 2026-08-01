import fs from "node:fs";
import path from "node:path";
import type { Locale } from "@/lib/i18n";
import { parseFaq, parseProject, type Faq, type Project } from "@/lib/content-schema";

export type { Faq, Project } from "@/lib/content-schema";

export interface ContentEntry<T> {
  id: string;
  data: T;
}

export type ProjectEntry = ContentEntry<Project>;

function readCollection<T>(collection: "projects" | "faqs" | "faq-solutions", locale: Locale, parse: (value: unknown, source: string) => T): ContentEntry<T>[] {
  const directory = path.resolve(process.cwd(), "src", "content", collection, locale);
  return fs.readdirSync(directory)
    .filter((file) => file.endsWith(".json"))
    .map((file) => ({
      id: file.replace(/\.json$/, ""),
      data: parse(JSON.parse(fs.readFileSync(path.join(directory, file), "utf8")) as unknown, path.join(collection, locale, file)),
    }))
    .sort((a, b) => ((a.data as { order: number }).order - (b.data as { order: number }).order));
}

export function getProjects(locale: Locale): ProjectEntry[] {
  return readCollection("projects", locale, parseProject);
}

export function getFaqs(locale: Locale): ContentEntry<Faq>[] {
  return readCollection("faqs", locale, parseFaq);
}

export function getSolutionFaqs(locale: Locale): ContentEntry<Faq>[] {
  return readCollection("faq-solutions", locale, parseFaq);
}
