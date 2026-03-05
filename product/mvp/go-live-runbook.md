# FlowDockr MVP Go-Live Runbook

Updated: 2026-03-04

## 1. Scope of this release
- Landing page (`/`)
- Scope Guard tool (`/scope`)
- Guides hub + 5 guide pages (`/guides/*`)
- Pricing page (`/pricing`)

## 2. Required environment variables
- `NEXT_PUBLIC_APP_URL` (production domain)
- `NEXT_PUBLIC_APP_NAME` (`FlowDockr`)
- `NEXT_PUBLIC_APP_DESCRIPTION`
- `AUTH_SECRET`
- `DATABASE_URL` (if auth/subscription checks enabled)
- `DATABASE_PROVIDER`
- `OPENAI_API_KEY` (optional but recommended)
- `SCOPE_GUARD_MODEL` (default: `gpt-4.1-mini`)

## 3. Build and deploy checks
1. `pnpm install`
2. `pnpm build`
3. Verify routes:
   - `/`
   - `/scope`
   - `/guides`
   - `/guides/client-keeps-asking-for-revisions`
   - `/pricing`
4. Verify API:
   - `POST /api/generate-scope-policy`

## 4. Functional QA
- Scope form accepts 4 fields and blocks invalid input.
- Generation succeeds with OpenAI key.
- Generation falls back gracefully when provider fails.
- Free limit (2 generations) shows upgrade state.
- Copy actions work per block and show `Copied` state.
- Auto-scroll to results works on generation success.
- Mobile layout has full-width primary action.

## 5. Analytics QA
- `scope_form_started`
- `scope_output_generated`
- `scope_block_copied`
- `scope_upgrade_clicked`

Note: events are emitted to `window.dataLayer` when available.

## 6. SEO QA
- `robots.txt` points to sitemap.
- `public/sitemap.xml` includes only live MVP URLs.
- Guide pages include CTA to `/scope`.

## 7. Launch decision
Go only if:
- Build passes
- Core generation flow works on desktop + mobile
- No blocking issue in copy/generation/upgrade flow
