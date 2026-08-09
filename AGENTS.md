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

Before planning, implementing, or reviewing visual design or interface work, read and actively follow `DESIGN.md`. This includes pages, components, typography, color, spacing, layout, responsive behavior, interaction states, motion, and visual content hierarchy. Backend-only and non-interface tasks are exempt.

Treat the responsibilities in `DESIGN.md` as a contract: it owns visual intent, public roles, exceptions, and review criteria; the token CSS owns current values; the Tailwind theme owns utility exposure; shared components own recurring composition. A disagreement between those sources is a defect to resolve, not permission to choose whichever is convenient.

Reuse semantic roles and shared components before adding values or copying compositions. Keep local values inside the documented generated-visual, service-visual, or functional-geometry exceptions. When a genuinely recurring role is missing, add the token, expose it through Tailwind, document it in `DESIGN.md`, and extend relevant design-system coverage in the same change.

Use Tailwind for ordinary component styling. Keep custom CSS for tokens, complex motion, pseudo-elements, browser behavior, and generated visuals. Verify the longest locale, narrow reflow, keyboard focus, and reduced motion after visual changes.

Do not perform unrelated migrations or cleanup.

Use the CI workflow as the source of truth for verification. Run the checks relevant to the changed behavior.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
