//frontend/app/(app)/dashboard/page.tsx
'use client';

import { useMemo } from 'react';

import { LayoutDashboard } from 'lucide-react';

import { PageHeader } from '@/components/ui/PageHeader';

import { DashboardKpis } from '@/modules/dashboard/components/DashboardKpis';

import { DashboardRecentSessions } from '@/modules/dashboard/components/DashboardRecentSessions';

import { DashboardTrend } from '@/modules/dashboard/components/DashboardTrend';

export default function DashboardPage() {
  const data = useMemo(
    () => ({
      stats: {
        sessionsToday: 3,
        totalTime: 120,
        avgScore: 78,
      },

      recentSessions: [
        {
          id: '1',
          duration: 40,
          score: 80,
          date: '2026-04-19',
        },

        {
          id: '2',
          duration: 30,
          score: 70,
          date: '2026-04-18',
        },
      ],
    }),
    []
  );

  const trendData = [
    { date: 'Mon', score: 65 },
    { date: 'Tue', score: 72 },
    { date: 'Wed', score: 80 },
    { date: 'Thu', score: 60 },
    { date: 'Fri', score: 85 },
  ];

  return (
    <div
      className="
        h-[calc(94vh-64px)]

        flex flex-col

        bg-gray-50

        overflow-hidden
      "
    >
      {/* PAGE HEADER */}

      <div
        className="
          px-8
          pt-6
          pb-3

          shrink-0
        "
      >
        <PageHeader
          icon={LayoutDashboard}
          title="Overview Dashboard"
          description="Monitor your focus analytics, sessions and productivity trends"
        />
      </div>

      {/* CONTENT */}

      <div
        className="
          flex-1

          px-8
          pb-6

          min-h-0

          overflow-y-auto
        "
      >
        {/* LAYOUT */}

        <div
          className="
            space-y-4
          "
        >
          {/* KPI GRID */}

          <DashboardKpis
            data={{
              focusTime: data.stats.totalTime,
              idleTime: 30,
              interruptions: 5,
              score: data.stats.avgScore,
            }}
          />

          {/* BOTTOM GRID */}

          <div
            className="
              grid

              xl:grid-cols-[1.1fr_0.9fr]

              gap-4
            "
          >
            {/* RECENT SESSIONS */}

            <DashboardRecentSessions sessions={data.recentSessions} />

            {/* TREND */}

            <DashboardTrend data={trendData} />
          </div>
        </div>
      </div>
    </div>
  );
}
