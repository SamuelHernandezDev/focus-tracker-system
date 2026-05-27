//frontend/modules/focus/hooks/useSessionDetails.ts

'use client';

import { useEffect, useState } from 'react';

import { getSessionByIdRequest } from '@/services/session/session.service';

// ======================
// TYPES
// ======================

export type SessionDomain = {
  id: string;

  sessionId: string;

  domain: string;

  time: number;

  category:
    | 'PRODUCTIVE'
    | 'SUPPORT'
    | 'LEARNING'
    | 'NEUTRAL'
    | 'SOCIAL'
    | 'DISTRACTION';

  relevant: boolean;

  isDistraction: boolean;

  aiConfidence?: number | null;

  aiReason?: string | null;

  createdAt: string;
};

export type SessionEvent = {
  id: string;

  sessionId: string;

  type: 'ACTIVE' | 'IDLE' | 'TAB_CHANGE' | 'TRACKING_ACTIVITY';

  value?: string | null;

  timestamp: number;

  createdAt: string;
};

export type SessionDetails = {
  // ======================
  // BASE
  // ======================

  id: string;

  userId: string;

  task: string;

  allowedSites: string[];

  startTime: string;

  endTime?: string | null;

  createdAt: string;

  // ======================
  // PRODUCTIVITY
  // ======================

  focusTime?: number | null;

  idleTime?: number | null;

  interruptions?: number | null;

  distractions?: number | null;

  score?: number | null;

  // ======================
  // ATTENTION
  // ======================

  attentiveTime?: number | null;

  distractedTime?: number | null;

  phoneTime?: number | null;

  absentTime?: number | null;

  attentionScore?: number | null;

  // ======================
  // TRACKING
  // ======================

  keyboardEvents?: number | null;

  mouseEvents?: number | null;

  totalClicks?: number | null;

  totalInteractions?: number | null;

  totalInteractionTime?: number | null;

  activeDomainsCount?: number | null;

  averageInteractionRate?: number | null;

  // ======================
  // AI
  // ======================

  summary?: string | null;

  feedback?: string | null;

  strengths?: string[];

  weaknesses?: string[];

  recommendations?: string[];

  insights?: string[];

  // ======================
  // RELATIONS
  // ======================

  domains: SessionDomain[];

  events: SessionEvent[];
};

// ======================
// HOOK
// ======================

export function useSessionDetails(sessionId?: string | null) {
  const [session, setSession] = useState<SessionDetails | null>(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  // ======================
  // FETCH
  // ======================

  useEffect(() => {
    if (!sessionId) {
      return;
    }

    let mounted = true;

    async function loadSession() {
      try {
        setLoading(true);

        setError(null);

        const data = await getSessionByIdRequest(sessionId!);

        if (!mounted) {
          return;
        }

        setSession(data);
      } catch (err) {
        console.error(err);

        if (!mounted) {
          return;
        }

        setError('Failed to load session details');
      } finally {
        if (!mounted) {
          return;
        }

        setLoading(false);
      }
    }

    loadSession();

    return () => {
      mounted = false;
    };
  }, [sessionId]);

  // ======================
  // DERIVED
  // ======================

  const productiveDomains =
    session?.domains.filter(
      (d) =>
        d.category === 'PRODUCTIVE' ||
        d.category === 'LEARNING' ||
        d.category === 'SUPPORT'
    ) ?? [];

  const distractionDomains =
    session?.domains.filter((d) => d.isDistraction) ?? [];

  const topDomain = session?.domains?.[0] ?? null;

  return {
    session,

    loading,

    error,

    productiveDomains,

    distractionDomains,

    topDomain,
  };
}
