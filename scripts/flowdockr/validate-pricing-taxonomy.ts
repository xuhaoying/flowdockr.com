import { pricingFamilies, pricingScenarios } from '../../src/lib/pricing-cluster';

type Issue = {
  level: 'error' | 'warn';
  message: string;
};

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

function unique<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}

function validatePricingTaxonomy(): Issue[] {
  const issues: Issue[] = [];
  const scenarioBySlug = new Map(pricingScenarios.map((scenario) => [scenario.slug, scenario]));

  for (const scenario of pricingScenarios) {
    const { schema } = scenario;

    if (schema.cluster !== 'pricing') {
      issues.push({
        level: 'error',
        message: `${scenario.slug}: schema.cluster must be 'pricing'.`,
      });
    }

    if (scenario.tier !== schema.tier) {
      issues.push({
        level: 'error',
        message: `${scenario.slug}: tier mismatch (content=${scenario.tier}, schema=${schema.tier}).`,
      });
    }

    if (!schema.primaryKeywords.length) {
      issues.push({
        level: 'error',
        message: `${scenario.slug}: schema.primaryKeywords cannot be empty.`,
      });
    }

    if (!schema.supportKeywords.length) {
      issues.push({
        level: 'warn',
        message: `${scenario.slug}: schema.supportKeywords is empty.`,
      });
    }

    if (!schema.decisionGoals.length) {
      issues.push({
        level: 'error',
        message: `${scenario.slug}: schema.decisionGoals cannot be empty.`,
      });
    }

    if (!schema.realRisks.length) {
      issues.push({
        level: 'error',
        message: `${scenario.slug}: schema.realRisks cannot be empty.`,
      });
    }

    if (schema.strategyPathIds.length < 2) {
      issues.push({
        level: 'warn',
        message: `${scenario.slug}: schema.strategyPathIds should have at least 2 paths.`,
      });
    }

    if (schema.tier === 'tier1' && schema.pageRole !== 'pillar') {
      issues.push({
        level: 'error',
        message: `${scenario.slug}: tier1 must use pageRole='pillar'.`,
      });
    }

    if (schema.tier === 'tier3' && schema.pageRole !== 'entry') {
      issues.push({
        level: 'error',
        message: `${scenario.slug}: tier3 must use pageRole='entry'.`,
      });
    }

    if (schema.pageRole === 'entry' && schema.tier !== 'tier3') {
      issues.push({
        level: 'error',
        message: `${scenario.slug}: pageRole='entry' must be tier3.`,
      });
    }

    if (!schema.primaryKeywords.map(normalize).includes(normalize(scenario.primaryKeyword))) {
      issues.push({
        level: 'warn',
        message: `${scenario.slug}: scenario.primaryKeyword is not included in schema.primaryKeywords.`,
      });
    }

    const schemaKeywords = [...schema.primaryKeywords, ...schema.supportKeywords].map(normalize);
    const variantMissing = scenario.keywordVariants.filter(
      (variant) => !schemaKeywords.includes(normalize(variant))
    );

    if (variantMissing.length > 0) {
      issues.push({
        level: 'warn',
        message: `${scenario.slug}: ${variantMissing.length} keywordVariants are not mirrored in schema.supportKeywords.`,
      });
    }

    const overlap = schema.primaryKeywords
      .map(normalize)
      .filter((keyword) => schema.supportKeywords.map(normalize).includes(keyword));

    if (overlap.length > 0) {
      issues.push({
        level: 'error',
        message: `${scenario.slug}: duplicated keywords across primary/support: ${unique(overlap).join(', ')}.`,
      });
    }

    for (const slug of scenario.nextDecisionSlugs) {
      if (slug === scenario.slug) {
        issues.push({
          level: 'error',
          message: `${scenario.slug}: nextDecisionSlugs cannot include itself.`,
        });
      } else if (!scenarioBySlug.has(slug)) {
        issues.push({
          level: 'error',
          message: `${scenario.slug}: nextDecisionSlugs contains unknown slug '${slug}'.`,
        });
      }
    }

    for (const slug of schema.doNotCompeteWith) {
      if (slug === scenario.slug) {
        issues.push({
          level: 'error',
          message: `${scenario.slug}: doNotCompeteWith cannot include itself.`,
        });
      } else if (!scenarioBySlug.has(slug)) {
        issues.push({
          level: 'error',
          message: `${scenario.slug}: doNotCompeteWith contains unknown slug '${slug}'.`,
        });
      }
    }
  }

  const primaryKeywordOwner = new Map<string, string>();

  for (const scenario of pricingScenarios) {
    for (const keyword of scenario.schema.primaryKeywords.map(normalize)) {
      const owner = primaryKeywordOwner.get(keyword);
      if (owner && owner !== scenario.slug) {
        issues.push({
          level: 'error',
          message: `Primary keyword collision: '${keyword}' is owned by both ${owner} and ${scenario.slug}.`,
        });
      } else {
        primaryKeywordOwner.set(keyword, scenario.slug);
      }
    }
  }

  for (const family of pricingFamilies) {
    const count = pricingScenarios.filter((scenario) => scenario.schema.family === family.id).length;
    if (count === 0) {
      issues.push({
        level: 'error',
        message: `Family '${family.id}' has no scenarios.`,
      });
    }
  }

  const tier1Count = pricingScenarios.filter((scenario) => scenario.schema.tier === 'tier1').length;
  const tier3Count = pricingScenarios.filter((scenario) => scenario.schema.tier === 'tier3').length;

  if (tier1Count < 4) {
    issues.push({
      level: 'warn',
      message: `Tier1 scenarios are below target: ${tier1Count} (expected >= 4).`,
    });
  }

  if (tier3Count < 1) {
    issues.push({
      level: 'warn',
      message: 'Tier3 entry scenarios are missing (expected >= 1).',
    });
  }

  return issues;
}

function main() {
  const issues = validatePricingTaxonomy();
  const errors = issues.filter((issue) => issue.level === 'error');
  const warns = issues.filter((issue) => issue.level === 'warn');

  if (issues.length === 0) {
    console.log('Pricing taxonomy validation passed with 0 issues.');
    process.exit(0);
  }

  for (const issue of issues) {
    const prefix = issue.level === 'error' ? '[ERROR]' : '[WARN]';
    console.log(`${prefix} ${issue.message}`);
  }

  console.log(`\nSummary: ${errors.length} error(s), ${warns.length} warning(s).`);

  if (errors.length > 0) {
    process.exit(1);
  }
}

main();
