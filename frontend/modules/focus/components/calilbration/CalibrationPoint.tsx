//frontend\modules\focus\components\calilbration\CalibrationPoint.tsx
'use client';

type Props = {
  x: number;

  y: number;

  active?: boolean;

  label?: string;

  onClick?: () => void;
};

export default function CalibrationPoint({
  x,

  y,

  active = false,

  label,

  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className="
        absolute
        -translate-x-1/2
        -translate-y-1/2
        flex flex-col
        items-center
        gap-2
      "
      style={{
        left: `${x}%`,
        top: `${y}%`,
      }}
    >
      {/* POINT */}
      <div
        className={`
          rounded-full
          transition-all duration-300

          ${
            active
              ? `
                w-8 h-8
                bg-blue-500
                shadow-[0_0_30px_rgba(59,130,246,0.8)]
                animate-pulse
              `
              : `
                w-5 h-5
                bg-gray-400
              `
          }
        `}
      />

      {/* LABEL */}
      {label && <span className="text-xs text-white font-medium">{label}</span>}
    </button>
  );
}
