# First Module Spec: Scope Guard

Generated: 2026-03-04

## Why This First

- Highest urgency pain for freelancers: scope creep
- Strong SEO match (`scope creep freelancer`, `client asking for revisions`)
- Immediate user value with short input and high-confidence output

## Core Feature (MVP v1)

- Feature name: `Scope Guard`
- Primary action: `Revision Policy Generator`
- Promise: Turn messy client revision requests into a clear policy and ready-to-send reply in under 3 minutes

## Input Form (MVP)

Required fields:
- `service_type` (design, video editing, copywriting, other)
- `project_deliverables` (short text)
- `included_revision_rounds` (number)
- `deadline_or_timeline` (text)
- `current_client_request` (text)

Optional fields:
- `communication_tone` (firm, neutral, friendly)
- `change_request_price_rule` (fixed fee, hourly, quote-first)
- `existing_contract_clause` (text)

## Output Structure (MVP)

1. `Revision Policy` (formal policy block)
2. `Client Reply Message` (direct copy-paste response)
3. `Out-of-Scope Add-on Rule` (how extra requests are priced)
4. `Next Step Checklist` (what to confirm before continuing)

## AI Prompt Structure

System prompt:

```text
You are FlowDockr Scope Guard. You write concise, professional revision policies for freelancers.
Priorities: clarity, boundary-setting, and preserving client relationship.
Never output legal advice. Avoid aggressive language. Keep wording practical and copy-ready.
```

Developer prompt:

```text
Generate 4 sections in this exact order:
1) Revision Policy
2) Client Reply Message
3) Out-of-Scope Add-on Rule
4) Next Step Checklist

Constraints:
- Max 180 words total.
- Use plain English.
- Include at least one concrete boundary tied to revision rounds.
- Include one line that requests client confirmation.
```

User payload schema:

```json
{
  "service_type": "design",
  "project_deliverables": "Brand identity package with logo and social kit",
  "included_revision_rounds": 2,
  "deadline_or_timeline": "Final delivery by March 22",
  "current_client_request": "Client asks for two new logo directions after final concept approval",
  "communication_tone": "firm",
  "change_request_price_rule": "quote-first",
  "existing_contract_clause": ""
}
```

## Pricing (Launch)

- Free: 3 Scope Guard generations per month
- Pro (`$15/month`): unlimited Scope Guard generations + tone presets
- Pro Plus (`$29/month`): includes Payment module beta access and priority output quality updates

## Upgrade Triggers

- Hit free usage cap
- Need stronger message variants for difficult clients
- Need payment reminder tools after scope conversation

## Event Tracking

- `scope_form_started`
- `scope_output_generated`
- `scope_block_copied`
- `scope_regenerated`
- `scope_upgrade_clicked`
