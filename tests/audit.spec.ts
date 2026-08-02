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
