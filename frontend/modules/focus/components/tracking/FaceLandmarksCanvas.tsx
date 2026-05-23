//frontend\modules\focus\components\tracking\FaceLandmarksCanvas.tsx
'use client';

import { useEffect, useRef } from 'react';

import {
  getLeftIris,
  getRightIris,
  getEyesCenter,
} from '../../utils/gaze.utils';

import { FaceLandmark } from '../../types/face-tracking-result';

type Props = {
  videoWidth: number;

  videoHeight: number;

  landmarks: FaceLandmark[];
};

export default function FaceLandmarksCanvas({
  videoWidth,

  videoHeight,

  landmarks,
}: Props) {
  // =========================
  // CANVAS REF
  // =========================
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // =========================
  // DRAW
  // =========================
  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    // =========================
    // SIZE
    // =========================
    canvas.width = videoWidth;

    canvas.height = videoHeight;

    // =========================
    // CLEAR
    // =========================
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // =========================
    // DRAW LANDMARKS
    // =========================
    landmarks.forEach((landmark) => {
      const x = landmark.x * videoWidth;

      const y = landmark.y * videoHeight;

      ctx.beginPath();

      ctx.arc(x, y, 1.5, 0, Math.PI * 2);

      ctx.fillStyle = '#00FF88';

      ctx.fill();
    });

    // =========================
    // IRIS CENTERS
    // =========================
    const leftIris = getLeftIris(landmarks);

    const rightIris = getRightIris(landmarks);

    const eyesCenter = getEyesCenter(landmarks);

    // =========================
    // DRAW POINT
    // =========================
    const drawPoint = (x: number, y: number, color: string, radius = 5) => {
      ctx.beginPath();

      ctx.arc(x, y, radius, 0, Math.PI * 2);

      ctx.fillStyle = color;

      ctx.fill();
    };

    // =========================
    // LEFT IRIS
    // =========================
    if (leftIris) {
      drawPoint(
        leftIris.x * videoWidth,
        leftIris.y * videoHeight,
        '#00FFFF',
        6
      );
    }

    // =========================
    // RIGHT IRIS
    // =========================
    if (rightIris) {
      drawPoint(
        rightIris.x * videoWidth,
        rightIris.y * videoHeight,
        '#FF00FF',
        6
      );
    }

    // =========================
    // EYES CENTER
    // =========================
    if (eyesCenter) {
      drawPoint(
        eyesCenter.x * videoWidth,
        eyesCenter.y * videoHeight,
        '#FFFF00',
        8
      );
    }
  }, [landmarks, videoWidth, videoHeight]);

  return (
    <canvas
      ref={canvasRef}
      className="
        absolute inset-0
        w-full h-full
        pointer-events-none
      "
    />
  );
}
