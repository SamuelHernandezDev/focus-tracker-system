//frontend\modules\focus-overlay\hooks\useSessionTimer.ts
'use client';

import { useEffect, useState } from 'react';

export function useSessionTimer(startedAt: number | null) {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    if (!startedAt) {
      setElapsedSeconds(0);
      return;
    }

    const update = () => {
      const seconds = Math.floor((Date.now() - startedAt) / 1000);

      setElapsedSeconds(seconds);
    };

    update();

    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, [startedAt]);

  const minutes = Math.floor(elapsedSeconds / 60);

  const seconds = elapsedSeconds % 60;

  return `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`;
}
