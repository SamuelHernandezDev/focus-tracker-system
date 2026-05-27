//backend/src/domains/services/domain-classification.service.ts

import { Injectable } from '@nestjs/common';

import { DomainCategory, AnalyzedDomain } from '../types/analyzed-domain.type';

import { DomainStats } from '../types/domain-stats.type';

@Injectable()
export class DomainClassificationService {
  // ======================
  // DOMAIN RULES
  // ======================

  private readonly DOMAIN_RULES: {
    match: string;

    category: DomainCategory;
  }[] = [
    {
      match: 'github.com',

      category: 'PRODUCTIVE',
    },

    {
      match: 'chatgpt.com',

      category: 'SUPPORT',
    },

    {
      match: 'stackoverflow.com',

      category: 'SUPPORT',
    },

    {
      match: 'youtube.com',

      category: 'LEARNING',
    },

    {
      match: 'spotify.com',

      category: 'NEUTRAL',
    },

    {
      match: 'twitter.com',

      category: 'SOCIAL',
    },
  ];

  // ======================
  // TASK CONTEXT
  // ======================

  private readonly TASK_CONTEXT: Record<string, string[]> = {
    programming: [
      'github.com',

      'chatgpt.com',

      'stackoverflow.com',

      'youtube.com',
    ],
  };

  // ======================
  // CATEGORY
  // ======================

  private getDomainCategory(domain: string): DomainCategory {
    const rule = this.DOMAIN_RULES.find((r) => domain.includes(r.match));

    return rule?.category || 'DISTRACTION';
  }

  // ======================
  // RELEVANCE
  // ======================

  private isDomainRelevant(task: string, domain: string) {
    const rules = this.TASK_CONTEXT[task?.toLowerCase()];

    if (!rules) {
      return false;
    }

    return rules.some((r) => domain.includes(r));
  }

  // ======================
  // ANALYZE DOMAINS
  // ======================

  analyzeDomains(task: string, domains: DomainStats[]): AnalyzedDomain[] {
    return domains.map((d) => {
      const category = this.getDomainCategory(d.domain);

      const relevant = this.isDomainRelevant(task, d.domain);

      let isDistraction = false;

      // ======================
      // DISTRACTION
      // ======================

      if (category === 'DISTRACTION') {
        isDistraction = true;
      }

      // ======================
      // SOCIAL TIME
      // ======================

      if (category === 'SOCIAL' && d.time > 60) {
        isDistraction = true;
      }

      // ======================
      // NEUTRAL TIME
      // ======================

      if (category === 'NEUTRAL' && d.time > 120) {
        isDistraction = true;
      }

      // ======================
      // IRRELEVANT
      // ======================

      if (!relevant && d.time > 60) {
        isDistraction = true;
      }

      return {
        ...d,

        category,

        relevant,

        isDistraction,
      };
    });
  }
}
