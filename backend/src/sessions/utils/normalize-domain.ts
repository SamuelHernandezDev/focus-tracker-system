//backend/src/sessions/utils/normalize-domain.ts

export function normalizeDomain(input?: string) {
  if (!input) return null;

  try {
    // ======================
    // REMOVE PROTOCOL
    // ======================

    let domain = input
      .replace(/^https?:\/\//, '')
      .replace(/^www\./, '')
      .toLowerCase();

    // ======================
    // REMOVE PATH
    // ======================

    domain = domain.split('/')[0];

    // ======================
    // REMOVE PORT
    // ======================

    domain = domain.split(':')[0];

    // ======================
    // KNOWN NORMALIZATIONS
    // ======================

    const mappings: Record<string, string> = {
      'm.youtube.com': 'youtube.com',
      'studio.youtube.com': 'youtube.com',

      'docs.google.com': 'google.com',
      'mail.google.com': 'google.com',
      'meet.google.com': 'google.com',

      'search.brave.com': 'brave.com',

      'old.reddit.com': 'reddit.com',
      'np.reddit.com': 'reddit.com',
    };

    if (mappings[domain]) {
      return mappings[domain];
    }

    // ======================
    // REMOVE COMMON SUBDOMAINS
    // ======================

    const parts = domain.split('.');

    if (parts.length > 2) {
      return parts.slice(-2).join('.');
    }

    return domain;
  } catch {
    return null;
  }
}
