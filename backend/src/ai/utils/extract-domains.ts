//backend\src\ai\utils\extract-domains.ts
export function extractDomainsFromEvents(events: any[]) {
  const map = new Map();

  let currentDomain: string | null = null;
  let lastTimestamp: number | null = null;

  for (const event of events) {
    if (event.type === 'TAB_CHANGE' && event.value) {
      const domain = extractDomain(event.value);

      currentDomain = domain;

      if (!map.has(domain)) {
        map.set(domain, {
          domain,
          totalDuration: 0,
        });
      }
    }

    if (lastTimestamp && currentDomain) {
      const delta = event.timestamp - lastTimestamp;

      const entry = map.get(currentDomain);
      entry.totalDuration += delta;
    }

    lastTimestamp = event.timestamp;
  }

  return Array.from(map.values());
}

function extractDomain(url: string) {
  try {
    const parsed = new URL(url);
    return parsed.hostname.replace('www.', '');
  } catch {
    return url;
  }
}
