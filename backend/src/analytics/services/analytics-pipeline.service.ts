//backend/src/analytics/services/analytics-pipeline.service.ts

import { Injectable } from '@nestjs/common';

import { EventType } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';

import { DomainAnalyticsService } from '../../domains/services/domain-analytics.service';

import { TrackingAnalyticsService } from '../../tracking/services/tracking-analytics.service';

import { AttentionAnalyticsService } from '../../attention/services/attention-analytics.service';

import { AnalyticsAggregationService } from './analytics-aggregation.service';

import { AiBehaviorAnalysisService } from '../../ai/services/ai-behavior-analysis.service';

@Injectable()
export class AnalyticsPipelineService {
  constructor(
    private readonly prisma: PrismaService,

    private readonly domainAnalyticsService: DomainAnalyticsService,

    private readonly trackingAnalyticsService: TrackingAnalyticsService,

    private readonly attentionAnalyticsService: AttentionAnalyticsService,

    private readonly analyticsAggregationService: AnalyticsAggregationService,

    private readonly aiBehaviorAnalysisService: AiBehaviorAnalysisService,
  ) {}

  // ======================
  // PROCESS SESSION
  // ======================

  async processSession(sessionId: string) {
    // ======================
    // LOAD SESSION
    // ======================

    const session = await this.prisma.session.findUnique({
      where: {
        id: sessionId,
      },
    });

    // ======================
    // LOAD EVENTS
    // ======================

    const events = await this.prisma.event.findMany({
      where: {
        sessionId,
      },

      orderBy: {
        timestamp: 'asc',
      },
    });

    // ======================
    // LOAD ATTENTION SEGMENTS
    // ======================

    const attentionSegments = await this.prisma.attentionSegment.findMany({
      where: {
        sessionId,
      },
    });

    // ======================
    // INVALID SESSION
    // ======================

    if (!session || events.length === 0) {
      return null;
    }

    // ======================
    // TIME METRICS
    // ======================

    let focusTime = 0;

    let idleTime = 0;

    let interruptions = 0;

    // ======================
    // PROCESS EVENTS
    // ======================

    for (let i = 0; i < events.length - 1; i++) {
      const current = events[i];

      const next = events[i + 1];

      const diff = (Number(next.timestamp) - Number(current.timestamp)) / 1000;

      // ======================
      // ACTIVE
      // ======================

      if (current.type === EventType.ACTIVE) {
        focusTime += diff;
      }

      // ======================
      // IDLE
      // ======================

      if (current.type === EventType.IDLE) {
        idleTime += diff;

        interruptions++;
      }
    }

    // ======================
    // LAST EVENT
    // ======================

    const lastEvent = events[events.length - 1];

    if (session.endTime && lastEvent) {
      const diff =
        (session.endTime.getTime() - Number(lastEvent.timestamp)) / 1000;

      if (lastEvent.type === EventType.ACTIVE) {
        focusTime += diff;
      }

      if (lastEvent.type === EventType.IDLE) {
        idleTime += diff;
      }
    }

    // ======================
    // DOMAIN ANALYTICS
    // ======================

    const domainAnalysis =
      await this.domainAnalyticsService.analyzeSessionDomains({
        task: session.task,

        events,
      });

    // ======================
    // TRACKING ANALYTICS
    // ======================

    const trackingMetrics =
      this.trackingAnalyticsService.buildTrackingMetrics(events);

    // ======================
    // ATTENTION ANALYTICS
    // ======================

    const attentionMetrics =
      this.attentionAnalyticsService.buildAttentionMetrics(attentionSegments);

    // ======================
    // SCORE
    // ======================

    const totalTime = focusTime + idleTime;

    let score = totalTime > 0 ? (focusTime / totalTime) * 100 : 0;

    // ======================
    // DISTRACTION PENALTY
    // ======================

    score -= domainAnalysis.distractions * 5;

    score = Math.max(0, Math.round(score));

    // ======================
    // SAVE DOMAINS
    // ======================

    await this.prisma.sessionDomain.deleteMany({
      where: {
        sessionId,
      },
    });

    if (domainAnalysis.topDomains.length > 0) {
      await this.prisma.sessionDomain.createMany({
        data: domainAnalysis.topDomains.map((d: any) => ({
          sessionId,

          domain: d.domain,

          time: d.time,

          category: d.category,

          relevant: d.relevant,

          isDistraction: d.isDistraction,

          aiConfidence: d.aiConfidence,

          aiReason: d.aiReason,
        })),
      });
    }

    // ======================
    // BEHAVIOR AGGREGATION
    // ======================

    const behavior =
      await this.analyticsAggregationService.buildSessionBehavior(sessionId);

    // ======================
    // AI SESSION ANALYSIS
    // ======================

    const aiAnalysis =
      await this.aiBehaviorAnalysisService.analyzeBehavior(behavior);

    console.log('AI SESSION ANALYSIS:', aiAnalysis);

    // ======================
    // SAVE SESSION
    // ======================

    const updatedSession = await this.prisma.session.update({
      where: {
        id: sessionId,
      },

      data: {
        // ======================
        // FOCUS
        // ======================

        focusTime: Math.round(focusTime / 60),

        idleTime: Math.round(idleTime / 60),

        interruptions,

        distractions: domainAnalysis.distractions,

        score,

        // ======================
        // ATTENTION
        // ======================

        attentiveTime: attentionMetrics.attentiveTime,

        distractedTime: attentionMetrics.distractedTime,

        phoneTime: attentionMetrics.phoneTime,

        absentTime: attentionMetrics.absentTime,

        attentionScore: attentionMetrics.attentionScore,

        // ======================
        // TRACKING
        // ======================

        keyboardEvents: trackingMetrics.keyboardEvents,

        mouseEvents: trackingMetrics.mouseEvents,

        totalClicks: trackingMetrics.totalClicks,

        totalInteractions: trackingMetrics.totalInteractions,

        totalInteractionTime: trackingMetrics.totalInteractionTime,

        activeDomainsCount: trackingMetrics.activeDomainsCount,

        averageInteractionRate: trackingMetrics.averageInteractionRate,

        // ======================
        // AI
        // ======================

        feedback: aiAnalysis.feedback,

        summary: aiAnalysis.summary,
      },
    });

    // ======================
    // RESPONSE
    // ======================

    return {
      ...updatedSession,

      tracking: trackingMetrics,

      attention: attentionMetrics,

      topDomains: domainAnalysis.topDomains,

      behavior,
    };
  }
}
