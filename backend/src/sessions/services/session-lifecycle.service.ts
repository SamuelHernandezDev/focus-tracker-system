//backend\src\sessions\services\session-lifecycle.service.ts
import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import { StartSessionDto } from '../dto/start-session.dto';

@Injectable()
export class SessionLifecycleService {
  constructor(private readonly prisma: PrismaService) {}

  // ======================
  // START SESSION
  // ======================

  async startSession(userId: string, dto: StartSessionDto) {
    const activeSession = await this.prisma.session.findFirst({
      where: {
        userId,
        endTime: null,
      },
    });

    if (activeSession) {
      throw new BadRequestException('User already has an active session');
    }

    try {
      return await this.prisma.session.create({
        data: {
          userId,
          task: dto.task,
          allowedSites: dto.allowedSites || [],
        },
      });
    } catch (err) {
      console.error('PRISMA SESSION CREATE ERROR:', err);

      throw err;
    }
  }

  // ======================
  // VALIDATE SESSION
  // ======================

  async validateActiveSession(sessionId: string) {
    const session = await this.prisma.session.findUnique({
      where: {
        id: sessionId,
      },
    });

    if (!session) {
      throw new NotFoundException('Session not found');
    }

    if (session.endTime) {
      throw new BadRequestException('Session already stopped');
    }

    return session;
  }

  // ======================
  // STOP SESSION
  // ======================

  async stopSession(sessionId: string) {
    await this.validateActiveSession(sessionId);

    return this.prisma.session.update({
      where: {
        id: sessionId,
      },

      data: {
        endTime: new Date(),
      },
    });
  }
}
