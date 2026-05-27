//backend/src/tracking/types/tracking-metrics.type.ts

export type TrackingMetrics = {
  keyboardEvents: number;

  mouseEvents: number;

  totalClicks: number;

  totalInteractions: number;

  totalInteractionTime: number;

  activeDomains: string[];

  activeDomainsCount: number;

  averageInteractionRate: number;
};
