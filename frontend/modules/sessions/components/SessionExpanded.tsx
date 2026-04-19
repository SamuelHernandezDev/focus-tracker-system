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
  task?: string;
  feedback?: string;
};

type Props = {
  item: Session;
};

export function SessionExpanded({ item }: Props) {
  return (
    <div className="space-y-5">

      {/* CONTEXT */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <FileText size={16} />
          Task Context
        </div>

        <p className="text-sm text-gray-600 leading-relaxed">
          {item.task || "No task provided"}
        </p>
      </div>

      {/* METRICS */}
      <div className="flex flex-wrap items-center gap-6 text-sm">

        <div className="flex items-center gap-2">
          <Activity size={16} className="text-gray-400" />
          <span className="text-gray-500">Focus:</span>
          <span className="font-medium text-gray-900">
            {item.focusTime ?? 0} min
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Activity size={16} className="text-gray-400" />
          <span className="text-gray-500">Idle:</span>
          <span className="font-medium text-gray-900">
            {item.idleTime ?? 0} min
          </span>
        </div>

        <div className="flex items-center gap-2">
          <BarChart3 size={16} className="text-gray-400" />
          <span className="text-gray-500">Interruptions:</span>
          <span className="font-medium text-gray-900">
            {item.interruptions}
          </span>
        </div>

      </div>

      {/* AI FEEDBACK */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Brain size={16} />
          AI Feedback
        </div>

        <p className="text-sm text-gray-600 leading-relaxed">
          {item.feedback ||
            "You maintained a stable focus during most of the session, but interruptions affected your overall score. Try minimizing distractions for better consistency."}
        </p>
      </div>

      {/* ACTION */}
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