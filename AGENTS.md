# Project Instructions

## Scope and Communication

- Treat questions as requests for information only. Do not modify files or external state unless the user explicitly asks for a change.
- Inspect the repository and existing patterns before asking questions. Ask only when missing information would materially change the result; otherwise proceed with a stated, reversible assumption.
- Use browser automation or computer-use tools only for relevant local verification or when the user explicitly requests external interaction.
- Keep updates concise and state any assumptions that affect the implementation.

## Product Scope

- Webpilot is the multilingual website of an independent digital growth and technology studio. It should build trust, explain the offer clearly, and move suitable clients toward a conversation.
- Keep routes, content structure, metadata, navigation, forms, accessibility labels, and disclosures equivalent across all configured locales. Preserve meaning and tone rather than translating mechanically.
- Do not invent clients, testimonials, results, performance claims, or commercial numbers. Give commercial claims a verifiable source.
- Prefer clarity, credibility, accessibility, responsiveness, and speed over visual novelty.

## Project Conventions

- Use Bun for package management and project scripts.
- Use Next.js with the App Router, TypeScript, and Tailwind CSS.
- Prefer Server Components and static rendering. Add Client Components only when browser-side interactivity requires them.
- Keep architecture local and simple until another service or abstraction is demonstrably needed.

## Design and Interface Work

- Read and follow `DESIGN.md` before planning, implementing, or reviewing interface work.
- Treat `DESIGN.md` as the authority for visual intent and public roles, token CSS as the authority for current values, the Tailwind theme as the utility layer, and shared components as the owner of recurring composition.
- Reuse semantic roles and shared components before adding values or copying compositions. When a new recurring role is necessary, add the token, expose it through Tailwind, document it in `DESIGN.md`, and extend relevant coverage in the same change.
- Use Tailwind for ordinary component styling. Reserve custom CSS for tokens, complex motion, pseudo-elements, browser behavior, and generated visuals.
- Motion should explain hierarchy, state, or cause and effect. Preserve a usable path when motion or enhanced interaction is unavailable.
- Maintain keyboard access, visible focus, narrow-screen reflow, reduced-motion behavior, performance, and content clarity in every locale.

## Engineering

- Prefer the smallest clear solution and avoid speculative abstractions or dependencies.
- Preserve existing work, inspect relevant files before editing, and do not perform unrelated migrations or cleanup.
- Use strict TypeScript. Avoid `any`; define accurate types or use `unknown` until a value is narrowed.
- Do not allow interactive failures to remain silent.

## Verification

- Match verification effort to the risk and scope of the change. Do not run broad or repetitive checks for trivial edits.
- For functional changes, run the smallest relevant content, lint, type, test, or build command and report checks that could not be completed.
- For interface changes, verify the longest locale, narrow reflow, keyboard focus, and reduced motion.
- Use the CI workflow as the source of truth for required checks.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
