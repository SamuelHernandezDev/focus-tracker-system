//frontend\modules\focus\components\cameraPreview\CameraTrackingStats.tsx
'use client';

import { Eye, ScanFace, Brain, Activity } from 'lucide-react';

type Props = {
  detected: boolean;

  landmarksCount: number;

  gazeDirection: string;

  attentionState: string;

  trackingLoading: boolean;

  trackingError?: string | null;
};

export function CameraTrackingStats({
  detected,
  landmarksCount,
  gazeDirection,
  attentionState,
  trackingLoading,
  trackingError,
}: Props) {
  const stats = [
    {
      label: 'Face Detection',

      value: detected ? 'Detected' : 'No Face',

      icon: ScanFace,

      active: detected,

      color: detected
        ? 'from-emerald-500 to-green-500'
        : 'from-red-500 to-rose-500',
    },

    {
      label: 'Landmarks',

      value: landmarksCount,

      icon: Activity,

      active: landmarksCount > 0,

      color: 'from-blue-500 to-cyan-500',
    },

    {
      label: 'Gaze',

      value: gazeDirection,

      icon: Eye,

      active: gazeDirection !== 'UNKNOWN',

      color: 'from-violet-500 to-indigo-500',
    },

    {
      label: 'Attention',

      value: attentionState,

      icon: Brain,

      active: attentionState === 'ATTENTIVE',

      color: 'from-orange-500 to-amber-500',
    },
  ];

  return (
    <div className="space-y-4">
      {/* GRID */}

      <div
        className="
          grid
          grid-cols-2

          gap-2
        "
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <div
              key={index}
              className="
                  relative

                  overflow-hidden

                  rounded-2xl

                  border border-white/40

                  bg-white/70
                  backdrop-blur-xl

                  p-3

                  shadow-sm
                "
            >
              {/* GLOW */}

              <div
                className={`
                    absolute
                    top-0 right-0

                    w-20 h-20

                    rounded-full

                    blur-3xl

                    opacity-20

                    bg-gradient-to-br
                    ${stat.color}
                  `}
              />

              {/* CONTENT */}

              <div
                className="
                    relative z-10
                  "
              >
                {/* TOP */}

                <div
                  className="
                      flex items-center
                      justify-between
                    "
                >
                  <div
                    className={`
                        w-8 h-8

                        rounded-2xl

                        bg-gradient-to-br
                        ${stat.color}

                        flex items-center
                        justify-center

                        shadow-lg
                      `}
                  >
                    <Icon
                      size={14}
                      className="
                          text-white
                        "
                    />
                  </div>

                  <div
                    className={`
                        w-2.5 h-2.5

                        rounded-full

                        ${stat.active ? 'bg-emerald-500' : 'bg-gray-300'}
                      `}
                  />
                </div>

                {/* TEXT */}

                <div className="mt-2">
                  <p
                    className="
                        text-xs
                        text-gray-500
                      "
                  >
                    {stat.label}
                  </p>

                  <h4
                    className="
                        mt-1

                        text-[13px]
                        font-semibold

                        text-gray-900

                        truncate
                      "
                  >
                    {stat.value}
                  </h4>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* LOADING */}

      {trackingLoading && (
        <div
          className="
            px-4 py-3

            rounded-2xl

            bg-blue-50
            border border-blue-100

            text-[13px]
            text-blue-600
          "
        >
          Initializing MediaPipe...
        </div>
      )}

      {/* ERROR */}

      {trackingError && (
        <div
          className="
            px-4 py-3

            rounded-2xl

            bg-red-50
            border border-red-100

            text-[13px]
            text-red-600
          "
        >
          {trackingError}
        </div>
      )}
    </div>
  );
}
