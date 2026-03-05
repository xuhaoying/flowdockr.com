# seo_pages v2 Schema

Generated: 2026-03-05

## Required Fields

- `id`: stable unique id, slug-safe (`SEO-0001`)
- `status`: `idea | queued | generated | reviewed | published | update_needed`
- `page_type`: `problem | tool | industry | cluster | pillar`
- `cluster`: `negotiation | pricing | client-communication | proposals | objections | email-scripts | rate-increase | tools`
- `primary_keyword`
- `title`
- `slug`
- `situation` (problem page scenario key)
- `variables_json`
- `target_tool`
- `pillar_ref`
- `related_refs` (pipe-delimited ids)
- `last_generated_at`
- `published_at`

## Recommended Fields

- `quality_score` (`0-100`)
- `flags` (`missing_heading|missing_task_cta|...`)
- `gsc_impressions`
- `gsc_clicks`
- `ctr`
- `avg_position`
- `refresh_reason` (`low_ctr | outdated | new_feature | quality_gate_failed`)

## Compiler-Owned Fields

- `route`
- `cta_type`
- `tier`
- `source_page_id`

## Status Lifecycle

1. `idea`: backlog candidate
2. `queued`: ready to compile
3. `generated`: draft published to MDX
4. `reviewed`: failed gate or manual hold
5. `published`: passed gate (`quality_score >= 80`)
6. `update_needed`: selected by weekly refresh logic

## Notes

- Internal links are data-driven (`pillar_ref`, `related_refs`, `target_tool`).
- Route should remain stable during refresh updates.
- Keep one row per canonical URL.
