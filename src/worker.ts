import { renderContactEmail, validateContactForm, type ContactSubmission } from "./lib/contact";

const MAX_BODY_BYTES = 32_768;
const API_HEADERS = { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" } as const;
const LEGACY_SERVICE_REDIRECTS: Readonly<Record<string, string>> = {
  "/services/brand-web-product": "/services/website-design-development",
  "/services/brand-web-product/": "/services/website-design-development",
  "/en/services/brand-web-product": "/en/services/website-design-development",
  "/en/services/brand-web-product/": "/en/services/website-design-development",
};

interface TurnstileResult { success?: boolean; hostname?: string; "error-codes"?: string[]; }
interface ResendResult { id?: string; }

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

function responseFor(request: Request, locale: "de" | "en", status: "success" | "error", httpStatus: number, category: string): Response {
  if (wantsJson(request)) return Response.json({ ok: status === "success", category }, { status: httpStatus, headers: API_HEADERS });
  const path = locale === "de" ? "/contact" : "/en/contact";
  const url = new URL(path, request.url);
  url.searchParams.set("status", status);
  return new Response(null, { status: 303, headers: { ...API_HEADERS, Location: url.toString() } });
}

function logOutcome(requestId: string, outcome: string, category: string, locale: string, resendMessageId?: string): void {
  const entry: Record<string, string> = { requestId, outcome, category, locale };
  if (resendMessageId) entry.resendMessageId = resendMessageId;
  console.info(JSON.stringify(entry));
}

async function verifyTurnstile(data: ContactSubmission, env: Env, remoteIp: string | null): Promise<boolean> {
  const form = new FormData();
  form.set("secret", env.TURNSTILE_SECRET_KEY);
  form.set("response", data["cf-turnstile-response"]);
  if (remoteIp) form.set("remoteip", remoteIp);
  form.set("idempotency_key", crypto.randomUUID());
  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body: form, signal: AbortSignal.timeout(8_000) });
  if (!response.ok) return false;
  const result = await response.json() as TurnstileResult;
  if (!result.success) return false;
  const expectedHostname = new URL(env.PUBLIC_SITE_URL).hostname;
  return env.PUBLIC_SITE_MODE === "preview" || result.hostname === expectedHostname;
}

async function sendEmail(data: ContactSubmission, env: Env): Promise<string | undefined> {
  const email = renderContactEmail(data);
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: `Webpilot Website <${env.CONTACT_SENDER}>`, to: [env.CONTACT_RECIPIENT], reply_to: data.email,
      subject: email.subject, html: email.html, text: email.text,
    }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) return undefined;
  return ((await response.json()) as ResendResult).id;
}

async function handleContact(request: Request, env: Env): Promise<Response> {
  const requestId = request.headers.get("cf-ray") ?? crypto.randomUUID();
  let locale: "de" | "en" = request.headers.get("Referer")?.includes("/en/") ? "en" : "de";
  const fail = (httpStatus: number, category: string) => {
    logOutcome(requestId, "rejected", category, locale);
    return responseFor(request, locale, "error", httpStatus, category);
  };

  if (env.PUBLIC_SITE_MODE === "concept" || env.CONTACT_FORM_ENABLED !== "true") return fail(404, "disabled");
  if (request.method !== "POST") return fail(405, "method");
  if (!request.headers.get("Content-Type")?.toLowerCase().startsWith("application/x-www-form-urlencoded")) return fail(415, "content_type");
  const contentLength = Number(request.headers.get("Content-Length") ?? "0");
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) return fail(413, "body_too_large");

  const configuredOrigin = new URL(env.PUBLIC_SITE_URL).origin;
  const requestOrigin = request.headers.get("Origin");
  if (requestOrigin !== configuredOrigin) return fail(403, "origin");

  const ip = request.headers.get("CF-Connecting-IP");
  const rateLimit = await env.CONTACT_RATE_LIMITER.limit({ key: ip ?? "unknown" });
  if (!rateLimit.success) return fail(429, "rate_limit");

  let rawBody: string;
  try { rawBody = await readBoundedBody(request); }
  catch { return fail(413, "body_too_large"); }
  const validation = validateContactForm(new URLSearchParams(rawBody));
  if (!validation.success || !validation.data) return fail(validation.category === "honeypot" ? 400 : 422, validation.category ?? "validation");
  locale = validation.data.locale;

  let turnstileValid = false;
  try { turnstileValid = await verifyTurnstile(validation.data, env, ip); }
  catch { return fail(502, "turnstile_provider"); }
  if (!turnstileValid) return fail(403, "turnstile");

  let messageId: string | undefined;
  try { messageId = await sendEmail(validation.data, env); }
  catch { return fail(502, "email_provider"); }
  if (!messageId) return fail(502, "email_provider");
  logOutcome(requestId, "sent", "success", locale, messageId);
  return responseFor(request, locale, "success", 200, "success");
}

export default {
  async fetch(request, env): Promise<Response> {
    const url = new URL(request.url);
    const legacyDestination = LEGACY_SERVICE_REDIRECTS[url.pathname];
    if (legacyDestination) {
      const destination = new URL(legacyDestination, url.origin);
      return new Response(null, { status: 301, headers: { Location: destination.toString(), "Cache-Control": "public, max-age=86400" } });
    }
    if (url.pathname === "/api/contact") return handleContact(request, env);
    return Response.json({ ok: false, category: "not_found" }, { status: 404, headers: API_HEADERS });
  },
} satisfies ExportedHandler<Env>;
