//frontend\modules\sessions\components\SessionRow.tsx
"use client";

import { ChevronRight } from "lucide-react";
import { SessionExpanded } from "./SessionExpanded";

type Session = {
  id: string;
  date: string;
  duration: number;
  score: number;
  interruptions: number;
};

type Props = {
  item: Session;
  isExpanded: boolean;
  onClick: () => void;
};

function formatDate(dateString?: string) {
  if (!dateString) return "—";

  const date = new Date(dateString);

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function getScoreColor(score: number) {
  if (score >= 80) return "bg-green-100 text-green-700";
  if (score >= 60) return "bg-yellow-100 text-yellow-700";
  return "bg-red-100 text-red-700";
}

export function SessionRow({ item, isExpanded, onClick }: Props) {
  return (
    <div
      className="
        bg-white rounded-xl shadow-sm
        transition-all duration-200
        hover:shadow-md
      "
    >
      {/* TOP ROW */}
      <div
        onClick={onClick}
        className={`
          grid grid-cols-[2.5fr_2fr_1.5fr_2fr]
          px-6 py-3 cursor-pointer
          items-center
          ${isExpanded ? "bg-blue-50 rounded-t-xl" : "hover:bg-gray-50/70"}
        `}
      >
        {/* SESSION */}
        <div className="flex items-center gap-3">
          <ChevronRight
            size={16}
            className={`
              text-gray-400 transition-transform duration-300
              ${isExpanded ? "rotate-90" : ""}
            `}
          />

          <span className="font-semibold text-gray-900 tracking-tight">
            Session #{item.id.slice(0, 6)}
          </span>
        </div>

        {/* DURATION */}
        <div className="flex justify-center">
          <span className="text-sm text-gray-700">
            {item.duration} min
          </span>
        </div>

        {/* SCORE */}
        <div className="flex justify-center">
          <span
            className={`
              inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium
              ${getScoreColor(item.score)}
            `}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            {item.score}%
          </span>
        </div>

        {/* DATE */}
        <div className="flex justify-center">
          <span className="text-sm text-gray-500 whitespace-nowrap">
            {formatDate(item.date)}
          </span>
        </div>
      </div>

      {/* EXPANDED */}
      <div
        className={`
          overflow-hidden transition-all duration-300
          ${isExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <div className="px-6 pb-5 pt-2 border-t border-gray-100">
          <SessionExpanded item={item} />
        </div>
      </div>
    </div>
  );
}