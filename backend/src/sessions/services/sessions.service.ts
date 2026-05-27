//backend/src/sessions/services/sessions.service.ts

import {
  Injectable,
  NotFoundException,
  forwardRef,
  Inject,
} from '@nestjs/common';

import { EventType } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';

import { StartSessionDto } from '../dto/start-session.dto';

import { CreateEventDto } from '../dto/create-event.dto';

import { SessionLifecycleService } from './session-lifecycle.service';

import { AnalyticsPipelineService } from '../../analytics/services/analytics-pipeline.service';

@Injectable()
export class SessionsService {
  constructor(
    private readonly prisma: PrismaService,

    private readonly sessionLifecycleService: SessionLifecycleService,

    @Inject(forwardRef(() => AnalyticsPipelineService))
    private readonly analyticsPipelineService: AnalyticsPipelineService,
  ) {}

  // ======================
  // SESSION LIFECYCLE
  // ======================

  async startSession(userId: string, dto: StartSessionDto) {
    return this.sessionLifecycleService.startSession(userId, dto);
  }

  async stopSession(sessionId: string) {
    // ======================
    // CLOSE SESSION
    // ======================

    await this.sessionLifecycleService.stopSession(sessionId);

    // ======================
    // PROCESS ANALYTICS
    // ======================

    return this.analyticsPipelineService.processSession(sessionId);
  }

  // ======================
  // USER SESSIONS
  // ======================

  async getSessionsByUser(userId: string) {
    return this.prisma.session.findMany({
      where: {
        userId,
      },

      orderBy: {
        startTime: 'desc',
      },
    });
  }

  // ======================
  // EVENTS
  // ======================

  async createEvent(dto: CreateEventDto) {
    // ======================
    // VALIDATE SESSION
    // ======================

    await this.sessionLifecycleService.validateActiveSession(dto.sessionId);

    // ======================
    // STORE EVENT
    // ======================

    return this.prisma.event.create({
      data: {
        sessionId: dto.sessionId,

        type: dto.type,

        value: dto.value,

        timestamp: dto.timestamp,
      },
    });
  }
  // ======================
  // EVENTS
  // ======================

  async getEventsBySession(sessionId: string) {
    return this.prisma.event.findMany({
      where: {
        sessionId,
      },

      orderBy: {
        timestamp: 'asc',
      },
    });
  }

  // ======================
  // SESSION DETAILS
  // ======================

  async getSessionById(sessionId: string) {
    const session = await this.prisma.session.findUnique({
      where: {
        id: sessionId,
      },

      include: {
        domains: {
          orderBy: {
            time: 'desc',
          },
        },

        events: {
          orderBy: {
            timestamp: 'asc',
          },
        },
      },
    });

    if (!session) {
      throw new NotFoundException('Session not found');
    }

    return session;
  }
}
