import { describe, expect, it } from 'vitest';

import { scenarioDatasetV1 } from '@/content/scenario-pages/scenario-dataset-v1';

import {
  buildScenarioPerformanceRows,
  deriveRate,
  normalizeScenarioSlugFromSearchConsoleRow,
} from './scenarioPerformance';

describe('scenario performance mapping', () => {
  it('derives scenario funnel rates and keeps top20 priority flags', () => {
    const report = buildScenarioPerformanceRows({
      analyticsCounts: [
        {
          scenarioSlug: 'quote-too-high',
          fd_scenario_view: 200,
          fd_tool_start: 50,
          fd_generation_success: 40,
          total: 290,
        },
        {
          scenarioSlug: 'cheaper-freelancer',
          fd_scenario_view: 80,
          fd_tool_start: 4,
          fd_generation_success: 3,
          total: 87,
        },
      ],
      searchConsoleRows: [
        {
          url: 'https://www.flowdockr.com/scenario/quote-too-high',
          impressions: 250,
          clicks: 3,
          ctr: '1.2%',
          position: 7.5,
          indexed: 'indexed',
        },
      ],
    });

    const quoteTooHigh = report.rows.find(
      (row) => row.scenarioSlug === 'quote-too-high'
    );
    const cheaperFreelancer = report.rows.find(
      (row) => row.scenarioSlug === 'cheaper-freelancer'
    );

    expect(quoteTooHigh).toMatchObject({
      isPriority: true,
      views: 200,
      toolStartCount: 50,
      generationSuccessCount: 40,
      indexed: true,
      impressions: 250,
      clicks: 3,
      needsTitleMetaRewrite: true,
      needsConversionReview: false,
    });
    expect(quoteTooHigh?.scenarioToToolStartRate).toBeCloseTo(0.25);
    expect(quoteTooHigh?.toolStartToGenerationSuccessRate).toBeCloseTo(0.8);
    expect(quoteTooHigh?.ctr).toBeCloseTo(0.012);

    expect(cheaperFreelancer).toMatchObject({
      isPriority: false,
      views: 80,
      toolStartCount: 4,
      generationSuccessCount: 3,
      needsConversionReview: true,
    });
    expect(cheaperFreelancer?.scenarioToToolStartRate).toBeCloseTo(0.05);
    expect(report.priorityRows.every((row) => row.isPriority)).toBe(true);
  });

  it('normalizes canonical scenario slugs from localized scenario paths', () => {
    expect(
      normalizeScenarioSlugFromSearchConsoleRow({
        page: '/scenario/quote-too-high',
      })
    ).toBe('quote-too-high');

    expect(
      normalizeScenarioSlugFromSearchConsoleRow({
        url: 'https://www.flowdockr.com/zh/scenario/quote-too-high',
      })
    ).toBe('quote-too-high');

    expect(
      normalizeScenarioSlugFromSearchConsoleRow({
        page: '/pricing/price-pushback-after-proposal',
      })
    ).toBe('');
  });

  it('derives null rate when denominator is zero', () => {
    expect(deriveRate(1, 0)).toBeNull();
    expect(deriveRate(0, 10)).toBe(0);
  });

  it('keeps dataset coverage aligned with the top20 priority flag', () => {
    expect(scenarioDatasetV1.filter((scenario) => scenario.isPriority)).toHaveLength(
      20
    );
  });
});
