//backend/src/sessions/utils/analyze-domains.ts

export type DomainCategory =
  | 'PRODUCTIVE'
  | 'SUPPORT'
  | 'NEUTRAL'
  | 'DISTRACTION';

export type DomainStats = {
  domain: string;
  time: number;
};

export type AnalyzedDomain = {
  domain: string;
  time: number;

  category: DomainCategory;

  relevant: boolean;

  isDistraction: boolean;
};

// ======================
// DOMAIN RULES
// ======================

const DOMAIN_RULES = [
  {
    match: 'github.com',
    category: 'PRODUCTIVE',
  },

  {
    match: 'chatgpt.com',
    category: 'SUPPORT',
  },

  {
    match: 'stackoverflow.com',
    category: 'SUPPORT',
  },

  {
    match: 'youtube.com',
    category: 'NEUTRAL',
  },

  {
    match: 'spotify.com',
    category: 'NEUTRAL',
  },

  {
    match: 'twitter.com',
    category: 'DISTRACTION',
  },
];

// ======================
// TASK CONTEXT
// ======================

const TASK_CONTEXT: Record<string, string[]> = {
  programming: ['github.com', 'chatgpt.com', 'stackoverflow.com'],
};

// ======================
// CATEGORY
// ======================

function getDomainCategory(domain: string): DomainCategory {
  const rule = DOMAIN_RULES.find((r) => domain.includes(r.match));

  return (rule?.category as DomainCategory) ?? 'DISTRACTION';
}

// ======================
// RELEVANCE
// ======================

function isDomainRelevant(task: string, domain: string) {
  const rules = TASK_CONTEXT[task?.toLowerCase()];

  if (!rules) return false;

  return rules.some((r) => domain.includes(r));
}

// ======================
// ANALYZE
// ======================

export function analyzeDomains(
  task: string,
  domains: DomainStats[],
): AnalyzedDomain[] {
  let distractions = 0;

  return domains.map((d) => {
    const category = getDomainCategory(d.domain);

    const relevant = isDomainRelevant(task, d.domain);

    let isDistraction = false;

    // ======================
    // SMART RULES
    // ======================

    if (category === 'DISTRACTION') {
      isDistraction = true;
    }

    if (category === 'NEUTRAL' && d.time > 120) {
      isDistraction = true;
    }

    if (!relevant && d.time > 60) {
      isDistraction = true;
    }

    if (isDistraction) {
      distractions++;
    }

    return {
      ...d,

      category,

      relevant,

      isDistraction,
    };
  });
}
