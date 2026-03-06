import {
  CoachStrategyResult,
  generateDealStrategy,
  pickLocale,
} from '@/shared/services/sales-coach';
import {
  DEAL_INTENTS,
  DEAL_LEVERAGE_LEVELS,
  DEAL_NEXT_MOVES,
  DEAL_RISK_LEVELS,
  DEAL_STRATEGY_APPROACHES,
  DealContractResult,
  DealFallbackReason,
  DealIntent,
  DealNextMove,
  DealStrategyApproach,
} from '@/shared/types/deal-contract';

type DealInput = {
  client_need: string;
  your_quote: number;
  client_objection: string;
  your_floor_price: number;
  locale?: string;
};

export type DealGenerateResult = {
  strategy: DealContractResult;
  mode: 'ai' | 'rules';
  model: string;
  provider: 'openai' | 'sales-coach';
  selected_strategy_ids: string[];
  reasoning_summary: string[];
  fallback_reason: DealFallbackReason;
};

const DEAL_RESPONSE_JSON_SCHEMA = {
  name: 'deal_contract_output_v0',
  strict: true,
  schema: {
    type: 'object',
    additionalProperties: false,
    properties: {
      instant_reply: { type: 'string' },
      client_analysis: {
        type: 'object',
        additionalProperties: false,
        properties: {
          intent: { type: 'string', enum: DEAL_INTENTS },
          signals: {
            type: 'array',
            minItems: 1,
            maxItems: 5,
            items: { type: 'string' },
          },
          leverage_level: { type: 'string', enum: DEAL_LEVERAGE_LEVELS },
        },
        required: ['intent', 'signals', 'leverage_level'],
      },
      price_plan: {
        type: 'object',
        additionalProperties: false,
        properties: {
          floor_price: { type: 'number' },
          anchor_price: { type: 'number' },
          negotiable_price: { type: 'number' },
          rationale: { type: 'string' },
        },
        required: ['rationale'],
      },
      strategy: {
        type: 'object',
        additionalProperties: false,
        properties: {
          approach: { type: 'string', enum: DEAL_STRATEGY_APPROACHES },
          concession_steps: {
            type: 'array',
            minItems: 1,
            maxItems: 3,
            items: { type: 'string' },
          },
        },
        required: ['approach', 'concession_steps'],
      },
      risk: {
        type: 'object',
        additionalProperties: false,
        properties: {
          deal_risk: { type: 'string', enum: DEAL_RISK_LEVELS },
          ghosting_probability: { type: 'number' },
          red_flags: {
            type: 'array',
            minItems: 1,
            maxItems: 5,
            items: { type: 'string' },
          },
        },
        required: ['deal_risk', 'ghosting_probability', 'red_flags'],
      },
      next_move: {
        type: 'string',
        enum: DEAL_NEXT_MOVES,
      },
    },
    required: [
      'instant_reply',
      'client_analysis',
      'price_plan',
      'strategy',
      'risk',
      'next_move',
    ],
  },
} as const;

function parseModelJsonContent(rawContent: string): Record<string, unknown> {
  const trimmed = String(rawContent || '').trim();
  if (!trimmed) {
    throw new Error('Model returned empty output');
  }

  try {
    return JSON.parse(trimmed) as Record<string, unknown>;
  } catch {
    const cleaned = trimmed
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/\s*```$/, '');
    return JSON.parse(cleaned) as Record<string, unknown>;
  }
}

function normalizeEnum<T extends string>(
  value: unknown,
  allowed: readonly T[],
  fallback: T
): T {
  const text = String(value || '').trim() as T;
  return allowed.includes(text) ? text : fallback;
}

function sanitizeText(value: unknown, fallback: string, max = 220): string {
  const text = String(value || '')
    .replace(/\s+/g, ' ')
    .trim();

  if (!text) return fallback;
  if (text.length <= max) return text;
  return `${text.slice(0, Math.max(0, max - 3))}...`;
}

function clampProbability(value: unknown, fallback: number): number {
  const n = Number(value);
  if (!Number.isFinite(n)) return fallback;
  if (n < 0) return 0;
  if (n > 1) return 1;
  return Math.round(n * 100) / 100;
}

function toTextArray(value: unknown, fallback: string[], maxItems = 3): string[] {
  if (!Array.isArray(value)) {
    return fallback.slice(0, maxItems);
  }

  const rows = value
    .map((x) => sanitizeText(x, '', 160))
    .filter(Boolean)
    .slice(0, maxItems);

  return rows.length ? rows : fallback.slice(0, maxItems);
}

function toPrice(value: unknown): number | null {
  const n = Number(value);
  return Number.isFinite(n) && n >= 0 ? Math.round(n * 100) / 100 : null;
}

function normalizePricePlan(
  raw: Record<string, unknown>,
  fallback: DealContractResult['price_plan']
): DealContractResult['price_plan'] {
  const plan = (raw.price_plan || {}) as Record<string, unknown>;
  const rationale = sanitizeText(plan.rationale, fallback.rationale, 180);
  const floor = toPrice(plan.floor_price);
  const anchor = toPrice(plan.anchor_price);
  const negotiable = toPrice(plan.negotiable_price);

  if (floor !== null && anchor !== null && negotiable !== null) {
    const sorted = [anchor, negotiable, floor].sort((a, b) => b - a);
    return {
      floor_price: sorted[2],
      anchor_price: sorted[0],
      negotiable_price: sorted[1],
      rationale,
    };
  }

  if (
    fallback.floor_price !== null &&
    fallback.anchor_price !== null &&
    fallback.negotiable_price !== null
  ) {
    return {
      ...fallback,
      rationale,
    };
  }

  return {
    floor_price: null,
    anchor_price: null,
    negotiable_price: null,
    rationale: rationale || '缺少 floor/quote',
  };
}

function normalizeWithFallback(
  raw: Record<string, unknown>,
  fallback: DealContractResult
): DealContractResult {
  const clientAnalysis = (raw.client_analysis || {}) as Record<string, unknown>;
  const strategy = (raw.strategy || {}) as Record<string, unknown>;
  const risk = (raw.risk || {}) as Record<string, unknown>;

  const instantReply = sanitizeText(raw.instant_reply, fallback.instant_reply, 180);

  return {
    instant_reply:
      instantReply.length >= 20 ? instantReply : fallback.instant_reply,
    client_analysis: {
      intent: normalizeEnum(
        clientAnalysis.intent,
        DEAL_INTENTS,
        fallback.client_analysis.intent
      ),
      signals: toTextArray(
        clientAnalysis.signals,
        fallback.client_analysis.signals,
        5
      ),
      leverage_level: normalizeEnum(
        clientAnalysis.leverage_level,
        DEAL_LEVERAGE_LEVELS,
        fallback.client_analysis.leverage_level
      ),
    },
    price_plan: normalizePricePlan(raw, fallback.price_plan),
    strategy: {
      approach: normalizeEnum(
        strategy.approach,
        DEAL_STRATEGY_APPROACHES,
        fallback.strategy.approach
      ),
      concession_steps: toTextArray(
        strategy.concession_steps,
        fallback.strategy.concession_steps,
        3
      ),
    },
    risk: {
      deal_risk: normalizeEnum(
        risk.deal_risk,
        DEAL_RISK_LEVELS,
        fallback.risk.deal_risk
      ),
      ghosting_probability: clampProbability(
        risk.ghosting_probability,
        fallback.risk.ghosting_probability
      ),
      red_flags: toTextArray(risk.red_flags, fallback.risk.red_flags, 5),
    },
    next_move: normalizeEnum(raw.next_move, DEAL_NEXT_MOVES, fallback.next_move),
  };
}

function inferIntentFromInput(input: DealInput): DealIntent {
  const text = `${input.client_need} ${input.client_objection}`.toLowerCase();

  if (/(competitor|cheaper|compare|comparison|别人更便宜|对比)/.test(text)) {
    return 'comparison_shopping';
  }
  if (/(scope|revision|extra work|additional|change request|返工|加需求|超范围)/.test(text)) {
    return 'scope_push';
  }
  if (/(timeline|deadline|urgent|asap|rush|today|tomorrow|this week|赶工|加急)/.test(text)) {
    return 'timeline_pressure';
  }
  if (/(budget|price|expensive|discount|cost|太贵|预算|降价)/.test(text)) {
    return 'budget_pressure';
  }

  return 'unclear_requirements';
}

function mapApproach(value: string): DealStrategyApproach {
  const text = value.toLowerCase();
  if (/(scope|revision|boundary|trade[-_\s]?off)/.test(text)) return 'scope_trade';
  if (/(deadline|timeline|rush|time)/.test(text)) return 'deadline_trade';
  if (/(risk|proof|case|credibility|trust)/.test(text)) return 'risk_reverse';
  if (/(walk|away|exit|decline)/.test(text)) return 'walkaway_ready';
  return 'value_reframe';
}

function mapNextMove(value: CoachStrategyResult['next_move']): DealNextMove {
  if (value === 'ask_clarification') return 'ask_clarifying';
  if (value === 'offer_conditional_concession') return 'offer_options';
  if (value === 'walk_away') return 'walk_away';
  return 'send_reply';
}

function mapLegacyToContract(
  fallback: CoachStrategyResult,
  input: DealInput
): DealContractResult {
  const signals = [input.client_objection, input.client_need]
    .map((x) => sanitizeText(x, '', 100))
    .filter(Boolean)
    .slice(0, 5);

  const fallbackSignals = signals.length ? signals : ['Need more context'];
  const concessionSteps = [
    ...fallback.next_actions,
    ...fallback.decision_logic,
  ]
    .map((x) => sanitizeText(x, '', 160))
    .filter(Boolean)
    .slice(0, 3);

  const redFlags = fallback.risk_alerts
    .map((x) => sanitizeText(x, '', 140))
    .filter(Boolean)
    .slice(0, 5);

  return {
    instant_reply: sanitizeText(
      fallback.instant_reply,
      '我们先对齐需求和范围，再给你两个可执行方案。',
      180
    ),
    client_analysis: {
      intent: inferIntentFromInput(input),
      signals: fallbackSignals,
      leverage_level: normalizeEnum(
        fallback.client_analysis.leverage,
        DEAL_LEVERAGE_LEVELS,
        'medium'
      ),
    },
    price_plan: {
      floor_price: fallback.suggested_price_range.bottom_price,
      anchor_price: fallback.suggested_price_range.ideal_price,
      negotiable_price: fallback.suggested_price_range.negotiable_price,
      rationale: sanitizeText(
        fallback.strategy_panel.negotiation_principle,
        'Protect floor while preserving value positioning.',
        180
      ),
    },
    strategy: {
      approach: mapApproach(fallback.strategy_panel.type),
      concession_steps:
        concessionSteps.length > 0
          ? concessionSteps
          : ['Align scope first', 'Offer reduced scope option', 'Walk away if needed'],
    },
    risk: {
      deal_risk: normalizeEnum(
        fallback.risk_assessment.deal_risk,
        DEAL_RISK_LEVELS,
        'medium'
      ),
      ghosting_probability: clampProbability(
        fallback.risk_assessment.ghosting_probability,
        0.35
      ),
      red_flags:
        redFlags.length > 0
          ? redFlags
          : ['Price-only focus', 'No scope confirmation'],
    },
    next_move: mapNextMove(fallback.next_move),
  };
}

export function makeDealPreview(
  strategy: DealContractResult,
  locale: string
): DealContractResult {
  const hint = locale === 'zh' ? '解锁后查看完整建议。' : locale === 'es' ? 'Desbloquea para ver completo.' : 'Unlock to view full guidance.';

  return {
    ...strategy,
    client_analysis: {
      ...strategy.client_analysis,
      signals: [strategy.client_analysis.signals[0] || hint, hint].slice(0, 2),
    },
    strategy: {
      ...strategy.strategy,
      concession_steps: [strategy.strategy.concession_steps[0] || hint, hint].slice(
        0,
        2
      ),
    },
    risk: {
      ...strategy.risk,
      red_flags: [strategy.risk.red_flags[0] || hint, hint].slice(0, 2),
    },
  };
}

function buildDealSystemPrompt(locale: string) {
  return [
    'You are a negotiation strategist for freelancers.',
    'Return JSON only and strictly follow the provided JSON schema.',
    `Output language must match locale: ${locale}.`,
    'Write practical, send-ready output; avoid generic filler.',
    'Never promise guaranteed outcomes.',
    'Respect floor price and avoid manipulative language.',
    'If context is insufficient, set next_move to ask_clarifying and ask to align scope/requirements first.',
    'If floor/quote is missing, do not output numeric prices and set price_plan.rationale to "缺少 floor/quote".',
  ].join(' ');
}

function buildDealUserPrompt(input: DealInput) {
  return [
    'Analyze this deal and generate decision-grade negotiation output.',
    `Client need: ${input.client_need}`,
    `Client objection: ${input.client_objection}`,
    `Current quote: ${input.your_quote}`,
    `Floor price: ${input.your_floor_price}`,
    '',
    'Rules:',
    '- Keep anchor price above negotiable and floor when pricing is available.',
    '- Keep concession steps to at most 3 concise actions.',
    '- Include clear risk flags for the next 24 hours.',
  ].join('\n');
}

function buildFallbackResult(
  fallback: DealContractResult,
  fallbackLegacy: CoachStrategyResult,
  reason: DealFallbackReason
): DealGenerateResult {
  return {
    strategy: fallback,
    mode: 'rules',
    model: 'kb-rerank-v1',
    provider: 'sales-coach',
    selected_strategy_ids: fallbackLegacy.strategy_ids,
    reasoning_summary: fallbackLegacy.reasoning_summary,
    fallback_reason: reason,
  };
}

export async function generateDealStrategyWithMode(
  input: DealInput
): Promise<DealGenerateResult> {
  const fallbackLegacy = generateDealStrategy(input);
  const fallback = mapLegacyToContract(fallbackLegacy, input);
  const locale = pickLocale(input.locale);
  const apiKey = process.env.OPENAI_API_KEY || '';
  const model =
    process.env.DEAL_STRATEGY_MODEL || process.env.SCOPE_GUARD_MODEL || 'gpt-4.1-mini';

  if (!apiKey) {
    return buildFallbackResult(fallback, fallbackLegacy, 'missing_api_key');
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        temperature: 0.2,
        messages: [
          {
            role: 'system',
            content: buildDealSystemPrompt(locale),
          },
          {
            role: 'user',
            content: buildDealUserPrompt(input),
          },
        ],
        response_format: {
          type: 'json_schema',
          json_schema: DEAL_RESPONSE_JSON_SCHEMA,
        },
      }),
    });

    if (!response.ok) {
      return buildFallbackResult(fallback, fallbackLegacy, 'upstream_error');
    }

    const data = await response.json();
    const rawContent = String(data?.choices?.[0]?.message?.content || '');

    try {
      const parsed = parseModelJsonContent(rawContent);
      const strategy = normalizeWithFallback(parsed, fallback);

      return {
        strategy,
        mode: 'ai',
        model,
        provider: 'openai',
        selected_strategy_ids: fallbackLegacy.strategy_ids,
        reasoning_summary: fallbackLegacy.reasoning_summary,
        fallback_reason: null,
      };
    } catch {
      return buildFallbackResult(fallback, fallbackLegacy, 'parse_failed');
    }
  } catch {
    return buildFallbackResult(fallback, fallbackLegacy, 'unexpected_error');
  }
}

