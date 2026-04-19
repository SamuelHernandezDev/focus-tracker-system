//frontend\app\(app)\dashboard\page.tsx
"use client";

import { useMemo } from "react";

import { DashboardHeader } from "@/modules/dashboard/components/DashboardHeader";
import { DashboardKpis } from "@/modules/dashboard/components/DashboardKpis";
import { DashboardRecentSessions } from "@/modules/dashboard/components/DashboardRecentSessions";
import { DashboardTrend } from "@/modules/dashboard/components/DashboardTrend";

export default function DashboardPage() {
  const data = useMemo(() => ({
    stats: {
      sessionsToday: 3,
      totalTime: 120,
      avgScore: 78,
    },
    recentSessions: [
      { id: "1", duration: 40, score: 80, date: "2026-04-19" },
      { id: "2", duration: 30, score: 70, date: "2026-04-18" },
    ],
  }), []);

  const trendData = [
    { date: "Mon", score: 65 },
    { date: "Tue", score: 72 },
    { date: "Wed", score: 80 },
    { date: "Thu", score: 60 },
    { date: "Fri", score: 85 },
  ];

  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <DashboardHeader
        sessionActive={false}
        presenceDetected={true}
      />

      {/* KPIs COMPONENT */}
      <DashboardKpis
        data={{
          focusTime: data.stats.totalTime,
          idleTime: 30, 
          interruptions: 5, 
          score: data.stats.avgScore,
        }}
      />

      {/* SESSIONS COMPONENT */}
      <DashboardRecentSessions sessions={data.recentSessions} />

      {/* TREND COMPONENT */}
      <DashboardTrend data={trendData} />

    </div>
  );
}