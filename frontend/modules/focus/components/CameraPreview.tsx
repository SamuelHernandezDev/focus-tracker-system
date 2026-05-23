//frontend\modules\focus\components\CameraPreview.tsx
'use client';

import { useEffect, useState, useRef } from 'react';

import { Camera } from 'lucide-react';

import { useCamera } from '../hooks/useCamera';

import { useFaceTracking } from '../hooks/useFaceTracking';

import { useAttentionStream } from '../hooks/useAttentionStream';

import { AttentionState } from '../types/attention-state';

import { getGazeDirection } from '../utils/gaze.utils';

import {
  resolveAttentionState,
  createAttentionTracker,
} from '../utils/attention.utils';

import { compareGazeToCalibration } from '../utils/calibration.utils';

import FaceLandmarksCanvas from './tracking/FaceLandmarksCanvas';

import CalibrationModal from './CalibrationModal';

import { CalibrationProfile } from '../types/calibration-profile';

import { getEyesCenter } from '../utils/gaze.utils';

type Props = {
  sessionId?: string | null;

  enabled: boolean;
};

export default function CameraPreview({
  sessionId,

  enabled,
}: Props) {
  // =========================
  // VIDEO REF
  // =========================
  const videoRef = useRef<HTMLVideoElement>(null);

  const attentionTrackerRef = useRef(createAttentionTracker());

  const [calibrationProfile, setCalibrationProfile] =
    useState<CalibrationProfile | null>(null);

  const [attentionState, setAttentionState] = useState(
    AttentionState.ATTENTIVE
  );

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
  // FACE TRACKING
  // =========================
  const {
    loading: trackingLoading,

    error: trackingError,

    result,
  } = useFaceTracking(videoRef.current);

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
    <div className="bg-white rounded-xl shadow-sm p-5 space-y-4">
      {/* HEADER */}
      <div className="flex items-center gap-2">
        <Camera size={16} />

        <h2 className="text-sm font-semibold text-gray-800">Camera Preview</h2>
      </div>

      {/* VIDEO */}
      <div className="aspect-video rounded-xl overflow-hidden bg-black relative">
        {/* VIDEO */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
        />

        {/* LANDMARKS */}
        {result?.detected && (
          <FaceLandmarksCanvas
            videoWidth={videoRef.current?.videoWidth || 1280}
            videoHeight={videoRef.current?.videoHeight || 720}
            landmarks={result.landmarks}
          />
        )}
      </div>

      {/* TRACKING STATUS */}
      <div className="space-y-2">
        {/* STATUS */}
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-500">Face Tracking</p>

          <div
            className={`
              px-2 py-1 rounded-full
              text-xs font-medium

              ${
                result?.detected
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }
            `}
          >
            {result?.detected ? 'FACE DETECTED' : 'NO FACE'}
          </div>
        </div>

        {/* LANDMARKS */}
        <div className="text-xs text-gray-400">
          Landmarks: {result?.landmarks.length || 0}
        </div>

        {/* GAZE */}
        <div className="text-xs text-gray-400">
          Gaze Direction:{' '}
          <span className="font-medium text-blue-600">{gazeDirection}</span>
        </div>

        {/* ATTENTION */}
        <div className="text-xs text-gray-400">
          Attention State:{' '}
          <span className="font-medium text-purple-600">{attentionState}</span>
        </div>

        {/* LOADING */}
        {trackingLoading && (
          <div className="text-xs text-blue-500">Initializing MediaPipe...</div>
        )}

        {/* TRACKING ERROR */}
        {trackingError && (
          <div className="text-xs text-red-500">{trackingError}</div>
        )}
      </div>

      {/* CALIBRATION */}
      {result?.landmarks && (
        <CalibrationModal
          landmarks={result.landmarks}
          onComplete={setCalibrationProfile}
        />
      )}

      {/* DEVICE SELECT */}
      <select
        value={selectedDeviceId}
        onChange={(e) => setSelectedDeviceId(e.target.value)}
        className="
          w-full border border-gray-200
          rounded-lg px-3 py-2 text-sm
        "
      >
        {devices.map((device) => (
          <option key={device.deviceId} value={device.deviceId}>
            {device.label}
          </option>
        ))}
      </select>

      {/* CONTROLS */}
      <div className="flex gap-2">
        <button
          onClick={start}
          disabled={loading}
          className="
            px-4 py-2 rounded-lg
            bg-blue-600 text-white
            text-sm
          "
        >
          Start Camera
        </button>

        <button
          onClick={stop}
          className="
            px-4 py-2 rounded-lg
            bg-red-600 text-white
            text-sm
          "
        >
          Stop
        </button>
      </div>

      {/* CAMERA ERROR */}
      {error && <div className="text-sm text-red-500">{error}</div>}
    </div>
  );
}
