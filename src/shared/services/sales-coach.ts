import fs from 'node:fs';
import path from 'node:path';

type CoachCard = {
  strategy_id: string;
  stage: string;
  objection_type: string;
  tactic: string;
  principle_en: string;
  sample_count?: number;
  quality_score?: number;
  quality_score_live?: number;
  tier?: string;
  tier_live?: string;
  allowed_for_default_generation?: boolean;
  allowed_for_default_generation_live?: boolean;
  requires_clarification_if_selected?: boolean;
};

type SupportedLocale = 'en' | 'zh' | 'es';

export type CoachStrategyResult = {
  instant_reply: string;
  client_psychology: string;
  suggested_price_range: {
    ideal_price: number;
    negotiable_price: number;
    bottom_price: number;
  };
  scripts: {
    strong: string;
    warm: string;
    concession: string;
  };
  decision_logic: string[];
  risk_alerts: string[];
  next_actions: string[];
  strategy_ids: string[];
  reasoning_summary: string[];
};

type DealInput = {
  client_need: string;
  your_quote: number;
  client_objection: string;
  your_floor_price: number;
  locale?: string;
};

const cardsPath = path.join(process.cwd(), 'src/data/sales-coach/strategy_cards_live.jsonl');
let cachedCards: CoachCard[] | null = null;

function loadCards(): CoachCard[] {
  if (cachedCards) return cachedCards;
  const content = fs.readFileSync(cardsPath, 'utf8');
  cachedCards = content
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => JSON.parse(line) as CoachCard);
  return cachedCards;
}

export function pickLocale(locale?: string): SupportedLocale {
  const l = String(locale || '').toLowerCase();
  if (l.startsWith('zh')) return 'zh';
  if (l.startsWith('es')) return 'es';
  return 'en';
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

function computePriceRange(yourQuote: number, floorPrice: number) {
  const quote = Math.max(0, yourQuote);
  const floor = Math.max(0, Math.min(floorPrice, quote || floorPrice));
  const gap = Math.max(quote - floor, 0);
  const negotiable = Math.max(floor * 1.12, floor + 0.25 * gap);
  const ideal = Math.max(quote, negotiable * 1.15);

  return {
    ideal_price: round2(ideal),
    negotiable_price: round2(negotiable),
    bottom_price: round2(floor),
  };
}

function inferStage(clientNeed: string): string {
  const text = clientNeed.toLowerCase();
  if (/(follow[\s-]?up|ghost|after call|reconnect)/.test(text)) return 'follow_up';
  if (/(close|contract|sign|decision|buy now)/.test(text)) return 'closing';
  if (/(proposal|demo|presentation|offer)/.test(text)) return 'presentation';
  if (/(objection|hesitant|pushback|concern)/.test(text)) return 'objection_handling';
  if (/(intro|first touch|cold|opening)/.test(text)) return 'opening';
  return 'discovery';
}

function inferObjection(objection: string): string {
  const text = objection.toLowerCase();
  if (/(price|budget|expensive|cost|贵|预算)/.test(text)) return 'price';
  if (/(later|wait|timing|quarter|下次|之后)/.test(text)) return 'timing';
  if (/(trust|proof|legit|case|信任|担心)/.test(text)) return 'trust';
  if (/(boss|approve|decision maker|authority|谁决定)/.test(text)) return 'decision_authority';
  if (/(need|fit|not sure|适合|需要吗)/.test(text)) return 'need_fit';
  return 'implicit';
}

function scoreCard(card: CoachCard, stage: string, objection: string): number {
  let score = 0;
  if (card.stage === stage) score += 4;
  else if (card.stage === 'general') score += 1.5;

  if (card.objection_type === objection) score += 4;
  else if (card.objection_type === 'implicit') score += 1;

  const tier = card.tier_live || card.tier || 'experimental';
  score += { core: 2, extended: 1, experimental: 0 }[tier] || 0;
  score += Number(card.quality_score_live ?? card.quality_score ?? 50) / 100;
  score += Math.min(Number(card.sample_count ?? 0), 20) / 20;
  return score;
}

function pickCards(stage: string, objection: string): CoachCard[] {
  const cards = loadCards();
  const candidates = cards.filter(
    (card) =>
      card.allowed_for_default_generation_live ??
      card.allowed_for_default_generation ??
      false
  );
  const source = candidates.length ? candidates : cards;
  const ranked = [...source].sort(
    (a, b) => scoreCard(b, stage, objection) - scoreCard(a, stage, objection)
  );

  const selected: CoachCard[] = [];
  const usedTactics = new Set<string>();
  for (const card of ranked) {
    if (selected.length >= 3) break;
    if (usedTactics.has(card.tactic)) continue;
    usedTactics.add(card.tactic);
    selected.push(card);
  }
  return selected;
}

function buildMessages(
  locale: SupportedLocale,
  cards: CoachCard[],
  range: ReturnType<typeof computePriceRange>
) {
  const tacticNames = cards.map((card) => card.tactic.replaceAll('_', ' '));
  const primary = tacticNames[0] || 'diagnostic questioning';
  const secondary = tacticNames[1] || 'value anchoring';
  const third = tacticNames[2] || 'next-step commitment';

  if (locale === 'zh') {
    return {
      instant_reply: `我理解你现在对预算会更谨慎。先不急着谈便宜与否，我们先看这件事能不能在短周期内带来明确结果；当前建议先按 ${range.ideal_price} 的价值框架沟通。`,
      client_psychology: `对方不是完全拒绝，而是在用风险和时机测试你是否有把握。优先用「${primary}」确认真实卡点，再用「${secondary}」提升价值感。`,
      scripts: {
        strong: `我理解你在看预算，但我更关心的是这笔投入能不能换来确定结果。我们先把 30 天内要达成的目标讲清楚，如果这个目标成立，按 ${range.ideal_price} 推进才是合理决策。`,
        warm: `你谨慎是正常的。我们先不急着做最终决定，先对齐一个最近 30 天能验证的小目标；如果这个目标成立，你觉得 ${range.negotiable_price} 这个区间会不会更容易接受？`,
        concession: `如果你今天预算确实卡得紧，我可以做条件式让步：先按 ${range.negotiable_price} 进入第一阶段，只保留最核心交付；低于 ${range.bottom_price} 我不建议做，因为会直接影响结果。`,
      },
      decision_logic: [
        `优先顺序：${primary} -> ${secondary} -> ${third}`,
        '先厘清真实异议，再讨论价格，不要先降价。',
        '让步必须绑定范围或时间条件，避免形成无底线砍价。',
      ],
      next_actions: [
        '先发一条共情 + 诊断式回复，不直接让价。',
        '补一个明确的结果目标和时间节点。',
        '把下一步推进成具体时间承诺，而不是模糊跟进。',
      ],
    };
  }

  if (locale === 'es') {
    return {
      instant_reply: `Es razonable cuidar el presupuesto. Antes de negociar precio, validemos si esto puede mover un resultado concreto; por ahora conviene sostener ${range.ideal_price} como ancla de valor.`,
      client_psychology: `No es un rechazo total. El comprador está midiendo riesgo, confianza y urgencia. Conviene abrir con ${primary} y luego reforzar con ${secondary}.`,
      scripts: {
        strong: `Entiendo el punto de precio, pero la decisión correcta no es “lo más barato”, sino el resultado más fiable. Si alineamos un objetivo claro a 30 días, mantener ${range.ideal_price} tiene sentido.`,
        warm: `Tiene sentido ser prudente. En lugar de decidir sí o no ahora, validemos un objetivo concreto de 30 días. Si ese objetivo queda claro, ¿${range.negotiable_price} sería un rango razonable para avanzar?`,
        concession: `Si hoy el presupuesto está ajustado, puedo hacer una concesión condicionada: ${range.negotiable_price} para una primera fase más acotada. No recomiendo ir por debajo de ${range.bottom_price} porque cae la calidad de ejecución.`,
      },
      decision_logic: [
        `Secuencia recomendada: ${primary}, ${secondary}, ${third}`,
        'Primero valor, después precio.',
        'Toda concesión debe tener condición de alcance o tiempo.',
      ],
      next_actions: [
        'Responder hoy con empatía y una pregunta diagnóstica.',
        'Aterrizar un objetivo medible y un plazo corto.',
        'Cerrar con un siguiente paso calendarizado.',
      ],
    };
  }

  return {
    instant_reply: `Totally fair to be careful on budget. Before we negotiate price, let’s test whether this can move one concrete outcome; for now, keep ${range.ideal_price} as the value anchor.`,
    client_psychology: `This is not a hard no. The buyer is testing risk, trust, and urgency. Lead with ${primary}, then reinforce with ${secondary}.`,
    scripts: {
      strong: `I hear the price concern, but the right decision is not “cheapest”; it is the most reliable outcome. If we align on one clear 30-day goal, holding at ${range.ideal_price} is the right frame.`,
      warm: `Budget caution makes sense. Instead of deciding yes or no today, let’s pressure-test one measurable 30-day target. If that target is real, would ${range.negotiable_price} feel reasonable to move forward?`,
      concession: `If budget is tight today, I can offer a conditional concession to ${range.negotiable_price} for a narrower first milestone. I do not recommend going below ${range.bottom_price} because delivery quality will drop.`,
    },
    decision_logic: [
      `Recommended sequence: ${primary}, ${secondary}, ${third}`,
      'Anchor value before discount.',
      'Any concession must trade for scope, timing, or commitment.',
    ],
    next_actions: [
      'Reply with empathy plus one diagnostic question today.',
      'Define one measurable short-cycle outcome.',
      'Close on a calendar-bound next step, not vague follow-up.',
    ],
  };
}

export function generateDealStrategy(input: DealInput): CoachStrategyResult {
  const locale = pickLocale(input.locale);
  const stage = inferStage(input.client_need);
  const objection = inferObjection(input.client_objection);
  const cards = pickCards(stage, objection);
  const range = computePriceRange(input.your_quote, input.your_floor_price);
  const messages = buildMessages(locale, cards, range);

  return {
    ...messages,
    suggested_price_range: range,
    risk_alerts: [
      'Do not discount before value framing.',
      'Do not promise guaranteed outcomes.',
      'Do not leak internal case sources.',
    ],
    strategy_ids: cards.map((card) => card.strategy_id),
    reasoning_summary: cards.map(
      (card) =>
        `${card.stage}|${card.objection_type}|${card.tactic}|${card.tier_live || card.tier || 'experimental'}`
    ),
  };
}

export function makePreview(
  strategy: CoachStrategyResult,
  locale: SupportedLocale
): CoachStrategyResult {
  const lockHint =
    locale === 'zh'
      ? '解锁后可查看完整版本。'
      : locale === 'es'
        ? 'Desbloquea para ver la versión completa.'
        : 'Unlock to view full version.';

  const trimPreview = (text: string, keep = 72) =>
    text.length <= keep ? text : `${text.slice(0, keep)}...`;

  return {
    ...strategy,
    client_psychology: trimPreview(strategy.client_psychology, 90),
    scripts: {
      strong: `${trimPreview(strategy.scripts.strong)} ${lockHint}`,
      warm: `${trimPreview(strategy.scripts.warm)} ${lockHint}`,
      concession: `${trimPreview(strategy.scripts.concession)} ${lockHint}`,
    },
    decision_logic: [strategy.decision_logic[0], lockHint],
    next_actions: [strategy.next_actions[0], lockHint],
  };
}
