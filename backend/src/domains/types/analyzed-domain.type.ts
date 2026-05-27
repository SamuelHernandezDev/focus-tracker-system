//backend/src/domains/types/analyzed-domain.type.ts

export type DomainCategory =
  | 'PRODUCTIVE'
  | 'SUPPORT'
  | 'LEARNING'
  | 'NEUTRAL'
  | 'SOCIAL'
  | 'DISTRACTION';

export type AnalyzedDomain = {
  domain: string;

  time: number;

  category: DomainCategory;

  relevant: boolean;

  isDistraction: boolean;

  aiConfidence?: number;

  aiReason?: string;
};
