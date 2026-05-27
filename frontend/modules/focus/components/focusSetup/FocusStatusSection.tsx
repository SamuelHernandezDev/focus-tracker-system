//frontend\modules\focus\components\focusSetup\FocusStatusSection.tsx
'use client';

import { Activity, Timer, Sparkles } from 'lucide-react';

type Props = {
  sessionActive: boolean;

  sessionId?: string | null;
};

export function FocusStatusSection({ sessionActive, sessionId }: Props) {
  // ======================
  // HIDDEN
  // ======================

  if (!sessionActive) {
    return null;
  }

  return (
    <div
      className="
        relative

        overflow-hidden

        rounded-3xl

        border border-emerald-100

        bg-gradient-to-br
        from-emerald-50
        via-white
        to-green-50

        p-5

        shadow-sm
      "
    >
      {/* BACKGROUND GLOW */}

      <div
        className="
          absolute
          top-0 right-0

          w-64 h-64

          bg-emerald-400/10

          rounded-full

          blur-3xl
        "
      />

      {/* CONTENT */}

      <div
        className="
          relative z-10

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
            {/* PULSE */}

            <div
              className="
                absolute inset-0

                rounded-2xl

                bg-emerald-400/30

                animate-ping
              "
            />

            <Activity
              size={18}
              className="
                relative z-10
                text-white
              "
            />
          </div>

          {/* TEXT */}

          <div>
            <div
              className="
                flex items-center
                gap-2
              "
            >
              <h2
                className="
                  text-lg
                  font-semibold
                  text-gray-900
                "
              >
                Session Active
              </h2>

              <div
                className="
                  px-2 py-1

                  rounded-full

                  bg-emerald-100
                  text-emerald-700

                  text-[11px]
                  font-medium

                  flex items-center
                  gap-1
                "
              >
                <Sparkles size={10} />
                LIVE
              </div>
            </div>

            <p
              className="
                mt-0.5

                text-sm
                text-gray-500

                leading-relaxed
              "
            >
              AI attention tracking is actively monitoring your focus behavior
              in real time.
            </p>

            {/* SESSION ID */}

            {sessionId && (
              <div
                className="
                  mt-2

                  flex items-center
                  gap-2

                  text-xs
                  text-gray-400
                "
              >
                <Timer size={12} />
                Session #{sessionId.slice(0, 8)}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT */}

        <div
          className="
            hidden md:flex

            items-center
            gap-3
          "
        >
          {/* DOT */}

          <div
            className="
              relative

              w-4 h-4
            "
          >
            <div
              className="
                absolute inset-0

                rounded-full

                bg-emerald-400

                animate-ping
              "
            />

            <div
              className="
                relative

                w-4 h-4

                rounded-full

                bg-emerald-500
              "
            />
          </div>

          <span
            className="
              text-sm
              font-medium
              text-emerald-700
            "
          >
            Tracking Live
          </span>
        </div>
      </div>
    </div>
  );
}
