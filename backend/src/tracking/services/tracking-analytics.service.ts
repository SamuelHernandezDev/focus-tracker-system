//backend/src/tracking/services/tracking-analytics.service.ts

import { Injectable } from '@nestjs/common';

import { EventType } from '@prisma/client';

import { TrackingContext } from '../types/tracking-context.type';

import { TrackingMetrics } from '../types/tracking-metrics.type';

@Injectable()
export class TrackingAnalyticsService {
  // ======================
  // TRACKING METRICS
  // ======================

  buildTrackingMetrics(events: any[]): TrackingMetrics {
    let keyboardEvents = 0;

    let mouseEvents = 0;

    let totalClicks = 0;

    let totalInteractionTime = 0;

    const activeDomains = new Set<string>();

    for (const event of events) {
      // ======================
      // TRACKING EVENTS ONLY
      // ======================

      if (event.type !== EventType.TRACKING_ACTIVITY || !event.value) {
        continue;
      }

      try {
        const parsed = JSON.parse(event.value) as TrackingContext;

        // ======================
        // COUNTERS
        // ======================

        keyboardEvents += parsed.keyboard;

        mouseEvents += parsed.mouse;

        totalClicks += parsed.clicks;

        // ======================
        // DURATION
        // ======================

        totalInteractionTime += parsed.duration;

        // ======================
        // ACTIVE DOMAINS
        // ======================

        if (parsed.domain) {
          activeDomains.add(parsed.domain);
        }
      } catch (err) {
        console.error('TRACKING PARSE ERROR:', err);
      }
    }

    // ======================
    // TOTAL INTERACTIONS
    // ======================

    const totalInteractions = keyboardEvents + mouseEvents + totalClicks;

    // ======================
    // INTERACTION RATE
    // ======================

    const averageInteractionRate =
      totalInteractionTime > 0
        ? Number((totalInteractions / totalInteractionTime).toFixed(2))
        : 0;

    return {
      keyboardEvents,

      mouseEvents,

      totalClicks,

      totalInteractions,

      totalInteractionTime,

      activeDomains: Array.from(activeDomains),

      activeDomainsCount: activeDomains.size,

      averageInteractionRate,
    };
  }
}
