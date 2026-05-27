//frontend/components/ui/filters/SortSelect.tsx

'use client';

import { useState, useRef } from 'react';

import { BarChart3, ChevronDown, Check } from 'lucide-react';

import { useClickOutside } from '@/hooks/useClickOutside';

type Props = {
  value: {
    sortBy: 'date' | 'score';

    sortOrder: 'asc' | 'desc';
  };

  onChange: (val: {
    sortBy: 'date' | 'score';

    sortOrder: 'asc' | 'desc';
  }) => void;
};

export function SortSelect({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => setOpen(false), open);

  const options = [
    {
      label: 'Date ↓',

      sortBy: 'date',

      sortOrder: 'desc',
    },

    {
      label: 'Date ↑',

      sortBy: 'date',

      sortOrder: 'asc',
    },

    {
      label: 'Score ↓',

      sortBy: 'score',

      sortOrder: 'desc',
    },

    {
      label: 'Score ↑',

      sortBy: 'score',

      sortOrder: 'asc',
    },
  ] as const;

  const selected =
    options.find(
      (o) => o.sortBy === value.sortBy && o.sortOrder === value.sortOrder
    )?.label || 'Sort';

  return (
    <div ref={ref} className="relative">
      {/* BUTTON */}

      <button
        onClick={() => setOpen((prev) => !prev)}
        className="
          group

          relative

          h-11

          flex items-center
          gap-3

          px-4

          rounded-2xl

          border border-white/50

          bg-white/80
          backdrop-blur-xl

          shadow-sm

          hover:bg-white
          hover:shadow-md
          hover:-translate-y-[1px]

          active:scale-[0.99]

          transition-all
          duration-200
        "
      >
        {/* ICON */}

        <div
          className="
            relative

            w-7 h-7

            rounded-xl

            bg-gradient-to-br
            from-violet-500
            to-indigo-500

            flex items-center
            justify-center

            shadow-md
            shadow-violet-500/20
          "
        >
          <BarChart3
            size={14}
            className="
              text-white
            "
          />
        </div>

        {/* LABEL */}

        <span
          className="
            text-sm
            font-medium
            text-gray-700

            whitespace-nowrap
          "
        >
          {selected}
        </span>

        {/* CHEVRON */}

        <ChevronDown
          size={14}
          className={`
            text-gray-400

            transition-transform
            duration-200

            ${open ? 'rotate-180' : ''}
          `}
        />
      </button>

      {/* DROPDOWN */}

      {open && (
        <div
          className="
            absolute right-0
            mt-3

            z-50

            w-52

            overflow-hidden

            rounded-3xl

            border border-white/40

            bg-white/90
            backdrop-blur-2xl

            shadow-2xl
            shadow-black/10

            p-2
          "
        >
          {/* GLOW */}

          <div
            className="
              absolute
              top-0 right-0

              w-40 h-40

              bg-violet-400/10

              rounded-full

              blur-3xl
            "
          />

          {/* OPTIONS */}

          <div
            className="
              relative z-10

              space-y-1
            "
          >
            {options.map((opt) => {
              const active =
                opt.sortBy === value.sortBy &&
                opt.sortOrder === value.sortOrder;

              return (
                <button
                  key={opt.label}
                  onClick={() => {
                    onChange({
                      sortBy: opt.sortBy,

                      sortOrder: opt.sortOrder,
                    });

                    setOpen(false);
                  }}
                  className={`
                    w-full

                    flex items-center
                    justify-between

                    px-4 py-3

                    rounded-2xl

                    text-sm
                    font-medium

                    transition-all
                    duration-200

                    ${
                      active
                        ? `
                          bg-gradient-to-r
                          from-violet-500
                          to-indigo-500

                          text-white
                        `
                        : `
                          text-gray-700

                          hover:bg-gray-50
                        `
                    }
                  `}
                >
                  <span>{opt.label}</span>

                  {active && <Check size={14} />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
