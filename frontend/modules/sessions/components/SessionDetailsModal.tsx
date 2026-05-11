//frontend/modules/sessions/components/SessionDetailsModal.tsx

'use client';

import { X, Brain, Activity, BarChart3, Globe, Clock3 } from 'lucide-react';

import { Loading } from '@/components/ui/Loading';

import { useSessionDetails } from '@/modules/sessions/hooks/useSessionDetails';

type Props = {
  sessionId: string;

  onClose: () => void;
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

export function SessionDetailsModal({ sessionId, onClose }: Props) {
  const { session, loading, productiveDomains, distractionDomains } =
    useSessionDetails(sessionId);

  if (loading || !session) {
    return (
      <div
        className="
          fixed inset-0 z-50
          bg-black/40 backdrop-blur-sm
          flex items-center justify-center
        "
      >
        <div
          className="
            bg-white rounded-2xl p-8
            shadow-2xl
          "
        >
          <Loading />
        </div>
      </div>
    );
  }

  return (
    <div
      className="
        fixed inset-0 z-50
        bg-black/40 backdrop-blur-sm
        flex items-center justify-center
        p-4
      "
    >
      {/* MODAL */}
      <div
        className="
          w-full max-w-5xl
          max-h-[90vh]
          overflow-y-auto

          bg-white rounded-3xl
          shadow-2xl

          border border-gray-200
        "
      >
        {/* HEADER */}
        <div
          className="
            sticky top-0 z-10
            bg-white/95 backdrop-blur
            border-b border-gray-100

            px-8 py-5

            flex items-center justify-between
          "
        >
          <div>
            <h2
              className="
                text-2xl font-bold
                tracking-tight text-gray-900
              "
            >
              Session Analysis
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Session #{session.id.slice(0, 8)}
            </p>
          </div>

          <button
            onClick={onClose}
            className="
              w-10 h-10 rounded-xl
              bg-gray-100 hover:bg-gray-200
              flex items-center justify-center
              transition
            "
          >
            <X size={18} />
          </button>
        </div>

        {/* CONTENT */}
        <div className="p-8 space-y-8">
          {/* TASK */}
          <div className="space-y-2">
            <div
              className="
                flex items-center gap-2
                text-sm font-medium text-gray-700
              "
            >
              <Brain size={16} />
              Focus Task
            </div>

            <div
              className="
                bg-gray-50 rounded-2xl
                p-4 text-gray-700
              "
            >
              {session.task || 'No task context'}
            </div>
          </div>

          {/* METRICS */}
          <div
            className="
              grid grid-cols-2 md:grid-cols-5
              gap-4
            "
          >
            <div className="bg-gray-50 rounded-2xl p-4">
              <div
                className="
                  flex items-center gap-2
                  text-xs text-gray-500
                "
              >
                <Activity size={14} />
                Focus
              </div>

              <p className="mt-2 text-2xl font-bold text-gray-900">
                {session.focusTime ?? 0}
                <span className="text-sm font-medium text-gray-400 ml-1">
                  min
                </span>
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-4">
              <div
                className="
                  flex items-center gap-2
                  text-xs text-gray-500
                "
              >
                <Clock3 size={14} />
                Idle
              </div>

              <p className="mt-2 text-2xl font-bold text-gray-900">
                {session.idleTime ?? 0}
                <span className="text-sm font-medium text-gray-400 ml-1">
                  min
                </span>
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-4">
              <div
                className="
                  flex items-center gap-2
                  text-xs text-gray-500
                "
              >
                <BarChart3 size={14} />
                Score
              </div>

              <p className="mt-2 text-2xl font-bold text-gray-900">
                {session.score ?? 0}
                <span className="text-sm font-medium text-gray-400 ml-1">
                  %
                </span>
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-4">
              <div
                className="
                  flex items-center gap-2
                  text-xs text-gray-500
                "
              >
                <BarChart3 size={14} />
                Interruptions
              </div>

              <p className="mt-2 text-2xl font-bold text-gray-900">
                {session.interruptions ?? 0}
              </p>
            </div>

            <div className="bg-red-50 rounded-2xl p-4">
              <div
                className="
                  flex items-center gap-2
                  text-xs text-red-500
                "
              >
                <BarChart3 size={14} />
                Distractions
              </div>

              <p className="mt-2 text-2xl font-bold text-red-600">
                {session.distractions ?? 0}
              </p>
            </div>
          </div>

          {/* AI FEEDBACK */}
          <div className="space-y-3">
            <div
              className="
                flex items-center gap-2
                text-sm font-medium text-gray-700
              "
            >
              <Brain size={16} />
              AI Feedback
            </div>

            <div
              className="
                bg-blue-50 border border-blue-100
                rounded-2xl p-5
                text-gray-700 leading-relaxed
              "
            >
              {session.feedback || 'No AI feedback available.'}
            </div>
          </div>

          {/* DOMAINS */}
          <div className="space-y-4">
            <div
              className="
                flex items-center gap-2
                text-sm font-medium text-gray-700
              "
            >
              <Globe size={16} />
              Domain Intelligence
            </div>

            <div className="space-y-3">
              {session.domains.map((domain) => (
                <div
                  key={domain.id}
                  className="
                    border border-gray-100
                    rounded-2xl
                    p-4
                    bg-white
                  "
                >
                  {/* TOP */}
                  <div
                    className="
                      flex items-center justify-between
                      gap-4
                    "
                  >
                    <div className="min-w-0">
                      <div
                        className="
                          flex items-center gap-2
                          flex-wrap
                        "
                      >
                        <h3
                          className="
                            font-semibold text-gray-900
                            truncate
                          "
                        >
                          {domain.domain}
                        </h3>

                        <span
                          className={`
                            text-[11px]
                            px-2 py-1 rounded-full
                            font-medium

                            ${getCategoryColor(domain.category)}
                          `}
                        >
                          {domain.category}
                        </span>
                      </div>

                      <p className="text-sm text-gray-500 mt-1">
                        {Math.round(domain.time / 60)} min
                      </p>
                    </div>

                    <div
                      className={`
                        text-sm font-semibold

                        ${
                          domain.isDistraction
                            ? 'text-red-600'
                            : 'text-green-600'
                        }
                      `}
                    >
                      {domain.isDistraction ? 'Distracting' : 'Productive'}
                    </div>
                  </div>

                  {/* AI REASON */}
                  <div className="mt-4 space-y-2">
                    <p
                      className="
                        text-sm text-gray-700
                        leading-relaxed
                      "
                    >
                      {domain.aiReason || 'No AI reasoning available.'}
                    </p>

                    {domain.aiConfidence != null && (
                      <div
                        className="
                          text-xs text-gray-400
                        "
                      >
                        Confidence: {Math.round(domain.aiConfidence * 100)}%
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* QUICK SUMMARY */}
          <div
            className="
              grid md:grid-cols-2
              gap-4
            "
          >
            <div
              className="
                bg-green-50
                rounded-2xl p-5
                border border-green-100
              "
            >
              <h3
                className="
                  font-semibold text-green-800
                  mb-3
                "
              >
                Productive Domains
              </h3>

              <div className="space-y-2">
                {productiveDomains.map((d) => (
                  <div
                    key={d.id}
                    className="
                      text-sm text-green-700
                    "
                  >
                    • {d.domain}
                  </div>
                ))}
              </div>
            </div>

            <div
              className="
                bg-red-50
                rounded-2xl p-5
                border border-red-100
              "
            >
              <h3
                className="
                  font-semibold text-red-800
                  mb-3
                "
              >
                Distraction Domains
              </h3>

              <div className="space-y-2">
                {distractionDomains.map((d) => (
                  <div
                    key={d.id}
                    className="
                      text-sm text-red-700
                    "
                  >
                    • {d.domain}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
