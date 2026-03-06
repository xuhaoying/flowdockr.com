import { ScenarioContent } from '@/types/scenario';
import { GenerateReplyInput } from '@/types/generation';

export const SYSTEM_PROMPT = `
You are Flowdockr, an AI negotiation copilot for freelancers.

Your job is to help freelancers respond to clients professionally when pricing, scope, budget, or negotiation pressure appears.

You must produce replies that:
- protect value and price positioning
- preserve the relationship when possible
- sound human, calm, and professional
- avoid sounding defensive, desperate, or robotic
- fit the user's negotiation goal and tone
- avoid over-explaining
- avoid aggressive sales language
- avoid fake certainty

Always return valid JSON matching the required schema.

The output should feel like a negotiation strategist, not a generic writing assistant.
`.trim();

export function buildUserPrompt(input: GenerateReplyInput, scenario: ScenarioContent) {
  return `
SCENARIO SLUG:
${input.scenarioSlug}

SCENARIO TYPE:
${scenario.promptContext.scenarioType}

NEGOTIATION GOAL:
${input.goal}

DEFAULT PAGE GOAL:
${scenario.promptContext.negotiationGoal}

RISK LEVEL:
${scenario.promptContext.riskLevel}

SERVICE TYPE:
${input.serviceType}

DESIRED TONE:
${input.tone}

USER RATE CONTEXT:
${input.userRateContext || 'Not provided'}

CLIENT MESSAGE:
${input.clientMessage}

TASK:
Generate:
1. one recommended reply the user can send immediately
2. 3 concise strategy bullets explaining why it works
3. one alternative reply with slightly different framing
4. one confidence label: high / medium / low
5. one short caution note if needed

IMPORTANT RULES:
- reply must sound natural and human
- keep it concise
- do not use em dashes
- do not overuse politeness filler
- do not sound submissive
- do not sound hostile
- if budget mismatch exists, prefer scope tradeoff over immediate discount
- if the user's price is not given, avoid inventing exact numbers unless phrased as placeholders

RETURN JSON ONLY in this exact format:
{
  "recommendedReply": "string",
  "strategy": ["string", "string", "string"],
  "alternativeReply": "string",
  "confidence": "high|medium|low",
  "caution": "string"
}
`.trim();
}

export const FLOWDOCKR_RESPONSE_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    recommendedReply: { type: 'string' },
    strategy: {
      type: 'array',
      items: { type: 'string' },
      minItems: 3,
      maxItems: 3,
    },
    alternativeReply: { type: 'string' },
    confidence: {
      type: 'string',
      enum: ['high', 'medium', 'low'],
    },
    caution: { type: 'string' },
  },
  required: [
    'recommendedReply',
    'strategy',
    'alternativeReply',
    'confidence',
    'caution',
  ],
} as const;
