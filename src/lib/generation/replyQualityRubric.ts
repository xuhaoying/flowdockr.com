import type { Scenario } from '@/types/scenario';

type RubricCriterion =
  | 'pressure_recognition'
  | 'position_protection'
  | 'relationship_quality'
  | 'sendability'
  | 'non_genericness'
  | 'strategic_movement';

type CriteriaResult = Record<RubricCriterion, boolean>;

export const replyQualityRubric: Array<{
  key: RubricCriterion;
  description: string;
}> = [
  {
    key: 'pressure_recognition',
    description:
      "The reply should clearly address the actual negotiation pressure in the client's message.",
  },
  {
    key: 'position_protection',
    description:
      'The reply should protect pricing, scope, or boundaries where appropriate.',
  },
  {
    key: 'relationship_quality',
    description:
      'The reply should remain constructive and professional rather than reactive or hostile.',
  },
  {
    key: 'sendability',
    description:
      'The reply should be concise and realistic enough to send with minimal editing.',
  },
  {
    key: 'non_genericness',
    description:
      'The reply should avoid generic AI-business filler and vague corporate phrasing.',
  },
  {
    key: 'strategic_movement',
    description:
      'The reply should move the conversation forward through a clear option, structure, or next step.',
  },
];

export type ReplyQualityReport = {
  passed: boolean;
  score: number;
  failedCriteria: RubricCriterion[];
  failures: Array<{
    criterion: RubricCriterion;
    reason: string;
    repairHint: string;
  }>;
  repairHints: string[];
  criteria: CriteriaResult;
};

const PRESSURE_KEYWORDS_BY_SLUG: Record<string, string[]> = {
  'quote-too-high': ['quote', 'high', 'rate', 'price'],
  'higher-than-expected': ['higher', 'expected', 'quote', 'price'],
  'justify-your-price': ['cost', 'price', 'why', 'justify'],
  'budget-limited': ['budget', 'limited', 'tight'],
  'do-it-for-less': ['less', 'lower', 'price', 'rate'],
  'discount-request': ['discount', 'lower', 'rate'],
  'cheaper-freelancer': ['cheaper', 'compare', 'quote'],
  'match-lower-rate': ['match', 'rate', 'price'],
  'laughs-at-rate': ['ridiculous', 'rate', 'hour'],
  'rate-before-project-details': ['rate', 'scope', 'project'],
  'hourly-rate-request': ['hourly', 'rate'],
  'day-rate-request': ['day', 'rate'],
  'price-range-request': ['range', 'price'],
  'immediate-quote-request': ['price', 'quote', 'right now'],
  'rates-negotiable': ['negotiable', 'rates'],
  'reduce-scope-to-lower-cost': ['scope', 'reduce', 'cost'],
  'extra-work-outside-scope': ['extra', 'scope', 'add'],
  'unlimited-revisions': ['unlimited', 'revisions', 'changes'],
  'project-should-be-easy': ['easy', 'hours', 'simple'],
  'start-before-payment': ['start', 'payment', 'later'],
  'start-immediately': ['start', 'today', 'immediately'],
  'exclusive-low-rate': ['exclusive', 'rate'],
  'ghosted-after-rate': ['follow up', 'rate', 'review', 'back to you'],
  'guarantee-results': ['guarantee', 'results', 'outcome'],
  'lowball-offer': ['low', 'offer', 'quote', 'price'],
  'client-asks-discount': ['discount', 'lower', 'rate'],
  'free-sample-work': ['sample', 'free', 'unpaid'],
  'more-work-same-budget': ['more work', 'same budget', 'extra', 'scope'],
  'delayed-decision': ['follow up', 'review', 'decision', 'timing'],
  'small-extra-free': ['small', 'extra', 'free', 'outside scope'],
  'client-delays-payment': ['invoice', 'payment', 'overdue', 'due'],
  'invoice-follow-up': ['invoice', 'overdue', 'payment', 'date'],
  'price-objection': ['expensive', 'price', 'budget', 'cost'],
  'extra-revisions': ['revision', 'round', 'changes', 'feedback'],
  'scope-creep': ['scope', 'add', 'expand', 'additional'],
  'additional-features': ['feature', 'functionality', 'include', 'launch'],
  'rush-delivery': ['rush', 'deliver', 'urgent', 'friday'],
  'timeline-pressure': ['faster', 'speed', 'timeline', 'accelerate'],
};

const GENERIC_FILLER_PATTERNS = [
  /thank you for your message and for/i,
  /i hope this message finds you well/i,
  /i truly appreciate your time and consideration/i,
  /unlock|supercharge|enterprise[- ]grade/i,
];

const HOSTILE_PATTERNS = [
  /take it or leave it/i,
  /ridiculous|absurd|unreasonable/i,
  /not my problem/i,
  /waste of time/i,
  /non[- ]?negotiable/i,
];

const HARD_DISCOUNT_PATTERN =
  /match (that|the|their) (price|quote)|can do \d+% off|lower (my|the) (rate|price)|do it for \$\d+/i;
const TRADEOFF_PATTERN =
  /scope|deliverable|terms|phase|option|reduced|leaner|timeline|add[- ]?on|priorit/i;

const STRATEGIC_SIGNAL_PATTERN =
  /value|scope|boundary|option|terms|phase|clarify|tradeoff|position|priorit/i;
const NEXT_STEP_PATTERN =
  /if you'd like|if helpful|i can|let me know|we can|next step|outline|propose|send/i;

const HINTS_BY_CRITERION: Record<RubricCriterion, string> = {
  pressure_recognition:
    'Directly address the exact pressure in the client message instead of using a generic business reply.',
  position_protection:
    'Protect pricing/scope boundaries more clearly and avoid unstructured concessions.',
  relationship_quality:
    'Keep the tone constructive and calm without sounding reactive, cold, or hostile.',
  sendability:
    'Make both replies concise and directly sendable. Avoid essay length and keep structure clean.',
  non_genericness:
    'Remove generic AI-business filler and keep wording concrete and situation-specific.',
  strategic_movement:
    'Add a clearer next step or structured option so the conversation can move forward.',
};

const FAILURE_REASONS_BY_CRITERION: Record<RubricCriterion, string> = {
  pressure_recognition:
    'The reply does not clearly name or engage the actual pressure in the client message.',
  position_protection:
    'The reply weakens pricing, scope, or payment boundaries instead of protecting them.',
  relationship_quality:
    'The tone risks sounding reactive, hostile, or commercially awkward.',
  sendability:
    'The output is not concise and send-ready enough in its current form.',
  non_genericness:
    'The wording sounds generic, filler-heavy, or AI-written rather than situation-specific.',
  strategic_movement:
    'The reply does not create a clear next step, option, or decision path.',
};

export function evaluateReplyQuality(params: {
  scenario: Scenario;
  reply: string;
  alternativeReply: string;
  strategy: string[];
}): ReplyQualityReport {
  const reply = params.reply.trim();
  const alternativeReply = params.alternativeReply.trim();
  const strategy = params.strategy.map((item) => item.trim()).filter(Boolean);

  const combined =
    `${reply}\n${alternativeReply}\n${strategy.join('\n')}`.toLowerCase();

  const pressureKeywords =
    PRESSURE_KEYWORDS_BY_SLUG[params.scenario.slug] || [];
  const pressureFromSlug = pressureKeywords.some((keyword) =>
    combined.includes(keyword.toLowerCase())
  );
  const pressureFromMoves = params.scenario.preferredMoves
    .flatMap((move) => extractKeywords(move))
    .some((keyword) => combined.includes(keyword));
  const pressureRecognition = pressureFromSlug || pressureFromMoves;

  const positionSignal = STRATEGIC_SIGNAL_PATTERN.test(combined);
  const riskyConcession =
    HARD_DISCOUNT_PATTERN.test(combined) && !TRADEOFF_PATTERN.test(combined);
  const positionProtection = positionSignal && !riskyConcession;

  const relationshipQuality = !HOSTILE_PATTERNS.some((pattern) =>
    pattern.test(combined)
  );

  const replyWords = wordCount(reply);
  const altWords = wordCount(alternativeReply);
  const strategyWordBudgetOk = strategy.every((item) => wordCount(item) <= 20);
  const distinctReplies =
    reply.toLowerCase().replace(/\s+/g, ' ') !==
    alternativeReply.toLowerCase().replace(/\s+/g, ' ');
  const sendability =
    replyWords >= 30 &&
    replyWords <= 180 &&
    altWords >= 25 &&
    altWords <= 180 &&
    strategy.length === 3 &&
    distinctReplies &&
    strategyWordBudgetOk;

  const nonGenericness = !GENERIC_FILLER_PATTERNS.some((pattern) =>
    pattern.test(combined)
  );

  const strategicMovement =
    NEXT_STEP_PATTERN.test(combined) &&
    strategy.some((item) => STRATEGIC_SIGNAL_PATTERN.test(item.toLowerCase()));

  const criteria: CriteriaResult = {
    pressure_recognition: pressureRecognition,
    position_protection: positionProtection,
    relationship_quality: relationshipQuality,
    sendability,
    non_genericness: nonGenericness,
    strategic_movement: strategicMovement,
  };

  const failedCriteria = (
    Object.entries(criteria) as Array<[RubricCriterion, boolean]>
  )
    .filter(([, passed]) => !passed)
    .map(([criterion]) => criterion);

  const score = 6 - failedCriteria.length;

  const failures = failedCriteria.map((criterion) => ({
    criterion,
    reason: FAILURE_REASONS_BY_CRITERION[criterion],
    repairHint: HINTS_BY_CRITERION[criterion],
  }));

  return {
    passed: failedCriteria.length <= 1,
    score,
    failedCriteria,
    failures,
    repairHints: failures.map((failure) => failure.repairHint),
    criteria,
  };
}

function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function extractKeywords(text: string): string[] {
  const stopWords = new Set([
    'the',
    'and',
    'for',
    'with',
    'from',
    'that',
    'this',
    'without',
    'into',
    'your',
    'while',
    'more',
    'only',
    'over',
    'than',
  ]);

  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/\s+/)
    .map((item) => item.trim())
    .filter((item) => item.length >= 4 && !stopWords.has(item));
}
