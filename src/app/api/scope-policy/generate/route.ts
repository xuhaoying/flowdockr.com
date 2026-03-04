import { NextRequest, NextResponse } from 'next/server';

import { envConfigs } from '@/config';
import { getCurrentSubscription } from '@/shared/models/subscription';
import { getUserInfo } from '@/shared/models/user';

type ScopeInput = {
  project_type: string;
  project_price: number;
  revision_count: number;
  extra_revision_price?: number | null;
  client_type: string;
};

type ScopeOutput = {
  revision_policy: string;
  scope_rule: string;
  client_message: string;
  contract_clause: string;
};

const FREE_LIMIT = 2;
const FREE_COOKIE = 'flowdockr_scope_free_count';

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ScopeInput;
    const input = validateInput(body);

    const isPaid = await hasPaidAccess();
    const used = Number.parseInt(request.cookies.get(FREE_COOKIE)?.value || '0', 10) || 0;

    if (!isPaid && used >= FREE_LIMIT) {
      return NextResponse.json({
        code: -1,
        message: 'Free plan limit reached. Upgrade to continue generating.',
        data: {
          upgrade_required: true,
          usage: {
            limit: FREE_LIMIT,
            used,
            remaining: 0,
            is_paid: false,
          },
        },
      });
    }

    const output = await generateScopePolicy(input);
    const nextUsed = isPaid ? used : used + 1;

    const response = NextResponse.json({
      code: 0,
      message: 'ok',
      data: {
        output,
        usage: {
          limit: isPaid ? null : FREE_LIMIT,
          used: nextUsed,
          remaining: isPaid ? null : Math.max(FREE_LIMIT - nextUsed, 0),
          is_paid: isPaid,
        },
      },
    });

    if (!isPaid) {
      response.cookies.set(FREE_COOKIE, String(nextUsed), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 30,
      });
    }

    return response;
  } catch (e: any) {
    return NextResponse.json({
      code: -1,
      message: e?.message || 'generate failed',
    });
  }
}

function validateInput(body: ScopeInput): ScopeInput {
  const projectType = String(body.project_type || '').trim().toLowerCase();
  const clientType = String(body.client_type || '').trim().toLowerCase();
  const projectPrice = Number(body.project_price);
  const revisionCount = Number(body.revision_count);
  const extraRevisionPrice =
    body.extra_revision_price === null || body.extra_revision_price === undefined
      ? null
      : Number(body.extra_revision_price);

  const projectTypes = [
    'logo',
    'website',
    'video',
    'writing',
    'marketing',
    'other',
  ];
  const clientTypes = ['startup', 'small_business', 'agency', 'enterprise'];

  if (!projectTypes.includes(projectType)) {
    throw new Error('project_type is invalid');
  }
  if (!clientTypes.includes(clientType)) {
    throw new Error('client_type is invalid');
  }
  if (!Number.isFinite(projectPrice) || projectPrice <= 0) {
    throw new Error('project_price must be greater than zero');
  }
  if (!Number.isFinite(revisionCount) || revisionCount < 1 || revisionCount > 5) {
    throw new Error('revision_count must be between 1 and 5');
  }
  if (
    extraRevisionPrice !== null &&
    (!Number.isFinite(extraRevisionPrice) || extraRevisionPrice < 0)
  ) {
    throw new Error('extra_revision_price must be a positive number');
  }

  return {
    project_type: projectType,
    project_price: projectPrice,
    revision_count: revisionCount,
    extra_revision_price: extraRevisionPrice,
    client_type: clientType,
  };
}

async function hasPaidAccess(): Promise<boolean> {
  try {
    const user = await getUserInfo();
    if (!user?.id || !envConfigs.database_url) {
      return false;
    }

    const subscription = await getCurrentSubscription(user.id);
    return Boolean(subscription);
  } catch {
    return false;
  }
}

async function generateScopePolicy(input: ScopeInput): Promise<ScopeOutput> {
  const openaiApiKey = process.env.OPENAI_API_KEY || '';
  if (!openaiApiKey) {
    return generateFallbackPolicy(input);
  }

  const model = process.env.SCOPE_GUARD_MODEL || 'gpt-4.1-mini';
  const systemPrompt =
    'You are a freelance business consultant. Write concise client-facing policy text. Avoid legal claims and aggressive wording.';
  const userPrompt = [
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

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${openaiApiKey}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.2,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
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
        },
      },
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`OpenAI request failed: ${response.status} ${text}`);
  }

  const data = await response.json();
  const rawContent = String(data?.choices?.[0]?.message?.content || '');
  const parsed = parseJsonContent(rawContent);

  return normalizeOutput(parsed, input);
}

function generateFallbackPolicy(input: ScopeInput): ScopeOutput {
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

function parseJsonContent(rawContent: string): any {
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

function normalizeOutput(raw: any, input: ScopeInput): ScopeOutput {
  const fallback = generateFallbackPolicy(input);

  return {
    revision_policy: String(raw?.revision_policy || fallback.revision_policy).trim(),
    scope_rule: String(raw?.scope_rule || fallback.scope_rule).trim(),
    client_message: String(raw?.client_message || fallback.client_message).trim(),
    contract_clause: String(raw?.contract_clause || fallback.contract_clause).trim(),
  };
}
