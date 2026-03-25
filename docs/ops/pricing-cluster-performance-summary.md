# Pricing Cluster Performance Snapshot

- Generated at: 2026-03-25T09:26:43.296Z
- Refresh mode: manual
- Refresh status: success
- Storage backend: filesystem
- Last refresh attempt: 2026-03-25T09:26:43.296Z
- Last successful refresh: 2026-03-25T09:26:43.296Z
- Last failure: none
- Refresh failure reason: none
- Stale after: 2026-03-26T09:26:43.296Z
- Is stale: no
- Reporting window: 2026-02-23T09:26:43.296Z -> 2026-03-25T09:26:43.296Z (30 days, limit 500)
- Snapshot state: unavailable
- Based on real populated data: no

## Source states
- analyticsEvents: unavailable; reason=DATABASE_URL_MISSING; recordCount=null; signalCount=0; pagesWithSignals=0
- generationHistory: unavailable; reason=DATABASE_URL_MISSING; recordCount=null; signalCount=0; pagesWithSignals=0
- purchases: unavailable; reason=DATABASE_URL_MISSING; recordCount=null; signalCount=0; pagesWithSignals=0

## How to interpret
Pricing-cluster performance is not fully queryable yet. Fix unavailable sources first: analyticsEvents (DATABASE_URL_MISSING), generationHistory (DATABASE_URL_MISSING), purchases (DATABASE_URL_MISSING).

## Verification checklist
- Confirm the deployed environment has DATABASE_URL configured and the report process can open the production database.
- Re-run `pnpm qa:pricing-performance` in the deployed environment and verify sourceStates move from unavailable to reachable_empty or populated.
- Once sources are reachable, trigger one attributed pricing-page flow and rerun the export to confirm the first populated page row.

## First pages to inspect
- By views: none
- By generator clicks: none
- By checkout intent: none
- By purchase signals: none
- Weak mapping warnings with signals: none

## First families to inspect
- By views: none
- By checkout intent: none

## Summary
- Pages with traffic: 0
- Pages with generator clicks: 0
- Pages with checkout intent: 0
- Pages with purchase signals: 0
- High-potential pages: none
- Needs mapping upgrade pages: none

## Prioritized actions
- None yet. Wait for populated source data or more traffic.
