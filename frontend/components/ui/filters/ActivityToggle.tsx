//frontend\components\ui\filters\ActivityToggle.tsx
"use client";

import { Activity } from "lucide-react";

type Props = {
  value: boolean;
  onChange: (value: boolean) => void;
};

export function ActivityToggle({ value, onChange }: Props) {
  return (
    <button
      onClick={() => onChange(!value)}
      className={`flex items-center gap-2 px-3 py-2 border rounded-lg text-sm transition
        ${
          value
            ? "bg-black text-white border-black"
            : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
        }
      `}
    >
      <Activity size={14} />
      Active
    </button>
  );
}