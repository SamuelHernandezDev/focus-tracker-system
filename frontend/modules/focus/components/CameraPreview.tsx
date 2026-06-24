//frontend/modules/focus/components/CameraPreview.tsx

'use client';

import { useEffect, useState, useRef } from 'react';

import { useCamera } from '../hooks/useCamera';

import { useFaceTracking } from '../hooks/useFaceTracking';

import { useAttentionStream } from '../hooks/useAttentionStream';

import { AttentionState } from '../types/attention-state';

import { getGazeDirection, getEyesCenter } from '../utils/gaze.utils';

import {
  resolveAttentionState,
  createAttentionTracker,
} from '../utils/attention.utils';

import { compareGazeToCalibration } from '../utils/calibration.utils';

import CalibrationModal from './CalibrationModal';

import { CalibrationProfile } from '../types/calibration-profile';

import { CameraPreviewHeader } from './cameraPreview/CameraPreviewHeader';

import { CameraPreviewVideo } from './cameraPreview/CameraPreviewVideo';

import { CameraTrackingStats } from './cameraPreview/CameraTrackingStats';

import { CameraDisabledOverlay } from './cameraPreview/CameraDisabledOverlay';

import { useFocusOverlayStore } from '@/modules/focus-overlay/store/focusOverlayStore';

type Props = {
  sessionId?: string | null;

  enabled: boolean;

  cameraEnabled: boolean;
};

export default function CameraPreview({
  sessionId,

  enabled,

  cameraEnabled,
}: Props) {
  // =========================
  // VIDEO REF
  // =========================

  const videoRef = useRef<HTMLVideoElement>(null);

  // =========================
  // ATTENTION TRACKER
  // =========================

  const attentionTrackerRef = useRef(createAttentionTracker());

  // =========================
  // CALIBRATION
  // =========================

  const [calibrationProfile, setCalibrationProfile] =
    useState<CalibrationProfile | null>(null);

  const [calibrationOpen, setCalibrationOpen] = useState(false);

  // =========================
  // ATTENTION
  // =========================

  const [attentionState, setAttentionState] = useState(
    AttentionState.ATTENTIVE
  );

  const [trackingActive, setTrackingActive] = useState(false);

  const {
    setAttentionState: setOverlayAttentionState,

    setFaceDetected: setOverlayFaceDetected,
  } = useFocusOverlayStore();

  // =========================
  // CAMERA
  // =========================

  const {
    devices,

    selectedDeviceId,

    setSelectedDeviceId,

    stream,

    start,

    stop,

    loading,

    error,
  } = useCamera();

  // =========================
  // TRACKING CONTROL
  // =========================

  const handleStartTracking = async () => {
    await start();

    setTrackingActive(true);
  };

  const handleStopTracking = () => {
    stop();

    setTrackingActive(false);
  };

  // =========================
  // FACE TRACKING
  // =========================

  const {
    loading: trackingLoading,

    error: trackingError,

    result,
  } = useFaceTracking(videoRef.current);

  useEffect(() => {
    setOverlayFaceDetected(result?.detected || false);
  }, [result?.detected, setOverlayFaceDetected]);

  // =========================
  // GAZE
  // =========================

  const gazeDirection = (() => {
    if (!result?.landmarks || result.landmarks.length === 0) {
      return 'UNKNOWN';
    }

    // =========================
    // NOT CALIBRATED
    // =========================

    if (!calibrationProfile) {
      return getGazeDirection(result.landmarks);
    }

    // =========================
    // CURRENT EYES CENTER
    // =========================

    const eyesCenter = getEyesCenter(result.landmarks);

    if (!eyesCenter) {
      return 'UNKNOWN';
    }

    // =========================
    // CALIBRATED GAZE
    // =========================

    return compareGazeToCalibration(
      eyesCenter,

      calibrationProfile
    );
  })();

  // =========================
  // RAW ATTENTION
  // =========================

  const rawAttentionState = resolveAttentionState(
    gazeDirection,

    result?.detected || false
  );

  // =========================
  // TRACK ATTENTION STATE
  // =========================

  useEffect(() => {
    const interval = setInterval(() => {
      const confirmedState = attentionTrackerRef.current(rawAttentionState);

      setAttentionState((prev) => {
        // =========================
        // NO CHANGE
        // =========================

        if (prev === confirmedState) {
          return prev;
        }

        console.log('Attention state changed:', confirmedState);

        return confirmedState;
      });
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [rawAttentionState]);

  useEffect(() => {
    setOverlayAttentionState(attentionState);
  }, [attentionState, setOverlayAttentionState]);

  // =========================
  // STREAM ATTENTION
  // =========================

  useAttentionStream({
    enabled,

    sessionId: sessionId || undefined,

    attentionState,
  });

  // =========================
  // ATTACH STREAM
  // =========================

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div
      className="
        relative

        overflow-hidden

        rounded-[32px]

        border border-white/40

        bg-gradient-to-br
        from-white
        via-white
        to-slate-50/80

        p-4

        shadow-sm

        space-y-4
      "
    >
      {/* GLOW */}

      <div
        className="
          absolute
          top-0 right-0

          w-64 h-64

          bg-violet-400/5

          rounded-full

          blur-3xl
        "
      />

      {/* CONTENT */}

      <div
        className={`
    relative z-10

    space-y-4

    transition-all
    duration-500

    ${
      !cameraEnabled
        ? `
opacity-50

scale-[0.985]

blur-[0.5px]

          pointer-events-none
        `
        : `
          opacity-100
        `
    }
  `}
      >
        {/* HEADER */}

        <CameraPreviewHeader
          devices={devices}
          selectedDeviceId={selectedDeviceId}
          onChangeDevice={setSelectedDeviceId}
          onStart={handleStartTracking}
          onStop={handleStopTracking}
          loading={loading}
          streaming={trackingActive}
        />

        {/* VIDEO */}

        <CameraPreviewVideo
          videoRef={videoRef}
          detected={result?.detected || false}
          landmarks={result?.landmarks || []}
          calibrated={!!calibrationProfile}
          trackingActive={trackingActive}
          onOpenCalibration={() => setCalibrationOpen(true)}
        />

        {/* TRACKING STATS */}

        <CameraTrackingStats
          detected={result?.detected || false}
          landmarksCount={result?.landmarks?.length || 0}
          gazeDirection={gazeDirection}
          attentionState={attentionState}
          trackingLoading={trackingLoading}
          trackingError={trackingError}
        />

        {/* CALIBRATION MODAL */}

        {result?.landmarks && (
          <CalibrationModal
            open={calibrationOpen}
            onClose={() => setCalibrationOpen(false)}
            landmarks={result.landmarks}
            onComplete={setCalibrationProfile}
          />
        )}

        {/* CAMERA ERROR */}

        {error && (
          <div
            className="
              px-4 py-3

              rounded-2xl

              bg-red-50
              border border-red-100

              text-sm
              text-red-600
            "
          >
            {error}
          </div>
        )}
      </div>

      {/* DISABLED OVERLAY */}

      <CameraDisabledOverlay disabled={!cameraEnabled} />
    </div>
  );
}
