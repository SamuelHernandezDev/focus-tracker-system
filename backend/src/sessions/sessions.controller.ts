//backend\src\sessions\sessions.controller.ts
import {
    Body,
    Controller,
    Get,
    Post,
    Req,
    UseGuards,
  } from '@nestjs/common';
  
  import { SessionsService } from './sessions.service';
  import { StartSessionDto } from './dto/start-session.dto';
  import { StopSessionDto } from './dto/stop-session.dto';
  import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
  
  import { Request } from 'express';
  
  type RequestWithUser = Request & {
    user: {
      sub: string;
      email: string;
    };
  };
  
  @Controller('sessions')
  @UseGuards(JwtAuthGuard)
  export class SessionsController {
    constructor(private readonly sessionsService: SessionsService) {}
  
    @Post('start')
    startSession(
      @Req() req: RequestWithUser,
      @Body() dto: StartSessionDto,
    ) {
      const userId = req.user.sub;
  
      return this.sessionsService.startSession(userId, dto);
    }
  
    @Post('stop')
    stopSession(@Body() dto: StopSessionDto) {
      return this.sessionsService.stopSession(dto.sessionId);
    }
  
    @Get()
    getSessions(@Req() req: RequestWithUser) {
      const userId = req.user.sub;
  
      return this.sessionsService.getSessionsByUser(userId);
    }
  }