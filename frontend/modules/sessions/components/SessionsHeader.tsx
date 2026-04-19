//frontend\modules\sessions\components\SessionsHeader.tsx
"use client";

import {
  Filter,
  Calendar,
  BarChart3,
  Clock,
} from "lucide-react";

export function SessionsHeader() {
  return (
    <div className="flex items-center justify-between pb-4 border-b border-gray-200">

      {/* LEFT */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Sessions
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Review and analyze your focus sessions
        </p>
      </div>

      {/* RIGHT FILTERS */}
      <div className="flex items-center gap-3">

        {/* SCORE FILTER */}
        <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-100 transition">
          <BarChart3 size={14} className="text-gray-400" />
          <span className="text-sm text-gray-600">Score</span>
        </div>

        {/* DATE FILTER */}
        <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-100 transition">
          <Calendar size={14} className="text-gray-400" />
          <span className="text-sm text-gray-600">Date</span>
        </div>

        {/* DURATION FILTER */}
        <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-100 transition">
          <Clock size={14} className="text-gray-400" />
          <span className="text-sm text-gray-600">Duration</span>
        </div>

        {/* FILTER ICON */}
        <div className="flex items-center justify-center w-9 h-9 bg-gray-50 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-100 transition">
          <Filter size={16} className="text-gray-500" />
        </div>

      </div>
    </div>
  );
}