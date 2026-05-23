//frontend\modules\focus\hooks\useCalibration.ts
'use client';

import { useMemo, useState } from 'react';

import { getEyesCenter } from '../utils/gaze.utils';

import {
  createCalibrationProfile,
  createCalibrationSample,
} from '../services/calibration.service';

import { FaceLandmark } from '../types/face-tracking-result';

import { CalibrationPoint } from '../types/calibration-point';

import { CalibrationProfile } from '../types/calibration-profile';

// =========================
// DEFAULT POINTS
// =========================

const DEFAULT_POINTS: CalibrationPoint[] = [
  // =========================
  // TOP ROW
  // =========================
  {
    id: 'top-left',
    x: 15,
    y: 15,
    label: 'Top Left',
  },

  {
    id: 'top',
    x: 50,
    y: 15,
    label: 'Top',
  },

  {
    id: 'top-right',
    x: 85,
    y: 15,
    label: 'Top Right',
  },

  // =========================
  // MIDDLE ROW
  // =========================
  {
    id: 'left',
    x: 15,
    y: 50,
    label: 'Left',
  },

  {
    id: 'center',
    x: 50,
    y: 50,
    label: 'Center',
  },

  {
    id: 'right',
    x: 85,
    y: 50,
    label: 'Right',
  },

  // =========================
  // BOTTOM ROW
  // =========================
  {
    id: 'bottom-left',
    x: 15,
    y: 85,
    label: 'Bottom Left',
  },

  {
    id: 'bottom',
    x: 50,
    y: 85,
    label: 'Bottom',
  },

  {
    id: 'bottom-right',
    x: 85,
    y: 85,
    label: 'Bottom Right',
  },
];

export const useCalibration = (landmarks: FaceLandmark[]) => {
  // =========================
  // STATE
  // =========================
  const [started, setStarted] = useState(false);

  const [completed, setCompleted] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);

  const [profile, setProfile] = useState<CalibrationProfile | null>(null);

  // =========================
  // CURRENT POINT
  // =========================
  const currentPoint = DEFAULT_POINTS[currentIndex];

  // =========================
  // START
  // =========================
  const startCalibration = () => {
    setStarted(true);

    setCompleted(false);

    setCurrentIndex(0);

    setProfile({
      completed: false,

      samples: [],

      createdAt: Date.now(),
    });
  };

  // =========================
  // NEXT
  // =========================
  const nextPoint = () => {
    if (!profile) return;

    // =========================
    // EYES CENTER
    // =========================
    const eyesCenter = getEyesCenter(landmarks);

    if (!eyesCenter) {
      return;
    }

    // =========================
    // SAMPLE
    // =========================
    const sample = createCalibrationSample(
      currentPoint.id,

      eyesCenter.x,

      eyesCenter.y
    );

    const samples = [...profile.samples, sample];

    const updatedProfile = createCalibrationProfile(samples);

    setProfile(updatedProfile);

    // =========================
    // FINISH
    // =========================
    if (currentIndex >= DEFAULT_POINTS.length - 1) {
      setCompleted(true);

      setStarted(false);

      setProfile({
        ...updatedProfile,

        completed: true,
      });

      return;
    }

    // =========================
    // NEXT STEP
    // =========================
    setCurrentIndex((prev) => prev + 1);
  };

  // =========================
  // RESET
  // =========================
  const resetCalibration = () => {
    setStarted(false);

    setCompleted(false);

    setCurrentIndex(0);

    setProfile(null);
  };

  // =========================
  // PROGRESS
  // =========================
  const progress = useMemo(() => {
    return ((currentIndex + 1) / DEFAULT_POINTS.length) * 100;
  }, [currentIndex]);

  return {
    started,

    completed,

    currentIndex,

    currentPoint,

    progress,

    points: DEFAULT_POINTS,

    profile,

    startCalibration,

    nextPoint,

    resetCalibration,
  };
};
