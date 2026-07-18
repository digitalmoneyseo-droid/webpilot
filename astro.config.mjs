import mdx from "@astrojs/mdx";
import { defineConfig } from "astro/config";

const site = process.env.PUBLIC_SITE_URL ?? "https://webpilot.studio";

export default defineConfig({
  site,
  output: "static",
  integrations: [mdx()],
  i18n: {
    defaultLocale: "de",
    locales: ["de", "en"],
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
      fallbackType: "redirect",
    },
  },
});
