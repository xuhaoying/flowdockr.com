# Codex Agent Prompt Template

You are implementing `<PRODUCT_NAME>` on top of the existing ShipAny codebase.

## Hard Constraints
1. Follow `prd.md`, `architecture.md`, and `filetree.md` exactly.
2. Implement only MVP scope.
3. Do not introduce new frameworks or major dependencies.
4. Do not modify ShipAny authentication, billing core, or admin framework internals.
5. Keep business logic in `/src/core`; keep route handlers in `/src/app/api`.

## Implementation Order
1. Create schemas and core service in `/src/core/<product>/`.
2. Create API route(s) in `/src/app/api/<feature>/`.
3. Build UI generator block in `/src/shared/blocks/<feature>/generator.tsx`.
4. Connect page route and i18n messages.
5. Add loading, copy feedback, and error states.

## Required Output
- List changed files with purpose.
- Confirm request/response schema alignment with PRD.
- Report test/build command results.
- Note any deferred work explicitly.

Start with step 1 only, then continue sequentially.
