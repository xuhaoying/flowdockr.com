export type DealStatus = 'draft' | 'sent' | 'won' | 'ongoing' | 'lost';

export type DealTone = 'professional' | 'friendly' | 'firm';
export type DealProjectType =
  | 'designer'
  | 'developer'
  | 'copywriter'
  | 'marketer'
  | 'video_editor'
  | 'consultant'
  | 'other';

export type SavedDealRecord = {
  id: string;
  scenarioSlug: string;
  scenarioTitle: string;
  clientMessage: string;
  generatedReply: string;
  alternativeReply: string;
  strategy: string[];
  tone: DealTone;
  projectType?: DealProjectType;
  sourcePage: 'home' | 'scenario' | 'tool';
  status: DealStatus;
  createdAt: string;
  updatedAt: string;
};

export type SavedDealInput = {
  scenarioSlug: string;
  scenarioTitle: string;
  clientMessage: string;
  generatedReply: string;
  alternativeReply: string;
  strategy: string[];
  tone: DealTone;
  projectType?: DealProjectType;
  sourcePage: 'home' | 'scenario' | 'tool';
  status?: DealStatus;
};
