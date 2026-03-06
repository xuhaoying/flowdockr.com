# Release Checklist

Use this checklist before merging a PR into `main` for production release.

## 1. Local Checks

- [ ] `pnpm lint`
- [ ] `pnpm type-check`
- [ ] `pnpm build`

## 2. Page Checks (Vercel Preview)

- [ ] Home page loads correctly and no obvious UI breakage.
- [ ] At least one core scenario page is functional.
- [ ] At least one tool page is functional.
- [ ] Pricing page checked (if enabled in this build).
- [ ] Contact / submission entry checked (if enabled in this build).

## 3. Interaction Checks

- [ ] Input fields accept and keep user input correctly.
- [ ] Core CTA buttons are visible, clickable, and route correctly.
- [ ] Main form submission path works (success + validation).
- [ ] Loading states are visible where expected.
- [ ] Error states show meaningful feedback and no blank failure screens.

## 4. Mobile Checks

- [ ] First screen is readable without layout jump.
- [ ] Primary buttons are visible and tappable.
- [ ] Input interactions are usable on mobile keyboard.
- [ ] No horizontal overflow or clipped layout in key pages.

## 5. SEO Baseline Checks

- [ ] `title` is set on key pages.
- [ ] `description` is set on key pages.
- [ ] Canonical URL is present where expected.
- [ ] Main indexed pages do not show abnormal rendering or routing behavior.

## 6. Conversion Path Check

Validate at least one complete path end-to-end:

- [ ] SEO scenario page -> tool page -> output/CTA -> next action (signup/contact/pricing/checkout).

## 7. Merge Readiness

- [ ] CI status is green on the PR.
- [ ] Manual preview validation notes are added to PR.
- [ ] Risk/rollback impact is understood for this change.
