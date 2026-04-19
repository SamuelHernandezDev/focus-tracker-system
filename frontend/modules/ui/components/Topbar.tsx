//frontend\modules\admin\ui\components\Topbar.tsx
"use client";

import { useAuth } from "@/modules/auth/hooks/useAuth";
import { useRouter } from "next/navigation";
import { Bell } from "lucide-react";

export default function Topbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace("/login"); 
  };

  return (
    <div className="flex justify-between items-center px-11 py-4 border-b border-[var(--border)] bg-white">
      
      {/* LEFT */}
      <span className="text-sm text-gray-600 ">
       Session
      </span>

      {/* RIGHT */}
      <div className="flex items-center gap-4">

        {/* NOTIFICATIONS */}
        <button className="relative p-2 rounded-md hover:bg-gray-100 transition">
          <Bell size={18} />

          {/* DOT */}
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* USER */}
        <span className="text-sm text-gray-700 font-medium">
          {user?.email}
        </span>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="text-sm px-3 py-1 rounded-md bg-red-500 text-white hover:opacity-90 transition"
        >
          Logout
        </button>

      </div>
    </div>
  );
}