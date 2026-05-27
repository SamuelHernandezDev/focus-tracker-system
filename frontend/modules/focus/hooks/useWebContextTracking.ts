//frontend/modules/focus/hooks/useWebContextTracking.ts

'use client';

import { useEffect } from 'react';

import { getExtensionTokenRequest } from '@/services/auth/auth.service';

type Props = {
  enabled: boolean;

  sessionId: string | null;
};

export const useWebContextTracking = ({
  enabled,

  sessionId,
}: Props) => {
  // ======================
  // EXTENSION BRIDGE
  // ======================

  useEffect(() => {
    if (!enabled) return;

    if (!sessionId) return;

    // ======================
    // START EXTENSION SESSION
    // ======================

    const startExtensionSession = async () => {
      try {
        const extension = await getExtensionTokenRequest();

        window.postMessage(
          {
            type: 'FOCUS_SESSION',

            sessionId,

            token: extension.token,
          },
          '*'
        );

        console.log('Extension session started');
      } catch (err) {
        console.error('Extension auth error:', err);
      }
    };

    startExtensionSession();

    // ======================
    // CLEANUP
    // ======================

    return () => {
      window.postMessage(
        {
          type: 'FOCUS_SESSION',

          sessionId: null,
        },
        '*'
      );

      console.log('Extension session stopped');
    };
  }, [enabled, sessionId]);
};
