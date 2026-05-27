//frontend/modules/dashboard/components/DashboardKpis.tsx

import {
  Clock,
  PauseCircle,
  Activity,
  Brain,
  TrendingUp,
  TrendingDown,
  Minus,
} from 'lucide-react';

type Props = {
  data: {
    focusTime: number;
    idleTime: number;
    interruptions: number;
    score: number;
  };
};

function getScoreColor(score: number) {
  if (score >= 80) return 'text-emerald-600';

  if (score >= 60) return 'text-amber-500';

  return 'text-rose-500';
}

function getTrendIcon(score: number) {
  if (score >= 80) {
    return <TrendingUp size={16} className="text-emerald-500" />;
  }

  if (score >= 60) {
    return <Minus size={16} className="text-amber-500" />;
  }

  return <TrendingDown size={16} className="text-rose-500" />;
}

const KPI_CARDS = [
  {
    title: 'Focus Time',
    valueKey: 'focusTime',
    suffix: 'min',

    icon: Clock,

    gradient: 'from-blue-500/10 via-indigo-500/5 to-transparent',

    iconBg: 'from-blue-500 to-indigo-500',

    glow: 'bg-blue-500/10',
  },

  {
    title: 'Idle Time',
    valueKey: 'idleTime',
    suffix: 'min',

    icon: PauseCircle,

    gradient: 'from-amber-500/10 via-orange-500/5 to-transparent',

    iconBg: 'from-amber-500 to-orange-500',

    glow: 'bg-amber-500/10',
  },

  {
    title: 'Interruptions',
    valueKey: 'interruptions',

    suffix: '',

    icon: Activity,

    gradient: 'from-rose-500/10 via-pink-500/5 to-transparent',

    iconBg: 'from-rose-500 to-pink-500',

    glow: 'bg-rose-500/10',
  },

  {
    title: 'Focus Score',
    valueKey: 'score',
    suffix: '%',

    icon: Brain,

    gradient: 'from-emerald-500/10 via-green-500/5 to-transparent',

    iconBg: 'from-emerald-500 to-green-500',

    glow: 'bg-emerald-500/10',
  },
] as const;

export function DashboardKpis({ data }: Props) {
  return (
    <div
      className="
        grid

        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-4

        gap-4
      "
    >
      {KPI_CARDS.map((card) => {
        const Icon = card.icon;

        const value = data[card.valueKey as keyof typeof data];

        const isScore = card.valueKey === 'score';

        return (
          <div
            key={card.title}
            className={`
              group

              relative

              overflow-hidden

              rounded-[28px]

              border border-white/40

              bg-gradient-to-br
              from-white
              via-white
              to-slate-50/80

              p-5

              shadow-sm

              hover:-translate-y-[2px]
              hover:shadow-xl
              hover:shadow-black/[0.04]

              transition-all
              duration-300
            `}
          >
            {/* GLOW */}

            <div
              className={`
                absolute
                -top-10
                -right-10

                w-36
                h-36

                rounded-full

                blur-3xl

                transition-all
                duration-500

                group-hover:scale-125

                ${card.glow}
              `}
            />

            {/* GRADIENT OVERLAY */}

            <div
              className={`
                absolute inset-0

                bg-gradient-to-br

                opacity-80

                ${card.gradient}
              `}
            />

            {/* CONTENT */}

            <div
              className="
                relative z-10
              "
            >
              {/* HEADER */}

              <div
                className="
                  flex items-start
                  justify-between
                "
              >
                <div>
                  <p
                    className="
                      text-sm
                      font-medium

                      text-gray-500
                    "
                  >
                    {card.title}
                  </p>

                  <div
                    className="
                      mt-3

                      flex items-end
                      gap-2
                    "
                  >
                    <h3
                      className={`
                        text-3xl
                        font-semibold
                        tracking-tight

                        ${isScore ? getScoreColor(data.score) : 'text-gray-900'}
                      `}
                    >
                      {value}
                      {card.suffix}
                    </h3>

                    {isScore && (
                      <div
                        className="
                          mb-1
                        "
                      >
                        {getTrendIcon(data.score)}
                      </div>
                    )}
                  </div>
                </div>

                {/* ICON */}

                <div
                  className={`
                    w-12
                    h-12

                    rounded-2xl

                    bg-gradient-to-br

                    flex items-center
                    justify-center

                    shadow-lg

                    ${card.iconBg}
                  `}
                >
                  <Icon
                    size={20}
                    className="
                      text-white
                    "
                  />
                </div>
              </div>

              {/* FOOTER */}

              <div
                className="
                  mt-6

                  flex items-center
                  gap-2
                "
              >
                <div
                  className="
                    h-2
                    w-2

                    rounded-full

                    bg-emerald-400
                  "
                />

                <span
                  className="
                    text-xs
                    font-medium

                    text-gray-500
                  "
                >
                  Updated from latest sessions
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
