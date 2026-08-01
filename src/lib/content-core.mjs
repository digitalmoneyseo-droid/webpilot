import fs from "node:fs";
import path from "node:path";
import { parseProjectCategories } from "./portfolio-taxonomy.mjs";

const palettes = ["violet", "orange", "blue", "green", "ink", "yellow", "coral", "ice"];
const visuals = ["dashboard", "commerce", "assistant", "search", "content", "crm", "brand", "campaign"];
const collections = ["projects", "faqs", "faq-solutions"];
const locales = ["de", "en"];

function record(value, source) {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error(`Invalid content object in ${source}.`);
  return value;
}

function stringValue(value, field, source) {
  if (typeof value !== "string" || !value.trim()) throw new Error(`Invalid ${field} in ${source}.`);
  return value;
}

function slugValue(value, source) {
  const slug = stringValue(value, "slug", source);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error(`Invalid slug in ${source}: ${slug}.`);
  return slug;
}

function orderValue(value, source) {
  if (typeof value !== "number" || !Number.isInteger(value) || value < 1) throw new Error(`Invalid order in ${source}.`);
  return value;
}

function localeValue(value, source) {
  if (!locales.includes(value)) throw new Error(`Invalid locale in ${source}.`);
  return value;
}

function stringArrayValue(value, field, source) {
  if (!Array.isArray(value) || value.length === 0 || value.some((item) => typeof item !== "string" || !item.trim())) throw new Error(`Invalid ${field} in ${source}.`);
  return value;
}

function enumValue(value, values, field, source) {
  if (typeof value !== "string" || !values.includes(value)) throw new Error(`Invalid ${field} in ${source}.`);
  return value;
}

export function parseProject(value, source) {
  const data = record(value, source);
  return {
    translationKey: stringValue(data.translationKey, "translationKey", source),
    locale: localeValue(data.locale, source), slug: slugValue(data.slug, source), order: orderValue(data.order, source),
    title: stringValue(data.title, "title", source), shortTitle: stringValue(data.shortTitle, "shortTitle", source),
    summary: stringValue(data.summary, "summary", source), categories: parseProjectCategories(data.categories, source),
    year: stringValue(data.year, "year", source), metric: stringValue(data.metric, "metric", source), metricLabel: stringValue(data.metricLabel, "metricLabel", source),
    challenge: stringValue(data.challenge, "challenge", source), strategy: stringValue(data.strategy, "strategy", source), execution: stringValue(data.execution, "execution", source),
    timeline: stringValue(data.timeline, "timeline", source), tools: stringArrayValue(data.tools, "tools", source),
    palette: enumValue(data.palette, palettes, "palette", source), visual: enumValue(data.visual, visuals, "visual", source),
  };
}

export function parseFaq(value, source) {
  const data = record(value, source);
  return {
    translationKey: stringValue(data.translationKey, "translationKey", source), locale: localeValue(data.locale, source),
    slug: slugValue(data.slug, source), order: orderValue(data.order, source),
    question: stringValue(data.question, "question", source), answer: stringValue(data.answer, "answer", source),
  };
}

function readCollection(root, collection, locale) {
  const directory = path.join(root, "src", "content", collection, locale);
  const parse = collection === "projects" ? parseProject : parseFaq;
  const entries = fs.readdirSync(directory).filter((file) => file.endsWith(".json")).map((file) => {
    const source = path.join("src", "content", collection, locale, file);
    const data = parse(JSON.parse(fs.readFileSync(path.join(directory, file), "utf8")), source);
    if (data.locale !== locale) throw new Error(`Wrong locale in ${source}.`);
    return { id: file.replace(/\.json$/, ""), data };
  }).sort((a, b) => a.data.order - b.data.order);

  for (const field of ["translationKey", "slug", "order"]) {
    const values = entries.map((entry) => entry.data[field]);
    if (new Set(values).size !== values.length) throw new Error(`Duplicate ${field} in ${collection}/${locale}.`);
  }
  return entries;
}

function assertParity(collection, german, english) {
  const signature = (entries) => entries.map(({ data }) => `${data.translationKey}|${data.slug}|${data.order}`);
  if (JSON.stringify(signature(german)) !== JSON.stringify(signature(english))) throw new Error(`${collection} German and English entries do not match.`);
}

export function loadContentRepository(root) {
  const repository = Object.fromEntries(collections.map((collection) => {
    const de = readCollection(root, collection, "de");
    const en = readCollection(root, collection, "en");
    assertParity(collection, de, en);
    return [collection, { de, en }];
  }));
  return { projects: repository.projects, faqs: repository.faqs, solutionFaqs: repository["faq-solutions"] };
}
