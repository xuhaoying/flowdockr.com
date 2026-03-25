import { describe, expect, it } from 'vitest';

import { buildPricingClusterAuditReport } from './pricing-cluster-audit';

describe('pricing cluster audit', () => {
  it('marks priority boundary pages as dedicated generator mappings', () => {
    const report = buildPricingClusterAuditReport();
    const page = report.pages.find(
      (item) => item.slug === 'client-messaging-outside-work-hours'
    );

    expect(page).toMatchObject({
      slug: 'client-messaging-outside-work-hours',
      generatorScenarioSlug: 'client-messaging-outside-work-hours',
      generatorMappingKind: 'dedicated',
      generatorFit: 'strong',
      includedInScenarioDiscovery: true,
      includedInSitemap: true,
      surfacedInHubLibrary: true,
      hasScenarioViewEvent: true,
      hasGeneratorClickAttribution: true,
      hasGenerationSuccessAttribution: true,
      hasHistoryAttribution: true,
      hasCheckoutAttribution: true,
    });
    expect(page?.flags).not.toContain('weak-generator-fit');
  });

  it('surfaces remaining generic boundary mappings as weak-fit audit flags', () => {
    const report = buildPricingClusterAuditReport();
    const page = report.pages.find(
      (item) => item.slug === 'say-no-to-scope-creep-politely'
    );

    expect(page?.generatorMappingKind).toBe('reused');
    expect(page?.flags).toContain('weak-generator-fit');
  });

  it('summarizes dedicated mapping coverage for the cluster', () => {
    const report = buildPricingClusterAuditReport();

    expect(report.summary.totalPages).toBeGreaterThan(20);
    expect(report.summary.dedicatedGeneratorMappings).toBeGreaterThanOrEqual(
      12
    );
    expect(report.summary.scenarioViewInstrumentedPages).toBe(
      report.summary.totalPages
    );
    expect(report.summary.checkoutAttributedPages).toBe(
      report.summary.totalPages
    );
  });
});
