//frontend\modules\focus\hooks\useFocusSession.ts
"use client";

import { useState, useEffect, useRef } from "react";
import {
  startSessionRequest,
  stopSessionRequest,
  sendEventRequest,
} from "@/services/session/session.service";

import {
  saveSessionId,
  clearSessionId,
} from "@/services/utils/session-storage";

export function useFocusSession() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [sessionActive, setSessionActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const sessionIdRef = useRef<string | null>(null);

  const lastActivityRef = useRef<number>(Date.now());
  const isIdleRef = useRef<boolean>(false);

  // ======================
  // START
  // ======================
  const start = async (task: string, allowedSites: string[]) => {
    try {
      setLoading(true);

      const res = await startSessionRequest({ task, allowedSites });

      setSessionId(res.id);
      sessionIdRef.current = res.id; 

      setSessionActive(true);

      saveSessionId(res.id);

      window.postMessage({
        type: "FOCUS_SESSION",
        sessionId: res.id,
      }, "*");

      // reset estado
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
  // STOP
  // ======================
  const stop = async () => {
    const id = sessionIdRef.current;
    if (!id) return;

    try {
      setLoading(true);

      const result = await stopSessionRequest(id);
      console.log("SESSION RESULT:", result);

      clearSessionId();

      setSessionId(null);
      sessionIdRef.current = null; 

      setSessionActive(false);
      
      window.postMessage({
        type: "FOCUS_SESSION",
        sessionId: null,
      }, "*");

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

      if (!isIdleRef.current) {
        sendEventRequest({
          sessionId: id,
          type: "ACTIVE",
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

    const markActivity = () => {
      lastActivityRef.current = Date.now();

      if (isIdleRef.current) {
        isIdleRef.current = false;

        const id = sessionIdRef.current;
        if (!id) return;

        sendEventRequest({
          sessionId: id,
          type: "ACTIVE",
        });
      }
    };

    const events = ["mousemove", "keydown", "click"];

    events.forEach((e) =>
      window.addEventListener(e, markActivity)
    );

    const interval = setInterval(() => {
      const id = sessionIdRef.current;
      if (!id) return;

      const now = Date.now();
      const isIdle = now - lastActivityRef.current > 10000;

      if (isIdle && !isIdleRef.current) {
        isIdleRef.current = true;

        sendEventRequest({
          sessionId: id,
          type: "IDLE",
        });
      }
    }, 3000);

    return () => {
      events.forEach((e) =>
        window.removeEventListener(e, markActivity)
      );
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