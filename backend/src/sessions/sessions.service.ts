//backend\src\sessions\sessions.service.ts
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { Session, Event, EventType } from '@prisma/client';
import { normalizeDomain } from './utils/normalize-domain';
import { analyzeDomains } from './utils/analyze-domains';

import { PrismaService } from '../prisma/prisma.service';

import { StartSessionDto } from './dto/start-session.dto';
import { CreateEventDto } from './dto/create-event.dto';
import { AiService } from '../ai/ai.service';

import { randomUUID } from 'crypto';

@Injectable()
export class SessionsService {
  constructor(
    private readonly prisma: PrismaService,

    private readonly aiService: AiService,
  ) {}

  // ======================
  // SESSION LIFECYCLE
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

  async stopSession(sessionId: string) {
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

    // ======================
    // CLOSE SESSION
    // ======================

    await this.prisma.session.update({
      where: {
        id: sessionId,
      },
      data: {
        endTime: new Date(),
      },
    });

    // ======================
    // COMPUTE METRICS
    // ======================

    const metrics = await this.computeMetrics(sessionId);

    // ======================
    // SAVE DOMAINS
    // ======================

    await this.prisma.sessionDomain.deleteMany({
      where: {
        sessionId,
      },
    });

    if (metrics.topDomains.length > 0) {
      await this.prisma.sessionDomain.createMany({
        data: metrics.topDomains.map((d: any) => ({
          sessionId,

          domain: d.domain,

          time: d.time,

          category: d.category,

          relevant: d.relevant,

          isDistraction: d.isDistraction,

          aiConfidence: d.aiConfidence,

          aiReason: d.aiReason,
        })),
      });
    }

    // ======================
    // SAVE METRICS
    // ======================

    const updatedSession = await this.prisma.session.update({
      where: {
        id: sessionId,
      },
      data: {
        focusTime: metrics.focusTime,
        idleTime: metrics.idleTime,
        interruptions: metrics.interruptions,
        distractions: metrics.distractions,
        score: metrics.score,
        feedback: metrics.feedback,
      },
    });

    return {
      ...updatedSession,
      topDomains: metrics.topDomains,
    };
  }

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
    const session = await this.prisma.session.findUnique({
      where: {
        id: dto.sessionId,
      },
    });

    if (!session) {
      throw new NotFoundException('Session not found');
    }

    if (session.endTime) {
      throw new BadRequestException('Session already finished');
    }

    return this.prisma.event.create({
      data: {
        sessionId: dto.sessionId,
        type: dto.type,
        value: dto.value,
        timestamp: dto.timestamp,
      },
    });
  }

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

  // ======================
  // DOMAIN ANALYSIS
  // ======================

  private buildDomainStats(events: any[]) {
    const domainTime: Record<string, number> = {};

    for (let i = 0; i < events.length - 1; i++) {
      const current = events[i];
      const next = events[i + 1];

      if (current.type !== 'TAB_CHANGE' || !current.value) {
        continue;
      }

      // ======================
      // NORMALIZE DOMAIN
      // ======================

      const domain = normalizeDomain(current.value);

      if (!domain) continue;

      // ======================
      // TIME DIFF
      // ======================

      const diff = (Number(next.timestamp) - Number(current.timestamp)) / 1000;

      // ignore invalid durations
      if (diff <= 0 || diff > 3600) {
        continue;
      }

      // ======================
      // ACCUMULATE
      // ======================

      domainTime[domain] = (domainTime[domain] || 0) + diff;
    }

    return Object.entries(domainTime).map(([domain, time]) => ({
      domain,
      time,
    }));
  }

  // ======================
  // METRICS
  // ======================

  private async computeMetrics(sessionId: string) {
    const events = await this.prisma.event.findMany({
      where: {
        sessionId,
      },
      orderBy: {
        timestamp: 'asc',
      },
    });

    const session = await this.prisma.session.findUnique({
      where: {
        id: sessionId,
      },
    });

    if (!session || events.length === 0) {
      return {
        focusTime: 0,
        idleTime: 0,
        interruptions: 0,
        distractions: 0,
        score: 0,
        topDomains: [],
      };
    }

    let focusTime = 0;
    let idleTime = 0;
    let interruptions = 0;
    let distractions = 0;

    // ======================
    // PROCESAR EVENTOS
    // ======================
    for (let i = 0; i < events.length - 1; i++) {
      const current = events[i];
      const next = events[i + 1];

      const diff = (Number(next.timestamp) - Number(current.timestamp)) / 1000;

      if (current.type === 'ACTIVE') {
        focusTime += diff;
      }

      if (current.type === 'IDLE') {
        idleTime += diff;
        interruptions++;
      }

      if (current.type === 'TAB_CHANGE') {
        interruptions++;
      }
    }

    // ======================
    // ÚLTIMO EVENTO → ENDTIME
    // ======================
    const lastEvent = events[events.length - 1];

    if (session.endTime && lastEvent) {
      const diff =
        (session.endTime.getTime() - Number(lastEvent.timestamp)) / 1000;

      if (lastEvent.type === 'ACTIVE') {
        focusTime += diff;
      }

      if (lastEvent.type === 'IDLE') {
        idleTime += diff;
      }
    }

    // ======================
    // DOMAIN STATS
    // ======================

    const domainStats = this.buildDomainStats(events);

    console.log('DOMAIN STATS:', domainStats);

    // ======================
    // BASE ANALYSIS
    // ======================

    const analyzedDomains = analyzeDomains(session.task, domainStats);

    // ======================
    // AI ANALYSIS
    // ======================

    const aiAnalysis = await this.aiService.analyzeDomains({
      task: session.task,

      domains: domainStats,
    });

    // ======================
    // MERGE AI + BASE
    // ======================

    const mergedDomains = analyzedDomains.map((domain) => {
      const ai = aiAnalysis.domains.find((d) => d.domain === domain.domain);

      if (!ai) {
        return domain;
      }

      return {
        ...domain,

        category: ai.category,

        relevant: ai.relevant,

        isDistraction: ai.isDistraction,

        aiConfidence: ai.confidence,

        aiReason: ai.reason,
      };
    });

    // ======================
    // DISTRACTIONS
    // ======================

    distractions = mergedDomains.filter((d) => d.isDistraction).length;

    // ======================
    // TOP DOMAINS
    // ======================

    const topDomains = mergedDomains
      .sort((a, b) => b.time - a.time)
      .slice(0, 5);

    console.log('AI FEEDBACK:', aiAnalysis.feedback);

    console.log('TOP DOMAINS:', topDomains);

    // ======================
    // SCORE
    // ======================
    const totalTime = focusTime + idleTime;

    let score = totalTime > 0 ? (focusTime / totalTime) * 100 : 0;

    // penalización por distracciones
    score -= distractions * 5;

    score = Math.max(0, Math.round(score));

    return {
      focusTime: Math.round(focusTime / 60),
      idleTime: Math.round(idleTime / 60),
      interruptions,
      distractions,
      score,
      feedback: aiAnalysis.feedback,
      topDomains,
    };
  }
}
