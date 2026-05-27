//frontend/modules/sessions/components/session-expanded/SessionExpandedSummary.tsx

'use client';

import { Brain } from 'lucide-react';

type Props = {
  summary?: string | null;

  task?: string | null;
};

export function SessionExpandedSummary({ summary, task }: Props) {
  return (
    <div className="space-y-2">
      {/* TITLE */}

      <div
        className="
          flex items-center gap-2
          text-sm font-medium text-gray-700
        "
      >
        <Brain size={16} />
        AI Session Summary
      </div>

      {/* CARD */}

      <div
        className="
          bg-gradient-to-br
          from-blue-50
          to-indigo-50

          border border-blue-100

          rounded-xl
          p-3

          space-y-3
        "
      >
        {/* TASK */}

        <div>
          <div
            className="
              text-[11px]
              uppercase
              tracking-wide

              text-blue-500
              font-semibold

              mb-1
            "
          >
            Focus Task
          </div>

          <p
            className="
              text-[13px]
              font-medium
              text-gray-800
            "
          >
            {task || 'No task context provided'}
          </p>
        </div>

        {/* DIVIDER */}

        <div
          className="
            border-t border-blue-100
          "
        />

        {/* SUMMARY */}

        <p
          className="
            text-[13px]
            text-gray-700
            leading-relaxed
          "
        >
          {summary ||
            'Focused work session with moderate engagement and stable attention patterns.'}
        </p>
      </div>
    </div>
  );
}
