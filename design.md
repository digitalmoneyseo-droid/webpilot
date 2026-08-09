---
name: webpilot-design
description: "Design and extend Webpilot with one consistent multilingual visual system, clear hierarchy, accessible color, restrained motion, and evidence-led content."
---

# Design Webpilot

Webpilot is the website of an independent digital growth and technology studio. It should feel precise, capable, calm, and personal. The design earns trust through clear hierarchy, strong typography, useful explanation, and refined interaction—not through visual noise.

This document is the design authority for every route and locale. It explains which existing token, component, and pattern to use before a new value is introduced.

## Priorities

When decisions compete, protect them in this order:

1. Preserve facts, meaning, locale parity, and a clear path to contact.
2. Preserve accessibility, legibility, keyboard use, reflow, reduced motion, and performance.
3. Preserve the semantic design roles and shared component patterns in this document.
4. Make the reader’s next question obvious and answer it with the least mediation.
5. Add visual distinction only when it clarifies hierarchy, state, grouping, or cause and effect.

Clarity is not plainness. Create character with typography, composition, pace, precise details, and purposeful illustration. Do not manufacture it with more styles.

## Sources of truth

Use these files in this order:

- `design.md` defines intent, usage, exceptions, and governance.
- `src/styles/typography-system.css` owns primitive and semantic tokens.
- `src/styles/app.css` exposes those tokens as Tailwind utilities.
- Shared components own recurring composition: `EditorialHero`, `SectionHeading`, `CtaButton`, `FinalCta`, `Faq`, and `Reveal`.
- Page components compose those primitives. They must not invent a parallel type or color system.

Tailwind is the default for ordinary component styling. Custom CSS owns global tokens, browser behavior, complex motion, pseudo-elements, and generated visuals.

## Design tokens

Use semantic names in components. Primitive `--ds-*` values are raw materials for the semantic layer, not a component API.

The repository uses a practical two-tier model:

1. Primitive tokens store raw values such as neutral and blue ramps.
2. Semantic tokens describe purpose such as text, canvas, surface, border, focus, and error.

Add a component-specific token only when a reusable component has a stable decision that cannot be expressed by an existing semantic token. Do not create a token for a one-off decorative coordinate.

## Typography

### Typeface

Use DM Sans Variable for all headings, prose, labels, navigation, and controls. Use JetBrains Mono only for code, technical identifiers, short step numbers, and genuinely tabular data. Do not set a whole sentence or section in mono.

Use regular weight for reading, medium for headings, and semibold for controls or short emphasis. Avoid light weights for small text and avoid weight `700` unless a control or strong inline emphasis needs it. The wordmark is an optical brand exception.

### Scale strategy

There is no universal “best” type ratio. Typeface metrics, language, measure, viewport, and content density change the optical result. Webpilot uses a minor-third rhythm around the 16px body size as a guardrail, then rounds semantic roles for DM Sans and the site’s editorial context.

The important invariant is the hierarchy, not perfect arithmetic:

`hero display > page title > section title > subsection > card title > body`

Fluid roles use one continuous `clamp()` formula. Their ranges never cross, and there are no breakpoint jumps. Use `rem` so browser text preferences and zoom continue to work.

### Text roles

| Role | Utility | Size / line height | Weight | Use |
|---|---|---:|---:|---|
| Hero display | `text-display-lg` | 44–72px / 1.02 | 500 | Homepage `h1` only; one page-defining statement |
| Page title | `text-display-sm` | 40–60px / 1.04 | 500 | Standard page and service `h1`; final conversion statement |
| Section title | `text-heading-lg` | 32–40px / 1.08 | 500 | Main `h2` section turns, normally through `SectionHeading` |
| Subsection title | `text-heading-md` | 24px / 1.2 | 500 | Distinct nested sections, service titles, compact `h2` |
| Card title | `text-heading-sm` | 20px / 1.25 | 500 | Card `h3`, FAQ question text, short feature title |
| Lead | `text-lead` | 17–20px / 1.5 | 400 | One short page orientation passage below the `h1` |
| Large body | `text-body-lg` | 18px / 1.5 | 400 | Section intro or short emphasized prose |
| CTA copy | `text-cta-copy` | 18px / 1.5 | 400 | Supporting copy in a final CTA only |
| Body | `text-body` | 16px / 24px | 400 | Default reading copy |
| Card body | `text-card-body` | 15px / 1.5 | 400 | Dense card or scoped list copy |
| Control | `text-control` | 15px / 1.5 | 600 | Primary buttons and form controls |
| Navigation | `text-navigation` | 14px / 1.5 | 500 | Header and menu navigation |
| Small | `text-small` | 14px / 1.5 | 400 | Helper text, form labels, compact descriptions |
| Caption / metadata | `text-caption`, `text-meta` | 13px / 1.5 | 400 | Subordinate context; the two names share one visual value intentionally |
| Mono metadata | `text-mono-meta` | 12px / 1.5 | 400 | Short technical or numeric metadata only |
| Label | `text-label` | 12px / 16px | 500 | Very short eyebrow or status label; uppercase is allowed only here |

Semantic aliases that share a visual value are deliberate. They document purpose while keeping the actual number of visual sizes small.

### Heading usage

- Each page has exactly one descriptive `h1`.
- The homepage alone uses `text-display-lg`.
- Normal page titles and service titles use `text-display-sm`.
- Main section headings use `SectionHeading` and `text-heading-lg`.
- Use `text-heading-md` for a real nested section, not merely to make text larger.
- Use `text-heading-sm` for peer cards and compact questions.
- A disclosure control may be semibold body text inside an `h3` or `h4`; its control height must not be mistaken for line count.
- Equivalent peers always share the same role, size, line height, weight, tracking, and color. Never shrink one translated string to make it fit.

### Measures and wrapping

- Reading prose: `max-w-reading`, 68ch maximum.
- Narrow body and section intro: `max-w-narrow`, 54ch maximum.
- Hero statements: about 18–20ch with meaningful line breaks.
- Use `text-wrap: balance` for headings and short ledes, and `text-wrap: pretty` for prose.
- Keep running text left aligned. Center only short hero, section-intro, FAQ-heading, and CTA compositions.
- Rewrite or adjust measure before reducing a semantic type role.

### Vertical rhythm

Think in relationships:

- Heading to its intro: 16px for compact groups, 24px for hero or CTA groups.
- Card title to card copy: 8–12px.
- Paragraph to paragraph or list: 16–24px.
- Content group to new section: 64–96px through `py-section`.
- Label to title: 12–20px.

Every gap has one owner. Prefer a parent `gap-*` or stack wrapper; do not give both parent and children competing margins.

## Color

### Semantic palette

| Role | Utility / token | Value | Intended use |
|---|---|---:|---|
| Canvas | `bg-canvas` | `#FAF9F6` | Default page field |
| Primary surface | `bg-surface`, `bg-white` | `#FFFFFF` | Cards, controls, raised content |
| Secondary surface | `bg-surface-subtle` | `#FAFAFA` | Quiet input or grouped background |
| Inverse surface | `bg-inverse-surface` | `#101010` | Dark controls and dark navigation surfaces |
| Strong inverse field | `bg-black` | `#000000` | Footer and final CTA band |
| Primary text | `text-ink` | `#171717` | Headings and default important text |
| Secondary text | `text-muted` | `#4D4D4D` | Body copy and supporting explanation |
| Tertiary text | `text-subtle` | `#73736F` | Compact metadata, placeholder text, secondary icons |
| Inverse text | `text-inverse`, `text-white` | `#FFFFFF` | Primary text on black or inverse surfaces |
| Inverse secondary | `text-inverse-muted` | `#929292` | Supporting text on black |
| Interactive text | `text-accent` | blue 800 | Links, labels, or text actions on light surfaces |
| Focus | `outline-focus` | blue 700 | Visible focus indicator |
| Error | `text-error`, `outline-error` | `#B42318` | Error copy and invalid state |

Primary text is about 17:1 on the canvas, secondary text about 8:1, tertiary text 4.52:1, inverse secondary text 6.75:1 on black, and error text 6.24:1 on the canvas. These meet WCAG AA for their documented text uses.

### Color rules

- Establish hierarchy with typography and space before adding color.
- Use `text-ink` for headings, `text-muted` for normal supporting prose, and `text-subtle` only for compact subordinate text.
- Blue 800 is the accessible light-surface text accent. Blue 700 is suitable for focus, graphics, and larger/decorative elements; do not use it for small normal text on the warm canvas.
- Never use color alone to communicate state. Pair it with a label, icon, position, or pattern.
- A card or component references a semantic color role, not a raw hex value.
- The service icon palettes and offer animations may use local raw colors because they are illustrative and category-specific. Their accompanying label carries the meaning, and the visual is decorative or `aria-hidden`. Those colors must not leak into page typography, forms, navigation, or generic components.
- Do not add a decorative gradient. A continuous data scale is the only acceptable gradient.

## Spacing and layout

### Spacing scale

Use the project’s 4px base rhythm for component and layout spacing:

`0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96`

These values are available as Tailwind spacing utilities and `--space-*` tokens. Use a 2px half-step only for a border, hairline, or a documented optical adjustment inside a control. Generated illustration geometry is exempt.

This numbered scale governs local component relationships. Semantic fluid roles may interpolate between 4px-aligned endpoints when page rhythm must adapt continuously to the viewport.

Internal component spacing and page layout spacing are different decisions:

- Control internals: 8–16px.
- Card internals: 20–40px, based on density and viewport.
- Peer gaps: 12–32px.
- Section turns: 64–96px.

### Semantic spatial roles

Use the semantic role when the spacing controls page rhythm or recurs across components. Use a numbered Tailwind utility only for local relationships inside a component.

| Role | Utility | Range | Use |
|---|---|---:|---|
| Page gutter | `px-page` | 24px minimum | Shared horizontal inset for page sections and footer |
| Page-title start | `pt-page-title` | 104px narrow; 128–160px wide | Clears the floating header and aligns every page opening |
| Section turn | `py-section` | 64–96px | Default boundary between major reader questions |
| Compact section turn | `py-section-compact` | 48–64px | Related or supporting sections |
| Heading exit | `mb-heading-gap` | 32–48px | Space owned by `SectionHeading` before section content |
| Split-layout gap | `gap-split` | 40–96px | Two unequal columns such as editorial copy plus a visual |
| Peer-grid gap | `gap-grid` | 24–64px | Reflowing peer columns or process steps |
| Repeated composition turn | `mb-content-stack` | 80–112px | Major repeated offer rows; the last item removes it |
| Standard card inset | `p-card-padding` | 24px | Ordinary content cards |
| Fluid card inset | `p-card-fluid` | 24–40px | Large or featured cards that need viewport-sensitive density |
| Overlay gutter | `px-menu` | 24–80px | Full-screen menu content only |

### Margin, gap, and padding ownership

- A section owns its outer vertical padding. Do not add matching top and bottom margins to its first and last children.
- A parent `gap-*` owns space between true peers. Do not give every child compensating margins.
- A component owns the space between its internal parts. For example, `SectionHeading` owns its title-to-copy gap and its exit gap.
- Use margins for a deliberate relationship between unlike adjacent objects: label to title, body to CTA, or one repeated composition to the next.
- Use `mx-auto` only to center a constrained object; centering is not a substitute for the shared page gutter.
- Zero native heading, paragraph, and list margins where composition owns the rhythm.
- Do not stack semantic spacing roles accidentally. A `py-section` section followed by a child with another section-sized top margin is a defect.

Card density has three approved levels: compact cards use `p-5`, standard cards use `p-card-padding`, and featured cards use `p-card-fluid`. Illustration shells use `p-10` wide and `p-4` narrow because that padding is part of the visual's coordinate field.

The 14px and 18px half-steps (`3.5` and `4.5`) are allowed only as documented optical adjustments inside compact controls or floating header capsules. They are not layout spacing.

### Outer layout

- Maximum content width: `75rem` / 1200px.
- Page gutter: at least 24px; it expands to center the 1200px field.
- Use the shared page gutter for header, title, sections, and footer.
- Prefer a 12-column wide layout, 6-column middle layout, and 4-column narrow layout when a grid needs explicit columns.
- Reading prose normally occupies no more than 6–7 desktop columns.
- Give grid and flex children `min-w-0` when they contain text.

Breakpoints describe content behavior, not devices:

- Narrow: up to 600px.
- Compact: up to about 760px.
- Collapsed navigation and major split layouts: up to 900px.
- Animation-specific breakpoints may be narrower because their geometry is self-contained.

Reflow, stack, or rebalance before shrinking type. Avoid hiding horizontal overflow to conceal a layout defect.

## Shape, borders, and elevation

Use only these semantic radii:

| Role | Utility | Radius | Use |
|---|---|---:|---|
| Inset | `rounded-inset` | 8px | Element nested inside a padded shell |
| Control | `rounded-control` | 12px | Inputs, buttons, compact control surfaces |
| Card | `rounded-card` | 12px | Content and illustration cards |
| Shell | `rounded-shell` | 16px | Large menu, form, or grouped outer container |
| Pill | `rounded-pill` | 999px | CTA capsules and truly pill-shaped controls only |

For close nesting, the inner radius should normally be the outer radius minus the visible gap. Use the nearest semantic token; do not invent 9px, 10px, or 11px variants.

### Border roles

| Role | Utility | Use |
|---|---|---|
| Subtle separator | `border-line` / `bg-line` | FAQ rows and low-emphasis dividers |
| Emphasized separator | `border-line-strong` / `bg-line-strong` | Segmented grids and process rules |
| Inverse separator | `border-inverse-line` | Dividers on black and inverse surfaces |
| Focus boundary | `outline-focus` | Keyboard focus; never replace it with a border color change |

Use a real border for separators, rules, and segmented-grid geometry. Use a one-pixel shadow boundary around rounded containers so the boundary does not change layout.

### Elevation roles

| Role | Utility | Use |
|---|---|---|
| Quiet surface | `shadow-surface` | Static card, control, or shell boundary |
| Interactive surface | `shadow-surface-hover` | Hover or focus elevation; pair with an actual interactive state |
| Floating surface | `shadow-floating` | Menus, popovers, and content that visually floats above the page |
| Inverse surface | `shadow-dark-surface` | Boundary for controls on dark surfaces |
| Inverse interactive | `shadow-dark-surface-hover` | Hover boundary for dark controls |
| Accent surface | `shadow-accent-surface` | Blue featured service card only |

Default cards do not cast a decorative drop shadow: `shadow-surface` is a quiet hairline. Reserve the larger multi-layer shadow for floating UI. A component gets one boundary mechanism; do not combine a border and a surface shadow unless the border constructs internal grid geometry.

Prefer space and background contrast before borders or shadows. Do not wrap every section in a card, nest cards without a structural reason, or use ornamental shadows. Raw `box-shadow`, border colors, and generic framework radii are not part of the editorial component API.

## Components and page composition

### Reuse first

- `EditorialHero`: about, contact, and other editorial page introductions.
- `SectionHeading`: a main section title with optional intro; left alignment by default, centered only for short peer grids or FAQs.
- `CtaButton`: all primary and secondary conversion links.
- `FinalCta`: the shared final conversion band.
- `Faq`: disclosure behavior and question typography.
- `Reveal`: the standard viewport reveal behavior.

If an existing component expresses the right role, extend it instead of copying its class list into a page.

### Page opening patterns

Choose one:

1. Homepage opening: centered `text-display-lg`, one lead, one primary CTA, one secondary service anchor.
2. Editorial opening: `EditorialHero` with `text-display-sm`, one lead, and no competing visual.
3. Service opening: split title and explanatory visual, with `text-display-sm`, one lead, and one service-specific CTA.

Do not create a fourth hero treatment because a string is longer. Adjust the content and measure within the matching pattern.

### Section patterns

- A new section must answer a new reader question.
- Use one dominant object or relationship per section.
- Three true peers may form one row. Unequal ideas should not be forced into equal cards.
- Use a surface only for interaction, selection, contrast, or a real grouping that spacing cannot communicate.
- Avoid repetitive centered headings followed by identical card grids. Vary composition when the content’s relationship changes, while retaining the same tokens.

## Icons and generated visuals

Use Lucide, the installed icon system, at the established 1.7–2 stroke range. Icons must clarify an action, concept, or process. Do not use mixed icon libraries or decorative icon tiles simply to fill empty space.

Offer animations are generated visual explanations. They may use local font sizes, colors, and geometry when the main type and color system would make the miniature interface unreadable. Keep those exceptions inside `src/components/offer-animations`, decorative, responsive, and inaccessible to the page reading order with `aria-hidden` where appropriate.

## Motion

Default to stillness. Add motion only to explain a state change, preserve continuity, show process, or confirm an action.

- Direct control feedback: 150–250ms.
- Standard reveal: 420ms with `cubic-bezier(.16, 1, .3, 1)`.
- Larger illustrative sequences may run longer when sequence communicates cause and effect.
- Animate transform and opacity where possible.
- List transitioned properties explicitly; never use `transition: all`.
- Motion must be interruptible and must not gate access to content.
- Every motion path needs a complete `prefers-reduced-motion` state.
- Use `IntersectionObserver` for viewport entry, not an unthrottled scroll handler.

Use the shared CSS `--ease-out` and the offer animation constants in `motion-tokens.ts`. Do not invent a new easing for ordinary component work.

## Interaction states

Every interactive element needs the states its behavior can enter:

- Default and hover with increased contrast or elevation.
- Active with small physical feedback where appropriate.
- Visible `:focus-visible` treatment.
- Disabled or loading without removing necessary context.
- Inline, actionable error states.
- Selected or current state for navigation and choices.

Use native buttons for actions and links for navigation. Keep touch targets at least 44px where practical. Do not depend on hover to expose required information.

## Content and locales

All configured locales are one product experience.

- Keep routes, section order, heading hierarchy, CTAs, metadata, form fields, disclosures, and accessible labels equivalent in German, English, and French.
- Preserve intent and tone rather than translating mechanically.
- Test the longest real translation. Do not reduce one locale’s font size or truncate marketing copy to repair wrapping.
- Use sentence case. Avoid all-caps prose, generic claims, filler, and unsupported outcomes.
- Do not invent client names, testimonials, relationships, or performance figures.
- Use tabular numerals for aligned comparisons and `Intl.*` for locale-sensitive dates, numbers, and currency.

## Accessibility and responsive behavior

The baseline is WCAG 2.2 AA.

- Normal text needs at least 4.5:1 contrast; large text and essential UI boundaries need at least 3:1.
- Text must survive 200% zoom without loss of content or function.
- The layout must reflow at 320 CSS pixels without page-level horizontal scrolling.
- User text-spacing overrides must not clip, overlap, or hide content.
- Use ordered headings, landmarks, one `h1`, a skip link, visible focus, native controls, accessible names, and text alternatives.
- Preserve a usable path with JavaScript, animation, or enhanced interaction unavailable where the feature permits it.
- Check keyboard, reduced motion, narrow layout, and all locales as part of the same change.

## Governance

Before adding a visual value:

1. Identify the semantic role, not the desired pixel value.
2. Reuse the matching component or token.
3. If nothing matches, decide whether the need is page composition, reusable UI, or generated-visual geometry.
4. Add a semantic token only when the role will recur and its purpose can be documented clearly.
5. Update this document when the public design API changes.

Arbitrary page typography, fluid spacing, raw surface shadows, raw border colors, and generic radii are blocked by `tests/design-system.spec.ts`. Illustrative animation and functional diagram geometry are deliberate exceptions. A new public role needs a documented use case, multilingual examples, and proof that an existing role cannot express the decision.

## Review checklist

Before handoff, verify:

- One `h1`; heading order and semantic type roles are correct.
- Equivalent peers use identical type, color, spacing, radius, and state treatment.
- Body copy is 16px or larger; compact text is short and purposeful.
- Prose measure and line breaks work in German, English, and French.
- Only semantic UI colors are used; local raw colors stay inside illustrative palettes.
- Text and UI contrast meet the documented thresholds.
- Spacing comes from the shared rhythm and each gap has one owner.
- Radii use inset, control/card, shell, or pill roles.
- Borders use line, line-strong, or inverse-line roles; floating UI alone uses floating elevation.
- Page openings, sections, split layouts, peer grids, and card insets use their semantic spatial roles.
- Mobile reflows without overflow; text works at 200% zoom.
- Hover, active, focus-visible, error, selected, and reduced-motion states work.
- Claims are supported and the primary next action is obvious.

## Research basis

The system was consolidated after auditing every Webpilot page/component and comparing the decisions with:

- [Vercel’s design.md](https://vercel.com/design.md) for semantic roles, composition, restraint, and implementation guidance.
- [Checklist Design: Typography](https://www.checklist.design/design-system/typography), [Spacing / Grid](https://www.checklist.design/design-system/spacing-and-grid), [Color System](https://www.checklist.design/design-system/color-system), and [Tokens](https://www.checklist.design/design-system/tokens) for system completeness and governance.
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/), including guidance for [contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html), [resize text](https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html), [reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html), and [text spacing](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html).
- [U.S. Web Design System typography](https://designsystem.digital.gov/components/typography/) for readable body size, measure, line height, alignment, and restrained tracking.
- [GOV.UK’s tested type scale](https://design-system.service.gov.uk/styles/type-scale/) and [responsive spacing scale](https://design-system.service.gov.uk/styles/spacing/) for relative units, vertical rhythm, and responsive steps.
- [Carbon typography](https://carbondesignsystem.com/elements/typography/overview/) and [Atlassian typography](https://atlassian.design/foundations/typography/) for semantic editorial/product roles, rem-based accessibility, and optical hierarchy.
- The [Design Tokens Community Group](https://www.designtokens.org/) for a durable single-source-of-truth model across tools and code.

These references are inputs, not templates. The final values are tuned for DM Sans, Webpilot’s real multilingual copy, current component density, and its 1200px editorial field.
