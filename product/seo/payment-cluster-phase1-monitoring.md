# Flowdockr Payment Cluster Phase 1 Monitoring

Generated: 2026-03-25

This document treats the current payment cluster as a fixed phase-1 sample.
It is an observation layer only.
Do not use it to justify new payment pages or a new cluster until the sample is clean in Search Console.

## 1. Core Sample Pages

These are the only pages that count as the hardened phase-1 payment sample:

| Route | Type | Owned role in the sample |
| --- | --- | --- |
| `/payment` | hub | cluster entry point and page-type map |
| `/guides/how-to-follow-up-an-unpaid-invoice/` | guide | first unpaid-invoice follow-up before true overdue handling |
| `/guides/how-to-remind-a-client-about-overdue-payment/` | guide | post-due-date overdue reminder logic |
| `/guides/when-to-ask-for-a-deposit-before-work/` | guide | deposit timing and pre-kickoff boundary logic |
| `/templates/payment-reminder` | template | overdue reminder wording examples by stage |
| `/templates/advance-payment-message-examples` | template | pre-kickoff deposit wording examples |
| `/scenario/overdue-invoice-no-response` | scenario | overdue invoice plus client silence |
| `/scenario/deposit-not-paid-yet` | scenario | agreed deposit still missing and kickoff blocked |

Sample rule:

- judge payment phase 1 by these pages first
- treat nearby legacy/support scenarios as pollution checks, not as proof that the sample works

## 2. Risk Watchlist Pages

These payment scenarios sit close enough to the sample that they can blur query ownership:

| Route | Current status | Why it is on the watchlist |
| --- | --- | --- |
| `/scenario/unpaid-invoice-follow-up` | support scenario | very close to the unpaid-invoice guide's core intent |
| `/scenario/payment-overdue-reminder` | support scenario | sits between the overdue guide and overdue template |
| `/scenario/second-payment-reminder` | support scenario | overlaps with the template's second-reminder wording lane |
| `/scenario/final-payment-reminder` | legacy/core scenario outside the hardened sample | later-stage overdue intent, but still close to the template's deadline-setting lane |
| `/scenario/ask-for-payment-politely` | legacy/core scenario outside the hardened sample | broad payment reminder intent that can absorb both early unpaid and overdue traffic |

Watchlist rule:

- if one of these pages starts owning a core sample intent, treat that as pollution
- if one of these pages only earns a narrower later-stage query family, that is acceptable

## 3. Observation Signals

Use Search Console `Performance -> Search results` with both:

- `Last 28 days`
- `Last 3 months`

Check each signal at the `Page` + `Query` level.

### Guide query separation

Watch whether the two close guides split into different query families:

- `/guides/how-to-follow-up-an-unpaid-invoice/`
  - should trend toward `unpaid invoice follow up`, `follow up on unpaid invoice`, `invoice still open`, `ask for payment date`
- `/guides/how-to-remind-a-client-about-overdue-payment/`
  - should trend toward `overdue payment reminder`, `late payment reminder`, `overdue invoice reminder`, `remind client about overdue payment`

What to watch:

- whether the same top query set appears on both guides
- whether the unpaid-invoice guide starts collecting mostly overdue reminder queries
- whether the overdue guide starts collecting mostly first-follow-up queries

### Template query emergence

Watch whether template pages begin to earn template/example wording queries instead of being invisible behind the guides:

- `/templates/payment-reminder`
  - should trend toward `payment reminder template`, `overdue invoice reminder template`, `payment reminder examples`, `first overdue reminder template`
- `/templates/advance-payment-message-examples`
  - should trend toward `advance payment message examples`, `deposit request message`, `deposit message examples`

What to watch:

- whether template pages get impressions for `template`, `examples`, `message`, or `wording` queries
- whether guides absorb all of those query families instead
- whether a template starts ranking mostly for broad how-to queries, which would mean role drift

### Scenario narrow-intent emergence

Watch whether the hardened scenarios begin to earn narrow, pressure-specific queries:

- `/scenario/overdue-invoice-no-response`
  - should trend toward `client not paying invoice and stopped replying`, `overdue invoice no response`, `invoice overdue no reply`
- `/scenario/deposit-not-paid-yet`
  - should trend toward `client has not paid deposit yet`, `deposit not paid yet what to say`, `follow up on unpaid deposit`

What to watch:

- whether scenarios earn long-tail queries that include a concrete pressure condition
- whether scenarios remain dependent on broad reminder queries that should belong to guides or templates
- whether a scenario starts ranking for a broader task than its stated execution stage

### Adjacent-page pollution

Check whether watchlist pages start taking ownership away from the hardened sample:

- `/scenario/unpaid-invoice-follow-up` competing with the unpaid-invoice guide
- `/scenario/payment-overdue-reminder` competing with the overdue guide or overdue template
- `/scenario/ask-for-payment-politely` collecting broad payment reminder queries that should clarify into the guide/template split
- `/scenario/final-payment-reminder` collecting template-like deadline-setting queries too early

What to watch:

- watchlist pages outranking or out-impressing core sample pages on the same query family
- broad watchlist pages getting more impressions than the core sample on early payment intents
- core sample pages losing clean ownership because watchlist pages sit on the same semantic lane

## 4. Positive Signals

The payment sample is starting to work if the following are visible in Search Console:

- the unpaid-invoice guide and overdue-payment guide show different top query families
- at least one template page starts earning template/example wording queries of its own
- at least one hardened scenario starts earning narrow, stage-specific long-tail queries
- the core sample pages, not the watchlist pages, become the main impression holders for early unpaid and overdue reminder intent
- watchlist pages either stay lower-volume or only surface for narrower later-stage reminder intent

## 5. Failure Signals

The payment sample needs another hardening pass if any of the following happens:

- the two guide pages still share most of the same top queries
- `/templates/payment-reminder` fails to emerge for template/example wording queries and remains semantically indistinct from the overdue guide
- `/scenario/overdue-invoice-no-response` mostly earns generic reminder queries instead of silence-specific queries
- `/scenario/unpaid-invoice-follow-up` or `/scenario/ask-for-payment-politely` becomes the main impression holder for the unpaid-invoice guide's intended query family
- `/scenario/payment-overdue-reminder` becomes the main impression holder for the overdue guide or overdue template's intended query family
- watchlist pages collectively pull more impressions than the hardened sample on the core early payment reminder lanes

## 6. Decision Rule

Use the following rule after reviewing two consecutive 28-day windows in Search Console.

### Continue observing

Choose this if:

- the sample is indexed and collecting impressions
- query separation is visible but still low-volume
- template or scenario emergence is starting but not yet stable
- no watchlist page is clearly taking over a core sample intent

### Harden payment again

Choose this if:

- a failure signal appears in both 28-day windows
- one watchlist page becomes the clearest owner of a core sample intent
- the unpaid-invoice guide and overdue-payment guide still do not separate cleanly
- the overdue template and overdue scenario still do not show distinct query behavior

### Expand into the next cluster

Choose this only if:

- guide query separation is clean across both 28-day windows
- at least one template page has clear template/example query emergence
- at least one hardened scenario has clear narrow-intent emergence
- watchlist-page pollution is contained rather than growing
- the core sample pages remain the primary observation set for payment intent ownership
