//backend/src/ai/ai.module.ts

import { Module } from '@nestjs/common';

import { AiService } from './ai.service';

@Module({
  providers: [AiService],

  exports: [AiService],
})
export class AiModule {}
