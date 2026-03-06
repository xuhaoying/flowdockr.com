import { envConfigs } from '@/config';
import { ScenarioContent } from '@/types/scenario';

const baseUrl = envConfigs.app_url.replace(/\/$/, '');

export function getScenarioCanonicalUrl(slug: string): string {
  return `${baseUrl}/scenarios/${slug}`;
}

export function buildScenarioArticleSchema(scenario: ScenarioContent) {
  const url = getScenarioCanonicalUrl(scenario.slug);

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: scenario.h1,
    description: scenario.seoDescription,
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

export function buildScenarioFaqSchema(scenario: ScenarioContent) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: scenario.faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function buildScenarioBreadcrumbSchema(scenario: ScenarioContent) {
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
        item: `${baseUrl}/scenarios`,
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
