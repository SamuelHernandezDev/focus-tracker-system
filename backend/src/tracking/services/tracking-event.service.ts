//backend/src/tracking/services/tracking-event.service.ts

import { Injectable } from '@nestjs/common';

import { EventType } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';

import { CreateTrackingEvent } from '../types/create-tracking-event.type';

@Injectable()
export class TrackingEventService {
  constructor(private readonly prisma: PrismaService) {}

  // ======================
  // CREATE TRACKING EVENT
  // ======================

  async createTrackingEvent(data: CreateTrackingEvent) {
    return this.prisma.event.create({
      data: {
        sessionId: data.sessionId,

        type: EventType.TRACKING_ACTIVITY,

        value: data.value,

        timestamp: data.timestamp,
      },
    });
  }
}
