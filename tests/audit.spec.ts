import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("localized routes", () => {
  for (const route of ["/", "/en"]) {
    test(`renders an accessible home page at ${route}`, async ({ page }) => {
      const hydrationErrors: string[] = [];
      page.on("console", (message) => {
        if (message.type() === "error" && message.text().includes("Hydration failed")) hydrationErrors.push(message.text());
      });
      page.on("pageerror", (error) => {
        if (error.message.includes("Hydration failed")) hydrationErrors.push(error.message);
      });
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(route);
      await expect(page.locator("h1")).toBeVisible();
      const results = await new AxeBuilder({ page }).exclude('[aria-hidden="true"]').analyze();
      expect(results.violations).toEqual([]);
      expect(hydrationErrors).toEqual([]);
    });
  }

  for (const route of ["/services/websites-apps", "/en/services/ai-automation"]) {
    test(`renders an accessible service page at ${route}`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(route);
      await expect(page.locator("h1")).toBeVisible();
      const results = await new AxeBuilder({ page }).exclude('[aria-hidden="true"]').analyze();
      expect(results.violations).toEqual([]);
    });
  }

  test("opens the desktop services menu on hover and supports Escape", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/en");
    const button = page.getByRole("button", { name: "Services" });
    await button.hover();
    const menu = page.locator("#services-menu");
    await expect(menu).toHaveAttribute("aria-hidden", "false");
    await expect(menu.getByRole("link", { name: /^SEO & AI Visibility/ })).toBeVisible();
    await button.focus();
    await page.keyboard.press("Escape");
    await expect(menu).toHaveAttribute("aria-hidden", "true");
    await expect(button).toBeFocused();
  });

  test("smoothly scrolls to the top when the active navigation link is selected", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/en/about");
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(0);

    await page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "About us", exact: true }).click();

    await expect(page).toHaveURL(/\/en\/about$/);
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
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

  test("keeps the detailed service catalogue within the mobile viewport", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/en/services/websites-apps");

    const scope = page.locator("[data-service-scope]");
    await expect(scope.getByRole("heading", { name: "What we build" })).toBeVisible();
    await expect(scope.locator("[data-scope-item]")).toHaveCount(6);
    await expect(scope.locator("[data-scope-icon]")).toHaveCount(6);
    const iconColors = await scope.locator("[data-scope-icon]").evaluateAll((elements) => elements.map((element) => {
      const styles = getComputedStyle(element);
      return { background: styles.backgroundColor, foreground: styles.color };
    }));
    expect(new Set(iconColors.map(({ background }) => background)).size).toBe(6);
    expect(new Set(iconColors.map(({ foreground }) => foreground)).size).toBe(6);
    await scope.locator("[data-scope-item]").last().scrollIntoViewIfNeeded();
    await expect(scope.locator("[data-scope-item]").last()).toBeVisible();

    const borderWidths = await scope.locator("[data-scope-grid]").evaluate((element) => {
      const styles = getComputedStyle(element);
      return [styles.borderTopWidth, styles.borderRightWidth, styles.borderBottomWidth, styles.borderLeftWidth];
    });
    expect(borderWidths).toEqual(["1px", "1px", "1px", "1px"]);

    const horizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(horizontalOverflow).toBeLessThanOrEqual(1);
  });

  test("assembles each service row as it enters the viewport", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/en/services/paid-campaigns");

    const scope = page.locator("[data-service-scope]");
    const cards = scope.locator("[data-scope-item]");
    await expect(cards).toHaveCount(6);
    await expect(page.locator("html")).toHaveClass(/reveal-ready/);

    const separated = await cards.evaluateAll((elements) => elements.map((element) => {
      const styles = getComputedStyle(element);
      return { opacity: styles.opacity, transform: styles.transform };
    }));
    expect(separated.map(({ opacity }) => opacity)).toEqual(["0", "0", "0", "0", "0", "0"]);
    expect(new Set(separated.map(({ transform }) => transform)).size).toBeGreaterThan(1);

    const revealRow = async (cardIndex: number) => {
      await cards.nth(cardIndex).evaluate((card) => {
        const bounds = card.getBoundingClientRect();
        const documentTop = bounds.top + window.scrollY;
        window.scrollTo(0, documentTop - (window.innerHeight - bounds.height * 0.75));
      });
    };

    await revealRow(0);
    await expect.poll(() => cards.evaluateAll((elements) => elements.map((element) => getComputedStyle(element).opacity))).toEqual(["1", "1", "0", "0", "0", "0"]);

    await revealRow(2);
    await expect.poll(() => cards.evaluateAll((elements) => elements.map((element) => getComputedStyle(element).opacity))).toEqual(["1", "1", "1", "1", "0", "0"]);

    await revealRow(4);
    await expect.poll(() => cards.evaluateAll((elements) => elements.map((element) => getComputedStyle(element).opacity))).toEqual(["1", "1", "1", "1", "1", "1"]);
  });

  test("expands mobile services with the FAQ disclosure behavior", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 720 });
    await page.goto("/en");
    await page.getByRole("button", { name: "Open navigation" }).click();

    const menu = page.locator("#site-menu");
    const services = menu.getByRole("button", { name: "Services" });
    const servicesPanel = page.locator("#mobile-services-menu");

    await expect(services).toHaveAttribute("aria-expanded", "false");
    await services.click();
    await expect(services).toHaveAttribute("aria-expanded", "true");
    await expect(servicesPanel.getByRole("link", { name: /^Websites & Apps/ })).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(services).toHaveAttribute("aria-expanded", "false");
    await expect(services).toBeFocused();
    await expect(menu).toHaveAttribute("aria-hidden", "false");
  });
});

test.describe("contact", () => {
  test("shows localized contact validation errors", async ({ page }) => {
    await page.goto("/en/contact");
    await page.getByRole("button", { name: "Continue in email" }).click();
    await expect(page.locator("form [role='alert']")).toHaveCount(3);
  });

});
