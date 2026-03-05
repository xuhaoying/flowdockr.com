import { ScopeInput } from './schemas';

export const SCOPE_POLICY_RESPONSE_JSON_SCHEMA = {
  name: 'scope_policy_output',
  strict: true,
  schema: {
    type: 'object',
    additionalProperties: false,
    properties: {
      revision_policy: { type: 'string' },
      scope_rule: { type: 'string' },
      client_message: { type: 'string' },
      contract_clause: { type: 'string' },
    },
    required: [
      'revision_policy',
      'scope_rule',
      'client_message',
      'contract_clause',
    ],
  },
} as const;

export function getScopeSystemPrompt(): string {
  return [
    'You are a freelance business consultant.',
    'Write concise client-facing policy text.',
    'Avoid legal claims, threats, or aggressive wording.',
  ].join(' ');
}

export function buildScopeUserPrompt(input: ScopeInput): string {
  return [
    'Generate a clear revision policy for a freelance project.',
    `Project type: ${input.project_type}`,
    `Price: ${input.project_price}`,
    `Revisions: ${input.revision_count}`,
    `Extra revision price: ${input.extra_revision_price ?? 'not provided'}`,
    `Client type: ${input.client_type}`,
    '',
    'Return valid JSON with exactly these fields:',
    'revision_policy, scope_rule, client_message, contract_clause',
  ].join('\n');
}
