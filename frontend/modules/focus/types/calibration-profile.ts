//frontend\modules\focus\types\calibration-profile.ts
export type CalibrationSample = {
  pointId: string;

  centerX: number;

  centerY: number;

  timestamp: number;
};

export type CalibrationProfile = {
  completed: boolean;

  samples: CalibrationSample[];

  createdAt: number;
};
