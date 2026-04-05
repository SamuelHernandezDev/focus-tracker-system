//frontend\app\dashboard\page.tsx
//frontend/app/dashboard/page.tsx
"use client";

import ProtectedRoute from "@/modules/auth/components/ProtectedRoute";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <ProtectedRoute>
      <div className="p-10 space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <p className="text-sm text-gray-500">
              Welcome back, {user?.email}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-md bg-red-500 text-white px-4 py-2 hover:opacity-90"
          >
            Logout
          </button>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-6">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm">
            <p className="text-sm text-gray-500">Total Sessions</p>
            <p className="text-2xl font-semibold mt-2">12</p>
          </div>

          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm">
            <p className="text-sm text-gray-500">Focus Time</p>
            <p className="text-2xl font-semibold mt-2">5h 32m</p>
          </div>

          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm">
            <p className="text-sm text-gray-500">Avg. Score</p>
            <p className="text-2xl font-semibold mt-2">78%</p>
          </div>
        </div>

        {/* Recent Sessions */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm">
          <h2 className="text-lg font-medium mb-4">Recent Sessions</h2>

          <div className="space-y-3">
            {[1, 2, 3].map((session) => (
              <div
                key={session}
                className="flex justify-between items-center border-b pb-2 last:border-none"
              >
                <div>
                  <p className="font-medium">Session #{session}</p>
                  <p className="text-sm text-gray-500">25 min • 80% focus</p>
                </div>

                <span className="text-sm text-gray-400">Today</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-4">
          <button className="px-4 py-2 rounded-md bg-[var(--primary)] text-white hover:opacity-90">
            Start New Session
          </button>

          <button className="px-4 py-2 rounded-md border border-[var(--border)] bg-[var(--card)] hover:bg-gray-100">
            View History
          </button>
        </div>
      </div>
    </ProtectedRoute>
  );
}