import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const baseUrl = process.env.VERIFY_BASE_URL ?? "http://127.0.0.1:4173";
const outputDir = fileURLToPath(new URL("../tests/visual/redesign-review/", import.meta.url));
const routes = [
  ["home", "/en/"],
  ["service", "/en/services/seo-ai-search/"],
  ["about", "/en/about/"],
  ["contact", "/en/contact/"],
  ["privacy", "/en/privacy/"],
];
const viewports = [{ name: "desktop", width: 1440, height: 1000 }, { name: "mobile", width: 390, height: 844 }];

await mkdir(outputDir, { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_PATH ?? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe" });
let failed = false;

for (const viewport of viewports) {
  const page = await browser.newPage({ viewport });
  const consoleErrors = [];
  page.on("console", (message) => { if (message.type() === "error") consoleErrors.push(message.text()); });
  for (const [name, route] of routes) {
    const response = await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });
    const metrics = await page.evaluate(() => ({
      title: document.title,
      text: document.body.innerText.trim().length,
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      overlay: Boolean(document.querySelector(".vite-error-overlay, [data-nextjs-dialog]")),
    }));
    const ok = response?.ok() && metrics.text > 0 && metrics.overflow <= 1 && !metrics.overlay;
    failed ||= !ok;
    console.log(`${ok ? "PASS" : "FAIL"} ${viewport.name.padEnd(7)} ${route} status=${response?.status()} overflow=${metrics.overflow} text=${metrics.text}`);
    await page.screenshot({ path: join(outputDir, `${viewport.name}__${name}.png`), fullPage: true });
  }
  await page.close();
  if (consoleErrors.length) {
    failed = true;
    console.error(`${viewport.name} console errors:\n${consoleErrors.join("\n")}`);
  }
}

const interactionPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await interactionPage.goto(`${baseUrl}/en/`, { waitUntil: "networkidle" });
await interactionPage.locator(".desktop-services").hover();
await interactionPage.locator(".desktop-megamenu").waitFor({ state: "visible" });
console.log(`PASS desktop megamenu items=${await interactionPage.locator(".megamenu-list > a").count()}`);
await interactionPage.waitForTimeout(250);
await interactionPage.screenshot({ path: join(outputDir, "desktop__open-megamenu.png"), fullPage: false });
await interactionPage.close();

const mobileInteractionPage = await browser.newPage({ viewport: { width: 390, height: 844 } });
await mobileInteractionPage.goto(`${baseUrl}/en/`, { waitUntil: "networkidle" });
console.log(`PASS FAQ starts closed=${await mobileInteractionPage.locator("[data-faq] button").first().getAttribute("aria-expanded") === "false"}`);
await mobileInteractionPage.locator(".header-menu").click();
await mobileInteractionPage.locator(".menu-services-trigger").click();
console.log(`PASS mobile service expansion items=${await mobileInteractionPage.locator(".menu-service-list a").count()}`);
const mobileMenuState = await mobileInteractionPage.evaluate(() => ({
  primaryOpacity: getComputedStyle(document.querySelector(".menu-links > a")).opacity,
  servicesAlign: getComputedStyle(document.querySelector(".menu-services-trigger b")).justifySelf,
}));
console.log(`PASS mobile transition primaryOpacity=${mobileMenuState.primaryOpacity} servicesAlign=${mobileMenuState.servicesAlign}`);
await mobileInteractionPage.waitForTimeout(450);
await mobileInteractionPage.screenshot({ path: join(outputDir, "mobile__expanded-menu.png"), fullPage: false });
await mobileInteractionPage.close();

await browser.close();
if (failed) process.exitCode = 1;
