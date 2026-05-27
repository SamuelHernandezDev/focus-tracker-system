//frontend/modules/sessions/components/SessionExpanded.tsx

'use client';

import { useState } from 'react';

import { useSessionDetails } from '../hooks/useSessionDetails';

import { SessionDetailsModal } from './SessionDetailsModal';

import { SessionExpandedSummary } from './session-expanded/SessionExpandedSummary';

import { SessionExpandedMetrics } from './session-expanded/SessionExpandedMetrics';

import { SessionExpandedDomains } from './session-expanded/SessionExpandedDomains';

import { SessionExpandedFeedback } from './session-expanded/SessionExpandedFeedback';

import { SessionExpandedActions } from './session-expanded/SessionExpandedActions';

type Session = {
  id: string;

  duration: number;

  score: number;

  interruptions: number;

  focusTime?: number;

  idleTime?: number;

  distractions?: number;

  task?: string;

  feedback?: string;
};

type Props = {
  item: Session;
};

export function SessionExpanded({ item }: Props) {
  const [open, setOpen] = useState(false);

  const { session, loading } = useSessionDetails(item.id);

  // ======================
  // LOADING
  // ======================

  if (loading || !session) {
    return (
      <div
        className="
          py-6
          text-sm
          text-gray-400
        "
      >
        Loading session preview...
      </div>
    );
  }

  return (
    <>
      {/* CONTENT */}

      <div className="space-y-2">
        {/* SUMMARY */}

        <SessionExpandedSummary summary={session.summary} task={session.task} />

        {/* METRICS */}

        <SessionExpandedMetrics
          attentionScore={session.attentionScore}
          productivityScore={item.score}
          averageInteractionRate={session.averageInteractionRate}
          distractions={session.distractions}
        />

        {/* DOMAINS */}

        <SessionExpandedDomains domains={session.domains} />

        {/* FEEDBACK */}

        <SessionExpandedFeedback feedback={session.feedback} />

        {/* ACTIONS */}

        <SessionExpandedActions
          sessionId={item.id}
          onOpenAnalysis={() => setOpen(true)}
          onReviewSession={() => {
            console.log('Open AI chat for session:', item.id);
          }}
        />
      </div>

      {/* MODAL */}

      {open && (
        <SessionDetailsModal
          sessionId={item.id}
          open={open}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
