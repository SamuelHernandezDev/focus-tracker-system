//frontend\modules\focus\hooks\useFaceTracking.ts
'use client';

import { useEffect, useRef, useState } from 'react';

import { createFaceLandmarker } from '../utils/mediapipe.utils';

import { FaceTrackingResult } from '../types/face-tracking-result';

export const useFaceTracking = (video: HTMLVideoElement | null) => {
  // =========================
  // STATE
  // =========================
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const [result, setResult] = useState<FaceTrackingResult | null>(null);

  // =========================
  // REFS
  // =========================
  const landmarkerRef = useRef<any>(null);

  const animationRef = useRef<number>(0);

  const lastDetectionRef = useRef(0);

  // =========================
  // INIT
  // =========================
  useEffect(() => {
    if (!video) return;

    let mounted = true;

    const init = async () => {
      try {
        // =========================
        // CREATE LANDMARKER
        // =========================
        const landmarker = await createFaceLandmarker();

        if (!mounted) return;

        landmarkerRef.current = landmarker;

        setLoading(false);

        // =========================
        // START LOOP
        // =========================
        startTracking();
      } catch (err) {
        console.error(err);

        setError('Failed to initialize face tracking');

        setLoading(false);
      }
    };

    init();

    return () => {
      mounted = false;

      cancelAnimationFrame(animationRef.current);
    };
  }, [video]);

  // =========================
  // TRACKING LOOP
  // =========================
  const startTracking = () => {
    const detect = async () => {
      if (!video || !landmarkerRef.current) {
        animationRef.current = requestAnimationFrame(detect);

        return;
      }

      // =========================
      // VIDEO READY
      // =========================
      if (
        video.readyState < 2 ||
        video.videoWidth === 0 ||
        video.videoHeight === 0
      ) {
        animationRef.current = requestAnimationFrame(detect);

        return;
      }

      // =========================
      // DETECT
      // =========================
      const now = performance.now();

      // =========================
      // LIMIT FPS
      // =========================
      if (now - lastDetectionRef.current < 100) {
        animationRef.current = requestAnimationFrame(detect);

        return;
      }

      lastDetectionRef.current = now;

      let detections;

      try {
        detections = landmarkerRef.current.detectForVideo(video, now);
      } catch (error) {
        // Skip invalid frames silently

        animationRef.current = requestAnimationFrame(detect);

        return;
      }
      // =========================
      // FACE FOUND
      // =========================
      if (detections.faceLandmarks && detections.faceLandmarks.length > 0) {
        const landmarks = detections.faceLandmarks[0];

        setResult({
          detected: true,

          landmarks: landmarks.map((landmark: any) => ({
            x: landmark.x,

            y: landmark.y,

            z: landmark.z,
          })),

          timestamp: Date.now(),
        });
      } else {
        setResult({
          detected: false,

          landmarks: [],

          timestamp: Date.now(),
        });
      }

      // =========================
      // NEXT FRAME
      // =========================
      animationRef.current = requestAnimationFrame(detect);
    };

    detect();
  };

  return {
    loading,

    error,

    result,
  };
};
