import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("localized routes, metadata, and disclosures are complete", async ({ page }) => {
  await page.goto("/work/atlas-growth-platform");
  await expect(page.locator("html")).toHaveAttribute("lang", "de");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  await expect(page.getByText("Ergebnis", { exact: true })).toBeVisible();
  await expect(page.locator('link[hreflang="en"]')).toHaveAttribute("href", /\/en\/work\/atlas-growth-platform/);
  await page.getByRole("link", { name: "Switch to English" }).click();
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
  await expect(page.locator("#site-menu")).toHaveAttribute("aria-hidden", "true");
  await expect(page.locator("#site-menu")).not.toHaveClass(/is-open/);
  await expect(trigger).toBeFocused();
});

test("desktop navigation is always available without a menu trigger", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto("/en");
  await expect(page.locator(".desktop-nav")).toBeVisible();
  await expect(page.locator(".desktop-nav > a")).toHaveCount(3);
  await expect(page.locator(".desktop-services-trigger")).toBeVisible();
  await page.locator(".desktop-services").hover();
  await expect(page.locator(".desktop-megamenu")).toBeVisible();
  const firstServiceLink = page.locator(".megamenu-list > a").first();
  await firstServiceLink.hover();
  await expect(firstServiceLink).toBeVisible();
  await expect(page.locator(".desktop-megamenu")).toBeVisible();
  await expect(page.locator(".header-menu")).toBeHidden();
});

test("desktop services disclosure exposes and manages its state", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto("/en");
  const trigger = page.locator(".desktop-services-trigger");
  const menu = page.locator("#desktop-services-menu");

  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await expect(menu).toHaveAttribute("aria-hidden", "true");
  await trigger.click();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await expect(menu).toHaveAttribute("aria-hidden", "false");

  await page.locator("main").click({ position: { x: 10, y: 100 } });
  await expect(trigger).toHaveAttribute("aria-expanded", "false");

  await trigger.focus();
  await page.keyboard.press("ArrowDown");
  await expect(menu.locator("a").first()).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await expect(trigger).toBeFocused();
});

test("FAQ and filters expose accessible state", async ({ page }) => {
  await page.goto("/en");
  const firstFaq = page.locator("[data-faq] button").first();
  const firstAnswer = page.locator("[data-faq] .faq-answer").first();
  const secondFaq = page.locator("[data-faq] button").nth(1);
  const secondAnswer = page.locator("[data-faq] .faq-answer").nth(1);
  await expect(secondAnswer).toHaveAttribute("aria-hidden", "true");
  await expect(secondAnswer).toHaveCSS("transition-property", "grid-template-rows");
  await secondFaq.click();
  await expect(secondFaq).toHaveAttribute("aria-expanded", "true");
  await expect(secondAnswer).toHaveAttribute("aria-hidden", "false");
  await expect(firstFaq).toHaveAttribute("aria-expanded", "false");
  await expect(firstAnswer).toHaveAttribute("aria-hidden", "true");
  await page.goto("/en/work");
  const automateFilter = page.getByRole("button", { name: "Automate", exact: true });
  await automateFilter.click();
  await expect(automateFilter).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator('[data-project]:not([hidden])')).toHaveCount(3);
  await expect(page.locator("[data-result-count]")).toContainText("3 projects");
  const buildFilter = page.getByRole("button", { name: "Build", exact: true });
  await buildFilter.click();
  await expect(buildFilter).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator('[data-project]:not([hidden])')).toHaveCount(4);
});

test("contact page presents project enquiry form", async ({ page }) => {
  await page.goto("/en/contact");
  const form = page.locator("form[data-contact-form]");
  const submitButton = page.locator("[data-submit-button]");

  await expect(form).toBeVisible();
  await page.locator('input[name="name"]').fill("Ada Lovelace");
  await page.locator('input[name="email"]').fill("ada@example.com");
  await page.locator('textarea[name="brief"]').fill("A sufficiently detailed project brief.");

  await submitButton.click();
  await expect(page.locator("[data-form-status]")).toHaveText("Choose at least one area of interest.");
  await expect(submitButton).toBeEnabled();
  await expect(submitButton).toHaveAttribute("data-state", "idle");

  const firstInterest = page.locator('input[name="interests"]').first();
  await firstInterest.locator("..").click();
  await expect(firstInterest).toBeChecked();
  await form.evaluate((element) => element.addEventListener("submit", (event) => event.preventDefault()));
  await submitButton.click();

  await expect(submitButton).toHaveAttribute("data-state", "submitting");
  await expect(submitButton).toBeDisabled();
  await expect(submitButton).toHaveAttribute("aria-busy", "true");
  await expect(submitButton.locator(".form-submit__pending")).toHaveText("Sending…");
});

test("portfolio ribbon loops at narrow viewport widths without overflowing the page", async ({ page }) => {
  for (const width of [320, 375, 425]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/en");

    const firstCard = page.locator(".work-ribbon .project-card").first();
    const bounds = await firstCard.boundingBox();
    expect((bounds?.width ?? 0) + 32).toBeLessThanOrEqual(width + 0.1);
    await expect(page.locator('.work-ribbon-group[aria-hidden="true"]').first()).toHaveCSS("display", "flex");
    await expect(page.locator(".work-ribbon-track")).not.toHaveCSS("transform", "none");
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
  }
});

test("portfolio ribbon keeps moving and supports drag scrolling", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/en");

  const ribbon = page.locator("[data-work-ribbon]");
  const track = page.locator(".work-ribbon-track");
  const card = ribbon.locator(".project-card").first();
  await expect(ribbon).toHaveCSS("overflow-x", "hidden");
  await expect(ribbon).toHaveCSS("user-select", "none");
  const initialTransform = await track.evaluate((element) => element.style.transform);

  const bounds = await card.boundingBox();
  if (!bounds) throw new Error("Portfolio card is not visible");
  await page.mouse.move(bounds.x + bounds.width / 2, bounds.y + bounds.height / 2);
  await page.mouse.down();
  await page.mouse.move(bounds.x + bounds.width / 2 - 100, bounds.y + bounds.height / 2);
  await page.mouse.up();

  const leftDragTransform = await track.evaluate((element) => element.style.transform);
  expect(leftDragTransform).not.toBe(initialTransform);

  await page.mouse.move(bounds.x + bounds.width / 2, bounds.y + bounds.height / 2);
  await page.mouse.down();
  await page.mouse.move(bounds.x + bounds.width / 2 + 100, bounds.y + bounds.height / 2);
  await page.mouse.up();
  const rightDragTransform = await track.evaluate((element) => element.style.transform);
  expect(rightDragTransform).not.toBe(leftDragTransform);

  await page.waitForTimeout(100);
  expect(await track.evaluate((element) => element.style.transform)).not.toBe(rightDragTransform);

  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.waitForTimeout(100);
  await card.click();
  await expect(page).toHaveURL(/\/en\/work\//);
});

test("service discovery separates the slogan from concrete service categories", async ({ page }) => {
  await page.goto("/en");

  const buildCard = page.locator(".service-card--build");
  const growCard = page.locator(".service-card--grow");
  const automateCard = page.locator(".service-card--automate");

  await expect(buildCard).not.toHaveAttribute("href", /.+/);
  await expect(growCard).not.toHaveAttribute("href", /.+/);
  await expect(automateCard).not.toHaveAttribute("href", /.+/);
  await expect(page.locator(".service-card-services")).toHaveCount(0);
  await expect(page.locator(".service-category-section .service-category")).toHaveCount(4);

  await page.goto("/services");
  await expect(page.locator(".page-main--services")).toBeVisible();
  await expect(page.locator(".service-category")).toHaveCount(4);
});

test("new Build service routes render and the retired route redirects", async ({ page }) => {
  for (const slug of ["branding-identity", "website-design-development", "app-design-development"]) {
    await page.goto(`/en/services/${slug}`);
    await expect(page.locator("main h1")).toBeVisible();
    await page.goto(`/services/${slug}`);
    await expect(page.locator("main h1")).toBeVisible();
  }

  await page.goto("/en/services/brand-web-product");
  await expect(page).toHaveURL(/\/en\/services\/website-design-development\/?$/);
  await page.goto("/services/brand-web-product");
  await expect(page).toHaveURL(/\/services\/website-design-development\/?$/);
});

test("representative page has no serious accessibility violations", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/en");
  const results = await new AxeBuilder({ page }).exclude(".project-visual").analyze();
  expect(results.violations.filter((violation) => ["serious", "critical"].includes(violation.impact ?? ""))).toEqual([]);

});
