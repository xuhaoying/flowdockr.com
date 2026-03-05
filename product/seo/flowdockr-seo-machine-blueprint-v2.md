# Flowdockr SEO Machine Blueprint v2

Generated: 2026-03-05

## 1) System Layers

1. Demand DB: curated freelancer problem intents.
2. Structure map: route matrix and expansion rules.
3. `seo_pages` DB: status-driven content compiler input.
4. Prompt compiler: page-type templates + link/schema contract.
5. LLM draft generation: queued batch with retries.
6. Strict quality gate: hard rules + scoring + rewrite queue.
7. Publishing: MDX output, publish log, status transitions.
8. Topical authority graph: compiler-generated internal links.
9. Indexing: sitemap regeneration and deployment.

## 2) Route Architecture

- `/negotiation/*`
- `/pricing/*`
- `/client-communication/*`
- `/proposals/*`
- `/objections/*`
- `/email-scripts/*`
- `/rate-increase/*`
- `/tools/*`

Pillar routes:

- `/freelance-negotiation-guide`
- `/freelance-pricing-guide`
- `/client-communication-guide`
- `/freelance-proposal-guide`
- `/freelance-email-templates`
- `/how-to-raise-freelance-rates`

## 3) Content Compiler Contract

Input row (`seo_pages.v2.csv`):

- page metadata: `id`, `page_type`, `cluster`, `title`, `slug`, `primary_keyword`
- status control: `status`
- conversion control: `target_tool`
- internal links: `pillar_ref`, `related_refs`
- quality/perf: `quality_score`, `flags`, `gsc_*`, `refresh_reason`

Compiler output:

- `content-prompt-jobs-v2.jsonl`
- `content-drafts-v2.jsonl`
- MDX pages under `content/pages/**`
- `content-quality-report-v2.json`
- `content-rewrite-queue-v2.jsonl`
- `internal-links-graph-v2.json`
- `content-publish-log-v2.md`

## 4) Build Pipeline

1. `init-seo-pages-db-v2.mjs`
2. `generate-content-prompt-jobs-v2.mjs --source=seo-pages`
3. `generate-content-drafts-v2.mjs`
4. `publish-content-drafts-v2.mjs`
5. `quality-gate-content-v2.mjs --source=prompt-jobs`
6. `build-internal-links-graph-v2.mjs`
7. `generate-sitemap-v2.mjs`

One-command pipeline:

```bash
pnpm seo:factory:content
```

## 5) Gate And Rollback Logic

- Hard gate fail -> `status=reviewed`, push rewrite prompt.
- Score < 80 -> `status=reviewed`.
- Score >= 80 -> `status=published`.
- Weekly CTR refresh -> `status=update_needed`.

No destructive overwrite of URLs during refresh; rewrite keeps route stable.

## 6) KPI Loop

Track per cluster and page type:

- impressions, CTR, avg position
- SEO route -> tool CTA click
- tool click -> signup
- signup -> first generation

Optimization actions:

- high impressions + low CTR -> rewrite title/intro/FAQ.
- high CTR + low activation -> improve CTA and tool handoff.
- high activation + low paid -> improve in-product continuation.
