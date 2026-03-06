import { NextRequest, NextResponse } from 'next/server';

import {
  getScenarioBySlug,
  isScenarioSlug,
  NEGOTIATION_SYSTEM_PROMPT,
  ScenarioSlug,
} from '@/lib/promptTemplates';

type GenerateScenarioInput = {
  scenario: string;
  client_message: string;
};

type Framework = {
  label: string;
  why: string;
};

type PlanQuota = {
  plan: 'free';
  used: number;
  limit: number;
  remaining: number;
};

type GenerateScenarioOutput = {
  reply: string;
  framework: Framework;
  quality: {
    maintains_value: boolean;
    keeps_conversation_open: boolean;
    avoids_defensive_tone: boolean;
  };
  scenario: {
    slug: ScenarioSlug;
    title: string;
  };
  quota: PlanQuota;
};

type ModelDraft = {
  reply?: unknown;
  framework?: {
    label?: unknown;
    why?: unknown;
  };
};

type OpenAIMessageContent =
  | string
  | Array<{
      type?: string;
      text?: string;
    }>;

type OpenAIChatResponse = {
  choices?: Array<{
    message?: {
      content?: OpenAIMessageContent;
    };
  }>;
  error?: {
    message?: string;
  };
};

const REQUEST_TIMEOUT_MS = 20_000;
const RATE_LIMIT_MAX = 10;
const RATE_LIMIT_WINDOW_MS = 60_000;
const FREE_GENERATION_LIMIT = 2;
const FREE_COUNT_COOKIE = 'flowdockr_scenario_free_count';
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

const MODEL_RESPONSE_JSON_SCHEMA = {
  name: 'flowdockr_scenario_reply',
  strict: true,
  schema: {
    type: 'object',
    additionalProperties: false,
    required: ['reply', 'framework'],
    properties: {
      reply: {
        type: 'string',
        minLength: 20,
        maxLength: 420,
      },
      framework: {
        type: 'object',
        additionalProperties: false,
        required: ['label', 'why'],
        properties: {
          label: {
            type: 'string',
            minLength: 2,
            maxLength: 80,
          },
          why: {
            type: 'string',
            minLength: 10,
            maxLength: 220,
          },
        },
      },
    },
  },
};

const FALLBACK_FRAMEWORK: Framework = {
  label: 'Value framing + next step',
  why: 'Protect pricing logic, keep tone professional, and move the conversation toward a concrete decision step.',
};

const FALLBACK_REPLY =
  'Thanks for sharing this context. Based on the agreed goals, I want to keep the solution focused on outcomes and quality. If budget or constraints changed, I can suggest a tighter scope option that still protects results.';

class BadRequestError extends Error {
  status = 400;
}

class RateLimitError extends Error {
  status = 429;
}

class FreeQuotaError extends Error {
  status = 402;
}

class UpstreamGenerationError extends Error {
  status = 500;
}

declare global {
  var __flowdockrScenarioRateLimitStore: Map<string, number[]> | undefined;
}

export async function POST(request: NextRequest) {
  const startedAt = Date.now();

  try {
    enforceRateLimit(request);
    const freeUsed = getFreeUsage(request);
    if (freeUsed >= FREE_GENERATION_LIMIT) {
      throw new FreeQuotaError('Free plan limit reached. Upgrade to Pro ($5 for 20 replies).');
    }

    const body = (await request.json()) as Partial<GenerateScenarioInput>;
    const input = validateInput(body);

    const scenario = getScenarioBySlug(input.scenario);
    if (!scenario || !isScenarioSlug(input.scenario)) {
      throw new BadRequestError('Invalid scenario slug.');
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new UpstreamGenerationError('OPENAI_API_KEY is not configured.');
    }

    const model = process.env.FLOWDOCKR_MODEL || process.env.DEAL_STRATEGY_MODEL || 'gpt-4.1-mini';
    const deadline = startedAt + REQUEST_TIMEOUT_MS;

    const draft = await generateWithRetry({
      apiKey,
      model,
      scenario,
      clientMessage: input.client_message,
      deadline,
    });

    const nextFreeUsed = Math.min(FREE_GENERATION_LIMIT, freeUsed + 1);
    const output = finalizeOutput(
      draft,
      scenario.slug,
      scenario.h1,
      nextFreeUsed,
      FREE_GENERATION_LIMIT
    );

    const response = NextResponse.json(output, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store',
      },
    });

    response.cookies.set({
      name: FREE_COUNT_COOKIE,
      value: String(nextFreeUsed),
      maxAge: COOKIE_MAX_AGE_SECONDS,
      path: '/',
      sameSite: 'lax',
      httpOnly: false,
    });

    return response;
  } catch (error) {
    const status = getErrorStatus(error);
    const message = getErrorMessage(error);

    return NextResponse.json(
      {
        message,
      },
      {
        status,
        headers: {
          'Cache-Control': 'no-store',
        },
      }
    );
  }
}

function validateInput(body: Partial<GenerateScenarioInput>): GenerateScenarioInput {
  const scenario = String(body.scenario || '').trim();
  const client_message = String(body.client_message || '').trim();

  if (!scenario) {
    throw new BadRequestError('scenario is required.');
  }

  if (client_message.length < 10) {
    throw new BadRequestError('client_message must be at least 10 characters.');
  }

  if (client_message.length > 1200) {
    throw new BadRequestError('client_message must be 1200 characters or fewer.');
  }

  return {
    scenario,
    client_message,
  };
}

async function generateWithRetry({
  apiKey,
  model,
  scenario,
  clientMessage,
  deadline,
}: {
  apiKey: string;
  model: string;
  scenario: NonNullable<ReturnType<typeof getScenarioBySlug>>;
  clientMessage: string;
  deadline: number;
}): Promise<ModelDraft> {
  let firstError: unknown;

  for (let attempt = 0; attempt < 2; attempt += 1) {
    const withSchema = attempt === 0;

    try {
      return await callOpenAI({
        apiKey,
        model,
        scenario,
        clientMessage,
        withSchema,
        deadline,
        retryHint: attempt === 1,
      });
    } catch (error) {
      if (attempt === 0) {
        firstError = error;
      } else {
        throw error;
      }
    }
  }

  throw firstError instanceof Error
    ? firstError
    : new UpstreamGenerationError('The model request failed. Please retry.');
}

async function callOpenAI({
  apiKey,
  model,
  scenario,
  clientMessage,
  withSchema,
  deadline,
  retryHint,
}: {
  apiKey: string;
  model: string;
  scenario: NonNullable<ReturnType<typeof getScenarioBySlug>>;
  clientMessage: string;
  withSchema: boolean;
  deadline: number;
  retryHint: boolean;
}): Promise<ModelDraft> {
  const timeoutMs = deadline - Date.now();
  if (timeoutMs <= 0) {
    throw new UpstreamGenerationError('Generation timed out. Please retry.');
  }

  const developerPrompt = buildDeveloperPrompt(scenario.promptContext, retryHint);
  const requestBody: Record<string, unknown> = {
    model,
    temperature: 0.2,
    messages: [
      {
        role: 'system',
        content: NEGOTIATION_SYSTEM_PROMPT,
      },
      {
        role: 'developer',
        content: developerPrompt,
      },
      {
        role: 'user',
        content: `Client message: ${clientMessage}`,
      },
    ],
  };

  if (withSchema) {
    requestBody.response_format = {
      type: 'json_schema',
      json_schema: MODEL_RESPONSE_JSON_SCHEMA,
    };
  }

  const response = await fetchWithTimeout(
    'https://api.openai.com/v1/chat/completions',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(requestBody),
    },
    timeoutMs
  );

  const json = (await response.json()) as OpenAIChatResponse;

  if (!response.ok) {
    const upstreamMessage = json?.error?.message || 'OpenAI request failed.';
    throw new UpstreamGenerationError(upstreamMessage);
  }

  const rawContent = extractAssistantContent(json);
  if (!rawContent) {
    throw new UpstreamGenerationError('Model returned empty output.');
  }

  try {
    return parseJsonText(rawContent) as ModelDraft;
  } catch {
    throw new UpstreamGenerationError('The model returned invalid JSON. Please retry.');
  }
}

function buildDeveloperPrompt(scenarioContext: string, retryHint: boolean): string {
  return [
    'Use the scenario context below as mandatory instructions:',
    scenarioContext,
    '',
    'Reply requirements:',
    '- Keep response to 1-3 sentences.',
    '- Keep response ready to send to the client.',
    '- Maintain value, avoid defensive language, and keep conversation open.',
    '',
    'Return a strict JSON object with exactly:',
    '{',
    '  "reply": "string",',
    '  "framework": {',
    '    "label": "string",',
    '    "why": "string"',
    '  }',
    '}',
    'Do not include markdown. Do not include any other keys.',
    retryHint
      ? 'Previous output was invalid. Return strict JSON only and ensure it parses with JSON.parse.'
      : 'Ensure output is strict JSON only.',
  ].join('\n');
}

function extractAssistantContent(payload: OpenAIChatResponse): string {
  const content = payload?.choices?.[0]?.message?.content;

  if (typeof content === 'string') {
    return content;
  }

  if (Array.isArray(content)) {
    return content
      .map((item) => (typeof item?.text === 'string' ? item.text : ''))
      .join('')
      .trim();
  }

  return '';
}

function parseJsonText(raw: string): unknown {
  const trimmed = raw.trim();
  if (!trimmed) {
    throw new Error('empty_json');
  }

  try {
    return JSON.parse(trimmed);
  } catch {
    const cleaned = trimmed
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/\s*```$/, '');

    return JSON.parse(cleaned);
  }
}

function finalizeOutput(
  draft: ModelDraft,
  scenarioSlug: ScenarioSlug,
  scenarioTitle: string,
  freeUsed: number,
  freeLimit: number
): GenerateScenarioOutput {
  const framework: Framework = {
    label: clampText(String(draft.framework?.label || FALLBACK_FRAMEWORK.label), 2, 80),
    why: clampText(String(draft.framework?.why || FALLBACK_FRAMEWORK.why), 10, 220),
  };

  let reply = normalizeReply(String(draft.reply || ''));
  if (!reply) {
    reply = FALLBACK_REPLY;
  }

  const quality = {
    maintains_value: keepsValue(reply),
    keeps_conversation_open: keepsConversationOpen(reply),
    avoids_defensive_tone: avoidsDefensiveTone(reply),
  };

  if (!quality.avoids_defensive_tone) {
    reply = FALLBACK_REPLY;
  }

  return {
    reply,
    framework,
    quality,
    scenario: {
      slug: scenarioSlug,
      title: scenarioTitle,
    },
    quota: {
      plan: 'free',
      used: freeUsed,
      limit: freeLimit,
      remaining: Math.max(0, freeLimit - freeUsed),
    },
  };
}

function clampText(value: string, minLength: number, maxLength: number): string {
  const normalized = value.replace(/\s+/g, ' ').trim();
  if (!normalized) {
    return '';
  }

  if (normalized.length > maxLength) {
    return normalized.slice(0, maxLength).trim();
  }

  if (normalized.length < minLength) {
    return '';
  }

  return normalized;
}

function normalizeReply(raw: string): string {
  const compact = raw.replace(/\s+/g, ' ').trim();
  if (!compact) {
    return '';
  }

  const sentences = compact
    .split(/(?<=[.!?])\s+/)
    .map((item) => item.trim())
    .filter(Boolean);

  const limited = sentences.length > 0 ? sentences.slice(0, 3).join(' ') : compact;
  return clampText(limited, 20, 420);
}

function keepsValue(reply: string): boolean {
  return /(value|outcome|result|scope|quality|delivery|impact)/i.test(reply);
}

function keepsConversationOpen(reply: string): boolean {
  return /(next step|option|align|can we|would you|happy to|propose|discuss)/i.test(reply);
}

function avoidsDefensiveTone(reply: string): boolean {
  const defensivePatterns = [
    /\bnot my fault\b/i,
    /\bobviously\b/i,
    /\bas i said\b/i,
    /\byou are wrong\b/i,
    /\bif you can\'t afford\b/i,
  ];

  return !defensivePatterns.some((pattern) => pattern.test(reply));
}

function fetchWithTimeout(
  url: string,
  init: RequestInit,
  timeoutMs: number
): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  return fetch(url, {
    ...init,
    signal: controller.signal,
  }).finally(() => {
    clearTimeout(timeout);
  });
}

function enforceRateLimit(request: NextRequest): void {
  const key = getClientKey(request);
  const now = Date.now();
  const store = getRateLimitStore();

  const existing = store.get(key) || [];
  const valid = existing.filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS);

  if (valid.length >= RATE_LIMIT_MAX) {
    throw new RateLimitError('Too many requests. Please try again in about a minute.');
  }

  valid.push(now);
  store.set(key, valid);
}

function getClientKey(request: NextRequest): string {
  const xff = request.headers.get('x-forwarded-for');
  const ipFromXff = xff?.split(',')[0]?.trim();

  return (
    ipFromXff ||
    request.headers.get('cf-connecting-ip') ||
    request.headers.get('x-real-ip') ||
    'unknown'
  );
}

function getRateLimitStore(): Map<string, number[]> {
  if (!globalThis.__flowdockrScenarioRateLimitStore) {
    globalThis.__flowdockrScenarioRateLimitStore = new Map<string, number[]>();
  }
  return globalThis.__flowdockrScenarioRateLimitStore;
}

function getFreeUsage(request: NextRequest): number {
  const raw = request.cookies.get(FREE_COUNT_COOKIE)?.value || '0';
  const parsed = Number(raw);

  if (!Number.isFinite(parsed) || parsed <= 0) {
    return 0;
  }

  return Math.floor(Math.min(parsed, FREE_GENERATION_LIMIT));
}

function getErrorStatus(error: unknown): number {
  if (
    error instanceof BadRequestError ||
    error instanceof RateLimitError ||
    error instanceof FreeQuotaError ||
    error instanceof UpstreamGenerationError
  ) {
    return error.status;
  }
  return 500;
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return 'Generation failed. Please retry.';
}
