import { readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";
import { expect, test } from "@playwright/test";

function componentSources(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return componentSources(path);
    return entry.isFile() && path.endsWith(".tsx") ? [path] : [];
  });
}

test("keeps editorial typography on documented semantic roles", () => {
  const root = join(process.cwd(), "src", "components");
  const exceptions = [join(root, "offer-animations"), join(root, "brand-mark.tsx")];
  const arbitraryType = /(?:text-\[(?:clamp\(|calc\(|-?(?:\d|\.)+(?:px|rem|em|vw|vh))|leading-\[|tracking-\[|font-\[\d)/g;
  const violations = componentSources(root)
    .filter((path) => !exceptions.some((exception) => path.startsWith(exception)))
    .flatMap((path) => {
      const matches = readFileSync(path, "utf8").match(arbitraryType) ?? [];
      return matches.map((match) => `${relative(process.cwd(), path)}: ${match}`);
    });

  expect(violations).toEqual([]);
});

test("keeps editorial spacing and surfaces on documented semantic roles", () => {
  const root = join(process.cwd(), "src", "components");
  const exceptions = [join(root, "offer-animations")];
  const rules = [
    { label: "arbitrary spacing", pattern: /(?<![\w-])(?:-?m[trblxy]?|p[trblxy]?|gap(?:-[xy])?)-\[[^\]]+\]/g },
    { label: "raw shadow", pattern: /(?<![\w-])shadow-\[[^\]]+\]/g },
    { label: "raw border color", pattern: /(?<![\w-])border(?:-[trblxy])?-(?:\[[^\]]+\]|white\/\d+)/g },
    { label: "generic or arbitrary radius", pattern: /(?<![\w-])rounded-(?:sm|md|lg|xl|2xl|3xl|\[[^\]]+\])/g },
  ] as const;
  const allowedGeometry = new Set([
    "src/components/brand-mark.tsx: gap-[.035em]",
    "src/components/pages/home-page.tsx: pt-[52px]",
  ]);
  const violations = componentSources(root)
    .filter((path) => !exceptions.some((exception) => path.startsWith(exception)))
    .flatMap((path) => {
      const source = readFileSync(path, "utf8");
      const file = relative(process.cwd(), path).replaceAll("\\", "/");
      return rules.flatMap(({ label, pattern }) => (source.match(pattern) ?? []).map((match) => ({ label, value: `${file}: ${match}` })));
    })
    .filter(({ value }) => !allowedGeometry.has(value))
    .map(({ label, value }) => `${label}: ${value}`);

  expect(violations).toEqual([]);
});

test("resolves the semantic spatial and surface roles in compiled CSS", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/en/services/seo-ai-visibility");

  const mobile = await page.evaluate(() => {
    const opening = document.querySelector<HTMLElement>("main > section");
    const header = document.querySelector<HTMLElement>("header");
    const scopeItem = document.querySelector<HTMLElement>("[data-scope-item]");
    const scopeGrid = document.querySelector<HTMLElement>("[data-scope-grid]");
    const surface = document.querySelector<HTMLElement>("main > section:first-child .shadow-surface");
    const finalSection = document.querySelector<HTMLElement>("main > section:last-child");
    if (!opening || !header || !scopeItem || !scopeGrid || !surface || !finalSection) throw new Error("Missing design-system fixture");
    return {
      openingTop: parseFloat(getComputedStyle(opening).paddingTop),
      headerTop: parseFloat(getComputedStyle(header).top),
      headerLeft: parseFloat(getComputedStyle(header).left),
      cardInset: parseFloat(getComputedStyle(scopeItem).paddingLeft),
      gridBorder: parseFloat(getComputedStyle(scopeGrid).borderTopWidth),
      surfaceShadow: getComputedStyle(surface).boxShadow,
      finalGutter: parseFloat(getComputedStyle(finalSection).paddingLeft),
    };
  });

  expect(mobile).toMatchObject({
    openingTop: 104,
    headerTop: 24,
    headerLeft: 16,
    cardInset: 24,
    gridBorder: 1,
    finalGutter: 24,
  });
  expect(mobile.surfaceShadow).toContain("rgba(0, 0, 0, 0.08) 0px 0px 0px 1px");

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.reload();
  const desktop = await page.locator("main > section").first().locator(":scope > div").evaluate((layout) => {
    const featuredCard = document.querySelector<HTMLElement>(".shadow-accent-surface");
    if (!featuredCard) throw new Error("Missing featured card");
    return {
      layoutMax: parseFloat(getComputedStyle(layout).maxWidth),
      layoutGap: parseFloat(getComputedStyle(layout).columnGap),
      featuredInset: parseFloat(getComputedStyle(featuredCard).paddingLeft),
    };
  });

  expect(desktop).toEqual({ layoutMax: 1200, layoutGap: 96, featuredInset: 40 });
});

for (const [locale, route] of [["German", "/"], ["English", "/en"], ["French", "/fr"]] as const) {
  test(`keeps the ${locale} mobile hierarchy ordered and within the viewport`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(route);

    const selectors = [
      "h1.text-display-lg",
      "h2.text-display-sm",
      "h2.text-heading-lg",
      "h3.text-heading-md",
      "h3.text-heading-sm",
      "p.text-body",
    ];
    const sizes = await Promise.all(selectors.map((selector) => page.locator(selector).first().evaluate((element) => parseFloat(getComputedStyle(element).fontSize))));

    for (let index = 0; index < sizes.length - 1; index += 1) expect(sizes[index]).toBeGreaterThan(sizes[index + 1]!);
    expect(sizes[0]).toBeGreaterThanOrEqual(44);
    expect(sizes[0]).toBeLessThanOrEqual(72);
    expect(sizes[1]).toBeGreaterThanOrEqual(40);
    expect(sizes[1]).toBeLessThanOrEqual(60);
    expect(sizes[2]).toBeGreaterThanOrEqual(32);
    expect(sizes[2]).toBeLessThanOrEqual(40);
    expect(sizes.slice(3)).toEqual([24, 20, 16]);
    const horizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(horizontalOverflow).toBeLessThanOrEqual(1);

    const prefix = route === "/" ? "" : route;
    for (const path of ["/about", "/contact", "/services/seo-ai-visibility"]) {
      await page.goto(`${prefix}${path}`);
      await expect(page.locator("h1.text-display-sm")).toBeVisible();
      const pageOverflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(pageOverflow).toBeLessThanOrEqual(1);
    }
  });
}
