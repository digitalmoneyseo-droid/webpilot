import { loadContentRepository } from "../src/lib/content-core.ts";

const content = await loadContentRepository();
const config = await Bun.file("src/i18n/config.json").json();

console.log(`Validated ${content.faqs[config.defaultLocale].length} home FAQs across ${Object.keys(config.locales).length} locales.`);
