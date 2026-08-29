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
  expect(email.html).toContain("Neue Projektanfrage");
  expect(email.html).toContain("Kontaktdaten und Rahmen");
  expect(email.html).toContain('<th scope="row"');
  expect(email.html).toContain('href="mailto:alex@example.com"');
  expect(email.html).toContain("We need more visibility in search.");
});

test("escapes submitted values in the HTML contact email", () => {
  const email = buildContactEmail({
    name: "Alex <script>alert(1)</script>",
    email: "alex@example.com",
    company: "Example & Partners",
    companyUrl: "https://example.com/?a=1&b=2",
    serviceId: "not-sure",
    budgetId: "budget-5",
    message: "First line\n<img src=x onerror=alert(1)>",
    locale: "de",
  });

  expect(email.html).not.toContain("<script>");
  expect(email.html).not.toContain("<img");
  expect(email.html).toContain("Alex &lt;script&gt;alert(1)&lt;/script&gt;");
  expect(email.html).toContain("Example &amp; Partners");
  expect(email.html).toContain("First line<br>&lt;img src=x onerror=alert(1)&gt;");
});
