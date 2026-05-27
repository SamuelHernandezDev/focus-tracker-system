//backend/src/domains/services/domain-analytics.service.ts

import { Injectable } from '@nestjs/common';

import { AiDomainAnalysisService } from '../../ai/services/ai-domain-analysis.service';

import { DomainAnalysisResult } from '../types/domain-analysis-result.type';

import { DomainStatsService } from './domain-stats.service';

import { DomainClassificationService } from './domain-classification.service';

@Injectable()
export class DomainAnalyticsService {
  constructor(
    private readonly aiDomainAnalysisService: AiDomainAnalysisService,

    private readonly domainStatsService: DomainStatsService,

    private readonly domainClassificationService: DomainClassificationService,
  ) {}

  // ======================
  // ANALYZE DOMAINS
  // ======================

  async analyzeSessionDomains(data: {
    task: string;

    events: any[];
  }): Promise<DomainAnalysisResult> {
    // ======================
    // DOMAIN STATS
    // ======================

    const domainStats = this.domainStatsService.buildDomainStats(data.events);

    console.log('DOMAIN STATS:', domainStats);

    // ======================
    // BASE ANALYSIS
    // ======================

    const analyzedDomains = this.domainClassificationService.analyzeDomains(
      data.task,
      domainStats,
    );

    // ======================
    // AI ANALYSIS
    // ======================

    const aiAnalysis = await this.aiDomainAnalysisService.analyzeDomains({
      task: data.task,

      domains: domainStats,
    });

    // ======================
    // MERGE AI + BASE
    // ======================

    const mergedDomains = analyzedDomains.map((domain) => {
      const ai = aiAnalysis.domains.find((d) => d.domain === domain.domain);

      // ======================
      // NO AI MATCH
      // ======================

      if (!ai) {
        return domain;
      }

      // ======================
      // MERGED
      // ======================

      return {
        ...domain,

        category: ai.category,

        relevant: ai.relevant,

        isDistraction: ai.isDistraction,

        aiConfidence: ai.confidence,

        aiReason: ai.reason,
      };
    });

    // ======================
    // DISTRACTIONS
    // ======================

    const distractions = mergedDomains.filter((d) => d.isDistraction).length;

    // ======================
    // TOP DOMAINS
    // ======================

    const topDomains = mergedDomains
      .sort((a, b) => b.time - a.time)
      .slice(0, 5);

    console.log('TOP DOMAINS:', topDomains);

    // ======================
    // RETURN
    // ======================

    return {
      distractions,

      topDomains,
    };
  }
}
