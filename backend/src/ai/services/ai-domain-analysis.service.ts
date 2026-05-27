//backend/src/ai/services/ai-domain-analysis.service.ts

import { Injectable } from '@nestjs/common';

import { AiService } from '../services/ai.service';

import { buildDomainAnalysisPrompt } from '../prompts/domain-analysis.prompt';

import { safeJsonParse } from '../utils/safe-json-parse';

import { DomainInput, AIResponse } from '../types/ai-domain-analysis.type';

@Injectable()
export class AiDomainAnalysisService {
  constructor(private readonly aiService: AiService) {}

  // ======================
  // ANALYZE DOMAINS
  // ======================

  async analyzeDomains(data: {
    task: string;

    domains: DomainInput[];
  }): Promise<AIResponse> {
    // ======================
    // EMPTY
    // ======================

    if (!data.domains.length) {
      return {
        domains: [],
      };
    }

    // ======================
    // BUILD PROMPT
    // ======================

    const prompt = buildDomainAnalysisPrompt(data);

    try {
      // ======================
      // AI CALL
      // ======================

      const content = await this.aiService.generateJSON({
        system: 'You classify website domains for productivity relevance.',

        prompt,
      });

      // ======================
      // PARSE
      // ======================

      const parsed = safeJsonParse(content);

      // ======================
      // VALIDATION
      // ======================

      if (!parsed?.domains || !Array.isArray(parsed.domains)) {
        throw new Error('Invalid AI structure');
      }

      // ======================
      // RETURN
      // ======================

      return {
        domains: parsed.domains,
      };
    } catch (err) {
      console.error('AI DOMAIN ANALYSIS ERROR:', err);

      // ======================
      // FALLBACK
      // ======================

      return {
        domains: data.domains.map((d) => ({
          domain: d.domain,

          category: 'NEUTRAL',

          relevant: false,

          isDistraction: false,

          confidence: 0.3,

          reason: 'Fallback classification',
        })),
      };
    }
  }
}
