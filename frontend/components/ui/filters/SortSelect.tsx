//frontend\components\ui\filters\SortSelect.tsx
"use client";

import { useState, useRef } from "react";
import { BarChart3, ChevronDown } from "lucide-react";
import { useClickOutside } from "@/hooks/useClickOutside";

type Props = {
  value: {
    sortBy: "date" | "score";
    sortOrder: "asc" | "desc";
  };
  onChange: (val: {
    sortBy: "date" | "score";
    sortOrder: "asc" | "desc";
  }) => void;
};

export function SortSelect({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => setOpen(false), open);

  const options = [
    { label: "Date ↓", sortBy: "date", sortOrder: "desc" },
    { label: "Date ↑", sortBy: "date", sortOrder: "asc" },
    { label: "Score ↓", sortBy: "score", sortOrder: "desc" },
    { label: "Score ↑", sortBy: "score", sortOrder: "asc" },
  ] as const;

  const selected =
    options.find(
      (o) =>
        o.sortBy === value.sortBy &&
        o.sortOrder === value.sortOrder
    )?.label || "Sort";

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition"
      >
        <BarChart3 size={14} className="text-gray-400" />
        {selected}
        <ChevronDown size={14} className="text-gray-400" />
      </button>

      {open && (
        <div className="absolute mt-2 w-40 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
          {options.map((opt) => (
            <div
              key={opt.label}
              onClick={() => {
                onChange({
                  sortBy: opt.sortBy,
                  sortOrder: opt.sortOrder,
                });
                setOpen(false);
              }}
              className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}