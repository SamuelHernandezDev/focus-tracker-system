//backend/src/attention/types/attention-metrics.type.ts

export type AttentionMetrics = {
  attentiveTime: number;

  distractedTime: number;

  phoneTime: number;

  absentTime: number;

  attentionScore: number;

  dominantState: string;

  totalAttentionTime: number;
};
