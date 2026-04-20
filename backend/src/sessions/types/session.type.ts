//backend\src\sessions\types\session.type.ts
export type Session = {
    id: string;
    userId: string;
    task: string;
    allowedSites?: string[];
    startTime: Date;
    endTime: Date | null;
  
    // métricas (futuro)
    focusTime?: number;
    idleTime?: number;
    interruptions?: number;
    score?: number;
  };