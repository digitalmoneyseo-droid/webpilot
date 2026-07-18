/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SITE_URL?: string;
  readonly PUBLIC_SITE_MODE?: "preview" | "concept" | "live";
  readonly PUBLIC_TURNSTILE_SITE_KEY?: string;
  readonly PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN?: string;
  readonly CONTACT_FORM_ENABLED?: string;
  readonly CONTACT_RECIPIENT?: string;
  readonly CONTACT_SENDER?: string;
  readonly LEGAL_NAME?: string;
  readonly LEGAL_STREET_ADDRESS?: string;
  readonly LEGAL_POSTAL_CODE?: string;
  readonly LEGAL_CITY?: string;
  readonly LEGAL_COUNTRY?: string;
  readonly LEGAL_REPRESENTATIVE?: string;
  readonly LEGAL_EMAIL?: string;
  readonly LEGAL_REGISTER_NAME?: string;
  readonly LEGAL_REGISTER_NUMBER?: string;
  readonly LEGAL_VAT_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
