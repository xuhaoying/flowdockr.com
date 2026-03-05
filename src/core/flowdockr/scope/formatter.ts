import { ScopeInput, ScopeOutput } from './schemas';

export function generateFallbackScopePolicy(input: ScopeInput): ScopeOutput {
  const rounds = input.revision_count;
  const plural = rounds > 1 ? 's' : '';
  const extraFee =
    input.extra_revision_price ??
    Math.max(Math.round(input.project_price * 0.08), 50);

  return {
    revision_policy: `This ${input.project_type} project includes up to ${rounds} revision round${plural}. Additional revisions are billed at $${extraFee} per round.`,
    scope_rule:
      'Changes outside the original brief are treated as a new task and quoted separately before work continues.',
    client_message: `To keep this project efficient, the package includes ${rounds} revision round${plural}. Any new requests outside the approved brief are handled as add-ons and priced separately.`,
    contract_clause: `The project includes ${rounds} revision round${plural}. Further revisions or out-of-scope requests will incur additional fees and require written approval before execution.`,
  };
}

export function parseModelJsonContent(rawContent: string): unknown {
  const trimmed = rawContent.trim();
  if (!trimmed) {
    throw new Error('Model returned empty output');
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

export function normalizeScopeOutput(
  raw: unknown,
  input: ScopeInput
): ScopeOutput {
  const source = (raw || {}) as Record<string, unknown>;
  const fallback = generateFallbackScopePolicy(input);

  return {
    revision_policy: String(
      source.revision_policy || fallback.revision_policy
    ).trim(),
    scope_rule: String(source.scope_rule || fallback.scope_rule).trim(),
    client_message: String(source.client_message || fallback.client_message).trim(),
    contract_clause: String(
      source.contract_clause || fallback.contract_clause
    ).trim(),
  };
}
