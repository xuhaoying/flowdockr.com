# Flowdockr SEO Factory v2 Operations

Generated: 2026-03-05

## Objective

North-star metric: SEO-driven activation (`first successful generation`) rather than pageview.

Conversion loop:

1. Search lands on problem page.
2. User sees copy-ready guidance + task CTA.
3. User gets instant output from `/deal` `/pricing` or `/scope`.
4. User copies/saves result.
5. User signs up for persistence and advanced generation.

## Data Model

Source of truth table:

- `product/seo/factory/seo-pages.v2.csv`

Required fields:

- `id`, `status`, `page_type`, `cluster`, `primary_keyword`, `title`, `slug`
- `situation`, `variables_json`, `target_tool`, `pillar_ref`, `related_refs`
- `last_generated_at`, `published_at`

Quality and refresh fields:

- `quality_score`, `flags`
- `gsc_impressions`, `gsc_clicks`, `ctr`, `avg_position`
- `refresh_reason`

Compiler configs:

- `product/seo/factory/prompt-system-v2.json`
- `product/seo/factory/quality-gates-v2.json`

## Page Types

1. `problem`: immediate scenario resolution.
2. `tool`: conversion-first utility entry.
3. `cluster`/`industry`: scalable long-tail intent capture.
4. `pillar`: topical authority hub.

## Pipelines

Pipeline A: Generate

1. Load `seo_pages` where `status in (queued, update_needed)`.
2. Compile prompt jobs (`content-prompt-jobs-v2.jsonl`).
3. Generate drafts with LLM (`content-drafts-v2.jsonl`).
4. Publish drafts to `content/pages/**`.
5. Mark pages `generated` with `last_generated_at`.

Pipeline B: Quality + Publish Gate

1. Run strict quality gate.
2. Write `quality_score` + `flags` back to `seo_pages`.
3. Auto status:
   - `published` when `quality_score >= 80`
   - `reviewed` otherwise
4. Emit rewrite queue (`content-rewrite-queue-v2.jsonl`) for failed pages.

Pipeline C: Weekly Refresh

1. Backfill GSC metrics to `seo_pages`.
2. Mark low CTR pages as `update_needed` (`low_ctr`).
3. Re-run compile/generate/quality only for that subset.

## Quality Gates

Hard gates (fail fast):

- required heading contract by page type,
- required CTA patterns,
- required schema terms (`FAQPage` and `HowTo` where required),
- problem replies tone variants,
- word count window (`problem 1200-1800`, `tool 1000-1500`).

Soft gates (scored):

- banned AI-cliche phrases,
- mistakes/replies/FAQ minimum counts,
- related links minimum counts.

Status policy:

- `quality_score >= 80` -> publish eligible.
- otherwise -> `reviewed` + rewrite prompt.

## Internal Linking

Compiler-driven links only (not model-guessed):

- `1` pillar link from `pillar_ref`
- `2-4` related links from `related_refs`
- `1` tool link from `target_tool`

Graph artifact:

- `product/seo/generated/internal-links-graph-v2.json`

## Build Commands

```bash
pnpm seo:map:part1
pnpm seo:factory:init-db
pnpm seo:factory:compile
pnpm seo:factory:drafts
pnpm seo:factory:publish
pnpm seo:factory:quality:jobs
pnpm seo:factory:links
pnpm seo:factory:sitemap
```

Dry-run generation:

```bash
pnpm seo:factory:drafts:dry
```

One-command content compiler (requires `OPENAI_API_KEY`):

```bash
pnpm seo:factory:content
```

Weekly refresh mark:

```bash
pnpm seo:factory:refresh
```

## CI/CD

Workflow file:

- `.github/workflows/publish-seo-content.yml`

Current flow:

- install dependencies
- regenerate sitemap
- run build
- upload SEO artifacts
- deploy hook placeholder for Vercel integration

## 90-Day Rollout Guidance

- Week 1-2: 6 pillar + 5 tool + 30 problem pages.
- Week 3-6: scale to 120 problem pages with strict gate only.
- Week 7-12: push industry pages gradually and run CTR refresh loop weekly.
