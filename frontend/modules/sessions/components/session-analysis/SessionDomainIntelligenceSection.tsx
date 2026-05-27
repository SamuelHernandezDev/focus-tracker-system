//frontend\modules\sessions\components\session-analysis\SessionDomainIntelligenceSection.tsx
'use client';

import { Globe, AlertTriangle, CheckCircle2 } from 'lucide-react';

type Props = {
  domains?: any[];
};

function getCategoryColor(category: string) {
  switch (category) {
    case 'PRODUCTIVE':
      return 'bg-green-100 text-green-700';

    case 'SUPPORT':
      return 'bg-blue-100 text-blue-700';

    case 'LEARNING':
      return 'bg-purple-100 text-purple-700';

    case 'NEUTRAL':
      return 'bg-yellow-100 text-yellow-700';

    case 'SOCIAL':
      return 'bg-pink-100 text-pink-700';

    case 'DISTRACTION':
      return 'bg-red-100 text-red-700';

    default:
      return 'bg-gray-100 text-gray-700';
  }
}

export function SessionDomainIntelligenceSection({ domains = [] }: Props) {
  if (!domains.length) {
    return null;
  }

  return (
    <div className="space-y-5">
      {/* TITLE */}
      <div
        className="
          flex items-center gap-2
          text-sm font-medium text-gray-700
        "
      >
        <Globe size={16} />
        Domain Intelligence
      </div>

      {/* DOMAIN LIST */}
      <div className="space-y-4">
        {domains.map((domain) => (
          <div
            key={domain.id}
            className="
              bg-white

              border border-gray-100

              rounded-3xl
              p-5

              shadow-sm
            "
          >
            {/* TOP */}
            <div
              className="
                flex items-start
                justify-between
                gap-4
              "
            >
              {/* LEFT */}
              <div className="min-w-0">
                <div
                  className="
                    flex items-center
                    gap-2
                    flex-wrap
                  "
                >
                  <h3
                    className="
                      font-semibold
                      text-gray-900
                    "
                  >
                    {domain.domain}
                  </h3>

                  <span
                    className={`
                      text-[11px]
                      px-2 py-1
                      rounded-full
                      font-medium

                      ${getCategoryColor(domain.category)}
                    `}
                  >
                    {domain.category}
                  </span>
                </div>

                <p
                  className="
                    text-sm
                    text-gray-500
                    mt-1
                  "
                >
                  {Math.round(domain.time / 60)} min active
                </p>
              </div>

              {/* RIGHT */}
              <div
                className={`
                  flex items-center
                  gap-2

                  text-sm
                  font-semibold

                  ${domain.isDistraction ? 'text-red-600' : 'text-green-600'}
                `}
              >
                {domain.isDistraction ? (
                  <>
                    <AlertTriangle size={15} />
                    Distracting
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={15} />
                    Productive
                  </>
                )}
              </div>
            </div>

            {/* AI REASON */}
            <div
              className="
                mt-5
                pt-5

                border-t border-gray-100
              "
            >
              <p
                className="
                  text-sm
                  text-gray-700
                  leading-relaxed
                "
              >
                {domain.aiReason || 'No AI reasoning available.'}
              </p>

              {/* FOOTER */}
              <div
                className="
                  mt-4

                  flex items-center
                  justify-between
                "
              >
                <div
                  className="
                    text-xs
                    text-gray-400
                  "
                >
                  AI Confidence: {Math.round((domain.aiConfidence ?? 0) * 100)}%
                </div>

                <div
                  className={`
                    text-xs
                    font-medium

                    ${domain.relevant ? 'text-blue-600' : 'text-gray-400'}
                  `}
                >
                  {domain.relevant ? 'Relevant to task' : 'Not relevant'}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
