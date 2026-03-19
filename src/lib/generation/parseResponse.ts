import {
  generationModelSchema,
  type GenerationModelOutput,
} from '@/lib/generation/modelSchema';
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

export type GenerationSchemaValidationResult =
  | {
      success: true;
      data: ParsedGenerationOutput;
    }
  | {
      success: false;
      issues: string[];
      summary: string;
    };

const NEUTRAL_RISK_NOTE =
  'Main risk is low. Keep the reply concise and avoid offering concessions too early if the client pushes again.';

export function validateGenerationResult(
  raw: string
): GenerationSchemaValidationResult {
  const normalized = normalizeRaw(raw);

  let parsedJson: unknown;
  try {
    parsedJson = JSON.parse(normalized);
  } catch {
    return {
      success: false,
      issues: ['Model output was not valid JSON.'],
      summary:
        'Return strict JSON only with the required keys and no markdown.',
    };
  }

  const validated = generationModelSchema.safeParse(parsedJson);
  if (!validated.success) {
    const issues = validated.error.issues.map((issue) => {
      const path = issue.path.length ? issue.path.join('.') : 'root';
      return `${path}: ${issue.message}`;
    });

    return {
      success: false,
      issues,
      summary: issues.join(' | '),
    };
  }

  const strategyBlock = normalizeStrategyBlock(validated.data.strategy);
  const replyVersions = buildReplyVersions(validated.data.replies);
  const riskInsights = validated.data.risk_insights.slice(0, 2);
  const followUpSuggestion = normalizeFollowUp(validated.data.follow_up);

  return {
    success: true,
    data: {
      reply: validated.data.replies.professional,
      alternativeReply: validated.data.replies.firm,
      strategy: flattenStrategy(strategyBlock),
      strategyBlock,
      replyVersions,
      riskInsights:
        riskInsights.length > 0 ? riskInsights : [NEUTRAL_RISK_NOTE],
      followUpSuggestion,
      confidence: 'medium',
      caution: riskInsights[0] || NEUTRAL_RISK_NOTE,
    },
  };
}

export function parseGenerationResult(raw: string): ParsedGenerationOutput {
  const validated = validateGenerationResult(raw);
  if (!validated.success) {
    throw new Error('FAILED_TO_PARSE_GENERATION');
  }

  return validated.data;
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

function normalizeStrategyBlock(
  value: GenerationModelOutput['strategy']
): StrategyBlock {
  return {
    objective: cleanText(value.objective),
    whyItWorks: value.why_it_works
      .map((item) => cleanText(item))
      .filter(Boolean),
    whatToAvoid: value.what_to_avoid
      .map((item) => cleanText(item))
      .filter(Boolean),
    negotiationFraming: cleanText(value.negotiation_framing || '') || undefined,
  };
}

function normalizeFollowUp(
  value: GenerationModelOutput['follow_up']
): FollowUpSuggestion {
  return {
    reply: cleanText(value.reply),
    direction:
      cleanText(value.direction) ||
      'Hold the line calmly and move the conversation toward scope, terms, or a clearer decision.',
  };
}

function cleanText(value: string): string {
  return value.trim().replace(/^["'\s]+|["'\s]+$/g, '');
}

function normalizeRaw(raw: string): string {
  return raw
    .trim()
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/\s*```$/, '')
    .trim();
}
