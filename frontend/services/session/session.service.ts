//frontend\services\session.service.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL!;

// START
export async function startSessionRequest(data: {
  task: string;
  allowedSites?: string[];
}) {
  const res = await fetch(`${API_URL}/sessions/start`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to start session");

  return res.json();
}

// EVENT
export async function sendEventRequest(data: {
  sessionId: string;
  type: "ACTIVE" | "IDLE" | "TAB_CHANGE";
  value?: string;
}) {
  await fetch(`${API_URL}/sessions/event`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

// STOP
export async function stopSessionRequest(sessionId: string) {
  const res = await fetch(`${API_URL}/sessions/stop`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sessionId }),
  });

  if (!res.ok) throw new Error("Failed to stop session");

  return res.json();
}