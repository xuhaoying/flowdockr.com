# Flowdockr Payment Cluster Phase 1 Execution Spec

Generated: 2026-03-25

## Strategic Goal

Build Flowdockr's first structured SEO -> product handoff system around `freelance client communication`, starting with the `payment communication` cluster.

Phase 1 is not a broad content rollout.
Phase 1 exists to create the first clear:

- `Hub -> Guide -> Template -> Scenario` system
- topical network Google can understand
- user path from search intent -> trust -> usable wording -> product execution

## Repo-Grounded Audit

### Current payment-adjacent assets

| Route | Intended type | Source | Status | Reason |
| --- | --- | --- | --- | --- |
| `/payment` | hub | `src/config/locale/messages/en/pages/payment.json` | salvageable | Existing page is a generic module landing page. It does not yet behave like a topic hub. |
| `/guides/client-not-paying` | guide | `src/config/locale/messages/en/pages/guides/client-not-paying.json` | salvageable | Strong problem adjacency, but too broad and too thin to own multiple payment sub-queries. |
| `/templates/payment-reminder` | template | `src/config/locale/messages/en/pages/templates/payment-reminder.json` | thin / weak | Has the right topic, but only one sequence block and no strategic variants or usage boundaries. |
| `/scenario/ask-for-payment-politely` | scenario | `src/content/scenario-pages/scenario-seeds.ts` | already strong | Good direct-intent execution page and a strong product handoff candidate. |
| `/scenario/payment-extension-request` | scenario | `src/content/scenario-pages/scenario-batch-2.ts` | already strong | High-intent payment scenario with explicit SEO metadata and clear commercial stakes. |
| `/scenario/deposit-not-paid-yet` | scenario | `src/content/scenario-pages/scenario-batch-2.ts` | already strong | Strong pre-kickoff payment boundary scenario; should anchor deposit/advance-payment handoff. |
| `/scenario/overdue-invoice-no-response` | scenario | `src/content/scenario-pages/scenario-dataset-v1-top20.ts` | already strong | High-pressure late-payment scenario with strong search intent and clear next-step logic. |
| `/scenario/unpaid-invoice-follow-up` | scenario | `src/content/scenario-pages/scenario-batch-2.ts` | salvageable | Good supporting scenario, but needs explicit guide/template backlinks in the cluster. |
| `/scenario/payment-overdue-reminder` | scenario | `src/content/scenario-pages/scenario-batch-2.ts` | salvageable | Good supporting scenario; keep and connect. |
| `/scenario/second-payment-reminder` | scenario | `src/content/scenario-pages/scenario-batch-2.ts` | salvageable | Useful supporting scenario for escalation sequencing. |
| `/scenario/final-payment-after-completion` | scenario | `src/content/scenario-pages/scenario-batch-2.ts` | salvageable | Valuable closeout scenario, but not yet integrated into a payment cluster path. |
| `/scenario/pay-later-request` | scenario | `src/content/scenario-pages/scenario-batch-2.ts` | salvageable | Useful adjacent payment-delay scenario; keep links limited and specific. |
| `/scenario/final-payment-reminder` | scenario | `src/content/scenario-pages/scenario-seeds.ts` | salvageable | Useful late-sequence scenario, but currently not anchored from a dedicated payment hub or guide. |

### Existing assets to freeze in Phase 1

| Route / surface | Type | Source | Status | Reason |
| --- | --- | --- | --- | --- |
| `/pricing` | hub | `content/pricing/hub.json` + `src/app/[locale]/(landing)/pricing/page.tsx` | not aligned with phase-1 payment | Current pricing hub is a negotiation console. Keep it for later discount / negotiation work. |
| `/pricing/*` | scenario pages | `content/pricing/scenarios.json` + `src/data/pricing-cluster.ts` | not aligned with phase-1 payment | These pages belong to discount / pricing negotiation, not payment collection. |
| `content/guides/guides.json` existing three guides | guide set | `content/guides/guides.json` | not aligned with phase-1 payment | Current guide system is pricing-led, not payment-led. Preserve, do not expand in this phase. |
| `/guides` index | guide index | `src/app/[locale]/(landing)/guides/page.tsx` | not aligned with phase-1 payment | Current copy is pricing-specific and should not define the payment cluster. |

## Hard Phase Boundaries

### Root topic

Only expand inside:

- `freelance client communication`
- `payment communication`

### Future clusters, not Phase 1

- `scope / boundary communication`
- `discount / negotiation communication`

Strict priority remains:

1. `payment`
2. `scope / boundary`
3. `discount / negotiation`

### Explicitly out of scope

Do not expand into:

- generic professional email topics
- employee / manager communication
- recruiter / interview communication
- dating / breakup / friendship communication
- generic life communication content
- pricing / discount cluster expansion during payment phase

## Route Ownership in This Repo

Use the existing route surfaces as the page-role system:

- `/payment` = `hub`
- `/guides/*` = `guide`
- `/templates/*` = `template`
- `/scenario/*` = `scenario`

Do not create a parallel payment scenario system under `/pricing/*`.
Use the existing `/scenario/*` payment pages as product execution endpoints.

## Page Role Contract

### Hub

`/payment` must:

- define the payment-communication problem space
- organize the cluster into sub-problems
- link the core payment guides
- feature a few representative templates and scenarios
- feel like a topic center, not a module promo page

It must not:

- read like a generic feature landing page
- list every scenario page
- compete for narrow wording queries

### Guide

Payment guides under `/guides/*` must:

- own search-entry intent
- explain the decision structure
- show situation branches
- include usable example wording
- move the user into a template or scenario next

They must not:

- act like a template dump
- act like a thin CTA wrapper
- solve multiple distant tasks at once

### Template

Payment templates under `/templates/*` must:

- solve a single wording task
- provide at least 3 strategically distinct examples
- explain when each version fits
- route the user to the right scenario if the situation is high-pressure

They must not:

- become template collections
- stack near-synonym rewrites
- compete with guides on broad how-to intent

### Scenario

Payment scenarios under `/scenario/*` must:

- define one concrete pressure situation
- surface risks and stakes
- show more than one strategy path
- give a sendable output frame
- link back to the relevant guide and template

They must not:

- become isolated tool shells
- exist without upstream links
- expand into broad educational pages

## Phase 1 Target Set

### Hub

- Keep and rebuild `/payment` as the payment-cluster hub.

### Guides to own in Phase 1

- `/guides/how-to-ask-a-client-for-payment`
- `/guides/how-to-follow-up-an-unpaid-invoice`
- `/guides/how-to-remind-a-client-about-overdue-payment`
- `/guides/when-to-ask-for-a-deposit-before-work`
- `/guides/how-to-ask-for-advance-payment-politely`
- `/guides/how-to-ask-for-final-payment-professionally`

### Existing guide rule

- `/guides/client-not-paying` is not the phase-1 owner for all payment queries.
- Treat it as a broad legacy page to consolidate, narrow, or demote after narrower guides exist.

### Templates to own in Phase 1

- Keep and rebuild `/templates/payment-reminder`
- Add `/templates/advance-payment-message-examples`
- Add `/templates/overdue-invoice-follow-up-examples`

### Scenarios to strengthen first

- `/scenario/ask-for-payment-politely`
- `/scenario/deposit-not-paid-yet`
- `/scenario/payment-extension-request`
- `/scenario/overdue-invoice-no-response`
- `/scenario/final-payment-after-completion`

### Supporting scenarios to keep connected

- `/scenario/unpaid-invoice-follow-up`
- `/scenario/payment-overdue-reminder`
- `/scenario/second-payment-reminder`
- `/scenario/pay-later-request`
- `/scenario/final-payment-reminder`
- `/scenario/delayed-payment-follow-up`

## Seed-Page Rule

Real Search Console data is not checked into this repo.
Until that data is wired into the content workflow, use the strongest existing payment scenario pages as seed nodes because they already have one or more of these signals in code:

- explicit SEO metadata
- payment cluster assignment
- `core` or `primary` distribution flags
- direct, high-intent search phrasing

Operational seed set:

- `/scenario/ask-for-payment-politely`
- `/scenario/payment-extension-request`
- `/scenario/deposit-not-paid-yet`
- `/scenario/overdue-invoice-no-response`

## Guide Structure Contract

Every payment guide must include:

1. `Problem framing`
2. `Why this is hard / common mistake`
3. `Decision or communication principles`
4. `Situation branches`
5. `Example wording`
6. `What to do next`
7. `Natural transition to template or scenario`

## Template Structure Contract

Every payment template page must include:

1. `Single-task framing`
2. `At least 3 strategically distinct examples`
3. `When to use each version`
4. `Short usage guidance`
5. `Natural CTA to scenario`

## Scenario Structure Contract

Every strengthened payment scenario must include:

1. `Clear scenario definition`
2. `Communication risks / stakes`
3. `Strategy branches`
4. `Example output or output framing`
5. `Recommended next step`
6. `Links back to related guide / template`

## Internal Linking Map

### Hub -> guides

`/payment` should link directly to:

- `/guides/how-to-ask-a-client-for-payment`
- `/guides/how-to-follow-up-an-unpaid-invoice`
- `/guides/how-to-remind-a-client-about-overdue-payment`
- `/guides/when-to-ask-for-a-deposit-before-work`
- `/guides/how-to-ask-for-advance-payment-politely`
- `/guides/how-to-ask-for-final-payment-professionally`

### Hub -> featured templates

`/payment` should feature:

- `/templates/payment-reminder`
- `/templates/advance-payment-message-examples`
- `/templates/overdue-invoice-follow-up-examples`

### Hub -> featured scenarios

`/payment` should feature a limited set:

- `/scenario/ask-for-payment-politely`
- `/scenario/payment-extension-request`
- `/scenario/deposit-not-paid-yet`
- `/scenario/overdue-invoice-no-response`

### Guide -> downstream targets

| Guide | Primary template | Primary scenarios |
| --- | --- | --- |
| `/guides/how-to-ask-a-client-for-payment` | `/templates/payment-reminder` | `/scenario/ask-for-payment-politely`, `/scenario/final-payment-after-completion` |
| `/guides/how-to-follow-up-an-unpaid-invoice` | `/templates/overdue-invoice-follow-up-examples` | `/scenario/unpaid-invoice-follow-up`, `/scenario/overdue-invoice-no-response` |
| `/guides/how-to-remind-a-client-about-overdue-payment` | `/templates/payment-reminder` | `/scenario/payment-overdue-reminder`, `/scenario/second-payment-reminder` |
| `/guides/when-to-ask-for-a-deposit-before-work` | `/templates/advance-payment-message-examples` | `/scenario/deposit-not-paid-yet`, `/scenario/start-before-payment` |
| `/guides/how-to-ask-for-advance-payment-politely` | `/templates/advance-payment-message-examples` | `/scenario/deposit-not-paid-yet`, `/scenario/payment-extension-request` |
| `/guides/how-to-ask-for-final-payment-professionally` | `/templates/payment-reminder` | `/scenario/final-payment-after-completion`, `/scenario/final-payment-reminder` |

### Scenario backlink rules

Each strengthened payment scenario must link back to:

- one owner guide
- one owner template if available
- at most one or two adjacent payment scenarios

Suggested owner mapping:

| Scenario | Backlink guide | Backlink template |
| --- | --- | --- |
| `/scenario/ask-for-payment-politely` | `/guides/how-to-ask-a-client-for-payment` | `/templates/payment-reminder` |
| `/scenario/deposit-not-paid-yet` | `/guides/when-to-ask-for-a-deposit-before-work` | `/templates/advance-payment-message-examples` |
| `/scenario/payment-extension-request` | `/guides/how-to-remind-a-client-about-overdue-payment` | `/templates/payment-reminder` |
| `/scenario/overdue-invoice-no-response` | `/guides/how-to-follow-up-an-unpaid-invoice` | `/templates/overdue-invoice-follow-up-examples` |
| `/scenario/final-payment-after-completion` | `/guides/how-to-ask-for-final-payment-professionally` | `/templates/payment-reminder` |

## Cannibalization Rules

### Broad vs narrow

- `/guides/client-not-paying` cannot remain the owner of all late-payment intent once narrower payment guides are live.
- Keep it as a broad summary or retire it from phase-1 ownership.

### Guide vs template

- `how-to` / `when-to` / `professional` intent belongs to guides.
- `examples` / `template` / `message` intent belongs to templates.

### Guide vs scenario

- Guides own education and decision framing.
- Scenarios own one high-pressure execution moment and route into the product.

### Payment vs pricing

- Do not let `/pricing/*` pages absorb payment collection intent.
- Do not route payment guides into pricing negotiation pages except where a real cross-cluster edge exists.

## Execution Order

1. Audit the repo against the manifest and confirm page-role ownership.
2. Rebuild `/payment` into the cluster hub.
3. Keep the strongest existing payment scenarios as seed nodes.
4. Add missing payment guides before expanding any scope or discount cluster.
5. Rebuild payment templates so they are true bridge pages.
6. Strengthen core payment scenarios with explicit backlinks and strategy framing.
7. Complete the payment-cluster internal links.

## Acceptance Criteria

### Structural acceptance

- Every changed page is explicitly labeled `hub`, `guide`, `template`, or `scenario`.
- Every page solves one clear job and does not blur into another page type.
- Every guide has upstream, sideways, and downstream links.
- Every template has one owner guide and at least one scenario handoff.
- Every strengthened scenario links back to at least one guide and one template.
- No new payment work expands into scope or discount clusters.

### Business acceptance

- A user can enter through a payment guide, move to a relevant template, and end on a matching scenario page.
- Scenario pages no longer behave like isolated tool shells.
- The payment cluster reads as a coherent topical network instead of separate pages.
- The structure makes the payment problem space legible to Google and to users.
