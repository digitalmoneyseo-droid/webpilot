import "server-only";
import type { Locale } from "@/lib/i18n";
import { loadContentRepository, type Faq } from "@/lib/content-core.mjs";

export type { Faq } from "@/lib/content-core.mjs";

export interface ContentEntry<T> { id: string; data: T }
const content = loadContentRepository(process.cwd());

export function getFaqs(locale: Locale): ContentEntry<Faq>[] { return content.faqs[locale]; }
export function getSolutionFaqs(locale: Locale): ContentEntry<Faq>[] { return content.solutionFaqs[locale]; }
