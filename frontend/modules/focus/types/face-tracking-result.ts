//frontend\modules\focus\types\face-tracking-result.ts
export type FaceLandmark = {
  x: number;

  y: number;

  z: number;
};

export type FaceTrackingResult = {
  detected: boolean;

  landmarks: FaceLandmark[];

  timestamp: number;
};
