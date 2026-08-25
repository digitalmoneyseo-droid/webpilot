import { expect, test } from "bun:test";

const identityConsumers = [
  "src/components/site-header.tsx",
  "src/components/contact-form.tsx",
  "src/components/pages/service-page.tsx",
] as const;

const identityTokens = [
  "service-websites-bg",
  "service-websites-fg",
  "service-search-bg",
  "service-search-fg",
  "service-campaigns-bg",
  "service-campaigns-fg",
  "service-automation-bg",
  "service-automation-fg",
] as const;

test("keeps the service identity palette owned by design tokens", async () => {
  const themeSource = await Bun.file("src/styles/theme.css").text();
  const consumerSource = (await Promise.all(identityConsumers.map((path) => Bun.file(path).text()))).join("\n");

  for (const token of identityTokens) {
    expect(themeSource).toContain(`--color-${token}:`);
    expect(consumerSource).toContain(token);
  }

  expect(consumerSource.match(/#[0-9a-f]{6}/gi) ?? []).toEqual([]);
});

const publicThemeTokens = [
  "color-canvas",
  "color-ink",
  "color-muted",
  "color-subtle",
  "color-highlight",
  "text-meta",
  "text-ui",
  "text-lead",
  "text-heading-lg",
  "text-display-lg",
  "breakpoint-narrow",
  "breakpoint-compact",
  "breakpoint-nav",
  "breakpoint-wide",
] as const;

const removedTypeUtilities = [
  "text-caption",
  "text-mono-meta",
  "text-small",
  "text-control",
  "text-label",
  "text-navigation",
  "text-card-body",
  "text-body-lg",
  "text-cta-copy",
  "text-body",
] as const;

test("keeps Tailwind theme variables as the public design-system source", async () => {
  const appSource = await Bun.file("src/styles/app.css").text();
  const themeSource = await Bun.file("src/styles/theme.css").text();

  expect(appSource).toContain('@import "./theme.css";');
  expect(appSource).not.toContain("typography-system.css");
  expect(themeSource).not.toContain("--ds-");

  for (const token of publicThemeTokens) {
    expect(themeSource).toContain(`--${token}:`);
  }
});

test("keeps removed typography aliases out of components", async () => {
  const componentPaths = Array.fromAsync(new Bun.Glob("src/components/**/*.tsx").scan());
  const componentSource = (await Promise.all((await componentPaths).map((path) => Bun.file(path).text()))).join("\n");

  for (const utility of removedTypeUtilities) {
    expect(componentSource).not.toMatch(new RegExp(`\\b${utility}\\b`));
  }

  expect(componentSource).not.toContain("var(--ds-");
});
