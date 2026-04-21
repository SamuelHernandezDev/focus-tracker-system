//frontend\modules\sessions\components\hooks\useSessions.ts
"use client";

import { useEffect, useState } from "react";
import { getSessionsRequest } from "@/services/session/session.service";

export function useSessions() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSessions = async () => {
    try {
      const data = await getSessionsRequest();

      const mapped = data.map((s: any) => {
        const start = new Date(s.startTime);
        const end = s.endTime ? new Date(s.endTime) : null;
      
        const duration = end
          ? Math.round((end.getTime() - start.getTime()) / 60000)
          : 0;
      
        return {
          id: s.id,
          date: s.startTime,
          duration,
          score: s.score ?? 0,
          interruptions: s.interruptions ?? 0,
      
          focusTime: s.focusTime,
          idleTime: s.idleTime,
          distractions: s.distractions,
          task: s.task,
    
          topDomains: s.topDomains ?? [],
        };
      });

      setSessions(mapped);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  return {
    sessions,
    loading,
    refetch: fetchSessions,
  };
}