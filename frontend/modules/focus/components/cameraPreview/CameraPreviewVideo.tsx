//frontend\modules\focus\components\cameraPreview\CameraPreviewVideo.tsx
'use client';

import { Camera, ScanFace, Crosshair, CheckCircle2 } from 'lucide-react';

import FaceLandmarksCanvas from '../tracking/FaceLandmarksCanvas';

type Props = {
  videoRef: React.RefObject<HTMLVideoElement | null>;

  detected: boolean;

  landmarks: any[];

  calibrated: boolean;

  trackingActive: boolean;

  onOpenCalibration: () => void;
};

export function CameraPreviewVideo({
  videoRef,
  detected,
  landmarks,
  calibrated,
  trackingActive,
  onOpenCalibration,
}: Props) {
  const CalibrationIcon = calibrated ? CheckCircle2 : Crosshair;

  return (
    <div
      className="
        relative

        overflow-hidden

        rounded-3xl

        border border-white/40

        bg-gradient-to-br
        from-slate-900
        to-black

shadow-lg
shadow-black/10
      "
    >
      {/* VIDEO */}

      <div
        className="
  relative
  aspect-video
  max-h-[320px]
  mx-auto
"
      >
        {/* VIDEO */}

        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="
            w-full
            h-full

            object-cover
          "
        />

        {/* OVERLAY */}

        <div
          className="
            absolute inset-0

            bg-gradient-to-t
            from-black/30
            via-transparent
            to-black/10

            pointer-events-none
          "
        />

        {/* LANDMARKS */}

        {detected && (
          <FaceLandmarksCanvas
            videoWidth={videoRef.current?.videoWidth || 1280}
            videoHeight={videoRef.current?.videoHeight || 720}
            landmarks={landmarks}
          />
        )}

        {/* TOP STATUS */}

        <div
          className="
    absolute
    top-4 left-4 right-4

    flex items-start
    justify-between

    gap-3
  "
        >
          {/* AI */}

          <div
            className="
      px-2.5 py-1.5

      rounded-2xl

      bg-black/40
      backdrop-blur-xl

      border border-white/10

      flex items-center
      gap-2

      shrink-0
    "
          >
            <div
              className={`
    w-2 h-2

    rounded-full

    ${trackingActive ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'}
  `}
            />

            <span
              className="
        text-xs
        font-medium

        text-white
      "
            >
              {trackingActive ? 'AI Tracking Live' : 'Tracking Offline'}
            </span>
          </div>

          {/* RIGHT BADGES */}

          <div
            className="
      flex flex-col
      items-end

      gap-2
    "
          >
            {/* FACE */}

            <div
              className={`
        px-3 py-2

        rounded-2xl

        backdrop-blur-xl

        border

        flex items-center
        gap-2

        ${
          detected
            ? `
              bg-emerald-500/20
              border-emerald-400/20
            `
            : `
              bg-red-500/20
              border-red-400/20
            `
        }
      `}
            >
              <ScanFace
                size={14}
                className="
          text-white
        "
              />

              <span
                className="
          text-[11px]
          font-medium

          text-white
        "
              >
                {detected ? 'Face Detected' : 'No Face'}
              </span>
            </div>
          </div>
        </div>

        {/* CALIBRATION */}

        <div
          className="
    absolute
    bottom-4
    right-4

    z-30

    group
  "
        >
          <button
            onClick={onOpenCalibration}
            className={`
          px-3 py-1.5

          rounded-full

          backdrop-blur-xl

          border

          flex items-center
          gap-1.5

          transition-all

          hover:scale-105
          hover:bg-black/40

          ${
            calibrated
              ? `
   bg-emerald-500/20
border-emerald-400/20
              `
              : `
                bg-yellow-500/20
                border-yellow-400/20
              `
          }
        `}
          >
            <CalibrationIcon
              size={14}
              className="
            text-white
          "
            />

            <span
              className="
            text-[11px]
            font-medium

            text-white
          "
            >
              {calibrated ? 'Calibrated' : 'Not Calibrated'}
            </span>
          </button>

          {/* TOOLTIP */}

          <div
            className="
          absolute
          bottom-full
          right-0

          mb-2

          w-64

          opacity-0
          invisible

 translate-y-2

transition-all
duration-200

group-hover:opacity-100
group-hover:visible
group-hover:-translate-y-1

          rounded-2xl

          border border-white/10

          bg-black/70
          backdrop-blur-xl

          p-4

          z-50
        "
          >
            <h4
              className="
            text-sm
            font-semibold

            text-white
          "
            >
              Eye Calibration
            </h4>

            <p
              className="
            mt-1

            text-xs
            text-gray-300
          "
            >
              Improves gaze accuracy and attention detection.
            </p>

            <ul
              className="
            mt-3

            space-y-1

            text-xs
            text-gray-300
          "
            >
              <li>• Attention tracking</li>
              <li>• Gaze accuracy</li>
              <li>• Distraction detection</li>
            </ul>
          </div>
        </div>

        {/* EMPTY */}

        {!videoRef.current && (
          <div
            className="
              absolute inset-0

              flex flex-col
              items-center
              justify-center

              text-center
            "
          >
            <div
              className="
                w-16 h-16

                rounded-3xl

                bg-white/10

                flex items-center
                justify-center

                backdrop-blur-xl
              "
            >
              <Camera
                size={28}
                className="
                  text-white
                "
              />
            </div>

            <p
              className="
                mt-4

                text-sm
                text-gray-300
              "
            >
              Camera feed inactive
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
