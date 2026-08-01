import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("localized routes", () => {
  for (const route of ["/", "/en"]) {
    test(`renders an accessible home page at ${route}`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(route);
      await expect(page.locator("h1")).toBeVisible();
      const results = await new AxeBuilder({ page }).exclude('[aria-hidden="true"]').analyze();
      expect(results.violations).toEqual([]);
    });
  }

  test("switches between German and English portfolio pages", async ({ page }) => {
    await page.goto("/portfolio");
    await page.getByRole("link", { name: "Switch to English" }).click();
    await expect(page).toHaveURL(/\/en\/portfolio$/);
    await page.getByRole("link", { name: "Auf Deutsch wechseln" }).click();
    await expect(page).toHaveURL(/\/portfolio$/);
  });

  test("opens and closes the mobile menu with the keyboard", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 720 });
    await page.goto("/");
    const open = page.getByRole("button", { name: "Navigation öffnen" });
    await open.focus();
    await page.keyboard.press("Enter");
    const menu = page.locator("#site-menu");
    await expect(menu).toHaveAttribute("aria-hidden", "false");
    await expect(page.getByRole("button", { name: "Navigation schließen" })).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(menu).toHaveAttribute("aria-hidden", "true");
    await expect(open).toBeFocused();
  });
});

test.describe("portfolio browsing", () => {
  for (const width of [320, 375, 390, 768, 1440]) {
    test(`keeps the filter deep link and exposes all controls at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 720 });
      await page.goto("/portfolio?filter=automate");
      const automate = page.getByRole("button", { name: "Automatisieren" });
      await expect(automate).toHaveAttribute("aria-pressed", "true");
      await automate.scrollIntoViewIfNeeded();
      const box = await automate.boundingBox();
      expect(box).not.toBeNull();
      expect(box!.x).toBeGreaterThanOrEqual(0);
      expect(box!.x + box!.width).toBeLessThanOrEqual(width);
      await page.getByRole("button", { name: "Alle" }).click();
      await expect(page).toHaveURL(/\/portfolio\?filter=all$/);
    });
  }

  test("keeps the English filter deep link at 320px", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 720 });
    await page.goto("/en/portfolio?filter=automate");
    const automate = page.getByRole("button", { name: "Automate" });
    await expect(automate).toHaveAttribute("aria-pressed", "true");
    await automate.scrollIntoViewIfNeeded();
    const box = await automate.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.x).toBeGreaterThanOrEqual(0);
    expect(box!.x + box!.width).toBeLessThanOrEqual(320);
  });

  test("does not navigate after a ribbon drag and allows the next click", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await expect(page.locator("[data-ribbon-toggle]")).toHaveCount(0);
    const links = page.locator(".portfolio-ribbon a");
    const first = links.first();
    await expect(first).toHaveAttribute("aria-label", /Projekt ansehen/);
    await first.evaluate((element) => element.scrollIntoView({ block: "center", behavior: "instant" }));
    const box = await first.boundingBox();
    expect(box).not.toBeNull();
    await page.mouse.move(box!.x + 20, box!.y + 20);
    await page.mouse.down();
    await page.mouse.move(box!.x + 100, box!.y + 20, { steps: 4 });
    await page.mouse.up();
    await expect(page).toHaveURL(/\/$/);
    await page.waitForTimeout(400);
    const visibleIndex = await links.evaluateAll((elements) => elements.findIndex((element) => {
      const rect = element.getBoundingClientRect();
      return rect.right > 0 && rect.left < window.innerWidth && rect.bottom > 0 && rect.top < window.innerHeight;
    }));
    expect(visibleIndex).toBeGreaterThanOrEqual(0);
    await links.nth(visibleIndex).evaluate((element) => (element as HTMLAnchorElement).click());
    await expect(page).toHaveURL(/\/portfolio\//);
  });

  test("does not suppress the next click after a cancelled ribbon drag", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const links = page.locator(".portfolio-ribbon a");
    const first = links.first();
    await expect(first).toBeAttached();
    await first.evaluate((element) => {
      const pointer = { bubbles: true, pointerId: 41, pointerType: "mouse", clientX: 40, clientY: 40, button: 0 };
      element.dispatchEvent(new PointerEvent("pointerdown", pointer));
      element.dispatchEvent(new PointerEvent("pointermove", { ...pointer, clientX: 80 }));
      element.dispatchEvent(new PointerEvent("pointercancel", { ...pointer, clientX: 80 }));
    });
    await first.evaluate((element) => (element as HTMLAnchorElement).click());
    await expect(page).toHaveURL(/\/portfolio\//);
  });

  test("keeps a normal ribbon click navigable", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const first = page.locator(".portfolio-ribbon a").first();
    await expect(first).toBeAttached();
    await first.evaluate((element) => (element as HTMLAnchorElement).click());
    await expect(page).toHaveURL(/\/portfolio\//);
  });

  test("restarts the ribbon animation after a delayed drag", async ({ page }) => {
    await page.goto("/");
    const ribbon = page.locator(".portfolio-ribbon");
    const track = ribbon.locator("[data-ribbon-track]");
    await ribbon.evaluate((element) => element.scrollIntoView({ block: "center", behavior: "instant" }));
    await expect(page.locator("[data-ribbon-toggle]")).toHaveCount(0);

    const first = ribbon.locator("a").first();
    await expect(first).toBeAttached();

    await page.mouse.move(1, 1);
    await page.waitForTimeout(250);
    const box = await first.boundingBox();
    expect(box).not.toBeNull();
    await page.mouse.move(box!.x + 20, box!.y + 20);
    await page.mouse.down();
    await page.mouse.move(box!.x + 110, box!.y + 20, { steps: 4 });
    await page.mouse.up();

    const afterDrag = await track.evaluate((element) => getComputedStyle(element).transform);
    await page.waitForTimeout(300);
    expect(await track.evaluate((element) => getComputedStyle(element).transform)).toBe(afterDrag);

    await page.waitForTimeout(750);
    expect(await track.evaluate((element) => getComputedStyle(element).transform)).not.toBe(afterDrag);
  });

  test("animates card lift and matches the CTA arrow transition", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });

    for (const route of ["/", "/portfolio"]) {
      await page.goto(route);
      const card = page.locator(".project-card").first();
      await expect(card).toBeVisible();
      await card.evaluate((element) => element.scrollIntoView({ block: "center", behavior: "instant" }));
      await page.mouse.move(1, 1);
      await page.waitForTimeout(100);
      const box = await card.boundingBox();
      expect(box).not.toBeNull();
      await page.mouse.move(box!.x + box!.width / 2, box!.y + box!.height / 2);
      await page.waitForTimeout(50);

      const lift = await card.evaluate((element) => {
        const style = getComputedStyle(element);
        return {
          y: new DOMMatrixReadOnly(style.transform).m42,
          transition: style.transition,
          animationCount: element.getAnimations().length,
        };
      });
      expect(lift.transition).toContain("transform 0.25s");
      expect(lift.animationCount).toBeGreaterThan(0);
      expect(lift.y).toBeLessThan(-0.1);
      expect(lift.y).toBeGreaterThan(-5.01);

      if (route === "/portfolio") {
        const arrows = await page.evaluate(() => {
          const cardArrow = document.querySelector<SVGElement>(".project-card__arrow--right");
          const ctaArrow = document.querySelector<SVGElement>(".pill-button .pill-button__arrow--right");
          if (!cardArrow || !ctaArrow) throw new Error("Expected card and CTA arrows");
          const cardStyle = getComputedStyle(cardArrow);
          const ctaStyle = getComputedStyle(ctaArrow);
          return {
            cardTransition: cardStyle.transition,
            ctaTransition: ctaStyle.transition,
            cardOpacity: Number(cardStyle.opacity),
            cardTransform: new DOMMatrixReadOnly(cardStyle.transform).m41,
            cardAnimationCount: cardArrow.getAnimations().length,
          };
        });
        expect(arrows.cardTransition).toBe(arrows.ctaTransition);
        expect(arrows.cardAnimationCount).toBeGreaterThan(0);
        expect(arrows.cardOpacity).toBeGreaterThan(0);
        expect(arrows.cardOpacity).toBeLessThan(1);
        expect(arrows.cardTransform).toBeGreaterThan(0);
        expect(arrows.cardTransform).toBeLessThan(6.01);
      }
    }
  });
});

test.describe("case studies and contact", () => {
  test("uses labels as case-study headings and discloses fictional portfolio content", async ({ page }) => {
    await page.goto("/en/portfolio/atlas-growth-platform");
    await expect(page.locator(".case-hero")).toContainText("fictional concept");
    await expect(page.locator(".case-narrative h2").first()).toContainText("Challenge");
    await expect(page.locator(".case-narrative h2").first()).not.toContainText("We rebuilt");
    await expect(page.locator("main")).toContainText("B2B SaaS Growth Platform");
  });

  test("shows localized contact validation errors", async ({ page }) => {
    await page.goto("/en/contact");
    await page.getByRole("button", { name: "Continue in email" }).click();
    await expect(page.locator("form [role='alert']")).toHaveCount(3);
  });

  test("keeps noindex project pages out of the sitemap", async ({ page, request }) => {
    const sitemap = await request.get("/sitemap.xml");
    expect(sitemap.ok()).toBeTruthy();
    const xml = await sitemap.text();
    expect(xml).not.toContain("/portfolio/atlas-growth-platform");
    await page.goto("/en/portfolio/atlas-growth-platform");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  });
});
