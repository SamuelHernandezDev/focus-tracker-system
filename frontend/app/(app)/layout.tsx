// frontend\app\(app)\layout.tsx
"use client";

import { useAuth } from "@/modules/auth/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import Sidebar from "@/modules/ui/components/sidebar/sidebar";
import Topbar from "@/modules/ui/components/Topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace("/login");
      }
    }
  }, [user, loading, router]);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (!user) return null;

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Content */}
      <div className="flex-1 flex flex-col">
        <Topbar />

        <main className="p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}