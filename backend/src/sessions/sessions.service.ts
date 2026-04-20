//backend\src\sessions\sessions.service.ts
import {
    Injectable,
    NotFoundException,
    BadRequestException,
  } from '@nestjs/common';
  import { Session } from './types/session.type';
  import { StartSessionDto } from './dto/start-session.dto';
  import { randomUUID } from 'crypto';
  
  @Injectable()
  export class SessionsService {
    private sessions: Session[] = [];
  
    startSession(userId: string, dto: StartSessionDto): Session {
      
      const activeSession = this.sessions.find(
        (s) => s.userId === userId && s.endTime === null,
      );
  
      if (activeSession) {
        throw new BadRequestException(
          'User already has an active session',
        );
      }
  
      const newSession: Session = {
        id: randomUUID(),
        userId,
        task: dto.task,
        allowedSites: dto.allowedSites,
        startTime: new Date(),
        endTime: null,
      };
  
      this.sessions.push(newSession);
  
      return newSession;
    }
  
    stopSession(sessionId: string): Session {
      const session = this.sessions.find((s) => s.id === sessionId);
  
      if (!session) {
        throw new NotFoundException('Session not found');
      }
  
      if (session.endTime) {
        throw new BadRequestException('Session already stopped');
      }
  
      session.endTime = new Date();
  
      return session;
    }
  
    getSessionsByUser(userId: string): Session[] {
      return this.sessions.filter((s) => s.userId === userId);
    }
  }