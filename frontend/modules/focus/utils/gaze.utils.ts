//frontend\modules\focus\utils\gaze.utils.ts
import { FaceLandmark } from '../types/face-tracking-result';

// =========================
// IRIS LANDMARK INDEXES
// =========================
const LEFT_IRIS_INDEXES = [468, 469, 470, 471, 472];

const RIGHT_IRIS_INDEXES = [473, 474, 475, 476, 477];

// =========================
// GET CENTER
// =========================
const getCenter = (points: FaceLandmark[]) => {
  const total = points.reduce(
    (acc, point) => {
      acc.x += point.x;

      acc.y += point.y;

      return acc;
    },
    { x: 0, y: 0 }
  );

  return {
    x: total.x / points.length,

    y: total.y / points.length,
  };
};

// =========================
// LEFT IRIS
// =========================
export const getLeftIris = (landmarks: FaceLandmark[]) => {
  const iris = LEFT_IRIS_INDEXES.map((index) => landmarks[index]).filter(
    Boolean
  );

  if (iris.length === 0) {
    return null;
  }

  return getCenter(iris);
};

// =========================
// RIGHT IRIS
// =========================
export const getRightIris = (landmarks: FaceLandmark[]) => {
  const iris = RIGHT_IRIS_INDEXES.map((index) => landmarks[index]).filter(
    Boolean
  );

  if (iris.length === 0) {
    return null;
  }

  return getCenter(iris);
};

// =========================
// BOTH EYES CENTER
// =========================
export const getEyesCenter = (landmarks: FaceLandmark[]) => {
  const leftIris = getLeftIris(landmarks);

  const rightIris = getRightIris(landmarks);

  if (!leftIris || !rightIris) {
    return null;
  }

  return {
    x: (leftIris.x + rightIris.x) / 2,

    y: (leftIris.y + rightIris.y) / 2,
  };
};

// =========================
// GAZE DIRECTION
// =========================
export const getGazeDirection = (landmarks: FaceLandmark[]) => {
  const leftIris = getLeftIris(landmarks);

  const rightIris = getRightIris(landmarks);

  const eyesCenter = getEyesCenter(landmarks);

  if (!leftIris || !rightIris || !eyesCenter) {
    return 'UNKNOWN';
  }

  // =========================
  // OFFSETS
  // =========================
  const horizontalOffset = eyesCenter.x - 0.5;

  const verticalOffset = eyesCenter.y - 0.5;

  // =========================
  // THRESHOLDS
  // =========================
  const threshold = 0.02;

  // =========================
  // LEFT / RIGHT
  // =========================
  if (horizontalOffset > threshold) {
    return 'LOOKING_RIGHT';
  }

  if (horizontalOffset < -threshold) {
    return 'LOOKING_LEFT';
  }

  // =========================
  // UP / DOWN
  // =========================
  if (verticalOffset > threshold) {
    return 'LOOKING_DOWN';
  }

  if (verticalOffset < -threshold) {
    return 'LOOKING_UP';
  }

  return 'CENTER';
};
