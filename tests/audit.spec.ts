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

  test("switches between German and English work pages", async ({ page }) => {
    await page.goto("/work");
    await page.getByRole("link", { name: "Switch to English" }).click();
    await expect(page).toHaveURL(/\/en\/work$/);
    await page.getByRole("link", { name: "Auf Deutsch wechseln" }).click();
    await expect(page).toHaveURL(/\/work$/);
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

test.describe("work browsing", () => {
  for (const width of [320, 375, 390, 768, 1440]) {
    test(`keeps the filter deep link and exposes all controls at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 720 });
      await page.goto("/work?filter=automate");
      const automate = page.getByRole("button", { name: "Automatisieren" });
      await expect(automate).toHaveAttribute("aria-pressed", "true");
      await automate.scrollIntoViewIfNeeded();
      const box = await automate.boundingBox();
      expect(box).not.toBeNull();
      expect(box!.x).toBeGreaterThanOrEqual(0);
      expect(box!.x + box!.width).toBeLessThanOrEqual(width);
      await page.getByRole("button", { name: "Alle" }).click();
      await expect(page).toHaveURL(/\/work\?filter=all$/);
    });
  }

  test("keeps the English filter deep link at 320px", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 720 });
    await page.goto("/en/work?filter=automate");
    const automate = page.getByRole("button", { name: "Automate" });
    await expect(automate).toHaveAttribute("aria-pressed", "true");
    await automate.scrollIntoViewIfNeeded();
    const box = await automate.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.x).toBeGreaterThanOrEqual(0);
    expect(box!.x + box!.width).toBeLessThanOrEqual(320);
  });

  test("does not navigate after a ribbon drag and allows the next click", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(2500);
    const pauseToggle = page.locator("[data-ribbon-toggle]");
    const clickPauseToggle = async () => {
      const toggleBox = await pauseToggle.boundingBox();
      expect(toggleBox).not.toBeNull();
      await page.mouse.click(toggleBox!.x + toggleBox!.width / 2, toggleBox!.y + toggleBox!.height / 2);
    };
    await pauseToggle.focus();
    await page.keyboard.press("Enter");
    await expect(pauseToggle).toHaveAttribute("aria-pressed", "true");
    await expect(pauseToggle).toHaveAttribute("aria-label", "Portfolio fortsetzen");
    await page.keyboard.press("Enter");
    await expect(pauseToggle).toHaveAttribute("aria-pressed", "false");
    await clickPauseToggle();
    const links = page.locator(".work-ribbon a");
    const first = links.first();
    await expect(first).toHaveAttribute("aria-label", /Projekt ansehen/);
    await first.scrollIntoViewIfNeeded();
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
      return rect.left >= 0 && rect.right <= window.innerWidth && rect.top >= 0 && rect.bottom <= window.innerHeight;
    }));
    expect(visibleIndex).toBeGreaterThanOrEqual(0);
    await links.nth(visibleIndex).evaluate((element) => (element as HTMLAnchorElement).click());
    await expect(page).toHaveURL(/\/work\//);
  });

  test("does not suppress the next click after a cancelled ribbon drag", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(500);
    const pauseToggle = page.locator("[data-ribbon-toggle]");
    await pauseToggle.focus();
    await page.keyboard.press("Enter");
    await expect(pauseToggle).toHaveAttribute("aria-pressed", "true");
    const links = page.locator(".work-ribbon a");
    const first = links.first();
    await first.scrollIntoViewIfNeeded();
    await first.evaluate((element) => {
      const pointer = { bubbles: true, pointerId: 41, pointerType: "mouse", clientX: 40, clientY: 40, button: 0 };
      element.dispatchEvent(new PointerEvent("pointerdown", pointer));
      element.dispatchEvent(new PointerEvent("pointermove", { ...pointer, clientX: 80 }));
      element.dispatchEvent(new PointerEvent("pointercancel", { ...pointer, clientX: 80 }));
    });
    await first.evaluate((element) => (element as HTMLAnchorElement).click());
    await expect(page).toHaveURL(/\/work\//);
  });

  test("keeps a normal ribbon click navigable", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(500);
    const pauseToggle = page.locator("[data-ribbon-toggle]");
    await pauseToggle.focus();
    await page.keyboard.press("Enter");
    const first = page.locator(".work-ribbon a").first();
    await first.scrollIntoViewIfNeeded();
    const box = await first.boundingBox();
    expect(box).not.toBeNull();
    await page.mouse.click(box!.x + box!.width / 2, box!.y + box!.height / 2);
    await expect(page).toHaveURL(/\/work\//);
  });
});

test.describe("case studies and contact", () => {
  test("uses labels as case-study headings and discloses fictional work", async ({ page }) => {
    await page.goto("/en/work/atlas-growth-platform");
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
    expect(xml).not.toContain("/work/atlas-growth-platform");
    await page.goto("/en/work/atlas-growth-platform");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  });
});
