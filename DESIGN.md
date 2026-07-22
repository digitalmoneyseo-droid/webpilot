# Webpilot Design System

This file is the durable reference for future UI changes. Reuse the existing tokens and semantic roles before introducing local values. The implementation in `src/styles/design-system.css`, `src/styles/global.css`, and `src/styles/app.css` remains the source of truth if this guide and the code diverge.

## Direction

Webpilot uses a restrained, editorial product aesthetic: warm neutral surfaces, compact controls, strong typographic hierarchy, and one expressive hero accent. Keep ordinary UI quiet so the blue Instrument Serif word remains the homepage signature.

Do not redesign colors, spacing, radii, typography, or motion incidentally while adding a feature. Extend the system only when an existing role cannot express a recurring need.

## Typography

- Inter is the sole family for navigation, controls, content, labels, numbers, and the visible `WEBPILOT` wordmark.
- Use Inter weights 400, 500, and 600. Avoid unsupported bold or extra-bold UI weights.
- Instrument Serif is reserved for the existing emphasized word in the homepage H1.
- The hero accent uses the real Instrument Serif italic face, synthesized weight 700, `-0.03em` tracking, and `--wave-blue` (`#3b82f6`). Instrument Serif provides no native bold weight, so do not add a nonexistent 700 font import.
- Use tabular numerals with Inter when columns of numbers must align. Do not introduce a UI monospace face.
- Typography inside `ProjectVisual.astro` and related simulated interfaces is illustrative artwork and is exempt.

### Scale and roles

| Role | Desktop | Mobile | Line height | Tracking | Weight |
| --- | ---: | ---: | ---: | ---: | ---: |
| Caption | 12px | 12px | 1.4 | +0.01em | 400 |
| Uppercase label | 12px | 12px | 1.4 | +0.08em | 500 |
| Small text | 14px | 14px | 1.5 | 0 | 400 |
| Button/control | 14px | 14px | 1.2 | +0.02em | 500 |
| Body | 16px | 16px | 1.6 | 0 | 400 |
| Body large | 18px | 18px | 1.6 | 0 | 400 |
| Lead | 20px | 18px | 1.6 | 0 | 400 or 500 |
| H3/card heading | 24px | 20px | 1.3 | -0.01em | 600 |
| Intermediate heading | 32px | 24px | 1.3 | -0.015em | 600 |
| Section H2/page title | 40px | 32px | 1.3 | -0.015em | 600 |
| Homepage H1 | 64px | 40px | 1.05 | -0.02em | 600 |

Use the semantic utilities such as `text-body`, `text-lead`, `text-heading-sm`, `text-heading-lg`, `text-control`, and `text-label`. Do not use arbitrary font sizes, local line heights, or local tracking for real UI when a role exists. Typography changes at the existing 600px breakpoint; do not introduce fluid `clamp()` typography.

Reading measures are `68ch` standard, `54ch` narrow, and approximately `20ch` for the homepage hero.

## Color

Use the named custom properties in `src/styles/global.css`. The principal roles are:

- `--bg`: warm page background.
- `--ink`: primary text.
- `--muted`: supporting text.
- `--line`: borders and separators.
- `--surface`: raised light surfaces.
- `--dark` and `--dark-muted`: inverse sections.
- `--focus`: keyboard focus indication.
- `--wave-blue`: the homepage serif accent and established blue artwork signal.

Color should communicate hierarchy or state. Do not add decorative accent colors to ordinary text.

## Spacing, radii, and layout

- Use the 4/8/12/16/24/32/48/64/80/120 spacing tokens in `design-system.css`.
- Use the shared page gutter, section spacing, and layout maximum instead of isolated page values.
- Pills use a fully rounded radius; cards use the established card radius for their context.
- For nested rounded surfaces, preserve the geometric relationship: `inner radius = outer radius - padding`. If the result is zero or negative, the inner surface should not be rounded.
- Keep standard copy within the documented reading measures and verify both German and English wrapping.

## Components and interaction

- Preserve semantic heading order even when a compact form heading uses the visual control role.
- Buttons and pill CTAs use the shared control typography and positive tracking.
- Service-card headings sit directly after their equal-height symbol regions; do not push them down with `margin-top: auto`.
- Service-category CTA labels use the CSS-owned roll viewport and one-row translation in `ServiceCategoryGrid.astro`. Hover and keyboard focus must produce the same state.
- Motion should explain interaction, respect `prefers-reduced-motion`, and leave the primary content visible when motion is disabled.
- Every interactive element needs a visible keyboard focus state and must remain usable at 200% zoom and 390px width.

## Change checklist

Before accepting a UI change:

1. Reuse semantic tokens and roles; add a token only for a recurring pattern.
2. Check German and English routes at desktop and 390px mobile width.
3. Verify keyboard focus, reduced motion, 200% zoom, and text clipping.
4. Keep `ProjectVisual` artwork untouched unless the artwork itself is the requested scope.
5. Run the repository verification sequence documented in `AGENTS.md`.
6. Update Windows visual snapshots only after intentional visual review.
