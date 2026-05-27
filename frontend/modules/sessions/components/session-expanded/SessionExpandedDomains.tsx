//frontend\modules\sessions\components\session-expanded\SessionExpandedDomains.tsx
'use client';

import { BarChart3 } from 'lucide-react';

type Domain = {
  domain: string;

  time: number;

  category: string;

  isDistraction: boolean;
};

type Props = {
  domains?: Domain[];
};

function getCategoryStyles(category: string) {
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

export function SessionExpandedDomains({ domains = [] }: Props) {
  return (
    <div className="space-y-2">
      {/* TITLE */}

      <div
        className="
          flex items-center gap-1.5
        text-[13px] font-medium text-gray-700
        "
      >
        <BarChart3 size={16} />
        Top Activity
      </div>

      {/* EMPTY */}

      {!domains.length && (
        <p
          className="
            text-[13px]
            text-gray-400
          "
        >
          No domain data available
        </p>
      )}

      {/* DOMAINS */}

      {!!domains.length && (
        <div
          className="
            grid grid-cols-2
            gap-1.5
          "
        >
          {domains.slice(0, 4).map((domain, index) => (
            <div
              key={index}
              className="
                  flex items-center
                  justify-between

                  bg-gray-50

                  rounded-lg

                  px-2 py-1.5

                  text-[13px]
                "
            >
              {/* LEFT */}

              <div
                className="
                    flex items-center gap-1.5
                    min-w-0
                  "
              >
                <span
                  className="
                      truncate
                      text-gray-700
                      font-medium
                    "
                >
                  {domain.domain}
                </span>

                <span
                  className={`
                      text-[10px]

                      px-2 py-0.5

                      rounded-full

                      whitespace-nowrap

                      ${getCategoryStyles(domain.category)}
                    `}
                >
                  {domain.category}
                </span>
              </div>

              {/* RIGHT */}

              <div
                className="
                    flex items-center gap-1.5
                    ml-2
                  "
              >
                <span
                  className="
                      text-xs
                      text-gray-500
                      whitespace-nowrap
                    "
                >
                  {Math.round(domain.time / 60)} min
                </span>

                <span
                  className={`
                      text-xs
                      font-medium

                      ${
                        domain.isDistraction ? 'text-red-600' : 'text-green-600'
                      }
                    `}
                >
                  {domain.isDistraction ? '✖' : '✔'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
