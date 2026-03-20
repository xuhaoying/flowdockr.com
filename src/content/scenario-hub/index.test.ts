import { describe, expect, it } from 'vitest';

import {
  scenarioDatasetV1,
  scenarioDatasetV1Top20,
} from '@/content/scenario-pages/scenario-dataset-v1';

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

  it('uses the top20 dataset as the prioritized popular scenario entry point', () => {
    const top20Slugs = new Set(scenarioDatasetV1Top20.map((page) => page.slug));

    expect(scenarioHubData.popularScenarios).toHaveLength(8);

    for (const scenario of scenarioHubData.popularScenarios) {
      expect(top20Slugs.has(scenario.slug)).toBe(true);
    }
  });
});
