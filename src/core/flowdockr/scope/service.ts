import {
  buildScopeUserPrompt,
  getScopeSystemPrompt,
  SCOPE_POLICY_RESPONSE_JSON_SCHEMA,
} from './prompts';
import {
  generateFallbackScopePolicy,
  normalizeScopeOutput,
  parseModelJsonContent,
} from './formatter';
import { ScopeInput, ScopeOutput } from './schemas';

type GenerateScopePolicyOptions = {
  apiKey?: string;
  model?: string;
  fetcher?: typeof fetch;
};

export async function generateScopePolicy(
  input: ScopeInput,
  options: GenerateScopePolicyOptions = {}
): Promise<ScopeOutput> {
  const apiKey = options.apiKey || '';
  if (!apiKey) {
    return generateFallbackScopePolicy(input);
  }

  const model = options.model || 'gpt-4.1-mini';
  const fetcher = options.fetcher || fetch;

  try {
    const response = await fetcher('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        temperature: 0.2,
        messages: [
          { role: 'system', content: getScopeSystemPrompt() },
          { role: 'user', content: buildScopeUserPrompt(input) },
        ],
        response_format: {
          type: 'json_schema',
          json_schema: SCOPE_POLICY_RESPONSE_JSON_SCHEMA,
        },
      }),
    });

    if (!response.ok) {
      return generateFallbackScopePolicy(input);
    }

    const data = await response.json();
    const rawContent = String(data?.choices?.[0]?.message?.content || '');
    const parsed = parseModelJsonContent(rawContent);

    return normalizeScopeOutput(parsed, input);
  } catch {
    return generateFallbackScopePolicy(input);
  }
}
