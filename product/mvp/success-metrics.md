# Success Metrics

Generated: 2026-03-04

## Activation Metric
- Metric: `scope_guard_generated_rate` = users who complete first Scope Guard output / users who start Scope Guard form
- Baseline: 0% (new launch)
- Target (MVP window): >= 45% within first 14 days
- Method: Track events `scope_form_started`, `scope_output_generated`

## Engagement Metric
- Metric: `week1_return_rate` = users who return within 7 days for another generation
- Baseline: 0% (new launch)
- Target: >= 25% in first 14 days
- Method: Cohort query on `user_id` with at least 2 generation events in 7 days

## Quality Metric
- Metric: `accepted_output_rate` = sessions where user copies one generated block / sessions with generated output
- Baseline: 0% (new launch)
- Target: >= 70% copy/use action rate
- Method: Events `scope_output_generated`, `scope_block_copied`; cross-check with usability findings

## Guardrail Metrics

- Form abandonment rate: <= 35%
- Time-to-first-output median: <= 90 seconds
- Error rate on generation API: < 3%
