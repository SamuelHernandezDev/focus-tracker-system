//frontend\app\(app)\dashboard\sessions\page.tsx
'use client';
import { Rows3 } from 'lucide-react';

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

  const [fromDate, setFromDate] = useState<string | null>(null);

  const [toDate, setToDate] = useState<string | null>(null);

  const [sort, setSort] = useState<{
    sortBy: 'date' | 'score';

    sortOrder: 'asc' | 'desc';
  }>({
    sortBy: 'date',

    sortOrder: 'desc',
  });

  const PAGE_SIZE = 10;

  /* =======================
     RESET CONTROLADO
  ======================= */

  useEffect(() => {
    setExpandedId(null);
  }, [page, fromDate, toDate, sort]);

  /* =======================
   FILTER + SORT
======================= */

  const filteredSessions = useMemo(() => {
    if (!sessions) return [];

    let result = [...sessions];

    // ======================
    // DATE FILTER
    // ======================

    if (fromDate || toDate) {
      result = result.filter((session) => {
        const sessionDate = new Date(session.date);

        const sessionDay = new Date(
          sessionDate.getFullYear(),
          sessionDate.getMonth(),
          sessionDate.getDate()
        );

        const parseDate = (date: string) => {
          const [y, m, d] = date.split('-').map(Number);

          return new Date(y, m - 1, d);
        };

        const from = fromDate ? parseDate(fromDate) : null;

        const to = toDate ? parseDate(toDate) : null;

        if (from && sessionDay < from) {
          return false;
        }

        if (to && sessionDay > to) {
          return false;
        }

        return true;
      });
    }

    // ======================
    // SORT
    // ======================

    result.sort((a, b) => {
      let comparison = 0;

      if (sort.sortBy === 'date') {
        comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
      }

      if (sort.sortBy === 'score') {
        comparison = a.score - b.score;
      }

      return sort.sortOrder === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [sessions, fromDate, toDate, sort]);

  /* =======================
   PAGINATION
======================= */

  const paginatedData = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;

    return filteredSessions.slice(start, start + PAGE_SIZE);
  }, [filteredSessions, page]);

  const totalPages = useMemo(() => {
    if (!filteredSessions) return 0;

    return Math.ceil(filteredSessions.length / PAGE_SIZE);
  }, [filteredSessions]);

  const totalItems = filteredSessions?.length ?? 0;

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

  const isEmpty = !loading && filteredSessions.length === 0;

  return (
    <div
      className="
    h-[calc(90vh-64px)]

    flex flex-col

    bg-gray-50

    overflow-hidden
  "
    >
      {/* PAGE HEADER */}
      <div className="p-8 pb-4 shrink-0">
        <PageHeader
          icon={Rows3}
          title="Session History"
          description="Browse and analyze previous productivity tracking sessions"
        >
          {/* FUTURE FILTERS */}

          <DateRangePicker
            from={fromDate}
            to={toDate}
            onChange={(from, to) => {
              setFromDate(from);

              setToDate(to);

              setPage(1);
            }}
          />

          <SortSelect
            value={sort}
            onChange={(val) => {
              setSort(val);

              setPage(1);
            }}
          />
        </PageHeader>
      </div>

      {/* CONTENT */}
      <div className="flex-1 flex flex-col bg-gray-50 overflow-hidden">
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
