//frontend\services\session.service.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL!;

// START
export async function startSessionRequest(data: {
  task: string;
  allowedSites?: string[];
}) {
  const res = await fetch(`${API_URL}/sessions/start`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.text();
    console.error('START SESSION ERROR:', error);

    throw new Error(error);
  }

  return res.json();
}

// EVENT
export async function sendEventRequest(data: {
  sessionId: string;
  type: 'ACTIVE' | 'IDLE' | 'TAB_CHANGE';
  value?: string;
  timestamp: number;
}) {
  // PROTECCIÓN CLAVE
  if (!data.sessionId) {
    console.warn('Skipped event: no sessionId', data);
    return;
  }

  try {
    const res = await fetch(`${API_URL}/sessions/event`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    // DEBUG ÚTIL
    if (!res.ok) {
      console.warn('Event failed:', data);
    }
  } catch (err) {
    console.error('Event error:', err);
  }
}

// STOP
export async function stopSessionRequest(sessionId: string) {
  const res = await fetch(`${API_URL}/sessions/stop`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sessionId }),
  });

  if (!res.ok) throw new Error('Failed to stop session');

  return res.json();
}

//GET SESSION
export async function getSessionsRequest() {
  const res = await fetch(`${API_URL}/sessions`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!res.ok) throw new Error('Failed to fetch sessions');

  return res.json();
}

// GET SESSION DETAILS
export async function getSessionByIdRequest(sessionId: string) {
  const res = await fetch(`${API_URL}/sessions/${sessionId}`, {
    method: 'GET',

    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch session details');
  }

  return res.json();
}
