import "server-only";
import { locales, type Locale } from "@/lib/i18n";
import { loadContentRepository, type Faq } from "@/lib/content-core.mjs";

export type { Faq } from "@/lib/content-core.mjs";

export interface ContentEntry<T> { id: string; data: T }
const content = loadContentRepository(process.cwd());

export function getFaqs(locale: Locale): ContentEntry<Faq>[] {
  const faqs = content.faqs[locale];
  if (!faqs || !locales.includes(locale)) throw new Error(`FAQ content is unavailable for locale: ${locale}.`);
  return faqs;
}
