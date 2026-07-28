# Webpilot Next.js

This directory contains the Next.js App Router migration. The Astro app in the repository root remains the reference implementation.

```bash
pnpm --dir nextjs dev
pnpm --filter webpilot-next build
```

The app reads the existing bilingual project and FAQ JSON from `../src/content` and reuses the existing design-system styles and public assets.

The contact form performs client-side validation only. Its submission handler is intentionally marked as a placeholder and does not send or store data.
