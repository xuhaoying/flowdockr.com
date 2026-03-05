# Flowdockr SEO Machine Assets

Generated: 2026-03-04

## Files

- `flowdockr-keyword-library-v1.csv`: 300-keyword master library (clustered + prioritized).
- `flowdockr-build-queue-first-100.csv`: first 100-page publishing queue (10 weeks, 10 pages/week).
- `flowdockr-keyword-library-v1.md`: assumptions, KPI loop, and known gaps.
- `flowdockr-keyword-library-curated-v1.csv`: curated high-intent library based on real freelancer problem queries (120 keywords).
- `flowdockr-keyword-library-curated-v1.md`: source split and cluster summary for curated library.
- `flowdockr-phase1-queue-30.csv`: phase-1 queue (30 posts with 10/8/7/5 split).
- `generated/article-briefs-phase1-30.jsonl`: content briefs for phase-1 queue.
- `generated/programmatic-pages-phase1.json`: generated route manifest for phase-1 pages.
- `factory/intents.v2.json`: normalized intent table for factory rendering.
- `factory/assets.v2.json`: reusable strategy and reply assets by intent.
- `factory/pillars.v2.json`: 6 pillar page definitions.
- `factory/tools.v2.json`: tool page definitions.
- `factory/structure-map-v2-part1.config.json`: 300+ page structure blueprint config.
- `factory/structure-map-v2-part1.core.csv`: 114 core pages route map.
- `factory/structure-map-v2-part1.expanded.csv`: 300 expanded pages route map.
- `factory/structure-map-v2-part1.all.csv`: merged map (414 pages).
- `factory/structure-map-v2-part1.generated.json`: structured machine-readable output.
- `factory/structure-map-v2-part1.summary.md`: human summary and counts.
- `factory/seo-pages.v2.csv`: source-of-truth page database (`status`, `cluster`, `tool`, `refs`, `quality` metrics).
- `factory/seo-pages.v2.summary.md`: status/type summary for initialization.
- `factory/seo-pages.v2.schema.md`: Notion/Airtable-compatible field contract and lifecycle.
- `factory/prompt-system-v2.json`: Part 2 high-quality prompt templates and anti-AI style rules.
- `factory/quality-gates-v2.json`: strict content gate rules and rewrite trigger thresholds.
- `generated/programmatic-pages-v2.json`: v2 page manifest (problem + pillar + tool + hubs).
- `generated/content-prompt-jobs-v2.jsonl`: per-route prompt job queue for LLM generation.
- `generated/content-drafts-v2.jsonl`: model output drafts mapped by `job_id`.
- `generated/content-publish-manifest-v2.json`: publish result and page list.
- `generated/content-publish-log-v2.md`: release log for published SEO pages.
- `generated/content-quality-report-v2.json`: strict quality gate report.
- `generated/content-rewrite-queue-v2.jsonl`: failed pages with targeted rewrite prompts.
- `generated/internal-links-graph-v2.json`: compiler-generated internal link graph.
- `generated/internal-links-graph-v2.md`: link graph summary for hub authority checks.
- `generated/update-needed-report-v2.md`: weekly `update_needed` detection output.
- `flowdockr-seo-machine-blueprint-v2.md`: system architecture and execution contract.
- `seo-factory-v2-ops.md`: runbook for data model, quality gates, and rollout cadence.

## Suggested Workflow (V2 Factory)

1. Generate curated demand database (`120` keywords).
2. Build factory datasets (`intents.v2.json` + `assets.v2.json`).
3. Initialize/refresh `seo_pages` database (`status` + refs + target tool).
4. Compile queued pages (`status in queued/update_needed`) into prompt jobs.
5. Generate drafts with LLM, then publish drafts to `content/pages/**`.
6. Run strict quality gates (structure + tone + links + schema + rewrite queue) and write scores back to `seo_pages`.
7. Build internal-link graph and regenerate `public/sitemap.xml`.
8. Deploy and monitor funnel:
   - organic landing -> tool CTA click -> signup -> first generation

## Automation Helper (V2)

- Generate Part 1 structure map (`114 core + 300 expanded`):
  - `pnpm seo:map:part1`
- Initialize `seo_pages` database:
  - `pnpm seo:factory:init-db`
- Compile prompt jobs from queued `seo_pages` rows:
  - `pnpm seo:factory:compile`
- Generate Part 2 prompt jobs:
  - `pnpm seo:factory:prompts`
- Generate drafts using OpenAI:
  - `pnpm seo:factory:drafts`
- Generate drafts in dry-run mode:
  - `pnpm seo:factory:drafts:dry`
- Publish generated drafts:
  - `pnpm seo:factory:publish`
- Run strict quality gate (published manifest pages):
  - `pnpm seo:factory:quality`
- Run strict quality gate against all prompt jobs:
  - `pnpm seo:factory:quality:jobs`
- Build internal links graph:
  - `pnpm seo:factory:links`
- Mark `update_needed` pages from performance metrics:
  - `pnpm seo:factory:refresh`
- Run content compiler end-to-end (requires `OPENAI_API_KEY`):
  - `pnpm seo:factory:content`
- Run product quality benchmark for Deal output (5 scenario stress test):
  - `pnpm qa:deal-quality`
- Build full v2 factory in one command:
  - `pnpm seo:factory`
- Build factory datasets only:
  - `pnpm seo:factory:data`
- Render programmatic pages only:
  - `pnpm seo:factory:pages`
- Run quality gates only:
  - `pnpm seo:factory:validate`
- Regenerate sitemap only:
  - `pnpm seo:factory:sitemap`

## Legacy Commands (V1)

- Regenerate keyword library:
  - `node scripts/seo/generate-keyword-library.mjs`
- Regenerate first-100 publish queue:
  - `node scripts/seo/generate-build-queue.mjs`
- Generate article briefs for the first 100 pages:
  - `node scripts/seo/generate-article-briefs.mjs`
- Regenerate curated 120-keyword database:
  - `node scripts/seo/generate-curated-keyword-database.mjs`
- Regenerate phase-1 queue (30):
  - `node scripts/seo/generate-phase1-queue-30.mjs`
- Generate phase-1 briefs:
  - `node scripts/seo/generate-phase1-briefs.mjs`
- Output file:
  - `product/seo/generated/article-briefs-first-100.jsonl`
  - `product/seo/generated/article-briefs-phase1-30.jsonl`
  - `product/seo/generated/programmatic-pages-phase1.json`
- Each line includes:
  - keyword, slug, publish week, section structure, SEO rules, and CTA route

## Notes

- Competition and intent scores are heuristic in v1.
- Before scaling from 100 to 300 pages, refresh priorities with Search Console query data.
- Current programmatic hubs (Part 1 map):
  - `/negotiation`
  - `/pricing`
  - `/client-communication`
  - `/proposals`
  - `/email-scripts`
  - `/rate-increase`
  - `/objections`
  - `/tools`
