import { expect, test } from "@playwright/test";

test("reveals the image composition with the first hero accent", async ({ page }) => {
  await page.goto("/services/websites-apps", { waitUntil: "commit" });

  const revealTimes = await page.evaluate(async () => {
    const selectors = {
      accent: '[data-web-experience-part="accent"]',
      back: '[data-web-experience-card="back"]',
      middle: '[data-web-experience-card="middle"]',
      front: '[data-web-experience-card="front"]',
    } as const;
    const nextFrame = () => new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

    while (!Object.values(selectors).every((selector) => document.querySelector(selector))) await nextFrame();

    const startedAt = performance.now();
    const times: Partial<Record<keyof typeof selectors, number>> = {};
    while (Object.keys(times).length < Object.keys(selectors).length && performance.now() - startedAt < 3_000) {
      for (const [part, selector] of Object.entries(selectors) as [keyof typeof selectors, string][]) {
        const element = document.querySelector(selector);
        if (times[part] === undefined && element && Number(getComputedStyle(element).opacity) > 0.05) {
          times[part] = performance.now() - startedAt;
        }
      }
      await nextFrame();
    }
    return times;
  });

  expect(revealTimes.accent).toBeDefined();
  expect(revealTimes.back).toBeDefined();
  expect(revealTimes.middle).toBeDefined();
  expect(revealTimes.front).toBeDefined();
  expect(Math.abs(revealTimes.back! - revealTimes.accent!)).toBeLessThan(34);
  expect(revealTimes.middle!).toBeGreaterThan(revealTimes.back! + 100);
  expect(revealTimes.front!).toBeGreaterThan(revealTimes.middle! + 100);
});

test("keeps the inquiry CTA visible from desktop through phone", async ({ page }) => {
  await page.goto("/services/websites-apps");

  const device = page.locator("[data-web-experience-device]");
  const cta = page.locator('[data-web-experience-part="cta"]');
  await device.scrollIntoViewIfNeeded();

  await expect.poll(async () => Number(await cta.evaluate((element) => getComputedStyle(element).opacity)), {
    message: "the CTA should begin appearing in the desktop hero",
  }).toBeGreaterThan(0.5);
  expect((await device.boundingBox())?.width).toBeGreaterThan(300);

  await expect.poll(async () => Number(await cta.evaluate((element) => getComputedStyle(element).opacity)), {
    message: "the CTA should finish appearing as the morph starts",
  }).toBeGreaterThan(0.95);

  await expect.poll(async () => (await device.boundingBox())?.width ?? Number.POSITIVE_INFINITY, {
    message: "the device should finish in the phone layout",
    timeout: 6_000,
  }).toBeLessThan(200);
  await expect(cta).toHaveCSS("opacity", "1");
  await expect(cta).toBeVisible();
});

test("starts the phone morph as soon as the desktop build finishes", async ({ page }) => {
  await page.goto("/services/websites-apps", { waitUntil: "commit" });

  const timing = await page.evaluate(async () => {
    const nextFrame = () => new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
    let device = document.querySelector("[data-web-experience-device]");
    let cta = document.querySelector('[data-web-experience-part="cta"]');
    while (!device || !cta) {
      await nextFrame();
      device = document.querySelector("[data-web-experience-device]");
      cta = document.querySelector('[data-web-experience-part="cta"]');
    }

    const startedAt = performance.now();
    let maximumWidth = 0;
    let reachedDesktop = false;
    let ctaReadyAt: number | undefined;
    let morphVisibleAt: number | undefined;

    while (performance.now() - startedAt < 4_000 && (ctaReadyAt === undefined || morphVisibleAt === undefined)) {
      const width = device.getBoundingClientRect().width;
      maximumWidth = Math.max(maximumWidth, width);
      if (width > 400) reachedDesktop = true;
      if (ctaReadyAt === undefined && Number(getComputedStyle(cta).opacity) > 0.98) ctaReadyAt = performance.now() - startedAt;
      if (reachedDesktop && morphVisibleAt === undefined && width < maximumWidth - 2) morphVisibleAt = performance.now() - startedAt;
      await nextFrame();
    }

    return { ctaReadyAt, morphVisibleAt };
  });

  expect(timing.ctaReadyAt).toBeDefined();
  expect(timing.morphVisibleAt).toBeDefined();
  expect(timing.morphVisibleAt! - timing.ctaReadyAt!).toBeLessThan(150);
});

test("morphs the desktop hero into the phone without snapping or collapsing", async ({ page }) => {
  await page.goto("/services/websites-apps", { waitUntil: "commit" });

  const result = await page.evaluate(async () => {
    const selectors = {
      device: "[data-web-experience-device]",
      accent: '[data-web-experience-part="accent"]',
      headline: '[data-web-experience-part="headline"]',
      cta: '[data-web-experience-part="cta"]',
      image: '[data-web-experience-part="image"]',
    } as const;
    const nextFrame = () => new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

    while (!Object.values(selectors).every((selector) => document.querySelector(selector))) await nextFrame();

    const frames: Array<{ time: number; rects: Record<keyof typeof selectors, { x: number; y: number; width: number; height: number }> }> = [];
    const startedAt = performance.now();
    let reachedDesktop = false;
    let morphTransforms: { headline: string; image: string } | undefined;

    while (performance.now() - startedAt < 7_000) {
      const rects = Object.fromEntries(
        Object.entries(selectors).map(([part, selector]) => {
          const { x, y, width, height } = document.querySelector(selector)!.getBoundingClientRect();
          return [part, { x, y, width, height }];
        }),
      ) as Record<keyof typeof selectors, { x: number; y: number; width: number; height: number }>;

      if (rects.device.width > 400) reachedDesktop = true;
      if (reachedDesktop && rects.device.width < 400) {
        frames.push({ time: performance.now() - startedAt, rects });
        if (!morphTransforms) {
          morphTransforms = {
            headline: getComputedStyle(document.querySelector(selectors.headline)!).transform,
            image: getComputedStyle(document.querySelector(selectors.image)!).transform,
          };
        }
      }
      if (frames.length > 20 && rects.device.width < 190) break;
      await nextFrame();
    }

    let largestVelocity = 0;
    for (let index = 1; index < frames.length; index += 1) {
      const previous = frames[index - 1];
      const current = frames[index];
      const elapsedSeconds = (current.time - previous.time) / 1_000;
      if (elapsedSeconds <= 0 || elapsedSeconds > 0.05) continue;

      for (const part of ["accent", "headline", "cta", "image"] as const) {
        const before = previous.rects[part];
        const after = current.rects[part];
        const change = Math.max(
          Math.abs(after.x - before.x),
          Math.abs(after.y - before.y),
          Math.abs(after.width - before.width),
          Math.abs(after.height - before.height),
        );
        largestVelocity = Math.max(largestVelocity, change / elapsedSeconds);
      }
    }

    return { frames, largestVelocity, morphTransforms };
  });

  expect(result.frames.length).toBeGreaterThan(20);
  expect(result.largestVelocity).toBeLessThan(1_000);
  expect(result.morphTransforms).toEqual({ headline: "none", image: "none" });

  for (const { rects } of result.frames) {
    for (const part of ["accent", "headline", "cta", "image"] as const) {
      const element = rects[part];
      expect(element.width).toBeGreaterThan(5);
      expect(element.height).toBeGreaterThan(3);
      expect(element.x).toBeGreaterThanOrEqual(rects.device.x - 2);
      expect(element.x + element.width).toBeLessThanOrEqual(rects.device.x + rects.device.width + 2);
      expect(element.y).toBeGreaterThanOrEqual(rects.device.y - 2);
      expect(element.y + element.height).toBeLessThanOrEqual(rects.device.y + rects.device.height + 2);
    }
  }
});

test("centers the URL vertically in the desktop and phone browser bars", async ({ page }) => {
  const measureCenterOffset = () => page.evaluate(() => {
    const device = document.querySelector("[data-web-experience-device]")!.getBoundingClientRect();
    const divider = document.querySelector("[data-web-experience-divider]")!.getBoundingClientRect();
    const url = document.querySelector("[data-web-experience-url]")!.getBoundingClientRect();
    return Math.abs((device.top + divider.top) / 2 - (url.top + url.height / 2));
  });

  await page.goto("/services/websites-apps");
  const device = page.locator("[data-web-experience-device]");
  const url = page.locator("[data-web-experience-url]");
  await expect.poll(async () => (await device.boundingBox())?.width ?? 0).toBeGreaterThan(400);
  await expect.poll(async () => Number(await url.evaluate((element) => getComputedStyle(element).opacity))).toBeGreaterThan(0.99);
  expect(await measureCenterOffset()).toBeLessThan(1.5);

  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload();
  await expect.poll(async () => (await device.boundingBox())?.width ?? Number.POSITIVE_INFINITY).toBeLessThan(200);
  expect(await measureCenterOffset()).toBeLessThan(1.5);
});

test("keeps the inquiry CTA at full scale in the phone layout", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/services/websites-apps");

  const cta = page.locator('[data-web-experience-part="cta"]');
  const ctaLabel = page.locator("[data-web-experience-cta-label]");
  const ctaBackground = page.locator("[data-web-experience-cta-bg]");
  const device = page.locator("[data-web-experience-device]");
  const primaryLine = page.locator('[data-web-experience-part="primary-line"]');
  const image = page.locator('[data-web-experience-part="image"]');
  const notch = page.locator("[data-web-experience-notch]");
  const homeIndicator = page.locator("[data-web-experience-home-indicator]");

  await expect(cta).toBeVisible();
  await expect(cta).toHaveCSS("transform", "none");
  await expect(ctaLabel).toHaveCSS("font-size", "10px");
  await expect(ctaLabel).toHaveCSS("font-weight", "600");

  const [deviceBox, primaryLineBox, imageBox, notchBox, homeIndicatorBox, ctaLabelBox, ctaBackgroundBox] = await Promise.all([
    device.boundingBox(),
    primaryLine.boundingBox(),
    image.boundingBox(),
    notch.boundingBox(),
    homeIndicator.boundingBox(),
    ctaLabel.boundingBox(),
    ctaBackground.boundingBox(),
  ]);
  const ctaVectorBox = await ctaBackground.evaluate((element) => {
    const { width, height } = (element as SVGGraphicsElement).getBBox();
    return { width, height };
  });
  expect(deviceBox).not.toBeNull();
  expect(primaryLineBox).not.toBeNull();
  expect(imageBox).not.toBeNull();
  expect(notchBox).not.toBeNull();
  expect(homeIndicatorBox).not.toBeNull();
  expect(ctaLabelBox).not.toBeNull();
  expect(ctaBackgroundBox).not.toBeNull();

  const lineLeftInset = primaryLineBox!.x - deviceBox!.x;
  const lineRightInset = deviceBox!.x + deviceBox!.width - primaryLineBox!.x - primaryLineBox!.width;
  const imageLeftInset = imageBox!.x - deviceBox!.x;
  const imageRightInset = deviceBox!.x + deviceBox!.width - imageBox!.x - imageBox!.width;
  expect(Math.abs(lineLeftInset - lineRightInset)).toBeLessThan(2);
  expect(Math.abs(imageLeftInset - imageRightInset)).toBeLessThan(2);
  expect(Math.abs(lineLeftInset - imageLeftInset)).toBeLessThan(2);
  expect(ctaVectorBox.width).toBeCloseTo(92, 1);
  expect(ctaVectorBox.height).toBeCloseTo(24, 1);
  expect(ctaBackgroundBox!.height).toBeGreaterThan(ctaLabelBox!.height);
  expect(homeIndicatorBox!.width).toBeGreaterThan(notchBox!.width);
  expect(homeIndicatorBox!.height).toBeLessThan(notchBox!.height);
});
