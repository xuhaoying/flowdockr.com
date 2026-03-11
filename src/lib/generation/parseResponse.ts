import type {
  FollowUpSuggestion,
  GenerateReplyResult,
  ReplyVersion,
  StrategyBlock,
} from '@/types/generation';

export type ParsedGenerationOutput = GenerateReplyResult & {
  confidence: 'high' | 'medium' | 'low';
  caution?: string;
};

type RawStructuredPayload = {
  strategy?: {
    objective?: unknown;
    why_it_works?: unknown;
    what_to_avoid?: unknown;
    negotiation_framing?: unknown;
  };
  replies?: {
    professional?: unknown;
    firm?: unknown;
    softer?: unknown;
  };
  risk_insights?: unknown;
  follow_up?: {
    reply?: unknown;
    direction?: unknown;
  };
  confidence?: unknown;
  caution?: unknown;
  reply?: unknown;
  recommendedReply?: unknown;
  alternativeReply?: unknown;
  strategy_block?: unknown;
} | null;

const NEUTRAL_RISK_NOTE =
  'Main risk is low. Keep the reply concise and avoid offering concessions too early if the client pushes again.';

function cleanText(value: string): string {
  return value.trim().replace(/^["'\s]+|["'\s]+$/g, '');
}

export function parseResponse(raw: string): GenerateReplyResult {
  const structured = parseStructuredJson(raw);
  if (structured) {
    return structured;
  }

  const legacy = parseLegacySections(raw);
  if (legacy) {
    return legacy;
  }

  throw new Error('FAILED_TO_PARSE_GENERATION');
}

export function parseGenerationResult(raw: string): ParsedGenerationOutput {
  const normalized = normalizeRaw(raw);
  const parsed = parseResponse(normalized);

  return {
    ...parsed,
    confidence: 'medium',
    caution: parsed.riskInsights[0] || NEUTRAL_RISK_NOTE,
  };
}

function parseStructuredJson(raw: string): GenerateReplyResult | null {
  const normalized = normalizeRaw(raw);

  try {
    const parsed = JSON.parse(normalized) as RawStructuredPayload;
    if (!parsed || typeof parsed !== 'object') {
      return null;
    }

    const professional = pickReplyText(parsed.replies?.professional, parsed.reply);
    const firm = pickReplyText(parsed.replies?.firm, parsed.alternativeReply);
    const softer = pickReplyText(parsed.replies?.softer, parsed.recommendedReply);

    const strategyBlock = normalizeStrategyBlock(parsed.strategy || parsed.strategy_block);
    const riskInsights = normalizeStringArray(parsed.risk_insights).slice(0, 2);
    const followUpSuggestion = normalizeFollowUp(parsed.follow_up);

    if (!professional || !firm || !softer || !strategyBlock.objective) {
      return null;
    }

    const replyVersions = buildReplyVersions({
      professional,
      firm,
      softer,
    });

    return {
      reply: professional,
      alternativeReply: firm,
      strategy: flattenStrategy(strategyBlock),
      strategyBlock,
      replyVersions,
      riskInsights: riskInsights.length > 0 ? riskInsights : [NEUTRAL_RISK_NOTE],
      followUpSuggestion,
    };
  } catch {
    return null;
  }
}

function parseLegacySections(raw: string): GenerateReplyResult | null {
  const normalized = normalizeRaw(raw);

  const recommendedMatch = normalized.match(
    /Recommended reply:\s*([\s\S]*?)\n\s*Alternative reply:/i
  );
  const alternativeMatch = normalized.match(
    /Alternative reply:\s*([\s\S]*?)\n\s*Strategy:/i
  );
  const strategyMatch = normalized.match(/Strategy:\s*([\s\S]*)$/i);

  const professional = cleanText(recommendedMatch?.[1] || '');
  const firm = cleanText(alternativeMatch?.[1] || '');
  const strategy = cleanText(strategyMatch?.[1] || '')
    .split('\n')
    .map((line) => line.replace(/^\s*-\s*/, '').trim())
    .filter(Boolean)
    .slice(0, 3);

  if (!professional || !firm || strategy.length === 0) {
    return null;
  }

  const softer = softenReply(professional);
  const strategyBlock: StrategyBlock = {
    objective: strategy[0] || 'Protect your position while keeping the conversation workable.',
    whyItWorks: strategy.slice(1, 3),
    whatToAvoid: ['Avoid over-explaining or discounting too early.'],
    negotiationFraming: 'Keep the reply calm, structured, and outcome-oriented.',
  };

  return {
    reply: professional,
    alternativeReply: firm,
    strategy,
    strategyBlock,
    replyVersions: buildReplyVersions({
      professional,
      firm,
      softer,
    }),
    riskInsights: [NEUTRAL_RISK_NOTE],
    followUpSuggestion: {
      reply:
        'If the budget is still the constraint, I can suggest a narrower option that protects the key outcome without weakening the original scope.',
      direction: 'Move the conversation toward structured tradeoffs instead of immediate concessions.',
    },
  };
}

function buildReplyVersions(input: {
  professional: string;
  firm: string;
  softer: string;
}): ReplyVersion[] {
  return [
    {
      key: 'professional',
      label: 'Professional',
      text: input.professional,
    },
    {
      key: 'firm',
      label: 'Firm',
      text: input.firm,
    },
    {
      key: 'softer',
      label: 'Softer',
      text: input.softer,
    },
  ];
}

function flattenStrategy(block: StrategyBlock): string[] {
  return [
    block.objective,
    ...(block.whyItWorks || []).slice(0, 1),
    ...(block.whatToAvoid || []).slice(0, 1),
  ]
    .map((item) => cleanText(item || ''))
    .filter(Boolean)
    .slice(0, 3);
}

function normalizeStrategyBlock(value: unknown): StrategyBlock {
  const strategy = value && typeof value === 'object' ? (value as Record<string, unknown>) : {};

  return {
    objective: cleanText(stringOrEmpty(strategy.objective)),
    whyItWorks: normalizeStringArray(strategy.why_it_works).slice(0, 3),
    whatToAvoid: normalizeStringArray(strategy.what_to_avoid).slice(0, 3),
    negotiationFraming: cleanText(stringOrEmpty(strategy.negotiation_framing)) || undefined,
  };
}

function normalizeFollowUp(value: unknown): FollowUpSuggestion | undefined {
  if (!value || typeof value !== 'object') {
    return undefined;
  }

  const row = value as Record<string, unknown>;
  const reply = cleanText(stringOrEmpty(row.reply));
  const direction = cleanText(stringOrEmpty(row.direction));
  if (!reply) {
    return undefined;
  }

  return {
    reply,
    direction:
      direction ||
      'Hold the line calmly and move the conversation toward scope, terms, or a clearer decision.',
  };
}

function normalizeStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => cleanText(typeof item === 'string' ? item : ''))
    .filter(Boolean);
}

function pickReplyText(primary: unknown, fallback: unknown): string {
  const first = cleanText(typeof primary === 'string' ? primary : '');
  if (first) {
    return first;
  }

  return cleanText(typeof fallback === 'string' ? fallback : '');
}

function softenReply(reply: string): string {
  const trimmed = cleanText(reply);
  if (!trimmed) {
    return '';
  }

  if (/^thanks|^i understand|^totally understand/i.test(trimmed)) {
    return trimmed;
  }

  return `I understand the constraint. ${trimmed}`;
}

function normalizeRaw(raw: string): string {
  return raw
    .trim()
    .replace(/^```(?:json|text|markdown)?\s*/i, '')
    .replace(/\s*```$/i, '');
}

function stringOrEmpty(value: unknown): string {
  return typeof value === 'string' ? value : '';
}
