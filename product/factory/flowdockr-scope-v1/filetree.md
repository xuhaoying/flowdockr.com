# File Tree Design

## Current Feature Files
- `/src/app/[locale]/(landing)/scope/page.tsx`
  - Scope page composition
- `/src/shared/blocks/scope-guard/generator.tsx`
  - Form UX, generation request, copy interactions
- `/src/app/api/scope-policy/generate/route.ts`
  - Scope generation API implementation
- `/src/app/api/generate-scope-policy/route.ts`
  - Alias endpoint
- `/src/config/locale/messages/en/pages/scope.json`
  - Scope content and labels

## Recommended Next Refactor (No behavior change)
- `/src/core/flowdockr/scope/schemas.ts`
- `/src/core/flowdockr/scope/prompts.ts`
- `/src/core/flowdockr/scope/service.ts`
- `/src/core/flowdockr/scope/formatter.ts`

## Future Modules (Factory-ready)
- `/src/shared/blocks/payment-protection/generator.tsx`
- `/src/app/api/payment-protection/generate/route.ts`
- `/src/core/flowdockr/payment/*`

- `/src/shared/blocks/pricing-coach/generator.tsx`
- `/src/app/api/pricing-coach/generate/route.ts`
- `/src/core/flowdockr/pricing/*`

- `/src/shared/blocks/deal-coach/generator.tsx`
- `/src/app/api/deal-coach/generate/route.ts`
- `/src/core/flowdockr/deal/*`

## Module Rules
- API routes only orchestrate and return HTTP responses.
- Core modules own business logic and prompt contracts.
- UI blocks do not embed business rules.
