import "server-only";
import type { Locale } from "@/lib/i18n";
import { loadContentRepository, type Faq, type Project } from "@/lib/content-core.mjs";

export type { Faq, Project } from "@/lib/content-core.mjs";

export interface ContentEntry<T> { id: string; data: T }
export type ProjectEntry = ContentEntry<Project>;

const content = loadContentRepository(process.cwd());

export function getProjects(locale: Locale): ProjectEntry[] { return content.projects[locale]; }
export function getFaqs(locale: Locale): ContentEntry<Faq>[] { return content.faqs[locale]; }
export function getSolutionFaqs(locale: Locale): ContentEntry<Faq>[] { return content.solutionFaqs[locale]; }
