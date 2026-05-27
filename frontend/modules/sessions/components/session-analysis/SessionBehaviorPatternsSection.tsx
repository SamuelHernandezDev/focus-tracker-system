//frontend/modules/sessions/components/session-analysis/SessionBehaviorPatternsSection.tsx

'use client';

import { Brain, Sparkles } from 'lucide-react';

type Props = {
  insights?: string[];
};

export function SessionBehaviorPatternsSection({ insights = [] }: Props) {
  // ======================
  // EMPTY
  // ======================

  if (!insights.length) {
    return null;
  }

  return (
    <div className="space-y-5">
      {/* HEADER */}

      <div
        className="
          flex items-center
          justify-between
        "
      >
        {/* LEFT */}

        <div
          className="
            flex items-center gap-3
          "
        >
          {/* ICON */}

          <div
            className="
              relative

              w-11 h-11

              rounded-2xl

              bg-gradient-to-br
              from-violet-500
              to-indigo-500

              flex items-center
              justify-center

              shadow-lg
              shadow-violet-500/20
            "
          >
            <div
              className="
                absolute inset-0

                rounded-2xl

                bg-violet-400/20

                blur-xl
              "
            />

            <Brain
              size={18}
              className="
                relative z-10
                text-white
              "
            />
          </div>

          {/* TEXT */}

          <div>
            <h3
              className="
                text-lg
                font-semibold
                text-gray-900
              "
            >
              Behavior Patterns
            </h3>

            <p
              className="
                text-sm
                text-gray-500
              "
            >
              AI-detected behavioral signals and cognitive tendencies
            </p>
          </div>
        </div>

        {/* BADGE */}

        <div
          className="
            hidden md:flex

            items-center gap-2

            px-3 py-1.5

            rounded-full

            bg-violet-100
            text-violet-700

            text-xs
            font-medium
          "
        >
          <Sparkles size={14} />
          {insights.length} Insights
        </div>
      </div>

      {/* INSIGHTS */}

      <div
        className="
          grid md:grid-cols-2
          gap-5
        "
      >
        {insights.map((insight, index) => (
          <div
            key={index}
            className="
                group
                relative

                overflow-hidden

                rounded-3xl

                border border-white/50

                bg-gradient-to-br
                from-white
                to-violet-50/60

                p-5

                shadow-sm

                hover:shadow-xl
                hover:shadow-violet-500/10

                hover:-translate-y-1

                transition-all
                duration-300
              "
          >
            {/* GLOW */}

            <div
              className="
                  absolute
                  top-0 right-0

                  w-32 h-32

                  bg-violet-400/10

                  rounded-full

                  blur-3xl

                  opacity-0
                  group-hover:opacity-100

                  transition
                "
            />

            {/* CONTENT */}

            <div
              className="
                  relative z-10

                  flex items-start
                  gap-4
                "
            >
              {/* NUMBER */}

              <div
                className="
                    shrink-0

                    w-9 h-9

                    rounded-2xl

                    bg-gradient-to-br
                    from-violet-500
                    to-indigo-500

                    flex items-center
                    justify-center

                    text-white
                    text-sm
                    font-bold

                    shadow-md
                  "
              >
                {index + 1}
              </div>

              {/* TEXT */}

              <div className="flex-1">
                <p
                  className="
                      text-[15px]
                      text-gray-700

                      leading-relaxed
                    "
                >
                  {insight}
                </p>

                {/* FOOTER */}

                <div
                  className="
                      mt-4

                      flex items-center
                      gap-2
                    "
                >
                  <div
                    className="
                        w-2 h-2
                        rounded-full

                        bg-emerald-500
                      "
                  />

                  <span
                    className="
                        text-xs
                        text-gray-400
                      "
                  >
                    Behavioral pattern detected
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
