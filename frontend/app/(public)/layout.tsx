//frontend\app\(public)\layout.tsx
"use client";

import { useAuth } from "@/modules/auth/hooks/useAuth";
import Link from "next/link";

function PublicNavbar() {
  const { user } = useAuth();

  if (user) return null;

  return (
    <nav
      className="
        sticky top-0 z-50
        flex items-center justify-between
        px-8 py-4
        bg-white/80 backdrop-blur-md
        border-b border-[var(--border)]
      "
    >
      <h1 className="font-semibold text-base tracking-tight">
        Focus Tracker
      </h1>

      <div className="flex items-center gap-3">
        <Link
          href="/login"
          className="text-sm text-gray-500 hover:text-gray-900 transition"
        >
          Login
        </Link>

        <Link
          href="/login"
          className="
            px-4 py-2 rounded-lg
            bg-[var(--primary)]
            text-white text-sm font-medium
            shadow-sm hover:shadow-md
            hover:opacity-95
            transition
          "
        >
          Get Started
        </Link>
      </div>
    </nav>
  );
}

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PublicNavbar />
      {children}
    </>
  );
}