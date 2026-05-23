//frontend\modules\focus\services\camera.service.ts
import { CameraDevice } from '../types/camera-device';

// =========================
// GET CAMERAS
// =========================
export const getCameraDevices = async (): Promise<CameraDevice[]> => {
  const devices = await navigator.mediaDevices.enumerateDevices();

  return devices
    .filter((device) => device.kind === 'videoinput')
    .map((device) => ({
      deviceId: device.deviceId,

      label: device.label || 'Unknown Camera',

      groupId: device.groupId,
    }));
};

// =========================
// START CAMERA
// =========================
export const startCameraStream = async (
  deviceId?: string
): Promise<MediaStream> => {
  return navigator.mediaDevices.getUserMedia({
    video: deviceId
      ? {
          deviceId: {
            exact: deviceId,
          },
        }
      : true,

    audio: false,
  });
};

// =========================
// STOP CAMERA
// =========================
export const stopCameraStream = (stream: MediaStream | null) => {
  if (!stream) return;

  stream.getTracks().forEach((track) => {
    track.stop();
  });
};
