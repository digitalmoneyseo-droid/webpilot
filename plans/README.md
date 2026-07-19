# Animation plans

| # | Plan | Severity | Status |
| --- | --- | --- | --- |
| 001 | [Smooth portfolio filter changes](001-smooth-portfolio-filter-changes.md) | MEDIUM | DONE |
| 002 | [Show contact submission progress](002-show-contact-submission-progress.md) | MEDIUM | DONE |

## Recommended execution order

All current animation plans are complete.

## Dependencies

- Plan 001 has no package or plan dependencies. It uses the browser View Transitions API as progressive enhancement and keeps the existing synchronous fallback.
- Plan 002 has no package or plan dependencies. It reuses the existing contact form, CTA motion language, and `--ease-out` token.
