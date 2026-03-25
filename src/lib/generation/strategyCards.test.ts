import { getScenarioBySlug } from '@/lib/scenarios';
import { describe, expect, it } from 'vitest';

import { getStrategyCard } from './strategyCards';

describe('curated pricing-cluster strategy cards', () => {
  it('uses a curated availability-boundary card for outside-hours pressure', () => {
    const scenario = getScenarioBySlug('client-messaging-outside-work-hours');

    expect(scenario).not.toBeNull();

    const result = getStrategyCard(scenario!);

    expect(result.source).toBe('top10');
    expect(result.card.pressureType).toBe('availability_boundary');
    expect(result.card.nextStepTemplates[0]).toContain('next working window');
  });

  it('uses a curated project-decline card for workload-based refusal', () => {
    const scenario = getScenarioBySlug('refuse-project-due-to-workload');

    expect(scenario).not.toBeNull();

    const result = getStrategyCard(scenario!);

    expect(result.source).toBe('top10');
    expect(result.card.pressureType).toBe('project_decline');
    expect(result.card.requiredReframe).toContain('delivery-quality');
  });

  it('uses a curated pricing-hold card for standing firm on pricing', () => {
    const scenario = getScenarioBySlug('stand-firm-on-pricing');

    expect(scenario).not.toBeNull();

    const result = getStrategyCard(scenario!);

    expect(result.source).toBe('top10');
    expect(result.card.pressureType).toBe('pricing_pushback');
    expect(result.card.serviceAdjustments).toBeDefined();
  });
});
