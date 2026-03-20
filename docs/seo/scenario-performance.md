# Scenario Performance Monitoring

This document is the source of truth for how Flowdockr should monitor canonical scenario pages across search visibility and product usage.

## Scope

Canonical scenario monitoring covers:

- Search visibility for `/scenario/[slug]` pages
- Canonical funnel usage on scenario pages only
- Priority monitoring for the Top 20 launch scenarios

Canonical scenario slug source:

- `src/content/scenario-pages/index.ts`

Top 20 launch priority source:

- `src/content/scenario-pages/scenario-dataset-v1-top20.ts` with `isPriority: true`

Internal funnel events:

- `fd_scenario_view`
- `fd_tool_start`
- `fd_generation_success`

These events must always include:

- `scenario_slug`
- `page_type = scenario`

## Data sources

### Search Console

Use Google Search Console page-level exports for external visibility metrics.

Important:

- Search Console performance data is assigned to the canonical URL Google selects for a page, not necessarily every duplicate URL variant. See Google Search Console Help: [What are impressions, position, and clicks?](https://support.google.com/webmasters/answer/7042828?hl=en-PR).
- True index status should come from URL Inspection or the Pages indexing report. Performance report data can show visible pages, but it is not a full replacement for index coverage reporting.

### Internal product analytics

Use canonical scenario analytics events mirrored through:

- `/api/analytics/scenario-events`

Internal metrics are aggregated by `scenario_slug`.

## Core metrics

### Search Console metrics

- `impressions`
  - How often the page appeared in Google Search results.
  - Source: [Google Search Console Help](https://support.google.com/webmasters/answer/7042828?hl=en-PR)
- `clicks`
  - How often a click sent the user from Google Search to the page.
  - Source: [Google Search Console Help](https://support.google.com/webmasters/answer/7042828?hl=en-PR)
- `ctr`
  - Click-through rate. Compute as `clicks / impressions`.
  - Source: [Google Search Console Help](https://support.google.com/webmasters/answer/7042828?hl=en-PR)
- `position`
  - Average search result position for the topmost link impression Google recorded.
  - Source: [Google Search Console Help](https://support.google.com/webmasters/answer/7042828?hl=en-PR)

### Internal funnel metrics

- `views`
  - Count of `fd_scenario_view`
- `tool_start_count`
  - Count of `fd_tool_start`
- `generation_success_count`
  - Count of `fd_generation_success`

Derived metrics:

- `scenario_to_tool_start_rate = tool_start_count / views`
- `tool_start_to_generation_success_rate = generation_success_count / tool_start_count`

## Interpretation rules

- High impressions + low CTR
  - Usually a title/meta problem
  - Candidate for title and meta description rewrite
- High CTR + low impressions
  - Usually a ranking or coverage problem
  - Candidate for internal links, backlinks, or query expansion
- High impressions + high CTR
  - Scale candidate
  - Consider stronger internal links and more adjacent scenario coverage
- High views + low tool start rate
  - Scenario mismatch or CTA issue
  - The page is being discovered, but not converting users into tool usage
- High tool start rate + low generation success rate
  - Usually a tool friction or request-quality problem
  - Review generator submission flow and message framing

## Optimization targets

### CTR optimization targets

Mark a page as `needs title/meta rewrite` when:

- `impressions >= 100`
- `ctr < 2%`

This is an initial operating threshold, not a permanent rule.

### Conversion optimization targets

Mark a page as `needs conversion review` when:

- `views >= 50`
- `scenario_to_tool_start_rate < 10%`

This is an initial operating threshold for launch-stage monitoring.

## How to run the report

Internal-only report:

```bash
pnpm exec tsx scripts/flowdockr/report-scenario-performance.ts --days=30
```

Join Search Console export with internal funnel metrics:

```bash
pnpm exec tsx scripts/flowdockr/report-scenario-performance.ts \
  --days=30 \
  --search-console=/absolute/path/to/search-console-scenario-pages.csv
```

Priority-only Top 20 output:

```bash
pnpm exec tsx scripts/flowdockr/report-scenario-performance.ts \
  --days=30 \
  --priority-only=true
```

Accepted Search Console columns:

- `slug` or canonical page path via `page` / `url`
- `indexed` or `index_status` optional
- `impressions`
- `clicks`
- `ctr`
- `position` or `avg_position`

## Launch review checklist

For every weekly scenario SEO review:

1. Confirm which canonical scenario pages are indexed.
2. Confirm which scenario pages have impressions.
3. Flag pages with impressions but weak CTR.
4. Compare page views against tool start rate.
5. Review Top 20 priority scenarios separately from the full dataset.
6. Promote pages that show both strong CTR and strong tool-start rate.
