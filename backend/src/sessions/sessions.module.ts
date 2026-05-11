//backend/src/sessions/sessions.module.ts

import { Module } from '@nestjs/common';

import { SessionsController } from './sessions.controller';
import { SessionsService } from './sessions.service';

import { AuthModule } from '../auth/auth.module';

import { PrismaModule } from '../prisma/prisma.module';

import { AiModule } from '../ai/ai.module';

@Module({
  imports: [AuthModule, PrismaModule, AiModule],

  controllers: [SessionsController],

  providers: [SessionsService],
})
export class SessionsModule {}
