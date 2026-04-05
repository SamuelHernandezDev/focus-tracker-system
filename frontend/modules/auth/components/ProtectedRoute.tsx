//frontend\modules\auth\components\ProtectedRoute.tsx
"use client";

import { useAuth } from "@/modules/auth/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  // 🔹 Evita render mientras carga
  if (loading) {
    return <div className="p-10">Loading...</div>;
  }

  // 🔹 Evita flash si no hay user
  if (!user) return null;

  return <>{children}</>;
}