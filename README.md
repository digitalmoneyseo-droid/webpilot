# Webpilot

A private, production-ready concept website for a digital growth and AI studio. Built with Next.js 16, React 19, TypeScript, Tailwind CSS 4, and Motion.

## What is included

- Editorial homepage with original brand, portfolio mockups, results, services, testimonials, team, tools, FAQ, and CTA sections
- Filterable work index and eight statically generated case studies
- Services index and six statically generated service pages
- About, insights, six article pages, contact, access, 404, and robots routes
- Responsive desktop, tablet, and mobile layouts
- Keyboard-accessible overlay navigation and FAQ accordions
- Reduced-motion support
- `noindex`, `nofollow`, and a fully blocked `robots.txt`
- Optional server-verified password gate using an HTTP-only signed cookie

All client names, case studies, metrics, people, and testimonials are fictional placeholder content. Replace them with verified material before any public use.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Quality checks

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Private access

Copy `.env.example` to `.env.local` and set both values:

```env
ACCESS_PASSWORD=your-strong-shared-password
ACCESS_SECRET=at-least-32-random-characters
```

When both variables are present, all application routes redirect to `/access` until the correct password is submitted. The password is only compared on the server; the browser receives an HTTP-only signed cookie. If either value is absent, the app remains open for local development.

For a Vercel deployment, add both variables to Preview and Production environments, then enable Vercel Deployment Protection as the outer access layer when the account supports it.

## Content structure

- `src/lib/content.ts` — projects, services, insights, team, and FAQs
- `src/components/` — reusable UI, portfolio visuals, navigation, and page sections
- `src/app/` — App Router pages, metadata, robots policy, and access action
- `src/proxy.ts` — optional access-gate redirect and signed-cookie validation

## Design note

The site closely follows the supplied reference’s interface composition: compact floating controls, pale editorial canvas, centered hero, viewport-spilling project ribbon, rounded media cards, dense modular sections, and restrained motion. The identity, written content, people, portfolio material, mockups, and brand assets are original replacements.
