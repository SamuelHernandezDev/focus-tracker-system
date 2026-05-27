//backend/src/analytics/types/session-behavior.type.ts

export type SessionBehavior = {
  // ======================
  // SESSION
  // ======================

  sessionId: string;

  task: string;

  startTime: Date;

  endTime: Date | null;

  duration: number;

  // ======================
  // PRODUCTIVITY
  // ======================

  focusTime: number;

  idleTime: number;

  interruptions: number;

  distractions: number;

  score: number;

  // ======================
  // DOMAIN CONTEXT
  // ======================

  domains: {
    domain: string;

    time: number;

    category: string;

    relevant: boolean;

    isDistraction: boolean;

    aiConfidence?: number;

    aiReason?: string;
  }[];

  // ======================
  // ATTENTION
  // ======================

  attention: {
    attentiveTime: number;

    distractedTime: number;

    phoneTime: number;

    absentTime: number;

    totalTrackedTime: number;

    attentionScore: number;
  };

  // ======================
  // TRACKING
  // ======================

  tracking: {
    keyboardEvents: number;

    mouseEvents: number;

    totalClicks: number;

    totalInteractions: number;

    totalInteractionTime: number;

    activeDomains: string[];

    activeDomainsCount: number;

    averageInteractionRate: number;
  };

  // ======================
  // AI
  // ======================

  feedback?: string;

  summary?: string;

  insights?: string[];
};
