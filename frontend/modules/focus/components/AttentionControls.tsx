//frontend\modules\focus\components\AttentionControls.tsx
import { AttentionState } from '../types/attention-state';

type Props = {
  currentState: AttentionState;

  onChange: (state: AttentionState) => void;
};

export default function AttentionControls({ currentState, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {Object.values(AttentionState).map((state) => (
        <button
          key={state}
          onClick={() => onChange(state)}
          className={`
            px-3 py-2 rounded-lg
            text-xs font-medium transition

            ${
              currentState === state
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }
          `}
        >
          {state}
        </button>
      ))}
    </div>
  );
}
