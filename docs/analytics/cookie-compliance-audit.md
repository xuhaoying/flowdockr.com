# Flowdockr Analytics and Cookie Audit

Effective date: March 17, 2026

## Current optional tracking surfaces found in the codebase

- Google Analytics via `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- Clarity
- Plausible
- OpenPanel
- Vercel Analytics
- Google AdSense
- Affiliate tracking via Affonso and PromoteKit
- Customer support widgets via Crisp and Tawk
- First-party `utm_source` attribution cookie capture

## What changed in this trust layer pass

- Added a lightweight consent banner for optional analytics and third-party scripts
- Optional analytics, ads, affiliate, and customer-support scripts are now gated behind an explicit consent cookie
- The first-party `utm_source` attribution cookie is no longer written before consent

## Remaining gaps

- There is no self-serve preference center yet; changing consent currently requires accepting or declining in the banner, or clearing site cookies later
- Consent is implemented as one simple optional-tracking choice, not provider-by-provider categories
- This document reflects code paths and configurable integrations, not a guarantee that every provider is active in production at all times
