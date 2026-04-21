//extension\background.js
let currentSessionId = null;

// recibir sessionId desde frontend
chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "FOCUS_SESSION") {
    currentSessionId = message.sessionId;
    console.log("Session ID set:", currentSessionId);
  }
});

// detectar cambio de tab
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tab = await chrome.tabs.get(activeInfo.tabId);

  if (!tab.url || !currentSessionId) return;

  const domain = new URL(tab.url).hostname;

  sendEvent(domain);
});

// detectar cambio de URL
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status !== "complete") return;
  if (!tab.url || !currentSessionId) return;

  const domain = new URL(tab.url).hostname;

  sendEvent(domain);
});

async function sendEvent(domain) {
  try {
    await fetch("http://localhost:3001/sessions/event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sessionId: currentSessionId,
        type: "TAB_CHANGE",
        value: domain,
      }),
    });

    console.log("TAB_CHANGE:", domain);

  } catch (err) {
    console.error("Extension error:", err);
  }
}