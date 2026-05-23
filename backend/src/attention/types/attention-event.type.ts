//backend\src\attention\types\attention-event.type.ts
import { AttentionState } from './attention-state.enum';

export type AttentionEvent = {
  sessionId: string;

  state: AttentionState;

  yaw: number;

  pitch: number;

  gazeX: number;

  gazeY: number;

  confidence: number;

  timestamp: number;
};
