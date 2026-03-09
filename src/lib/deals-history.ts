import { SavedDealInput, SavedDealRecord, DealStatus } from '@/types/deals';

const STORAGE_KEY = 'flowdockr.saved.deals.v1';
const MAX_DEALS = 200;

function canUseStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function safeParse(raw: string | null): SavedDealRecord[] {
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];

    return parsed.filter((item): item is SavedDealRecord => {
      if (!item || typeof item !== 'object') return false;
      const record = item as Partial<SavedDealRecord>;

      return (
        typeof record.id === 'string' &&
        typeof record.scenarioSlug === 'string' &&
        typeof record.scenarioTitle === 'string' &&
        typeof record.clientMessage === 'string' &&
        typeof record.generatedReply === 'string' &&
        typeof record.alternativeReply === 'string' &&
        Array.isArray(record.strategy) &&
        typeof record.tone === 'string' &&
        typeof record.sourcePage === 'string' &&
        typeof record.status === 'string' &&
        typeof record.createdAt === 'string' &&
        typeof record.updatedAt === 'string'
      );
    });
  } catch {
    return [];
  }
}

function persist(records: SavedDealRecord[]) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(records.slice(0, MAX_DEALS)));
}

export function listSavedDeals(): SavedDealRecord[] {
  if (!canUseStorage()) return [];
  return safeParse(window.localStorage.getItem(STORAGE_KEY)).sort(
    (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
  );
}

export function saveDealRecord(input: SavedDealInput): SavedDealRecord {
  const now = new Date().toISOString();
  const next: SavedDealRecord = {
    id: `deal_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    scenarioSlug: input.scenarioSlug,
    scenarioTitle: input.scenarioTitle,
    clientMessage: input.clientMessage,
    generatedReply: input.generatedReply,
    alternativeReply: input.alternativeReply,
    strategy: input.strategy,
    tone: input.tone,
    sourcePage: input.sourcePage,
    status: input.status || 'draft',
    createdAt: now,
    updatedAt: now,
  };

  const existing = listSavedDeals();
  persist([next, ...existing]);
  return next;
}

export function updateDealStatus(id: string, status: DealStatus): SavedDealRecord | null {
  const existing = listSavedDeals();
  const index = existing.findIndex((item) => item.id === id);
  if (index < 0) {
    return null;
  }

  const updated: SavedDealRecord = {
    ...existing[index],
    status,
    updatedAt: new Date().toISOString(),
  };
  const next = [...existing];
  next[index] = updated;
  persist(next);
  return updated;
}

export function deleteDealRecord(id: string) {
  const existing = listSavedDeals();
  const next = existing.filter((item) => item.id !== id);
  persist(next);
}

export function getSavedDealsStats(records: SavedDealRecord[]) {
  const total = records.length;
  const draft = records.filter((item) => item.status === 'draft').length;
  const ongoing = records.filter((item) => item.status === 'ongoing').length;
  const won = records.filter((item) => item.status === 'won').length;

  return {
    total,
    draft,
    ongoing,
    won,
    savedReplies: records.length,
  };
}
