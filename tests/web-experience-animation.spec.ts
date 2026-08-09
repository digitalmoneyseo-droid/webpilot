import { expect, test } from "@playwright/test";

test("schedules the image composition with the first hero accent", async ({ page }) => {
  await page.goto("/services/websites-apps", { waitUntil: "commit" });

  const revealDelays = await page.evaluate(async () => {
    const desktop = '[data-web-experience-layer="desktop"]';
    const selectors = {
      accent: `${desktop} [data-web-experience-part="accent"]`,
      back: `${desktop} [data-web-experience-card="back"]`,
      middle: `${desktop} [data-web-experience-card="middle"]`,
      front: `${desktop} [data-web-experience-card="front"]`,
    } as const;
    const nextFrame = () => new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

    while (!Object.values(selectors).every((selector) => document.querySelector(selector))) await nextFrame();

    let animations = Object.fromEntries(Object.entries(selectors).map(([part, selector]) => [
      part,
      document.querySelector(selector)?.getAnimations()[0],
    ])) as Record<keyof typeof selectors, Animation | undefined>;

    while (Object.values(animations).some((animation) => !animation)) {
      await nextFrame();
      animations = Object.fromEntries(Object.entries(selectors).map(([part, selector]) => [
        part,
        document.querySelector(selector)?.getAnimations()[0],
      ])) as Record<keyof typeof selectors, Animation | undefined>;
    }

    return Object.fromEntries(Object.entries(animations).map(([part, animation]) => [
      part,
      animation!.effect!.getComputedTiming().delay,
    ])) as Record<keyof typeof selectors, number>;
  });

  expect(Math.abs(revealDelays.back - revealDelays.accent)).toBeLessThan(1);
  expect(revealDelays.middle).toBeGreaterThan(revealDelays.back + 100);
  expect(revealDelays.front).toBeGreaterThan(revealDelays.middle + 100);
});

test("keeps the inquiry CTA visible from desktop through phone", async ({ page }) => {
  await page.goto("/services/websites-apps");

  const desktopLayer = page.locator('[data-web-experience-layer="desktop"]');
  const phoneLayer = page.locator('[data-web-experience-layer="phone"]');
  const desktopDevice = desktopLayer.locator("[data-web-experience-device]");
  const desktopCta = desktopLayer.locator('[data-web-experience-part="cta"]');
  const phoneCta = phoneLayer.locator('[data-web-experience-part="cta"]');
  await desktopDevice.scrollIntoViewIfNeeded();

  await expect.poll(async () => Number(await desktopCta.evaluate((element) => getComputedStyle(element).opacity)), {
    message: "the CTA should begin appearing in the desktop hero",
  }).toBeGreaterThan(0.5);
  expect((await desktopDevice.boundingBox())?.width).toBeGreaterThan(300);

  await expect.poll(async () => Number(await desktopCta.evaluate((element) => getComputedStyle(element).opacity)), {
    message: "the CTA should finish appearing as the morph starts",
  }).toBeGreaterThan(0.95);

  const minimumCombinedOpacity = await page.evaluate(async () => {
    const desktop = document.querySelector<HTMLElement>('[data-web-experience-layer="desktop"]')!;
    const phone = document.querySelector<HTMLElement>('[data-web-experience-layer="phone"]')!;
    const nextFrame = () => new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
    let minimum = 1;

    while (Number(getComputedStyle(phone).opacity) < 0.99) {
      const desktopOpacity = Number(getComputedStyle(desktop).opacity);
      const phoneOpacity = Number(getComputedStyle(phone).opacity);
      minimum = Math.min(minimum, 1 - (1 - desktopOpacity) * (1 - phoneOpacity));
      await nextFrame();
    }

    return minimum;
  });

  expect(minimumCombinedOpacity).toBeGreaterThan(0.7);
  await expect(phoneLayer).toHaveCSS("opacity", "1");
  await expect(phoneCta).toBeVisible();
});

test("starts the phone morph as soon as the desktop build finishes", async ({ page }) => {
  await page.goto("/services/websites-apps", { waitUntil: "commit" });

  const timing = await page.evaluate(async () => {
    const nextFrame = () => new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
    let device = document.querySelector('[data-web-experience-layer="desktop"] [data-web-experience-device]');
    let cta = document.querySelector('[data-web-experience-layer="desktop"] [data-web-experience-part="cta"]');
    while (!device || !cta) {
      await nextFrame();
      device = document.querySelector('[data-web-experience-layer="desktop"] [data-web-experience-device]');
      cta = document.querySelector('[data-web-experience-layer="desktop"] [data-web-experience-part="cta"]');
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
    const nextFrame = () => new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
    let desktopLayer = document.querySelector<HTMLElement>('[data-web-experience-layer="desktop"]');
    let phoneLayer = document.querySelector<HTMLElement>('[data-web-experience-layer="phone"]');
    let desktopDevice = desktopLayer?.querySelector("[data-web-experience-device]");
    let phoneDevice = phoneLayer?.querySelector("[data-web-experience-device]");
    while (!desktopLayer || !phoneLayer || !desktopDevice || !phoneDevice) {
      await nextFrame();
      desktopLayer = document.querySelector<HTMLElement>('[data-web-experience-layer="desktop"]');
      phoneLayer = document.querySelector<HTMLElement>('[data-web-experience-layer="phone"]');
      desktopDevice = desktopLayer?.querySelector("[data-web-experience-device]");
      phoneDevice = phoneLayer?.querySelector("[data-web-experience-device]");
    }

    const frames: Array<{
      desktop: { x: number; y: number; width: number; height: number };
      phone: { x: number; y: number; width: number; height: number };
      combinedOpacity: number;
    }> = [];
    const startedAt = performance.now();
    let reachedDesktop = false;

    while (performance.now() - startedAt < 7_000) {
      const desktop = desktopDevice.getBoundingClientRect();
      const phone = phoneDevice.getBoundingClientRect();
      if (desktop.width > 400) reachedDesktop = true;
      if (reachedDesktop && desktop.width < 400) {
        const desktopOpacity = Number(getComputedStyle(desktopLayer).opacity);
        const phoneOpacity = Number(getComputedStyle(phoneLayer).opacity);
        frames.push({
          desktop: { x: desktop.x, y: desktop.y, width: desktop.width, height: desktop.height },
          phone: { x: phone.x, y: phone.y, width: phone.width, height: phone.height },
          combinedOpacity: 1 - (1 - desktopOpacity) * (1 - phoneOpacity),
        });
      }
      if (frames.length > 20 && desktop.width < 190) break;
      await nextFrame();
    }

    let largestLayerMismatch = 0;
    for (const current of frames) {
      largestLayerMismatch = Math.max(
        largestLayerMismatch,
        Math.abs(current.desktop.x - current.phone.x),
        Math.abs(current.desktop.y - current.phone.y),
        Math.abs(current.desktop.width - current.phone.width),
        Math.abs(current.desktop.height - current.phone.height),
      );
    }

    const animatedProperties = [desktopLayer, phoneLayer].flatMap((layer) => layer.getAnimations({ subtree: true }).flatMap((animation) => {
      const keyframes = (animation.effect as KeyframeEffect | null)?.getKeyframes() ?? [];
      return keyframes.flatMap((keyframe) => Object.keys(keyframe));
    })).filter((property) => !["offset", "computedOffset", "easing", "composite"].includes(property));

    return { animatedProperties: [...new Set(animatedProperties)].sort(), frames, largestLayerMismatch };
  });

  expect(result.frames.length).toBeGreaterThan(20);
  expect(result.largestLayerMismatch).toBeLessThan(2);
  expect(result.animatedProperties).toEqual(["opacity", "transform"]);
  expect(Math.min(...result.frames.map(({ combinedOpacity }) => combinedOpacity))).toBeGreaterThan(0.7);
});

test("centers the URL vertically in the desktop and phone browser bars", async ({ page }) => {
  const measureCenterOffset = (variant: "desktop" | "phone") => page.evaluate((sceneVariant) => {
    const layer = document.querySelector(`[data-web-experience-layer="${sceneVariant}"]`)!;
    const device = layer.querySelector("[data-web-experience-device]")!.getBoundingClientRect();
    const divider = layer.querySelector("[data-web-experience-divider]")!.getBoundingClientRect();
    const url = layer.querySelector("[data-web-experience-url]")!.getBoundingClientRect();
    return Math.abs((device.top + divider.top) / 2 - (url.top + url.height / 2));
  }, variant);

  await page.goto("/services/websites-apps");
  const desktopLayer = page.locator('[data-web-experience-layer="desktop"]');
  const desktopDevice = desktopLayer.locator("[data-web-experience-device]");
  await expect.poll(async () => (await desktopDevice.boundingBox())?.width ?? 0).toBeGreaterThan(400);
  await expect.poll(async () => Number(await desktopLayer.evaluate((element) => getComputedStyle(element).opacity))).toBeGreaterThan(0.99);
  await expect.poll(() => measureCenterOffset("desktop")).toBeLessThan(1.5);

  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload();
  const phoneLayer = page.locator('[data-web-experience-layer="phone"]');
  const phoneDevice = phoneLayer.locator("[data-web-experience-device]");
  await expect.poll(async () => (await phoneDevice.boundingBox())?.width ?? Number.POSITIVE_INFINITY).toBeLessThan(200);
  await expect.poll(() => measureCenterOffset("phone")).toBeLessThan(1.5);
});

test("keeps the inquiry CTA at full scale in the phone layout", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/services/websites-apps");

  const phoneLayer = page.locator('[data-web-experience-layer="phone"]');
  const cta = phoneLayer.locator('[data-web-experience-part="cta"]');
  const ctaLabel = phoneLayer.locator("[data-web-experience-cta-label]");
  const ctaBackground = phoneLayer.locator("[data-web-experience-cta-bg]");
  const device = phoneLayer.locator("[data-web-experience-device]");
  const primaryLine = phoneLayer.locator('[data-web-experience-part="primary-line"]');
  const image = phoneLayer.locator('[data-web-experience-part="image"]');
  const notch = phoneLayer.locator("[data-web-experience-notch]");
  const homeIndicator = phoneLayer.locator("[data-web-experience-home-indicator]");

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
