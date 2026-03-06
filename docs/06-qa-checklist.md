# QA Checklist (Pre-Launch)

## API Contract
- [ ] `/api/deal-strategy/generate` returns valid JSON shape from `/docs/03-ai-contract.md`.
- [ ] Enum values always within allowed set.
- [ ] `ghosting_probability` always in `[0, 1]`.
- [ ] Missing-input fallback returns `next_move = ask_clarifying`.
- [ ] Missing pricing fallback avoids outputting invalid numeric prices.

## UI Rendering
- [ ] All result cards render without runtime errors.
- [ ] Card labels match contract field semantics.
- [ ] Parse failure shows friendly message + fallback instruction.
- [ ] Copy action works for `instant_reply`.

## Business Rules
- [ ] Never suggest price below floor.
- [ ] Concession steps max length is 3.
- [ ] No manipulative or false-guarantee language.

## Landing
- [ ] Hero copy matches `/docs/04-landing-copy.md`.
- [ ] Demo section shows input + output structure.
- [ ] Use cases section complete.
- [ ] FAQ includes all 3 mandatory questions.

## SEO Gate
- [ ] Non-production remains `noindex,nofollow`.
- [ ] `robots` blocks crawling in preview.
- [ ] Sitemap only used after quality gate passes.

