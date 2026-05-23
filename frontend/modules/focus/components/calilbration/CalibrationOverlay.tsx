//frontend\modules\focus\components\calilbration\CalibrationOverlay.tsx
'use client';

import CalibrationPoint from './CalibrationPoint';

import CalibrationProgress from './CalibrationProgress';

import CalibrationInstructions from './CalibrationInstructions';

import { useCalibration } from '../../hooks/useCalibration';

import { CalibrationProfile } from '../../types/calibration-profile';

import { FaceLandmark } from '../../types/face-tracking-result';

type Props = {
  open: boolean;

  landmarks: FaceLandmark[];

  onClose?: () => void;

  onComplete?: (profile: CalibrationProfile) => void;
};

export default function CalibrationOverlay({
  open,

  landmarks,

  onClose,

  onComplete,
}: Props) {
  const {
    started,

    completed,

    currentIndex,

    currentPoint,

    progress,

    points,

    profile,

    startCalibration,

    nextPoint,

    resetCalibration,
  } = useCalibration(landmarks);

  // =========================
  // HIDDEN
  // =========================
  if (!open) {
    return null;
  }

  return (
    <div
      className="
        fixed inset-0 z-[9999]

        bg-black/70 backdrop-blur-sm
      "
    >
      {/* START SCREEN */}
      {!started && !completed && (
        <div
          className="
              absolute inset-0

              flex items-center justify-center
            "
        >
          <div
            className="
                bg-white rounded-2xl
                p-8 w-[420px]

                shadow-2xl
                space-y-6
              "
          >
            {/* HEADER */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Attention Calibration
              </h2>

              <p className="text-sm text-gray-500 mt-2">
                We will calibrate your gaze tracking system.
              </p>
            </div>

            {/* INFO */}
            <div className="space-y-3 text-sm text-gray-600">
              <p>• Keep your head still</p>

              <p>• Look directly at each point</p>

              <p>• Use your normal sitting position</p>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-3">
              <button
                onClick={startCalibration}
                className="
                    flex-1 py-3 rounded-xl

                    bg-blue-600 text-white
                    hover:bg-blue-700

                    transition
                  "
              >
                Start Calibration
              </button>

              <button
                onClick={onClose}
                className="
                    px-5 py-3 rounded-xl

                    bg-gray-200
                    hover:bg-gray-300

                    transition
                  "
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ACTIVE CALIBRATION */}
      {started && currentPoint && (
        <>
          {/* POINT */}
          <CalibrationPoint x={currentPoint.x} y={currentPoint.y} active />

          {/* PROGRESS */}
          <div
            className="
                absolute top-8 left-1/2
                -translate-x-1/2

                w-[400px]
              "
          >
            <CalibrationProgress
              progress={progress}
              currentStep={currentIndex + 1}
              totalSteps={points.length}
            />
          </div>

          {/* INSTRUCTIONS */}
          <CalibrationInstructions
            label={currentPoint.label}
            onNext={nextPoint}
          />
        </>
      )}

      {/* COMPLETED */}
      {completed && (
        <div
          className="
            absolute inset-0

            flex items-center justify-center
          "
        >
          <div
            className="
              bg-white rounded-2xl
              p-8 w-[420px]

              shadow-2xl
              space-y-6 text-center
            "
          >
            {/* HEADER */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Calibration Complete
              </h2>

              <p className="text-sm text-gray-500 mt-2">
                Your attention tracking system is now calibrated.
              </p>
            </div>

            {/* PROFILE INFO */}
            <div className="bg-gray-50 rounded-xl p-4 text-left text-sm text-gray-600 space-y-2">
              <div>
                Samples:{' '}
                <span className="font-medium text-gray-900">
                  {profile?.samples.length}
                </span>
              </div>

              <div>
                Created:{' '}
                <span className="font-medium text-gray-900">
                  {new Date(
                    profile?.createdAt || Date.now()
                  ).toLocaleTimeString()}
                </span>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-3">
              <button
                onClick={resetCalibration}
                className="
                  flex-1 py-3 rounded-xl

                  bg-gray-200
                  hover:bg-gray-300

                  transition
                "
              >
                Recalibrate
              </button>

              <button
                onClick={() => {
                  if (profile) {
                    onComplete?.(profile);
                  }

                  onClose?.();
                }}
                className="
                  flex-1 py-3 rounded-xl

                  bg-blue-600 text-white
                  hover:bg-blue-700

                  transition
                "
              >
                Finish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
