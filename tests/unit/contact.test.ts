import { describe, expect, it } from "vitest";
import { escapeHtml, renderContactEmail, validateContactForm } from "../../src/lib/contact";

function validForm(): URLSearchParams {
  return new URLSearchParams({ name: "Ada Lovelace", email: "ada@example.com", interests: "branding-identity", brief: "We need a clear new growth system for launch.", locale: "en", website: "", "cf-turnstile-response": "token" });
}

describe("contact validation", () => {
  it("accepts a valid localized submission", () => { expect(validateContactForm(validForm())).toMatchObject({ success: true, data: { locale: "en", interests: ["branding-identity"] } }); });

  it("accepts every active Build interest and rejects the retired combined interest", () => {
    for (const interest of ["branding-identity", "website-design-development", "app-design-development"]) {
      const form = validForm();
      form.set("interests", interest);
      expect(validateContactForm(form)).toMatchObject({ success: true, data: { interests: [interest] } });
    }
    const retired = validForm();
    retired.set("interests", "brand-website");
    expect(validateContactForm(retired)).toMatchObject({ success: false, category: "interests" });
  });
  it.each([
    ["name", "A", "name"], ["email", "not-an-email", "email"], ["brief", "too short", "brief"], ["locale", "fr", "locale"], ["interests", "unknown", "interests"], ["website", "spam.example", "honeypot"], ["cf-turnstile-response", "", "turnstile_token"],
  ])("rejects invalid %s", (field, value, category) => { const form = validForm(); form.set(field, value); expect(validateContactForm(form)).toEqual({ success: false, category }); });
  it("rejects duplicate unexpected fields", () => { const form = validForm(); form.set("admin", "true"); expect(validateContactForm(form)).toEqual({ success: false, category: "unexpected_field" }); });
  it("enforces maximum lengths", () => { const form = validForm(); form.set("brief", "x".repeat(4001)); expect(validateContactForm(form)).toEqual({ success: false, category: "brief" }); });
});

describe("email safety", () => {
  it("escapes all visitor content in HTML", () => {
    expect(escapeHtml(`<img src=x onerror="alert('x')">`)).toBe("&lt;img src=x onerror=&quot;alert(&#039;x&#039;)&quot;&gt;");
    const result = validateContactForm(validForm());
    if (!result.data) throw new Error("fixture invalid");
    result.data.brief = "<script>alert(1)</script> This message is long enough.";
    const email = renderContactEmail(result.data);
    expect(email.html).not.toContain("<script>");
    expect(email.html).toContain("&lt;script&gt;");
  });
});
