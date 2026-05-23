//frontend\components\ui\filters\BranchSelect.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { Building2, ChevronDown } from "lucide-react";
import { useClickOutside } from "@/hooks/useClickOutside";

type Branch = {
  id: string;
  name: string;
};

type Props = {
  branches: Branch[];
  value: string | null;
  onChange: (value: string | null) => void;
};

export function BranchSelect({ branches, value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => setOpen(false), open);

  const selectedLabel =
    branches.find((b) => b.id === value)?.name || "All Branches";

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition"
      >
        <Building2 size={14} className="text-gray-400" />
        {selectedLabel}
        <ChevronDown size={14} className="text-gray-400" />
      </button>

      {open && (
        <div className="absolute left-0 mt-2 w-52 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50">
          <div
            onClick={() => {
              onChange(null);
              setOpen(false);
            }}
            className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
          >
            All Branches
          </div>

          {branches.map((branch) => (
            <div
              key={branch.id}
              onClick={() => {
                onChange(branch.id);
                setOpen(false);
              }}
              className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
            >
              {branch.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}