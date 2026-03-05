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

function summarizeNeed(clientNeed: string): string {
  const cleaned = clientNeed.replace(/\s+/g, ' ').trim();
  if (!cleaned) return 'project outcome';
  if (cleaned.length <= 72) return cleaned;
  return `${cleaned.slice(0, 69)}...`;
}

function extractTimeline(clientNeed: string, clientObjection: string): string {
  const merged = `${clientNeed} ${clientObjection}`.toLowerCase();
  const explicit = merged.match(/(\d+\s*(day|days|week|weeks|month|months))/);
  if (explicit) return explicit[1];
  if (/(urgent|asap|rush|soon|today|tomorrow|this week)/.test(merged)) {
    return 'urgent timeline';
  }
  return 'agreed timeline';
}

function objectionLabel(objection: string, locale: SupportedLocale): string {
  if (locale === 'zh') {
    if (objection === 'price') return '预算/价格';
    if (objection === 'timing') return '时机/优先级';
    if (objection === 'trust') return '信任/案例证明';
    if (objection === 'decision_authority') return '决策权限';
    if (objection === 'need_fit') return '需求匹配';
    return '隐性顾虑';
  }

  if (locale === 'es') {
    if (objection === 'price') return 'precio/presupuesto';
    if (objection === 'timing') return 'timing/prioridad';
    if (objection === 'trust') return 'confianza/prueba';
    if (objection === 'decision_authority') return 'autoridad de decisión';
    if (objection === 'need_fit') return 'encaje de necesidad';
    return 'objeción implícita';
  }

  if (objection === 'price') return 'price/budget';
  if (objection === 'timing') return 'timing/priority';
  if (objection === 'trust') return 'trust/proof';
  if (objection === 'decision_authority') return 'decision authority';
  if (objection === 'need_fit') return 'need-fit';
  return 'implicit objection';
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
  range: ReturnType<typeof computePriceRange>,
  context: {
    needSummary: string;
    timeline: string;
    objection: string;
  }
) {
  const tacticNames = cards.map((card) => card.tactic.replaceAll('_', ' '));
  const primary = tacticNames[0] || 'diagnostic questioning';
  const secondary = tacticNames[1] || 'value anchoring';
  const third = tacticNames[2] || 'next-step commitment';
  const objection = objectionLabel(context.objection, locale);

  if (locale === 'zh') {
    return {
      instant_reply: `我理解你现在会更谨慎，尤其在「${objection}」这个点上。针对“${context.needSummary}”，先不急着降价，先确认可验证结果；当前建议按 ${range.ideal_price} 作为价值锚点。`,
      client_psychology: `对方不是完全拒绝，而是在测试风险、时机与可控性。优先用「${primary}」确认真实卡点，再用「${secondary}」把价值和结果说清楚。`,
      scripts: {
        strong: `我理解你对预算敏感，但“${context.needSummary}”的决策核心不是便宜，而是结果可靠。先把 ${context.timeline} 内要达成的目标讲清楚，如果目标成立，按 ${range.ideal_price} 推进才合理。`,
        warm: `你谨慎很正常。我们先不做“是否合作”的结论，先对齐一个 ${context.timeline} 可验证的小目标；如果目标成立，${range.negotiable_price} 这个区间是否更容易接受？`,
        concession: `如果你今天预算确实受限，我可以做条件式让步：按 ${range.negotiable_price} 进入第一阶段，只保留核心交付并保持 ${context.timeline}；低于 ${range.bottom_price} 会直接影响结果，我不建议。`,
      },
      decision_logic: [
        `优先顺序：${primary} -> ${secondary} -> ${third}`,
        `先厘清「${objection}」这个真实异议，再谈价格，不先降价。`,
        '让步必须绑定范围或时间条件，避免形成无底线砍价。',
      ],
      next_actions: [
        `先发一条共情 + 诊断式回复，明确围绕“${context.needSummary}”推进。`,
        `补一个 ${context.timeline} 内可验证的结果目标和衡量标准。`,
        '把下一步推进成具体时间承诺，不做模糊跟进。',
      ],
    };
  }

  if (locale === 'es') {
    return {
      instant_reply: `Es razonable cuidar presupuesto, sobre todo por la objeción de ${objection}. Para “${context.needSummary}”, antes de bajar precio validemos un resultado concreto; por ahora conviene sostener ${range.ideal_price} como ancla de valor.`,
      client_psychology: `No es un rechazo total. El comprador está midiendo riesgo, confianza y urgencia. Abre con ${primary} y refuerza con ${secondary}.`,
      scripts: {
        strong: `Entiendo el punto de precio, pero para “${context.needSummary}” la decisión correcta no es lo más barato, sino el resultado más fiable. Si alineamos un objetivo claro en ${context.timeline}, mantener ${range.ideal_price} tiene sentido.`,
        warm: `Tiene sentido ser prudente. En lugar de decidir sí o no ahora, validemos un objetivo concreto en ${context.timeline}. Si ese objetivo queda claro, ¿${range.negotiable_price} sería razonable para avanzar?`,
        concession: `Si hoy el presupuesto está ajustado, puedo hacer una concesión condicionada: ${range.negotiable_price} para una primera fase más acotada y manteniendo ${context.timeline}. No recomiendo bajar de ${range.bottom_price} porque cae la calidad.`,
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
    instant_reply: `Totally fair to be careful on budget, especially around ${objection}. For ${context.needSummary}, before we negotiate price let’s validate one concrete outcome; for now, keep ${range.ideal_price} as the value anchor.`,
    client_psychology: `This is not a hard no. The buyer is testing risk, trust, and urgency on this specific project. Lead with ${primary}, then reinforce with ${secondary}.`,
    scripts: {
      strong: `I hear the price concern, but for ${context.needSummary} the right decision is not “cheapest”; it is the most reliable outcome. If we align one clear ${context.timeline} goal, holding at ${range.ideal_price} is the right frame.`,
      warm: `Budget caution makes sense. Instead of deciding yes or no today, let’s pressure-test one measurable target for the ${context.timeline} window. If that target is real, would ${range.negotiable_price} feel reasonable to move forward?`,
      concession: `If budget is tight today, I can offer a conditional concession to ${range.negotiable_price} for a narrower first milestone while keeping the ${context.timeline} timeline. I do not recommend going below ${range.bottom_price} because delivery quality will drop.`,
    },
    decision_logic: [
      `Recommended sequence: ${primary}, ${secondary}, ${third}`,
      `Frame price to the project outcome: ${context.needSummary}.`,
      'Anchor value before discount.',
      'Any concession must trade for scope, timing, or commitment.',
    ],
    next_actions: [
      `Reply today with empathy plus one diagnostic question about ${context.needSummary}.`,
      `Define one measurable outcome for the ${context.timeline} window.`,
      'Close on a calendar-bound next step with two options (full scope vs reduced scope).',
    ],
  };
}

export function generateDealStrategy(input: DealInput): CoachStrategyResult {
  const locale = pickLocale(input.locale);
  const stage = inferStage(input.client_need);
  const objection = inferObjection(input.client_objection);
  const cards = pickCards(stage, objection);
  const range = computePriceRange(input.your_quote, input.your_floor_price);
  const messages = buildMessages(locale, cards, range, {
    needSummary: summarizeNeed(input.client_need),
    timeline: extractTimeline(input.client_need, input.client_objection),
    objection,
  });

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
