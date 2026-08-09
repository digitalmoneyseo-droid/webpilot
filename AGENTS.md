# Webpilot working agreement

We are building Webpilot together.

Webpilot is a multilingual website for an independent digital growth and technology studio. Its purpose is to create trust, explain a broad offer clearly, and move suitable clients toward a conversation.

The site should feel distinctive and refined. Do not trade clarity, credibility, accessibility, responsiveness, or speed for visual novelty.

## Principles

### Clarity before cleverness

Prefer the most obvious complete solution. A visitor should understand what a section means and what to do next. A developer should understand why an implementation exists.

Push back when a simpler or more cohesive solution would produce a better result.

### Evidence before claims

Do not invent client relationships, testimonials, outcomes, or performance claims. Give commercial numbers a verifiable source.

### One experience across locales

All configured locales are one product experience. Keep routes, content structure, metadata, navigation, forms, accessibility labels, and disclosures equivalent across locales.

Preserve the intended meaning and tone. Do not translate mechanically.

### Quality is connected

A visual change is not complete if it damages mobile layout, keyboard use, reduced-motion behavior, or content clarity in any locale.

Motion should explain hierarchy, state, or cause and effect. It should not exist only to make the page busier.

### No silent failures

Interactive states and errors must be visible and actionable. Preserve a usable path when animation or enhanced interaction is unavailable.

The contact form validates enquiries in the browser and on the server, then sends them through Resend without writing them to a website database. Preserve visible success and error states, and keep the required email configuration documented in `.env.example`.

## Implementation

### Clarify consequential uncertainty

Use the questions tool (`request_user_input` when available) before planning or implementation when missing information would materially change the result, scope, architecture, visual direction, acceptance criteria, or an irreversible action. This is especially important when several valid directions exist and the choice belongs to the user.

Inspect the repository, relevant documentation, and existing patterns first. Do not ask the user for information that can be discovered safely, and do not use questions to offload routine implementation decisions. Proceed with a stated, reversible assumption when uncertainty is minor and the likely intent is clear.

When questions are needed:

- Ask early, before committing work to one direction.
- Prefer the structured questions tool over an unstructured chat question when it is available.
- Ask only the one to three questions that unblock the next meaningful decision.
- Offer concise, mutually exclusive choices when possible, put the recommended choice first, and explain the practical tradeoff of each option.
- If the questions tool is unavailable, ask the same concise question directly in chat.
- Continue once the answer is sufficient; do not repeatedly reconfirm settled decisions.

### Design system contract

For every task that creates, changes, reviews, or plans visual design or interface work, read and actively follow `design.md` before making decisions. This includes pages, components, typography, color, spacing, layout, responsive behavior, interaction states, motion, and visual content hierarchy. Backend-only and non-interface tasks do not need to load it.

`design.md` is the design authority for every route and locale. Use it to choose existing roles and patterns, not merely as background reading. `src/styles/typography-system.css` owns the tokens, `src/styles/app.css` exposes their Tailwind utilities, and shared components own recurring composition.

Use semantic roles for typography, color, page spacing, layout gaps, card insets, radii, borders, shadows, and motion. In particular:

- Page sections use `px-page` and `py-section` or `py-section-compact`; page openings use `pt-page-title`.
- Repeated split layouts, peer grids, headings, cards, and overlays use the documented `gap-split`, `gap-grid`, `mb-heading-gap`, `p-card-padding`, `p-card-fluid`, and `px-menu` roles.
- Ordinary component spacing stays on the documented 4px rhythm. The 2px half-step is only for documented optical adjustments inside compact controls.
- Rounded UI uses `rounded-inset`, `rounded-control`, `rounded-card`, `rounded-shell`, or `rounded-pill`.
- Separators use `line`, `line-strong`, or `inverse-line`; rounded surfaces use the matching semantic shadow role. Reserve `shadow-floating` for menus and popovers.

Do not introduce arbitrary typography, fluid page spacing, raw interface colors, raw border colors, raw box shadows, or generic framework radii when a semantic role exists. Generated visuals and functional diagram geometry may use local values, but keep those exceptions self-contained and out of editorial UI.

When a genuinely recurring role is missing, add the semantic token, expose it through Tailwind, document its purpose in `design.md`, and extend the design-system test in the same change. Verify the longest locale, mobile reflow, keyboard focus, and reduced motion after visual changes.

Follow the established component patterns. Use Tailwind for ordinary component styling. Keep custom CSS when it owns tokens, complex motion, pseudo-elements, browser behavior, or generated visuals.

Do not perform unrelated migrations or cleanup.

Use the CI workflow as the source of truth for verification. Run the checks relevant to the changed behavior.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
