//backend/src/domains/domains.module.ts

import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';

import { AiModule } from '../ai/ai.module';

import { DomainEventService } from './services/domain-event.service';

import { DomainAnalyticsService } from './services/domain-analytics.service';

import { DomainStatsService } from './services/domain-stats.service';

import { DomainClassificationService } from './services/domain-classification.service';

@Module({
  imports: [PrismaModule, AiModule],

  providers: [
    DomainEventService,

    DomainAnalyticsService,

    DomainStatsService,

    DomainClassificationService,
  ],

  exports: [
    DomainEventService,

    DomainAnalyticsService,

    DomainStatsService,

    DomainClassificationService,
  ],
})
export class DomainsModule {}
