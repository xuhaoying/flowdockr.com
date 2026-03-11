import type { ScenarioPageCta, ScenarioRelatedLink } from '@/types/scenario-page';

export const DEFAULT_TOOL_TITLE = 'Try this scenario';
export const DEFAULT_TOOL_DESCRIPTION =
  'Paste the message your client sent and see how Flowdockr suggests responding.';
export const DEFAULT_TOOL_CTA = 'Generate negotiation guidance';

export const DEFAULT_SCENARIO_CTA: ScenarioPageCta = {
  title: 'Try your own client message',
  description:
    'See how Flowdockr suggests responding to a real negotiation situation.',
  buttonLabel: 'Start with this scenario',
};

export function related(
  slug: string,
  title: string
): ScenarioRelatedLink {
  return { slug, title };
}
