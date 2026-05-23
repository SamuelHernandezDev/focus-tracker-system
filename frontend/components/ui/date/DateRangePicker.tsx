//frontend\components\ui\date\DateRangePicker.tsx
"use client";

import { useState, useRef } from "react";
import { Calendar, X } from "lucide-react";
import { DayPicker, DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";
import "./calendar.css";
import { useClickOutside } from "@/hooks/useClickOutside";

type Props = {
  from?: string | null;
  to?: string | null;
  onChange: (from: string | null, to: string | null) => void;
};

const parseLocalDate = (date: string) => {
  const [y, m, d] = date.split("-").map(Number);
  return new Date(y, m - 1, d);
};

const formatDate = (date: Date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

const formatDisplay = (date: string) => {
  const d = parseLocalDate(date);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
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
      
      {/* BUTTON */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition"
        >
          <Calendar size={14} className="text-gray-400" />

          {from && to
            ? from === to
              ? formatDisplay(from)
              : `${formatDisplay(from)} - ${formatDisplay(to)}`
            : from
            ? formatDisplay(from)
            : "Select date"}
        </button>

        {(from || to) && (
          <button
            onClick={() => onChange(null, null)}
            className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg p-3 z-50">
          
          <DayPicker
            mode="range"
            selected={range}
            numberOfMonths={1}
            className="rdp-custom text-sm text-gray-700"
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
              const toStr = toDate ? formatDate(toDate) : null;

              onChange(fromStr, toStr);

              if (fromDate && toDate) {
                setOpen(false);
              }
            }}
          />

        </div>
      )}
    </div>
  );
}