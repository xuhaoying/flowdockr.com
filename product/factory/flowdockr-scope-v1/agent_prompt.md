# Codex Agent Prompt - FlowDockr Scope Guard

You are implementing and refining FlowDockr Scope Guard in the existing codebase.

## Hard Constraints
1. Follow `prd.md`, `architecture.md`, and `filetree.md` in this folder.
2. Keep MVP narrow: Scope Guard only.
3. Do not introduce new frameworks.
4. Do not modify ShipAny auth/billing/admin internals.
5. Keep business logic under `/src/core/flowdockr/scope/`.

## Tasks (in order)
1. Extract validation, prompt, generation, and normalization from route handler into `/src/core/flowdockr/scope/*`.
2. Keep `/api/scope-policy/generate` as thin orchestrator.
3. Keep `/api/generate-scope-policy` alias stable.
4. Preserve current UX: loading, copy feedback, auto-scroll, form persistence.
5. Add unit tests for schema validation and formatter behavior if test stack exists.

## Acceptance Checklist
- [ ] Request and response schema unchanged from PRD.
- [ ] UI behavior remains unchanged for user-visible flow.
- [ ] Build passes.
- [ ] Changed files list includes purpose.

Start with task 1.
