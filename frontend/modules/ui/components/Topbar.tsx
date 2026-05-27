//frontend/modules/admin/ui/components/Topbar.tsx
'use client';

import { useEffect, useRef, useState } from 'react';

import { Bell } from 'lucide-react';

import NotificationsPanel from '@/modules/ui/components/NotificationsPanel';

export default function Topbar() {
  // ======================
  // STATE
  // ======================

  const [openNotifications, setOpenNotifications] = useState(false);

  // ======================
  // REF
  // ======================

  const notificationsRef = useRef<HTMLDivElement>(null);

  // ======================
  // OUTSIDE CLICK
  // ======================

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target as Node)
      ) {
        setOpenNotifications(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      className="
        relative

        z-0

        overflow-visible

        flex items-center
        justify-between

        px-11
        py-4

        border-b
        border-gray-200/70

        bg-white/70

        backdrop-blur-xl
      "
    >
      {/* LEFT */}

      <div>
        <span
          className="
            text-sm
            font-medium

            text-gray-500
          "
        >
          Session
        </span>
      </div>

      {/* RIGHT */}

      <div
        className="
          relative

          flex items-center
          gap-4
        "
        ref={notificationsRef}
      >
        {/* NOTIFICATIONS */}

        <button
          onClick={() => setOpenNotifications((prev) => !prev)}
          className={`
            relative

            w-10
            h-10

            rounded-2xl

            flex items-center
            justify-center

            border

            bg-white/80

            shadow-sm

            transition-all
            duration-300

            hover:bg-white
            hover:shadow-md
            hover:scale-[1.02]

            ${
              openNotifications
                ? `
                  border-indigo-200

                  bg-white

                  text-indigo-600

                  shadow-lg
                  shadow-indigo-500/10
                `
                : `
                  border-gray-200

                  text-gray-500

                  hover:text-gray-900
                `
            }
          `}
        >
          <Bell size={18} />

          {/* DOT */}

          <span
            className="
              absolute
              top-2.5
              right-2.5

              w-2
              h-2

              rounded-full

              bg-red-500

              ring-2
              ring-white

              animate-pulse
            "
          />
        </button>

        {/* PANEL */}

        <NotificationsPanel open={openNotifications} />
      </div>
    </div>
  );
}
