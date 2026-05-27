//frontend/modules/focus/components/cameraPreview/CameraDisabledOverlay.tsx
'use client';

import clsx from 'clsx';
import Lottie from 'lottie-react';

import faceScanAnimation from '@/public/animations/face-scan.json';

type Props = {
  disabled: boolean;
};

export function CameraDisabledOverlay({ disabled }: Props) {
  return (
    <div
      className={clsx(
        `
          absolute inset-0
          z-30

          flex flex-col
          items-center
          justify-center

          overflow-hidden
          rounded-[28px]

          transition-all
          duration-700
          ease-[cubic-bezier(0.22,1,0.36,1)]
        `,
        disabled
          ? `
              opacity-100
              scale-100
              backdrop-blur-[3px]
            `
          : `
              opacity-0
              scale-[1.03]
              backdrop-blur-0

              pointer-events-none
            `
      )}
    >
      {/* DARK BACKDROP */}

      <div
        className={clsx(
          `
            absolute inset-0

            transition-all
            duration-700
          `,
          disabled
            ? `
                bg-black/45
              `
            : `
                bg-black/0
              `
        )}
      />

      {/* GLOW ORBS */}

      <div
        className={clsx(
          `
            absolute

            w-[420px]
            h-[420px]

            rounded-full

            bg-indigo-500/20
            blur-3xl

            transition-all
            duration-1000
          `,
          disabled
            ? `
                opacity-100
                scale-100
              `
            : `
                opacity-0
                scale-150
              `
        )}
      />

      {/* SCANNING GRID */}

      <div
        className="
          absolute inset-0

          opacity-[0.06]

          bg-[linear-gradient(rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.15)_1px,transparent_1px)]

          bg-[size:28px_28px]
        "
      />

      {/* CONTENT */}

      <div
        className={clsx(
          `
            relative z-10

            flex flex-col
            items-center

            transition-all
            duration-700
            ease-[cubic-bezier(0.22,1,0.36,1)]
          `,
          disabled
            ? `
                opacity-100
                translate-y-0
                scale-100
              `
            : `
                opacity-0
                translate-y-6
                scale-95
              `
        )}
      >
        {/* LOTTIE */}

        <div
          className={clsx(
            `
              relative

              transition-all
              duration-700
            `,
            disabled
              ? `
                  opacity-100
                  scale-100
                  rotate-0
                `
              : `
                  opacity-0
                  scale-75
                  rotate-[-8deg]
                `
          )}
        >
          {/* OUTER RING */}

          <div
            className="
              absolute inset-0

              rounded-full

              border border-indigo-400/20

              animate-ping
            "
          />

          <Lottie
            animationData={faceScanAnimation}
            loop={disabled}
            autoplay={disabled}
            className="
              w-44
              h-44

              opacity-90

              drop-shadow-[0_0_40px_rgba(99,102,241,0.45)]
            "
          />
        </div>

        {/* CARD */}

        <div
          className="
            mt-2

            px-6
            py-4

            rounded-3xl

            border border-white/10

            bg-white/[0.06]

            backdrop-blur-2xl

            shadow-[0_10px_60px_rgba(0,0,0,0.45)]

            text-center
          "
        >
          <p
            className="
              text-sm
              font-semibold
              tracking-wide

              text-white
            "
          >
            Camera Monitoring Disabled
          </p>

          <p
            className="
              mt-1

              max-w-[240px]

              text-xs
              leading-relaxed

              text-gray-300
            "
          >
            Enable presence detection to reactivate real-time focus tracking
          </p>
        </div>
      </div>
    </div>
  );
}
