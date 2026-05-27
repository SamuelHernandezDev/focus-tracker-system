//backend/src/ai/ai.service.ts

import OpenAI from 'openai';

import { Injectable } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';

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
  // GENERATE JSON
  // ======================

  async generateJSON(data: {
    system: string;

    prompt: string;
  }) {
    const response = await this.openai.chat.completions.create({
      model: this.configService.get<string>('OPENAI_MODEL') || 'gpt-5-mini',

      messages: [
        {
          role: 'system',

          content: data.system,
        },

        {
          role: 'user',

          content: data.prompt,
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

    return content;
  }

  // ======================
  // CHAT
  // ======================

  async chat(prompt: string) {
    const response = await this.openai.chat.completions.create({
      model: this.configService.get<string>('OPENAI_MODEL') || 'gpt-5-mini',

      messages: [
        {
          role: 'system',

          content: 'You are an advanced productivity AI assistant.',
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

    return content;
  }
}
