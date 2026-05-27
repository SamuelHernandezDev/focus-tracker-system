//backend/src/sessions/dto/create-event.dto.ts

import {
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  IsNumber,
} from 'class-validator';

import { EventType } from '@prisma/client';

export class CreateEventDto {
  @IsUUID()
  sessionId: string;

  @IsEnum(EventType)
  type: EventType;

  @IsOptional()
  @IsString()
  value?: string;

  @IsNumber()
  timestamp: number;
}
