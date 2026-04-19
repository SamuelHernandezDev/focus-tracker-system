//frontend\modules\ui\components\sidebar\sidebarItem.tsx
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function SidebarItem({
  href,
  label,
  icon: Icon,
  isActive,
  collapsed,
  onClick, 
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

  const baseClass = `
  w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm
  transition-all duration-200
  ${collapsed ? "justify-center" : ""}

  ${
    isActive
      ? "bg-blue-600 text-white shadow-sm"
      : "text-gray-400 hover:bg-gray-800/60 hover:text-gray-200"
  }

  ${onClick && "opacity-60 cursor-not-allowed"}
`;

  const content = (
    <>
      <Icon size={18} />

      {!hideText && (
        <span className="whitespace-nowrap animate-popIn">
          {label}
        </span>
      )}
    </>
  );

  if (onClick) {
    return (
      <button
        onClick={onClick}
        title={collapsed ? label : ""}
        className={baseClass}
      >
        {content}
      </button>
    );
  }

  return (
    <Link
      href={href}
      title={collapsed ? label : ""}
      className={baseClass}
    >
      {content}
    </Link>
  );
}