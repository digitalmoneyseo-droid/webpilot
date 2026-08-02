import { expect, test } from "@playwright/test";
import { getOptimizationScene, OPTIMIZATION_FLIGHT_DELAY_MS, OPTIMIZATION_FLIGHT_DURATION_MS, OPTIMIZATION_RESULTS_DELAY_MS, OPTIMIZATION_TYPING_DELAY_MS } from "../src/components/offer-animations/optimization-scene";
import { getOfferCatalog } from "../src/lib/offer-catalog";
import { loadContentRepository } from "../src/lib/content-core.mjs";

test.describe("deep architecture modules", () => {
  test("loads one bilingual FAQ repository with parity", () => {
    const content = loadContentRepository(process.cwd());
    expect(content.faqs.de).toHaveLength(5);
    expect(content.solutionFaqs.en).toHaveLength(5);
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
