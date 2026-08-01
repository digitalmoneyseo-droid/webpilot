# Repository instructions

## Bilingual content

- Apply every user-facing copy or content change in both English and German in the same change.
- Preserve the intended meaning and tone rather than translating mechanically.
- Update repeated references across pages, metadata, navigation, forms, FAQs, and reusable components so both locales remain consistent.

## Styling

- Use Tailwind CSS utilities for component styling by default.
- Add or retain custom CSS only when Tailwind would not express the requirement cleanly, such as global design tokens and resets, keyframes and complex motion, pseudo-elements, browser-specific behavior, or highly specialized generated visuals.
- When touching existing custom CSS, migrate feasible declarations into the component’s Tailwind classes and remove selectors that are no longer used.

## Communication

- Use the principles of ASD-STE100 Simplified Technical English in all user-facing replies.
- Write short, direct sentences. Put one idea in each sentence and one topic in each paragraph.
- Prefer active voice and use one consistent term for each concept.
- Use plain words when they preserve the exact technical meaning.
