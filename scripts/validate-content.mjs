import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const projectFields = ["translationKey", "locale", "slug", "order", "title", "shortTitle", "summary", "categories", "year", "metric", "metricLabel", "challenge", "strategy", "execution", "timeline", "tools", "palette", "visual"];
const faqFields = ["translationKey", "locale", "slug", "order", "question", "answer"];
const palettes = new Set(["violet", "orange", "blue", "green", "ink", "yellow", "coral", "ice"]);
const visuals = new Set(["dashboard", "commerce", "assistant", "search", "content", "crm", "brand", "campaign"]);

function readCollection(collection, locale, fields) {
  const directory = path.join(root, "src", "content", collection, locale);
  const entries = fs.readdirSync(directory).filter((file) => file.endsWith(".json")).map((file) => {
    const source = path.join("src/content", collection, locale, file);
    const data = JSON.parse(fs.readFileSync(path.join(directory, file), "utf8"));
    if (!data || typeof data !== "object" || Array.isArray(data)) throw new Error(`Invalid object in ${source}.`);
    for (const field of fields) if (!(field in data)) throw new Error(`Missing ${field} in ${source}.`);
    if (data.locale !== locale) throw new Error(`Wrong locale in ${source}.`);
    if (!Number.isInteger(data.order) || data.order < 1) throw new Error(`Invalid order in ${source}.`);
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(data.slug)) throw new Error(`Invalid slug in ${source}.`);
    if (collection === "projects" && (!palettes.has(data.palette) || !visuals.has(data.visual))) throw new Error(`Invalid project enum in ${source}.`);
    return data;
  }).sort((a, b) => a.order - b.order);
  for (const field of ["translationKey", "slug", "order"]) {
    const values = entries.map((entry) => entry[field]);
    if (new Set(values).size !== values.length) throw new Error(`Duplicate ${field} in ${collection}/${locale}.`);
  }
  return entries;
}

function assertParity(label, german, english) {
  const signature = (entries) => entries.map((entry) => `${entry.translationKey}|${entry.slug}|${entry.order}`);
  if (JSON.stringify(signature(german)) !== JSON.stringify(signature(english))) throw new Error(`${label} German and English entries do not match.`);
}

const projectsDe = readCollection("projects", "de", projectFields);
const projectsEn = readCollection("projects", "en", projectFields);
const faqsDe = readCollection("faqs", "de", faqFields);
const faqsEn = readCollection("faqs", "en", faqFields);
const solutionFaqsDe = readCollection("faq-solutions", "de", faqFields);
const solutionFaqsEn = readCollection("faq-solutions", "en", faqFields);
assertParity("projects", projectsDe, projectsEn);
assertParity("faqs", faqsDe, faqsEn);
assertParity("faq-solutions", solutionFaqsDe, solutionFaqsEn);

const translations = fs.readFileSync(path.join(root, "src/i18n/translations.ts"), "utf8");
const block = (start, end) => translations.slice(translations.indexOf(start), translations.indexOf(end));
const keys = (content) => [...content.matchAll(/^\s+"([^"]+)":/gm)].map((match) => match[1]).sort();
const germanKeys = keys(block("export const deMessages", "export type MessageKey"));
const englishKeys = keys(block("export const enMessages", "export const dictionaries"));
if (JSON.stringify(germanKeys) !== JSON.stringify(englishKeys)) throw new Error("German and English translation keys do not match.");

console.log(`Validated ${projectsDe.length} projects, ${faqsDe.length} home FAQs, ${solutionFaqsDe.length} solution FAQs, and ${germanKeys.length} translation keys in both locales.`);
