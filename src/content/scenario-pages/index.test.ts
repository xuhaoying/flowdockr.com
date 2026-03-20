import { describe, expect, it } from 'vitest';
import { getScenarioBySlug as getGeneratorScenarioBySlug } from '@/lib/scenarios';

import { scenarioDatasetV1 } from './scenario-dataset-v1';
import {
  getRelatedScenarioLinks,
  getScenarioMetaDescription,
  getScenarioPageBySlug,
} from './index';

describe('scenario dataset v1 integration', () => {
  it('wires all 50 dataset scenarios into the page catalog and generator catalog', () => {
    expect(scenarioDatasetV1).toHaveLength(50);

    for (const scenario of scenarioDatasetV1) {
      expect(getScenarioPageBySlug(scenario.slug)?.slug).toBe(scenario.slug);
      expect(getGeneratorScenarioBySlug(scenario.slug)?.slug).toBe(scenario.slug);
    }
  });

  it('keeps metadata, related links, and generator content driven by dataset fields', () => {
    for (const scenario of scenarioDatasetV1) {
      const page = getScenarioPageBySlug(scenario.slug);
      const generatorScenario = getGeneratorScenarioBySlug(scenario.slug);

      expect(page?.metaDescription).toBe(scenario.metaDescription);
      expect(getScenarioMetaDescription(page!)).toBe(scenario.metaDescription);
      expect(
        getRelatedScenarioLinks(scenario.slug)
          .slice(0, scenario.relatedScenarioSlugs?.length || 0)
          .map((item) => item.slug)
      ).toEqual(scenario.relatedScenarioSlugs);
      expect(generatorScenario?.seoTitle).toBe(
        scenario.metaTitle || `${scenario.title} | Flowdockr`
      );
      expect(generatorScenario?.primaryGoal).toBe(
        page?.userGoal || page?.strategyPrimary
      );
      expect(generatorScenario?.relatedSlugs).toEqual(
        page?.relatedScenarioSlugs
      );
    }
  });
});
