import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const routeSuffixes = [
  "",
  "/about",
  "/contact",
  "/imprint",
  "/privacy",
  "/services/websites-apps",
  "/services/seo-ai-visibility",
  "/services/paid-campaigns",
  "/services/ai-automation",
] as const;

const localePrefixes = ["", "/en", "/fr"] as const;

async function expectNoHorizontalOverflow(page: Page) {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
}

async function completeContactForm(page: Page) {
  await page.getByLabel("Your name").fill("Alex Morgan");
  await page.getByLabel("Work email").fill("alex@example.com");
  await page.getByLabel("Not sure yet").check();
  await page.getByRole("button", { name: "Planned project range" }).click();
  await page.getByRole("option", { name: "Still open" }).click();
  await page.getByLabel("What are you trying to achieve?").fill("We need help deciding which digital project should come first for our team.");
}

test("renders every public route in every locale", async ({ page }) => {
  test.setTimeout(60_000);
  const pageErrors: string[] = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));

  for (const prefix of localePrefixes) {
    for (const suffix of routeSuffixes) {
      const route = `${prefix}${suffix}` || "/";
      await test.step(route, async () => {
        pageErrors.length = 0;
        const response = await page.goto(route);
        expect(response?.ok()).toBeTruthy();
        await expect(page.locator("h1")).toHaveCount(1);
        await expect(page.locator("h1")).toBeVisible();
        expect(pageErrors).toEqual([]);
      });
    }
  }
});

test("returns a localized 404 for unknown routes", async ({ page }) => {
  const cases = [
    { route: "/missing-page", heading: "Seite nicht gefunden." },
    { route: "/en/missing-page", heading: "Page not found." },
    { route: "/fr/missing-page", heading: "Page introuvable." },
  ] as const;

  for (const { route, heading } of cases) {
    await test.step(route, async () => {
      const response = await page.goto(route);
      expect(response?.status()).toBe(404);
      await expect(page.getByRole("heading", { level: 1, name: heading })).toBeVisible();
    });
  }
});

test("sends the site security headers", async ({ request }) => {
  const response = await request.get("/en/about");

  expect(response.headers()["strict-transport-security"]).toBe("max-age=31536000");
  expect(response.headers()["x-content-type-options"]).toBe("nosniff");
  expect(response.headers()["x-frame-options"]).toBe("SAMEORIGIN");
  expect(response.headers()["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  expect(response.headers()["permissions-policy"]).toBe("camera=(), microphone=(), geolocation=(), browsing-topics=()");
  expect(response.headers()["x-powered-by"]).toBeUndefined();
});

test("keeps mobile navigation keyboard-accessible and within the viewport", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  await expect(page.locator("[data-reveal]").first()).toHaveClass(/is-visible/);
  await expectNoHorizontalOverflow(page);

  const opener = page.locator('button[aria-controls="site-menu"]');
  await opener.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("#site-menu")).toHaveAttribute("aria-hidden", "false");
  await page.keyboard.press("Escape");
  await expect(page.locator("#site-menu")).toHaveAttribute("aria-hidden", "true");
  await expect(opener).toBeFocused();

  await page.keyboard.press("Enter");
  await page.locator('#site-menu a[href="/contact"]').click();
  await expect(page).toHaveURL(/\/contact$/);
  await expectNoHorizontalOverflow(page);
});

test("validates and submits the contact form", async ({ page }) => {
  await page.goto("/en/contact");
  await page.getByRole("button", { name: "Send project enquiry" }).click();
  await expect(page.locator("form [role='alert']")).toHaveCount(5);
  await expect(page.locator("#contact-name")).toBeFocused();

  await page.route("**/api/contact", (route) => route.fulfill({
    status: 200,
    contentType: "application/json",
    body: JSON.stringify({ ok: true }),
  }));
  await completeContactForm(page);
  await page.getByRole("button", { name: "Send project enquiry" }).click();

  await expect(page.getByRole("heading", { name: "Thanks, your enquiry has arrived." })).toBeVisible();
  await expect(page.getByText("alex@example.com")).toBeVisible();
});

test("keeps the email fallback when contact delivery fails", async ({ page }) => {
  await page.route("**/api/contact", (route) => route.fulfill({
    status: 503,
    contentType: "application/json",
    body: JSON.stringify({ error: "unavailable" }),
  }));
  await page.goto("/en/contact");
  await completeContactForm(page);
  await page.getByRole("button", { name: "Send project enquiry" }).click();

  await expect(page.locator("form").getByRole("alert")).toContainText("digitalmoneyseo@gmail.com");
  await expect(page.getByRole("button", { name: "Send project enquiry" })).toBeEnabled();
});

test("returns a controlled error when contact email is not configured", async ({ request }) => {
  const response = await request.post("/api/contact", {
    data: {
      name: "Runtime check",
      email: "runtime@example.com",
      company: "",
      companyUrl: "",
      message: "This verifies the Bun production contact route without sending email.",
      locale: "en",
      service: "not-sure",
      budget: "budget-5",
      website: "",
    },
  });

  expect(response.status()).toBe(503);
  await expect(response.json()).resolves.toEqual({ error: "Email service unavailable" });
});

test("keeps representative pages accessible with reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });

  for (const route of ["/", "/en/contact"] as const) {
    await test.step(route, async () => {
      await page.goto(route);
      const results = await new AxeBuilder({ page }).exclude('[aria-hidden="true"]').analyze();
      expect(results.violations).toEqual([]);
    });
  }
});
