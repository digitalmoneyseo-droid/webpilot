# 001 — Smooth portfolio filter changes

- **Status**: TODO
- **Commit**: uncommitted workspace (no `HEAD` exists)
- **Severity**: MEDIUM
- **Category**: Missed opportunities / state indication
- **Estimated scope**: 3 files, roughly 45–65 lines

## Problem

The Work index changes two visually important states in the same synchronous loop: non-matching cards become `hidden`, and the first card gains or loses its full-width featured layout. The grid therefore reflows in a single frame. On desktop this can move several large project cards by hundreds of pixels, making the relationship between the selected filter and the new result set harder to follow.

```astro
<!-- src/components/pages/WorkIndexPage.astro:22 — current -->
buttons.forEach((button) => button.addEventListener("click", () => {
  const filter = button.dataset.filter ?? "All";
  buttons.forEach((item) => { const active = item === button; item.classList.toggle("is-active", active); item.setAttribute("aria-pressed", String(active)); });
  let count = 0;
  projects.forEach((project) => {
    const categories = JSON.parse(project.dataset.categories ?? "[]") as string[];
    const visible = filter === "All" || categories.includes(filter);
    project.hidden = !visible;
    project.classList.toggle("project-card--featured", filter === "All" && project === projects[0]);
    if (visible) count += 1;
  });
  if (announcement) announcement.textContent = `${count} ${document.documentElement.lang === "de" ? "Projekte" : "projects"}`;
}));
```

The layout rules make the jump especially visible:

```css
/* src/styles/global.css:181 — current */
.work-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:18px}.work-grid .project-card--featured{grid-column:1/-1;min-height:720px}.work-grid .project-card--featured .project-visual{min-height:610px}.work-grid .project-card--featured .project-card-copy h3{font-size:30px}
```

This interaction is occasional, not keyboard-driven or continuously repeated. Its purpose is **state indication** and **preventing a jarring change**, so it qualifies for brief motion. The implementation must remain progressive enhancement: unsupported browsers keep the current instant, accessible filtering behavior.

## Target

Use the browser View Transitions API to preserve each visible card’s spatial identity across the filter update. Retained cards move to their new grid positions over `250ms` with the strong on-screen movement curve `cubic-bezier(0.77, 0, 0.175, 1)`. Cards that enter or leave crossfade over `180ms` with `cubic-bezier(0.23, 1, 0.32, 1)`. Only the browser-generated `transform` and `opacity` are animated.

Add the exact tokens below without refactoring existing animation declarations in this plan:

```css
/* src/styles/global.css:8 — target additions */
:root {
  --ease-out: cubic-bezier(0.23, 1, 0.32, 1);
  --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
}
```

Give each filterable project a stable transition name once, outside the click handler:

```ts
// src/components/pages/WorkIndexPage.astro — target setup
projects.forEach((project, index) => {
  project.style.viewTransitionName = `portfolio-card-${index}`;
});

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
type ViewTransitionHandle = { finished: Promise<void>; skipTransition: () => void };
type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void) => ViewTransitionHandle;
};
let activeTransition: ViewTransitionHandle | null = null;
```

Extract the existing synchronous DOM update into `applyFilter(button)`. Wrap only that function in `startViewTransition` when the API exists and reduced motion is not requested. If a second filter is clicked before the previous transition finishes, call `skipTransition()` before starting the new one so rapid input never queues stale animation:

```ts
// src/components/pages/WorkIndexPage.astro — target click behavior
const applyFilter = (button: HTMLButtonElement) => {
  const filter = button.dataset.filter ?? "All";
  buttons.forEach((item) => {
    const active = item === button;
    item.classList.toggle("is-active", active);
    item.setAttribute("aria-pressed", String(active));
  });

  let count = 0;
  projects.forEach((project) => {
    const categories = JSON.parse(project.dataset.categories ?? "[]") as string[];
    const visible = filter === "All" || categories.includes(filter);
    project.hidden = !visible;
    project.classList.toggle("project-card--featured", filter === "All" && project === projects[0]);
    if (visible) count += 1;
  });
  if (announcement) announcement.textContent = `${count} ${document.documentElement.lang === "de" ? "Projekte" : "projects"}`;
};

buttons.forEach((button) => button.addEventListener("click", () => {
  const viewTransitionDocument = document as ViewTransitionDocument;
  if (reducedMotion.matches || !viewTransitionDocument.startViewTransition) {
    activeTransition?.skipTransition();
    activeTransition = null;
    applyFilter(button);
    return;
  }

  activeTransition?.skipTransition();
  const transition = viewTransitionDocument.startViewTransition(() => applyFilter(button));
  activeTransition = transition;
  void transition.finished.finally(() => {
    if (activeTransition === transition) activeTransition = null;
  });
}));
```

Style the generated card snapshots. Disable the root crossfade so the page chrome, hero, and filter buttons do not flash. The wildcard selectors are safe because this update assigns explicit transition names only to the portfolio cards; `root` is overridden separately.

```css
/* src/styles/global.css — target additions beside .work-grid */
@supports (view-transition-name: none) {
  ::view-transition-group(*) {
    animation-duration: 250ms;
    animation-timing-function: var(--ease-in-out);
  }

  ::view-transition-old(*),
  ::view-transition-new(*) {
    animation-duration: 180ms;
    animation-timing-function: var(--ease-out);
  }

  ::view-transition-old(root),
  ::view-transition-new(root) {
    animation: none;
  }
}
```

When `prefers-reduced-motion: reduce` is active, the script bypasses the spatial transition entirely. The existing `200ms` filter-button color change remains as gentle, non-positional state feedback; do not remove it.

## Repo conventions to follow

- Global design values and component motion live in `src/styles/global.css`; keep the new easing tokens and View Transition selectors there.
- `src/styles/global.css:42` and `src/styles/global.css:243` establish the site’s crisp, strongly eased visual character. The new tokens use the audit catalog’s exact strong curves rather than introducing weak built-in easing.
- `src/components/pages/WorkIndexPage.astro:17` keeps page-specific behavior next to its markup in a plain Astro client script. Do the same; do not add a client framework or motion dependency.
- `src/components/pages/WorkIndexPage.astro:33` already updates the polite live region in the same state mutation. Keep that announcement synchronous with the filter result so accessibility feedback is never delayed by animation.
- `src/styles/global.css:235` centralizes reduced-motion behavior. The new script-level media query is necessary because the spatial transition itself must be skipped before capture; the CSS button-color feedback remains intact.

## Steps

1. In `src/styles/global.css`, add `--ease-out` and `--ease-in-out` to `:root` with the exact cubic-bezier values shown in **Target**. Do not replace or consolidate existing hard-coded curves in this plan.
2. In `src/components/pages/WorkIndexPage.astro`, assign a unique `viewTransitionName` to each element in the existing `projects` array immediately after it is collected.
3. In the same script, move the current filter DOM mutation into `applyFilter(button)` without changing filter matching, `hidden`, featured-card, `aria-pressed`, or live-region semantics.
4. Add the typed progressive-enhancement wrapper shown in **Target**. Bypass it for unsupported browsers and reduced motion; skip an active transition before starting another.
5. In `src/styles/global.css`, add the View Transition pseudo-element rules shown in **Target** beside `.work-grid`. Animate only the browser snapshots’ transform and opacity; do not add blur, bounce, stagger, or layout-property transitions.
6. Extend `tests/e2e/site.spec.ts` within the existing `"FAQ and filters expose accessible state"` test: click `AI`, immediately click `All`, then assert `All` has `aria-pressed="true"`, every project is visible again, and the live region reports `8 projects`. This verifies that interrupting a transition cannot leave stale filter state.

## Boundaries

- Do NOT touch `src/components/ProjectCard.astro`; stable names can be assigned from the existing project NodeList.
- Do NOT animate the filter row, the entire page, scroll position, height, width, grid tracks, margins, or padding.
- Do NOT change filtering semantics, project ordering, responsive grid rules, markup structure, focus behavior, or live-region timing.
- Do NOT animate the reduced-motion path spatially. Its existing color transition is the retained state feedback.
- Do NOT add Framer Motion, Motion One, GSAP, or any other dependency.
- Do NOT broaden this task into refactoring existing easing declarations or scroll reveals.
- If View Transition pseudo-element behavior or TypeScript DOM types differ from the target code in the installed Astro/TypeScript toolchain, STOP and report the drift instead of replacing the approach with hand-written FLIP animation.

## Verification

- **Mechanical**: run `npm run typecheck`, `npm run lint`, and `npm run test:e2e -- --grep "FAQ and filters"`. All commands must exit `0`; the filter test must finish with `All` active, `8` visible cards, and `8 projects` in the live region.
- **Feel check**: run `npm run dev`, open `/en/work` at desktop width, and confirm:
  - Selecting `AI` makes retained cards travel to their new grid positions instead of teleporting.
  - Returning to `All` visibly restores the first card’s featured span without flashing the hero, header, or filter controls.
  - Entering and leaving cards crossfade; no element scales from zero, blurs, bounces, or changes layout through animated `height`, `width`, or grid properties.
  - Clicking `AI`, `Brand`, and `All` rapidly ends on the last clicked filter without queued movement or a stale result count.
  - In Chrome DevTools’ Animations panel at `10%` playback speed, retained cards follow one continuous `250ms` spatial move and snapshots use the `180ms` crossfade; the root page does not crossfade.
  - Emulate `prefers-reduced-motion: reduce`, repeat the filter changes, and confirm cards update immediately with no spatial travel while the active filter’s background/color still transitions.
  - Repeat at `390px` width and confirm the one-column grid does not acquire unnecessary sideways motion.
- **Done when**: filtering preserves the existing DOM, accessibility, and responsive behavior; supported non-reduced-motion browsers bridge card reflow in `250ms`; unsupported and reduced-motion browsers retain the current instant content update plus clear button-state feedback.
