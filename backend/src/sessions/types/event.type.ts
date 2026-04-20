//backend\src\sessions\types\event.type.ts
export type EventType = 'ACTIVE' | 'IDLE' | 'TAB_CHANGE';

export type Event = {
  id: string;
  sessionId: string;
  type: EventType;
  value?: string; // dominio (ej: youtube.com)
  timestamp: Date;
};