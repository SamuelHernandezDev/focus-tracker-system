//frontend\app\(app)\dashboard\sessions\page.tsx
'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';

import { AsyncContent } from '@/components/ui/AsyncContent';

import { PageHeader } from '@/components/ui/PageHeader';

import { DateRangePicker } from '@/components/ui/date/DateRangePicker';

import { SortSelect } from '@/components/ui/filters/SortSelect';

import { SessionsTable } from '@/modules/sessions/components/SessionTable';

import { useSessions } from '@/modules/sessions/hooks/useSessions';

export default function SessionsPage() {
  /* =======================
     DATA
  ======================= */

  const { sessions, loading } = useSessions();

  /* =======================
     LOCAL STATE
  ======================= */

  const [expandedId, setExpandedId] = useState<string | null>(null);

  const [page, setPage] = useState(1);

  const PAGE_SIZE = 10;

  /* =======================
     RESET CONTROLADO
  ======================= */

  useEffect(() => {
    setExpandedId(null);
  }, [page]);

  /* =======================
     PAGINATION
  ======================= */

  const paginatedData = useMemo(() => {
    if (!sessions) return [];

    const start = (page - 1) * PAGE_SIZE;

    return sessions.slice(start, start + PAGE_SIZE);
  }, [sessions, page]);

  const totalPages = useMemo(() => {
    if (!sessions) return 0;

    return Math.ceil(sessions.length / PAGE_SIZE);
  }, [sessions]);

  const totalItems = sessions?.length ?? 0;

  /* =======================
     CALLBACKS
  ======================= */

  const handleToggleRow = useCallback((id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  }, []);

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  /* =======================
     EMPTY STATE
  ======================= */

  const isEmpty = !loading && (!sessions || sessions.length === 0);

  return (
    <div className="flex-1 flex flex-col bg-gray-50 overflow-hidden">
      {/* PAGE HEADER */}
      <div className="p-8 pb-4 shrink-0">
        <PageHeader
          title="Focus Sessions"
          description="Browse and analyze AI-powered productivity sessions"
        >
          {/* FUTURE FILTERS */}

          <DateRangePicker from={null} to={null} onChange={() => {}} />

          <SortSelect
            value={{
              sortBy: 'date',

              sortOrder: 'desc',
            }}
            onChange={() => {}}
          />
        </PageHeader>
      </div>

      {/* CONTENT */}
      <div className="flex-1 overflow-hidden px-8 pb-8 flex flex-col min-h-0">
        <AsyncContent
          data={sessions}
          isLoading={loading}
          isEmpty={isEmpty}
          emptyVariant="no-results"
          emptyTitle="No sessions found"
          emptyDescription="Start a focus session to generate analytics"
        >
          {() => (
            <div className="space-y-6 h-full min-h-0 flex flex-col">
              {/* TABLE */}
              <div className="flex-1 min-h-0">
                <SessionsTable
                  data={paginatedData}
                  expandedId={expandedId}
                  onToggle={handleToggleRow}
                  page={page}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  totalItems={totalItems}
                  pageSize={PAGE_SIZE}
                />
              </div>
            </div>
          )}
        </AsyncContent>
      </div>
    </div>
  );
}
