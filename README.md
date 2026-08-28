# Suchio

Suchio is the main website for an independent digital growth and technology studio. It is a multilingual Next.js application with German, English, and French routes, localized content, service pages, and a contact flow.

## Technology

- Next.js 16 with the App Router
- Bun for package management, tests, builds, and deployment scripts
- vinext and Cloudflare Workers for the production runtime
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

[`DESIGN.md`](DESIGN.md) is the visual authority for every route and locale. It defines Suchio's public semantic roles, shared composition patterns, signature explanatory visuals, documented exceptions, and review criteria.

`src/styles/theme.css` owns the current token values, `src/styles/app.css` exposes them as Tailwind utilities, and shared components own recurring composition and behavior. Reuse those roles and components before adding local values or copying a pattern. When a genuinely recurring role is missing, update the token, Tailwind exposure, design authority, and relevant design-system coverage together.

Treat locale content, narrow reflow, keyboard focus, and reduced motion as part of the same visual change.

## Verification

CI runs the following checks in order:

```bash
bun run lint
bun run validate:content
bun run test
bun run build
bun run validate:bundle
bun run test:e2e
```

The content validator checks home FAQ structure and locale parity. Bun tests protect service locale parity, contact option IDs, client/server localization boundaries, and the shared service identity palette. The bundle validator checks the production client chunks for server-owned dictionary copy. The Chromium suite runs against the Bun production server and covers localized route rendering, correct 404 responses, mobile keyboard navigation and reflow, the contact flow, and representative accessibility and reduced-motion behavior. Run `bun run build` before `bun run validate:bundle` or `bun run test:e2e` locally. For TypeScript changes that do not need a production build, run `bun run typecheck`.

## Localization and content

Locales are registered in `src/i18n/config.json`. The shared `src/app/[lang]` route tree renders every configured locale.

German is served from the unprefixed route tree, English from `/en`, and French from `/fr`. Explicit default-locale URLs such as `/de/about` redirect to the canonical unprefixed URL. On Cloudflare, prerendered HTML and RSC files are delivered directly as static assets; the Worker runs only for `/`, legacy `/de/*` redirects, and `/api/contact`.

Shared interface copy lives in `src/i18n`. FAQs live in locale-specific JSON files under `src/content`.

Keep all configured locales equivalent when you change public content, metadata, navigation, forms, or accessibility labels.

## Contact form

The contact form validates enquiries in the browser and in a shared server handler, then sends them through Resend without writing them to a website database. Copy `.env.example` to `.env.local` and add a Resend API key. The example sender works only when `CONTACT_EMAIL_TO` matches the email address on the Resend account; for other recipients, use a sender address on a domain verified in Resend.

## Cloudflare deployment

Build the Cloudflare output and prepare prerendered routes, fonts, security headers, `robots.txt`, and `sitemap.xml` as static assets:

```bash
bun run build:vinext
```

Run the built Worker locally or deploy it:

```bash
bun run start:vinext
bun run deploy:vinext
```

The production Worker is configured in `wrangler.jsonc`. Add `RESEND_API_KEY`, `CONTACT_EMAIL_TO`, and `CONTACT_EMAIL_FROM` as Worker secrets. Set `NEXT_PUBLIC_SITE_URL` to the final custom domain before the public launch so canonical URLs, Open Graph metadata, `robots.txt`, and `sitemap.xml` use it.

## Planned work

[`BACKLOG.md`](BACKLOG.md) records validated review findings that need more evidence, deployment observation, or design work before implementation.
