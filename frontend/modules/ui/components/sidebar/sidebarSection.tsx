//frontend\modules\ui\components\sidebar\sidebarSection.tsx
"use client";

import { usePathname } from "next/navigation";
import SidebarItem from "./sidebarItem";
import { useState, useEffect } from "react";

export default function SidebarSection({
  title,
  links,
  collapsed,
}: any) {
  const pathname = usePathname();
  const [hideTitle, setHideTitle] = useState(collapsed);

  useEffect(() => {
    if (!collapsed) {
      const t = setTimeout(() => setHideTitle(false), 150);
      return () => clearTimeout(t);
    } else {
      setHideTitle(true);
    }
  }, [collapsed]);

  return (
    <div>
      {!hideTitle && (
        <p className="text-xs uppercase text-gray-400 mb-2 px-2 animate-popIn">
          {title}
        </p>
      )}

      <div className="flex flex-col gap-1">
        {links.map((link: any) => (
          <SidebarItem
            key={link.href}
            {...link}
            collapsed={collapsed}
            isActive={pathname === link.href}
            onClick={
              link.disabled
              ? () => alert("🚧 Analytics coming soon")
              : undefined
            }
          />
        ))}
      </div>
    </div>
  );
}