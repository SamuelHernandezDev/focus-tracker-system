//frontend\components\ui\ErrorState.tsx
type ErrorStateProps = {
  message?: string;
  onRetry?: () => void;
};

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="p-8 flex flex-col items-center justify-center text-center">

      <p className="text-red-500 font-semibold">
        {message ?? "Something went wrong"}
      </p>

      <p className="text-sm text-gray-400 mt-1">
        Please try again
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 px-4 py-2 text-sm border rounded-md hover:bg-gray-50 transition"
        >
          Retry
        </button>
      )}
    </div>
  );
}