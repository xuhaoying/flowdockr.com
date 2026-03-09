# Flowdockr v2

Scenario-first SEO negotiation reply tool for freelancers.

Flowdockr 不是通用 SaaS 营销页，而是「场景页 + 工具 + credits 付费」产品：

`search/scenario entry -> generate reply -> free limit -> buy credits -> continue`

## Product Scope

- 场景优先公开站点（首页、场景目录、场景详情、通用工具、定价）
- 三段式输出（Recommended / Alternative / Strategy）
- 免费 2 次生成 + credits pack 购买
- Stripe Checkout + Webhook 发放 credits

## Core Routes

本项目使用 `next-intl`，页面实际带 locale 前缀（例如 `/en/scenarios`、`/zh/scenarios`）。

Public:
- `/[locale]`
- `/[locale]/scenarios`
- `/[locale]/scenarios/[slug]`
- `/[locale]/tool`
- `/[locale]/pricing`
- `/[locale]/checkout/success`
- `/[locale]/checkout/canceled`

Core APIs:
- `POST /api/generate`
- `GET /api/credits`
- `POST /api/checkout/session`
- `GET /api/checkout/status`
- `POST /api/stripe/webhook`

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Drizzle ORM
- Better Auth
- Stripe
- next-intl

## Scenario Data System

场景内容集中在：
- `src/data/scenarios.ts`
- `src/lib/scenarios.ts`

Seed 场景（8 个）：
- `lowball-offer`
- `client-asks-discount`
- `cheaper-freelancer`
- `free-sample-work`
- `more-work-same-budget`
- `budget-limited`
- `delayed-decision`
- `small-extra-free`

## Prompt & Generation Architecture

- `src/lib/prompts/systemPrompt.ts`
- `src/lib/prompts/buildScenarioPrompt.ts`
- `src/lib/prompts/outputSchema.ts`
- `src/lib/generation/generateReply.ts`
- `src/lib/generation/parseResponse.ts`
- `src/lib/generation/saveGeneration.ts`

输出契约：

```ts
type GenerateReplyResponse = {
  success: boolean;
  reply: string;
  alternativeReply: string;
  strategy: string[];
  scenarioSlug: string;
  creditsRemaining?: number;
  requiresUpgrade?: boolean;
  error?: string;
};
```

## Credits & Payments

Packs:
- Free: 2 replies
- Starter: 20 credits
- Pro: 100 credits
- 1 generation = 1 credit

配置文件：
- `src/config/creditPacks.ts`
- `src/lib/payments/*`
- `src/app/api/stripe/webhook/route.ts`

关键规则：
- 仅后端判断可生成与扣减
- 仅 webhook 发放 credits
- webhook 幂等去重（防重复加币）

## Database

业务相关 schema 说明：
- `docs/08-database-schema.md`

核心表：
- `anonymous_usage`
- `generation`
- `purchase`
- `webhook_event`
- `credit_transaction`
- `user.credits_balance`（当前余额）

## Quick Start

### 1) Install

```bash
pnpm install
```

### 2) Env

```bash
cp .env.example .env.local
```

至少需要配置：
- `DATABASE_URL`
- `AUTH_SECRET`
- `FLOWDOCKR_MODEL`（默认 `gpt-5-mini`）
- `OPENAI_API_KEY` 或 `FAL_API_KEY`（按你的 provider）
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_PRICE_STARTER_20`
- `STRIPE_PRICE_PRO_100`

### 3) Database

```bash
pnpm db:generate
pnpm db:migrate
```

### 4) Run

```bash
pnpm dev
```

## Quality Gates

本地提交前至少跑：

```bash
pnpm lint
pnpm type-check
pnpm build
```

CI 工作流同样执行 `lint + type-check + build`（见 `.github/workflows/ci.yml`）。

## Branch & Release Rules

- `main` 为受保护生产分支
- 禁止直接 push `main`
- 使用 `feature/*` / `fix/*` / `chore/*` / `codex/*` 分支
- 通过 PR 合并，并先过 Vercel Preview 验收

参考：
- `docs/development-workflow.md`
- `docs/release-checklist.md`

## Troubleshooting

- 报错 `Module not found: Can't resolve '@/data/scenarios'`
  - 确认 `src/data/scenarios.ts` 已被提交（不要被 ignore 规则误伤）。
- Stripe 支付后未到账
  - 先检查 webhook 签名配置与 `checkout.session.completed` 事件投递状态。

## License

See [LICENSE](LICENSE).
