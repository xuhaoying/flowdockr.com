# Scenario Quality Control

This note defines the lightweight rules for keeping Flowdockr's canonical scenario library differentiated and commercially useful without turning the dataset into a complex system.

## 1. Intent competition check

Before strengthening or adding a scenario, compare it against the closest pages in the same cluster.

- A page is `safe to keep` when the user situation, negotiation stage, and likely reply shape are all meaningfully different.
- A page `needs differentiation monitoring` when the slug is valid but the title, hero, promise, or preview could drift too close to a nearby page.
- A page is a `possible merge candidate later` only when the search intent and usable reply are effectively the same even after copy differentiation.

Default fix order:

1. strengthen `metaTitle`
2. strengthen `heroDescription`
3. strengthen `pagePromise`
4. strengthen `previewReply`
5. adjust cluster role and related links

## 2. High-value page criteria

Strengthen the pages that are most likely to drive tool use or paid intent first.

- `intentTier: core` for primary landing pages worth external distribution and ongoing copy investment
- `intentTier: supporting` for pages that mainly strengthen cluster coverage
- `valueIntent` tracks the commercial angle:
  - `money`
  - `boundary`
  - `followup`
  - `soft`
- `commercialPriority` sets growth priority:
  - `high`
  - `medium`
  - `low`

## 3. Related path rule

Prefer grouped related links over one flat list when a page is important enough to guide user progression.

- `similarScenarioSlugs`: near-variant problems that need a similar reply style
- `nextStepScenarioSlugs`: the next client problem likely to show up if the situation gets harder or moves stages

Grouped related links should help both crawlers and users understand the difference between "this problem again" and "what comes next."

## 4. Writing rule for strong pages

High-value pages should avoid interchangeable copy.

- `metaTitle` should sound like a click-worthy search result, not a taxonomy label
- `heroDescription` should name the exact friction and tone problem
- `pagePromise` should describe the outcome, not the feature
- `previewReply` should feel like a sendable reply in that exact situation, not a generic template sentence
