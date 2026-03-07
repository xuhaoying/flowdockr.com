# Flowdockr MVP Database Schema

This document defines the minimum production-safe schema for:

- anonymous free usage
- paid credit balance
- credit ledger history
- purchases
- webhook idempotency
- generation history

## Table Mapping

Canonical model -> current implementation table:

- `anonymous_usage` -> `anonymous_usage`
- `credit_balances` -> `user.credits_balance` (MVP uses user row as balance store)
- `credit_ledger` -> `credit_transaction`
- `purchases` -> `purchase`
- `webhook_events` -> `webhook_event`
- `generations` -> `generation`

## Key Constraints in Current Schema

- `user.credits_balance >= 0`
- `anonymous_usage.free_generations_used >= 0`
- `purchase.credits_granted >= 0`
- `purchase.amount_usd_cents > 0`
- `purchase.status` constrained to allowed values
- `generation` has identity check: `user_id is not null OR anonymous_session_id is not null`
- `generation.source_page` constrained to `home|scenario|tool`
- `generation.mode_used` constrained to `free|paid`

## Hot Indexes

- `purchase(stripe_checkout_session_id)` unique
- `purchase(stripe_payment_intent_id)` index
- `purchase(status, created_at)` index
- `webhook_event(stripe_event_id)` unique
- `generation(user_id, created_at)` index
- `generation(anonymous_session_id, created_at)` index
- `generation(scenario_slug, created_at)` index
- `generation(source_page)` index

## SQL Blueprint

See:

- [docs/sql/flowdockr-mvp-schema.sql](/Users/xuhaoying/Desktop/100-Project/AI_Web/B002_flowdockr/docs/sql/flowdockr-mvp-schema.sql)
- [src/config/db/migrations/0001_flowdockr_business_integrity.sql](/Users/xuhaoying/Desktop/100-Project/AI_Web/B002_flowdockr/src/config/db/migrations/0001_flowdockr_business_integrity.sql)
