//backend\src\sessions\dto\stop-session.dto.ts
import { IsUUID } from 'class-validator';

export class StopSessionDto {
  @IsUUID()
  sessionId: string;
}