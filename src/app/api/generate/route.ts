import { NextRequest, NextResponse } from 'next/server';

type GenerateRequestInput = {
  client_message: string;
  your_quote: number;
  your_min_price: number;
  project_type?: string;
};

type PriceRange = {
  ideal: number;
  negotiable: number;
  bottom: number;
  currency: 'USD';
};

type Strategy = {
  label: string;
  why: string;
};

type GenerateOutput = {
  instant_reply: string;
  strategy: Strategy;
  price_range: PriceRange;
  safety_checks: {
    min_price_respected: boolean;
    no_discount_promise: boolean;
  };
};

type ModelDraft = {
  instant_reply?: unknown;
  strategy?: {
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

const MAX_PRICE = 1_000_000;
const REQUEST_TIMEOUT_MS = 20_000;
const RATE_LIMIT_MAX = 10;
const RATE_LIMIT_WINDOW_MS = 60_000;

const MODEL_RESPONSE_JSON_SCHEMA = {
  name: 'flowdockr_reply',
  strict: true,
  schema: {
    type: 'object',
    additionalProperties: false,
    required: ['instant_reply', 'strategy'],
    properties: {
      instant_reply: {
        type: 'string',
        minLength: 20,
        maxLength: 350,
      },
      strategy: {
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
            maxLength: 280,
          },
        },
      },
    },
  },
};

const SYSTEM_PROMPT = [
  'You are an expert freelance negotiation coach.',
  'Output must be valid JSON only (no markdown).',
  'instant_reply must be professional, concise, and 1-3 sentences.',
  'Never promise a discount or agree to lower price directly.',
  'Always protect the bottom price: do not suggest any number below bottom.',
  'Avoid aggressive language. Default tone: calm, firm, professional.',
  'Focus on shifting from price to scope/outcome; propose scope adjustment if needed.',
].join('\n');

const FALLBACK_STRATEGY: Strategy = {
  label: 'Value anchoring',
  why: 'Keep the conversation on outcomes and scope, then offer scope adjustments instead of direct price cuts.',
};

const FALLBACK_REPLY =
  'Thanks for sharing the budget context. For this scope, I can deliver at my current rate with the agreed outcomes and timeline. If budget is tighter, I can propose a reduced-scope option that still protects results.';

class BadRequestError extends Error {
  status = 400;
}

class RateLimitError extends Error {
  status = 429;
}

class UpstreamGenerationError extends Error {
  status = 500;
}

declare global {
  var __flowdockrRateLimitStore: Map<string, number[]> | undefined;
}

export async function POST(request: NextRequest) {
  const startedAt = Date.now();
  const timestamp = new Date().toISOString();

  try {
    enforceRateLimit(request);

    const body = (await request.json()) as Partial<GenerateRequestInput>;
    const input = validateInput(body);
    const priceRange = computePriceRange(input.your_quote, input.your_min_price);

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new UpstreamGenerationError('OPENAI_API_KEY is not configured.');
    }

    const model = process.env.FLOWDOCKR_MODEL || process.env.DEAL_STRATEGY_MODEL || 'gpt-4.1-mini';
    const deadline = startedAt + REQUEST_TIMEOUT_MS;

    const draft = await generateWithRetry({
      apiKey,
      model,
      input,
      priceRange,
      deadline,
    });

    const output = finalizeOutput(draft, input, priceRange);

    console.info('[flowdockr.generate]', {
      timestamp,
      status: 'success',
      latency_ms: Date.now() - startedAt,
      message_length: input.client_message.length,
    });

    return NextResponse.json(output, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    const status = getErrorStatus(error);
    const message = getErrorMessage(error);

    console.error('[flowdockr.generate]', {
      timestamp,
      status: 'fail',
      latency_ms: Date.now() - startedAt,
      error: message,
    });

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

function validateInput(body: Partial<GenerateRequestInput>): GenerateRequestInput {
  const client_message = String(body.client_message || '').trim();
  const your_quote = Number(body.your_quote);
  const your_min_price = Number(body.your_min_price);

  if (client_message.length < 10) {
    throw new BadRequestError('client_message must be at least 10 characters.');
  }
  if (client_message.length > 800) {
    throw new BadRequestError('client_message must be 800 characters or fewer.');
  }

  if (!Number.isFinite(your_quote) || your_quote <= 0) {
    throw new BadRequestError('your_quote must be a number greater than 0.');
  }
  if (!Number.isFinite(your_min_price) || your_min_price <= 0) {
    throw new BadRequestError('your_min_price must be a number greater than 0.');
  }
  if (your_quote > MAX_PRICE || your_min_price > MAX_PRICE) {
    throw new BadRequestError(`your_quote and your_min_price must be <= ${MAX_PRICE}.`);
  }
  if (your_min_price > your_quote) {
    throw new BadRequestError('your_min_price must be less than or equal to your_quote.');
  }

  return {
    client_message,
    your_quote,
    your_min_price,
    project_type: typeof body.project_type === 'string' ? body.project_type.trim() : undefined,
  };
}

function roundMoney(value: number): number {
  return Math.round(value);
}

function computePriceRange(yourQuote: number, yourMinPrice: number): PriceRange {
  const bottom = roundMoney(yourMinPrice);
  const negotiableRaw = Math.max(
    yourMinPrice * 1.12,
    yourMinPrice + 0.25 * (yourQuote - yourMinPrice)
  );
  const negotiable = roundMoney(Math.max(negotiableRaw, yourMinPrice));
  const ideal = roundMoney(Math.max(yourQuote, negotiable * 1.15));

  return {
    ideal: Math.max(ideal, roundMoney(yourQuote)),
    negotiable: Math.max(negotiable, bottom),
    bottom,
    currency: 'USD',
  };
}

async function generateWithRetry({
  apiKey,
  model,
  input,
  priceRange,
  deadline,
}: {
  apiKey: string;
  model: string;
  input: GenerateRequestInput;
  priceRange: PriceRange;
  deadline: number;
}): Promise<ModelDraft> {
  let firstError: unknown;

  for (let attempt = 0; attempt < 2; attempt += 1) {
    const withSchema = attempt === 0;

    try {
      return await callOpenAI({
        apiKey,
        model,
        input,
        priceRange,
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
  input,
  priceRange,
  withSchema,
  deadline,
  retryHint,
}: {
  apiKey: string;
  model: string;
  input: GenerateRequestInput;
  priceRange: PriceRange;
  withSchema: boolean;
  deadline: number;
  retryHint: boolean;
}): Promise<ModelDraft> {
  const timeoutMs = deadline - Date.now();
  if (timeoutMs <= 0) {
    throw new UpstreamGenerationError('Generation timed out. Please retry.');
  }

  const developerPrompt = buildDeveloperPrompt(input, priceRange, retryHint);
  const requestBody: Record<string, unknown> = {
    model,
    temperature: 0.2,
    messages: [
      {
        role: 'system',
        content: SYSTEM_PROMPT,
      },
      {
        role: 'developer',
        content: developerPrompt,
      },
      {
        role: 'user',
        content: buildUserPrompt(input),
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

function buildDeveloperPrompt(
  input: GenerateRequestInput,
  priceRange: PriceRange,
  retryHint: boolean
): string {
  return [
    'Use the exact server-computed pricing context below. Do not modify these numbers:',
    `bottom: ${priceRange.bottom}`,
    `negotiable: ${priceRange.negotiable}`,
    `ideal: ${priceRange.ideal}`,
    `currency: ${priceRange.currency}`,
    `your_quote: ${input.your_quote}`,
    `your_min_price: ${input.your_min_price}`,
    '',
    'Return JSON object with exactly:',
    '{',
    '  "instant_reply": "string",',
    '  "strategy": {',
    '    "label": "string",',
    '    "why": "string"',
    '  }',
    '}',
    'Do not include markdown. Do not include any keys other than instant_reply and strategy.',
    retryHint
      ? 'Previous output was invalid. Return strict JSON only and ensure it parses with JSON.parse.'
      : 'Ensure output is strict JSON only.',
  ].join('\n');
}

function buildUserPrompt(input: GenerateRequestInput): string {
  return [
    `Client message: ${input.client_message}`,
    `Quote: ${input.your_quote}`,
    `Minimum acceptable price: ${input.your_min_price}`,
    `Project type: ${input.project_type || 'Other'}`,
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
  input: GenerateRequestInput,
  priceRange: PriceRange
): GenerateOutput {
  const strategy: Strategy = {
    label: clampText(String(draft.strategy?.label || FALLBACK_STRATEGY.label), 2, 80),
    why: clampText(String(draft.strategy?.why || FALLBACK_STRATEGY.why), 10, 280),
  };

  let instantReply = normalizeInstantReply(String(draft.instant_reply || ''));

  if (!instantReply) {
    instantReply = FALLBACK_REPLY;
  }

  if (!isMinPriceRespected(instantReply, input.your_min_price) || !isNoDiscountPromise(instantReply)) {
    instantReply = FALLBACK_REPLY;
  }

  const minPriceRespected = isMinPriceRespected(instantReply, input.your_min_price);
  const noDiscountPromise = isNoDiscountPromise(instantReply);

  return {
    instant_reply: instantReply,
    strategy,
    price_range: priceRange,
    safety_checks: {
      min_price_respected: minPriceRespected,
      no_discount_promise: noDiscountPromise,
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

function normalizeInstantReply(raw: string): string {
  const compact = raw.replace(/\s+/g, ' ').trim();
  if (!compact) {
    return '';
  }

  const sentences = compact
    .split(/(?<=[.!?])\s+/)
    .map((item) => item.trim())
    .filter(Boolean);

  const limited = sentences.length > 0 ? sentences.slice(0, 3).join(' ') : compact;
  return clampText(limited, 20, 350);
}

function isMinPriceRespected(reply: string, minPrice: number): boolean {
  const usdPattern = /(?:\$|USD\s*)(\d{1,3}(?:,\d{3})*(?:\.\d+)?)/gi;
  const matches = Array.from(reply.matchAll(usdPattern));

  for (const match of matches) {
    const numeric = Number(String(match[1] || '').replace(/,/g, ''));
    if (Number.isFinite(numeric) && numeric < minPrice) {
      return false;
    }
  }

  return true;
}

function isNoDiscountPromise(reply: string): boolean {
  const lowered = reply.toLowerCase();

  const promisePatterns = [
    /\b(i can|i could|i'll|we can|we could|we'll)\b[^.!?]{0,60}\b(discount|lower|reduce|drop|cut)\b/i,
    /\b(discount|lower|reduce|drop|cut)\b[^.!?]{0,30}\b(to|for)\s*\$?\d+/i,
    /\b(i can|i'll|we can|we'll)\b[^.!?]{0,40}\bfor\s*\$\d+/i,
  ];

  return !promisePatterns.some((pattern) => pattern.test(lowered));
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
  if (!globalThis.__flowdockrRateLimitStore) {
    globalThis.__flowdockrRateLimitStore = new Map<string, number[]>();
  }
  return globalThis.__flowdockrRateLimitStore;
}

function getErrorStatus(error: unknown): number {
  if (error instanceof BadRequestError || error instanceof RateLimitError || error instanceof UpstreamGenerationError) {
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
