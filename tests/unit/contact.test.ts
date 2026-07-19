import { describe, expect, it } from "vitest";
import { escapeHtml, handleContactRequest, renderContactEmail, validateContactForm, type ContactIntakePorts } from "../../src/contact/intake";

function validForm(): URLSearchParams {
  return new URLSearchParams({ name: "Ada Lovelace", email: "ada@example.com", interests: "web-app-design", brief: "We need a clear new growth system for launch.", locale: "en", website: "", "cf-turnstile-response": "token" });
}

describe("contact validation", () => {
  it("accepts a valid localized submission", () => { expect(validateContactForm(validForm())).toMatchObject({ success: true, data: { locale: "en", interests: ["web-app-design"] } }); });

  it("accepts every active service and the open-ended option", () => {
    for (const interest of ["web-app-design", "seo-geo", "paid-campaigns", "ai-automation", "other"]) {
      const form = validForm();
      form.set("interests", interest);
      expect(validateContactForm(form)).toMatchObject({ success: true, data: { interests: [interest] } });
    }
  });

  it("rejects retired combined interests", () => {
    const retired = validForm();
    retired.set("interests", "content-paid");
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

function intakePorts(overrides: Partial<ContactIntakePorts> = {}): ContactIntakePorts {
  return {
    expectedOrigin: "https://webpilot.studio",
    createRequestId: () => "request-1",
    rateLimit: async () => true,
    verifyTurnstile: async () => true,
    sendEmail: async () => "message-1",
    log: () => undefined,
    ...overrides,
  };
}

function contactRequest(): Request {
  return new Request("https://webpilot.studio/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded", Origin: "https://webpilot.studio", Accept: "application/json" },
    body: validForm(),
  });
}

describe("contact intake", () => {
  it("runs complete intake through narrow provider adapters", async () => {
    const sent: string[] = [];
    const response = await handleContactRequest(contactRequest(), intakePorts({ sendEmail: async (email) => { sent.push(email.replyTo); return "message-1"; } }));
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ ok: true, category: "success" });
    expect(sent).toEqual(["ada@example.com"]);
  });

  it.each([
    ["rate limit", intakePorts({ rateLimit: async () => false }), 429, "rate_limit"],
    ["Turnstile provider", intakePorts({ verifyTurnstile: async () => { throw new Error("offline"); } }), 502, "turnstile_provider"],
    ["email provider", intakePorts({ sendEmail: async () => undefined }), 502, "email_provider"],
  ])("maps %s failure", async (_name, ports, status, category) => {
    const response = await handleContactRequest(contactRequest(), ports);
    expect(response.status).toBe(status);
    await expect(response.json()).resolves.toEqual({ ok: false, category });
  });
});
