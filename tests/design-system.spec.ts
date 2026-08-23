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
  const tokenSource = await Bun.file("src/styles/typography-system.css").text();
  const themeSource = await Bun.file("src/styles/app.css").text();
  const consumerSource = (await Promise.all(identityConsumers.map((path) => Bun.file(path).text()))).join("\n");

  for (const token of identityTokens) {
    expect(tokenSource).toContain(`--${token}:`);
    expect(themeSource).toContain(`--color-${token}: var(--${token});`);
    expect(consumerSource).toContain(token);
  }

  expect(consumerSource.match(/#[0-9a-f]{6}/gi) ?? []).toEqual([]);
});
