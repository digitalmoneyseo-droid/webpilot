import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadContentRepository } from "../src/lib/content-core.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const content = loadContentRepository(root);

console.log(`Validated ${content.faqs.de.length} home FAQs in both locales.`);
