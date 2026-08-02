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

test.describe("contact", () => {
  test("shows localized contact validation errors", async ({ page }) => {
    await page.goto("/en/contact");
    await page.getByRole("button", { name: "Continue in email" }).click();
    await expect(page.locator("form [role='alert']")).toHaveCount(3);
  });

});
