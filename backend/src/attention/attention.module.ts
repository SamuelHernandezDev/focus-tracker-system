//backend/src/attention/attention.module.ts

import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';

import { AttentionController } from './controllers/attention.controller';

import { AttentionGateway } from './gateway/attention.gateway';

import { AttentionService } from './services/attention.service';

import { AttentionAnalyticsService } from './services/attention-analytics.service';

@Module({
  imports: [PrismaModule],

  controllers: [AttentionController],

  providers: [AttentionGateway, AttentionService, AttentionAnalyticsService],

  exports: [AttentionService, AttentionAnalyticsService],
})
export class AttentionModule {}
