//frontend\modules\focus\utils\calibration.utils.ts
import { CalibrationProfile } from '../types/calibration-profile';

type GazePoint = {
  x: number;

  y: number;
};

// =========================
// COMPARE GAZE
// =========================
export const compareGazeToCalibration = (
  current: GazePoint,

  profile: CalibrationProfile
) => {
  const centerSample = profile.samples.find(
    (sample) => sample.pointId === 'center'
  );

  if (!centerSample) {
    return 'UNKNOWN';
  }

  // =========================
  // OFFSETS
  // =========================
  const offsetX = current.x - centerSample.centerX;

  const offsetY = current.y - centerSample.centerY;

  // =========================
  // THRESHOLDS
  // =========================
  const thresholdX = 0.03;

  const thresholdY = 0.03;

  // =========================
  // LEFT / RIGHT
  // =========================
  if (offsetX > thresholdX) {
    return 'LOOKING_RIGHT';
  }

  if (offsetX < -thresholdX) {
    return 'LOOKING_LEFT';
  }

  // =========================
  // UP / DOWN
  // =========================
  if (offsetY > thresholdY) {
    return 'LOOKING_DOWN';
  }

  if (offsetY < -thresholdY) {
    return 'LOOKING_UP';
  }

  return 'CENTER';
};
