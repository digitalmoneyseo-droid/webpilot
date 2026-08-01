import { expect, test } from "@playwright/test";

test.describe("campaign animation metric", () => {
  for (const route of ["/", "/en"]) {
    for (const width of [320, 430, 515, 768, 1440]) {
      test(`aligns the metric at ${width}px on ${route}`, async ({ page }) => {
        await page.setViewportSize({ width, height: 932 });
        await page.emulateMedia({ reducedMotion: "reduce" });
        await page.goto(route);

        const metric = page.locator("[data-campaign-metric]");
        await page.waitForSelector("[data-campaign-metric]");
        await metric.evaluate((element) => element.scrollIntoView({ block: "center" }));

        const bottoms = await metric.evaluate((element) => Array.from(element.children, (child) => child.getBoundingClientRect().bottom));
        expect(bottoms).toHaveLength(2);
        expect(bottoms[1]).toBeLessThanOrEqual(bottoms[0]! + 1);
        expect(bottoms[0]! - bottoms[1]!).toBeLessThanOrEqual(6);
      });
    }
  }
});
