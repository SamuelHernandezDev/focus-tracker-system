//frontend/modules/focus/hooks/useFocusSession.ts
'use client';

import { useState, useEffect, useRef } from 'react';

import {
  startSessionRequest,
  stopSessionRequest,
  sendEventRequest,
} from '@/services/session/session.service';

import {
  saveSessionId,
  clearSessionId,
} from '@/services/utils/session-storage';

import { useWebContextTracking } from './useWebContextTracking';

export function useFocusSession() {
  // ======================
  // STATE
  // ======================

  const [sessionId, setSessionId] = useState<string | null>(null);

  const [sessionActive, setSessionActive] = useState(false);

  const [loading, setLoading] = useState(false);

  // ======================
  // REFS
  // ======================

  const sessionIdRef = useRef<string | null>(null);

  const lastActivityRef = useRef<number>(Date.now());

  const isIdleRef = useRef<boolean>(false);

  // ======================
  // WEB CONTEXT TRACKING
  // ======================

  useWebContextTracking({
    enabled: sessionActive,

    sessionId,
  });

  // ======================
  // START SESSION
  // ======================

  const start = async (
    task: string,

    allowedSites: string[]
  ) => {
    try {
      setLoading(true);

      const res = await startSessionRequest({
        task,

        allowedSites,
      });

      // ======================
      // SESSION STATE
      // ======================

      setSessionId(res.id);

      sessionIdRef.current = res.id;

      setSessionActive(true);

      saveSessionId(res.id);

      // ======================
      // RESET ACTIVITY
      // ======================

      lastActivityRef.current = Date.now();

      isIdleRef.current = false;
    } catch (err) {
      console.error(err);

      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ======================
  // STOP SESSION
  // ======================

  const stop = async () => {
    const id = sessionIdRef.current;

    if (!id) return;

    try {
      setLoading(true);

      // ======================
      // FRONTEND RESET
      // ======================
      setSessionActive(false);

      setSessionId(null);

      sessionIdRef.current = null;

      clearSessionId();

      // ======================
      // STOP BACKEND SESSION
      // ======================

      const result = await stopSessionRequest(id);

      console.log('SESSION RESULT:', result);

      return result;
    } catch (err) {
      console.error(err);

      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ======================
  // ACTIVE HEARTBEAT
  // ======================

  useEffect(() => {
    if (!sessionActive) return;

    const interval = setInterval(() => {
      const id = sessionIdRef.current;

      if (!id) return;

      // ======================
      // NOT IDLE
      // ======================

      if (!isIdleRef.current) {
        sendEventRequest({
          sessionId: id,

          type: 'ACTIVE',

          timestamp: Date.now(),
        });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [sessionActive]);

  // ======================
  // IDLE DETECTION
  // ======================

  useEffect(() => {
    if (!sessionActive) return;

    // ======================
    // MARK ACTIVITY
    // ======================

    const markActivity = () => {
      lastActivityRef.current = Date.now();

      // ======================
      // RETURN FROM IDLE
      // ======================

      if (isIdleRef.current) {
        isIdleRef.current = false;

        const id = sessionIdRef.current;

        if (!id) return;

        sendEventRequest({
          sessionId: id,

          type: 'ACTIVE',

          timestamp: Date.now(),
        });
      }
    };

    // ======================
    // EVENTS
    // ======================

    const events = ['mousemove', 'keydown', 'click'];

    events.forEach((event) => {
      window.addEventListener(event, markActivity);
    });

    // ======================
    // IDLE CHECK LOOP
    // ======================

    const interval = setInterval(() => {
      const id = sessionIdRef.current;

      if (!id) return;

      const now = Date.now();

      const isIdle = now - lastActivityRef.current > 10000;

      // ======================
      // ENTER IDLE
      // ======================

      if (isIdle && !isIdleRef.current) {
        isIdleRef.current = true;

        sendEventRequest({
          sessionId: id,

          type: 'IDLE',

          timestamp: Date.now(),
        });
      }
    }, 3000);

    // ======================
    // CLEANUP
    // ======================

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, markActivity);
      });

      clearInterval(interval);
    };
  }, [sessionActive]);

  return {
    sessionId,

    sessionActive,

    loading,

    start,

    stop,
  };
}
