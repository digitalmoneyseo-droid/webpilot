import { expect, test } from "@playwright/test";

test("keeps the automation workflow contained across locales and viewport widths", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });

  for (const route of ["/", "/en", "/fr"]) {
    for (const width of [320, 375, 430, 768, 1280]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(route);

      const flow = page.locator("[data-automation-flow]");
      await flow.scrollIntoViewIfNeeded();

      const metrics = await flow.evaluate((element) => {
        const visual = element.parentElement!.getBoundingClientRect();
        const content = element.firstElementChild!.getBoundingClientRect();
        const triggerConnector = element.querySelector<HTMLElement>('[data-flow-connector="trigger-agent"]')!.getBoundingClientRect();
        const conditionConnector = element.querySelector<HTMLElement>('[data-flow-connector="agent-condition"]')!.getBoundingClientRect();
        const stem = element.querySelector<HTMLElement>('[data-flow-segment="stem"]')!.getBoundingClientRect();
        const leftRail = element.querySelector<HTMLElement>('[data-flow-segment="left-rail"]')!.getBoundingClientRect();
        const leftLeg = element.querySelector<HTMLElement>('[data-flow-segment="left-leg"]')!.getBoundingClientRect();
        const rightRail = element.querySelector<HTMLElement>('[data-flow-segment="right-rail"]')!.getBoundingClientRect();
        const rightLeg = element.querySelector<HTMLElement>('[data-flow-segment="right-leg"]')!.getBoundingClientRect();
        const condition = element.querySelector<HTMLElement>('[data-flow-node="condition"]')!.getBoundingClientRect();
        const success = element.querySelector<HTMLElement>('[data-flow-node="success"]')!.getBoundingClientRect();
        const fallback = element.querySelector<HTMLElement>('[data-flow-node="fallback"]')!.getBoundingClientRect();
        const nodes = Array.from(element.querySelectorAll<HTMLElement>("[data-flow-node]"), (node) => {
          const rect = node.getBoundingClientRect();
          return {
            name: node.dataset.flowNode,
            left: rect.left,
            right: rect.right,
            top: rect.top,
            bottom: rect.bottom,
            textFits: node.scrollWidth <= node.clientWidth && node.scrollHeight <= node.clientHeight,
          };
        });
        const overlaps = nodes.some((node, index) => nodes.slice(index + 1).some((other) => (
          node.left < other.right && node.right > other.left && node.top < other.bottom && node.bottom > other.top
        )));

        return {
          contentContained: content.left >= visual.left - 1 && content.right <= visual.right + 1 && content.top >= visual.top - 1 && content.bottom <= visual.bottom + 1,
          nodesContained: nodes.every((node) => node.left >= visual.left - 1 && node.right <= visual.right + 1 && node.top >= visual.top - 1 && node.bottom <= visual.bottom + 1),
          textFits: nodes.every((node) => node.textFits),
          overlaps,
          pageOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
          visualHeights: Array.from(document.querySelectorAll<HTMLElement>("[data-offer-visual]"), (item) => item.getBoundingClientRect().height),
          connectorThicknesses: [triggerConnector.height, conditionConnector.width, stem.width, leftRail.height, leftLeg.width, rightRail.height, rightLeg.width],
          branchAttachmentError: Math.max(
            Math.abs(condition.bottom - stem.top),
            Math.abs(leftLeg.bottom - success.top),
            Math.abs(rightLeg.bottom - fallback.top),
            Math.abs((leftLeg.left + leftLeg.right) / 2 - (success.left + success.right) / 2),
            Math.abs((rightLeg.left + rightLeg.right) / 2 - (fallback.left + fallback.right) / 2),
          ),
          connectorHeights: {
            condition: conditionConnector.height,
            branch: element.querySelector<HTMLElement>('[data-flow-connector="condition-outcomes"]')!.getBoundingClientRect().height,
          },
          reducedMotionPulsesHidden: Array.from(element.querySelectorAll<HTMLElement>("[data-flow-pulse], [data-flow-card-pulse], [data-flow-signal]"))
            .every((pulse) => Number(getComputedStyle(pulse).opacity) === 0),
        };
      });

      expect(metrics.contentContained, `${route} at ${width}px`).toBeTruthy();
      expect(metrics.nodesContained, `${route} at ${width}px`).toBeTruthy();
      expect(metrics.textFits, `${route} at ${width}px`).toBeTruthy();
      expect(metrics.overlaps, `${route} at ${width}px`).toBeFalsy();
      expect(metrics.pageOverflow, `${route} at ${width}px`).toBeLessThanOrEqual(1);
      expect(Math.max(...metrics.visualHeights) - Math.min(...metrics.visualHeights), `${route} at ${width}px`).toBeLessThanOrEqual(1);
      expect(metrics.connectorThicknesses.every((thickness) => thickness >= 1.5 && thickness <= 2.5), `${route} at ${width}px`).toBeTruthy();
      expect(metrics.branchAttachmentError, `${route} at ${width}px`).toBeLessThanOrEqual(1);
      expect(metrics.connectorHeights.condition, `${route} at ${width}px`).toBe(width > 600 ? 32 : 12);
      expect(metrics.connectorHeights.branch, `${route} at ${width}px`).toBe(width > 600 ? 48 : 24);
      expect(metrics.reducedMotionPulsesHidden, `${route} at ${width}px`).toBeTruthy();
    }
  }
});

test("reveals each connector only when the workflow reaches it", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/en");

  const flow = page.locator("[data-automation-flow]");
  const opacity = (selector: string) => flow.locator(selector).evaluate((element) => Number(getComputedStyle(element).opacity));
  const maxOpacity = (selector: string) => flow.locator(selector).evaluateAll((elements) => (
    Math.max(...elements.map((element) => Number(getComputedStyle(element).opacity)))
  ));

  await expect.poll(() => opacity('[data-flow-connector="trigger-agent"]')).toBe(0);
  await expect.poll(() => opacity('[data-flow-connector="agent-condition"]')).toBe(0);
  await expect.poll(() => opacity('[data-flow-segment="stem"]')).toBe(0);
  await expect.poll(() => maxOpacity("[data-flow-signal]")).toBe(0);

  await flow.scrollIntoViewIfNeeded();

  await expect.poll(() => opacity('[data-flow-connector="trigger-agent"]')).toBeGreaterThan(0.9);
  expect(await opacity('[data-flow-connector="agent-condition"]')).toBeLessThan(0.1);
  expect(await opacity('[data-flow-segment="stem"]')).toBeLessThan(0.1);

  await expect.poll(() => opacity('[data-flow-connector="agent-condition"]')).toBeGreaterThan(0.9);
  expect(await opacity('[data-flow-segment="stem"]')).toBeLessThan(0.1);

  await expect.poll(() => opacity('[data-flow-segment="left-leg"]')).toBeGreaterThan(0.9);
  await expect.poll(() => opacity('[data-flow-segment="right-leg"]')).toBeGreaterThan(0.9);
  await expect.poll(() => opacity('[data-flow-node="fallback"]')).toBeGreaterThan(0.9);
  await expect.poll(() => flow.locator("[data-flow-card-pulse]").evaluateAll((pulses) => (
    Math.max(...pulses.map((pulse) => Number(getComputedStyle(pulse).opacity)))
  ))).toBeGreaterThan(0.15);

  await expect.poll(
    () => opacity('[data-flow-signal="trigger-agent"]'),
    { intervals: [40], timeout: 6_000 },
  ).toBeGreaterThan(0.7);
  expect(await opacity('[data-flow-signal="agent-condition"]')).toBeLessThan(0.1);

  await expect.poll(
    () => opacity('[data-flow-signal="agent-condition"]'),
    { intervals: [40], timeout: 6_000 },
  ).toBeGreaterThan(0.7);
  expect(await opacity('[data-flow-signal="branch-stem"]')).toBeLessThan(0.1);

  await expect.poll(
    () => opacity('[data-flow-signal="left-leg"]'),
    { intervals: [40], timeout: 6_000 },
  ).toBeGreaterThan(0.7);
  await expect.poll(
    () => opacity('[data-flow-signal="right-leg"]'),
    { intervals: [40], timeout: 6_000 },
  ).toBeGreaterThan(0.7);
});
