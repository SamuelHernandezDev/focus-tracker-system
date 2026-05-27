//backend/src/domains/types/domain-analysis-result.type.ts

import { AnalyzedDomain } from './analyzed-domain.type';

export type DomainAnalysisResult = {
  distractions: number;

  topDomains: AnalyzedDomain[];
};
