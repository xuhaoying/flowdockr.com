# File Tree Design

## Required Structure

- `/src/app/[locale]/(landing)/<feature>/page.tsx`
  - Page composition and section loading

- `/src/shared/blocks/<feature>/generator.tsx`
  - Client form, request dispatch, results, copy interactions

- `/src/app/api/<feature>/generate/route.ts`
  - HTTP handler, validation, module orchestration

- `/src/core/<product>/`
  - `schemas.ts`: zod/json schemas
  - `service.ts`: orchestration and business rules
  - `prompts.ts`: AI prompt templates
  - `formatter.ts`: output normalization

- `/src/config/locale/messages/en/pages/<feature>.json`
  - Page metadata, hero copy, form labels, output labels

- `/product/<track>/<feature>-prd.md`
  - Product contract for handoff

## Naming Rules
- API route: verb-light and feature-specific
- Core files: noun-based and stable
- Translation keys: deterministic and reusable

## Definition of Done
- New files are isolated by feature
- No framework-level files modified unless required
- API + UI contracts match PRD output schema exactly
