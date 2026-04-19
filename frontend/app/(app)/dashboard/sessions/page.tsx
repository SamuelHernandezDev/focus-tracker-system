//frontend\app\(app)\dashboard\sessions\page.tsx
"use client";

import { useState, useMemo } from "react";

import { Loading } from "@/components/ui/Loading";
import { ErrorState } from "@/components/ui/ErrorState";

import { SessionsHeader } from "@/modules/sessions/components/SessionsHeader";
import { SessionsTable } from "@/modules/sessions/components/SessionTable";

export default function SessionsPage() {
  const sessions = useMemo(() => [
    {
      id: "1",
      date: "2026-04-19",
      duration: 40,
      score: 80,
      interruptions: 3,
    },
    {
      id: "2",
      date: "2026-04-18",
      duration: 30,
      score: 70,
      interruptions: 5,
    },
  ], []);

  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleRow = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const isLoading = false;
  const error = null;

  if (isLoading) return <Loading />;
  if (error) return <ErrorState />;

  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <SessionsHeader />

      {/* TABLE */}
      <SessionsTable
        data={sessions}
        expandedId={expandedId}
        onToggle={toggleRow}
      />

    </div>
  );
}