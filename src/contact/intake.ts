import { contactBudgetIds, contactInterestIds, locales, type Locale } from "../domain/catalog";

const MAX_BODY_BYTES = 32_768;
const RESPONSE_HEADERS = { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" } as const;

export interface ContactSubmission {
  name: string;
  email: string;
  company?: string;
  interests: string[];
  brief: string;
  budget?: string;
  locale: Locale;
  website: string;
  "cf-turnstile-response": string;
}

export interface ContactEmail {
  replyTo: string;
  subject: string;
  html: string;
  text: string;
}

export interface ContactOutcome {
  requestId: string;
  outcome: "sent" | "rejected";
  category: string;
  locale: Locale;
  messageId?: string;
}

export interface ContactIntakePorts {
  expectedOrigin: string;
  createRequestId(): string;
  rateLimit(key: string): Promise<boolean>;
  verifyTurnstile(submission: ContactSubmission, remoteIp: string | null): Promise<boolean>;
  sendEmail(email: ContactEmail): Promise<string | undefined>;
  log(outcome: ContactOutcome): void;
}

export interface ValidationResult {
  success: boolean;
  category?: string;
  data?: ContactSubmission;
}

const allowedFields = new Set(["name", "email", "company", "interests", "brief", "budget", "locale", "website", "cf-turnstile-response"]);
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function includes<const TValues extends readonly string[]>(values: TValues, value: string): value is TValues[number] {
  return values.includes(value as TValues[number]);
}

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
  if (!interests.length || interests.some((item) => !includes(contactInterestIds, item))) return { success: false, category: "interests" };
  if (brief.length < 20 || brief.length > 4000) return { success: false, category: "brief" };
  if (budget && !includes(contactBudgetIds, budget)) return { success: false, category: "budget" };
  if (!includes(locales, locale)) return { success: false, category: "locale" };
  if (!token || token.length > 2048) return { success: false, category: "turnstile_token" };

  const data: ContactSubmission = { name, email, interests, brief, locale, website, "cf-turnstile-response": token };
  if (company) data.company = company;
  if (budget) data.budget = budget;
  return { success: true, data };
}

export function escapeHtml(value: string): string {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}

export function renderContactEmail(data: ContactSubmission): ContactEmail {
  const rows = [
    ["Name", data.name], ["Email", data.email], ["Company", data.company ?? "—"], ["Interests", data.interests.join(", ")],
    ["Budget", data.budget ?? "—"], ["Locale", data.locale], ["Brief", data.brief],
  ] as const;
  const htmlRows = rows.map(([label, content]) => `<tr><th style="text-align:left;vertical-align:top;padding:8px 16px 8px 0">${label}</th><td style="padding:8px 0;white-space:pre-wrap">${escapeHtml(content)}</td></tr>`).join("");
  return {
    replyTo: data.email,
    subject: `Webpilot project enquiry — ${data.name}`,
    html: `<h1>New Webpilot project enquiry</h1><table>${htmlRows}</table>`,
    text: rows.map(([label, content]) => `${label}: ${content}`).join("\n\n"),
  };
}

async function readBoundedBody(request: Request): Promise<string> {
  if (!request.body) return "";
  const reader = request.body.getReader();
  const decoder = new TextDecoder();
  let total = 0;
  let body = "";
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > MAX_BODY_BYTES) throw new Error("body_too_large");
      body += decoder.decode(value, { stream: true });
    }
    return body + decoder.decode();
  } finally {
    reader.releaseLock();
  }
}

function wantsJson(request: Request): boolean {
  return request.headers.get("Accept")?.split(",").some((value) => value.trim().startsWith("application/json")) ?? false;
}

function responseFor(request: Request, locale: Locale, status: "success" | "error", httpStatus: number, category: string): Response {
  if (wantsJson(request)) return Response.json({ ok: status === "success", category }, { status: httpStatus, headers: RESPONSE_HEADERS });
  const path = locale === "de" ? "/contact" : "/en/contact";
  const url = new URL(path, request.url);
  url.searchParams.set("status", status);
  return new Response(null, { status: 303, headers: { ...RESPONSE_HEADERS, Location: url.toString() } });
}

export async function handleContactRequest(request: Request, ports: ContactIntakePorts): Promise<Response> {
  const requestId = request.headers.get("cf-ray") ?? ports.createRequestId();
  let locale: Locale = request.headers.get("Referer")?.includes("/en/") ? "en" : "de";
  const fail = (httpStatus: number, category: string) => {
    ports.log({ requestId, outcome: "rejected", category, locale });
    return responseFor(request, locale, "error", httpStatus, category);
  };

  if (request.method !== "POST") return fail(405, "method");
  if (!request.headers.get("Content-Type")?.toLowerCase().startsWith("application/x-www-form-urlencoded")) return fail(415, "content_type");
  const contentLength = Number(request.headers.get("Content-Length") ?? "0");
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) return fail(413, "body_too_large");
  if (request.headers.get("Origin") !== ports.expectedOrigin) return fail(403, "origin");

  const remoteIp = request.headers.get("CF-Connecting-IP");
  if (!(await ports.rateLimit(remoteIp ?? "unknown"))) return fail(429, "rate_limit");

  let rawBody: string;
  try { rawBody = await readBoundedBody(request); }
  catch { return fail(413, "body_too_large"); }

  const validation = validateContactForm(new URLSearchParams(rawBody));
  if (!validation.success || !validation.data) return fail(validation.category === "honeypot" ? 400 : 422, validation.category ?? "validation");
  locale = validation.data.locale;

  try {
    if (!(await ports.verifyTurnstile(validation.data, remoteIp))) return fail(403, "turnstile");
  } catch {
    return fail(502, "turnstile_provider");
  }

  let messageId: string | undefined;
  try { messageId = await ports.sendEmail(renderContactEmail(validation.data)); }
  catch { return fail(502, "email_provider"); }
  if (!messageId) return fail(502, "email_provider");

  ports.log({ requestId, outcome: "sent", category: "success", locale, messageId });
  return responseFor(request, locale, "success", 200, "success");
}

export const contactResponseHeaders = RESPONSE_HEADERS;
