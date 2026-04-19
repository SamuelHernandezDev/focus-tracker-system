//frontend\modules\ui\components\sidebar\sidebarHeader.tsx
"use client";

import Image from "next/image";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { useState, useEffect } from "react";

export default function SidebarHeader({
  collapsed,
  setCollapsed,
}: any) {
  const [hideText, setHideText] = useState(collapsed);

  useEffect(() => {
    if (!collapsed) {
      const t = setTimeout(() => setHideText(false), 150);
      return () => clearTimeout(t);
    } else {
      setHideText(true);
    }
  }, [collapsed]);

  const handleCollapse = () => {
    setHideText(true);

    setTimeout(() => {
      setCollapsed(true);
    }, 50);
  };

  return (
    <div
      className={`
        relative flex p-4
        ${
          collapsed
            ? "items-center justify-center"
            : "items-start justify-between"
        }
      `}
    >
      {/* LOGO + TEXTO */}
      <div
        className={`
          flex flex-col relative
          ${
            collapsed
              ? "items-center justify-center w-full"
              : "items-start gap-2 max-w-[70%]"
          }
        `}
      >
        <Image
          src="/images/Logo.png"
          alt="Logo"
          width={collapsed ? 34 : 68}
          height={collapsed ? 34 : 68}
          priority
          className="rounded-md flex-shrink-0 transition-all duration-200"
        />

        {!hideText && (
          <span className="text-sm font-semibold text-white leading-tight whitespace-nowrap animate-popIn">
            Focus Tracker
          </span>
        )}
      </div>

      {/* TOGGLE (EXPANDED) */}
      {!collapsed && (
        <button
          onClick={handleCollapse}
          className="
            p-1 rounded-md text-gray-400
            hover:text-white hover:bg-gray-800
            transition
          "
        >
          <PanelLeftClose size={18} />
        </button>
      )}

      {/* TOGGLE (COLLAPSED) */}
      {collapsed && (
        <button
          onClick={() => setCollapsed(false)}
          className="
            absolute top-[18px] -right-9
            w-7 h-7 flex items-center justify-center
            bg-gray-800 border border-gray-700
            rounded-full shadow-md
            text-gray-300 hover:text-white hover:bg-gray-700
            transition
          "
        >
          <PanelLeftOpen size={18} />
        </button>
      )}
    </div>
  );
}