import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadContentRepository } from "../src/lib/content-core.mjs";
import fs from "node:fs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const content = loadContentRepository(root);
const config = JSON.parse(fs.readFileSync(path.join(root, "src", "i18n", "config.json"), "utf8"));

console.log(`Validated ${content.faqs[config.defaultLocale].length} home FAQs across ${Object.keys(config.locales).length} locales.`);
