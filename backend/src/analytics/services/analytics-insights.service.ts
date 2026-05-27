//backend/src/analytics/services/analytics-insights.service.ts

import { Injectable } from '@nestjs/common';

import { SessionBehavior } from '../types/session-behavior.type';

@Injectable()
export class AnalyticsInsightsService {
  // ======================
  // BUILD INSIGHTS
  // ======================

  buildInsights(behavior: SessionBehavior): string[] {
    const insights: string[] = [];

    // ======================
    // TRACKING
    // ======================

    const interactionRate = behavior.tracking.averageInteractionRate;

    const totalInteractions = behavior.tracking.totalInteractions;

    // ======================
    // ATTENTION
    // ======================

    const attentionScore = behavior.attention.attentionScore;

    const distractedTime = behavior.attention.distractedTime;

    const attentiveTime = behavior.attention.attentiveTime;

    // ======================
    // DOMAINS
    // ======================

    const productiveDomains = behavior.domains.filter(
      (d) => d.category === 'PRODUCTIVE' && !d.isDistraction,
    );

    const distractionDomains = behavior.domains.filter((d) => d.isDistraction);

    const learningDomains = behavior.domains.filter(
      (d) => d.category === 'LEARNING',
    );

    // ======================
    // PRODUCTIVE ENGAGEMENT
    // ======================

    if (
      productiveDomains.length > 0 &&
      interactionRate > 4 &&
      attentionScore > 70
    ) {
      insights.push('High productive engagement detected during focused work.');
    }

    // ======================
    // ACTIVE LEARNING
    // ======================

    if (
      learningDomains.length > 0 &&
      attentiveTime > distractedTime &&
      interactionRate > 1
    ) {
      insights.push(
        'Active learning behavior detected through attentive educational browsing.',
      );
    }

    // ======================
    // PASSIVE DISTRACTION
    // ======================

    if (
      distractionDomains.length > 0 &&
      interactionRate < 1 &&
      distractedTime > attentiveTime
    ) {
      insights.push(
        'Passive distraction patterns detected with low interaction and reduced attention.',
      );
    }

    // ======================
    // FRAGMENTED ATTENTION
    // ======================

    if (behavior.interruptions >= 5 && attentionScore < 60) {
      insights.push(
        'Frequent interruptions suggest fragmented attention and unstable focus.',
      );
    }

    // ======================
    // LOW ENGAGEMENT
    // ======================

    if (totalInteractions < 50 && behavior.duration > 10) {
      insights.push(
        'Low interaction density may indicate passive activity or reduced engagement.',
      );
    }

    // ======================
    // DEEP FOCUS
    // ======================

    if (
      attentionScore >= 85 &&
      interactionRate >= 5 &&
      distractionDomains.length === 0
    ) {
      insights.push(
        'Deep focus state detected with sustained interaction and minimal distraction.',
      );
    }

    // ======================
    // PHONE DISTRACTION
    // ======================

    if (behavior.attention.phoneTime > 60) {
      insights.push('Phone usage interrupted the session multiple times.');
    }

    // ======================
    // ABSENCE
    // ======================

    if (behavior.attention.absentTime > 120) {
      insights.push('Extended absence periods reduced session continuity.');
    }

    // ======================
    // HEALTHY SESSION
    // ======================

    if (
      attentionScore > 75 &&
      distractionDomains.length === 0 &&
      interactionRate > 2
    ) {
      insights.push(
        'The session maintained healthy focus and consistent engagement.',
      );
    }

    // ======================
    // FALLBACK
    // ======================

    if (insights.length === 0) {
      insights.push(
        'No strong behavioral patterns were detected during this session.',
      );
    }

    return insights;
  }
}
