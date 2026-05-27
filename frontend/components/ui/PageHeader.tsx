//frontend/components/ui/PageHeader.tsx

'use client';

import { Sparkles, LucideIcon } from 'lucide-react';

type Props = {
  title: string;

  description?: string;

  icon?: LucideIcon;

  children?: React.ReactNode;
};

export function PageHeader({
  title,

  description,

  icon,

  children,
}: Props) {
  // ======================
  // ICON
  // ======================

  const Icon = icon || Sparkles;

  return (
    <div
      className="
        flex items-center
        justify-between

        gap-6
      "
    >
      {/* LEFT */}

      <div
        className="
          flex items-start
          gap-4
        "
      >
        {/* ICON */}

        <div
          className="
            relative

            w-14 h-14

            rounded-2xl

            bg-gradient-to-br
            from-[var(--primary)]
            to-indigo-500

            flex items-center
            justify-center

            shadow-lg
            shadow-indigo-500/20

            shrink-0
          "
        >
          {/* GLOW */}

          <div
            className="
              absolute inset-0

              rounded-2xl

              bg-indigo-400/20

              blur-xl
            "
          />

          <Icon
            size={22}
            className="
              relative z-10

              text-white
            "
          />
        </div>

        {/* TEXT */}

        <div>
          <h1
            className="
              text-3xl
              font-bold

              tracking-tight

              bg-gradient-to-r
              from-gray-900
              to-gray-600

              bg-clip-text
              text-transparent
            "
          >
            {title}
          </h1>

          {description && (
            <p
              className="
                mt-2

                text-sm
                text-gray-500

                leading-relaxed

                max-w-2xl
              "
            >
              {description}
            </p>
          )}
        </div>
      </div>

      {/* RIGHT */}

      {!!children && (
        <div
          className="
            flex items-center
            gap-3

            shrink-0
          "
        >
          {children}
        </div>
      )}
    </div>
  );
}
