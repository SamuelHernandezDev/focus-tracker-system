//frontend\modules\focus\components\CalibrationModal.tsx
'use client';

import { useState } from 'react';

import { Crosshair } from 'lucide-react';

import CalibrationOverlay from './calilbration/CalibrationOverlay';

import { FaceLandmark } from '../types/face-tracking-result';

import { CalibrationProfile } from '../types/calibration-profile';

type Props = {
  landmarks: FaceLandmark[];

  onComplete?: (profile: CalibrationProfile) => void;
};

export default function CalibrationModal({
  landmarks,

  onComplete,
}: Props) {
  // =========================
  // STATE
  // =========================
  const [open, setOpen] = useState(false);

  const [calibrated, setCalibrated] = useState(false);

  // =========================
  // COMPLETE
  // =========================
  const handleComplete = (profile: CalibrationProfile) => {
    setCalibrated(true);

    onComplete?.(profile);
  };

  // =========================
  // CLOSE
  // =========================
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {/* PANEL */}
      <div className="bg-white rounded-xl shadow-sm p-5 space-y-4">
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-gray-800">
              Eye Calibration
            </h2>

            <p className="text-xs text-gray-400 mt-1">
              Configure gaze tracking reference points
            </p>
          </div>

          {/* STATUS */}
          <div
            className={`
              px-3 py-1 rounded-full
              text-xs font-medium

              ${
                calibrated
                  ? 'bg-green-100 text-green-700'
                  : 'bg-yellow-100 text-yellow-700'
              }
            `}
          >
            {calibrated ? 'CALIBRATED' : 'NOT CALIBRATED'}
          </div>
        </div>

        {/* INFO */}
        <div className="text-sm text-gray-500">
          Calibration improves:
          <ul className="mt-2 space-y-1 list-disc list-inside">
            <li>Attention detection</li>

            <li>Screen gaze accuracy</li>

            <li>Distraction detection</li>
          </ul>
        </div>

        {/* ACTION */}
        <button
          onClick={() => setOpen(true)}
          className="
            w-full py-3 rounded-xl

            bg-blue-600 text-white
            hover:bg-blue-700

            transition

            flex items-center
            justify-center gap-2
          "
        >
          <Crosshair size={16} />
          Start Calibration
        </button>
      </div>

      {/* OVERLAY */}
      <CalibrationOverlay
        open={open}
        landmarks={landmarks}
        onClose={handleClose}
        onComplete={handleComplete}
      />
    </>
  );
}
