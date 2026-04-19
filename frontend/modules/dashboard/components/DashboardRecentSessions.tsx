//frontend\modules\dashboard\components\DashboardRecentSessions.tsx
"use client";

import { Clock, Trophy } from "lucide-react";

type Session = {
  id: string;
  duration: number;
  score: number;
  date: string;
};

type Props = {
  sessions: Session[];
};

function getScoreColor(score: number) {
  if (score >= 80) return "text-green-600";
  if (score >= 60) return "text-yellow-600";
  return "text-red-600";
}

function getRankStyle(index: number) {
  if (index === 0)
    return "bg-yellow-100 text-yellow-700 border border-yellow-200";
  if (index === 1)
    return "bg-gray-100 text-gray-700 border border-gray-200";
  if (index === 2)
    return "bg-orange-100 text-orange-700 border border-orange-200";

  return "bg-gray-50 text-gray-500";
}

export function DashboardRecentSessions({ sessions }: Props) {
  const topSessions = sessions.slice(0, 5);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
      
      {/* HEADER */}
      <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-4">
        <Trophy size={16} />
        Top Sessions
      </div>

      {/* EMPTY */}
      {topSessions.length === 0 ? (
        <p className="text-sm text-gray-400">
          No sessions yet
        </p>
      ) : (
        <div className="space-y-3">
          {topSessions.map((session, index) => (
            <div
              key={session.id}
              className={`
                flex items-center justify-between p-3 rounded-lg transition
                ${index < 3 ? "bg-gray-50" : "hover:bg-gray-50"}
              `}
            >
              {/* LEFT */}
              <div className="flex items-center gap-3">

                {/* RANK */}
                <div
                  className={`
                    w-7 h-7 flex items-center justify-center rounded-full text-xs font-semibold
                    ${getRankStyle(index)}
                  `}
                >
                  {index + 1}
                </div>

                {/* INFO */}
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-900">
                    {session.date}
                  </span>

                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Clock size={12} />
                    {session.duration} min
                  </span>
                </div>
              </div>

              {/* RIGHT */}
              <div className="text-right">
                <span
                  className={`text-sm font-semibold ${getScoreColor(session.score)}`}
                >
                  {session.score}%
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}