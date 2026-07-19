import type { ContactEmail, ContactIntakePorts, ContactSubmission } from "./intake";

interface ContactRateLimiter {
  limit(options: { key: string }): Promise<{ success: boolean }>;
}

export interface CloudflareContactEnvironment {
  PUBLIC_SITE_URL: string;
  TURNSTILE_SECRET_KEY: string;
  RESEND_API_KEY: string;
  CONTACT_RECIPIENT: string;
  CONTACT_SENDER: string;
  CONTACT_RATE_LIMITER: ContactRateLimiter;
}

interface TurnstileResult { success?: boolean; hostname?: string; }
interface ResendResult { id?: string; }

async function verifyTurnstile(submission: ContactSubmission, env: CloudflareContactEnvironment, remoteIp: string | null): Promise<boolean> {
  const form = new FormData();
  form.set("secret", env.TURNSTILE_SECRET_KEY);
  form.set("response", submission["cf-turnstile-response"]);
  if (remoteIp) form.set("remoteip", remoteIp);
  form.set("idempotency_key", crypto.randomUUID());
  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body: form, signal: AbortSignal.timeout(8_000) });
  if (!response.ok) return false;
  const result = await response.json() as TurnstileResult;
  return Boolean(result.success && result.hostname === new URL(env.PUBLIC_SITE_URL).hostname);
}

async function sendEmail(email: ContactEmail, env: CloudflareContactEnvironment): Promise<string | undefined> {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: `Webpilot Website <${env.CONTACT_SENDER}>`,
      to: [env.CONTACT_RECIPIENT],
      reply_to: email.replyTo,
      subject: email.subject,
      html: email.html,
      text: email.text,
    }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) return undefined;
  return ((await response.json()) as ResendResult).id;
}

export function createCloudflareContactPorts(env: CloudflareContactEnvironment): ContactIntakePorts {
  return {
    expectedOrigin: new URL(env.PUBLIC_SITE_URL).origin,
    createRequestId: () => crypto.randomUUID(),
    rateLimit: async (key) => (await env.CONTACT_RATE_LIMITER.limit({ key })).success,
    verifyTurnstile: (submission, remoteIp) => verifyTurnstile(submission, env, remoteIp),
    sendEmail: (email) => sendEmail(email, env),
    log: (outcome) => console.info(JSON.stringify(outcome)),
  };
}
