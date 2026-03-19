import { getStrategyCard } from '@/lib/generation/strategyCards';
import type { Scenario } from '@/types/scenario';

import { formatCalibrationExamples } from './calibrationExamples';
import { outputFormatInstructions } from './outputSchema';

export type BuiltScenarioPrompt = {
  prompt: string;
  meta: {
    strategyCardSource: 'top10' | 'compat';
    calibrationExampleCount: number;
    usedServiceAdjustment: boolean;
  };
};

export function buildScenarioPrompt(params: {
  scenario: Scenario;
  message: string;
  repairNotes?: string[];
  userRateContext?: string;
  serviceType?: string;
  userGoal?: string;
}): BuiltScenarioPrompt {
  const {
    scenario,
    message,
    repairNotes = [],
    userRateContext,
    serviceType,
    userGoal,
  } = params;
  const { card, source } = getStrategyCard(scenario);
  const calibrationExamples = formatCalibrationExamples(scenario.slug);
  const serviceAdjustment =
    serviceType && card.serviceAdjustments
      ? card.serviceAdjustments[
          serviceType as keyof typeof card.serviceAdjustments
        ]
      : undefined;
  const sections = [
    `Scenario title:\n${scenario.title}`,
    `Scenario context:\n${scenario.promptContext}`,
    `Strategy card:\n- Primary goal: ${card.primaryGoal}\n- Pressure type: ${card.pressureType}\n- User positioning: ${card.userPositioning}\n- Counterpart mindset: ${card.counterpartMindset}\n- Required reframe: ${card.requiredReframe}\n- Allowed concessions: ${card.allowedConcessions.join('; ')}\n- Forbidden concessions: ${card.forbiddenConcessions.join('; ')}\n- Red flags: ${card.redFlags.join('; ')}\n- Preferred moves: ${card.preferredMoves.join('; ')}\n- Avoid moves: ${card.avoidMoves.join('; ')}\n- Tone profile: ${card.toneProfile}\n- Next-step templates: ${card.nextStepTemplates.join(' | ')}`,
  ];

  if (serviceType) {
    sections.push(`Service type:\n${serviceType}`);
  }

  if (serviceAdjustment) {
    sections.push(
      `Service adjustment:\n- Scope lever: ${serviceAdjustment.scopeLever}\n- Caution: ${serviceAdjustment.caution}`
    );
  }

  if (userGoal) {
    sections.push(`User goal:\n${userGoal}`);
  }

  if (userRateContext) {
    sections.push(`Rate context:\n${userRateContext}`);
  }

  sections.push(`User's client message:\n"""\n${message}\n"""`);
  sections.push(
    [
      'Task:',
      'Write three sendable reply variants plus the strategy block.',
      '',
      'Important requirements:',
      '- Match the exact pressure in the client message.',
      '- Protect value, scope, payment, or boundaries where appropriate.',
      '- Keep the relationship constructive without sounding weak.',
      '- Keep the replies concise, natural, and directly sendable.',
      '- Do not invent project facts or offer unstructured concessions.',
      '- Prefer a concrete next step over vague politeness.',
    ].join('\n')
  );

  if (repairNotes.length > 0) {
    sections.push(
      `Repair requirements:\n${repairNotes.map((item) => `- ${item}`).join('\n')}`
    );
  }

  if (calibrationExamples.text) {
    sections.push(calibrationExamples.text);
  }

  sections.push(outputFormatInstructions);

  return {
    prompt: sections.join('\n\n').trim(),
    meta: {
      strategyCardSource: source,
      calibrationExampleCount: calibrationExamples.count,
      usedServiceAdjustment: Boolean(serviceAdjustment),
    },
  };
}
