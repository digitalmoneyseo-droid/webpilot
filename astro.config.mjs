import { defineConfig } from "astro/config";

const site = process.env.PUBLIC_SITE_URL ?? "https://webpilot.studio";

export default defineConfig({
  site,
  output: "static",
  // Preserve Astro 6's HTML whitespace behavior during the v7 migration.
  compressHTML: true,
  redirects: {
    "/services/brand-web-product": "/services/website-design-development",
    "/en/services/brand-web-product": "/en/services/website-design-development",
  },
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
