//backend/src/attention/attention.service.ts

import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import { CreateAttentionEventDto } from '../dto/create-attention-event.dto';

@Injectable()
export class AttentionService {
  constructor(private readonly prisma: PrismaService) {}

  // =========================
  // HANDLE EVENT
  // =========================

  async handleAttentionEvent(event: CreateAttentionEventDto) {
    // =========================
    // SAVE SEGMENT
    // =========================

    const segment = await this.prisma.attentionSegment.create({
      data: {
        sessionId: event.sessionId,

        state: event.state,

        startedAt: new Date(event.startedAt),

        endedAt: new Date(event.endedAt),

        duration: event.duration,
      },
    });

    console.log('Attention segment stored:', {
      id: segment.id,

      state: segment.state,

      duration: segment.duration,
    });

    return {
      received: true,

      segmentId: segment.id,
    };
  }
}
