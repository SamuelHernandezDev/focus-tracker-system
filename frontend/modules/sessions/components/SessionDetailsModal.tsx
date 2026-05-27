//frontend/modules/sessions/components/SessionDetailsModal.tsx

'use client';

import { AnimatePresence, motion } from 'framer-motion';

import { useSessionDetails } from '../hooks/useSessionDetails';

import { SessionAnalysisHeader } from './session-analysis/SessionAnalysisHeader';

import { SessionOverviewSection } from './session-analysis/SessionOverviewSection';

import { SessionBehaviorPatternsSection } from './session-analysis/SessionBehaviorPatternsSection';

import { SessionAIReviewSection } from './session-analysis/SessionAIReviewSection';

import { SessionDomainIntelligenceSection } from './session-analysis/SessionDomainIntelligenceSection';

import { SessionAttentionSection } from './session-analysis/SessionAttentionSection';

import { SessionMetricsSection } from './session-analysis/SessionMetricsSection';

type Props = {
  sessionId: string | null;

  open: boolean;

  onClose: () => void;
};

export function SessionDetailsModal({ sessionId, open, onClose }: Props) {
  // ======================
  // SESSION
  // ======================

  const { session, loading } = useSessionDetails(sessionId);

  // ======================
  // CLOSED
  // ======================

  if (!open) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        className="
          fixed inset-0 z-50

          bg-black/50
          backdrop-blur-sm

          flex items-center
          justify-center

          p-4
        "
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        exit={{
          opacity: 0,
        }}
      >
        {/* MODAL */}
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
            scale: 0.98,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: 20,
            scale: 0.98,
          }}
          transition={{
            duration: 0.2,
          }}
          className="
            relative

            w-full
            max-w-7xl

            h-[92vh]

            bg-gray-50

            rounded-[32px]

            overflow-hidden

            shadow-2xl
          "
        >
          {/* HEADER */}
          <SessionAnalysisHeader
            sessionId={session?.id || ''}
            onClose={onClose}
          />

          {/* CONTENT */}
          <div
            className="
    h-[calc(92vh-88px)]

    overflow-y-auto

    px-8
    py-8

    space-y-10

    scrollbar-thin
    scrollbar-track-transparent
    scrollbar-thumb-white/10
    hover:scrollbar-thumb-white/20
  "
          >
            {/* LOADING */}
            {loading && (
              <div
                className="
                  h-full

                  flex items-center
                  justify-center

                  text-gray-500
                "
              >
                Loading session analysis...
              </div>
            )}

            {/* EMPTY */}
            {!loading && !session && (
              <div
                className="
                    h-full

                    flex items-center
                    justify-center

                    text-gray-500
                  "
              >
                Session not found.
              </div>
            )}

            {/* CONTENT */}
            {!loading && session && (
              <>
                {/* OVERVIEW */}
                <SessionOverviewSection session={session} />

                {/* PATTERNS */}
                <SessionBehaviorPatternsSection insights={session.insights} />

                {/* AI REVIEW */}
                <SessionAIReviewSection session={session} />

                {/* DOMAIN INTELLIGENCE */}
                <SessionDomainIntelligenceSection domains={session.domains} />

                {/* ATTENTION */}
                <SessionAttentionSection session={session} />

                {/* METRICS */}
                <SessionMetricsSection session={session} />
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
