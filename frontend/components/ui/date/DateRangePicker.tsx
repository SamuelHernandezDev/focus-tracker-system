//frontend/components/ui/date/DateRangePicker.tsx

'use client';

import { useState, useRef } from 'react';

import { Calendar, X } from 'lucide-react';

import { DayPicker, DateRange } from 'react-day-picker';

import 'react-day-picker/dist/style.css';

import './calendar.css';

import { useClickOutside } from '@/hooks/useClickOutside';

type Props = {
  from?: string | null;

  to?: string | null;

  onChange: (from: string | null, to: string | null) => void;
};

const parseLocalDate = (date: string) => {
  const [y, m, d] = date.split('-').map(Number);

  return new Date(y, m - 1, d);
};

const formatDate = (date: Date) => {
  const y = date.getFullYear();

  const m = String(date.getMonth() + 1).padStart(2, '0');

  const d = String(date.getDate()).padStart(2, '0');

  return `${y}-${m}-${d}`;
};

const formatDisplay = (date: string) => {
  const d = parseLocalDate(date);

  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
};

export function DateRangePicker({ from, to, onChange }: Props) {
  const [open, setOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => setOpen(false), open);

  const range: DateRange | undefined = {
    from: from ? parseLocalDate(from) : undefined,

    to: to ? parseLocalDate(to) : undefined,
  };

  return (
    <div ref={ref} className="relative">
      {/* FILTERS */}

      <div className="flex items-center gap-2">
        {/* DATE BUTTON */}

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
              from-[var(--primary)]
              to-indigo-500

              flex items-center
              justify-center

              shadow-md
              shadow-indigo-500/20
            "
          >
            <Calendar
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
            {from && to
              ? from === to
                ? formatDisplay(from)
                : `${formatDisplay(from)} - ${formatDisplay(to)}`
              : from
              ? formatDisplay(from)
              : 'Select date'}
          </span>
        </button>

        {/* CLEAR */}

        {(from || to) && (
          <button
            onClick={() => onChange(null, null)}
            className="
              group

              w-11 h-11

              rounded-2xl

              border border-white/50

              bg-white/80
              backdrop-blur-xl

              shadow-sm

              flex items-center
              justify-center

              hover:bg-red-50
              hover:border-red-100
              hover:shadow-md
              hover:-translate-y-[1px]

              active:scale-[0.98]

              transition-all
              duration-200
            "
          >
            <X
              size={14}
              className="
                text-gray-500

                group-hover:text-red-500

                transition-colors
              "
            />
          </button>
        )}
      </div>

      {/* DROPDOWN */}

      {open && (
        <div
          className="
            absolute right-0
            mt-3

            z-50

            overflow-hidden

            rounded-3xl

            border border-white/40

            bg-white/90
            backdrop-blur-2xl

            shadow-2xl
            shadow-black/10

            p-4
          "
        >
          {/* GLOW */}

          <div
            className="
              absolute
              top-0 right-0

              w-40 h-40

              bg-indigo-400/10

              rounded-full

              blur-3xl
            "
          />

          {/* CALENDAR */}

          <div className="relative z-10">
            <DayPicker
              mode="range"
              selected={range}
              numberOfMonths={1}
              className="
                rdp-custom

                text-sm
                text-gray-700
              "
              onSelect={(range) => {
                if (!range) {
                  onChange(null, null);

                  return;
                }

                let fromDate = range.from;

                let toDate = range.to;

                if (fromDate && toDate && fromDate > toDate) {
                  [fromDate, toDate] = [toDate, fromDate];
                }

                const fromStr = fromDate ? formatDate(fromDate) : null;

                const toStr = toDate
                  ? formatDate(toDate)
                  : fromDate
                  ? formatDate(fromDate)
                  : null;

                onChange(fromStr, toStr);

                if (fromDate && toDate) {
                  setOpen(false);
                }
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
