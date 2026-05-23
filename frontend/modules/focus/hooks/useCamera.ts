//frontend\modules\focus\hooks\useCamera.ts
'use client';

import { useEffect, useState } from 'react';

import {
  getCameraDevices,
  startCameraStream,
  stopCameraStream,
} from '../services/camera.service';

import { CameraDevice } from '../types/camera-device';

export const useCamera = () => {
  // =========================
  // STATE
  // =========================
  const [devices, setDevices] = useState<CameraDevice[]>([]);

  const [selectedDeviceId, setSelectedDeviceId] = useState<string>('');

  const [stream, setStream] = useState<MediaStream | null>(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  // =========================
  // LOAD DEVICES
  // =========================
  const loadDevices = async () => {
    try {
      const cams = await getCameraDevices();

      setDevices(cams);

      if (cams.length > 0 && !selectedDeviceId) {
        setSelectedDeviceId(cams[0].deviceId);
      }
    } catch {
      setError('Failed to load cameras');
    }
  };

  // =========================
  // START
  // =========================
  const start = async () => {
    try {
      setLoading(true);

      setError(null);

      const mediaStream = await startCameraStream(selectedDeviceId);

      setStream(mediaStream);
    } catch {
      setError('Camera access denied');
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // STOP
  // =========================
  const stop = () => {
    stopCameraStream(stream);

    setStream(null);
  };

  // =========================
  // INITIAL LOAD
  // =========================
  useEffect(() => {
    loadDevices();
  }, []);

  // =========================
  // CLEANUP
  // =========================
  useEffect(() => {
    return () => {
      stopCameraStream(stream);
    };
  }, [stream]);

  return {
    devices,

    selectedDeviceId,

    setSelectedDeviceId,

    stream,

    loading,

    error,

    start,

    stop,
  };
};
