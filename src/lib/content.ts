import "server-only";
import { locales, type Locale } from "@/lib/i18n";
import { loadContentRepository, type Faq } from "@/lib/content-core";

export type { Faq } from "@/lib/content-core";

export interface ContentEntry<T> { id: string; data: T }
const content = loadContentRepository();

export async function getFaqs(locale: Locale): Promise<ContentEntry<Faq>[]> {
  const faqs = (await content).faqs[locale];
  if (!faqs || !locales.includes(locale)) throw new Error(`FAQ content is unavailable for locale: ${locale}.`);
  return faqs;
}
