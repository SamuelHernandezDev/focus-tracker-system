//frontend/app/layout.tsx
"use client";

import "./globals.css";
import { AuthProvider } from "@/modules/auth/context/AuthContext";
import Link from "next/link";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { useRouter } from "next/navigation";

function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <nav className="p-4 border-b flex justify-between items-center">
      <div className="flex gap-4">
        <Link href="/">Home</Link>
        {user && <Link href="/dashboard">Dashboard</Link>}
        {user && <Link href="/session">Session</Link>}
      </div>

      <div>
        {user ? (
          <button
            onClick={handleLogout}
            className="text-sm bg-red-500 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        ) : (
          <Link href="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}