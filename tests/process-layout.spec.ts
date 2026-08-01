import { expect, test } from "@playwright/test";

test.describe("process layout", () => {
  test("keeps the mobile markers and connector outside the cards", async ({ page }) => {
    await page.setViewportSize({ width: 430, height: 932 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/en");

    const process = page.locator("#process");
    await page.waitForSelector("#process");
    await expect(process.locator(".process-step[data-reveal]")).toHaveCount(3);
    await process.evaluate((element) => element.scrollIntoView({ block: "center" }));
    const metrics = await process.locator(".process-step").evaluateAll((steps) => steps.map((step) => {
      const card = step.getBoundingClientRect();
      const node = step.querySelector<HTMLElement>(".process-node")?.getBoundingClientRect();
      const connector = getComputedStyle(step, "::before");

      return {
        cardLeft: card.left,
        nodeRight: node?.right ?? -1,
        connectorDisplay: connector.display,
        connectorWidth: connector.width,
        connectorOrigin: connector.transformOrigin,
      };
    }));

    expect(metrics).toHaveLength(3);
    expect(metrics[0]!.nodeRight).toBeLessThan(metrics[0]!.cardLeft);
    expect(metrics[1]!.nodeRight).toBeLessThan(metrics[1]!.cardLeft);
    expect(metrics[2]!.nodeRight).toBeLessThan(metrics[2]!.cardLeft);
    expect(metrics[0]!.connectorDisplay).toBe("block");
    expect(metrics[0]!.connectorWidth).toBe("2px");
    expect(metrics[0]!.connectorOrigin).toMatch(/ 0px$/);
    expect(metrics[1]!.connectorDisplay).toBe("block");
  });

  test("stagger-reveals mobile cards and their connectors", async ({ page }) => {
    await page.setViewportSize({ width: 430, height: 932 });
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/en");

    const process = page.locator("#process");
    await process.scrollIntoViewIfNeeded();
    await expect(process.locator(".process-step").first()).toHaveClass(/is-visible/);

    const animation = await process.locator(".process-step").evaluateAll((steps) => steps.map((step) => {
      const card = getComputedStyle(step);
      const connector = getComputedStyle(step, "::before");

      return {
        delay: card.getPropertyValue("--process-delay").trim(),
        cardTransition: card.transitionProperty,
        connectorTransition: connector.transitionProperty,
        connectorDelay: connector.transitionDelay,
      };
    }));

    expect(animation.map((step) => step.delay)).toEqual(["0ms", "160ms", "320ms"]);
    expect(animation.every((step) => step.cardTransition.includes("opacity") && step.cardTransition.includes("transform"))).toBeTruthy();
    expect(animation[0]!.connectorTransition).toContain("transform");
    expect(animation[0]!.connectorDelay).toContain("0.2s");
    expect(animation[1]!.connectorDelay).toContain("0.36s");
  });
});
