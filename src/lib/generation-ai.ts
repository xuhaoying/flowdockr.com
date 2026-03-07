import { buildScenarioPrompt, systemPrompt } from '@/lib/prompts';
import { Scenario } from '@/lib/scenarios';
import { GenerateReplyInput } from '@/types/generation';

type OpenAIResponsePayload = {
  output_text?: string;
  output?: Array<{
    content?: Array<{
      type?: string;
      text?: string;
    }>;
  }>;
  error?: {
    message?: string;
  };
};

const DEFAULT_MODEL = 'gpt-5-mini';
const DEFAULT_FAL_OPENROUTER_MODEL = 'openai/gpt-4.1-mini';
const OPENAI_RESPONSES_ENDPOINT = 'https://api.openai.com/v1/responses';
const FAL_OPENROUTER_RESPONSES_ENDPOINT =
  'https://fal.run/openrouter/router/openai/v1/responses';

type GenerationProvider = 'openai' | 'fal';

export async function generateReplyWithAI(
  input: GenerateReplyInput,
  scenario: Scenario,
  options?: {
    qualityHints?: string[];
  }
): Promise<string> {
  const providerConfig = resolveProviderConfig();
  const model = resolveModel(providerConfig.provider);

  const userPrompt = buildScenarioPrompt({
    scenario,
    message: input.message,
    qualityHints: options?.qualityHints,
    userRateContext: input.userRateContext,
    serviceType: input.serviceType,
    userGoal: input.goal,
  });

  const response = await fetch(providerConfig.endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: providerConfig.authorizationHeader,
    },
    body: JSON.stringify({
      model,
      input: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: userPrompt,
        },
      ],
    }),
  });

  const payload = (await response.json()) as OpenAIResponsePayload;
  if (!response.ok) {
    const message = payload?.error?.message || 'OpenAI generation request failed.';
    throw new Error(message);
  }

  return extractResponseText(payload);
}

function extractResponseText(payload: OpenAIResponsePayload): string {
  if (typeof payload.output_text === 'string' && payload.output_text.trim()) {
    return payload.output_text.trim();
  }

  const fromContent = (payload.output || [])
    .flatMap((item) => item.content || [])
    .map((content) => (typeof content.text === 'string' ? content.text : ''))
    .join('')
    .trim();

  if (!fromContent) {
    throw new Error('Model returned empty output.');
  }

  return fromContent;
}

function resolveProviderConfig(): {
  provider: GenerationProvider;
  endpoint: string;
  authorizationHeader: string;
} {
  const forcedProvider = String(process.env.FLOWDOCKR_AI_PROVIDER || '')
    .trim()
    .toLowerCase();
  const openaiKey = String(process.env.OPENAI_API_KEY || '').trim();
  const falKey = String(process.env.FAL_API_KEY || '').trim();

  if (forcedProvider === 'fal') {
    if (!falKey) {
      throw new Error('FLOWDOCKR_AI_PROVIDER=fal but FAL_API_KEY is not configured.');
    }

    return {
      provider: 'fal',
      endpoint: FAL_OPENROUTER_RESPONSES_ENDPOINT,
      authorizationHeader: `Key ${falKey}`,
    };
  }

  if (forcedProvider === 'openai') {
    if (!openaiKey) {
      throw new Error(
        'FLOWDOCKR_AI_PROVIDER=openai but OPENAI_API_KEY is not configured.'
      );
    }

    return {
      provider: 'openai',
      endpoint: OPENAI_RESPONSES_ENDPOINT,
      authorizationHeader: `Bearer ${openaiKey}`,
    };
  }

  if (falKey) {
    return {
      provider: 'fal',
      endpoint: FAL_OPENROUTER_RESPONSES_ENDPOINT,
      authorizationHeader: `Key ${falKey}`,
    };
  }

  if (openaiKey) {
    return {
      provider: 'openai',
      endpoint: OPENAI_RESPONSES_ENDPOINT,
      authorizationHeader: `Bearer ${openaiKey}`,
    };
  }

  throw new Error('No AI provider configured. Set FAL_API_KEY or OPENAI_API_KEY.');
}

function resolveModel(provider: GenerationProvider): string {
  const rawModel = String(process.env.FLOWDOCKR_MODEL || DEFAULT_MODEL).trim();
  if (provider === 'openai') {
    return rawModel || DEFAULT_MODEL;
  }

  if (!rawModel) {
    return DEFAULT_FAL_OPENROUTER_MODEL;
  }

  if (rawModel.includes('/')) {
    return rawModel;
  }

  if (rawModel.startsWith('gpt-')) {
    return `openai/${rawModel}`;
  }

  return rawModel;
}
