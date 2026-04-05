//frontend\app\dashboard\page.tsx
"use client";

import { useAuth } from "@/modules/auth/hooks/useAuth";

export default function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <div className="p-10">
      <h1>Dashboard</h1>

      {user ? (
        <>
          <p>Welcome: {user.email}</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        user && <p className="text-green-600">Logged in</p>
      )}
    </div>
  );
}