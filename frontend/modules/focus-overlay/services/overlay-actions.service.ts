//frontend\modules\focus-overlay\services\overlay-actions.service.ts
import { stopSessionRequest } from '@/services/session/session.service';

import { useFocusOverlayStore } from '../store/focusOverlayStore';

export async function stopCurrentSession() {
  const { sessionId } = useFocusOverlayStore.getState();

  if (!sessionId) return;

  await stopSessionRequest(sessionId);

  useFocusOverlayStore.setState({
    sessionActive: false,
    sessionId: null,
    startedAt: null,
  });
}
