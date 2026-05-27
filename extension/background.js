//extension/background.js

let currentSessionId = null;

let currentToken = null;

// ======================
// CURRENT DOMAIN CONTEXT
// ======================

let currentDomain = null;

let currentContextStartedAt = null;

// ======================
// TRACKING BUCKET
// ======================

let trackingBucket = {
  keyboard: 0,

  mouse: 0,

  clicks: 0,
};

// ======================
// RECEIVE SESSION
// ======================

chrome.runtime.onMessage.addListener(async (message) => {
  // ======================
  // SESSION STATE
  // ======================

  if (message.type === 'FOCUS_SESSION') {
    currentSessionId = message.sessionId;

    currentToken = message.token;

    console.log('Session ID set:', currentSessionId);

    console.log('Extension token set');

    // ======================
    // INJECT CONTENT SCRIPT
    // ======================

    if (currentSessionId) {
      injectTrackingScripts();
    }

    // ======================
    // SESSION STOP
    // ======================

    if (!currentSessionId) {
      flushCurrentContext();
    }

    return;
  }

  // ======================
  // TRACKING DELTA
  // ======================

  if (message.type === 'TRACKING_DELTA') {
    accumulateTracking(message.delta);

    return;
  }
});

// ======================
// ACCUMULATE TRACKING
// ======================

function accumulateTracking(delta) {
  trackingBucket.keyboard += delta.keyboard || 0;

  trackingBucket.mouse += delta.mouse || 0;

  trackingBucket.clicks += delta.clicks || 0;
}

// ======================
// INJECT TRACKING
// ======================

async function injectTrackingScripts() {
  try {
    const tabs = await chrome.tabs.query({});

    for (const tab of tabs) {
      if (!tab.id || !tab.url) {
        continue;
      }

      // ======================
      // SKIP EXTENSIONS
      // ======================

      if (
        tab.url.startsWith('chrome://') ||
        tab.url.startsWith('chrome-extension://')
      ) {
        continue;
      }

      try {
        await chrome.scripting.executeScript({
          target: {
            tabId: tab.id,
          },

          files: ['content.js'],
        });

        console.log('Injected content.js into:', tab.url);
      } catch (err) {
        console.warn('Injection failed:', tab.url, err);
      }
    }
  } catch (err) {
    console.error('Script injection error:', err);
  }
}

// ======================
// TAB ACTIVATED
// ======================

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tab = await chrome.tabs.get(activeInfo.tabId);

  if (!tab.url || !currentSessionId || !currentToken) {
    return;
  }

  const domain = new URL(tab.url).hostname;

  handleDomainChange(domain);
});

// ======================
// URL UPDATED
// ======================

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status !== 'complete') {
    return;
  }

  if (!tab.url || !currentSessionId || !currentToken) {
    return;
  }

  const domain = new URL(tab.url).hostname;

  handleDomainChange(domain);
});

// ======================
// HANDLE DOMAIN CHANGE
// ======================

async function handleDomainChange(domain) {
  // ======================
  // FIRST DOMAIN
  // ======================

  if (!currentDomain) {
    currentDomain = domain;

    currentContextStartedAt = Date.now();

    console.log('Initial domain context:', domain);

    return;
  }

  // ======================
  // SAME DOMAIN
  // ======================

  if (currentDomain === domain) {
    return;
  }

  // ======================
  // FLUSH PREVIOUS CONTEXT
  // ======================

  await flushCurrentContext();

  // ======================
  // START NEW CONTEXT
  // ======================

  currentDomain = domain;

  currentContextStartedAt = Date.now();

  console.log('New domain context:', domain);
}

// ======================
// FLUSH CURRENT CONTEXT
// ======================

async function flushCurrentContext() {
  if (
    !currentSessionId ||
    !currentToken ||
    !currentDomain ||
    !currentContextStartedAt
  ) {
    return;
  }

  const duration = Math.floor((Date.now() - currentContextStartedAt) / 1000);

  // ======================
  // EMPTY CONTEXT
  // ======================

  if (
    trackingBucket.keyboard === 0 &&
    trackingBucket.mouse === 0 &&
    trackingBucket.clicks === 0
  ) {
    return;
  }

  try {
    const res = await fetch('http://localhost:3001/sessions/event', {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',

        Authorization: `Bearer ${currentToken}`,
      },

      body: JSON.stringify({
        sessionId: currentSessionId,

        type: 'TRACKING_ACTIVITY',

        value: JSON.stringify({
          domain: currentDomain,

          duration,

          keyboard: trackingBucket.keyboard,

          mouse: trackingBucket.mouse,

          clicks: trackingBucket.clicks,
        }),

        timestamp: Date.now(),
      }),
    });

    console.log(
      'DOMAIN_ACTIVITY:',
      {
        domain: currentDomain,

        duration,

        ...trackingBucket,
      },
      'STATUS:',
      res.status
    );

    // ======================
    // RESET BUCKET
    // ======================

    trackingBucket = {
      keyboard: 0,

      mouse: 0,

      clicks: 0,
    };
  } catch (err) {
    console.error('Context flush error:', err);
  }
}
