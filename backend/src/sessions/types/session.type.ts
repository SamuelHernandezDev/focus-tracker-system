//backend\src\sessions\types\session.type.ts
export type Session = {
    id: string;
    userId: string;
    task: string;
    allowedSites?: string[];
  
    startTime: Date;
    endTime: Date | null;
  
    // ======================
    // METRICS
    // ======================
    focusTime?: number;
    idleTime?: number;
    interruptions?: number;
    distractions?: number;
    score?: number;

    topDomains?: {
      domain: string;
      time: number;
      category: string;
      relevant: boolean;
      isDistraction: boolean;
    }[];
  
    // ======================
    // FUTURE (AI)
    // ======================
    feedback?: string;
  };