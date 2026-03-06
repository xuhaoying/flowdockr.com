# FlowDockr v2 Product Blueprint

Generated: 2026-03-05
Owner: Founder
Status: Proposed (Execution-ready)

## 1. Core Product Decision

FlowDockr should be positioned as a **freelancer deal decision system**, not a generic AI chat wrapper.

Positioning line:
- Turn any client pushback into a structured decision panel in seconds.

Why this matters:
- If output is only "one reply text", users can replace it with ChatGPT.
- If output is "decision + action system", users get workflow value, not just copywriting value.

## 2. Current State Diagnosis (Repo-grounded)

### What is already true
- Scope module uses LLM with JSON schema and has fallback.
- Deal module uses local rule + strategy-card engine (not live LLM).
- Landing and navigation are still Scope-first, creating product understanding gap.

### User-facing confusion now
- Users cannot clearly tell which module is AI-generated vs rule-generated.
- `/create` route naming is generic and does not communicate "Deal" intent.
- "Deal value proposition" is weaker than "Scope value proposition" on first impression.

## 3. v2 Product Structure (Thin Slice)

### Product Pillars
1. Scope Guard (ship now, stable)
2. Deal Strategy (upgrade to AI-first + structured output)
3. Payment Reminder (coming soon page + capture intent)

### Route IA
- `/` -> product overview + live demo
- `/scope` -> scope policy generator
- `/deal` -> negotiation strategy generator (primary growth focus)
- `/payment` -> coming soon + waitlist capture
- `/pricing` -> simple paid plan
- `/guides/*` -> SEO to product funnel

### Navigation copy
- Scope
- Deal
- Payment
- Guides
- Pricing

## 4. Output Contract (Deal v2)

Deal output must be rendered as a decision panel with fixed schema:

```json
{
  "instant_reply": "string",
  "strategy": {
    "objection_type": "price|timing|trust|authority|other",
    "negotiation_principle": "string",
    "why_this_works": "string"
  },
  "price_anchor": {
    "ideal": 0,
    "negotiable": 0,
    "floor": 0
  },
  "risk_level": "low|medium|high",
  "next_moves": ["string", "string", "string"],
  "red_flags": ["string", "string"]
}
```

UI rule:
- Show each section as independent card.
- Every card has copy action.
- Top area shows "Generation Mode: AI / Rules Fallback".

## 5. AI Strategy (Critical)

### Scope module
- Keep current approach: LLM JSON schema + deterministic fallback.

### Deal module
- Move to AI-first generation with schema output.
- Keep existing rules engine as fallback mode when provider fails.
- Store mode in task metadata: `mode=ai|rules`.

### Transparency rule
- Never hide generation mode.
- If fallback is used, show banner: "Rule-based fallback used for reliability."

## 6. Conversion Structure

### Landing first-screen objective
- Answer "Why not ChatGPT?" in 5 seconds.

Hero message format:
- Outcome headline
- 1-line mechanism
- CTA to interactive demo

### Demo section (must be above fold)
- Input: client objection context
- Output: 5 decision cards
- CTA: "Try with your own case"

### Trust section
- "Built for freelancers in active client negotiation"
- Add use-case logos or role tags (designer, editor, consultant)

## 7. Metrics (v2)

Activation metric:
- `deal_output_generated_rate` = generated / started
- Target 14d: >= 40%

Engagement metric:
- `deal_copy_rate` = copied any deal card / generated
- Target 14d: >= 65%

Quality metric:
- `deal_feedback_win_or_pending_rate` after script use
- Target 30d: >= 55%

Reliability metrics:
- `deal_ai_fallback_rate` < 20%
- `deal_api_error_rate` < 3%

## 8. 2-Week Execution Plan

### Week 1 (P0)
1. Rename/route clarity:
   - Promote `/deal` as canonical entry.
   - Keep `/create` only as backward-compatible redirect.
2. Landing update:
   - Add Deal demo section and module-level positioning.
3. Deal output contract:
   - Upgrade UI to decision cards with explicit mode badge.
4. Instrumentation:
   - Add events for start/generate/copy/unlock/feedback/mode.

Exit criteria:
- A new user can understand product value in < 10 seconds.
- Deal output appears in structured card format.

### Week 2 (P1)
1. Deal AI-first path:
   - Add LLM schema generation.
   - Preserve rules fallback path.
2. QA quality harness:
   - Expand scenario tests to multilingual and edge inputs.
3. SEO funnel:
   - Ship 3 high-intent guides pointing to `/deal`.

Exit criteria:
- Deal module runs in AI mode when key exists, otherwise safe fallback.
- Funnel from guides -> deal generator measurable.

## 9. Release Gate (Go/No-Go)

Go only if:
- P0 defects = 0
- Deal schema output passes all required fields
- Generation mode visibility works
- Analytics events verified in production

No-go if:
- Users cannot distinguish AI vs fallback mode
- Output schema can break or miss critical sections

## 10. Immediate Next Action (Today)

Start with these three tasks in order:
1. IA clarity: make `/deal` first-class in nav and landing.
2. Output clarity: decision-card layout + mode badge.
3. Capability clarity: AI-first + fallback architecture for Deal module.

