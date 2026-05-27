//backend\src\attention\dto\create-attention-event.dto.ts
import { IsEnum, IsInt, IsUUID } from 'class-validator';

import { AttentionState } from '../enums/attention-state.enum';

export class CreateAttentionEventDto {
  @IsUUID()
  sessionId: string;

  @IsEnum(AttentionState)
  state: AttentionState;

  @IsInt()
  startedAt: number;

  @IsInt()
  endedAt: number;

  @IsInt()
  duration: number;

  @IsInt()
  timestamp: number;
}
