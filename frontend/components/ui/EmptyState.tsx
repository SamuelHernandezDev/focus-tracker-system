//frontend\components\ui\EmptyState.tsx
import { Inbox, Search, UserX } from 'lucide-react';

type Variant = 'default' | 'no-results' | 'no-user';

type Props = {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  variant?: Variant;
};

export function EmptyState({
  title,
  description,
  action,
  variant = 'default',
}: Props) {
  const getIcon = () => {
    switch (variant) {
      case 'no-results':
        return <Search className="w-10 h-10 text-gray-300" />;
      case 'no-user':
        return <UserX className="w-10 h-10 text-gray-300" />;
      default:
        return <Inbox className="w-10 h-10 text-gray-300" />;
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
      {/* ICON */}
      <div className="mb-4">{getIcon()}</div>

      {/* TITLE */}
      <p className="text-gray-800 font-semibold">{title ?? 'No data found'}</p>

      {/* DESCRIPTION */}
      <p className="text-sm text-gray-400 mt-1">
        {description ?? 'Try adjusting your filters'}
      </p>

      {/* ACTION */}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
