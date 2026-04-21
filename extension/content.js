window.addEventListener("message", (event) => {
    if (event.data.type === "FOCUS_SESSION") {
      chrome.runtime.sendMessage(event.data);
    }
  });