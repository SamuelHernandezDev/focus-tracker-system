//frontend/modules/focus/components/AttentionStatus.tsx

import { AttentionState } from '../types/attention-state';

type Props = {
  connected: boolean;

  currentState: AttentionState;

  eventsSent: number;
};

export default function AttentionStatus({
  connected,

  currentState,

  eventsSent,
}: Props) {
  // =========================
  // STATUS COLOR
  // =========================
  const getStatusColor = () => {
    switch (currentState) {
      case AttentionState.ATTENTIVE:
        return 'bg-green-100 text-green-700';

      case AttentionState.DISTRACTED:
        return 'bg-yellow-100 text-yellow-700';

      case AttentionState.PHONE:
        return 'bg-orange-100 text-orange-700';

      case AttentionState.ABSENT:
        return 'bg-red-100 text-red-700';

      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  // =========================
  // STATUS LABEL
  // =========================
  const getStatusLabel = () => {
    switch (currentState) {
      case AttentionState.ATTENTIVE:
        return 'ATTENTIVE';

      case AttentionState.DISTRACTED:
        return 'DISTRACTED';

      case AttentionState.PHONE:
        return 'PHONE';

      case AttentionState.ABSENT:
        return 'ABSENT';

      default:
        return 'UNKNOWN';
    }
  };

  return (
    <div className="flex items-center justify-between">
      {/* STATE */}
      <div>
        <p className="text-xs text-gray-500">Current State</p>

        <div
          className={`
            mt-1 px-3 py-1 rounded-lg
            text-sm font-medium inline-flex

            ${getStatusColor()}
          `}
        >
          {getStatusLabel()}
        </div>
      </div>

      {/* SOCKET */}
      <div className="text-right">
        <div
          className={`
            px-3 py-1 rounded-full
            text-xs font-medium mb-2

            ${
              connected
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }
          `}
        >
          {connected ? 'CONNECTED' : 'DISCONNECTED'}
        </div>

        <p className="text-xs text-gray-500">Events Sent</p>

        <p className="text-lg font-semibold text-gray-800">{eventsSent}</p>
      </div>
    </div>
  );
}
