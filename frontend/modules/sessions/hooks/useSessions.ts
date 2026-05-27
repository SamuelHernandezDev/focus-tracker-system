//frontend/modules/sessions/hooks/useSessions.ts
'use client';

import { useEffect, useState } from 'react';

import { getSessionsRequest } from '@/services/session/session.service';

export function useSessions() {
  const [sessions, setSessions] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  const fetchSessions = async () => {
    try {
      const data = await getSessionsRequest();

      console.log('RAW SESSIONS:', data);

      const mapped = data.map((s: any) => {
        const start = new Date(s.startTime);

        const end = s.endTime ? new Date(s.endTime) : null;

        const duration = end
          ? Math.round((end.getTime() - start.getTime()) / 60000)
          : 0;

        return {
          // ======================
          // SESSION
          // ======================

          id: s.id,

          task: s.task,

          date: s.startTime,

          duration,

          // ======================
          // PRODUCTIVITY
          // ======================

          score: s.score ?? 0,

          focusTime: s.focusTime ?? 0,

          idleTime: s.idleTime ?? 0,

          distractions: s.distractions ?? 0,

          // ======================
          // ATTENTION
          // ======================

          attentionScore: s.attentionScore ?? 0,

          attentiveTime: s.attentiveTime ?? 0,

          distractedTime: s.distractedTime ?? 0,

          phoneTime: s.phoneTime ?? 0,

          absentTime: s.absentTime ?? 0,

          // ======================
          // TRACKING
          // ======================

          totalInteractions: s.totalInteractions ?? 0,

          averageInteractionRate: s.averageInteractionRate ?? 0,

          // ======================
          // AI
          // ======================

          summary: s.summary ?? '',

          feedback: s.feedback ?? '',

          // ======================
          // DOMAINS
          // ======================

          domains: s.domains ?? [],
        };
      });

      setSessions(mapped);

      console.log('MAPPED SESSIONS:', mapped);
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
