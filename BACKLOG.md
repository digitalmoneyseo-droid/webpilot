# Suchio backlog

This file records review findings that are valid but do not justify changing the current release without more evidence or design work.

## Next

- Add focused tests for proxy locale negotiation, canonical and hreflang output, `robots.txt`, and `sitemap.xml`.
- Trial a Content Security Policy in report-only mode. Account for Next.js scripts, local fonts, and inline style usage before enforcing it.
- Add and tune a Cloudflare rate-limit rule for `POST /api/contact` after the custom domain is attached, then confirm it does not catch legitimate enquiries.

## Refactoring

- Extract the duplicated home and service process markup into one `ProcessSteps` component while preserving the current motion and narrow-screen geometry.
- Decide whether the submit button and 404 link need a shared pill-control shell. Do not generalize `CtaButton` until the states and semantics line up.
- Route simple reveal wrappers through `Reveal` where its delay API is useful. Keep the process and scope-grid variants separate because they use different thresholds and timing.
- Split service copy into one file per locale if another locale is added or service editing becomes frequent.

## Performance and design-system maintenance

- Re-evaluate the JavaScript scroll-progress bar against browser support and measured runtime cost before replacing it with scroll-driven CSS.
- Check the Services disclosure on short mobile viewports for nested scrolling, and add listbox type-ahead if keyboard testing shows a real usability gap.

## SEO

- Add Organization and WebSite structured data after the legal entity name, address, public contact address, and social profiles are final.
- Add sitemap `lastModified` values only when they come from real content or release timestamps. Do not use every build time as a fake content modification date.
