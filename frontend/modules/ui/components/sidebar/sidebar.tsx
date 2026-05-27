//frontend/modules/ui/components/sidebar/Sidebar.tsx
'use client';

import { Settings, Puzzle } from 'lucide-react';

import { useAuth } from '@/modules/auth/hooks/useAuth';

import { useState, useEffect } from 'react';

import SidebarHeader from './sidebarHeader';
import SidebarUser from './sidebarUser';
import SidebarSection from './sidebarSection';

import SettingsModal from './settingsModal';

import ExtensionInstallModal from './ExtensionInstallModal';

import { appLinks, actionLinks } from './sidebar.config';

const STORAGE_KEY = 'sidebar:collapsed';

export default function Sidebar() {
  const { user } = useAuth();

  // ======================
  // SIDEBAR
  // ======================

  const [collapsed, setCollapsed] = useState<boolean>(() => {
    if (typeof window === 'undefined') {
      return false;
    }

    return localStorage.getItem(STORAGE_KEY) === 'true';
  });

  // ======================
  // MODALS
  // ======================

  const [openSettings, setOpenSettings] = useState(false);

  const [openExtensionModal, setOpenExtensionModal] = useState(false);

  // ======================
  // PERSIST SIDEBAR
  // ======================

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, String(collapsed));
  }, [collapsed]);

  // ======================
  // NO USER
  // ======================

  if (!user) return null;

  return (
    <>
      <aside
        className={`
          relative

          h-screen

          flex flex-col

          transition-[width]
          duration-300

          backdrop-blur-2xl

          bg-gradient-to-b
          from-[#081120]/95
          via-[#091425]/90
          to-[#07101d]/95

          border-r
          border-white/10

          shadow-[0_0_40px_rgba(0,0,0,0.25)]

          overflow-visible

          z-50

          ${collapsed ? 'w-[74px]' : 'w-[280px]'}
        `}
      >
        {/* BACKGROUND GLOW */}

        <div
          className="
            absolute
            top-0
            right-[-120px]

            w-[240px]
            h-[240px]

            rounded-full

            bg-indigo-500/10

            blur-3xl

            pointer-events-none
          "
        />

        {/* HEADER */}

        <SidebarHeader collapsed={collapsed} setCollapsed={setCollapsed} />

        {/* USER */}

        <SidebarUser collapsed={collapsed} user={user} />

        {/* NAVIGATION */}

        <nav
          className="
            flex flex-col

            gap-7

            px-3

            flex-1

            relative z-10
          "
        >
          {/* DASHBOARD */}

          <SidebarSection
            title="Dashboard"
            links={appLinks}
            collapsed={collapsed}
          />

          {/* FOCUS */}

          <SidebarSection
            title="Focus"
            links={actionLinks}
            collapsed={collapsed}
          />
        </nav>

        {/* FOOTER ACTIONS */}

        <div
          className="
            p-3

            space-y-3

            border-t
            border-white/10

            relative z-10
          "
        >
          {/* EXTENSION */}

          <button
            onClick={() => setOpenExtensionModal(true)}
            className={`
              group

              relative

              w-full

              flex items-center
              gap-3

              px-3
              py-3

              rounded-2xl

              text-sm

              transition-all
              duration-300

              border

              backdrop-blur-xl

              overflow-hidden

              ${collapsed ? 'justify-center' : ''}

              text-gray-300

              bg-gradient-to-r
              from-indigo-500/[0.08]
              to-violet-500/[0.04]

              border-indigo-500/10

              hover:from-indigo-500/[0.14]
              hover:to-violet-500/[0.08]

              hover:border-indigo-400/20

              hover:text-white

              hover:shadow-lg
              hover:shadow-indigo-500/10
            `}
          >
            {/* HOVER GLOW */}

            <div
              className="
                absolute inset-0

                opacity-0
                group-hover:opacity-100

                bg-gradient-to-r
                from-indigo-500/[0.06]
                to-transparent

                transition
              "
            />

            {/* ICON */}

            <div
              className="
                relative z-10
              "
            >
              <Puzzle size={18} />
            </div>

            {/* TEXT */}

            {!collapsed && (
              <div
                className="
                  relative z-10

                  flex flex-col
                  items-start
                "
              >
                <span
                  className="
                    whitespace-nowrap

                    font-medium
                  "
                >
                  Focus Extension
                </span>

                <span
                  className="
                    text-[11px]

                    text-indigo-200/70
                  "
                >
                  Browser tracking setup
                </span>
              </div>
            )}

            {/* STATUS */}

            {!collapsed && (
              <div
                className="
                  ml-auto

                  relative z-10

                  w-2
                  h-2

                  rounded-full

                  bg-amber-400

                  animate-pulse
                "
              />
            )}
          </button>

          {/* SETTINGS */}

          <button
            onClick={() => setOpenSettings(true)}
            className={`
              w-full

              flex items-center
              gap-3

              px-3
              py-3

              rounded-2xl

              text-sm

              transition-all
              duration-300

              border

              backdrop-blur-xl

              ${collapsed ? 'justify-center' : ''}

              text-gray-300

              bg-white/[0.03]

              border-white/10

              hover:bg-white/[0.06]
              hover:border-white/20

              hover:text-white

              hover:shadow-lg
              hover:shadow-indigo-500/10
            `}
          >
            <Settings size={18} />

            {!collapsed && (
              <span
                className="
                  whitespace-nowrap

                  animate-popIn

                  font-medium
                "
              >
                Settings
              </span>
            )}
          </button>
        </div>
      </aside>

      {/* SETTINGS MODAL */}

      <SettingsModal
        open={openSettings}
        onClose={() => setOpenSettings(false)}
      />

      {/* EXTENSION MODAL */}

      <ExtensionInstallModal
        open={openExtensionModal}
        onClose={() => setOpenExtensionModal(false)}
      />
    </>
  );
}
