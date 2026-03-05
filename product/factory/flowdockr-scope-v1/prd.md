# Product Overview

**Product name**: FlowDockr Scope Guard

**Product goal**: Help freelancers stop scope creep by generating client-ready revision policies in seconds.

**Target user**: Freelancers (design, video, copywriting, consulting, marketing).

**Core scenario**: User is in a live client thread, needs boundary language fast, and cannot spend time drafting policy manually.

## User Pain
- Client keeps requesting additional revisions.
- New work is requested outside the approved brief.
- Freelancer needs firm wording without damaging relationship.

## Core Modules
- Module 1: Scope Intake - validate project context from user form.
- Module 2: Policy Engine - generate structured policy copy.
- Module 3: Delivery Packager - return copy-ready outputs for chat/email/contract.

## Input Schema
- `project_type`: enum(`logo`,`website`,`video`,`writing`,`marketing`,`other`)
- `project_price`: number, `> 0`
- `revision_count`: integer, `1..5`
- `client_type`: enum(`startup`,`small_business`,`agency`,`enterprise`)

## Output Schema (Critical)
- `revision_policy`: string - included rounds + extra revision charge rule.
- `scope_rule`: string - what is considered out-of-scope.
- `client_message`: string - client-facing explanation for chat/email.
- `contract_clause`: string - concise clause suitable for agreement text.

## UX Constraints
- One screen = one action.
- Time-to-value < 30 seconds.
- Output must be directly copyable.

## Non-goals (MVP)
- Project dashboard and task tracking.
- Multi-module orchestration (payment/pricing/deal) in same flow.

## Acceptance Criteria
- [ ] User can input 4 fields and generate output.
- [ ] API always returns all four output keys.
- [ ] UI supports per-block copy and copy feedback.
- [ ] Free limit and upgrade path are visible and enforced.
