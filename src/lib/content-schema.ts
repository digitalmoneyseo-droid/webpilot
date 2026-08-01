import type { Locale } from "@/lib/i18n";

const palettes = ["violet", "orange", "blue", "green", "ink", "yellow", "coral", "ice"] as const;
const visuals = ["dashboard", "commerce", "assistant", "search", "content", "crm", "brand", "campaign"] as const;

export type Palette = (typeof palettes)[number];
export type Visual = (typeof visuals)[number];

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
  palette: Palette;
  visual: Visual;
}

export interface Faq {
  translationKey: string;
  locale: Locale;
  slug: string;
  order: number;
  question: string;
  answer: string;
}

type JsonRecord = Record<string, unknown>;

function record(value: unknown, source: string): JsonRecord {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error(`Invalid content object in ${source}.`);
  return value as JsonRecord;
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
  if (value !== "de" && value !== "en") throw new Error(`Invalid locale in ${source}.`);
  return value;
}

function stringArrayValue(value: unknown, field: string, source: string): string[] {
  if (!Array.isArray(value) || value.length === 0 || value.some((item) => typeof item !== "string" || !item.trim())) throw new Error(`Invalid ${field} in ${source}.`);
  return value;
}

function enumValue<T extends string>(value: unknown, values: readonly T[], field: string, source: string): T {
  if (typeof value !== "string" || !values.includes(value as T)) throw new Error(`Invalid ${field} in ${source}.`);
  return value as T;
}

export function parseProject(value: unknown, source: string): Project {
  const data = record(value, source);
  return {
    translationKey: stringValue(data.translationKey, "translationKey", source),
    locale: localeValue(data.locale, source),
    slug: slugValue(data.slug, source),
    order: orderValue(data.order, source),
    title: stringValue(data.title, "title", source),
    shortTitle: stringValue(data.shortTitle, "shortTitle", source),
    summary: stringValue(data.summary, "summary", source),
    categories: stringArrayValue(data.categories, "categories", source),
    year: stringValue(data.year, "year", source),
    metric: stringValue(data.metric, "metric", source),
    metricLabel: stringValue(data.metricLabel, "metricLabel", source),
    challenge: stringValue(data.challenge, "challenge", source),
    strategy: stringValue(data.strategy, "strategy", source),
    execution: stringValue(data.execution, "execution", source),
    timeline: stringValue(data.timeline, "timeline", source),
    tools: stringArrayValue(data.tools, "tools", source),
    palette: enumValue(data.palette, palettes, "palette", source),
    visual: enumValue(data.visual, visuals, "visual", source),
  };
}

export function parseFaq(value: unknown, source: string): Faq {
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
