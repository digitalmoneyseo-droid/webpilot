import { expect, test } from "@playwright/test";
import { getOptimizationScene, OPTIMIZATION_FLIGHT_DELAY_MS, OPTIMIZATION_FLIGHT_DURATION_MS, OPTIMIZATION_RESULTS_DELAY_MS, OPTIMIZATION_TYPING_DELAY_MS } from "../src/components/offer-animations/optimization-scene";
import { getOfferCatalog } from "../src/lib/offer-catalog";
import { loadContentRepository, parseProject } from "../src/lib/content-core.mjs";
import { parseProjectFilter, projectCategoryLabel, projectMatchesFilter } from "../src/lib/portfolio-taxonomy.mjs";

test.describe("deep architecture modules", () => {
  test("loads one bilingual content repository with parity", () => {
    const content = loadContentRepository(process.cwd());
    expect(content.projects.de.map(({ data }) => data.translationKey)).toEqual(content.projects.en.map(({ data }) => data.translationKey));
    expect(content.faqs.de).toHaveLength(5);
    expect(content.solutionFaqs.en).toHaveLength(5);
    expect(() => parseProject({ translationKey: "fixture", locale: "en", slug: "fixture", order: 1, title: "Fixture", shortTitle: "Fixture", summary: "Fixture", categories: ["translated-label"], year: "2026", metric: "1", metricLabel: "Metric", challenge: "Challenge", strategy: "Strategy", execution: "Execution", timeline: "One week", tools: ["Tool"], palette: "blue", visual: "dashboard" }, "fixture.json")).toThrow(/stable Portfolio category IDs/);
  });

  test("owns Portfolio classification and localized labels", () => {
    expect(projectCategoryLabel("de", "growth")).toBe("Wachstum");
    expect(projectCategoryLabel("en", "growth")).toBe("Growth");
    expect(projectMatchesFilter(["brand", "website"], "build")).toBeTruthy();
    expect(projectMatchesFilter(["ai", "automation"], "grow")).toBeFalsy();
    expect(parseProjectFilter("unknown")).toBe("all");
  });

  test("keeps Offer policy attached to stable identity", () => {
    const german = getOfferCatalog("de");
    const english = getOfferCatalog("en");
    expect(german.map(({ id }) => id)).toEqual(["foundation", "optimization", "campaign", "partnership"]);
    expect(english.map(({ id }) => id)).toEqual(german.map(({ id }) => id));
    expect(german.find(({ id }) => id === "partnership")).toMatchObject({ href: "/solutions#partnership", reverse: true, animation: { type: "partnership" } });
    expect(english.find(({ id }) => id === "optimization")).toMatchObject({ href: "/en/solutions", reverse: true, animation: { type: "optimization" } });
  });

  test("derives the Optimization scene from one deterministic timeline", () => {
    const queryLength = 20;
    const flightStart = queryLength * OPTIMIZATION_TYPING_DELAY_MS + OPTIMIZATION_RESULTS_DELAY_MS + OPTIMIZATION_FLIGHT_DELAY_MS;
    expect(getOptimizationScene(0, queryLength)).toEqual({ typedLength: 0, resultsVisible: false, flightStarted: false, rank: 20, complete: false });
    expect(getOptimizationScene(flightStart, queryLength)).toMatchObject({ typedLength: queryLength, resultsVisible: true, flightStarted: true, rank: 20 });
    expect(getOptimizationScene(flightStart + OPTIMIZATION_FLIGHT_DURATION_MS, queryLength)).toEqual({ typedLength: queryLength, resultsVisible: true, flightStarted: true, rank: 1, complete: true });
  });
});
