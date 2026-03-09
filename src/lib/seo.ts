import { envConfigs } from '@/config';
import { Scenario } from '@/lib/scenarios';

const baseUrl = envConfigs.app_url.replace(/\/$/, '');

export function getScenarioCanonicalUrl(slug: string): string {
  return `${baseUrl}/scenario/${slug}`;
}

export function buildScenarioArticleSchema(scenario: Scenario) {
  const url = getScenarioCanonicalUrl(scenario.slug);

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: scenario.h1,
    description: scenario.metaDescription,
    mainEntityOfPage: url,
    url,
    author: {
      '@type': 'Organization',
      name: 'Flowdockr',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Flowdockr',
    },
  };
}

export function buildScenarioFaqSchema(scenario: Scenario) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: scenario.faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };
}

export function buildScenarioBreadcrumbSchema(scenario: Scenario) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Scenarios',
        item: `${baseUrl}/scenario`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: scenario.h1,
        item: getScenarioCanonicalUrl(scenario.slug),
      },
    ],
  };
}
