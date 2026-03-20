# Scenario Funnel Analytics Contract

## Canonical funnel events

The canonical scenario funnel is limited to these events:

- `fd_scenario_view`
- `fd_tool_start`
- `fd_generation_success`
- `fd_paywall_shown`

## `scenario_slug` meaning

`scenario_slug` always means a canonical scenario slug from the merged scenario page catalog in `src/content/scenario-pages/index.ts`.

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

## Pages forbidden from sending `scenario_slug`

These surfaces must not attach `scenario_slug` to canonical funnel events unless they can prove canonical origin:

- `/pricing/*`
- `/tools/*`
- `/`
- `/pricing`
- any non-canonical landing, guide, or redirect page

## Checkout attribution rule

Checkout success events must not attach `scenario_slug`.

Checkout still keeps `return_to` and checkout-specific fields for attribution, but
canonical scenario funnel reporting is limited to `/scenario/[slug]` page events.

## Guardrail

For `ToolForm`, only explicit `funnelScenarioSlug` from the canonical scenario page may unlock canonical funnel events.
