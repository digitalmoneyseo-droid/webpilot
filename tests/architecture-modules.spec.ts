import { expect, test } from "@playwright/test";
import { getOptimizationScene, OPTIMIZATION_FLIGHT_DELAY_MS, OPTIMIZATION_FLIGHT_DURATION_MS, OPTIMIZATION_RESULTS_DELAY_MS, OPTIMIZATION_TYPING_DELAY_MS } from "../src/components/offer-animations/optimization-scene";
import { locales } from "../src/i18n/config";
import { getServiceCatalog } from "../src/lib/service-catalog";
import { loadContentRepository } from "../src/lib/content-core.mjs";

test.describe("deep architecture modules", () => {
  test("loads every configured FAQ locale with parity", () => {
    const content = loadContentRepository(process.cwd());
    for (const locale of locales) expect(content.faqs[locale]).toHaveLength(5);
  });

  test("keeps service policy attached to stable identity", () => {
    const german = getServiceCatalog("de");
    const english = getServiceCatalog("en");
    expect(german.map(({ id }) => id)).toEqual(["websites-apps", "seo-ai-visibility", "paid-campaigns", "ai-automation"]);
    expect(english.map(({ id }) => id)).toEqual(german.map(({ id }) => id));
    expect(german.find(({ id }) => id === "ai-automation")).toMatchObject({ href: "/services/ai-automation", reverse: true, animation: { type: "automation" } });
    expect(english.find(({ id }) => id === "seo-ai-visibility")).toMatchObject({ href: "/en/services/seo-ai-visibility", reverse: true, animation: { type: "optimization" } });
    expect(english.find(({ id }) => id === "paid-campaigns")).toMatchObject({ animation: { type: "campaign" } });
    for (const catalog of [german, english]) {
      for (const service of catalog) {
        expect(service.copy.page.scopeGroups).toHaveLength(6);
        for (const group of service.copy.page.scopeGroups) {
          expect(group.copy.length).toBeGreaterThan(40);
          expect(group.items).toHaveLength(4);
        }
      }
    }
    expect(english[0]?.copy.page.scopeGroups.map(({ title }) => title)).toEqual([
      "Marketing websites",
      "Landing pages",
      "E-commerce experiences",
      "Applications & customer portals",
      "Content platforms",
      "Form & booking experiences",
    ]);
    expect(english.find(({ id }) => id === "paid-campaigns")?.copy.page.scopeGroups[4]?.title).toBe("Campaign journeys & CRO");
    expect(german.find(({ id }) => id === "paid-campaigns")?.copy.page.scopeGroups[4]?.title).toBe("Kampagnenpfade & CRO");
  });

  test("derives the Optimization scene from one deterministic timeline", () => {
    const queryLength = 20;
    const flightStart = queryLength * OPTIMIZATION_TYPING_DELAY_MS + OPTIMIZATION_RESULTS_DELAY_MS + OPTIMIZATION_FLIGHT_DELAY_MS;
    expect(getOptimizationScene(0, queryLength)).toEqual({ typedLength: 0, resultsVisible: false, flightStarted: false, rank: 20, complete: false });
    expect(getOptimizationScene(flightStart, queryLength)).toMatchObject({ typedLength: queryLength, resultsVisible: true, flightStarted: true, rank: 20 });
    expect(getOptimizationScene(flightStart + OPTIMIZATION_FLIGHT_DURATION_MS, queryLength)).toEqual({ typedLength: queryLength, resultsVisible: true, flightStarted: true, rank: 1, complete: true });
  });
});
