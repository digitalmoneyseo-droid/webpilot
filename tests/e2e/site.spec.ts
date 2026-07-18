import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("localized routes, metadata, and disclosures are complete", async ({ page }) => {
  await page.goto("/work/atlas-growth-platform");
  await expect(page.locator("html")).toHaveAttribute("lang", "de");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  await expect(page.getByText("Konzept-Ergebnis")).toBeVisible();
  await expect(page.locator('link[hreflang="en"]')).toHaveAttribute("href", /\/en\/work\/atlas-growth-platform/);
  await page.locator(".header-language").click();
  await expect(page).toHaveURL(/\/en\/work\/atlas-growth-platform/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
});

test("navigation traps focus, closes with Escape, and restores focus", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/en");
  const trigger = page.locator(".header-menu");
  await trigger.focus();
  await trigger.click();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#site-menu")).toHaveAttribute("aria-hidden", "false");
  await page.keyboard.press("Escape");
  await expect(page.locator("#site-menu")).toHaveClass(/is-closing/);
  await expect(page.locator("#site-menu")).not.toHaveClass(/is-closing/);
  await expect(trigger).toBeFocused();
});

test("desktop navigation is always available without a menu trigger", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto("/en");
  await expect(page.locator(".desktop-nav")).toBeVisible();
  await expect(page.locator(".desktop-nav a")).toHaveCount(5);
  await expect(page.locator(".header-menu")).toBeHidden();
});

test("FAQ and filters expose accessible state", async ({ page }) => {
  await page.goto("/en");
  const secondFaq = page.locator("[data-faq] button").nth(1);
  const secondAnswer = page.locator("[data-faq] .faq-answer").nth(1);
  await expect(secondAnswer).toHaveAttribute("aria-hidden", "true");
  await expect(secondAnswer).toHaveCSS("transition-property", "grid-template-rows");
  await secondFaq.click();
  await expect(secondFaq).toHaveAttribute("aria-expanded", "true");
  await expect(secondAnswer).toHaveAttribute("aria-hidden", "false");
  await page.goto("/en/work");
  await page.getByRole("button", { name: "AI", exact: true }).click();
  await expect(page.locator("[data-result-count]")).toContainText("projects");
  await expect(page.locator('[data-project]:not([hidden])')).toHaveCount(2);
  const allFilter = page.getByRole("button", { name: "All", exact: true });
  await allFilter.click();
  await expect(allFilter).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator('[data-project]:not([hidden])')).toHaveCount(8);
  await expect(page.locator("[data-result-count]")).toContainText("8 projects");
});

test("concept mode collects no contact data", async ({ page }) => {
  await page.goto("/en/contact");
  await expect(page.locator("form")).toHaveCount(0);
  await expect(page.getByText("The contact form is not active yet.")).toBeVisible();
});

test("portfolio ribbon stays aligned at narrow viewport widths", async ({ page }) => {
  for (const width of [320, 375, 425]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/en");

    const firstCard = page.locator(".work-ribbon .project-card").first();
    const bounds = await firstCard.boundingBox();
    expect(bounds?.x).toBe(16);
    expect((bounds?.width ?? 0) + 32).toBeLessThanOrEqual(width);
    await expect(page.locator('.work-ribbon-group[aria-hidden="true"]')).toHaveCSS("display", "none");
    await expect(page.locator(".work-ribbon-track")).toHaveCSS("animation-name", "none");
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
  }
});

test("representative page has no serious accessibility violations", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/en");
  const results = await new AxeBuilder({ page }).exclude(".project-visual").analyze();
  expect(results.violations.filter((violation) => ["serious", "critical"].includes(violation.impact ?? ""))).toEqual([]);
});
