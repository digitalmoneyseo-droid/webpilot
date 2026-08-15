# Webpilot

Webpilot is the main website for an independent digital growth and technology studio. It is a multilingual Next.js application with German, English, and French routes, localized content, service pages, and a contact flow.

## Technology

- Next.js 16 with the App Router
- Bun for package management, tests, builds, and the production runtime on Vercel (public beta)
- React 19 and TypeScript
- Tailwind CSS 4
- Motion for interface animation
- Bun's native test runner

## Development

Install the dependencies:

```bash
bun install
```

Start the development server:

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Design system

[`DESIGN.md`](DESIGN.md) is the visual authority for every route and locale. It defines Webpilot's public semantic roles, shared composition patterns, signature explanatory visuals, documented exceptions, and review criteria.

`src/styles/typography-system.css` owns the current token values, `src/styles/app.css` exposes them as Tailwind utilities, and shared components own recurring composition and behavior. Reuse those roles and components before adding local values or copying a pattern. When a genuinely recurring role is missing, update the token, Tailwind exposure, design authority, and relevant design-system coverage together.

Treat locale content, narrow reflow, keyboard focus, and reduced motion as part of the same visual change.

## Verification

CI runs the following checks in order:

```bash
bun run lint
bun run test
bun run build
bun run test:e2e
```

The Bun suite covers content parity, service policy, deterministic animation state, and common design-system violations. The small Chromium suite runs against the Bun production server and covers localized route rendering, mobile keyboard navigation and reflow, the contact flow, and representative accessibility and reduced-motion behavior. Run `bun run build` before `bun run test:e2e` locally.

## Localization and content

Locales are registered in `src/i18n/config.json`. The shared `src/app/[lang]` route tree renders every configured locale.

German is served from `/` through an internal proxy rewrite, English from `/en`, and French from `/fr`. Explicit default-locale URLs such as `/de/about` redirect to the canonical unprefixed URL.

Shared interface copy lives in `src/i18n`. FAQs live in locale-specific JSON files under `src/content`.

Keep all configured locales equivalent when you change public content, metadata, navigation, forms, or accessibility labels.

## Contact form

The contact form validates enquiries in the browser and on the server, then sends them through Resend without writing them to a website database. Copy `.env.example` to `.env.local` and add a Resend API key. The example sender works only when `CONTACT_EMAIL_TO` matches the email address on the Resend account; for other recipients, use a sender address on a domain verified in Resend.
