//backend/src/analytics/services/analytics-aggregation.service.ts

import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import { TrackingAnalyticsService } from '../../tracking/services/tracking-analytics.service';

import { SessionBehavior } from '../types/session-behavior.type';

import { AnalyticsInsightsService } from './analytics-insights.service';

@Injectable()
export class AnalyticsAggregationService {
  constructor(
    private readonly prisma: PrismaService,

    private readonly trackingAnalyticsService: TrackingAnalyticsService,

    private readonly analyticsInsightsService: AnalyticsInsightsService,
  ) {}

  // ======================
  // BUILD SESSION BEHAVIOR
  // ======================

  async buildSessionBehavior(sessionId: string): Promise<SessionBehavior> {
    // ======================
    // SESSION
    // ======================

    const session = await this.prisma.session.findUnique({
      where: {
        id: sessionId,
      },

      include: {
        domains: true,

        events: true,
      },
    });

    // ======================
    // INVALID
    // ======================

    if (!session) {
      throw new Error('Session not found');
    }

    // ======================
    // TRACKING METRICS
    // ======================

    const trackingMetrics = this.trackingAnalyticsService.buildTrackingMetrics(
      session.events,
    );

    // ======================
    // TOTAL ATTENTION TIME
    // ======================

    const totalTrackedTime =
      (session.attentiveTime || 0) +
      (session.distractedTime || 0) +
      (session.phoneTime || 0) +
      (session.absentTime || 0);

    // ======================
    // SESSION DURATION
    // ======================

    const duration = session.endTime
      ? Math.round(
          (session.endTime.getTime() - session.startTime.getTime()) / 1000 / 60,
        )
      : 0;

    // ======================
    // DOMAINS
    // ======================

    const domains = session.domains.map((domain) => ({
      domain: domain.domain,

      time: domain.time,

      category: domain.category,

      relevant: domain.relevant,

      isDistraction: domain.isDistraction,

      aiConfidence: domain.aiConfidence || undefined,

      aiReason: domain.aiReason || undefined,
    }));

    // ======================
    // ATTENTION
    // ======================

    const attention = {
      attentiveTime: session.attentiveTime || 0,

      distractedTime: session.distractedTime || 0,

      phoneTime: session.phoneTime || 0,

      absentTime: session.absentTime || 0,

      totalTrackedTime,

      attentionScore: session.attentionScore || 0,
    };

    // ======================
    // BASE BEHAVIOR
    // ======================

    const baseBehavior: SessionBehavior = {
      // ======================
      // SESSION
      // ======================

      sessionId: session.id,

      task: session.task,

      startTime: session.startTime,

      endTime: session.endTime,

      duration,

      // ======================
      // PRODUCTIVITY
      // ======================

      focusTime: session.focusTime || 0,

      idleTime: session.idleTime || 0,

      interruptions: session.interruptions || 0,

      distractions: session.distractions || 0,

      score: session.score || 0,

      // ======================
      // DOMAINS
      // ======================

      domains,

      // ======================
      // ATTENTION
      // ======================

      attention,

      // ======================
      // TRACKING
      // ======================

      tracking: trackingMetrics,

      // ======================
      // AI
      // ======================

      feedback: session.feedback || undefined,

      summary: session.summary || undefined,

      insights: [],
    };

    // ======================
    // INSIGHTS
    // ======================

    const insights = this.analyticsInsightsService.buildInsights(baseBehavior);

    // ======================
    // RETURN
    // ======================

    return {
      ...baseBehavior,

      insights,
    };
  }
}
