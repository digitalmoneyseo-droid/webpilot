# Webpilot

Webpilot is the main website for an independent digital growth and technology studio. It is a multilingual Next.js application with German, English, and French routes, localized content, service pages, and a contact flow.

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

## Design system

[`DESIGN.md`](DESIGN.md) is the visual authority for every route and locale. It defines Webpilot's public semantic roles, shared composition patterns, signature explanatory visuals, documented exceptions, and review criteria.

`src/styles/typography-system.css` owns the current token values, `src/styles/app.css` exposes them as Tailwind utilities, and shared components own recurring composition and behavior. Reuse those roles and components before adding local values or copying a pattern. When a genuinely recurring role is missing, update the token, Tailwind exposure, design authority, and relevant design-system coverage together.

Treat locale content, narrow reflow, keyboard focus, and reduced motion as part of the same visual change.

## Verification

CI runs the following checks in order:

```bash
pnpm validate:content
pnpm lint
pnpm typecheck
pnpm build
pnpm test
```

The Playwright suite uses the production build and covers localized routes, accessibility, responsive behavior, motion, and common design-system violations. Run `pnpm build` before `pnpm test` when testing locally.

## Localization and content

Locales are registered in `src/i18n/config.json`. The shared `src/app/[lang]` route tree renders every configured locale.

German is served from `/` through an internal proxy rewrite, English from `/en`, and French from `/fr`. Explicit default-locale URLs such as `/de/about` redirect to the canonical unprefixed URL.

Shared interface copy lives in `src/i18n`. FAQs live in locale-specific JSON files under `src/content`.

Keep all configured locales equivalent when you change public content, metadata, navigation, forms, or accessibility labels.

## Contact form

The contact form validates enquiries in the browser and on the server, then sends them through Resend without writing them to a website database. Copy `.env.example` to `.env.local`, add a Resend API key, and use a sender address on a domain verified in Resend.
