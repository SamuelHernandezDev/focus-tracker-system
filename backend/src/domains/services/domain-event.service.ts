//backend/src/domains/services/domain-event.service.ts

import { Injectable } from '@nestjs/common';

import { EventType } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class DomainEventService {
  constructor(private readonly prisma: PrismaService) {}

  // ======================
  // CREATE TAB EVENT
  // ======================

  async createTabChangeEvent(data: {
    sessionId: string;

    domain: string;

    timestamp: number;
  }) {
    return this.prisma.event.create({
      data: {
        sessionId: data.sessionId,

        type: EventType.TAB_CHANGE,

        value: data.domain,

        timestamp: data.timestamp,
      },
    });
  }
}
