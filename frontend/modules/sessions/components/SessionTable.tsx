//frontend\modules\sessions\components\SessionTable.tsx
"use client";

import { SessionRow } from "./SessionRow";
import { Clock, BarChart3, Calendar, Activity } from "lucide-react";

type Session = {
  id: string;
  date: string;
  duration: number;
  score: number;
  interruptions: number;

  focusTime?: number;
  idleTime?: number;
  distractions?: number;
  task?: string;
};

type Props = {
  data: Session[];
  expandedId: string | null;
  onToggle: (id: string) => void;
};

export function SessionsTable({ data, expandedId, onToggle }: Props) {
  return (
    <div className="bg-gray-50 rounded-2xl p-6 space-y-3">

      {/* HEADER */}
      <div className="bg-gray-900/10 rounded-xl shadow-sm">
        <div className="grid grid-cols-[2.5fr_2fr_1.5fr_2fr] px-6 py-3 text-sm text-gray-600">

          {/* SESSION */}
          <div className="flex items-center gap-2 font-medium">
            <Activity size={14} className="text-gray-400" />
            Session
          </div>

          {/* DURATION */}
          <div className="flex items-center justify-center gap-2 font-medium">
            <Clock size={14} className="text-gray-400" />
            Duration
          </div>

          {/* SCORE */}
          <div className="flex items-center justify-center gap-2 font-medium">
            <BarChart3 size={14} className="text-gray-400" />
            Score
          </div>

          {/* DATE */}
          <div className="flex items-center justify-center gap-2 font-medium">
            <Calendar size={14} className="text-gray-400" />
            Date
          </div>

        </div>
      </div>

      {/* ROWS */}
      {data.length === 0 ? (
        <div className="text-center text-gray-400 py-10">
          No sessions found
        </div>
      ) : (
        data.map((item) => {
          const isExpanded = expandedId === item.id;

          return (
            <SessionRow
              key={item.id}
              item={item}
              isExpanded={isExpanded}
              onClick={() => onToggle(item.id)}
            />
          );
        })
      )}
    </div>
  );
}