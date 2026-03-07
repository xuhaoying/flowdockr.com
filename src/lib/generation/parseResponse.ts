import type { GenerateReplyResult } from '@/types/generation';

export type ParsedGenerationOutput = GenerateReplyResult & {
  confidence: 'high' | 'medium' | 'low';
  caution?: string;
};

function cleanText(value: string): string {
  return value.trim().replace(/^["'\s]+|["'\s]+$/g, '');
}

export function parseResponse(raw: string): GenerateReplyResult {
  const normalized = raw
    .trim()
    .replace(/^```(?:text|markdown)?\s*/i, '')
    .replace(/\s*```$/i, '');

  const recommendedMatch = normalized.match(
    /Recommended reply:\s*([\s\S]*?)\n\s*Alternative reply:/i
  );
  const alternativeMatch = normalized.match(
    /Alternative reply:\s*([\s\S]*?)\n\s*Strategy:/i
  );
  const strategyMatch = normalized.match(/Strategy:\s*([\s\S]*)$/i);

  const reply = cleanText(recommendedMatch?.[1] || '');
  const alternativeReply = cleanText(alternativeMatch?.[1] || '');
  const strategyRaw = cleanText(strategyMatch?.[1] || '');

  const strategy = strategyRaw
    .split('\n')
    .map((line) => line.replace(/^\s*-\s*/, '').trim())
    .filter(Boolean)
    .slice(0, 3);

  if (reply && alternativeReply && strategy.length > 0) {
    return {
      reply,
      alternativeReply,
      strategy,
    };
  }

  const jsonFallback = parseJsonFallback(normalized);
  if (jsonFallback) {
    return jsonFallback;
  }

  throw new Error('FAILED_TO_PARSE_GENERATION');
}

export function parseGenerationResult(raw: string): ParsedGenerationOutput {
  const parsed = parseResponse(raw);
  while (parsed.strategy.length < 3) {
    parsed.strategy.push('Keeps the response clear and decision-oriented.');
  }

  return {
    ...parsed,
    strategy: parsed.strategy.slice(0, 3),
    confidence: 'medium',
    caution: 'Avoid lowering your rate too early before scope or value is clarified.',
  };
}

function parseJsonFallback(raw: string): GenerateReplyResult | null {
  try {
    const parsed = JSON.parse(raw) as
      | {
          recommendedReply?: unknown;
          alternativeReply?: unknown;
          strategy?: unknown;
          reply?: unknown;
        }
      | null;

    const reply =
      typeof parsed?.reply === 'string'
        ? cleanText(parsed.reply)
        : typeof parsed?.recommendedReply === 'string'
          ? cleanText(parsed.recommendedReply)
          : '';

    const alternativeReply =
      typeof parsed?.alternativeReply === 'string'
        ? cleanText(parsed.alternativeReply)
        : '';

    const strategy = Array.isArray(parsed?.strategy)
      ? parsed.strategy
          .map((item) => (typeof item === 'string' ? item.trim() : ''))
          .filter(Boolean)
          .slice(0, 3)
      : [];

    if (!reply || !alternativeReply || strategy.length === 0) {
      return null;
    }

    return {
      reply,
      alternativeReply,
      strategy,
    };
  } catch {
    return null;
  }
}
