//frontend/modules/focus/utils/attention.utils.ts

import { AttentionState } from '../types/attention-state';

// =========================
// TYPES
// =========================
type TrackerState = {
  confirmed: AttentionState;

  confirmedSince: number;

  candidate: AttentionState | null;

  candidateSince: number | null;
};

// =========================
// STABILITY THRESHOLDS
// =========================
const STABILITY_TIME = {
  [AttentionState.ATTENTIVE]: 0,

  [AttentionState.DISTRACTED]: 300,

  [AttentionState.PHONE]: 500,

  [AttentionState.ABSENT]: 800,
};

// =========================
// RESOLVE ATTENTION
// =========================
export const resolveAttentionState = (
  gazeDirection: string,

  faceDetected: boolean
): AttentionState => {
  // =========================
  // ABSENT
  // =========================
  if (!faceDetected) {
    return AttentionState.ABSENT;
  }

  // =========================
  // PHONE
  // =========================
  if (gazeDirection === 'LOOKING_DOWN') {
    return AttentionState.PHONE;
  }

  // =========================
  // DISTRACTED
  // =========================
  if (
    gazeDirection === 'LOOKING_LEFT' ||
    gazeDirection === 'LOOKING_RIGHT' ||
    gazeDirection === 'LOOKING_UP'
  ) {
    return AttentionState.DISTRACTED;
  }

  // =========================
  // ATTENTIVE
  // =========================
  return AttentionState.ATTENTIVE;
};

// =========================
// CREATE TRACKER
// =========================
export const createAttentionTracker = () => {
  // =========================
  // INTERNAL STATE
  // =========================
  let state: TrackerState = {
    confirmed: AttentionState.ATTENTIVE,

    confirmedSince: Date.now(),

    candidate: null,

    candidateSince: null,
  };

  // =========================
  // TRACK
  // =========================
  return (detectedState: AttentionState): AttentionState => {
    const now = Date.now();

    // =========================
    // SAME AS CONFIRMED
    // =========================
    if (detectedState === state.confirmed) {
      // reset candidate
      state.candidate = null;

      state.candidateSince = null;

      return state.confirmed;
    }

    // =========================
    // NEW CANDIDATE
    // =========================
    if (state.candidate !== detectedState) {
      state.candidate = detectedState;

      state.candidateSince = now;

      console.log('New candidate state:', detectedState);

      return state.confirmed;
    }

    // =========================
    // NO CANDIDATE TIME
    // =========================
    if (!state.candidateSince) {
      return state.confirmed;
    }

    // =========================
    // CANDIDATE DURATION
    // =========================
    const candidateDuration = now - state.candidateSince;

    // =========================
    // REQUIRED STABILITY
    // =========================
    const requiredDuration = STABILITY_TIME[detectedState] || 0;

    // =========================
    // NOT STABLE YET
    // =========================
    if (candidateDuration < requiredDuration) {
      return state.confirmed;
    }

    // =========================
    // CONFIRM TRANSITION
    // =========================
    state.confirmed = detectedState;

    state.confirmedSince = now;

    // reset candidate
    state.candidate = null;

    state.candidateSince = null;

    console.log('Attention state confirmed:', detectedState);

    console.log(
      'State confirmed:',
      detectedState,
      'after',
      candidateDuration,
      'ms'
    );

    return state.confirmed;
  };
};
