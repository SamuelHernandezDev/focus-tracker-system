//backend/src/ai/types/ai-domain-analysis.type.ts

export type AIDomainCategory =
  | 'PRODUCTIVE'
  | 'SUPPORT'
  | 'LEARNING'
  | 'NEUTRAL'
  | 'SOCIAL'
  | 'DISTRACTION';

// ======================
// INPUT
// ======================

export type DomainInput = {
  domain: string;

  time: number;
};

// ======================
// ANALYSIS
// ======================

export type DomainAnalysis = {
  domain: string;

  category: AIDomainCategory;

  relevant: boolean;

  isDistraction: boolean;

  confidence: number;

  reason: string;
};

// ======================
// RESPONSE
// ======================

export type AIResponse = {
  domains: DomainAnalysis[];
};
