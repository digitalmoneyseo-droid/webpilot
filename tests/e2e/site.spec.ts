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

test("concept mode collects no contact data", async ({ page }) => {
  await page.goto("/en/contact");
  await expect(page.locator("form")).toHaveCount(0);
  await expect(page.getByText("The contact form is not active yet.")).toBeVisible();
});

test("portfolio ribbon loops at narrow viewport widths without overflowing the page", async ({ page }) => {
  for (const width of [320, 375, 425]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/en");

    const firstCard = page.locator(".work-ribbon .project-card").first();
    const bounds = await firstCard.boundingBox();
    expect((bounds?.width ?? 0) + 32).toBeLessThanOrEqual(width + 0.1);
    await expect(page.locator('.work-ribbon-group[aria-hidden="true"]')).toHaveCSS("display", "flex");
    await expect(page.locator(".work-ribbon-track")).toHaveCSS("animation-name", "work-ribbon-scroll");
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
  }
});

test("service discovery is grouped into localized Build, Grow, and Automate pillars", async ({ page }) => {
  await page.goto("/en");

  const buildCard = page.locator(".service-card--build");
  const growCard = page.locator(".service-card--grow");
  const automateCard = page.locator(".service-card--automate");

  await expect(buildCard).toHaveAttribute("href", "/en/services#build");
  await expect(growCard).toHaveAttribute("href", "/en/services#grow");
  await expect(automateCard).toHaveAttribute("href", "/en/services#automate");
  await expect(buildCard.locator("li")).toHaveText(["Branding & identity", "Website design & development", "App design & development"]);
  await expect(growCard.locator("li")).toHaveText(["SEO & AI search", "Content & social", "Paid acquisition", "Analytics & CRO"]);
  await expect(automateCard.locator("li")).toHaveText(["AI & automation"]);

  await growCard.click();
  await expect(page).toHaveURL(/\/en\/services#grow$/);
  await expect(page.locator("#grow")).toBeVisible();
  await expect(page.locator(".service-pillar")).toHaveCount(3);
  await expect(page.locator("#build .service-link-grid > a")).toHaveCount(3);
  await expect(page.locator("#grow .service-link-grid > a")).toHaveCount(4);
  await expect(page.locator("#automate .service-link-grid > a")).toHaveCount(1);
  await expect(page.getByText("Optimize", { exact: true })).toHaveCount(0);
  await expect(page.getByText("Brand, web & product", { exact: true })).toHaveCount(0);

  await page.goto("/services");
  await expect(page.locator("#build h2")).toHaveText("Aufbauen");
  await expect(page.locator("#grow h2")).toHaveText("Wachsen");
  await expect(page.locator("#automate h2")).toHaveText("Automatisieren");
});

test("new Build service routes render and the retired route redirects", async ({ page }) => {
  for (const slug of ["branding-identity", "website-design-development", "app-design-development"]) {
    await page.goto(`/en/services/${slug}`);
    await expect(page.locator("main h1")).toBeVisible();
    await page.goto(`/services/${slug}`);
    await expect(page.locator("main h1")).toBeVisible();
  }

  await page.goto("/en/services/brand-web-product");
  await expect(page).toHaveURL(/\/en\/services#build$/);
  await page.goto("/services/brand-web-product");
  await expect(page).toHaveURL(/\/services#build$/);
});

test("representative page has no serious accessibility violations", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/en");
  const results = await new AxeBuilder({ page }).exclude(".project-visual").analyze();
  expect(results.violations.filter((violation) => ["serious", "critical"].includes(violation.impact ?? ""))).toEqual([]);

  await page.goto("/en/services");
  const servicesResults = await new AxeBuilder({ page }).analyze();
  expect(servicesResults.violations.filter((violation) => ["serious", "critical"].includes(violation.impact ?? ""))).toEqual([]);
});
