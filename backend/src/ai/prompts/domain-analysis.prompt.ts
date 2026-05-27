//backend\src\ai\prompts\domain-analysis.prompt.ts
import { DomainInput } from '../types/ai-domain-analysis.type';

export const buildDomainAnalysisPrompt = (data: {
  task: string;

  domains: DomainInput[];
}) => {
  return `
You are an AI productivity analyst.

Your job is to analyze browsing behavior during a focus session.

TASK:
"${data.task}"

Analyze each domain considering:
- relevance to the task
- likely user intent
- productivity context
- learning/research behavior
- distraction probability

IMPORTANT:
- YouTube can be productive if used for tutorials or learning.
- Reddit can be productive for research.
- Search engines are usually support tools.
- Classification depends on the task context.

Return ONLY valid JSON.

Allowed categories:
- PRODUCTIVE
- SUPPORT
- LEARNING
- NEUTRAL
- SOCIAL
- DISTRACTION

JSON format:

{
  "feedback": "short actionable feedback",

  "domains": [
    {
      "domain": "string",

      "category": "PRODUCTIVE | SUPPORT | LEARNING | NEUTRAL | SOCIAL | DISTRACTION",

      "relevant": true,

      "isDistraction": false,

      "confidence": 0.95,

      "reason": "short explanation"
    }
  ]
}

DOMAINS:
${JSON.stringify(data.domains, null, 2)}
`;
};
