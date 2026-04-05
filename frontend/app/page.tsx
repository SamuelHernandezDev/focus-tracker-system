//frontend\app\page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <main className="p-10 space-y-4">
      <h1 className="text-2xl font-bold">Focus Tracker</h1>

      <div className="flex gap-4">
        <Link href="/login">Login</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/session">Session</Link>
      </div>
    </main>
  );
}