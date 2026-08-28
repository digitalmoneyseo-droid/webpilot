import { expect, test } from "bun:test";
import { buildContactEmail } from "../src/lib/contact-handler";

test("formats every contact email in German and states the visitor language", () => {
  const email = buildContactEmail({
    name: "Alex Example",
    email: "alex@example.com",
    company: "Example Ltd.",
    companyUrl: "https://example.com",
    serviceId: "seo-ai-visibility",
    budgetId: "budget-2",
    message: "We need more visibility in search.",
    locale: "en",
  });

  expect(email.subject).toBe("Projektanfrage: Alex Example");
  expect(email.text).toContain("Sprache: Englisch (en)");
  expect(email.text).toContain("Unternehmensname: Example Ltd.");
  expect(email.text).toContain("Wobei können wir helfen?: SEO & KI-Sichtbarkeit");
  expect(email.text).toContain("Geplanter Projektrahmen: 5.000 € bis 15.000 €");
  expect(email.text).toContain("Projekt und Ziel:\nWe need more visibility in search.");
  expect(email.text).not.toContain("Project inquiry");
  expect(email.text).not.toContain("Company name");
});
