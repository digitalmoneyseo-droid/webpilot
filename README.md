# Webpilot

Webpilot is the main website for an independent digital growth and technology studio. It is a bilingual Next.js application with German and English routes, localized content, service pages, and a contact flow.

## Technology

- Next.js 16 with the App Router
- React 19 and TypeScript
- Tailwind CSS 4
- Motion for interface animation
- Playwright for browser and accessibility tests

## Development

Install the dependencies:

```bash
pnpm install
```

Start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Verification

```bash
pnpm validate:content
pnpm lint
pnpm typecheck
pnpm build
pnpm test
```

The Playwright suite uses the production build. Run `pnpm build` before `pnpm test` when you test locally.

## Localization and content

German is served from `/`. English is served from `/en`.

Shared interface copy lives in `src/i18n`. FAQs live in locale-specific JSON files under `src/content`.

Keep both locales equivalent when you change public content, metadata, navigation, forms, or accessibility labels.

## Contact form

The contact form validates the required fields and opens a prepared message in the visitor's email application. The website does not send or store form data.
