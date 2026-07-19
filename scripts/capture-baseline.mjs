import { mkdir } from "node:fs/promises";
import { chromium } from "@playwright/test";

const routes = [
  "/",
  "/work",
  "/work/atlas-growth-platform",
  "/work/kindred-commerce",
  "/work/nora-support-ai",
  "/work/northstar-organic-search",
  "/work/orbit-content-engine",
  "/work/lumen-lead-system",
  "/work/form-technology-rebrand",
  "/work/wave-acquisition",
  "/services",
  "/services/branding-identity",
  "/services/website-design-development",
  "/services/app-design-development",
  "/services/seo-ai-search",
  "/services/content-social",
  "/services/paid-acquisition",
  "/services/ai-automation",
  "/services/analytics-cro",
  "/about",
  "/contact",
  "/access",
  "/missing-page",
];

const viewports = [
  { name: "desktop", width: 1440, height: 1000 },
  { name: "mobile", width: 390, height: 844 },
];

const outputDirectory = new URL("../tests/visual/baseline-next/", import.meta.url);
await mkdir(outputDirectory, { recursive: true });

const browser = await chromium.launch();
for (const viewport of viewports) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    reducedMotion: "reduce",
    colorScheme: "light",
  });
  const page = await context.newPage();
  for (const route of routes) {
    await page.goto(`http://127.0.0.1:3000${route}`, { waitUntil: "networkidle" });
    await page.addStyleTag({
      content: "*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important}",
    });
    const name = route === "/" ? "home" : route.slice(1).replaceAll("/", "__");
    await page.screenshot({
      path: new URL(`${viewport.name}__${name}.png`, outputDirectory).pathname.slice(1),
      fullPage: true,
      animations: "disabled",
    });
  }
  await context.close();
}
await browser.close();
