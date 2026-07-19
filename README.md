# Webpilot Studio

Astro website for Webpilot Studio with localized German and English content, responsive layouts, and Cloudflare deployment.

## Stack

- Astro static rendering
- strict TypeScript and Tailwind CSS 4 reset
- Astro Content Collections for projects, services, team, testimonials, and FAQs
- Cloudflare Workers Static Assets with Worker execution for `/api/*`
- Cloudflare Turnstile and Resend for contact delivery
- Playwright, axe, visual regression, Vitest, ESLint, and Wrangler validation

## Local development

Use Node.js 24 and committed npm lockfile.

```sh
npm ci
npm run dev
```

Copy `.env.example` to `.env` for local overrides. Runtime secrets belong in `.dev.vars`, following `.dev.vars.example`.

`npm run preview` builds site and starts complete Worker locally at `http://127.0.0.1:8787`. Included Cloudflare and Resend values are provider test placeholders; valid credentials are required for real email delivery.

## Commands

```sh
npm run lint
npm run typecheck
npm test
npm run test:e2e
npm run test:visual
npm run build
npm run cf:check
npm run deploy
```

## Content and deployment

Localized entries live below `src/content`. Each entry shares a `translationKey` and identical German/English slug. German uses unprefixed routes; English uses `/en`.

Wrangler configuration is in `wrangler.jsonc`. Configure real legal operator data, Turnstile, Resend, SPF, DKIM, and DMARC before deployment. Operational details live in [docs/operations.md](docs/operations.md).
