//frontend\modules\focus-overlay\store\focusOverlayStore.ts
import { create } from 'zustand';

type FocusOverlayStore = {
  // =====================
  // SESSION
  // =====================

  sessionActive: boolean;

  task: string;

  sessionId: string | null;

  startedAt: number | null;

  // =====================
  // ATTENTION
  // =====================

  attentionState: string;

  faceDetected: boolean;

  // =====================
  // ACTIONS
  // =====================

  setSessionActive: (value: boolean) => void;

  setTask: (value: string) => void;

  setSessionId: (value: string | null) => void;

  setStartedAt: (value: number | null) => void;

  setAttentionState: (value: string) => void;

  setFaceDetected: (value: boolean) => void;
};

export const useFocusOverlayStore = create<FocusOverlayStore>((set) => ({
  // =====================
  // INITIAL STATE
  // =====================

  sessionActive: false,

  task: '',

  sessionId: null,

  startedAt: null,

  attentionState: 'UNKNOWN',

  faceDetected: false,

  // =====================
  // SETTERS
  // =====================

  setSessionActive: (value) =>
    set({
      sessionActive: value,
    }),

  setTask: (value) =>
    set({
      task: value,
    }),

  setSessionId: (value) =>
    set({
      sessionId: value,
    }),

  setStartedAt: (value) =>
    set({
      startedAt: value,
    }),

  setAttentionState: (value) =>
    set({
      attentionState: value,
    }),

  setFaceDetected: (value) =>
    set({
      faceDetected: value,
    }),
}));
