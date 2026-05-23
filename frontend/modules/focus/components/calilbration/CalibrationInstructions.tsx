//frontend\modules\focus\components\calilbration\CalibrationInstructions.tsx
type Props = {
  label: string;

  onNext: () => void;
};

export default function CalibrationInstructions({ label, onNext }: Props) {
  return (
    <div
      className="
        absolute bottom-10 left-1/2
        -translate-x-1/2

        bg-white/90 backdrop-blur-sm
        rounded-xl shadow-lg

        px-6 py-5
        w-[320px]

        space-y-4
      "
    >
      {/* TITLE */}
      <div>
        <h2 className="text-sm font-semibold text-gray-800">Calibration</h2>

        <p className="text-xs text-gray-500 mt-1">
          Look directly at the point on the screen.
        </p>
      </div>

      {/* CURRENT */}
      <div className="text-center">
        <p className="text-xs text-gray-400">Current Point</p>

        <p className="text-lg font-semibold text-blue-600">{label}</p>
      </div>

      {/* ACTION */}
      <button
        onClick={onNext}
        className="
          w-full py-2.5 rounded-lg

          bg-blue-600 text-white
          hover:bg-blue-700

          transition text-sm font-medium
        "
      >
        Continue
      </button>
    </div>
  );
}
