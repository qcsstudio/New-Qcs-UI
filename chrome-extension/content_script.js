const ALLOWED_ORIGINS = new Set([
  "https://www.qcsstudio.com",
  "https://qcsstudio.com"
]);
const EXTENSION_SOURCE = "LINKEDIN_AUDIT_EXT";

window.addEventListener("message", (event) => {
  if (!isAllowedPageEvent(event)) return;

  if (isPingMessage(event.data)) {
    postToPage(
      {
        from: EXTENSION_SOURCE,
        type: "QCS_LINKEDIN_AUDIT_READY",
        extension: "QCS_LINKEDIN_AUDIT"
      },
      event.origin
    );
    return;
  }

  if (!event.data || event.data.type !== "START_SCRAPE") return;

  chrome.runtime.sendMessage(
    {
      type: "START_SCRAPE",
      url: event.data.url,
      role: event.data.role,
      accepted: event.data.accepted === true
    },
    (response) => {
      if (chrome.runtime.lastError) {
        postToPage(
          {
            from: EXTENSION_SOURCE,
            type: "SCRAPE_ERROR",
            error: chrome.runtime.lastError.message
          },
          event.origin
        );
        return;
      }

      if (response && response.ok === false) {
        postToPage(
          {
            from: EXTENSION_SOURCE,
            type: "SCRAPE_ERROR",
            error: response.error || "Unable to start LinkedIn audit."
          },
          event.origin
        );
      }
    }
  );
});

chrome.runtime.onMessage.addListener((msg) => {
  if (!msg) return;

  if (msg.type === "SCRAPE_RESULT") {
    postToPage({
      from: EXTENSION_SOURCE,
      type: "SCRAPE_RESULT",
      payload: msg.payload
    });
  }

  if (msg.type === "SCRAPE_ERROR") {
    postToPage({
      from: EXTENSION_SOURCE,
      type: "SCRAPE_ERROR",
      error: msg.error || "Unable to complete LinkedIn audit."
    });
  }
});

function isAllowedPageEvent(event) {
  return event.source === window && ALLOWED_ORIGINS.has(event.origin);
}

function isPingMessage(data) {
  return (
    data === "PING_EXTENSION" ||
    data?.type === "PING_EXTENSION" ||
    data?.type === "QCS_LINKEDIN_AUDIT_PING"
  );
}

function postToPage(message, targetOrigin = window.location.origin) {
  if (!ALLOWED_ORIGINS.has(targetOrigin)) return;
  window.postMessage(message, targetOrigin);
}
