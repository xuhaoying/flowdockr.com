export const PROJECT_TYPES = [
  'logo',
  'website',
  'video',
  'writing',
  'marketing',
  'other',
] as const;

export const CLIENT_TYPES = [
  'startup',
  'small_business',
  'agency',
  'enterprise',
] as const;

export type ProjectType = (typeof PROJECT_TYPES)[number];
export type ClientType = (typeof CLIENT_TYPES)[number];

export type ScopeInput = {
  project_type: ProjectType;
  project_price: number;
  revision_count: number;
  extra_revision_price?: number | null;
  client_type: ClientType;
};

export type ScopeOutput = {
  revision_policy: string;
  scope_rule: string;
  client_message: string;
  contract_clause: string;
};

export function validateScopeInput(payload: unknown): ScopeInput {
  const body = (payload || {}) as Record<string, unknown>;

  const projectType = String(body.project_type || '')
    .trim()
    .toLowerCase() as ProjectType;
  const clientType = String(body.client_type || '')
    .trim()
    .toLowerCase() as ClientType;
  const projectPrice = Number(body.project_price);
  const revisionCount = Number(body.revision_count);
  const extraRevisionPrice =
    body.extra_revision_price === null || body.extra_revision_price === undefined
      ? null
      : Number(body.extra_revision_price);

  if (!PROJECT_TYPES.includes(projectType)) {
    throw new Error('project_type is invalid');
  }

  if (!CLIENT_TYPES.includes(clientType)) {
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
