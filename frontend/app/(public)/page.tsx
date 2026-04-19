//frontend\app\(public)\page.tsx
"use client";

import Link from "next/link";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  if (loading) return null;

  return (
    <main className="min-h-screen p-10 space-y-16">
      {/* Hero */}
      <section className="space-y-6 max-w-2xl">
        <h1 className="text-4xl font-semibold">
          Improve your focus, understand your productivity
        </h1>

        <p className="text-gray-500 text-lg">
          Focus Tracker helps you monitor your work sessions, analyze your focus
          patterns, and get actionable insights to improve your performance.
        </p>

        <div className="flex gap-4">
          <Link
            href="/login"
            className="px-5 py-2.5 rounded-md bg-[var(--primary)] text-white hover:opacity-90"
          >
            Get Started
          </Link>

          <Link
            href="/dashboard"
            className="px-5 py-2.5 rounded-md border border-[var(--border)] bg-[var(--card)] hover:bg-gray-100"
          >
            View Demo
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="grid grid-cols-3 gap-6">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm">
          <h3 className="font-medium mb-2">Track Sessions</h3>
          <p className="text-sm text-gray-500">
            Record active and inactive time during your work sessions.
          </p>
        </div>

        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm">
          <h3 className="font-medium mb-2">Analyze Metrics</h3>
          <p className="text-sm text-gray-500">
            Understand your productivity through detailed statistics.
          </p>
        </div>

        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm">
          <h3 className="font-medium mb-2">Get Feedback</h3>
          <p className="text-sm text-gray-500">
            Receive recommendations to improve your focus habits.
          </p>
        </div>
      </section>

      {/* Simple preview */}
      <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm max-w-3xl">
        <h2 className="text-lg font-medium mb-4">How it works</h2>

        <div className="space-y-2 text-sm text-gray-500">
          <p>1. Start a focus session</p>
          <p>2. Track your activity automatically</p>
          <p>3. Analyze your results</p>
          <p>4. Improve your performance over time</p>
        </div>
      </section>
    </main>
  );
}