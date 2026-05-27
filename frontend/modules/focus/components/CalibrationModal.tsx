//frontend\modules\focus\components\CalibrationModal.tsx
'use client';

import CalibrationOverlay from './calilbration/CalibrationOverlay';

import { FaceLandmark } from '../types/face-tracking-result';

import { CalibrationProfile } from '../types/calibration-profile';

type Props = {
  open: boolean;

  onClose: () => void;

  landmarks: FaceLandmark[];

  onComplete?: (profile: CalibrationProfile) => void;
};

export default function CalibrationModal({
  open,

  onClose,

  landmarks,

  onComplete,
}: Props) {
  // =========================
  // COMPLETE
  // =========================

  const handleComplete = (profile: CalibrationProfile) => {
    onComplete?.(profile);

    onClose();
  };

  return (
    <CalibrationOverlay
      open={open}
      landmarks={landmarks}
      onClose={onClose}
      onComplete={handleComplete}
    />
  );
}
