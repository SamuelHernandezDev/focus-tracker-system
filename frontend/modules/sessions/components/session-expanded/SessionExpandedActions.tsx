//frontend/modules/sessions/components/session-expanded/SessionExpandedActions.tsx

'use client';

import { Expand } from 'lucide-react';

type Props = {
  sessionId: string;

  onOpenAnalysis: () => void;

  onReviewSession: () => void;
};

export function SessionExpandedActions({
  sessionId,
  onOpenAnalysis,
  onReviewSession,
}: Props) {
  return (
    <div
      className="
        pt-2

        flex flex-col
        md:flex-row

        gap-2
      "
    >
      {/* FULL ANALYSIS */}

      <button
        onClick={onOpenAnalysis}
        className="
          flex-1

          flex items-center
          justify-center
          gap-2

          px-3 py-1.5

          rounded-lg

          text-[13px]
          font-medium

          bg-gradient-to-r
          from-[var(--primary)]
          to-indigo-500

          text-white

          shadow-sm

          hover:scale-[1.01]
          hover:shadow-md
          hover:opacity-95

          active:scale-[0.99]

          transition-all
          duration-200
        "
      >
        <Expand size={16} />
        View Full Analysis
      </button>
    </div>
  );
}
