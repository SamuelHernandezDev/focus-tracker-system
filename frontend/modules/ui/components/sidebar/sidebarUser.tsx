//frontend/modules/ui/components/sidebar/sidebarUser.tsx
'use client';

import Image from 'next/image';

import { useEffect, useState } from 'react';

import { LogOut } from 'lucide-react';

import { useRouter } from 'next/navigation';

import { useAuth } from '@/modules/auth/hooks/useAuth';

type Props = {
  collapsed: boolean;

  user: any;
};

export default function SidebarUser({ collapsed, user }: Props) {
  const [hideText, setHideText] = useState(collapsed);

  const { logout } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (!collapsed) {
      const t = setTimeout(() => {
        setHideText(false);
      }, 150);

      return () => clearTimeout(t);
    } else {
      setHideText(true);
    }
  }, [collapsed]);

  // ======================
  // LOGOUT
  // ======================

  const handleLogout = async () => {
    await logout();

    router.replace('/login');
  };

  return (
    <div
      className="
        px-3
        pb-5

        transition-all
      "
    >
      <div
        className={`
    flex items-center

    transition-all
    duration-300

    ${
      collapsed
        ? `
          justify-center
        `
        : `
          gap-3

          rounded-2xl

          border border-white/10

          bg-white/[0.03]

          backdrop-blur-xl

          px-3
          py-3
        `
    }
  `}
      >
        {/* AVATAR */}

        <Image
          src={user?.image || 'https://i.pravatar.cc/100'}
          alt="User"
          width={32}
          height={32}
          className="
            rounded-full

            object-cover

            shrink-0

            border border-white/10
          "
        />

        {/* INFO */}

        {!hideText && (
          <div
            className="
              flex-1

              min-w-0

              flex items-center
              justify-between

              gap-3

              animate-popIn
            "
          >
            {/* TEXT */}

            <div className="min-w-0">
              <p
                className="
                  text-sm
                  font-semibold
                  text-white

                  truncate
                "
              >
                {user?.name || 'Samuel Hernandez'}
              </p>

              <p
                className="
                  text-xs
                  text-gray-400

                  truncate
                "
              >
                Productivity Mode
              </p>
            </div>

            {/* LOGOUT */}

            <button
              onClick={handleLogout}
              className="
                w-9
                h-9

                shrink-0

                rounded-xl

                flex items-center
                justify-center

                border border-white/10

                bg-white/[0.03]

                text-gray-400

                transition-all
                duration-300

                hover:bg-red-500/15
                hover:border-red-500/20

                hover:text-red-400

                hover:shadow-lg
                hover:shadow-red-500/10
              "
            >
              <LogOut size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
