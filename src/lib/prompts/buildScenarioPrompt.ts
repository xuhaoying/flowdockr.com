import type { Scenario } from '@/types/scenario';

import { getCalibrationExample } from './calibrationExamples';
import { outputFormatInstructions } from './outputSchema';

export function buildScenarioPrompt(params: {
  scenario: Scenario;
  message: string;
  qualityHints?: string[];
  userRateContext?: string;
  serviceType?: string;
  userGoal?: string;
}) {
  const {
    scenario,
    message,
    qualityHints = [],
    userRateContext,
    serviceType,
    userGoal,
  } = params;
  const calibrationExample = getCalibrationExample(scenario.slug);

  return `
Scenario title:
${scenario.title}

Scenario context:
${scenario.promptContext}

Primary goal:
${scenario.primaryGoal}

Avoid these mistakes:
${scenario.avoid.map((item) => `- ${item}`).join('\n')}

Preferred strategic moves:
${scenario.preferredMoves.map((item) => `- ${item}`).join('\n')}

Tone profile:
${scenario.toneProfile}

${serviceType ? `Service type:\n${serviceType}\n` : ''}${userGoal ? `User goal:\n${userGoal}\n` : ''}${
    userRateContext ? `Rate context:\n${userRateContext}\n` : ''
  }User's client message:
"""
${message}
"""

Task:
Write a response the user could realistically send to this client.

Important requirements:
- Match the actual pressure in the message
- Protect value, scope, or boundaries where appropriate
- Keep the relationship constructive where possible
- Keep the reply concise and natural
- Do not over-explain
- Do not produce generic AI-business filler
- Prefer a strategic next step over vague politeness
- Do not invent project details not present in the message

${qualityHints.length > 0 ? `Revision requirements:\n${qualityHints.map((item) => `- ${item}`).join('\n')}\n` : ''}${
    calibrationExample ? `${calibrationExample}\n\n` : ''
  }${outputFormatInstructions}
`.trim();
}
