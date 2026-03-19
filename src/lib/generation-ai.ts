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

type ProviderRequestPayload = {
  model: string;
  input: Array<{
    role: 'system' | 'user';
    content: string;
  }>;
};

export type ProviderRequestDebugShape = {
  provider: GenerationProvider;
  endpoint: string;
  model: string;
  bodyLength: number;
  inputCount: number;
  inputRoles: string[];
  inputContentLengths: number[];
  hasMessages: boolean;
  hasInput: boolean;
  hasResponseFormat: boolean;
  hasTextFormat: boolean;
  hasTools: boolean;
  hasMetadata: boolean;
  hasTemperature: boolean;
  hasMaxOutputTokens: boolean;
  repairNotesCount: number;
  serviceType: string | null;
  goal: string | null;
  sourcePage: string | null;
};

export type AIReplyResult = {
  text: string;
  model: string;
  provider: GenerationProvider;
  promptMeta: {
    strategyCardSource: 'top10' | 'compat';
    calibrationExampleCount: number;
    usedServiceAdjustment: boolean;
  };
};

export async function generateReplyWithAI(
  input: GenerateReplyInput,
  scenario: Scenario,
  options?: {
    repairNotes?: string[];
  }
): Promise<AIReplyResult> {
  const outbound = prepareProviderRequest(input, scenario, options);
  logOutboundDebugShape('provider_request_preflight', outbound.debugShape);

  const response = await fetch(outbound.providerConfig.endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: outbound.providerConfig.authorizationHeader,
    },
    body: outbound.body,
  });

  const payload = (await response.json()) as OpenAIResponsePayload;
  if (!response.ok) {
    logOutboundDebugShape('provider_request_failed', {
      ...outbound.debugShape,
      responseStatus: response.status,
      providerErrorMessage: payload?.error?.message || null,
    });
    const message =
      payload?.error?.message || 'OpenAI generation request failed.';
    throw new Error(message);
  }

  return {
    text: extractResponseText(payload),
    model: outbound.model,
    provider: outbound.providerConfig.provider,
    promptMeta: outbound.promptMeta,
  };
}

export function prepareProviderRequest(
  input: GenerateReplyInput,
  scenario: Scenario,
  options?: {
    repairNotes?: string[];
  }
): {
  providerConfig: ReturnType<typeof resolveProviderConfig>;
  model: string;
  payload: ProviderRequestPayload;
  body: string;
  promptMeta: AIReplyResult['promptMeta'];
  debugShape: ProviderRequestDebugShape;
} {
  const providerConfig = resolveProviderConfig();
  const model = resolveModel(providerConfig.provider);

  const builtPrompt = buildScenarioPrompt({
    scenario,
    message: input.message,
    repairNotes: options?.repairNotes,
    userRateContext: input.userRateContext,
    serviceType: input.serviceType,
    userGoal: input.goal,
  });

  const payload: ProviderRequestPayload = {
    model,
    input: [
      {
        role: 'system',
        content: systemPrompt,
      },
      {
        role: 'user',
        content: builtPrompt.prompt,
      },
    ],
  };

  const body = JSON.stringify(payload);

  return {
    providerConfig,
    model,
    payload,
    body,
    promptMeta: builtPrompt.meta,
    debugShape: {
      provider: providerConfig.provider,
      endpoint: providerConfig.endpoint,
      model,
      bodyLength: body.length,
      inputCount: payload.input.length,
      inputRoles: payload.input.map((item) => item.role),
      inputContentLengths: payload.input.map((item) => item.content.length),
      hasMessages: false,
      hasInput: true,
      hasResponseFormat: false,
      hasTextFormat: false,
      hasTools: false,
      hasMetadata: false,
      hasTemperature: false,
      hasMaxOutputTokens: false,
      repairNotesCount: options?.repairNotes?.length || 0,
      serviceType: input.serviceType || null,
      goal: input.goal || null,
      sourcePage: input.sourcePage || null,
    },
  };
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
      throw new Error(
        'FLOWDOCKR_AI_PROVIDER=fal but FAL_API_KEY is not configured.'
      );
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

  throw new Error(
    'No AI provider configured. Set FAL_API_KEY or OPENAI_API_KEY.'
  );
}

function logOutboundDebugShape(
  event: 'provider_request_preflight' | 'provider_request_failed',
  payload: Record<string, unknown>
) {
  // This switch is only for short-lived route/provider debugging. It logs a
  // redacted request shape, never prompt text, request bodies, or credentials.
  if (!isOutboundDebugEnabled()) {
    return;
  }

  try {
    console.info(
      '[flowdockr.provider]',
      JSON.stringify({
        event,
        ...payload,
      })
    );
  } catch {
    // no-op logging fallback
  }
}

function isOutboundDebugEnabled() {
  return process.env.FLOWDOCKR_DEBUG_OUTBOUND === 'true';
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
