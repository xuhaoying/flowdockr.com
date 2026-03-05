# AI Product Factory

This folder packages a repeatable execution system for new AI SaaS modules.

## Workflow
1. Copy `/templates/*` into a new feature folder.
2. Fill `prd.md` first (problem, user, output schema).
3. Derive `architecture.md` and `filetree.md` from PRD.
4. Use `agent_prompt.md` to drive Codex implementation in sequence.
5. Track MVP scope and release gates in `mvp.md`.

## Folder Convention
- `/product/factory/<product-or-module>/`
  - `prd.md`
  - `architecture.md`
  - `filetree.md`
  - `agent_prompt.md`
  - `mvp.md`

## Current Instance
- `flowdockr-scope-v1/`
