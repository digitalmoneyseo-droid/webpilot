import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

const site = process.env.PUBLIC_SITE_URL ?? "https://webpilot.studio";

export default defineConfig({
  site,
  output: "static",
  compressHTML: true,
  vite: { plugins: [tailwindcss()] },
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
