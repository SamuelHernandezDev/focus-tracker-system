//extension\background.js

let currentSessionId = null;
let currentToken = null;

// ======================
// RECIBIR SESSION + TOKEN
// ======================

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === 'FOCUS_SESSION') {
    currentSessionId = message.sessionId;
    currentToken = message.token;

    console.log('Session ID set:', currentSessionId);
    console.log('Extension token set');
  }
});

// ======================
// TAB ACTIVATED
// ======================

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tab = await chrome.tabs.get(activeInfo.tabId);

  if (!tab.url || !currentSessionId || !currentToken) {
    return;
  }

  const domain = new URL(tab.url).hostname;

  sendEvent(domain);
});

// ======================
// URL UPDATED
// ======================

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status !== 'complete') return;

  if (!tab.url || !currentSessionId || !currentToken) {
    return;
  }

  const domain = new URL(tab.url).hostname;

  sendEvent(domain);
});

// ======================
// SEND EVENT
// ======================

async function sendEvent(domain) {
  try {
    const res = await fetch('http://localhost:3001/sessions/event', {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',

        Authorization: `Bearer ${currentToken}`,
      },

      body: JSON.stringify({
        sessionId: currentSessionId,
        type: 'TAB_CHANGE',
        value: domain,
        timestamp: Date.now(),
      }),
    });

    console.log('TAB_CHANGE:', domain, 'STATUS:', res.status);
  } catch (err) {
    console.error('Extension error:', err);
  }
}
