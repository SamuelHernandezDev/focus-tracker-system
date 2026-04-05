//frontend\app\session\page.tsx
"use client";

import { useAuth } from "@/modules/auth/hooks/useAuth";

export default function SessionPage() {
  const { user } = useAuth();

  return (
      <div className="p-10 space-y-6">
        <h1 className="text-xl font-semibold">Focus Session</h1>

        <p className="text-sm text-gray-500">
          User: {user?.email}
        </p>

        {/* Card principal */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm">
          <h2 className="text-lg font-medium mb-4">Session Control</h2>

          <div className="flex gap-4">
            <button className="px-4 py-2 rounded-md bg-green-500 text-white hover:opacity-90">
              Start Session
            </button>

            <button className="px-4 py-2 rounded-md bg-yellow-500 text-white hover:opacity-90">
              Pause
            </button>

            <button className="px-4 py-2 rounded-md bg-red-500 text-white hover:opacity-90">
              End Session
            </button>
          </div>
        </div>

        {/* Métricas dummy */}
        <div className="grid grid-cols-3 gap-4">
          <div className="rounded-xl border p-4 bg-[var(--card)]">
            <p className="text-sm text-gray-500">Active Time</p>
            <p className="text-lg font-semibold">25 min</p>
          </div>

          <div className="rounded-xl border p-4 bg-[var(--card)]">
            <p className="text-sm text-gray-500">Pauses</p>
            <p className="text-lg font-semibold">2</p>
          </div>

          <div className="rounded-xl border p-4 bg-[var(--card)]">
            <p className="text-sm text-gray-500">Focus Score</p>
            <p className="text-lg font-semibold">82%</p>
          </div>
        </div>
      </div>
  );
}