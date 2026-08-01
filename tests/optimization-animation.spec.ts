import { expect, test } from "@playwright/test";

test.describe("optimization animation layout", () => {
  for (const route of ["/", "/en"]) {
    for (const width of [320, 375, 390, 430, 450, 480, 500, 515, 600, 768]) {
      test(`fits at ${width}px on ${route}`, async ({ page }) => {
        await page.setViewportSize({ width, height: 932 });
        await page.emulateMedia({ reducedMotion: "reduce" });
        await page.goto(route);

        const animation = page.locator("[data-optimization-animation]");
        await page.waitForSelector("[data-optimization-animation]");
        await page.waitForTimeout(150);
        await animation.evaluate((element) => element.scrollIntoView({ block: "center" }));
        await expect(animation).toBeVisible();

        const metrics = await animation.evaluate((element) => {
          const card = element.closest<HTMLElement>("[aria-hidden='true']");
          const results = element.querySelector<HTMLElement>("[data-optimization-results]");
          const description = element.querySelector<HTMLElement>("[data-optimization-description]");
          const topRanked = element.querySelector<HTMLElement>("[data-optimization-top-ranked]");
          const topRankedIcon = element.querySelector<SVGElement>("[data-optimization-top-ranked-icon]");
          const topRankedLabel = element.querySelector<HTMLElement>("[data-optimization-top-ranked-label]");
          const winner = element.querySelector<HTMLElement>("[data-optimization-winner]");
          const firstRow = element.querySelector<HTMLElement>("ol li");
          const firstBadge = firstRow?.querySelector<HTMLElement>("span.grid");
          const cardRect = card?.getBoundingClientRect();
          const resultsRect = results?.getBoundingClientRect();

          return {
            viewportWidth: window.innerWidth,
            cardLeft: cardRect?.left ?? -1,
            cardRight: cardRect?.right ?? -1,
            resultsLeft: resultsRect?.left ?? -1,
            resultsRight: resultsRect?.right ?? -1,
            descriptionDisplay: description ? getComputedStyle(description).display : "",
            topRankedText: topRanked?.textContent?.trim() ?? "",
            topRankedTop: topRanked?.getBoundingClientRect().top ?? -1,
            topRankedBottom: topRanked?.getBoundingClientRect().bottom ?? -1,
            topRankedIconBottom: topRankedIcon?.getBoundingClientRect().bottom ?? -1,
            topRankedLabelTop: topRankedLabel?.getBoundingClientRect().top ?? -1,
            winnerTop: winner?.getBoundingClientRect().top ?? -1,
            winnerBottom: winner?.getBoundingClientRect().bottom ?? -1,
            badgeCenterOffset: firstRow && firstBadge
              ? Math.abs(
                (firstBadge.getBoundingClientRect().top + firstBadge.getBoundingClientRect().height / 2)
                - (firstRow.getBoundingClientRect().top + firstRow.getBoundingClientRect().height / 2),
              )
              : -1,
          };
        });

        expect(metrics.cardLeft).toBeGreaterThanOrEqual(0);
        expect(metrics.cardRight).toBeLessThanOrEqual(metrics.viewportWidth);
        expect(metrics.resultsLeft).toBeGreaterThanOrEqual(metrics.cardLeft);
        expect(metrics.resultsRight, JSON.stringify(metrics)).toBeLessThanOrEqual(metrics.cardRight);
        expect(metrics.descriptionDisplay).toBe(width <= 640 ? "none" : "block");
        expect(metrics.topRankedText).toMatch(route === "/en" ? /Top ranked/ : /Top platziert/);
        expect(metrics.topRankedBottom).toBeLessThanOrEqual(metrics.winnerTop + 1);
        expect(metrics.topRankedIconBottom).toBeLessThanOrEqual(metrics.topRankedLabelTop + 1);
        if (width <= 640) expect(metrics.badgeCenterOffset).toBeLessThanOrEqual(1);
      });
    }
  }

  test("fires confetti without resizing a transferred canvas", async ({ page }) => {
    const pageErrors: string[] = [];
    page.on("pageerror", (error) => pageErrors.push(error.message));
    await page.setViewportSize({ width: 1280, height: 932 });
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/en");

    const animation = page.locator("[data-optimization-animation]");
    await animation.waitFor();
    await animation.evaluate((element) => element.scrollIntoView({ block: "center" }));
    await page.waitForSelector("[data-optimization-confetti]", { timeout: 10_000 });
    await page.waitForTimeout(2_500);

    expect(pageErrors).not.toContain("Failed to set the 'width' property on 'HTMLCanvasElement': Cannot resize canvas after call to transferControlToOffscreen().");
  });
});
