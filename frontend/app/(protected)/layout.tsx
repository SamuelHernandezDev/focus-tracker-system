//frontend\app\(protected)\layout.tsx
"use client";

import ProtectedRoute from "@/modules/auth/components/ProtectedRoute";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}