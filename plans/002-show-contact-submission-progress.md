# 002 — Show contact submission progress

- **Status**: DONE
- **Commit**: 4ec0c96
- **Severity**: MEDIUM
- **Category**: Missed opportunities / feedback and state indication
- **Estimated scope**: 3 files, roughly 45–65 lines

## Problem

The contact form keeps its normal submit label and arrow after a valid submission. Turnstile verification, email delivery, and the redirect can take long enough to make the click feel unheard and invite a second click. This is an occasional, high-intent action; brief motion should confirm progress without delaying the native form submission.

```astro
<!-- src/components/pages/ContactPage.astro:100 — current -->
<button class="form-submit" type="submit">
  <span class="form-submit__label">
    <span class="form-submit__label-track">
      <span>{locale === "de" ? "Anfrage senden" : "Send enquiry"}</span>
      <span aria-hidden="true">{locale === "de" ? "Anfrage senden" : "Send enquiry"}</span>
    </span>
  </span>
  <span class="pill-button__icon" aria-hidden="true">
    <Icon name="arrow-right" class="pill-button__arrow pill-button__arrow--right" />
    <Icon name="arrow-up-right" class="pill-button__arrow pill-button__arrow--up-right" />
  </span>
</button>
```

The submit handler only handles the missing-interest error. Valid submissions return immediately to browser default behavior with no pending state:

```ts
// src/components/pages/ContactPage.astro:155 — current
document.querySelector<HTMLFormElement>("[data-contact-form]")?.addEventListener("submit", (event) => {
  const form = event.currentTarget as HTMLFormElement;
  const selectedInterests = form.querySelectorAll<HTMLInputElement>('input[name="interests"]:checked');
  if (selectedInterests.length) return;
  event.preventDefault();
  if (!status) return;
  status.hidden = false;
  status.textContent = document.documentElement.lang === "de" ? "Bitte wählen Sie mindestens einen Interessenbereich." : "Choose at least one area of interest.";
  status.focus();
});
```

## Target

After a valid `submit` event, morph the button from its idle label and arrow to localized pending copy plus a small spinner. Start the visual response immediately; do not wait for `fetch`, Turnstile, or server output. Keep native form navigation intact.

- Idle content exits with `opacity: 0` and `transform: translateY(-6px)` over `180ms cubic-bezier(0.23, 1, 0.32, 1)`.
- Pending content enters from `opacity: 0` and `transform: translateY(6px)` to settled over the same `180ms` curve.
- Arrow container exits with `opacity: 0` and `transform: translateX(6px) scale(0.9)` over `160ms cubic-bezier(0.23, 1, 0.32, 1)`.
- Spinner uses constant `transform: rotate(360deg)` motion over `800ms linear infinite`.
- Under `prefers-reduced-motion: reduce`, retain a `160ms` opacity crossfade, remove all translation/scale, and stop spinner rotation. Pending text remains sufficient state feedback.

Add pending markup beside the existing label. Keep it in the same button so layout and focus remain stable:

```astro
<!-- target shape; localized copy must remain server-rendered -->
<button class="form-submit" type="submit" data-submit-button data-state="idle">
  <span class="form-submit__idle">
    <!-- existing form-submit__label and label-track, unchanged -->
  </span>
  <span class="form-submit__pending" aria-hidden="true">
    <span class="form-submit__spinner" aria-hidden="true"></span>
    <span>{locale === "de" ? "Wird gesendet…" : "Sending…"}</span>
  </span>
  <!-- existing pill-button__icon, unchanged -->
</button>
```

For a valid submission, set state and accessibility synchronously:

```ts
// target valid-submit branch
const submitButton = form.querySelector<HTMLButtonElement>("[data-submit-button]");
if (selectedInterests.length) {
  if (submitButton) {
    submitButton.dataset.state = "submitting";
    submitButton.disabled = true;
    submitButton.setAttribute("aria-busy", "true");
    submitButton.setAttribute("aria-label", document.documentElement.lang === "de" ? "Anfrage wird gesendet" : "Sending enquiry");
    submitButton.querySelector<HTMLElement>(".form-submit__pending")?.setAttribute("aria-hidden", "false");
  }
  return;
}
```

Only enter this branch after existing client-side interest validation passes. Native required-field validation occurs before `submit`, so invalid name, email, or brief fields must never show pending state. Do not intercept the request or replace native form submission with `fetch`.

## Repo conventions to follow

- Shared motion tokens already live in `src/styles/global.css:18`: `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)` and `--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1)`. Reuse `var(--ease-out)`; add no easing token.
- `src/styles/global.css:104–124` already uses clipped label tracks, arrow crossfades, and press feedback for CTA buttons. Preserve that visual language.
- `src/components/pages/ContactPage.astro:119–164` keeps page-specific form behavior beside its markup in plain TypeScript. Add pending-state logic there; add no framework or motion library.
- `src/styles/global.css:315–320` centralizes reduced-motion overrides. Put the pending-state override in that existing media query.

## Steps

1. In `src/components/pages/ContactPage.astro`, add `data-submit-button` and `data-state="idle"` to the submit button. Wrap the current label in `.form-submit__idle`; add the localized `.form-submit__pending` markup shown above. Leave the existing arrow markup intact.
2. In the existing submit listener, keep the missing-interest error branch behavior exactly as-is. When at least one interest is selected, set `data-state="submitting"`, `disabled`, `aria-busy="true"`, localized `aria-label`, and pending `aria-hidden="false"`, then return without calling `preventDefault()`.
3. In `src/styles/global.css` beside the current `.form-submit__label` rules, layer `.form-submit__idle` and `.form-submit__pending` in the button without changing button dimensions. Add the exact transform, opacity, duration, and easing values from **Target**. Draw the spinner with one element and borders; animate only its `transform`.
4. Extend the existing reduced-motion block in `src/styles/global.css`: keep `160ms` opacity transitions, force both state wrappers and the icon to use no translation/scale, and set spinner animation to `none`.
5. Extend the contact-page test in `tests/e2e/site.spec.ts`. Fill native required fields, select one interest, install a test-only `submit` listener that calls `preventDefault()` so navigation does not hide the state, submit once, then assert `data-state="submitting"`, `disabled`, `aria-busy="true"`, and localized pending text. Add a second assertion that submitting with no interests shows the existing error and leaves button enabled with `data-state="idle"`.

## Boundaries

- Do NOT change `src/contact/intake.ts`, `src/worker.ts`, Turnstile setup, endpoint behavior, redirects, form field names, validation rules, or success/error status copy.
- Do NOT replace native form submission with `fetch` or add artificial delay.
- Do NOT disable the whole form; only disable submit button after valid `submit` event fires.
- Do NOT add a success celebration here. Redirected status message remains separate UI.
- Do NOT alter existing hover label/arrow animation, button size, or surrounding form layout.
- Do NOT add dependencies, canvas, SVG loaders, layout-property animation, blur, bounce, or stagger.
- If markup or submit flow differs from commit `4ec0c96`, STOP and report drift instead of improvising.

## Verification

- **Mechanical**: run `npm run typecheck`, then `npx playwright test tests/e2e/site.spec.ts --grep "contact page presents project enquiry form"`. Both commands must exit `0`. Do not run broader suites unless these checks expose related failures.
- **Feel check**: run `npm run dev`, open `/en/contact`, complete required fields, select one interest, and submit through a throttled connection. Confirm:
  - Feedback begins immediately after valid submission; button never waits for server response before changing.
  - Idle label moves up while `Sending…` moves in from below; arrow leaves toward the right.
  - Button width, height, form layout, and focus position do not jump.
  - Repeated clicks cannot create duplicate submissions because button becomes disabled.
  - Native-invalid fields prevent the submit event and leave button in idle state.
  - Missing interests show existing focused error message and leave button enabled in idle state.
  - In DevTools Animations at `10%` playback, state layers use one continuous `180ms` transition and arrow uses `160ms`; no layout property animates.
  - With `prefers-reduced-motion: reduce`, labels crossfade for `160ms` without spatial movement and spinner stays still.
- **Done when**: every valid contact submission gets immediate, localized, accessible pending feedback while native POST/redirect and all invalid paths remain unchanged.
