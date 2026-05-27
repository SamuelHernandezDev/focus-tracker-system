//backend/src/sessions/sessions.module.ts

import { Module, forwardRef } from '@nestjs/common';

import { SessionsController } from './controllers/sessions.controller';

import { SessionsService } from './services/sessions.service';

import { SessionLifecycleService } from './services/session-lifecycle.service';

import { AuthModule } from '../auth/auth.module';

import { PrismaModule } from '../prisma/prisma.module';

import { AnalyticsModule } from '../analytics/analytics.module';

@Module({
  imports: [AuthModule, PrismaModule, forwardRef(() => AnalyticsModule)],

  controllers: [SessionsController],

  providers: [SessionsService, SessionLifecycleService],

  exports: [SessionsService, SessionLifecycleService],
})
export class SessionsModule {}
