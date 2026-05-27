//backend/src/ai/services/ai-behavior-analysis.service.ts

import { Injectable } from '@nestjs/common';

import { AiService } from './ai.service';

import { SessionBehavior } from '../../analytics/types/session-behavior.type';

import { safeJsonParse } from '../utils/safe-json-parse';

@Injectable()
export class AiBehaviorAnalysisService {
  constructor(private readonly aiService: AiService) {}

  // ======================
  // ANALYZE BEHAVIOR
  // ======================

  async analyzeBehavior(behavior: SessionBehavior) {
    // ======================
    // PROMPT
    // ======================

    const prompt = `
You are an advanced behavioral productivity analyst.

Your job is to analyze:
- focus quality
- attention stability
- engagement patterns
- distraction behavior
- productivity consistency
- behavioral risks
- work intensity
- passive vs active work patterns

IMPORTANT:
Do NOT focus primarily on website names.

Focus on:
- behavioral patterns
- attention consistency
- interaction density
- focus quality
- work engagement
- productivity rhythm

You must generate:
- a concise AI summary
- behavioral feedback
- strengths
- weaknesses
- coaching recommendations

Return ONLY valid JSON.

JSON format:

{
  "summary": "short behavioral summary",

  "feedback": "detailed behavioral feedback",

  "strengths": [
    "strength 1"
  ],

  "weaknesses": [
    "weakness 1"
  ],

  "recommendations": [
    "recommendation 1"
  ]
}

SESSION BEHAVIOR:
${JSON.stringify(behavior, null, 2)}
`;

    try {
      // ======================
      // AI CALL
      // ======================

      const content = await this.aiService.generateJSON({
        system: 'You are an expert behavioral productivity analyst.',

        prompt,
      });

      // ======================
      // PARSE
      // ======================

      const parsed = safeJsonParse(content);

      // ======================
      // VALIDATION
      // ======================

      return {
        summary: parsed.summary || 'No summary generated.',

        feedback: parsed.feedback || 'No feedback generated.',

        strengths: Array.isArray(parsed.strengths) ? parsed.strengths : [],

        weaknesses: Array.isArray(parsed.weaknesses) ? parsed.weaknesses : [],

        recommendations: Array.isArray(parsed.recommendations)
          ? parsed.recommendations
          : [],
      };
    } catch (err) {
      console.error('AI BEHAVIOR ANALYSIS ERROR:', err);

      // ======================
      // FALLBACK
      // ======================

      return {
        summary: 'Unable to generate behavioral summary.',

        feedback: 'Behavioral analysis could not be completed.',

        strengths: [],

        weaknesses: [],

        recommendations: [],
      };
    }
  }
}
