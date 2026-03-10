# Flowdockr Pricing Cluster Launch Spec

## Launch Scope (15 pages)

### Core
- `/`
- `/pricing`

### Pricing scenarios
- `/pricing/price-pushback-after-proposal`
- `/pricing/discount-pressure-before-signing`
- `/pricing/budget-lower-than-expected`
- `/pricing/cheaper-competitor-comparison`
- `/pricing/more-work-same-price`
- `/pricing/free-trial-work-request`
- `/pricing/can-you-do-it-cheaper`
- `/pricing/small-discount-before-closing`

### Guides
- `/guides/how-to-negotiate-freelance-pricing`
- `/guides/when-to-discount-and-when-not-to`
- `/guides/reduce-scope-instead-of-lowering-rate`

### Tools
- `/tools/reply-generator`
- `/tools/price-negotiation-email-generator`

## Tiering

### Tier 1 (money pages)
- `price-pushback-after-proposal`
- `discount-pressure-before-signing`
- `budget-lower-than-expected`
- `cheaper-competitor-comparison`

### Tier 2 (long-tail feeders)
- `more-work-same-price`
- `free-trial-work-request`
- `can-you-do-it-cheaper`
- `small-discount-before-closing`

## Scenario Matrix

| URL slug | Primary keyword | Role | Required links |
|---|---|---|---|
| `price-pushback-after-proposal` | quote too high | Tier1 pillar | discount-pressure-before-signing, budget-lower-than-expected, cheaper-competitor-comparison |
| `discount-pressure-before-signing` | discount pressure before signing | Tier1 close-stage | small-discount-before-closing, price-pushback-after-proposal |
| `budget-lower-than-expected` | budget lower than expected | Tier1 budget reality | reduce-scope guide, price-pushback-after-proposal |
| `cheaper-competitor-comparison` | cheaper competitor comparison | Tier1 differentiation | price-pushback-after-proposal, discount-pressure-before-signing |
| `more-work-same-price` | more work same price | Tier2 scope-pricing bridge | reduce-scope guide, budget-lower-than-expected |
| `free-trial-work-request` | free trial work request | Tier2 boundary | pricing hub, reply generator |
| `can-you-do-it-cheaper` | can you do it cheaper | Tier2 high-frequency | price-pushback-after-proposal, budget-lower-than-expected |
| `small-discount-before-closing` | small discount before closing | Tier2 close-stage | discount-pressure-before-signing, when-to-discount guide |

## Template Rules (hard)

Every pricing scenario page must include:
1. Situation snapshot
2. Strategy options (A/B/C)
3. Copy-ready examples (concise/warm/firm)
4. Embedded generator
5. Next decisions
6. FAQ

Additional differentiation:
- Tier1 pages include `Negotiation diagnostics`.
- Tier2 pages include `Fast handling checklist`.

## Internal Linking Rules

1. Every scenario links back to `/pricing`.
2. Every scenario links to 2-3 `next decision` scenarios.
3. Every scenario links to at least one guide or tool.
4. Guide pages feed scenario pages; they do not compete for scenario-level intent.
5. Tools link back to pricing hub and tier1 scenarios.

## Redirect Policy

Legacy routes redirect to pricing cluster:
- `/scenario` -> `/pricing`
- `/scenarios` -> `/pricing`
- legacy scenario slugs map to nearest pricing slug.

## Growth Sequence

1. Phase 1: pricing cluster (current)
2. Phase 2: scope cluster
3. Phase 3: payment cluster
