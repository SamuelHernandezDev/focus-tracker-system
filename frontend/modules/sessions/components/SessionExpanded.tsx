//frontend\modules\sessions\components\SessionExpanded.tsx
"use client";

import {
  FileText,
  Brain,
  BarChart3,
  Activity,
} from "lucide-react";

type Session = {
  id: string;
  duration: number;
  score: number;
  interruptions: number;

  focusTime?: number;
  idleTime?: number;
  distractions?: number;
  task?: string;
  feedback?: string;

  topDomains?: {
    domain: string;
    time: number;
    category: string;
    isDistraction: boolean;
  }[];
};

type Props = {
  item: Session;
};

export function SessionExpanded({ item }: Props) {
  return (
    <div className="space-y-6">

      {/* ====================== */}
      {/* CONTEXT */}
      {/* ====================== */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <FileText size={16} />
          Task Context
        </div>

        <p className="text-sm text-gray-600 leading-relaxed">
          {item.task || "No task provided"}
        </p>
      </div>

      {/* ====================== */}
      {/* METRICS */}
      {/* ====================== */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Activity size={12} />
            Focus
          </div>
          <p className="font-semibold text-gray-900">
            {(item.focusTime ?? 0).toFixed(1)} min
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Activity size={12} />
            Idle
          </div>
          <p className="font-semibold text-gray-900">
            {(item.focusTime ?? 0).toFixed(1)} min
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <BarChart3 size={12} />
            Interruptions
          </div>
          <p className="font-semibold text-gray-900">
            {item.interruptions}
          </p>
        </div>

        <div className="bg-red-50 rounded-lg p-3">
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <BarChart3 size={12} />
            Distractions
          </div>
          <p
            className={`font-semibold ${
              (item.distractions ?? 0) > 3
                ? "text-red-600"
                : "text-gray-900"
            }`}
          >
            {item.distractions ?? 0}
          </p>
        </div>

      </div>

      {/* ====================== */}
      {/* TOP DOMAINS */}
      {/* ====================== */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <BarChart3 size={16} />
          Top Activity
        </div>

        {item.topDomains && item.topDomains.length > 0 ? (
          <div className="grid grid-cols-2 gap-2">

            {item.topDomains.map((d, index) => (
              <div
                key={index}
                className="
                  flex items-center justify-between
                  bg-gray-50 rounded-lg px-3 py-2
                  text-sm
                "
              >
                {/* LEFT */}
                <div className="flex items-center gap-2 min-w-0">
                  <span className="truncate text-gray-700 font-medium">
                    {d.domain}
                  </span>

                  <span
                    className={`
                      text-[10px] px-2 py-0.5 rounded-full whitespace-nowrap
                      ${
                        d.category === "PRODUCTIVE"
                          ? "bg-green-100 text-green-700"
                          : d.category === "SUPPORT"
                          ? "bg-blue-100 text-blue-700"
                          : d.category === "NEUTRAL"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }
                    `}
                  >
                    {d.category}
                  </span>
                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-2 ml-2">
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    {Math.round(d.time / 60)} min
                  </span>

                  <span
                    className={`
                      text-xs font-medium
                      ${
                        d.isDistraction
                          ? "text-red-600"
                          : "text-green-600"
                      }
                    `}
                  >
                    {d.isDistraction ? "✖" : "✔"}
                  </span>
                </div>
              </div>
            ))}

          </div>
        ) : (
          <p className="text-sm text-gray-400">
            No domain data available
          </p>
        )}
      </div>

      {/* ====================== */}
      {/* AI FEEDBACK */}
      {/* ====================== */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Brain size={16} />
          AI Feedback
        </div>

        <p className="text-sm text-gray-600 leading-relaxed">
          {item.feedback ||
            "You maintained a stable focus, but distractions impacted your performance. Try reducing time spent on non-essential tabs."}
        </p>
      </div>

      {/* ====================== */}
      {/* ACTION */}
      {/* ====================== */}
      <div className="pt-2">
        <button
          onClick={() => {
            console.log("Open AI chat for session:", item.id);
          }}
          className="
            w-full flex items-center justify-center gap-2
            px-4 py-2 rounded-lg text-sm font-medium
            bg-blue-600 text-white
            hover:bg-blue-700 transition
          "
        >
          <Brain size={16} />
          Review Session
        </button>
      </div>

    </div>
  );
}