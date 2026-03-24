# Canonical Scenario SEO Template

This file defines the minimum content contract for canonical `/scenario/[slug]` pages that are meant to rank as search landing pages.

## Required core fields

- `slug`
- `title`
- `h1` when the on-page search intent phrasing should differ from the shorter catalog title
- `metaTitle`
- `metaDescription`
- `primaryClientMessage`
- `userSituation`
- `userGoal`
- `searchIntentPrimary`
- `relatedScenarioSlugs`

## Recommended growth fields

- `previewReply`
  - Use when a page should show a stronger, more specific first-touch reply than the archetype fallback.
- `heroDescription`
  - One short paragraph that explains the user situation, the communication friction, and the outcome on the page.
- `pagePromise`
  - One sentence that states the result the generator will help the user get.
- `cluster`
  - Use `pricing`, `payment`, `scope`, `ghosting`, or `client_management` when the page belongs to a deliberate internal-link cluster.
- `relatedSectionTitle`
- `relatedSectionDescription`
  - Use when a cluster should have more explicit internal-link copy than the default fallback.

## Writing rules

- Titles should read like something a real searcher would click, not like a generic taxonomy label.
- Descriptions should promise a usable reply, script, or wording outcome.
- Hero copy should confirm: this is my situation, this is the friction, this page gives me a reply.
- Related links should stay tightly within the same intent cluster before linking outward.

## Current priority clusters

- `payment`
  - unpaid invoice follow-up
  - polite payment ask
  - final payment reminder
  - start-before-payment / deposit boundary
- `pricing`
  - quote too high
  - discount request
  - out of budget but interested
  - same scope lower price
- `scope`
  - extra work outside scope
  - revisions
  - urgent add-ons

## Guardrails

- Do not change canonical URL patterns when expanding scenario coverage.
- Do not add funnel-specific logic per page; canonical scenario analytics stay slug-based.
- Prefer content-only expansion after the template fields above are in place.
