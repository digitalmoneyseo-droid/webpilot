# Repository instructions

## Bilingual content

- Apply every user-facing copy or content change in both English and German in the same change.
- Preserve the intended meaning and tone rather than translating mechanically.
- Update repeated references across pages, metadata, navigation, forms, FAQs, and reusable components so both locales remain consistent.

## Styling

- Use Tailwind CSS utilities for component styling by default.
- Add or retain custom CSS only when Tailwind would not express the requirement cleanly.
- When touching existing custom CSS, migrate feasible declarations into the component’s Tailwind classes and remove selectors that are no longer used.
