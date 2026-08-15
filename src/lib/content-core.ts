import type { Locale } from "../i18n/config";

export interface Faq {
  translationKey: string;
  locale: Locale;
  slug: string;
  order: number;
  question: string;
  answer: string;
}

interface ContentEntry<T> {
  id: string;
  data: T;
}

type LocalizedEntries<T> = Record<Locale, ContentEntry<T>[]>;

export interface ContentRepository {
  faqs: LocalizedEntries<Faq>;
}

function record(value: unknown, source: string): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error(`Invalid content object in ${source}.`);
  return value as Record<string, unknown>;
}

function stringValue(value: unknown, field: string, source: string): string {
  if (typeof value !== "string" || !value.trim()) throw new Error(`Invalid ${field} in ${source}.`);
  return value;
}

function slugValue(value: unknown, source: string): string {
  const slug = stringValue(value, "slug", source);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error(`Invalid slug in ${source}: ${slug}.`);
  return slug;
}

function orderValue(value: unknown, source: string): number {
  if (typeof value !== "number" || !Number.isInteger(value) || value < 1) throw new Error(`Invalid order in ${source}.`);
  return value;
}

function localeValue(value: unknown, source: string): Locale {
  const locale = stringValue(value, "locale", source);
  if (!/^[a-z]{2}(?:-[A-Z]{2})?$/.test(locale)) throw new Error(`Invalid locale in ${source}.`);
  return locale as Locale;
}

function parseFaq(value: unknown, source: string): Faq {
  const data = record(value, source);
  return {
    translationKey: stringValue(data.translationKey, "translationKey", source),
    locale: localeValue(data.locale, source),
    slug: slugValue(data.slug, source),
    order: orderValue(data.order, source),
    question: stringValue(data.question, "question", source),
    answer: stringValue(data.answer, "answer", source),
  };
}

async function readFaqs(locale: Locale): Promise<ContentEntry<Faq>[]> {
  const directory = `src/content/faqs/${locale}`;
  const files = Array.from(new Bun.Glob("*.json").scanSync({ cwd: directory, onlyFiles: true }));
  const entries = (await Promise.all(files.map(async (file) => {
      const source = `src/content/faqs/${locale}/${file}`;
      const data = parseFaq(await Bun.file(`${directory}/${file}`).json(), source);
      if (data.locale !== locale) throw new Error(`Wrong locale in ${source}.`);
      return { id: file.replace(/\.json$/, ""), data };
    }))).sort((a, b) => a.data.order - b.data.order);

  for (const field of ["translationKey", "slug", "order"] as const) {
    const values = entries.map((entry) => entry.data[field]);
    if (new Set(values).size !== values.length) throw new Error(`Duplicate ${field} in faqs/${locale}.`);
  }
  return entries;
}

function signature(entries: ContentEntry<Faq>[]): string[] {
  return entries.map(({ data }) => `${data.translationKey}|${data.slug}|${data.order}`);
}

export async function loadContentRepository(): Promise<ContentRepository> {
  const config = await Bun.file("src/i18n/config.json").json() as {
    defaultLocale: Locale;
    locales: Record<Locale, unknown>;
  };
  const locales = Object.keys(config.locales) as Locale[];
  const faqs = Object.fromEntries(await Promise.all(
    locales.map(async (locale) => [locale, await readFaqs(locale)] as const),
  )) as LocalizedEntries<Faq>;
  const referenceSignature = JSON.stringify(signature(faqs[config.defaultLocale]));

  for (const locale of locales) {
    if (JSON.stringify(signature(faqs[locale])) !== referenceSignature) {
      throw new Error(`faqs ${config.defaultLocale} and ${locale} entries do not match.`);
    }
  }

  return { faqs };
}
