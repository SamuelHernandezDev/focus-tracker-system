//backend/src/ai/ai.module.ts

import { Module } from '@nestjs/common';

import { AiService } from './services/ai.service';

import { AiDomainAnalysisService } from './services/ai-domain-analysis.service';

import { AiBehaviorAnalysisService } from './services/ai-behavior-analysis.service';

@Module({
  providers: [AiService, AiDomainAnalysisService, AiBehaviorAnalysisService],

  exports: [AiService, AiDomainAnalysisService, AiBehaviorAnalysisService],
})
export class AiModule {}
