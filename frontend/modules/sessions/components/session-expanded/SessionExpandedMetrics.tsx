//frontend\modules\sessions\components\session-expanded\SessionExpandedMetrics.tsx
'use client';

type Props = {
  attentionScore?: number | null;

  productivityScore?: number | null;

  averageInteractionRate?: number | null;

  distractions?: number | null;
};

export function SessionExpandedMetrics({
  attentionScore,
  productivityScore,
  averageInteractionRate,
  distractions,
}: Props) {
  return (
    <div
      className="
        grid grid-cols-2 md:grid-cols-4
        gap-2
      "
    >
      {/* ATTENTION */}

      <div
        className="
          bg-blue-50
          rounded-xl
          p-3
        "
      >
        <div
          className="
            text-xs
            text-blue-600
            font-medium
          "
        >
          Attention Score
        </div>

        <p
          className="
            mt-1
            text-xl
            font-bold
            text-blue-900
          "
        >
          {Math.round(attentionScore ?? 0)}%
        </p>
      </div>

      {/* PRODUCTIVITY */}

      <div
        className="
          bg-green-50
          rounded-xl
          p-3
        "
      >
        <div
          className="
            text-xs
            text-green-600
            font-medium
          "
        >
          Productivity
        </div>

        <p
          className="
            mt-1
            text-xl
            font-bold
            text-green-900
          "
        >
          {Math.round(productivityScore ?? 0)}%
        </p>
      </div>

      {/* ENGAGEMENT */}

      <div
        className="
          bg-purple-50
          rounded-xl
          p-3
        "
      >
        <div
          className="
            text-xs
            text-purple-600
            font-medium
          "
        >
          Engagement
        </div>

        <p
          className="
            mt-1
            text-xl
            font-bold
            text-purple-900
          "
        >
          {Math.round(averageInteractionRate ?? 0)}
        </p>
      </div>

      {/* DISTRACTIONS */}

      <div
        className="
          bg-red-50
          rounded-xl
          p-3
        "
      >
        <div
          className="
            text-xs
            text-red-600
            font-medium
          "
        >
          Distractions
        </div>

        <p
          className="
            mt-1
            text-xl
            font-bold
            text-red-900
          "
        >
          {distractions ?? 0}
        </p>
      </div>
    </div>
  );
}
