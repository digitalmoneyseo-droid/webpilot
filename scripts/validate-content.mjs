import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const collections = ["projects", "services", "insights", "team", "testimonials", "faqs"];

async function filesUnder(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map((entry) => entry.isDirectory() ? filesUnder(path.join(directory, entry.name)) : path.join(directory, entry.name)));
  return files.flat();
}

function parseFrontmatter(source, file) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) throw new Error(`Missing frontmatter in ${file}`);
  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    const separator = line.indexOf(":");
    if (separator < 0) continue;
    const key = line.slice(0, separator).trim();
    let value = line.slice(separator + 1).trim();
    if (value.startsWith('"') && value.endsWith('"')) value = JSON.parse(value);
    else if (value === "true" || value === "false") value = value === "true";
    data[key] = value;
  }
  return data;
}

for (const collection of collections) {
  const directory = path.join(root, "src", "content", collection);
  const files = await filesUnder(directory);
  const entries = [];
  for (const file of files) {
    const source = await readFile(file, "utf8");
    const data = file.endsWith(".json") ? JSON.parse(source) : parseFrontmatter(source, file);
    for (const field of ["translationKey", "locale", "slug", "status", "indexable"]) if (data[field] === undefined || data[field] === "") throw new Error(`${file} is missing ${field}`);
    if (!["de", "en"].includes(data.locale)) throw new Error(`${file} has an invalid locale`);
    if (!["concept", "verified"].includes(data.status)) throw new Error(`${file} has an invalid status`);
    entries.push({ file, data });
  }
  const groups = new Map();
  for (const entry of entries) {
    const group = groups.get(entry.data.translationKey) ?? [];
    group.push(entry);
    groups.set(entry.data.translationKey, group);
  }
  for (const [key, pair] of groups) {
    const locales = new Set(pair.map((entry) => entry.data.locale));
    if (pair.length !== 2 || !locales.has("de") || !locales.has("en")) throw new Error(`${collection}/${key} must have one de and one en entry`);
    if (pair[0].data.slug !== pair[1].data.slug) throw new Error(`${collection}/${key} must use the same slug in both locales`);
  }
}

console.log("Content locale pairs and required metadata are valid.");
