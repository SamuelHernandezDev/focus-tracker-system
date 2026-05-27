//frontend/modules/dashboard/components/DashboardTrend.tsx
'use client';

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Area,
  AreaChart,
} from 'recharts';

import { TrendingUp, Activity, Sparkles } from 'lucide-react';

type Props = {
  data: {
    date: string;
    score: number;
  }[];
};

export function DashboardTrend({ data }: Props) {
  const latestScore = data[data.length - 1]?.score || 0;

  const averageScore = Math.round(
    data.reduce((acc, item) => acc + item.score, 0) / data.length
  );

  return (
    <div
      className="
        relative

        overflow-hidden

        rounded-[32px]

        border border-white/40

        bg-gradient-to-br
        from-white
        via-white
        to-slate-50/80

        p-6

        shadow-sm
      "
    >
      {/* GLOW */}

      <div
        className="
          absolute
          top-0
          right-0

          w-64
          h-64

          rounded-full

          bg-indigo-500/10

          blur-3xl
        "
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

            mb-6
          "
        >
          <div>
            <h2
              className="
                text-lg
                font-semibold

                text-gray-900
              "
            >
              Focus Trend
            </h2>

            <p
              className="
                mt-1

                text-sm
                text-gray-500
              "
            >
              Focus score progression across sessions
            </p>
          </div>

          {/* ICON */}

          <div
            className="
              w-12
              h-12

              rounded-2xl

              bg-gradient-to-br
              from-indigo-500
              to-violet-500

              flex items-center
              justify-center

              shadow-lg
              shadow-indigo-500/20
            "
          >
            <Activity
              size={20}
              className="
                text-white
              "
            />
          </div>
        </div>

        {/* STATS */}

        <div
          className="
            grid grid-cols-2

            gap-3

            mb-6
          "
        >
          {/* AVG */}

          <div
            className="
              rounded-2xl

              border border-white/50

              bg-white/70

              backdrop-blur-xl

              p-4
            "
          >
            <div
              className="
                flex items-center
                gap-2
              "
            >
              <Sparkles
                size={14}
                className="
                  text-indigo-500
                "
              />

              <span
                className="
                  text-xs
                  font-medium

                  text-gray-500
                "
              >
                Average Score
              </span>
            </div>

            <div
              className="
                mt-2

                text-2xl
                font-semibold

                text-gray-900
              "
            >
              {averageScore}%
            </div>
          </div>

          {/* LATEST */}

          <div
            className="
              rounded-2xl

              border border-white/50

              bg-white/70

              backdrop-blur-xl

              p-4
            "
          >
            <div
              className="
                flex items-center
                gap-2
              "
            >
              <TrendingUp
                size={14}
                className="
                  text-emerald-500
                "
              />

              <span
                className="
                  text-xs
                  font-medium

                  text-gray-500
                "
              >
                Latest Score
              </span>
            </div>

            <div
              className="
                mt-2

                text-2xl
                font-semibold

                text-emerald-600
              "
            >
              {latestScore}%
            </div>
          </div>
        </div>

        {/* CHART */}

        <div
          className="
            h-[280px]
          "
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              {/* GRADIENT */}

              <defs>
                <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity={0.25} />

                  <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>

              {/* GRID */}

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e5e7eb"
                vertical={false}
              />

              {/* AXIS */}

              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tick={{
                  fontSize: 12,
                  fill: '#94a3b8',
                }}
              />

              <YAxis
                domain={[0, 100]}
                tickLine={false}
                axisLine={false}
                tick={{
                  fontSize: 12,
                  fill: '#94a3b8',
                }}
              />

              {/* TOOLTIP */}

              <Tooltip
                contentStyle={{
                  borderRadius: 16,
                  border: '1px solid rgba(255,255,255,0.4)',

                  background: 'rgba(255,255,255,0.85)',

                  backdropFilter: 'blur(12px)',

                  boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
                }}
              />

              {/* AREA */}

              <Area
                type="monotone"
                dataKey="score"
                stroke="transparent"
                fill="url(#scoreGradient)"
              />

              {/* LINE */}

              <Line
                type="monotone"
                dataKey="score"
                stroke="#6366f1"
                strokeWidth={4}
                dot={{
                  r: 5,
                  fill: '#6366f1',
                  strokeWidth: 0,
                }}
                activeDot={{
                  r: 7,
                  fill: '#4f46e5',
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
