# System Architecture Overview

## Principles
- Keep core business logic under `/src/core`.
- Keep route handlers under `/src/app/api`.
- Do not modify shared auth, billing, or admin framework internals unless the task explicitly requires it.

## Core Modules
1. **Module A**
   - Responsibility: <What this module owns>
   - Input: <Contract>
   - Output: <Contract>
   - Path: `/src/core/<product>/<module-a>.ts`

2. **Module B**
   - Responsibility: <What this module owns>
   - Path: `/src/core/<product>/<module-b>.ts`

3. **Module C**
   - Responsibility: <What this module owns>
   - Path: `/src/core/<product>/<module-c>.ts`

## Data Flow
1. UI form input
2. API validation
3. Core engine execution
4. Response normalization
5. UI render + copy interaction

## API Endpoints
- `POST /api/<feature>/generate`
- `POST /api/<feature>/feedback` (optional)
- `POST /api/<feature>/unlock` (optional)

For each endpoint define:
- Request schema
- Response schema
- Error schema
- Rate/credit behavior

## Observability
- Structured logs with request id
- Track generation success/failure and latency
- Track user actions: generate, copy, upgrade click

## Security and Boundaries
- Validate all input server-side
- Sanitize AI output before rendering
- Keep secrets in env vars only
- Respect existing credit/subscription checks
