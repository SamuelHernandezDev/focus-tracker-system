//frontend\app\(app)\dashboard\sessions\page.tsx
"use client";

import { useState } from "react";

import { Loading } from "@/components/ui/Loading";
import { ErrorState } from "@/components/ui/ErrorState";

import { SessionsHeader } from "@/modules/sessions/components/SessionsHeader";
import { SessionsTable } from "@/modules/sessions/components/SessionTable";
import { useSessions } from "@/modules/sessions/hooks/useSessions";

export default function SessionsPage() {
  const { sessions, loading } = useSessions();

  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleRow = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  if (loading) return <Loading />;

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