import { describe, expect, it } from 'vitest';

import {
  getScenarioDistributionPriority,
  getScenarioPageBySlug,
} from '@/content/scenario-pages';
import { scenarioDatasetV1 } from '@/content/scenario-pages/scenario-dataset-v1';

import { scenarioHubData } from './index';

describe('scenario hub launch surface', () => {
  it('exposes all dataset v1 scenarios through the hub clusters', () => {
    const hubScenarioSlugs = new Set(
      scenarioHubData.clusters.flatMap((cluster) =>
        cluster.scenarios.map((scenario) => scenario.slug)
      )
    );

    for (const scenario of scenarioDatasetV1) {
      expect(hubScenarioSlugs.has(scenario.slug)).toBe(true);
    }
  });

  it('uses primary attack pages as the prioritized popular scenario entry point', () => {
    expect(scenarioHubData.popularScenarios).toHaveLength(8);

    for (const scenario of scenarioHubData.popularScenarios) {
      const page = getScenarioPageBySlug(scenario.slug);

      expect(page).toBeTruthy();
      expect(getScenarioDistributionPriority(page!)).toBe('primary');
      expect(page?.clusterCore).toBe(true);
    }
  });
});
