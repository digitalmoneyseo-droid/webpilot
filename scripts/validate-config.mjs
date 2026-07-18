const mode = process.env.PUBLIC_SITE_MODE ?? "concept";
const allowedModes = new Set(["preview", "concept", "live"]);
if (!allowedModes.has(mode)) throw new Error(`PUBLIC_SITE_MODE must be preview, concept, or live; received ${mode}`);

const siteUrl = process.env.PUBLIC_SITE_URL ?? "https://webpilot.studio";
try { new URL(siteUrl); } catch { throw new Error("PUBLIC_SITE_URL must be an absolute URL"); }

if (mode === "concept" && process.env.CONTACT_FORM_ENABLED === "true") throw new Error("The contact form cannot be enabled in concept mode");

if (mode === "live") {
  const required = [
    "PUBLIC_SITE_URL", "PUBLIC_TURNSTILE_SITE_KEY", "CONTACT_RECIPIENT", "CONTACT_SENDER", "TURNSTILE_SECRET_KEY", "RESEND_API_KEY",
    "LEGAL_NAME", "LEGAL_STREET_ADDRESS", "LEGAL_POSTAL_CODE", "LEGAL_CITY", "LEGAL_COUNTRY", "LEGAL_EMAIL",
  ];
  const missing = required.filter((name) => !process.env[name]?.trim());
  if (missing.length) throw new Error(`Live mode is blocked. Missing: ${missing.join(", ")}`);
  if (process.env.CONTACT_FORM_ENABLED !== "true") throw new Error("CONTACT_FORM_ENABLED must be true in live mode");
  if (process.env.PUBLIC_TURNSTILE_SITE_KEY?.includes("0000000000") || process.env.PUBLIC_TURNSTILE_SITE_KEY?.includes("REPLACE")) throw new Error("Live mode requires a production Turnstile site key");
  if (process.env.RESEND_API_KEY?.startsWith("re_test")) throw new Error("Live mode requires a production Resend key");
  if (new URL(process.env.PUBLIC_SITE_URL).protocol !== "https:") throw new Error("Live mode requires an HTTPS PUBLIC_SITE_URL");
}

console.log(`Configuration valid for ${mode} mode.`);
