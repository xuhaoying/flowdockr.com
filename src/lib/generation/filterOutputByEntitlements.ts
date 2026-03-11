import type { ParsedGenerationOutput } from '@/lib/generation/parseResponse';
import type { BillingSupportLevel, FeatureEntitlements } from '@/types/billing';
import type {
  FollowUpSuggestion,
  GenerateReplyResponse,
  PresentableStrategyBlock,
  ReplyVersion,
  StrategySection,
} from '@/types/generation';

const DEFAULT_RISK_NOTE =
  'No major negotiation risk detected. Keep the reply calm and avoid adding extra concessions if the client pushes again.';

export type PresentedGenerationOutput = Pick<
  GenerateReplyResponse,
  | 'reply'
  | 'alternativeReply'
  | 'strategy'
  | 'strategyBlock'
  | 'replyVersions'
  | 'riskInsights'
  | 'followUpSuggestion'
  | 'explanation'
  | 'riskAlert'
  | 'confidence'
>;

export function filterOutputByEntitlements(
  output: ParsedGenerationOutput,
  params: {
    supportLevel: BillingSupportLevel;
    entitlements: FeatureEntitlements;
  }
): PresentedGenerationOutput {
  const { supportLevel, entitlements } = params;
  const singleReply = buildSingleReply(output.reply);
  const multiReplies: ReplyVersion[] = output.replyVersions?.length
    ? output.replyVersions
    : [
        {
          key: 'professional',
          label: 'Professional',
          text: output.reply,
        },
      ];

  const strategyBlock = entitlements.strategyExplanationEnabled
    ? buildStrategyBlock(output, supportLevel)
    : undefined;
  const flattenedStrategy = strategyBlock
    ? strategyBlock.sections.flatMap((section) => section.bullets).slice(0, 3)
    : [];

  const riskInsights = entitlements.riskAlertEnabled
    ? buildRiskInsights(output.riskInsights, supportLevel)
    : [];
  const followUpSuggestion = entitlements.followUpEnabled
    ? buildFollowUp(output.followUpSuggestion)
    : undefined;

  return {
    reply: output.reply,
    alternativeReply: entitlements.multiVersionEnabled
      ? output.alternativeReply
      : '',
    strategy: flattenedStrategy,
    strategyBlock,
    replyVersions: entitlements.multiVersionEnabled
      ? multiReplies
      : [singleReply],
    riskInsights,
    followUpSuggestion,
    explanation: strategyBlock?.sections[0]?.bullets[0],
    riskAlert: riskInsights[0],
    confidence: entitlements.riskAlertEnabled ? output.confidence : undefined,
  };
}

function buildSingleReply(reply: string): ReplyVersion {
  return {
    key: 'suggested',
    label: 'Suggested reply',
    text: reply,
  };
}

function buildStrategyBlock(
  output: ParsedGenerationOutput,
  supportLevel: BillingSupportLevel
): PresentableStrategyBlock {
  if (supportLevel === 'quick_help') {
    return {
      title: 'Quick strategy read',
      sections: [
        {
          title: 'Why this works',
          bullets: [
            output.strategyBlock.objective,
            ...(output.strategyBlock.whyItWorks || []),
          ]
            .filter(Boolean)
            .slice(0, 2),
        },
      ],
    };
  }

  const sections: StrategySection[] = [
    {
      title: 'What this response is trying to do',
      bullets: [output.strategyBlock.objective].filter(Boolean),
    },
    {
      title: 'Why this approach works',
      bullets: output.strategyBlock.whyItWorks.slice(
        0,
        supportLevel === 'studio' ? 3 : 2
      ),
    },
    {
      title: 'What to avoid',
      bullets: output.strategyBlock.whatToAvoid.slice(0, 2),
    },
  ];

  if (supportLevel === 'studio' && output.strategyBlock.negotiationFraming) {
    sections.push({
      title: 'Negotiation framing',
      bullets: [output.strategyBlock.negotiationFraming],
    });
  }

  return {
    title: supportLevel === 'studio' ? 'Negotiation support layer' : 'Strategy',
    sections,
  };
}

function buildRiskInsights(
  riskInsights: string[],
  supportLevel: BillingSupportLevel
): string[] {
  const normalized = riskInsights.filter(Boolean);
  if (normalized.length === 0) {
    return [DEFAULT_RISK_NOTE];
  }

  return normalized.slice(0, supportLevel === 'studio' ? 2 : 1);
}

function buildFollowUp(
  followUpSuggestion: FollowUpSuggestion | undefined
): FollowUpSuggestion {
  if (followUpSuggestion?.reply) {
    return followUpSuggestion;
  }

  return {
    reply:
      'If the client pushes again, move the conversation toward scope, terms, or a narrower option instead of repeating the same justification.',
    direction:
      'Hold the line without escalating. Offer a structured next step instead of reopening the same pricing debate.',
  };
}
