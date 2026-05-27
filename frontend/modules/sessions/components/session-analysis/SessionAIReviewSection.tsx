//frontend\modules\sessions\components\session-analysis\SessionAIReviewSection.tsx
'use client';

import { Brain, CheckCircle2, AlertTriangle, Lightbulb } from 'lucide-react';

type Props = {
  session: any;
};

export function SessionAIReviewSection({ session }: Props) {
  return (
    <div className="space-y-5">
      {/* TITLE */}
      <div
        className="
          flex items-center gap-2
          text-sm font-medium text-gray-700
        "
      >
        <Brain size={16} />
        AI Behavioral Review
      </div>

      {/* FEEDBACK */}
      <div
        className="
          bg-gradient-to-br
          from-slate-50
          to-gray-50

          border border-gray-100

          rounded-3xl
          p-6
        "
      >
        <p
          className="
            text-gray-700
            leading-relaxed
          "
        >
          {session.feedback || 'No behavioral feedback available.'}
        </p>
      </div>

      {/* ANALYSIS GRID */}
      <div
        className="
          grid md:grid-cols-3
          gap-4
        "
      >
        {/* STRENGTHS */}
        <div
          className="
            bg-green-50
            border border-green-100

            rounded-2xl
            p-5
          "
        >
          <div
            className="
              flex items-center gap-2
              text-sm font-semibold
              text-green-700
              mb-4
            "
          >
            <CheckCircle2 size={16} />
            Strengths
          </div>

          <div className="space-y-3">
            {(session.strengths ?? []).length ? (
              session.strengths.map((item: string, index: number) => (
                <div
                  key={index}
                  className="
                      text-sm
                      text-green-800
                      leading-relaxed
                    "
                >
                  • {item}
                </div>
              ))
            ) : (
              <p
                className="
                  text-sm
                  text-green-700/70
                "
              >
                No strengths available.
              </p>
            )}
          </div>
        </div>

        {/* WEAKNESSES */}
        <div
          className="
            bg-red-50
            border border-red-100

            rounded-2xl
            p-5
          "
        >
          <div
            className="
              flex items-center gap-2
              text-sm font-semibold
              text-red-700
              mb-4
            "
          >
            <AlertTriangle size={16} />
            Weaknesses
          </div>

          <div className="space-y-3">
            {(session.weaknesses ?? []).length ? (
              session.weaknesses.map((item: string, index: number) => (
                <div
                  key={index}
                  className="
                      text-sm
                      text-red-800
                      leading-relaxed
                    "
                >
                  • {item}
                </div>
              ))
            ) : (
              <p
                className="
                  text-sm
                  text-red-700/70
                "
              >
                No weaknesses available.
              </p>
            )}
          </div>
        </div>

        {/* RECOMMENDATIONS */}
        <div
          className="
            bg-amber-50
            border border-amber-100

            rounded-2xl
            p-5
          "
        >
          <div
            className="
              flex items-center gap-2
              text-sm font-semibold
              text-amber-700
              mb-4
            "
          >
            <Lightbulb size={16} />
            Recommendations
          </div>

          <div className="space-y-3">
            {(session.recommendations ?? []).length ? (
              session.recommendations.map((item: string, index: number) => (
                <div
                  key={index}
                  className="
                      text-sm
                      text-amber-800
                      leading-relaxed
                    "
                >
                  • {item}
                </div>
              ))
            ) : (
              <p
                className="
                  text-sm
                  text-amber-700/70
                "
              >
                No recommendations available.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
