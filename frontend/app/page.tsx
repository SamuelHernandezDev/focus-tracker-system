//frontend\app\page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold">Focus Tracker</h1>
      <p className="text-gray-500 mt-2">
        Welcome to your focus tracking dashboard
      </p>
    </main>
  );
}