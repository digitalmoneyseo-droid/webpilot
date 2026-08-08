import fs from "node:fs";
import path from "node:path";

const collections = ["faqs"];

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
  const locale = stringValue(value, "locale", source);
  if (!/^[a-z]{2}(?:-[A-Z]{2})?$/.test(locale)) throw new Error(`Invalid locale in ${source}.`);
  return locale;
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

function assertParity(collection, reference, translated, locale, defaultLocale) {
  const signature = (entries) => entries.map(({ data }) => `${data.translationKey}|${data.slug}|${data.order}`);
  if (JSON.stringify(signature(reference)) !== JSON.stringify(signature(translated))) throw new Error(`${collection} ${defaultLocale} and ${locale} entries do not match.`);
}

export function loadContentRepository(root) {
  const i18nConfig = JSON.parse(fs.readFileSync(path.join(root, "src", "i18n", "config.json"), "utf8"));
  const locales = Object.keys(i18nConfig.locales);
  const repository = Object.fromEntries(collections.map((collection) => {
    const localizedEntries = Object.fromEntries(locales.map((locale) => [locale, readCollection(root, collection, locale)]));
    const reference = localizedEntries[i18nConfig.defaultLocale];
    for (const locale of locales) assertParity(collection, reference, localizedEntries[locale], locale, i18nConfig.defaultLocale);
    return [collection, localizedEntries];
  }));
  return { faqs: repository.faqs };
}
