//backend/src/domains/services/domain-stats.service.ts

import { Injectable } from '@nestjs/common';

import { EventType } from '@prisma/client';

import { normalizeDomain } from '../utils/normalize-domain';

import { DomainStats } from '../types/domain-stats.type';

@Injectable()
export class DomainStatsService {
  // ======================
  // BUILD DOMAIN STATS
  // ======================

  buildDomainStats(events: any[]): DomainStats[] {
    const domainTime: Record<string, number> = {};

    for (const event of events) {
      // ======================
      // TRACKING EVENTS ONLY
      // ======================

      if (event.type !== EventType.TRACKING_ACTIVITY || !event.value) {
        continue;
      }

      try {
        const parsed = JSON.parse(event.value);

        // ======================
        // DOMAIN
        // ======================

        const domain = normalizeDomain(parsed.domain);

        if (!domain) {
          continue;
        }

        // ======================
        // DURATION
        // ======================

        const duration = Number(parsed.duration) || 0;

        if (duration <= 0 || duration > 3600) {
          continue;
        }

        // ======================
        // ACCUMULATE
        // ======================

        domainTime[domain] = (domainTime[domain] || 0) + duration;
      } catch (err) {
        console.error('DOMAIN STATS PARSE ERROR:', err);
      }
    }

    return Object.entries(domainTime).map(([domain, time]) => ({
      domain,

      time,
    }));
  }
}
