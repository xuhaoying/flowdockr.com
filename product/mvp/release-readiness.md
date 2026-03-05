# Release Readiness

Generated: 2026-03-04

## Product
- [ ] `/` -> `/scope` -> output generation flow works end-to-end on mobile and desktop
- [ ] Hero problem-entry buttons map to correct module routes
- [ ] SEO page CTA opens Scope form directly

## Quality
- [ ] P0 defects = 0
- [ ] P1 defects <= 2 and have owner + target fix date
- [ ] Smoke tests pass for generation, copy, and signup path

## Metrics
- [ ] Events validated: `scope_form_started`, `scope_output_generated`, `scope_block_copied`, `scope_upgrade_clicked`
- [ ] Basic dashboard/query ready for daily activation and weekly retention

## Operations
- [ ] Fallback behavior defined when generation fails (retry + static template)
- [ ] Support contact path documented on product page
- [ ] Release note draft includes known limitations and next rollout modules

## Decision
- Go / No-Go: Pending
- Decision owner: Founder

## Go Rule

Launch only if all Product and Quality items pass and no unresolved P0/P1 issue compromises generated output reliability.
