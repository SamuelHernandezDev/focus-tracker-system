//frontend/modules/focus/hooks/useAttentionStream.ts
'use client';

import { useEffect, useRef } from 'react';

import { AttentionState } from '../types/attention-state';

import { useAttentionSocket } from './useAttentionSocket';

// =========================
// TYPES
// =========================
type Props = {
  enabled: boolean;

  sessionId?: string;

  attentionState: AttentionState;
};

type Segment = {
  state: AttentionState;

  startedAt: number;

  emitted: boolean;
};

// =========================
// THRESHOLDS
// =========================
const MIN_DURATION = {
  [AttentionState.ATTENTIVE]: 0,

  [AttentionState.DISTRACTED]: 3000,

  [AttentionState.PHONE]: 4000,

  [AttentionState.ABSENT]: 5000,
};

// =========================
// HOOK
// =========================
export const useAttentionStream = ({
  enabled,

  sessionId,

  attentionState,
}: Props) => {
  // =========================
  // SOCKET
  // =========================
  const { connected, emit } = useAttentionSocket(enabled);

  // =========================
  // CURRENT SEGMENT
  // =========================
  const segmentRef = useRef<Segment | null>(null);

  const pendingTransitionRef = useRef<{
    state: AttentionState;

    since: number;
  } | null>(null);

  const attentionStateRef = useRef(attentionState);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    attentionStateRef.current = attentionState;
  }, [attentionState]);

  // =========================
  // ENGINE LOOP
  // =========================
  useEffect(() => {
    // =========================
    // REQUIREMENTS
    // =========================
    if (!enabled) return;

    if (!connected) return;

    if (!sessionId) return;

    // =========================
    // LOOP
    // =========================
    intervalRef.current = setInterval(() => {
      const now = Date.now();

      const nextState = attentionStateRef.current;

      // =========================
      // FIRST SEGMENT
      // =========================
      if (!segmentRef.current) {
        segmentRef.current = {
          state: nextState,

          startedAt: now,

          emitted: false,
        };

        return;
      }

      const current = segmentRef.current;

      // =========================
      // SAME STATE
      // =========================
      if (current.state === nextState) {
        const duration = now - current.startedAt;

        const minDuration = MIN_DURATION[current.state] || 0;

        console.log('Current segment:', {
          state: current.state,

          duration,

          emitted: current.emitted,
        });

        // =========================
        // EMIT ON THRESHOLD
        // =========================
        if (!current.emitted && duration >= minDuration) {
          emit('attention:event', {
            sessionId,

            state: current.state,

            startedAt: current.startedAt,

            endedAt: now,

            duration,

            timestamp: now,
          });

          current.emitted = true;

          console.log('Attention segment emitted:', {
            state: current.state,

            duration,
          });
        }

        // =========================
        // CLEAR PENDING
        // =========================
        pendingTransitionRef.current = null;

        return;
      }

      // =========================
      // PENDING TRANSITION
      // =========================
      const pending = pendingTransitionRef.current;

      // =========================
      // CREATE PENDING
      // =========================
      if (!pending || pending.state !== nextState) {
        pendingTransitionRef.current = {
          state: nextState,

          since: now,
        };

        console.log('Pending transition:', nextState);

        return;
      }

      // =========================
      // PENDING DURATION
      // =========================
      const pendingDuration = now - pending.since;

      console.log('Pending duration:', {
        state: pending.state,

        duration: pendingDuration,
      });

      // =========================
      // GRACE PERIOD
      // =========================
      if (pendingDuration < 1500) {
        return;
      }

      console.log('Attention state confirmed:', {
        from: current.state,

        to: nextState,
      });

      // =========================
      // APPLY TRANSITION
      // =========================
      segmentRef.current = {
        state: nextState,

        startedAt: now,

        emitted: false,
      };

      // =========================
      // CLEAR PENDING
      // =========================
      pendingTransitionRef.current = null;
    }, 250);

    // =========================
    // CLEANUP
    // =========================
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [enabled, connected, sessionId, emit]);

  // =========================
  // CLEANUP FINAL SEGMENT
  // =========================
  useEffect(() => {
    return () => {
      // =========================
      // SESSION DISABLED
      // =========================
      if (!enabled) {
        return;
      }

      // =========================
      // NO SEGMENT
      // =========================
      if (!segmentRef.current) {
        return;
      }

      const current = segmentRef.current;

      // =========================
      // ALREADY EMITTED
      // =========================
      if (current.emitted) {
        return;
      }

      const now = Date.now();

      const duration = now - current.startedAt;

      const minDuration = MIN_DURATION[current.state] || 0;

      console.log('Threshold check:', {
        state: current.state,

        duration,

        required: minDuration,

        ready: duration >= minDuration,
      });

      // =========================
      // FINAL EMIT
      // =========================
      if (duration >= minDuration) {
        emit('attention:event', {
          sessionId,

          state: current.state,

          startedAt: current.startedAt,

          endedAt: now,

          duration,

          timestamp: now,
        });

        console.log('Final attention segment emitted:', {
          state: current.state,

          duration,
        });
      }
    };
  }, [enabled, emit, sessionId]);
};
