//frontend\modules\sessions\components\session-expanded\SessionExpandedFeedback.tsx
'use client';

import { Brain } from 'lucide-react';

type Props = {
  feedback?: string | null;
};

export function SessionExpandedFeedback({ feedback }: Props) {
  return (
    <div className="space-y-2">
      {/* TITLE */}

      <div
        className="
          flex items-center gap-3
          text-[13px] font-medium text-gray-700
        "
      >
        <Brain size={16} />
        AI Feedback
      </div>

      {/* CONTENT */}

      <div
        className="
          bg-white

          border border-gray-100

          rounded-xl

          p-4
        "
      >
        <p
          className="
            text-[13px]
            text-gray-600
            leading-relaxed
          "
        >
          {feedback ||
            'You maintained a stable focus, but distractions impacted your performance. Try reducing time spent on non-essential tabs.'}
        </p>
      </div>
    </div>
  );
}
