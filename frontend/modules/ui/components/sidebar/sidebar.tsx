//frontend\modules\ui\components\sidebar\Sidebar.tsx
"use client";

import { Settings } from "lucide-react";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { useState, useEffect } from "react";

import SidebarHeader from "./sidebarHeader";
import SidebarSection from "./sidebarSection";
import SettingsModal from "./settingsModal";

import { appLinks, actionLinks } from "./sidebar.config";

const STORAGE_KEY = "sidebar:collapsed";

export default function Sidebar() {
  const { user } = useAuth();

  const [collapsed, setCollapsed] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem(STORAGE_KEY) === "true";
  });

  const [openSettings, setOpenSettings] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, String(collapsed));
  }, [collapsed]);

  if (!user) return null;

  return (
    <>
      <aside
        className={`
          h-screen bg-gray-900 text-gray-300 border-r border-gray-800
          flex flex-col transition-[width] duration-300
          ${collapsed ? "w-16" : "w-64"}
        `}
      >
        {/* HEADER */}
        <SidebarHeader
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />

        {/* CONTENIDO */}
        <nav className="flex flex-col gap-6 px-2 flex-1">

          {/* DASHBOARD */}
          <SidebarSection
            title="Dashboard"
            links={appLinks}
            collapsed={collapsed}
          />

          {/* FOCUS (acción principal) */}
          <SidebarSection
            title="Focus"
            links={actionLinks}
            collapsed={collapsed}
          />
        </nav>

        {/* SETTINGS */}
        <div className="p-2 border-t border-gray-800">
          <button
            onClick={() => setOpenSettings(true)}
            className={`
              w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm
              transition-all duration-200
              ${collapsed ? "justify-center" : ""}
              
              text-gray-300
              hover:bg-gray-800 hover:text-white
              
              bg-gray-800/40
              border border-gray-700/50
            `}
          >
            <Settings size={18} />

            {!collapsed && (
              <span className="whitespace-nowrap animate-popIn font-medium">
                Settings
              </span>
            )}
          </button>
        </div>
      </aside>

      {/* MODAL */}
      <SettingsModal
        open={openSettings}
        onClose={() => setOpenSettings(false)}
      />
    </>
  );
}