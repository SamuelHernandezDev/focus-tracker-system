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
      router.replace("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  if (!user) return null;

  return <>{children}</>;
}