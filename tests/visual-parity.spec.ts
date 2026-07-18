import { expect, test } from "@playwright/test";

const cases = [
  ["home", "/en"], ["work", "/en/work"], ["project", "/en/work/atlas-growth-platform"], ["services", "/en/services"],
  ["insights", "/en/insights"], ["contact", "/en/contact"], ["concept", "/en/concept"], ["not-found", "/missing-page"],
] as const;

for (const [name, route] of cases) {
  test(`${name} desktop visual`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(route);
    await expect(page).toHaveScreenshot(`${name}-1440.png`, { fullPage: true });
  });
  test(`${name} mobile visual`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(route);
    await expect(page).toHaveScreenshot(`${name}-390.png`, { fullPage: true });
  });
}
