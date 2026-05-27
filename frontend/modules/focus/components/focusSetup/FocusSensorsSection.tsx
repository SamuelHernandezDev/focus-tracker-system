//frontend\modules\focus\components\focusSetup\FocusSensorsSection.tsx
'use client';

import { Camera, Activity } from 'lucide-react';

type Props = {
  cameraEnabled: boolean;

  onToggleCamera: () => void;
};

export function FocusSensorsSection({ cameraEnabled, onToggleCamera }: Props) {
  return (
    <div
      className="
        relative

        overflow-hidden

        rounded-3xl

        border border-white/40

        bg-gradient-to-br
        from-white
        via-white
        to-slate-50/80

        p-5

        shadow-sm
      "
    >
      {/* GLOW */}

      <div
        className="
          absolute
          top-0 right-0

          w-64 h-64

          bg-emerald-400/5

          rounded-full

          blur-3xl
        "
      />

      {/* CONTENT */}

      <div
        className="
          relative

          flex items-center
          justify-between

          gap-6
        "
      >
        {/* LEFT */}

        <div
          className="
            flex items-start
            gap-4
          "
        >
          {/* ICON */}

          <div
            className="
              relative

              w-12 h-12

              rounded-2xl

              bg-gradient-to-br
              from-emerald-500
              to-green-500

              flex items-center
              justify-center

              shadow-lg
              shadow-emerald-500/20

              shrink-0
            "
          >
            {/* GLOW */}

            <div
              className="
                absolute inset-0

                rounded-2xl

                bg-emerald-400/20

                blur-xl
              "
            />

            <Camera
              size={18}
              className="
                relative
                text-white
              "
            />
          </div>

          {/* TEXT */}

          <div>
            <h2
              className="
                text-lg
                font-semibold
                text-gray-900
              "
            >
              Presence Detection
            </h2>

            <p
              className="
                mt-1

                text-sm
                text-gray-500

                leading-relaxed

                max-w-xl
              "
            >
              Camera-based attention tracking used to analyze focus and presence
              in real time. No recordings are stored.
            </p>
          </div>
        </div>

        {/* RIGHT */}

        <button
          onClick={onToggleCamera}
          className={`
            group

            relative

            h-12

            px-5

            rounded-2xl

            flex items-center
            gap-3

            text-sm
            font-medium

            shadow-sm

            transition-all
            duration-200

            hover:-translate-y-[1px]
            hover:shadow-md

            active:scale-[0.98]

            ${
              cameraEnabled
                ? `
                  bg-gradient-to-r
                  from-emerald-500
                  to-green-500

                  text-white

                  shadow-emerald-500/20
                `
                : `
                  bg-white/80
                  backdrop-blur-xl

                  border border-gray-200

                  text-gray-700
                `
            }
          `}
        >
          {/* STATUS DOT */}

          <div
            className={`
              w-2.5 h-2.5

              rounded-full

              ${cameraEnabled ? 'bg-white animate-pulse' : 'bg-gray-400'}
            `}
          />

          <Activity size={15} />

          {cameraEnabled ? 'Enabled' : 'Enable'}
        </button>
      </div>
    </div>
  );
}
