import { Resend } from "resend";
import { getServiceCopy } from "@/i18n/services";
import { hasLocale, t, type Locale } from "@/lib/i18n";
import { isServiceId } from "@/lib/service-catalog";
import { budgetOptions, isBudgetId, type BudgetId } from "@/lib/contact-options";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const requestHosts = new Set([
    new URL(request.url).host,
    request.headers.get("host"),
    request.headers.get("x-forwarded-host"),
  ].filter(Boolean));
  if (origin && !requestHosts.has(safeHost(origin))) return Response.json({ error: "Forbidden" }, { status: 403 });
  if (!request.headers.get("content-type")?.includes("application/json")) return Response.json({ error: "Unsupported content type" }, { status: 415 });
  if (Number(request.headers.get("content-length") ?? 0) > 20_000) return Response.json({ error: "Request too large" }, { status: 413 });

  let value: unknown;
  try {
    value = await request.json();
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }
  if (!value || typeof value !== "object" || Array.isArray(value)) return Response.json({ error: "Invalid request" }, { status: 400 });

  const body = value as Record<string, unknown>;
  if (typeof body.website === "string" && body.website) return Response.json({ ok: true });

  const name = cleanString(body.name);
  const email = cleanString(body.email);
  const company = cleanString(body.company);
  const companyUrl = cleanString(body.companyUrl);
  const message = cleanString(body.message);
  const locale = typeof body.locale === "string" && hasLocale(body.locale) ? body.locale : null;
  const serviceId = typeof body.service === "string" ? body.service : "";
  const budgetId = typeof body.budget === "string" ? body.budget : "";

  if (
    !name || name.length > 100 ||
    !emailPattern.test(email) || email.length > 254 ||
    company.length > 120 ||
    companyUrl.length > 2048 || (companyUrl && !isHttpUrl(companyUrl)) ||
    !locale || !message || message.length < 20 || message.length > 5000 ||
    (!isServiceId(serviceId) && serviceId !== "not-sure") ||
    !isBudgetId(budgetId)
  ) {
    return Response.json({ error: "Invalid form data" }, { status: 400 });
  }

  const apiKey = Bun.env.RESEND_API_KEY;
  const to = Bun.env.CONTACT_EMAIL_TO;
  const from = Bun.env.CONTACT_EMAIL_FROM;
  if (!apiKey || !to || !from) {
    console.error("Contact email is not configured. RESEND_API_KEY, CONTACT_EMAIL_TO, and CONTACT_EMAIL_FROM are required.");
    return Response.json({ error: "Email service unavailable" }, { status: 503 });
  }

  const service = isServiceId(serviceId) ? getServiceCopy(locale, serviceId).name : t(locale, "contact.formServiceUnsure");
  const budget = budgetLabel(locale, budgetId);
  const text = [
    `${t(locale, "contact.formBodyName")}: ${name}`,
    `${t(locale, "contact.formBodyEmail")}: ${email}`,
    `${t(locale, "contact.formCompany")}: ${company || t(locale, "contact.formNotProvided")}`,
    `${t(locale, "contact.formCompanyUrl")}: ${companyUrl || t(locale, "contact.formNotProvided")}`,
    `${t(locale, "contact.formService")}: ${service}`,
    `${t(locale, "contact.formBudget")}: ${budget}`,
    "",
    `${t(locale, "contact.formBodyMessage")}:`,
    message,
  ].join("\n");

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `${t(locale, "contact.formSubject")}: ${name}`,
      text,
    });

    if (error) {
      console.error("Resend contact email failed", error);
      return Response.json({ error: "Email delivery failed" }, { status: 502 });
    }

    return Response.json({ ok: true, id: data?.id });
  } catch (error) {
    console.error("Resend contact email failed", error);
    return Response.json({ error: "Email delivery failed" }, { status: 502 });
  }
}

function cleanString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function safeHost(value: string): string {
  try {
    return new URL(value).host;
  } catch {
    return "";
  }
}

function isHttpUrl(value: string): boolean {
  try {
    return ["http:", "https:"].includes(new URL(value).protocol);
  } catch {
    return false;
  }
}

function budgetLabel(locale: Locale, budgetId: BudgetId): string {
  const option = budgetOptions.find(({ id }) => id === budgetId);
  if (!option) throw new Error(`Missing contact budget option ${budgetId}.`);
  return t(locale, option.messageKey);
}
