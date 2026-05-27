//backend/src/analytics/analytics.module.ts

import { Module, forwardRef } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';

import { SessionsModule } from '../sessions/sessions.module';

import { DomainsModule } from '../domains/domains.module';

import { TrackingModule } from '../tracking/tracking.module';

import { AttentionModule } from '../attention/attention.module';

import { AiModule } from '../ai/ai.module';

import { AnalyticsAggregationService } from './services/analytics-aggregation.service';

import { AnalyticsPipelineService } from './services/analytics-pipeline.service';

import { AnalyticsInsightsService } from './services/analytics-insights.service';

@Module({
  imports: [
    PrismaModule,

    forwardRef(() => SessionsModule),

    DomainsModule,

    TrackingModule,

    AttentionModule,

    AiModule,
  ],

  providers: [
    AnalyticsAggregationService,

    AnalyticsPipelineService,

    AnalyticsInsightsService,
  ],

  exports: [
    AnalyticsAggregationService,

    AnalyticsPipelineService,

    AnalyticsInsightsService,
  ],
})
export class AnalyticsModule {}
