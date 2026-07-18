import { describe, expect, it } from "vitest";
import worker from "../../src/worker";

describe("legacy service redirects", () => {
  it.each([
    ["https://webpilot.studio/services/brand-web-product", "https://webpilot.studio/services#build"],
    ["https://webpilot.studio/services/brand-web-product/", "https://webpilot.studio/services#build"],
    ["https://webpilot.studio/en/services/brand-web-product", "https://webpilot.studio/en/services#build"],
    ["https://webpilot.studio/en/services/brand-web-product/", "https://webpilot.studio/en/services#build"],
  ])("permanently redirects %s", async (source, destination) => {
    const response = await worker.fetch(new Request(source), {} as never);
    expect(response.status).toBe(301);
    expect(response.headers.get("Location")).toBe(destination);
  });
});
