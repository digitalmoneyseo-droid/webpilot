# Webpilot

The bilingual website for Webpilot, a growth and technology studio. It is built as a static [Astro](https://astro.build/) site, served by a [Cloudflare Worker](https://developers.cloudflare.com/workers/), with optional [Sanity](https://www.sanity.io/) content and a server-side contact form.

German pages use unprefixed routes; English pages live under `/en`.

## Requirements

- Node.js 24
- npm

## Getting started

```bash
npm ci
cp .env.example .env
npm run dev
```

The Astro development server runs at `http://127.0.0.1:4321`.

`npm run dev` serves the static Astro application only. To test the Cloudflare Worker and `/api/contact`, also create `.dev.vars` from `.dev.vars.example`, then run:

```bash
npm run preview
```

Preview rebuilds the site before starting Wrangler.

## Configuration

Build-time and public site settings belong in `.env`. Worker secrets used during local development belong in `.dev.vars`. Do not commit either file.

The site uses localized JSON content from `src/content/` by default. To use Sanity instead, set both `PUBLIC_SANITY_PROJECT_ID` and `PUBLIC_SANITY_DATASET`. When configured, Sanity replaces the JSON fallback entirely, and each locale must contain valid, non-duplicate content.

The contact endpoint requires Cloudflare Turnstile and Resend credentials. Production secrets should be configured with Wrangler rather than committed to the repository.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Astro development server |
| `npm run preview` | Build and run the site with the Cloudflare Worker |
| `npm run build` | Build Astro and generate CSP-aware security headers |
| `npm run lint` | Run ESLint |
| `npm run check` | Check Astro and Worker TypeScript |
| `npm test` | Run unit tests with Vitest |
| `npm run test:e2e` | Run Playwright end-to-end tests |
| `npm run test:visual` | Run visual snapshot tests |
| `npm run verify` | Run lint, type checks, unit tests, and build |
| `npm run cf:check` | Validate the Cloudflare deployment configuration |
| `npm run studio` | Start Sanity Studio |
| `npm run deploy` | Build and deploy with Wrangler |

The full CI verification order is:

```bash
npm run lint
npm run check
npm test
npm run build
npm run test:e2e
npm run cf:check
```

Visual snapshots are canonical on Windows at 1440×1000 and 390×844. Update them intentionally with:

```bash
npm run test:visual -- --update-snapshots
```

## Project structure

```text
src/pages/                Locale route wrappers (German and /en)
src/components/pages/     Shared page implementations
src/content/              Localized JSON fallback content
src/contact/              Contact validation and provider adapters
src/lib/content.ts        JSON and Sanity content loading
src/worker.ts             Cloudflare Worker and API routing
sanity/schemaTypes/       Sanity schemas
tests/                    Unit, end-to-end, and visual tests
scripts/                  Build support scripts
```

Localized content pairs must use the same slug and `translationKey`. Keep German and English route wrappers in sync when adding pages.

## Deployment

Production deployment is handled manually by the **Deploy production** GitHub Actions workflow and is restricted to the `main` branch. A local deployment can be run with `npm run deploy` after the required Cloudflare configuration and secrets are available.
