//frontend\modules\focus\components\calilbration\CalibrationProgress.tsx
type Props = {
  progress: number;

  currentStep: number;

  totalSteps: number;
};

export default function CalibrationProgress({
  progress,
  currentStep,
  totalSteps,
}: Props) {
  return (
    <div className="space-y-2">
      {/* INFO */}
      <div className="flex items-center justify-between text-xs text-gray-400">
        <span>
          Step {currentStep} of {totalSteps}
        </span>

        <span>{Math.round(progress)}%</span>
      </div>

      {/* BAR */}
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="
            h-full bg-blue-500
            transition-all duration-300
          "
          style={{
            width: `${progress}%`,
          }}
        />
      </div>
    </div>
  );
}
