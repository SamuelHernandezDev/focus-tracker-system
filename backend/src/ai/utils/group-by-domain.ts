//backend\src\ai\utils\group-by-domain.ts
export function groupByDomain(sessions: any[]) {
  const map = new Map();

  for (const s of sessions) {
    if (!map.has(s.domain)) {
      map.set(s.domain, {
        domain: s.domain,
        totalDuration: 0,
        titles: [],
      });
    }

    const entry = map.get(s.domain);
    entry.totalDuration += s.duration;

    if (s.title) entry.titles.push(s.title);
  }

  return Array.from(map.values());
}
