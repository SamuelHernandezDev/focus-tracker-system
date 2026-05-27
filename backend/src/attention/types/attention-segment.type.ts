//backend/src/attention/types/attention-segment.type.ts

import { AttentionState } from '../enums/attention-state.enum';

export type AttentionSegmentType = {
  sessionId: string;

  state: AttentionState;

  startedAt: number;

  endedAt: number;

  duration: number;

  timestamp: number;
};
