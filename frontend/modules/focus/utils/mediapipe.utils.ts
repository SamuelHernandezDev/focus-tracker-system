//frontend\modules\focus\utils\mediapipe.utils.ts
import { FaceLandmarker, FilesetResolver } from '@mediapipe/tasks-vision';

// =========================
// CREATE FACE LANDMARKER
// =========================
export const createFaceLandmarker = async () => {
  // =========================
  // LOAD VISION FILES
  // =========================
  const vision = await FilesetResolver.forVisionTasks(
    'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
  );

  // =========================
  // CREATE MODEL
  // =========================
  const faceLandmarker = await FaceLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath:
        'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task',

      delegate: 'GPU',
    },

    runningMode: 'VIDEO',

    numFaces: 1,

    outputFaceBlendshapes: true,

    outputFacialTransformationMatrixes: true,
  });

  return faceLandmarker;
};
