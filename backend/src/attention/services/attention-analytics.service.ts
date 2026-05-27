//backend/src/attention/services/attention-analytics.service.ts

import { Injectable } from '@nestjs/common';

import { AttentionState } from '@prisma/client';

import { AttentionMetrics } from '../types/attention-metrics.type';

@Injectable()
export class AttentionAnalyticsService {
  // ======================
  // BUILD METRICS
  // ======================

  buildAttentionMetrics(segments: any[]): AttentionMetrics {
    let attentiveTime = 0;

    let distractedTime = 0;

    let phoneTime = 0;

    let absentTime = 0;

    for (const segment of segments) {
      switch (segment.state) {
        case AttentionState.ATTENTIVE:
          attentiveTime += segment.duration;
          break;

        case AttentionState.DISTRACTED:
          distractedTime += segment.duration;
          break;

        case AttentionState.PHONE:
          phoneTime += segment.duration;
          break;

        case AttentionState.ABSENT:
          absentTime += segment.duration;
          break;
      }
    }

    // ======================
    // TOTAL TIME
    // ======================

    const totalAttentionTime =
      attentiveTime + distractedTime + phoneTime + absentTime;

    // ======================
    // ATTENTION SCORE
    // ======================

    const attentionScore =
      totalAttentionTime > 0
        ? Number(((attentiveTime / totalAttentionTime) * 100).toFixed(2))
        : 0;

    // ======================
    // DOMINANT STATE
    // ======================

    const states = [
      {
        state: 'ATTENTIVE',
        value: attentiveTime,
      },

      {
        state: 'DISTRACTED',
        value: distractedTime,
      },

      {
        state: 'PHONE',
        value: phoneTime,
      },

      {
        state: 'ABSENT',
        value: absentTime,
      },
    ];

    const dominantState = states.sort((a, b) => b.value - a.value)[0].state;

    return {
      attentiveTime,

      distractedTime,

      phoneTime,

      absentTime,

      attentionScore,

      dominantState,

      totalAttentionTime,
    };
  }
}
