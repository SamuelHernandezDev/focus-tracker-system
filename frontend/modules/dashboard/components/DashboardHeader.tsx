//frontend\modules\dashboard\components\DashboardHeader.tsx
"use client";

import { Eye, Timer, Activity } from "lucide-react";

type Props = {
  sessionActive?: boolean;
  presenceDetected?: boolean;
};

export function DashboardHeader({
  sessionActive = false,
  presenceDetected = true,
}: Props) {
  return (
    <div className="flex items-center justify-between pb-4 border-b border-gray-200">

      {/* LEFT */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Overview
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Your cognitive focus and activity insights
        </p>
      </div>

      {/* RIGHT STATUS */}
      <div className="flex items-center gap-3">

        {/* SESSION STATUS */}
        <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg">
          <Timer size={14} className="text-gray-400" />
          <span className="text-sm text-gray-600">
            {sessionActive ? "Session Active" : "No Active Session"}
          </span>
        </div>

        {/* PRESENCE */}
        <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg">
          <Eye size={14} className="text-gray-400" />
          <span className="text-sm text-gray-600">
            {presenceDetected ? "Present" : "Not Detected"}
          </span>
        </div>

        {/* ACTIVITY INDICATOR */}
        <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg">
          <Activity size={14} className="text-gray-400" />
          <span className="text-sm text-gray-600">
            Stable Activity
          </span>
        </div>

      </div>
    </div>
  );
}