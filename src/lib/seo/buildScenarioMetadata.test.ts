import { getScenarioBySlug } from '@/lib/content/getScenarioBySlug';
import { describe, expect, it } from 'vitest';

import { buildScenarioMetadata } from './buildScenarioMetadata';

describe('buildScenarioMetadata', () => {
  it('builds metadata for generated pricing-cluster scenario pages', () => {
    const scenario = getScenarioBySlug('client-messaging-outside-work-hours');

    expect(scenario).not.toBeNull();

    const metadata = buildScenarioMetadata({
      scenario: scenario!,
      canonical:
        'https://www.flowdockr.com/pricing/client-messaging-outside-work-hours',
    });

    expect(metadata.title).toBe(
      'Client Messaging Outside Work Hours? What to Say | Flowdockr'
    );
    expect(metadata.description).toBe(
      'Learn what to say when a client messages outside work hours. Set a calm boundary, reset expectations, and draft the reply with Flowdockr.'
    );
    expect(metadata.alternates?.canonical).toBe(
      'https://www.flowdockr.com/pricing/client-messaging-outside-work-hours'
    );
    expect(metadata.keywords).toContain(
      'client messaging outside work hours what to say'
    );
  });
});
