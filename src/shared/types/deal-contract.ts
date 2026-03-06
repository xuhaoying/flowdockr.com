export const DEAL_INTENTS = [
  'budget_pressure',
  'scope_push',
  'timeline_pressure',
  'comparison_shopping',
  'unclear_requirements',
] as const;

export const DEAL_LEVERAGE_LEVELS = ['low', 'medium', 'high'] as const;

export const DEAL_STRATEGY_APPROACHES = [
  'value_reframe',
  'scope_trade',
  'deadline_trade',
  'risk_reverse',
  'walkaway_ready',
] as const;

export const DEAL_RISK_LEVELS = ['low', 'medium', 'high'] as const;

export const DEAL_NEXT_MOVES = [
  'ask_clarifying',
  'send_reply',
  'offer_options',
  'propose_call',
  'walk_away',
] as const;

export type DealIntent = (typeof DEAL_INTENTS)[number];
export type DealLeverageLevel = (typeof DEAL_LEVERAGE_LEVELS)[number];
export type DealStrategyApproach = (typeof DEAL_STRATEGY_APPROACHES)[number];
export type DealRiskLevel = (typeof DEAL_RISK_LEVELS)[number];
export type DealNextMove = (typeof DEAL_NEXT_MOVES)[number];

export type DealContractResult = {
  instant_reply: string;
  client_analysis: {
    intent: DealIntent;
    signals: string[];
    leverage_level: DealLeverageLevel;
  };
  price_plan: {
    floor_price: number | null;
    anchor_price: number | null;
    negotiable_price: number | null;
    rationale: string;
  };
  strategy: {
    approach: DealStrategyApproach;
    concession_steps: string[];
  };
  risk: {
    deal_risk: DealRiskLevel;
    ghosting_probability: number;
    red_flags: string[];
  };
  next_move: DealNextMove;
};

export type DealFallbackReason =
  | 'missing_api_key'
  | 'upstream_error'
  | 'parse_failed'
  | 'unexpected_error'
  | null;

function isObject(v: unknown): v is Record<string, unknown> {
  return Boolean(v) && typeof v === 'object' && !Array.isArray(v);
}

export function isDealContractResult(value: unknown): value is DealContractResult {
  if (!isObject(value)) return false;

  const clientAnalysis = value.client_analysis;
  const pricePlan = value.price_plan;
  const strategy = value.strategy;
  const risk = value.risk;

  if (
    typeof value.instant_reply !== 'string' ||
    !DEAL_NEXT_MOVES.includes(value.next_move as DealNextMove) ||
    !isObject(clientAnalysis) ||
    !isObject(pricePlan) ||
    !isObject(strategy) ||
    !isObject(risk)
  ) {
    return false;
  }

  const hasValidPriceField =
    (pricePlan.floor_price === null || typeof pricePlan.floor_price === 'number') &&
    (pricePlan.anchor_price === null || typeof pricePlan.anchor_price === 'number') &&
    (pricePlan.negotiable_price === null || typeof pricePlan.negotiable_price === 'number');

  return (
    DEAL_INTENTS.includes(clientAnalysis.intent as DealIntent) &&
    DEAL_LEVERAGE_LEVELS.includes(
      clientAnalysis.leverage_level as DealLeverageLevel
    ) &&
    Array.isArray(clientAnalysis.signals) &&
    clientAnalysis.signals.every((x) => typeof x === 'string') &&
    hasValidPriceField &&
    typeof pricePlan.rationale === 'string' &&
    DEAL_STRATEGY_APPROACHES.includes(
      strategy.approach as DealStrategyApproach
    ) &&
    Array.isArray(strategy.concession_steps) &&
    strategy.concession_steps.every((x) => typeof x === 'string') &&
    DEAL_RISK_LEVELS.includes(risk.deal_risk as DealRiskLevel) &&
    typeof risk.ghosting_probability === 'number' &&
    Array.isArray(risk.red_flags) &&
    risk.red_flags.every((x) => typeof x === 'string')
  );
}

