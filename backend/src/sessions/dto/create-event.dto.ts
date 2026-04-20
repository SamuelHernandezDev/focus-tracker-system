//backend\src\sessions\dto\create-event.dto.ts
import {
    IsEnum,
    IsOptional,
    IsString,
    IsUUID,
  } from 'class-validator';
  
  export enum EventTypeEnum {
    ACTIVE = 'ACTIVE',
    IDLE = 'IDLE',
    TAB_CHANGE = 'TAB_CHANGE',
  }
  
  export class CreateEventDto {
    @IsUUID()
    sessionId: string;
  
    @IsEnum(EventTypeEnum)
    type: EventTypeEnum;
  
    @IsOptional()
    @IsString()
    value?: string;
  }