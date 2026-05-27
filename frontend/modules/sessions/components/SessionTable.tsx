//frontend\modules\sessions\components\SessionTable.tsx
'use client';

import React, { useRef, useEffect } from 'react';

import { SessionRow } from './SessionRow';

import { Clock, BarChart3, Calendar, Activity } from 'lucide-react';

import { Pagination } from '@/components/ui/Pagination';

type Session = {
  id: string;

  date: string;

  duration: number;

  score: number;

  interruptions: number;

  focusTime?: number;

  idleTime?: number;

  distractions?: number;

  task?: string;
};

type Props = {
  data: Session[];

  expandedId: string | null;

  onToggle: (id: string) => void;

  page: number;

  totalPages: number;

  onPageChange: (p: number) => void;

  totalItems: number;

  pageSize: number;
};

export function SessionsTable({
  data,

  expandedId,

  onToggle,

  page,

  totalPages,

  onPageChange,

  totalItems,

  pageSize,
}: Props) {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  /* =======================
     SCROLL RESET
  ======================= */

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: 0,

        behavior: 'smooth',
      });
    }
  }, [page]);

  return (
    <div
      className="
    bg-gray-50

    rounded-2xl

    p-6

    flex flex-col

    h-full
    min-h-0

    overflow-hidden
  "
    >
      {/* HEADER */}
      <div className="sticky top-0 z-10 bg-gray-50 pb-3">
        <div
          className="
            rounded-xl shadow-sm
            bg-gradient-to-r from-[var(--primary)] to-indigo-500
          "
        >
          <div className="grid grid-cols-[2.5fr_2fr_1.5fr_2fr] px-6 py-3 text-sm text-white/90">
            {/* SESSION */}
            <div className="flex items-center gap-2 font-medium">
              <Activity size={14} className="text-white/70" />
              Session
            </div>

            {/* DURATION */}
            <div className="flex items-center justify-center gap-2 font-medium">
              <Clock size={14} className="text-white/70" />
              Duration
            </div>

            {/* SCORE */}
            <div className="flex items-center justify-center gap-2 font-medium">
              <BarChart3 size={14} className="text-white/70" />
              Score
            </div>

            {/* DATE */}
            <div className="flex items-center justify-center gap-2 font-medium">
              <Calendar size={14} className="text-white/70" />
              Date
            </div>
          </div>
        </div>
      </div>

      {/* SCROLL */}
      <div
        ref={scrollRef}
        className="
  flex-1
  min-h-0

  overflow-y-auto

  space-y-3

  pr-2

  scrollbar-thin
  scrollbar-track-transparent
  scrollbar-thumb-gray-200
  hover:scrollbar-thumb-gray-300
"
      >
        {data.length === 0 ? (
          <div className="text-center text-gray-400 py-10">
            No sessions found
          </div>
        ) : (
          data.map((item) => {
            const isExpanded = expandedId === item.id;

            return (
              <SessionRow
                key={item.id}
                item={item}
                isExpanded={isExpanded}
                onClick={() => onToggle(item.id)}
              />
            );
          })
        )}
      </div>

      {/* PAGINATION */}
      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={onPageChange}
        totalItems={totalItems}
        pageSize={pageSize}
        label="sessions"
      />
    </div>
  );
}
