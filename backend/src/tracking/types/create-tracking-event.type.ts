//backend/src/tracking/types/create-tracking-event.type.ts

export type CreateTrackingEvent = {
  sessionId: string;

  value: string;

  timestamp: number;
};
