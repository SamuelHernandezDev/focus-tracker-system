//frontend\components\ui\filters\GranularityFilter.tsx
'use client';

type Granularity = 'hour' | 'day' | 'week';

type Props = {
  value: Granularity;
  onChange: (v: Granularity) => void;
  disabled?: boolean;
};

const OPTIONS: { label: string; value: Granularity }[] = [
  { label: 'Hour', value: 'hour' },
  { label: 'Day', value: 'day' },
  { label: 'Week', value: 'week' },
];

export function GranularityFilter({
  value,
  onChange,
  disabled = false,
}: Props) {
  return (
    <div className="relative flex flex-col">
      <div
        className={`flex items-center rounded-xl border p-1 transition-all
          ${
            disabled
              ? 'bg-gray-50 border-gray-200 opacity-60 cursor-not-allowed'
              : 'bg-white border-gray-200 shadow-sm'
          }
        `}
      >
        {OPTIONS.map((opt) => {
          const active = value === opt.value;

          return (
            <button
              key={opt.value}
              disabled={disabled}
              onClick={() => !disabled && onChange(opt.value)}
              className={`px-3 py-1.5 text-xs rounded-lg transition-all flex-1
                ${
                  active
                    ? 'bg-gray-900 text-white shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }
                ${disabled ? 'cursor-not-allowed' : ''}
              `}
            >
              {opt.label}
            </button>
          );
        })}
      </div>

      {/* hint opcional */}
      {disabled && (
        <p className="absolute -bottom-4 left-0 text-[10px] text-gray-400 whitespace-nowrap">
          Select a branch to enable time analysis
        </p>
      )}
    </div>
  );
}
