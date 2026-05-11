//backend/src/ai/ai.service.ts

import OpenAI from 'openai';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export type AIDomainCategory =
  | 'PRODUCTIVE'
  | 'SUPPORT'
  | 'LEARNING'
  | 'NEUTRAL'
  | 'SOCIAL'
  | 'DISTRACTION';

export type DomainInput = {
  domain: string;
  time: number;
};

export type DomainAnalysis = {
  domain: string;

  category: AIDomainCategory;

  relevant: boolean;

  isDistraction: boolean;

  confidence: number;

  reason: string;
};

type AIResponse = {
  feedback: string;

  domains: DomainAnalysis[];
};

@Injectable()
export class AiService {
  private openai: OpenAI;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');

    if (!apiKey) {
      throw new Error('OPENAI_API_KEY is missing');
    }

    this.openai = new OpenAI({
      apiKey,
    });
  }

  // ======================
  // ANALYZE DOMAINS
  // ======================

  async analyzeDomains(data: {
    task: string;

    domains: DomainInput[];
  }) {
    // ======================
    // EMPTY
    // ======================

    if (!data.domains.length) {
      return {
        feedback: 'Not enough data to analyze session.',

        domains: [],
      };
    }

    // ======================
    // PROMPT
    // ======================

    const prompt = `
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

    // ======================
    // AI CALL
    // ======================

    try {
      const response = await this.openai.chat.completions.create({
        model: this.configService.get<string>('OPENAI_MODEL') || 'gpt-5-mini',

        messages: [
          {
            role: 'system',

            content: 'You analyze productivity sessions and browsing behavior.',
          },

          {
            role: 'user',

            content: prompt,
          },
        ],

        response_format: {
          type: 'json_object',
        },
      });

      const content = response.choices?.[0]?.message?.content;

      if (!content) {
        throw new Error('Empty AI response');
      }

      const parsed = this.safeJsonParse(content);

      // ======================
      // VALIDATION
      // ======================

      if (!parsed?.domains || !Array.isArray(parsed.domains)) {
        throw new Error('Invalid AI structure');
      }

      return {
        feedback: parsed.feedback ?? 'No feedback generated.',

        domains: parsed.domains,
      };
    } catch (err) {
      console.error('AI ANALYSIS ERROR:', err);

      // ======================
      // FALLBACK
      // ======================

      return {
        feedback: 'Basic analysis used due to AI fallback.',

        domains: data.domains.map((d) => ({
          domain: d.domain,

          category: 'NEUTRAL' as const,

          relevant: false,

          isDistraction: false,

          confidence: 0.3,

          reason: 'Fallback classification',
        })),
      };
    }
  }

  // ======================
  // SAFE JSON
  // ======================

  private safeJsonParse(text: string) {
    try {
      const cleaned = text.replace(/```json|```/g, '').trim();

      return JSON.parse(cleaned);
    } catch {
      throw new Error('JSON parse failed');
    }
  }
}
