# Repository Guide

## Runtime And Commands

- Use npm with the committed `package-lock.json`; CI runs Node 24 and `npm ci`.
- `npm run dev` starts only Astro at `127.0.0.1`; use `npm run preview` when the Cloudflare Worker or `/api/contact` must run. Preview rebuilds first.
- Use `npm run build`, not bare `astro build`: the script also generates `dist/_headers` with hashes for every inline script. Rebuild after changing inline scripts or CSP-relevant origins.
- Match CI verification order: `npm run lint`, `npm run check`, `npm test`, `npm run build`, `npm run test:e2e`, then `npm run cf:check`. `npm run verify` covers only the first four.
- Focus unit tests with `npx vitest run tests/unit/contact.test.ts` and browser tests with `npx playwright test tests/e2e/site.spec.ts -g "test name"`.
- Visual snapshots are generated and checked on Windows at 1440x1000 and 390x844. Update intentionally with `npm run test:visual -- --update-snapshots`; Linux output is not the canonical baseline.

## Architecture

- Astro emits a static site. Route files in `src/pages/` are thin locale wrappers: unprefixed routes are German and `/en/*` routes are English; shared implementations live in `src/components/pages/`. Keep both wrappers/static paths in sync.
- `src/worker.ts` runs before `/api/*` and the legacy service redirects only. Static assets and the generated 404 are served by Cloudflare from `dist`.
- Contact rules are split deliberately: provider-independent validation/orchestration is in `src/contact/intake.ts`, Cloudflare/Turnstile/Resend adapters are in `src/contact/cloudflare-adapters.ts`, and accepted interest/budget IDs come from `src/domain/catalog.ts`.
- Content access goes through `src/lib/content.ts`. With no Sanity project configured it eagerly loads localized JSON under `src/content/{projects,services,testimonials,faqs}/{de,en}`. When Sanity is configured it replaces, rather than merges with, those fallbacks and the build fails for an empty locale or duplicate `slug`, `order`, or `translationKey`.
- Keep Sanity schemas in `sanity/schemaTypes/index.ts`, Zod schemas in `src/lib/content.ts`, and fallback JSON aligned. Localized pairs must share `translationKey` and slug: generated routes use the slug, while locale links only add or remove `/en`.

## Environment And Deployment

- Build-time/site and Sanity variables belong in `.env` (see `.env.example`); Wrangler secrets for local Worker execution belong in `.dev.vars` (see `.dev.vars.example`). Never commit either file.
- `PUBLIC_SANITY_PROJECT_ID` and `PUBLIC_SANITY_DATASET` must be set together. The Studio uses separate `SANITY_STUDIO_PROJECT_ID` and `SANITY_STUDIO_DATASET` variables.
- Production deployment is manual via the `Deploy production` workflow and is restricted to `main`; local `npm run deploy` builds before `wrangler deploy`.
