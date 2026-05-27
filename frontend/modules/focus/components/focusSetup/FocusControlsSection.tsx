//frontend\modules\focus\components\focusSetup\FocusControlsSection.tsx
'use client';

import { PlayCircle, StopCircle, Sparkles } from 'lucide-react';

type Props = {
  sessionActive: boolean;

  loading: boolean;

  onStart: () => void;

  onStop: () => void;
};

export function FocusControlsSection({
  sessionActive,
  loading,
  onStart,
  onStop,
}: Props) {
  return (
    <div
      className="
        flex items-center
        gap-4
      "
    >
      {/* START */}

      {!sessionActive && (
        <button
          onClick={onStart}
          disabled={loading}
          className="
            group

            relative

            overflow-hidden

            h-14

            px-7

            rounded-2xl

            flex items-center
            gap-3

            bg-gradient-to-r
            from-[var(--primary)]
            to-indigo-500

            text-white

            shadow-lg
            shadow-indigo-500/20

            hover:-translate-y-[2px]
            hover:shadow-xl
            hover:shadow-indigo-500/30

            active:scale-[0.98]

            transition-all
            duration-300

    disabled:opacity-60
disabled:grayscale-[0.2]
disabled:shadow-none
disabled:cursor-not-allowed
          "
        >
          {/* GLOW */}

          <div
            className="
              absolute
              inset-0

              bg-white/10

              opacity-0
              group-hover:opacity-100

              transition
            "
          />

          {/* ICON */}

          <div
            className="
              relative 

              w-8 h-8

              rounded-xl

              bg-white/15

              flex items-center
              justify-center

              backdrop-blur-sm
            "
          >
            <PlayCircle size={18} />
          </div>

          {/* TEXT */}

          <div
            className="
              relative

              flex flex-col
              items-start
            "
          >
            <span
              className="
                text-sm
                font-semibold
              "
            >
              Start Session
            </span>

            <span
              className="
                text-[11px]
                text-indigo-100
              "
            >
              Begin focus tracking
            </span>
          </div>
        </button>
      )}

      {/* STOP */}

      {sessionActive && (
        <button
          onClick={onStop}
          disabled={loading}
          className="
            group

            relative

            overflow-hidden

            h-14

            px-7

            rounded-2xl

            flex items-center
            gap-3

            bg-gradient-to-r
            from-red-500
            to-rose-500

            text-white

            shadow-lg
            shadow-red-500/20

            hover:-translate-y-[2px]
            hover:shadow-xl
            hover:shadow-red-500/30

            active:scale-[0.98]

            transition-all
            duration-300

            disabled:opacity-50
            disabled:pointer-events-none
          "
        >
          {/* GLOW */}

          <div
            className="
              absolute
              inset-0

              bg-white/10

              opacity-0
              group-hover:opacity-100

              transition
            "
          />

          {/* ICON */}

          <div
            className="
              relative

              w-8 h-8

              rounded-xl

              bg-white/15

              flex items-center
              justify-center

              backdrop-blur-sm
            "
          >
            <StopCircle size={18} />
          </div>

          {/* TEXT */}

          <div
            className="
              relative 

              flex flex-col
              items-start
            "
          >
            <span
              className="
                text-sm
                font-semibold
              "
            >
              Stop Session
            </span>

            <span
              className="
                text-[11px]
                text-red-100
              "
            >
              Finish analysis
            </span>
          </div>
        </button>
      )}

      {/* STATUS */}

      <div
        className="
          hidden md:flex

          items-center
          gap-2

          px-4 py-3

          rounded-2xl

          bg-white/70
          backdrop-blur-xl

          border border-white/40

          shadow-sm
        "
      >
        <div
          className={`
            w-2.5 h-2.5

            rounded-full

            ${sessionActive ? 'bg-emerald-500 animate-pulse' : 'bg-gray-300'}
          `}
        />

        <span
          className="
            text-sm
            font-medium
            text-gray-600
          "
        >
          {sessionActive ? 'Tracking Active' : 'Waiting Session'}
        </span>

        <Sparkles
          size={14}
          className="
            text-indigo-400
          "
        />
      </div>
    </div>
  );
}
