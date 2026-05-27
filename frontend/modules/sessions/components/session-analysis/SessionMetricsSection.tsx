//frontend/modules/sessions/components/session-analysis/SessionMetricsSection.tsx

'use client';

import {
  Activity,
  Keyboard,
  MousePointerClick,
  Timer,
  Globe,
} from 'lucide-react';

type Props = {
  session: any;
};

export function SessionMetricsSection({ session }: Props) {
  const metrics = [
    {
      label: 'Focus Time',
      value: `${Math.round((session.focusTime || 0) / 60)} min`,
      icon: Timer,

      color: 'from-blue-500 to-cyan-500',

      glow: 'shadow-blue-500/20',
    },

    {
      label: 'Keyboard Events',
      value: session.keyboardEvents || 0,

      icon: Keyboard,

      color: 'from-violet-500 to-purple-500',

      glow: 'shadow-violet-500/20',
    },

    {
      label: 'Mouse Events',
      value: session.mouseEvents || 0,

      icon: MousePointerClick,

      color: 'from-pink-500 to-rose-500',

      glow: 'shadow-pink-500/20',
    },

    {
      label: 'Total Interactions',
      value: session.totalInteractions || 0,

      icon: Activity,

      color: 'from-emerald-500 to-green-500',

      glow: 'shadow-emerald-500/20',
    },

    {
      label: 'Interaction Rate',
      value: `${(session.averageInteractionRate || 0).toFixed(1)}/min`,

      icon: Activity,

      color: 'from-orange-500 to-amber-500',

      glow: 'shadow-orange-500/20',
    },

    {
      label: 'Active Domains',
      value: session.activeDomainsCount || 0,

      icon: Globe,

      color: 'from-indigo-500 to-blue-500',

      glow: 'shadow-indigo-500/20',
    },
  ];

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
              from-slate-800
              to-slate-700

              flex items-center
              justify-center

              shadow-lg
              shadow-slate-500/20
            "
          >
            <div
              className="
                absolute inset-0

                rounded-2xl

                bg-slate-400/10

                blur-xl
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
            <h3
              className="
                text-lg
                font-semibold
                text-gray-900
              "
            >
              Session Metrics
            </h3>

            <p
              className="
                text-sm
                text-gray-500
              "
            >
              Behavioral telemetry and interaction analytics
            </p>
          </div>
        </div>
      </div>

      {/* GRID */}

      <div
        className="
          grid
          md:grid-cols-2
          xl:grid-cols-3

          gap-5
        "
      >
        {metrics.map((metric, index) => {
          const Icon = metric.icon;

          return (
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
                  to-gray-50/80

                  p-5

                  shadow-sm

                  hover:-translate-y-1
                  hover:shadow-xl

                  transition-all
                  duration-300
                "
            >
              {/* GLOW */}

              <div
                className={`
                    absolute
                    top-0 right-0

                    w-28 h-28

                    rounded-full

                    blur-3xl

                    opacity-0
                    group-hover:opacity-100

                    transition

                    bg-gradient-to-br
                    ${metric.color}
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
                  {/* LABEL */}

                  <div>
                    <p
                      className="
                          text-sm
                          text-gray-500
                        "
                    >
                      {metric.label}
                    </p>
                  </div>

                  {/* ICON */}

                  <div
                    className={`
                        w-11 h-11

                        rounded-2xl

                        bg-gradient-to-br
                        ${metric.color}

                        flex items-center
                        justify-center

                        shadow-lg
                        ${metric.glow}
                      `}
                  >
                    <Icon
                      size={18}
                      className="
                          text-white
                        "
                    />
                  </div>
                </div>

                {/* VALUE */}

                <div
                  className="
                      mt-6
                    "
                >
                  <h4
                    className="
                        text-4xl
                        font-bold

                        tracking-tight

                        text-gray-900
                      "
                  >
                    {metric.value}
                  </h4>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
