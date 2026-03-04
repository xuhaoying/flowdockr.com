# FlowDockr MVP PRD (Minimum Sellable Product)

Generated: 2026-03-04
Owner: Founder
Status: Ready for development handoff

## 1. Product Goal

### Product Name
FlowDockr

### One-line value
AI-powered tools to handle difficult client situations for freelancers.

### MVP objective
Ship one sellable feature in 1-2 weeks that can convert first paid users.

### North-star outcome
Users can generate and copy a client-ready revision policy in under 30 seconds.

## 2. Target Users

### Primary segment
Service freelancers:
- Designers
- Video editors
- Copywriters
- Marketers
- Consultants

### Behavior profile
- Repeated client friction around scope and revisions
- Weak confidence in business wording
- Need immediate, copy-ready output during active client chats

## 3. Core Problem (MVP Scope)

### Problem focus
Scope creep in freelance projects.

### User pain statements
- "Client keeps asking for more revisions."
- "Client added extra tasks not in the brief."
- "I need wording to set boundaries without losing the client."

## 4. MVP Scope and Non-scope

### In scope
- Scope Guard Generator
- Scope input form (5 required fields + 1 optional)
- AI output with fixed 4-block structure
- Copy actions (per block + copy all)
- Free usage cap + upgrade trigger
- SEO guides that route users into Scope Guard

### Out of scope (for MVP)
- Complex dashboard
- Project management workspace
- Multi-module workflow automation
- Deep analytics dashboards
- Mandatory account system for first run

## 5. User Flow

### Acquisition flow
Google -> SEO article -> /scope -> Generate -> Copy -> Upgrade intent

### In-app flow
1. Land on `/scope`
2. Fill project form
3. Click "Generate your revision policy"
4. See structured output
5. Copy and send to client

### Experience target
Total completion time < 30 seconds after form fill.

## 6. Page Requirements

## `/`
### Hero
- Headline: `Stop scope creep in client projects.`
- Primary CTA: `Generate revision policy` -> `/scope#scope-generator`

### Modules section
Display 4 modules:
- Scope (Available)
- Payment (Coming soon)
- Pricing (Coming soon)
- Deal (Coming soon)

## `/scope`
### Layout
- Hero
- Scope form
- Generated output blocks
- Copy actions
- Upgrade CTA when free limit is reached

## `/guides`
- Hub page listing 5 scope-focused SEO guides
- Each guide follows: problem -> why it happens -> solution -> CTA

## 7. Functional Specification

## Form fields
Required:
- `project_type` (enum)
- `project_price` (number > 0)
- `revision_count` (1-5)
- `client_type` (enum)

Optional:
- `extra_revision_price` (number >= 0)

### Enums
`project_type`:
- logo design
- website design
- video editing
- copywriting
- marketing
- other

`client_type`:
- startup
- small business
- agency
- enterprise

### Generation output format (fixed)
1. `revision_policy`
2. `scope_rule`
3. `client_message`
4. `contract_clause`

### Acceptance criteria
- Output always returns all 4 keys.
- Each block is copyable independently.
- Copy-all action concatenates all blocks with section titles.
- On free-limit hit, generation is blocked and upgrade CTA appears.

## 8. AI Generation Logic

### System prompt
You are a freelance business consultant. Write concise client-facing policy text. Avoid legal claims and aggressive wording.

### User prompt template
Generate a clear revision policy for a freelance project.
Project type: {project_type}
Project price: {project_price}
Revision rounds: {revision_count}
Extra revision price: {extra_revision_price}
Client type: {client_type}

Return valid JSON with exactly:
- revision_policy
- scope_rule
- client_message
- contract_clause

### Model requirements
- Deterministic style (low temperature)
- JSON-only output via schema constraint
- Fallback template if LLM is unavailable

## 9. Data Model

### Optional persistence table
`generations`

Fields:
- `id` (uuid)
- `user_id` (nullable)
- `project_type` (text)
- `project_price` (number)
- `revision_count` (integer)
- `extra_revision_price` (nullable number)
- `client_type` (text)
- `revision_policy` (text)
- `scope_rule` (text)
- `client_message` (text)
- `contract_clause` (text)
- `created_at` (timestamp)

### MVP persistence strategy
- Can launch without DB writes.
- Use cookie-based usage counter for free plan gating.

## 10. API Design

### Endpoint
`POST /api/generate-scope-policy`

### Request body
```json
{
  "project_type": "website",
  "project_price": 1200,
  "revision_count": 3,
  "extra_revision_price": 100,
  "client_type": "startup"
}
```

### Response body
```json
{
  "revision_policy": "...",
  "scope_rule": "...",
  "client_message": "...",
  "contract_clause": "..."
}
```

### Error behavior
- Invalid fields -> `400`-style error payload with message
- Free limit reached -> business error payload + `upgrade_required=true`
- Provider failure -> fallback template response if possible

## 11. SEO Structure

### Guide URLs
- `/guides/client-keeps-asking-for-revisions`
- `/guides/scope-creep-freelancer`
- `/guides/how-many-revisions-should-you-offer`
- `/guides/client-asking-for-extra-work`
- `/guides/freelance-revision-policy`

### Article structure
1. Problem
2. Why it happens
3. Solution
4. CTA: `Generate your revision policy -> /scope`

## 12. Pricing and Growth

### Plans
- Free: 2 generations
- Pro: $9/month, unlimited generations
- Lifetime: $19 one-time, unlimited generations

### Growth loop
SEO guide -> Scope generation -> copy value -> limit reached -> upgrade CTA

## 13. Technical Architecture

### Frontend
- Next.js App Router
- Tailwind CSS

### Backend
- Next.js Route Handler
- OpenAI API for generation

### Deploy
- Vercel

### Database
- Optional Supabase/Postgres (post-MVP persistence)

## 14. Launch Plan

### Week 1
- Landing page + Scope page
- Scope generator API + copy UX
- Free limit + upgrade CTA

### Week 2
- Publish 5 SEO guide pages
- Indexing setup (sitemap + Search Console)

### Week 3
- Start Payment Protection module scoping

## 15. Success Metrics

### MVP targets
- 100 visitors
- 10 users who generate at least once
- 1 paid conversion

### Gate to next module
If targets are achieved, start `Payment Protection` implementation.

---

## Current Build Mapping (Implemented)

Implemented in current codebase:
- `/scope` interactive generator page
- `/api/scope-policy/generate` + alias `/api/generate-scope-policy`
- Fixed 4-block output schema
- Free cap logic with upgrade signal
- Pricing copy aligned to Free/Pro/Lifetime
- SEO guide structure and routes in progress under `/guides/*`
