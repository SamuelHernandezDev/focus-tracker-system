//frontend/modules/ui/components/topbar/NotificationsPanel.tsx
'use client';
import { createPortal } from 'react-dom';
import { Clock3, Sparkles } from 'lucide-react';

type Props = {
  open: boolean;
};

const notifications = [
  {
    id: 1,

    title: 'Focus session completed',

    description: 'Your latest session achieved an 84% focus score.',

    time: '2 min ago',

    color: 'text-emerald-500',

    bg: 'bg-emerald-500/10',
  },

  {
    id: 2,

    title: 'Idle interruption detected',

    description: 'Tracking paused after 3 minutes of inactivity.',

    time: '10 min ago',

    color: 'text-amber-500',

    bg: 'bg-amber-500/10',
  },

  {
    id: 3,

    title: 'Weekly analytics updated',

    description: 'Your average focus trend improved by 12%.',

    time: '1 hour ago',

    icon: Sparkles,

    color: 'text-indigo-500',

    bg: 'bg-indigo-500/10',
  },

  {
    id: 4,

    title: 'Camera tracking enabled',

    description: 'Presence monitoring is now active.',

    time: 'Today',

    color: 'text-sky-500',

    bg: 'bg-sky-500/10',
  },
];

export default function NotificationsPanel({ open }: Props) {
  if (!open) return null;

  return createPortal(
    <div
      className="
        fixed

    top-[88px]
right-[32px]

        z-[9999]

        w-[390px]
        max-w-[92vw]

        overflow-hidden

        rounded-[32px]

        border border-white/30

        bg-white/80

        backdrop-blur-2xl

        shadow-[0_20px_80px_rgba(0,0,0,0.12)]

        animate-in
        fade-in
        zoom-in-95
        slide-in-from-top-2
        duration-200
      "
    >
      {/* GLOW */}

      <div
        className="
          absolute
          top-0
          right-0

          w-64
          h-64

          rounded-full

          bg-indigo-500/10

          blur-3xl
        "
      />

      {/* HEADER */}

      <div
        className="
          relative z-10

          flex items-center
          justify-between

          px-6
          pt-6
          pb-4

          border-b border-white/30
        "
      >
        <div>
          <h2
            className="
              text-lg
              font-semibold

              text-gray-900
            "
          >
            Notifications
          </h2>

          <p
            className="
              mt-1

              text-sm
              text-gray-500
            "
          >
            Latest activity from Focus Tracker
          </p>
        </div>

        {/* BADGE */}

        <div
          className="
            min-w-[28px]
            h-7

            px-2

            rounded-full

            bg-indigo-500

            flex items-center
            justify-center

            text-xs
            font-semibold

            text-white

            shadow-lg
            shadow-indigo-500/20
          "
        >
          {notifications.length}
        </div>
      </div>

      {/* CONTENT */}

      <div
        className="
          relative z-10

          h-[655px]

          overflow-y-auto

          p-4

          space-y-3
        "
      >
        {notifications.map((notification) => {
          const Icon = notification.icon;

          return (
            <div
              key={notification.id}
              className="
                group

                relative

                overflow-hidden

                rounded-3xl

                border border-white/40

                bg-white/70

                backdrop-blur-xl

                p-4

                transition-all
                duration-300

                hover:-translate-y-[1px]
                hover:bg-white
                hover:shadow-lg
                hover:shadow-black/[0.04]
              "
            >
              {/* HOVER OVERLAY */}

              <div
                className="
                  absolute inset-0

                  opacity-0
                  group-hover:opacity-100

                  bg-gradient-to-r
                  from-indigo-500/[0.03]
                  to-transparent

                  transition
                "
              />

              {/* CONTENT */}

              <div
                className="
                  relative z-10

                  flex items-start
                  gap-4
                "
              >
                {/* TEXT */}

                <div
                  className="
                    flex-1

                    min-w-0
                  "
                >
                  <div
                    className="
                      flex items-start
                      justify-between

                      gap-3
                    "
                  >
                    <h3
                      className="
                        text-sm
                        font-semibold

                        text-gray-900
                      "
                    >
                      {notification.title}
                    </h3>

                    <div
                      className="
                        flex items-center
                        gap-1

                        shrink-0

                        text-[11px]
                        text-gray-400
                      "
                    >
                      <Clock3 size={11} />

                      {notification.time}
                    </div>
                  </div>

                  <p
                    className="
                      mt-1

                      text-xs
                      leading-relaxed

                      text-gray-500
                    "
                  >
                    {notification.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* FOOTER */}

      <div
        className="
          relative z-10

          flex items-center
          justify-between

          px-6
          py-4

          border-t border-white/30
        "
      >
        <span
          className="
            text-xs
            text-gray-400
          "
        >
          Focus Tracker System
        </span>

        <button
          className="
            text-xs
            font-medium

            text-indigo-500

            hover:text-indigo-600

            transition-colors
          "
        >
          Mark all as read
        </button>
      </div>
    </div>,
    document.body
  );
}
