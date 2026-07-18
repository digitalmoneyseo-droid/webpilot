# Webpilot Studio

Production-oriented Astro 6 website for the Webpilot studio concept. The original visual system, responsive breakpoints, CSS artwork, and placeholder content are retained, while every fictional project, result, person, testimonial, logo, and insight is explicitly disclosed and excluded from indexing.

## Stack

- Astro 6 static rendering and MDX
- strict TypeScript and Tailwind CSS 4 reset
- Astro Content Collections for projects, services, insights, team, testimonials, and FAQs
- Cloudflare Workers Static Assets with Worker execution only for `/api/*`
- Cloudflare Turnstile and Resend for contact delivery outside concept mode
- Playwright, axe, visual regression, Vitest, ESLint, and Wrangler validation

## Local development

Use Node.js 24 and the committed npm lockfile.

```sh
npm ci
npm run dev
```

The default is safe `concept` mode. Copy `.env.example` to `.env` only when you need local overrides. Runtime secrets belong in `.dev.vars`, following `.dev.vars.example`.

`npm run preview` builds preview mode and starts the complete Worker locally at `http://127.0.0.1:8787`. The included Cloudflare and Resend values are provider test placeholders; no real email is sent until valid preview credentials are configured.

## Commands

```sh
npm run lint          # ESLint, including Astro files
npm run typecheck     # Astro and Worker TypeScript
npm test              # contact validation and email-safety units
npm run test:e2e      # localization, interaction, mode, and axe gates
npm run test:visual   # 0.1% visual-difference threshold
npm run build         # config/content validation, Astro, security headers
npm run cf:check      # Wrangler dry-run and binding validation
```

## Content model

Localized entries live below `src/content`. Every entry has a shared `translationKey`, identical German/English slug, `status`, and `indexable` flag. The build rejects missing locale pairs and required metadata. Concept content is valid and does not fail a build; it is simply disclosed, excluded from claim-oriented structured data, and kept out of indexable sitemaps.

German uses unprefixed routes. English uses `/en`. The language switch keeps the active route or entry. Reusable interface translations are typed in `src/i18n`.

## Deployment

The initial deployment mode is `concept`: public, non-indexed, no analytics, and no personal-data collection. `preview` is intended for a Cloudflare Access-protected hostname. `live` is rejected unless the real legal operator, domain, email, Turnstile, and Resend configuration is complete.

Wrangler configuration is in `wrangler.jsonc`; operational setup, DNS authentication, Access, smoke tests, and rollback are documented in [docs/operations.md](docs/operations.md). CI validates reproducible `npm ci`, code, content, build output, interactions, accessibility, screenshots, and the Worker bundle before deployment.

Do not enable `live` without legal review and verified SPF, DKIM, and DMARC records.
