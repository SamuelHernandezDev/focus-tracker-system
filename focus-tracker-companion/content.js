//extension\content.js
// ======================
// SESSION SYNC
// ======================

window.addEventListener('message', (event) => {
  if (event.data.type === 'FOCUS_SESSION') {
    chrome.runtime.sendMessage(event.data);

    console.log('Focus session synced');
  }
});

// ======================
// ACTIVITY BUCKET
// ======================

let keyboard = 0;

let mouse = 0;

let clicks = 0;

// ======================
// KEYBOARD
// ======================

window.addEventListener(
  'keydown',
  () => {
    keyboard += 1;
  },
  true
);

// ======================
// MOUSE MOVE
// ======================

window.addEventListener(
  'mousemove',
  () => {
    mouse += 1;
  },
  true
);

// ======================
// CLICKS
// ======================

window.addEventListener(
  'click',
  () => {
    clicks += 1;
  },
  true
);

// ======================
// FLUSH TRACKING
// ======================

setInterval(() => {
  // ======================
  // NO ACTIVITY
  // ======================

  if (keyboard === 0 && mouse === 0 && clicks === 0) {
    return;
  }

  chrome.runtime.sendMessage({
    type: 'TRACKING_DELTA',

    delta: {
      keyboard,

      mouse,

      clicks,
    },
  });

  console.log('Tracking activity emitted', {
    keyboard,
    mouse,
    clicks,
  });

  keyboard = 0;

  mouse = 0;

  clicks = 0;
}, 5000);
