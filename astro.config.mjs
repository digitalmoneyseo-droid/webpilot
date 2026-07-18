import mdx from "@astrojs/mdx";
import { defineConfig } from "astro/config";

const site = process.env.PUBLIC_SITE_URL ?? "https://webpilot.studio";

export default defineConfig({
  site,
  output: "static",
  redirects: {
    "/services/brand-web-product": "/services#build",
    "/en/services/brand-web-product": "/en/services#build",
  },
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
