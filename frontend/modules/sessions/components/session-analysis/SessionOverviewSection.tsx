//frontend\modules\sessions\components\session-analysis\SessionOverviewSection.tsx
'use client';

import { Brain, Activity } from 'lucide-react';

type Props = {
  session: any;
};

export function SessionOverviewSection({ session }: Props) {
  return (
    <div className="space-y-4">
      {/* TITLE */}
      <div
        className="
          flex items-center gap-2
          text-sm font-medium text-gray-700
        "
      >
        <Brain size={16} />
        AI Session Overview
      </div>

      {/* SUMMARY */}
      <div
        className="
          bg-gradient-to-br
          from-blue-50
          to-indigo-50

          border border-blue-100

          rounded-3xl
          p-6
        "
      >
        <p
          className="
            text-gray-700
            leading-relaxed
            text-[15px]
          "
        >
          {session.summary || 'No AI summary available for this session.'}
        </p>

        {/* TASK */}
        <div
          className="
            mt-5
            pt-5
            border-t border-blue-100
          "
        >
          <div
            className="
              text-xs
              uppercase
              tracking-wide
              text-blue-500
              font-semibold
              mb-2
            "
          >
            Original Focus Task
          </div>

          <p
            className="
              text-sm
              text-gray-500
            "
          >
            {session.task || 'No task context'}
          </p>
        </div>
      </div>

      {/* QUICK SIGNALS */}
      <div
        className="
          grid grid-cols-2 md:grid-cols-4
          gap-4
        "
      >
        {/* PRODUCTIVITY */}
        <div
          className="
            bg-white
            border border-gray-100

            rounded-2xl
            p-4
          "
        >
          <div
            className="
              flex items-center gap-2
              text-xs text-gray-500
            "
          >
            <Activity size={14} />
            Productivity
          </div>

          <p
            className="
              mt-2
              text-2xl font-bold
              text-gray-900
            "
          >
            {session.score ?? 0}
            <span
              className="
                text-sm
                text-gray-400
                ml-1
              "
            >
              %
            </span>
          </p>
        </div>

        {/* ATTENTION */}
        <div
          className="
            bg-white
            border border-gray-100

            rounded-2xl
            p-4
          "
        >
          <div
            className="
              flex items-center gap-2
              text-xs text-gray-500
            "
          >
            <Brain size={14} />
            Attention
          </div>

          <p
            className="
              mt-2
              text-2xl font-bold
              text-gray-900
            "
          >
            {session.attentionScore ?? 0}
            <span
              className="
                text-sm
                text-gray-400
                ml-1
              "
            >
              %
            </span>
          </p>
        </div>

        {/* INTERACTIONS */}
        <div
          className="
            bg-white
            border border-gray-100

            rounded-2xl
            p-4
          "
        >
          <div
            className="
              flex items-center gap-2
              text-xs text-gray-500
            "
          >
            <Activity size={14} />
            Interactions
          </div>

          <p
            className="
              mt-2
              text-2xl font-bold
              text-gray-900
            "
          >
            {session.totalInteractions ?? 0}
          </p>
        </div>

        {/* ENGAGEMENT */}
        <div
          className="
            bg-white
            border border-gray-100

            rounded-2xl
            p-4
          "
        >
          <div
            className="
              flex items-center gap-2
              text-xs text-gray-500
            "
          >
            <Activity size={14} />
            Engagement
          </div>

          <p
            className="
              mt-2
              text-2xl font-bold
              text-gray-900
            "
          >
            {(session.averageInteractionRate ?? 0).toFixed(1)}
          </p>
        </div>
      </div>
    </div>
  );
}
