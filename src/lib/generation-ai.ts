import { buildUserPrompt, FLOWDOCKR_RESPONSE_SCHEMA, SYSTEM_PROMPT } from '@/lib/prompts';
import { GeneratedReplyResult, GenerateReplyInput } from '@/types/generation';
import { ScenarioContent } from '@/types/scenario';

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

export async function generateReplyWithAI(
  input: GenerateReplyInput,
  scenario: ScenarioContent
): Promise<GeneratedReplyResult> {
  const apiKey = String(process.env.OPENAI_API_KEY || '').trim();
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not configured.');
  }

  const model = String(process.env.FLOWDOCKR_MODEL || DEFAULT_MODEL).trim();

  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      input: [
        {
          role: 'system',
          content: SYSTEM_PROMPT,
        },
        {
          role: 'user',
          content: buildUserPrompt(input, scenario),
        },
      ],
      text: {
        format: {
          type: 'json_schema',
          name: 'flowdockr_reply',
          schema: FLOWDOCKR_RESPONSE_SCHEMA,
          strict: true,
        },
      },
    }),
  });

  const payload = (await response.json()) as OpenAIResponsePayload;
  if (!response.ok) {
    const message = payload?.error?.message || 'OpenAI generation request failed.';
    throw new Error(message);
  }

  const rawText = extractResponseText(payload);
  const parsed = safeJsonParse(rawText);
  return normalizeGeneratedReplyResult(parsed);
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

function safeJsonParse(rawText: string): unknown {
  const cleaned = rawText
    .trim()
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/\s*```$/i, '');

  return JSON.parse(cleaned);
}

function normalizeGeneratedReplyResult(raw: unknown): GeneratedReplyResult {
  const data = raw as Partial<GeneratedReplyResult> | null;

  const recommendedReply =
    typeof data?.recommendedReply === 'string'
      ? data.recommendedReply.trim()
      : '';
  const alternativeReply =
    typeof data?.alternativeReply === 'string'
      ? data.alternativeReply.trim()
      : '';
  const confidence =
    data?.confidence === 'high' ||
    data?.confidence === 'medium' ||
    data?.confidence === 'low'
      ? data.confidence
      : 'medium';
  const strategy =
    Array.isArray(data?.strategy) && data?.strategy.length > 0
      ? data.strategy
          .map((item) => (typeof item === 'string' ? item.trim() : ''))
          .filter(Boolean)
          .slice(0, 3)
      : [];
  const caution =
    typeof data?.caution === 'string' && data.caution.trim()
      ? data.caution.trim()
      : 'Avoid lowering your rate too early before scope/value is clarified.';

  if (!recommendedReply || !alternativeReply || strategy.length === 0) {
    throw new Error('Model returned invalid reply payload.');
  }

  while (strategy.length < 3) {
    strategy.push('Keep the message concise and decision-oriented.');
  }

  return {
    recommendedReply,
    alternativeReply,
    confidence,
    strategy,
    caution,
  };
}
