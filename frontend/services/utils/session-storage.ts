//frontend\services\utils\session-storage.ts
const KEY = "focus_session_id";

export function saveSessionId(id: string) {
  localStorage.setItem(KEY, id);

  if (typeof window !== "undefined" && (window as any).chrome?.storage) {
    (window as any).chrome.storage.local.set({
      [KEY]: id,
    });
  }
}

export function clearSessionId() {
  localStorage.removeItem(KEY);

  if ((window as any).chrome?.storage) {
    (window as any).chrome.storage.local.remove(KEY);
  }
}