# Webpilot design system

Webpilot is calm, technical, and assured. The interface uses the existing Inter Variable identity for content and a restrained monospace for short metadata only.

## Typography

| Token | Size / line-height | Role |
| --- | --- | --- |
| `--type-caption` | `0.75rem / 1.4` | Metadata, indexes, legal notes |
| `--type-small` | `0.875rem / 1.5` | Controls and secondary UI |
| `--type-body` | `1rem / 1.6` | All meaningful prose |
| `--type-body-lg` | `1.125rem / 1.6` | Ledes and narrative copy |
| `--type-title-sm` | `1.25rem / 1.25` | Card titles |
| `--type-title-md` | `1.75–2.5rem / 1.1` | Subsection headings |
| `--type-title-lg` | `2.125–3.25rem / 1.04` | Section headings |
| `--type-display` | `2.625–5.125rem / 0.98` | Page and campaign headings |

Use weight 400 for body, 500 for navigation, 630 for headings, 650 for controls and brand elements, and 700 for strong labels. Meaningful text never falls below `0.75rem`. Long-form text uses `--measure-reading: 70ch`; short introductory copy uses `--measure-narrow: 58ch`.

## Spacing

The base ramp is `4, 8, 12, 16, 24, 32, 48, 64, 80, 120px` through `--space-1` to `--space-10`.

- Page gutter: `--page-gutter`, at least 18px with a centered 1240px content shell.
- Standard section: `--section-space`, fluid from 72px to 120px.
- Compact section: `--section-space-compact`, fluid from 56px to 80px.
- Card padding: 20px, 24px, or 32px.
- Grid gaps: 12px, 16px, or 24px.
- Stacked split-layout gap: 48px.
- Eyebrow to title: 12–16px.
- Title to copy: 16–20px.
- Copy to action: 24–32px.
- Section heading to content: 40px mobile, 56px desktop.

Decorative mock interfaces inside project artwork may use smaller type and non-system geometry because they are imagery, not required reading.
