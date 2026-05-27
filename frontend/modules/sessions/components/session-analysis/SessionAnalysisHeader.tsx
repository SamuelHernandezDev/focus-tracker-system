//frontend/modules/sessions/components/session-analysis/SessionAnalysisHeader.tsx

'use client';

import { Brain, X } from 'lucide-react';

type Props = {
  sessionId: string;

  onClose: () => void;
};

export function SessionAnalysisHeader({ sessionId, onClose }: Props) {
  return (
    <div
      className="
        sticky top-0 z-20

        backdrop-blur-xl

        bg-gradient-to-r
        from-white/90
        via-blue-50/80
        to-indigo-50/90

        border-b border-white/40

        px-8 py-5

        flex items-center
        justify-between
      "
    >
      {/* LEFT */}

      <div
        className="
          flex items-center gap-4
        "
      >
        {/* ICON */}

        <div
          className="
            relative

            w-14 h-14

            rounded-2xl

            bg-gradient-to-br
            from-[var(--primary)]
            to-indigo-500

            flex items-center
            justify-center

            shadow-lg
            shadow-indigo-500/20
          "
        >
          {/* GLOW */}

          <div
            className="
              absolute inset-0

              rounded-2xl

              bg-indigo-400/20

              blur-xl
            "
          />

          <Brain
            size={24}
            className="
              relative z-10
              text-white
            "
          />
        </div>

        {/* TEXT */}

        <div>
          <h2
            className="
              text-2xl
              font-bold

              tracking-tight

              bg-gradient-to-r
              from-gray-900
              to-gray-600

              bg-clip-text
              text-transparent
            "
          >
            Behavioral Analysis
          </h2>

          <div
            className="
              flex items-center
              gap-2

              mt-1
            "
          >
            <div
              className="
                w-2 h-2
                rounded-full

                bg-emerald-500

                animate-pulse
              "
            />

            <p
              className="
                text-sm
                text-gray-500
              "
            >
              Session #{sessionId.slice(0, 8)}
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT */}

      <button
        onClick={onClose}
        className="
          group

          relative

          w-11 h-11

          rounded-2xl

          bg-white/70

          border border-white/60

          shadow-sm

          flex items-center
          justify-center

          hover:bg-white
          hover:shadow-md
          hover:scale-105

          active:scale-95

          transition-all
          duration-200
        "
      >
        {/* HOVER GLOW */}

        <div
          className="
            absolute inset-0

            rounded-2xl

            bg-red-400/0

            group-hover:bg-red-400/10

            transition
          "
        />

        <X
          size={18}
          className="
            relative z-10

            text-gray-600

            group-hover:text-red-500

            transition-colors
          "
        />
      </button>
    </div>
  );
}
