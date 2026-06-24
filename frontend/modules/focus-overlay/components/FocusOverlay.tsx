//frontend\modules\focus-overlay\components\FocusOverlay.tsx
'use client';

import { Brain, Pause, Square, Target } from 'lucide-react';

import { useFocusOverlayStore } from '../store/focusOverlayStore';
import { useSessionTimer } from '../hooks/useSessionTimer';

import { stopCurrentSession } from '../services/overlay-actions.service';

export function FocusOverlay() {
  const {
    task,

    sessionActive,

    sessionId,

    faceDetected,

    attentionState,

    startedAt,
  } = useFocusOverlayStore();

  const timer = useSessionTimer(startedAt);

  return (
    <div
      style={{
        height: '100vh',
        width: '100%',

        background: 'rgba(0, 0, 0, 0.84)',

        color: 'white',

        padding: '14px',

        boxSizing: 'border-box',

        display: 'flex',
        flexDirection: 'column',

        fontFamily: 'Inter, sans-serif',
      }}
    >
      {/* HEADER */}

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <div
            style={{
              width: '30px',
              height: '30px',

              borderRadius: '999px',

              background: 'linear-gradient(135deg,#4f46e5,#7c3aed)',

              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',

              boxShadow: '0 4px 12px rgba(124,58,237,.4)',
            }}
          >
            <Brain size={15} color="white" />
          </div>

          <div>
            <div
              style={{
                fontSize: '12px',
                fontWeight: 600,
              }}
            >
              {sessionActive ? 'Focus Active' : 'Session Stopped'}
            </div>

            <div
              style={{
                fontSize: '11px',
                color: '#4ade80',
              }}
            >
              {sessionActive ? 'Tracking Online' : 'Waiting Session'}
            </div>
          </div>
        </div>

        <div
          style={{
            fontSize: '30px',
            fontWeight: 700,
            letterSpacing: '-1px',
          }}
        >
          {timer}
        </div>
      </div>

      {/* TASK */}

      <div
        style={{
          marginTop: '14px',

          background: 'rgba(255,255,255,0.08)',

          border: '1px solid rgba(255,255,255,0.10)',

          borderRadius: '12px',

          padding: '10px',

          display: 'flex',
          alignItems: 'center',

          gap: '8px',
        }}
      >
        <Target size={14} color="#60a5fa" />

        <span
          style={{
            fontSize: '13px',

            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {task || 'No task selected'}
        </span>
      </div>

      {sessionId && (
        <div
          style={{
            marginTop: '8px',

            fontSize: '11px',

            opacity: 0.6,
          }}
        >
          Session #{sessionId.slice(0, 8)}
        </div>
      )}

      {/* STATUS BADGES */}

      <div
        style={{
          marginTop: '10px',

          display: 'flex',
          gap: '8px',

          flexWrap: 'wrap',
        }}
      >
        <div
          style={{
            background: faceDetected
              ? 'rgba(34,197,94,.15)'
              : 'rgba(239,68,68,.15)',

            border: faceDetected
              ? '1px solid rgba(34,197,94,.25)'
              : '1px solid rgba(239,68,68,.25)',

            color: faceDetected ? '#4ade80' : '#f87171',

            borderRadius: '999px',

            padding: '4px 10px',

            fontSize: '11px',

            fontWeight: 600,
          }}
        >
          {faceDetected ? 'Face Detected' : 'No Face'}
        </div>

        <div
          style={{
            background:
              attentionState === 'ATTENTIVE'
                ? 'rgba(59,130,246,.15)'
                : 'rgba(245,158,11,.15)',

            border:
              attentionState === 'ATTENTIVE'
                ? '1px solid rgba(59,130,246,.25)'
                : '1px solid rgba(245,158,11,.25)',

            color: attentionState === 'ATTENTIVE' ? '#60a5fa' : '#fbbf24',

            borderRadius: '999px',

            padding: '4px 10px',

            fontSize: '11px',

            fontWeight: 600,
          }}
        >
          {attentionState}
        </div>
      </div>

      {/* ACTIONS */}

      <div
        style={{
          marginTop: 'auto',

          display: 'flex',
          gap: '8px',
        }}
      ></div>
    </div>
  );
}
