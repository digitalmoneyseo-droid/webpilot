import fs from "node:fs";
import path from "node:path";

const collections = ["faqs", "faq-solutions"];
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
  const entries = fs.readdirSync(directory).filter((file) => file.endsWith(".json")).map((file) => {
    const source = path.join("src", "content", collection, locale, file);
    const data = parseFaq(JSON.parse(fs.readFileSync(path.join(directory, file), "utf8")), source);
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
  return { faqs: repository.faqs, solutionFaqs: repository["faq-solutions"] };
}
