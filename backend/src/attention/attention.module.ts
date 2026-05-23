//backend/src/attention/attention.module.ts

import { Module } from '@nestjs/common';

import { AttentionController } from './attention.controller';

import { AttentionGateway } from './attention.gateway';

import { AttentionService } from './attention.service';

import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],

  controllers: [AttentionController],

  providers: [AttentionGateway, AttentionService],
})
export class AttentionModule {}
