# FlowDockr MVP PRD

## Problem
Freelancers lose margin or stall deals when clients push for discounts, expand scope, or pressure timeline in chat.

## MVP Goal
Turn one client message into a decision-grade package in 30 seconds:
- Instant Reply
- Client Analysis
- Price Plan
- Strategy
- Risk
- Next Move

## User Stories
1. As a freelancer, I can paste a client message and my pricing context to get a ready-to-send reply.
2. As a freelancer, I can see a pricing plan that protects my floor price.
3. As a freelancer, I can understand deal risk and a clear next move.

## In Scope (MVP)
- Deal input form (`client_need`, `client_objection`, `your_quote`, `your_floor_price`).
- AI output strictly following `/docs/03-ai-contract.md`.
- UI card rendering for the six output blocks.
- Parse/validation fallback when model output is invalid or incomplete.
- Landing page sections: Hero, Demo, Use Cases, FAQ.

## Out of Scope (MVP)
- Full CRM pipeline.
- Multi-user team collaboration.
- Long-form coaching course content.
- General chat assistant experience.

## Core User Flow
1. User opens `/deal`.
2. User fills deal context + quote + floor price.
3. User clicks generate.
4. System returns strict JSON contract output.
5. UI renders 6 decision cards.
6. User copies `instant_reply` and sends it.

## Edge Conditions
- Missing context: force `next_move = ask_clarifying`.
- Missing pricing info: return strategy-only output without numeric prices.
- JSON parse failure: show friendly error with fallback guidance.
- Invalid numeric relations: never render price below floor.

## Acceptance Criteria
- API returns contract-shaped JSON with stable keys.
- UI renders all 6 cards without runtime errors.
- Error path is user-readable and actionable.
- No major refactor; existing style remains consistent.

