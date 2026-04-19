//frontend\components\ui\Loading.tsx
export function Loading() {
    return (
      <div className="p-8 flex flex-col items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-gray-700" />
        <p className="text-sm text-gray-400 mt-2">
          Loading data...
        </p>
      </div>
    );
  }