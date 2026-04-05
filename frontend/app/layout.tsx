//frontend\app\layout.tsx
import "./globals.css";
import { AuthProvider } from "@/modules/auth/context/AuthContext";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <nav className="p-4 border-b flex gap-4">
            <Link href="/">Home</Link>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/session">Session</Link>
          </nav>

          {children}
        </AuthProvider>
      </body>
    </html>
  );
}