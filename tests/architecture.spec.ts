import { expect, test } from "bun:test";
import { locales } from "../src/i18n/config";
import { servicesContent } from "../src/i18n/services";
import { legalContent, type LegalPageKind } from "../src/i18n/legal-content";
import { budgetOptions } from "../src/lib/contact-options";

test("keeps service identities equivalent across locales", () => {
  const expectedIds = servicesContent.de.services.map(({ id }) => id);

  for (const locale of locales) {
    expect(servicesContent[locale].services.map(({ id }) => id)).toEqual(expectedIds);
  }
});

test("keeps contact budget IDs unique and complete", () => {
  expect(new Set(budgetOptions.map(({ id }) => id)).size).toBe(budgetOptions.length);
  expect(budgetOptions).toHaveLength(5);
});

test("keeps legal page structure equivalent across locales", () => {
  const pageKinds = ["imprint", "privacy"] as const satisfies readonly LegalPageKind[];

  for (const kind of pageKinds) {
    const expectedSectionCount = legalContent.de[kind].sections.length;
    for (const locale of locales) {
      const page = legalContent[locale][kind];
      expect(page.title.length).toBeGreaterThan(0);
      expect(page.intro.length).toBeGreaterThan(0);
      expect(page.sections).toHaveLength(expectedSectionCount);
      expect(page.sections.every(({ title }) => title.length > 0)).toBeTrue();
    }
  }
});

test("keeps localization dictionaries behind server-owned component boundaries", async () => {
  const clientFiles = [
    "src/components/site-header.tsx",
    "src/components/offer-overview.tsx",
    "src/components/contact-form.tsx",
  ] as const;
  const forbiddenRuntimeImports = ["@/lib/i18n", "@/lib/service-catalog", "@/i18n/translations", "@/i18n/services"];

  for (const path of clientFiles) {
    const source = await Bun.file(path).text();
    for (const moduleName of forbiddenRuntimeImports) {
      const runtimeImport = new RegExp(`import\\s+(?!type\\s).*from\\s+[\"']${moduleName.replaceAll("/", "\\/")}[\"']`);
      expect(runtimeImport.test(source), `${path} imports ${moduleName} at runtime`).toBeFalse();
    }
  }
});
