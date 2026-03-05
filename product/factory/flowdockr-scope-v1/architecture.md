# System Architecture Overview

## Principles
- Keep logic feature-scoped and testable.
- Use existing ShipAny infra for user, credits, subscription, and billing.
- Do not alter framework internals.

## Core Modules
1. **Scope Validation Module**
   - Responsibility: enforce input contract and value ranges.
   - Suggested path: `/src/core/flowdockr/scope/schemas.ts`

2. **Scope Policy Engine**
   - Responsibility: call model, apply fallback, normalize shape.
   - Suggested path: `/src/core/flowdockr/scope/service.ts`

3. **Scope Output Formatter**
   - Responsibility: sanitize, trim, guarantee required fields.
   - Suggested path: `/src/core/flowdockr/scope/formatter.ts`

## Data Flow
1. Form input from `/scope`
2. API receives request at `/api/generate-scope-policy`
3. Validation and access/usage gating
4. Policy engine generation (LLM or fallback)
5. Normalized response sent to UI
6. UI renders blocks and copy actions

## API Endpoints
- `POST /api/generate-scope-policy`
  - Public alias endpoint used by frontend
- `POST /api/scope-policy/generate`
  - Internal feature endpoint with core logic

## Observability
- Log validation failures and provider failures.
- Track generation latency and success rate.
- Track `generate`, `copy`, and `upgrade_click` events.

## Security and Boundaries
- Validate input server-side only.
- Never expose API keys to client.
- Keep usage checks behind secure cookies/subscription verification.
