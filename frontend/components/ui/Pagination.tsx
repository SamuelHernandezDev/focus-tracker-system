//frontend\components\ui\Pagination.tsx
'use client';

type Props = {
  page: number;
  totalPages: number;
  onPageChange: (p: number) => void;
  totalItems?: number;
  pageSize?: number;
  label?: string;
};

export function Pagination({
  page,
  totalPages,
  onPageChange,
  totalItems,
  pageSize,
  label,
}: Props) {
  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages: (number | '...')[] = [];
    const delta = 2;

    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);

    let start = Math.max(2, page - delta);
    let end = Math.min(totalPages - 1, page + delta);

    if (page <= 3) {
      start = 2;
      end = 5;
    }

    if (page >= totalPages - 2) {
      start = totalPages - 4;
      end = totalPages - 1;
    }

    if (start > 2) pages.push('...');

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages - 1) pages.push('...');

    pages.push(totalPages);

    return pages;
  };

  const pages = getPages();

  const start = totalItems && pageSize ? (page - 1) * pageSize + 1 : 0;

  const end =
    totalItems && pageSize ? Math.min(page * pageSize, totalItems) : 0;

  return (
    <div className="pt-4 mt-4 flex items-center justify-between gap-4 flex-wrap">
      {/* CONTADOR */}
      {totalItems && pageSize && (
        <div className="text-sm text-gray-500 font-medium whitespace-nowrap">
          Showing {start}–{end} of {totalItems} {label ?? ''}
        </div>
      )}

      {/* PAGINATION */}
      <div className="flex items-center gap-1.5 flex-wrap">
        {/* PREV */}
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="
            h-8 px-3 rounded-lg text-sm
            border border-gray-200
            bg-white
            hover:bg-gray-50
            disabled:opacity-40 disabled:cursor-not-allowed
            transition
          "
        >
          ←
        </button>

        {/* PAGES */}
        {pages.map((p, i) =>
          p === '...' ? (
            <span key={`ellipsis-${i}`} className="px-2 text-gray-400 text-sm">
              ...
            </span>
          ) : (
            <button
              key={`${p}-${i}`}
              onClick={() => p !== page && onPageChange(p)}
              className={`
                h-8 w-8 flex items-center justify-center rounded-lg text-sm
                border
                transition
                ${
                  p === page
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                }
              `}
            >
              {p}
            </button>
          )
        )}

        {/* NEXT */}
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className="
            h-8 px-3 rounded-lg text-sm
            border border-gray-200
            bg-white
            hover:bg-gray-50
            disabled:opacity-40 disabled:cursor-not-allowed
            transition
          "
        >
          →
        </button>
      </div>
    </div>
  );
}
