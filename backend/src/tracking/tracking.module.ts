//backend/src/tracking/tracking.module.ts

import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';

import { TrackingEventService } from './services/tracking-event.service';

import { TrackingAnalyticsService } from './services/tracking-analytics.service';

@Module({
  imports: [PrismaModule],

  providers: [TrackingEventService, TrackingAnalyticsService],

  exports: [TrackingEventService, TrackingAnalyticsService],
})
export class TrackingModule {}
