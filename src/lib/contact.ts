export const INTERESTS = ["branding-identity", "website-design-development", "app-design-development", "seo-ai-search", "content-paid", "ai-automation", "analytics-cro", "embedded-team"] as const;
export const BUDGETS = ["15-30k", "30-60k", "60-120k", "120k-plus"] as const;
export const LOCALES = ["de", "en"] as const;

export interface ContactSubmission {
  name: string;
  email: string;
  company?: string;
  interests: string[];
  brief: string;
  budget?: string;
  locale: "de" | "en";
  website: string;
  "cf-turnstile-response": string;
}

export interface ValidationResult {
  success: boolean;
  category?: string;
  data?: ContactSubmission;
}

const allowedFields = new Set(["name", "email", "company", "interests", "brief", "budget", "locale", "website", "cf-turnstile-response"]);
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactForm(params: URLSearchParams): ValidationResult {
  let unexpectedField = false;
  params.forEach((_value, key) => { if (!allowedFields.has(key)) unexpectedField = true; });
  if (unexpectedField) return { success: false, category: "unexpected_field" };
  const value = (key: string) => (params.get(key) ?? "").trim();
  const name = value("name");
  const email = value("email");
  const company = value("company");
  const brief = value("brief");
  const budget = value("budget");
  const locale = value("locale");
  const website = value("website");
  const token = value("cf-turnstile-response");
  const interests = [...new Set(params.getAll("interests").map((item) => item.trim()).filter(Boolean))];

  if (website) return { success: false, category: "honeypot" };
  if (name.length < 2 || name.length > 100) return { success: false, category: "name" };
  if (email.length > 254 || !emailPattern.test(email)) return { success: false, category: "email" };
  if (company.length > 120) return { success: false, category: "company" };
  if (!interests.length || interests.some((item) => !INTERESTS.includes(item as (typeof INTERESTS)[number]))) return { success: false, category: "interests" };
  if (brief.length < 20 || brief.length > 4000) return { success: false, category: "brief" };
  if (budget && !BUDGETS.includes(budget as (typeof BUDGETS)[number])) return { success: false, category: "budget" };
  if (!LOCALES.includes(locale as (typeof LOCALES)[number])) return { success: false, category: "locale" };
  if (!token || token.length > 2048) return { success: false, category: "turnstile_token" };

  const data: ContactSubmission = { name, email, interests, brief, locale: locale as ContactSubmission["locale"], website, "cf-turnstile-response": token };
  if (company) data.company = company;
  if (budget) data.budget = budget;
  return { success: true, data };
}

export function escapeHtml(value: string): string {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}

export function renderContactEmail(data: ContactSubmission): { subject: string; html: string; text: string } {
  const rows = [
    ["Name", data.name], ["Email", data.email], ["Company", data.company ?? "—"], ["Interests", data.interests.join(", ")],
    ["Budget", data.budget ?? "—"], ["Locale", data.locale], ["Brief", data.brief],
  ] as const;
  const htmlRows = rows.map(([label, content]) => `<tr><th style="text-align:left;vertical-align:top;padding:8px 16px 8px 0">${label}</th><td style="padding:8px 0;white-space:pre-wrap">${escapeHtml(content)}</td></tr>`).join("");
  return {
    subject: `Webpilot project enquiry — ${data.name}`,
    html: `<h1>New Webpilot project enquiry</h1><table>${htmlRows}</table>`,
    text: rows.map(([label, content]) => `${label}: ${content}`).join("\n\n"),
  };
}
