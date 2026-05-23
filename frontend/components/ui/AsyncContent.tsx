//frontend\components\ui\AsyncContent.tsx
'use client';

import { ReactNode } from 'react';
import { ErrorState } from '@/components/ui/ErrorState';
import { EmptyState } from '@/components/ui/EmptyState';
import { Loading } from '@/components/ui/Loading';

type AsyncContentProps<T> = {
  data: T | null | undefined;
  error?: unknown;
  isEmpty?: boolean;
  isLoading?: boolean;

  onRetry?: () => void;

  emptyTitle?: string;
  emptyDescription?: string;
  emptyAction?: ReactNode;
  emptyVariant?: 'default' | 'no-results' | 'no-user';

  children: (data: T) => ReactNode;
};

export function AsyncContent<T>({
  data,
  error,
  isEmpty,
  isLoading,
  onRetry,
  emptyTitle = 'No data found',
  emptyDescription = 'Try adjusting your filters',
  emptyAction,
  emptyVariant = 'default',
  children,
}: AsyncContentProps<T>) {
  // 🔥 FIX CLAVE
  if (isLoading || data === undefined) {
    return <Loading />;
  }

  if (error) {
    return (
      <ErrorState
        message={error instanceof Error ? error.message : undefined}
        onRetry={onRetry}
      />
    );
  }

  if (isEmpty) {
    return (
      <EmptyState
        title={emptyTitle}
        description={emptyDescription}
        action={emptyAction}
        variant={emptyVariant}
      />
    );
  }

  return <>{children(data as T)}</>;
}
