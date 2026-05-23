//frontend\modules\focus\services\calibration.service.ts
import {
  CalibrationProfile,
  CalibrationSample,
} from '../types/calibration-profile';

// =========================
// CREATE SAMPLE
// =========================
export const createCalibrationSample = (
  pointId: string,

  centerX: number,

  centerY: number
): CalibrationSample => {
  return {
    pointId,

    centerX,

    centerY,

    timestamp: Date.now(),
  };
};

// =========================
// CREATE PROFILE
// =========================
export const createCalibrationProfile = (
  samples: CalibrationSample[]
): CalibrationProfile => {
  return {
    completed: samples.length > 0,

    samples,

    createdAt: Date.now(),
  };
};

// =========================
// GET CENTER SAMPLE
// =========================
export const getCenterSample = (profile: CalibrationProfile | null) => {
  if (!profile) {
    return null;
  }

  return profile.samples.find((sample) => sample.pointId === 'CENTER');
};
