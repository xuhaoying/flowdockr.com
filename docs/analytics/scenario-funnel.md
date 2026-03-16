# Scenario Funnel Analytics Contract

## Canonical funnel events

The canonical scenario funnel is limited to these events:

- `fd_scenario_view`
- `fd_tool_start`
- `fd_generation_success`
- `fd_paywall_shown`
- `fd_purchase_success`

## `scenario_slug` meaning

`scenario_slug` always means the canonical Scenario Dataset v1 slug from `src/content/scenario-pages/scenario-seeds.ts`.

It must never carry:

- pricing page slugs
- tool-page query slugs
- legacy scenario aliases
- mixed content identifiers

## Pages allowed to send `scenario_slug`

Only canonical `/scenario/[slug]` funnel steps may attach `scenario_slug` to the canonical funnel events.

Allowed today:

- `/scenario/[slug]` page view
- `/scenario/[slug]` inline tool start
- `/scenario/[slug]` generation success
- `/scenario/[slug]` paywall shown
- checkout success only when the purchase originated from a canonical `/scenario/[slug]` flow

## Pages forbidden from sending `scenario_slug`

These surfaces must not attach `scenario_slug` to canonical funnel events unless they can prove canonical origin:

- `/pricing/*`
- `/tools/*`
- `/`
- `/pricing`
- any non-canonical landing, guide, or redirect page

## Checkout attribution rule

`fd_purchase_success` may include `scenario_slug` only when both conditions are true:

1. `return_to` resolves to a canonical `/scenario/[slug]` path, with or without locale prefix.
2. The checkout `scenario` query param exactly matches that canonical slug.

If either condition fails, `fd_purchase_success` must still fire without `scenario_slug`.

## Guardrail

For `ToolForm`, only explicit `funnelScenarioSlug` from the canonical scenario page may unlock canonical funnel events.
