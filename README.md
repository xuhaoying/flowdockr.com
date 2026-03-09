# Flowdockr v2

Scenario-based client negotiation system for freelancers and small agencies.

Flowdockr 不是通用 AI demo，而是「Scenario SEO 入口 + 决策页面 + 生成工具 + 历史留存 + Credits 付费」产品：

`search intent -> scenario page -> generate reply -> save history -> free limit -> buy credits -> continue`

## Product Scope

- 场景优先公开站点（首页、Pricing Hub、Pricing Scenarios、Guides、Tools、History、Pricing）
- 三段式输出（Recommended / Alternative / Strategy）
- 免费 2 次生成 + credits pack 购买
- Stripe Checkout + Webhook 发放 credits
- Save-to-history 最小留存路径（先本地存储，后续可接账户侧）

## Core Routes

本项目使用 `next-intl`，页面实际带 locale 前缀（例如 `/en/scenario`、`/zh/scenario`）。

Public (v2 pricing cluster):
- `/[locale]`
- `/[locale]/pricing`
- `/[locale]/pricing/[slug]`
- `/[locale]/guides`
- `/[locale]/guides/[slug]`
- `/[locale]/tools`
- `/[locale]/tools/reply-generator`
- `/[locale]/tools/price-negotiation-email-generator`
- `/[locale]/history`
- `/[locale]/signin`
- `/[locale]/checkout/success`
- `/[locale]/checkout/canceled`

Legacy redirects kept for compatibility:
- `/[locale]/scenario` -> `/[locale]/pricing`
- `/[locale]/scenario/[slug]` -> mapped `/[locale]/pricing/[slug]`
- `/[locale]/scenarios` -> `/[locale]/pricing`
- `/[locale]/tool` -> `/[locale]/tools/reply-generator`

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

通用谈判场景内容集中在：
- `src/data/scenarios.ts`
- `src/lib/scenarios.ts`

首发 SEO 集群（pricing cluster）内容集中在：
- `src/data/pricing-cluster.ts`
- `src/lib/pricing-cluster.ts`

Seed negotiation 场景（8 个）：
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
- 前端只传 `packCode`，价格与 credits 数量由服务端决定

## Auth & Access

- Landing 登录入口：`/[locale]/signin`（`/[locale]/login` 兼容别名）
- 登录方式：Google OAuth + Email Magic Link
- 典型触发点：
  - free usage 用尽
  - 点击 Save to history
  - 开始 Checkout

## Database

数据库定义见：
- `src/config/db/schema.postgres.ts`
- `src/config/db/schema.sqlite.ts`
- `src/config/db/schema.mysql.ts`

核心实体（命名会随 provider 适配）：
- 匿名免费次数追踪
- generation 记录
- purchase + webhook 幂等
- credit transaction / balance

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
- 页面入口混用 `/scenario` 与 `/pricing`
  - 对外 canonical 以 `/pricing` 为主；旧路径仅保留兼容跳转。

## License

See [LICENSE](LICENSE).
