//frontend\modules\sessions\components\session-analysis\SessionAttentionSection.tsx
'use client';

import { Brain, Smartphone, EyeOff, Focus } from 'lucide-react';

type Props = {
  session: any;
};

function formatMinutes(seconds?: number) {
  return Math.round((seconds || 0) / 60);
}

export function SessionAttentionSection({ session }: Props) {
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
        Attention Analysis
      </div>

      {/* GRID */}
      <div
        className="
          grid md:grid-cols-2 xl:grid-cols-4
          gap-4
        "
      >
        {/* ATTENTIVE */}
        <div
          className="
            bg-green-50
            border border-green-100

            rounded-3xl
            p-5
          "
        >
          <div
            className="
              flex items-center gap-2
              text-green-700
              text-sm font-medium
            "
          >
            <Focus size={16} />
            Attentive
          </div>

          <div
            className="
              mt-4
              text-3xl
              font-bold
              text-green-800
            "
          >
            {formatMinutes(session.attentiveTime)}
            <span
              className="
                text-sm
                ml-1
                text-green-600
              "
            >
              min
            </span>
          </div>

          <p
            className="
              mt-3
              text-sm
              text-green-700/80
              leading-relaxed
            "
          >
            Sustained visual focus and stable engagement patterns.
          </p>
        </div>

        {/* DISTRACTED */}
        <div
          className="
            bg-yellow-50
            border border-yellow-100

            rounded-3xl
            p-5
          "
        >
          <div
            className="
              flex items-center gap-2
              text-yellow-700
              text-sm font-medium
            "
          >
            <Brain size={16} />
            Distracted
          </div>

          <div
            className="
              mt-4
              text-3xl
              font-bold
              text-yellow-800
            "
          >
            {formatMinutes(session.distractedTime)}
            <span
              className="
                text-sm
                ml-1
                text-yellow-600
              "
            >
              min
            </span>
          </div>

          <p
            className="
              mt-3
              text-sm
              text-yellow-700/80
              leading-relaxed
            "
          >
            Partial attention shifts and reduced cognitive stability.
          </p>
        </div>

        {/* PHONE */}
        <div
          className="
            bg-purple-50
            border border-purple-100

            rounded-3xl
            p-5
          "
        >
          <div
            className="
              flex items-center gap-2
              text-purple-700
              text-sm font-medium
            "
          >
            <Smartphone size={16} />
            Phone Usage
          </div>

          <div
            className="
              mt-4
              text-3xl
              font-bold
              text-purple-800
            "
          >
            {formatMinutes(session.phoneTime)}
            <span
              className="
                text-sm
                ml-1
                text-purple-600
              "
            >
              min
            </span>
          </div>

          <p
            className="
              mt-3
              text-sm
              text-purple-700/80
              leading-relaxed
            "
          >
            External device interaction detected during the session.
          </p>
        </div>

        {/* ABSENT */}
        <div
          className="
            bg-red-50
            border border-red-100

            rounded-3xl
            p-5
          "
        >
          <div
            className="
              flex items-center gap-2
              text-red-700
              text-sm font-medium
            "
          >
            <EyeOff size={16} />
            Absent
          </div>

          <div
            className="
              mt-4
              text-3xl
              font-bold
              text-red-800
            "
          >
            {formatMinutes(session.absentTime)}
            <span
              className="
                text-sm
                ml-1
                text-red-600
              "
            >
              min
            </span>
          </div>

          <p
            className="
              mt-3
              text-sm
              text-red-700/80
              leading-relaxed
            "
          >
            Lack of visible engagement or attention presence.
          </p>
        </div>
      </div>

      {/* ATTENTION SCORE */}
      <div
        className="
          bg-white

          border border-gray-100

          rounded-3xl
          p-6
        "
      >
        <div
          className="
            flex items-center
            justify-between
            gap-4
          "
        >
          <div>
            <p
              className="
                text-sm
                font-medium
                text-gray-700
              "
            >
              Overall Attention Quality
            </p>

            <p
              className="
                mt-2
                text-sm
                text-gray-500
                leading-relaxed
                max-w-2xl
              "
            >
              Composite behavioral attention score derived from engagement
              stability, distraction frequency, and visual focus consistency.
            </p>
          </div>

          <div
            className="
              shrink-0

              w-24 h-24
              rounded-full

              bg-gradient-to-br
              from-blue-500
              to-indigo-600

              flex items-center
              justify-center

              text-white
              font-bold
              text-2xl
            "
          >
            {Math.round(session.attentionScore ?? 0)}
          </div>
        </div>
      </div>
    </div>
  );
}
