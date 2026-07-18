# Webpilot design system

Webpilot is calm, technical, and assured. The interface uses the existing Inter Variable identity for content and a restrained monospace for short metadata only.

## Typography

The scale starts from a 16px body size and uses a minor-third (`1.2`) progression as guidance. Values are rounded to practical steps, then adjusted for readability and Webpilot's real English and German content. The middle range stays compact for content-heavy pages; the top range provides clear separation without returning to poster-sized agency headlines.

### Primitive scale

| Token | Range | Intended step |
| --- | --- | --- |
| `--font-size-100` | `13px` | Metadata floor |
| `--font-size-200` | `14px` | Secondary UI |
| `--font-size-300` | `16px` | Body base |
| `--font-size-400` | `18px` | Large body and ledes |
| `--font-size-500` | `20px` | Compact heading |
| `--font-size-600` | `24–28px` | Subsection heading |
| `--font-size-700` | `28–40px` | Section heading |
| `--font-size-800` | `32–48px` | Page display |
| `--font-size-900` | `34–56px` | Primary marketing display; 34px minimum preserves German wrapping |

### Semantic roles

| Token | Line-height | Role |
| --- | --- | --- |
| `--type-caption` | `1.4` | Metadata, indexes, and legal notes |
| `--type-small` | `1.5` | Controls, buttons, navigation, and secondary UI |
| `--type-body` | `1.6` | Default prose and form content |
| `--type-body-lg` | `1.6` | Ledes, narrative copy, and prominent supporting text |
| `--type-heading-sm` | `1.25` | Card titles and FAQ questions |
| `--type-heading-md` | `1.2` | Subsections, article headings, and service titles |
| `--type-heading-lg` | `1.12` | Major section headings and large navigation |
| `--type-display-sm` | `1.06` desktop / `1.08` mobile | Inner-page titles, case-study titles, and campaign statements |
| `--type-display-lg` | `1.04` desktop / `1.09` mobile | Landing-page hero only; always the largest content heading |

Visual roles are independent of HTML semantics: an `h2` may use a display role when it is the primary campaign statement, while an `h1` on a compact utility view may use a heading role. Use no more than the two display roles above.

Weights are limited to regular `400`, medium `500`, semibold `630`, and bold `700`. The shipped Inter Variable files expose a continuous `100–900` weight axis, so `630` is rendered natively. Body copy remains 16px at every viewport. Only headings and display roles scale fluidly between their tested minimum and maximum values. Tracking tightens progressively from `-0.01em` on compact headings to `-0.035em` on the landing-page display. The landing-page display uses bold weight to preserve clear separation from the semibold page-display step, especially at narrow widths where the sizes are intentionally close.

Long-form text uses `--measure-reading: 70ch`; short introductory copy uses `--measure-narrow: 58ch`; the landing-page proposition uses `--measure-hero: 24ch`. Decorative mock interfaces inside project artwork are treated as imagery and may use non-system geometry.

References: [Design Systems Collective](https://www.designsystemscollective.com/recommendations-to-create-the-typography-system-for-your-design-system-cb2aa25978ca), [Blake Crosley](https://blakecrosley.com/blog/typography-systems), and [Typescale](https://typescale.com/).

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
