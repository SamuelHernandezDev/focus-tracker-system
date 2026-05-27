//frontend/modules/dashboard/components/DashboardRecentSessions.tsx
'use client';

import { Clock, Trophy, Sparkles, TrendingUp } from 'lucide-react';

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
  if (score >= 80) {
    return 'text-emerald-600';
  }

  if (score >= 60) {
    return 'text-amber-500';
  }

  return 'text-rose-500';
}

function getScoreBg(score: number) {
  if (score >= 80) {
    return `
      bg-emerald-500/10
      text-emerald-600
    `;
  }

  if (score >= 60) {
    return `
      bg-amber-500/10
      text-amber-600
    `;
  }

  return `
    bg-rose-500/10
    text-rose-500
  `;
}

function getRankStyle(index: number) {
  if (index === 0) {
    return `
      from-yellow-400
      to-amber-500

      text-white

      shadow-yellow-500/30
    `;
  }

  if (index === 1) {
    return `
      from-slate-300
      to-slate-400

      text-white

      shadow-slate-400/30
    `;
  }

  if (index === 2) {
    return `
      from-orange-400
      to-orange-500

      text-white

      shadow-orange-500/30
    `;
  }

  return `
    from-slate-100
    to-slate-200

    text-slate-500
  `;
}

export function DashboardRecentSessions({ sessions }: Props) {
  const topSessions = sessions.slice(0, 5);

  return (
    <div
      className="
        relative

        overflow-hidden

        rounded-[32px]

        border border-white/40

        bg-gradient-to-br
        from-white
        via-white
        to-slate-50/80

        p-6

        shadow-sm
      "
    >
      {/* GLOW */}

      <div
        className="
          absolute
          top-0
          right-0

          w-56
          h-56

          rounded-full

          bg-yellow-400/10

          blur-3xl
        "
      />

      {/* CONTENT */}

      <div
        className="
          relative z-10
        "
      >
        {/* HEADER */}

        <div
          className="
            flex items-center
            justify-between

            mb-6
          "
        >
          <div>
            <h3
              className="
                text-lg
                font-semibold

                text-gray-900
              "
            >
              Top Sessions
            </h3>

            <p
              className="
                mt-1

                text-sm
                text-gray-500
              "
            >
              Highest focus performance sessions
            </p>
          </div>

          <div
            className="
              w-12
              h-12

              rounded-2xl

              bg-gradient-to-br
              from-yellow-400
              to-amber-500

              flex items-center
              justify-center

              shadow-lg
              shadow-yellow-500/20
            "
          >
            <Trophy
              size={20}
              className="
                text-white
              "
            />
          </div>
        </div>

        {/* EMPTY */}

        {topSessions.length === 0 ? (
          <div
            className="
              flex flex-col
              items-center
              justify-center

              py-14
            "
          >
            <div
              className="
                w-14
                h-14

                rounded-2xl

                bg-slate-100

                flex items-center
                justify-center
              "
            >
              <Sparkles
                size={22}
                className="
                  text-slate-400
                "
              />
            </div>

            <p
              className="
                mt-4

                text-sm
                font-medium

                text-gray-500
              "
            >
              No sessions available yet
            </p>
          </div>
        ) : (
          <div
            className="
              space-y-3
            "
          >
            {topSessions.map((session, index) => (
              <div
                key={session.id}
                className="
                  group

                  relative

                  overflow-hidden

                  rounded-3xl

                  border border-white/50

                  bg-white/70

                  backdrop-blur-xl

                  p-4

                  transition-all
                  duration-300

                  hover:-translate-y-[2px]
                  hover:bg-white
                  hover:shadow-lg
                  hover:shadow-black/[0.04]
                "
              >
                {/* HOVER GLOW */}

                <div
                  className="
                    absolute
                    inset-0

                    opacity-0
                    group-hover:opacity-100

                    bg-gradient-to-r
                    from-yellow-500/[0.03]
                    to-transparent

                    transition
                  "
                />

                {/* CONTENT */}

                <div
                  className="
                    relative z-10

                    flex items-center
                    justify-between
                  "
                >
                  {/* LEFT */}

                  <div
                    className="
                      flex items-center
                      gap-4
                    "
                  >
                    {/* RANK */}

                    <div
                      className={`
                        w-10
                        h-10

                        rounded-2xl

                        bg-gradient-to-br

                        flex items-center
                        justify-center

                        text-sm
                        font-semibold

                        shadow-lg

                        ${getRankStyle(index)}
                      `}
                    >
                      {index + 1}
                    </div>

                    {/* INFO */}

                    <div>
                      <p
                        className="
                          text-sm
                          font-semibold

                          text-gray-900
                        "
                      >
                        Session #{session.id}
                      </p>

                      <div
                        className="
                          mt-1

                          flex items-center
                          gap-3
                        "
                      >
                        <span
                          className="
                            text-xs
                            text-gray-400
                          "
                        >
                          {session.date}
                        </span>

                        <div
                          className="
                            flex items-center
                            gap-1

                            text-xs
                            text-gray-500
                          "
                        >
                          <Clock size={12} />
                          {session.duration} min
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT */}

                  <div
                    className="
                      flex items-center
                      gap-2
                    "
                  >
                    <TrendingUp
                      size={14}
                      className={getScoreColor(session.score)}
                    />

                    <div
                      className={`
                        px-3
                        py-1.5

                        rounded-xl

                        text-sm
                        font-semibold

                        ${getScoreBg(session.score)}
                      `}
                    >
                      {session.score}%
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
