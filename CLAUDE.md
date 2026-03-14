# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

## Project Overview

Flowdockr is an AI negotiation assistant for pricing conversations. The product centers on scenario-driven reply generation, negotiation support, credits-based usage, and reusable deal history. The codebase supports Vercel, Cloudflare, and Docker deployments, with billing integrations such as Stripe, PayPal, and Creem.

## Essential Commands

**Development**
```bash
pnpm dev              # Start development server with Turbopack
pnpm build            # Production build
pnpm start            # Start production server
```

**Database Operations**
```bash
pnpm db:generate      # Generate Drizzle migrations
pnpm db:migrate       # Run database migrations
pnpm db:push          # Push schema changes
pnpm db:studio        # Open Drizzle Studio
```

**Code Quality**
```bash
pnpm lint             # Run ESLint
pnpm format           # Format with Prettier
pnpm format:check     # Check formatting
```

**Cloudflare Deployment**
```bash
pnpm cf:preview       # Preview on Cloudflare
pnpm cf:deploy        # Deploy to Cloudflare
pnpm cf:typegen       # Generate Cloudflare types
```

## Architecture Overview

**App Router Structure**
```text
src/app/[locale]/
├── (landing)/          # Public landing, pricing, guides, scenario, and tool pages
├── (admin)/            # Admin dashboard and settings
├── (app)/              # Signed-in product experience
└── api/                # API routes
```

**Core Systems**
- **Authentication**: `src/core/auth/` with better-auth
- **Database**: `src/core/db/` with Drizzle ORM and multiple database targets
- **RBAC**: `src/core/rbac/` for admin and internal permissions
- **Internationalization**: `src/core/i18n/` with next-intl locale handling

**Key Patterns**
1. OAuth, billing, email, analytics, and storage settings are managed through `/admin/settings` and stored in the database.
2. Public marketing pages and signed-in product flows share the same auth and billing primitives.
3. Payment integrations flow through `src/shared/services/payment.ts`.
4. Shared marketing and dashboard blocks live under `src/shared/blocks/`.

**Environment Requirements**
- `DATABASE_URL`: PostgreSQL connection string
- `AUTH_SECRET`: better-auth secret
- `NEXT_PUBLIC_APP_URL`: application URL

**TypeScript Path Mapping**
- `@/*` maps to `./src/*`

**Primary Product Surfaces**
- Pricing and scenario landing pages
- Negotiation reply generation tools
- Credits and payment flows
- Saved history and dashboard views
