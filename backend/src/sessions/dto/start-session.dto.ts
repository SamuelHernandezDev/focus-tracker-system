//backend\src\sessions\dto\start-session.dto.ts
import { IsArray, IsOptional, IsString, ArrayNotEmpty } from 'class-validator';

export class StartSessionDto {
  @IsString()
  task: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  allowedSites?: string[];
}