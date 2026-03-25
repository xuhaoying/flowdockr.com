# Pricing Cluster Go-Live Checklist

This checklist defines the minimum release gate for the Flowdockr pricing cluster.

## 1. Pre-release quality gates

Run all commands from the repository root:

```bash
pnpm lint
pnpm type-check
pnpm qa:pricing-content
pnpm qa:pricing-taxonomy
pnpm build
pnpm qa:pricing-runtime-smoke
```

Release is blocked if any command fails.

## 2. Runtime startup standard

Use standalone build output in production-like environments:

```bash
pnpm build
pnpm start:standalone
```

Default local URL:

- `http://localhost:3000`

Optional custom port:

```bash
PORT=4020 pnpm start:standalone
```

## 3. Mandatory post-start smoke checks

Verify these paths load with status `200`:

- `/pricing/`
- `/pricing/price-pushback-after-proposal/`
- `/pricing/discount-pressure-before-signing/`
- `/pricing/budget-lower-than-expected/`
- `/pricing/cheaper-competitor-comparison/`
- `/pricing/more-work-same-price/`
- `/pricing/free-trial-work-request/`
- `/pricing/can-you-do-it-cheaper/`
- `/pricing/small-discount-before-closing/`
- `/guides/how-to-negotiate-freelance-pricing/`
- `/guides/when-to-discount-and-when-not-to/`
- `/guides/reduce-scope-instead-of-lowering-rate/`
- `/tools/reply-generator/`
- `/tools/price-negotiation-email-generator/`

Context handoff check:

- `/tools/price-negotiation-email-generator/?scenario=price-pushback-after-proposal`
- Page must show `Context loaded from scenario`.

## 4. CI requirements

The CI workflow must include:

- `pnpm lint`
- `pnpm type-check`
- `pnpm qa:pricing-content`
- `pnpm qa:pricing-taxonomy`
- `pnpm build`
- `pnpm qa:pricing-runtime-smoke`

Merges to `main` are allowed only when all checks are green.

## 5. Post-deploy pricing performance verification

Run the pricing performance export in a deployed environment where `DATABASE_URL` is configured:

```bash
pnpm qa:pricing-performance -- --days=7 --limit=500
```

Inspect both exported artifacts:

- `docs/ops/pricing-cluster-performance.json`
- `docs/ops/pricing-cluster-performance-summary.md`

Interpretation rules:

- `snapshotState=unavailable`: environment or database access is not configured correctly.
- `snapshotState=reachable_empty`: queries work, but no attributed pricing-funnel data was found in the current reporting window yet.
- `snapshotState=populated`: real pricing-cluster signals were found and page-level funnel analysis is now meaningful.

Minimum first-snapshot check:

- Confirm all three sources are no longer `unavailable`.
- Confirm at least one page appears in `firstPagesToInspect.byViews` or `firstPagesToInspect.byGeneratorClicks`.
- Confirm `weakMappingWarningsWithSignals` is reviewed before expanding the next pricing batch.
